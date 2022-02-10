'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _retrieveEvents = require('./retrieveEvents');

var _retrieveEvents2 = _interopRequireDefault(_retrieveEvents);

var _nodeCron = require('node-cron');

var _nodeCron2 = _interopRequireDefault(_nodeCron);

var _logging = require('logging');

var _logging2 = _interopRequireDefault(_logging);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = (0, _logging2.default)('simplex_events/index.js');

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
                                  */};

exports.default = runCron;