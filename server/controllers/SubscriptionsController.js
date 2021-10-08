const { param: paramCheck, validationResult } = require('express-validator')
const config = require('../config')
const logger = require('../services/logger')
const stripe = require('stripe')(config.STRIPE_SECRET_KEY)
const revenuecatApi = require('../services/revenuecat')
const objectPath = require('object-path')

/**
 * get subscription detail
 * @body {*} subscription_id
 * @returns
 * subscription detail
 */
async function show(req, res) {
  await paramCheck('sub_id').exists().run(req)

  const validResult = validationResult(req)
  if (!validResult.isEmpty()) {
    res.status(422).json(validResult.array())
    return
  }

  // get subscription
  try {
    const subscription = await stripe.subscriptions.retrieve(req.params.sub_id)
    res.json(subscription)
  } catch (err) {
    logger.error({
      func: 'subscription.show',
      subscriptionId: req.params.sub_id,
    })
    res.status(err.statusCode || 500).json(err)
  }
}

/**
 * cancells a subscription
 * @body {*} subscription_id
 * @returns
 *
 */
async function cancel(req, res) {
  await paramCheck('app_user_id').exists().run(req)

  const validResult = validationResult(req)
  if (!validResult.isEmpty()) {
    res.status(422).json(validResult.array())
    return
  }

  let sub_id = null
  try {
    const { data: revenueRes } = await revenuecatApi.getSubscriber(
      req.params.app_user_id,
    )
    sub_id = objectPath.get(
      revenueRes,
      'subscriber.subscriber_attributes.sub_id.value',
    )

    if (!sub_id) {
      throw new Error('Not found stripe subscription id')
    }
  } catch {
    logger.error({
      func: 'subscription.cancel',
      app_user_id: req.params.app_user_id,
    })
    return res.status(404).json('Not found subscriber')
  }

  // cancel subscription
  try {
    const deleted = await stripe.subscriptions.del(sub_id)
    res.json(deleted)
  } catch (err) {
    logger.error({
      func: 'subscription.cancel',
      subscriptionId: req.params.sub_id,
    })
    res.status(err.statusCode || 500).json(err)
  }
}

module.exports = {
  show,
  cancel,
}
