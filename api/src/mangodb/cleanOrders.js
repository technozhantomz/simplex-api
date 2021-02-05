import {
  connect,
  removeOldOrders
} from './index'
import createLogger from 'logging'
import {
  mangodb,
  simplex
} from '../config'
import cron from 'node-cron'

import createLogger from 'logging'
import mongoose from 'mongoose';
const logger = createLogger('currency_rates/index.js')

const runCron = () => {
  console.log('cron setup for exchange rates')
  const cronTime = '0 10 1 * *'
  return cron.schedule(cronTime, () => {
    try {

      let connect = () => {
        return new Promise((resolve, reject) => {
          mongoose.connect('mongodb://' + mangodb.host + ':' + mangodb.port + '/' + mangodb.name)
          var db = mongoose.connection
          db.once('error', (error) => {
            reject(error)
          })
          db.once('open', () => {
            resolve()
          })
        })
      }
      removeOldOrders()
        .then(() => {
          logger.info('Old Order Entries Removed')
        })
        .catch(_error => {
          logger.error(_error)
        })
    } catch (e) {
      logger.error(e)
    }
  })
}

export default runCron
