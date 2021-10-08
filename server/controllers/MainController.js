const { body: bodyCheck, validationResult } = require('express-validator')
const config = require('../config')
const sendgrid = require('../services/sendgrid')
const firebaseAdmin = require('../services/firebase-admin')
const revenuecat = require('../services/revenuecat')
const logger = require('../services/logger')
const stripe = require('stripe')(config.STRIPE_SECRET_KEY)

async function subscribeSendgridEmail(req, res) {
  await bodyCheck('email').isEmail().run(req)

  const validResult = validationResult(req)
  if (!validResult.isEmpty()) {
    res.status(422).json(validResult.array())
    return
  }

  try {
    await firebaseAdmin.auth().getUserByEmail(req.body.email)

    return res.status(422).json({
      error: 'Email is duplicated',
    })
  } catch {}

  res.send('success')
}

async function confirmStripePayment(req, res) {
  await bodyCheck('email').isEmail().run(req)
  await bodyCheck('payment_method_id').notEmpty().run(req)

  const validResult = validationResult(req)
  if (!validResult.isEmpty()) {
    res.status(422).json(validResult.array())
    return
  }

  let subscription = null
  try {
    // create a customer
    const customer = await stripe.customers.create({
      email: req.body.email,
      payment_method: req.body.payment_method_id,
    })

    // make subscription
    subscription = await stripe.subscriptions.create({
      customer: customer.id,
      default_payment_method: req.body.payment_method_id,
      items: [
        {
          price: config.STRIPE_PRICE_ID,
        },
      ],
      payment_behavior: 'default_incomplete',
      expand: ['pending_setup_intent'],
      trial_period_days: 7,
    })

    if (subscription.pending_setup_intent) {
      await stripe.setupIntents.confirm(
        subscription.pending_setup_intent.id,
        { payment_method: req.body.payment_method_id },
      )
    }
  } catch (err) {
    logger.error({
      func: 'creating subscription',
      email: req.body.email,
      error: err,
    })
    return res.status(500).end('Failed on creating subscription')
  }

  // check duplication
  let userRecord = null
  try {
    userRecord = await firebaseAdmin.auth().getUserByEmail(req.body.email)

    await stripe.subscriptions.del(subscription.id)

    return res.status(422).json('Email was registered already')
  } catch {
    userRecord = await firebaseAdmin.auth().createUser({
      email: req.body.email,
      emailVerified: false,
      disabled: false,
    })
  }

  // notify payment to RevenueCat
  try {
    const { data: revenueRes } = await revenuecat.sendStripeToken({
      app_user_id: userRecord.uid,
      fetch_token: subscription.id,
      attributes: {
        $email: {
          value: userRecord.email,
        },
        sub_id: {
          value: subscription.id,
        },
      },
    })
  } catch (err) {
    // remove subscription
    await stripe.subscriptions.del(subscription.id)

    // remove created user
    await firebaseAdmin.auth().deleteUser(userRecord.uid)

    logger.error({
      func: 'revenuecat',
      uid: userRecord.uid,
      subscriptionId: subscription.id,
    })

    return res.status(500).json(err)
  }

  // add contact to the sendgrid
  try {
    await sendgrid.addContact(userRecord.email)
  } catch (err) {
    logger.error({ func: 'sendgrid', error: err })
  }

  res.json({
    subscription,
    userRecord,
  })
}

async function updateUser(req, res) {
  await bodyCheck('uid').notEmpty().run(req)
  await bodyCheck('name').notEmpty().run(req)
  await bodyCheck('email').isEmail().run(req)
  await bodyCheck('password').notEmpty().run(req)

  const validResult = validationResult(req)
  if (!validResult.isEmpty()) {
    res.status(422).json(validResult.array())
    return
  }

  try {
    const userRecord = await firebaseAdmin.auth().updateUser(req.body.uid, {
      email: req.body.email,
      password: req.body.password,
      displayName: req.body.name,
    })

    res.json(userRecord)
  } catch (err) {
    res.status(500).end(err)
  }
}

module.exports = {
  subscribeSendgridEmail,
  confirmStripePayment,
  updateUser,
}
