// @ts-check

const VQueue = require('../components/bull-queue');
const logger = require('../components/logger');
const { QUEUE } = require('../constants/queue');

// import handlers
const { pingHandler } = require('./consumers/ping');

const settings = {
    [QUEUE.Ping]: {
        concurrency: 1,
        handler: pingHandler,
    },
};

const listQueue = Object.keys(settings).reduce((init, queueName) => {
    const { concurrency } = settings[queueName];
    return Object.assign(init, {
        [queueName]: new VQueue(queueName, concurrency),
    });
}, {});

function loadConsumer(listQueueName) {
    for (const queueName in listQueueName) {
        const { handler } = settings[queueName];
        listQueueName[queueName].addConsumer(handler);
    }
    logger.info('finish load consumer');
}

function setupJob() {
    // add consumers
    loadConsumer(listQueue);

    logger.info('finish init job');
}

function addJob(queueName, jobData, options = {}) {
    if (queueName in listQueue) {
        listQueue[queueName].provide(jobData, options);
    } else {
        logger.warn(`queue ${queueName} does not exist!`);
    }
}

module.exports = {
    setupJob,
    addJob,
};
