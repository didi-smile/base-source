// @ts-check

const VLogger = require('@vnlp/logger');
const { loggerConfig } = require('../config');

const logger = new VLogger(loggerConfig);
logger.init();

module.exports = logger.logger;
