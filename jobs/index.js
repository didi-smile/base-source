// @ts-check

const logger = require('../components/logger');

// rabbit
const { getListQueueRabbit, settingsQueueRabbit } = require('./rabbit-queue');
const { getListQueueBull, settingsQueueBull } = require('./bull-queue');

const settings = {
    ...settingsQueueRabbit,
    ...settingsQueueBull,
};

async function getListQueue() {
    const listQueueRabbit = await getListQueueRabbit();
    const listQueueBull = await getListQueueBull();

    return { ...listQueueRabbit, ...listQueueBull };
}

function loadConsumer(listQueueName) {
    for (const queueName in listQueueName) {
        const { handler } = settings[queueName];
        listQueueName[queueName].addConsumer(handler);
    }
}

async function setupJob() {
    const listQueue = await getListQueue();
    // add consumers
    loadConsumer(listQueue);

    logger.info('finish load consumer');
}

async function addJob(queueName, jobData, options = {}) {
    const listQueue = await getListQueue();
    if (queueName in listQueue) {
        console.log(queueName)
        listQueue[queueName].provide(jobData, options);
    } else {
        logger.warn(`queue ${queueName} does not exist!`);
    }
}

module.exports = {
    setupJob,
    addJob,
};
