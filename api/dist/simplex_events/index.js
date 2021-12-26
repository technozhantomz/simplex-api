'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _logging = require('logging');

var _logging2 = _interopRequireDefault(_logging);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//const logger = createLogger('simplex_events/index.js')

var runCron = function runCron() {/*
                                  console.log('cron setup for simplex events')
                                  const cronTime = '* * * * *'
                                  return cron.schedule(cronTime, () => {
                                  try {
                                  getEvents()
                                  .then(() => {
                                  logger.info('Simplex Events Retrieved')
                                  })
                                  .catch(_error => {
                                  logger.error(_error)
                                  })
                                  } catch (e) {
                                  logger.error(e)
                                  }
                                  })
                                  */}; //import getEvents from './retrieveEvents'
//import cron from 'node-cron'

exports.default = runCron;