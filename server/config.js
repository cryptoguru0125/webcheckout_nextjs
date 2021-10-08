const config = require('dotenv-flow').config().parsed

module.exports = {
  ...config,
  IS_PRODUCT: process.env.NODE_ENV === 'production',
}
