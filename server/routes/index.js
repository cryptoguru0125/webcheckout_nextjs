const Router = require('express').Router
const Controllers = require('../controllers')

const router = new Router()

// ------------ guest routes -------------------------
router.post('/api/subscribe-email', Controllers.Main.subscribeSendgridEmail)
router.post('/api/confirm-payment', Controllers.Main.confirmStripePayment)
router.post('/api/update-user', Controllers.Main.updateUser)

// ----- subscription apis -------------
router.get('/api/subscriptions/:sub_id', Controllers.Subscriptions.show)
router.delete('/api/subscriptions/:app_user_id', Controllers.Subscriptions.cancel)

module.exports = router
