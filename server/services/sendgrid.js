const client = require('@sendgrid/client')
const config = require('../config')

client.setApiKey(config.SENDGRID_API_KEY)

function addContact(email) {
  return client.request({
    method: 'PUT',
    url: '/v3/marketing/contacts',
    body: {
      contacts: [
        {
          email,
          custom_fields: {
            e7_T: 'active',
          }
        },
      ],
    },
  })
}

module.exports = {
  addContact,
}
