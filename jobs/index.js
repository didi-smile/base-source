//@ts-check

const VQueue = require('../components/bull-queue');
const logger = require('../components/logger');
const { redisConfig } = require('../config');


const listQueue = {
    // queueName: <Queue>
};

function setupJob() {
    const redisHost = redisConfig.host;

    // add consumers

    logger.info('finish init job');
}

function addJob(queueName, jobData) {
    if (queueName in listQueue) {
        listQueue[queueName].addJob(jobData);
    } else {
        logger.warn(`queue ${queueName} does not exist!`);
    }
}

module.exports = {
    setupJob,
    addJob,
};
