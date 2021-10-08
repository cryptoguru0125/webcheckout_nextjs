const axios = require('axios')
const config = require('../config')

async function sendStripeToken(data) {
  return axios.post('https://api.revenuecat.com/v1/receipts', data, {
    headers: {
      'X-Platform': 'stripe',
      'Authorization': `Bearer ${config.REVCAT_API_KEY}`,
    }
  })
}

async function getSubscriber(app_user_id) {
  return axios.get(`https://api.revenuecat.com/v1/subscribers/${app_user_id}`, {
    headers: {
      'Authorization': `Bearer ${config.REVCAT_API_KEY}`,
    }
  })
}


module.exports = {
  sendStripeToken,
  getSubscriber,
}
