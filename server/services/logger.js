const winston = require('winston')
const { combine, timestamp, prettyPrint } = winston.format

const logger = winston.createLogger({
  format: combine(timestamp(), prettyPrint()),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
  ],
})

module.exports = logger
