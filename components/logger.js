// @ts-check

const VLogger = require('@vnlp/logger');
const { loggerConfig } = require('../config');

const config = {
    service: loggerConfig.service,
    level: loggerConfig.level,
    streamType: loggerConfig.streamType,
};

switch (config.streamType) {
    case 'elastic': {
        config[config.streamType] = {
            host: loggerConfig.elasticHost,
            username: loggerConfig.elasticUser,
            password: loggerConfig.elasticPass,
        };
        break;
    }
    case 'cloudwatch': {
        config[config.streamType] = {
            group: loggerConfig.group,
            prefix: loggerConfig.prefix,
            interval: loggerConfig.interval,
            awsRegion: loggerConfig.awsRegion,
            awsAccessKeyId: loggerConfig.awsAccessKeyId,
            awsSecretAccessKey: loggerConfig.awsSecretAccessKey,
        };
        break;
    }
}

const logger = new VLogger(loggerConfig);
logger.init();

module.exports = logger.logger;
