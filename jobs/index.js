// @ts-check

const logger = require('../components/logger');

// rabbit
const { connectRabbit, createRabbitQueue } = require('./rabbit-queue');
const { createBullQueue } = require('./bull-queue');
const { QUEUE } = require('../constants/queue');
const { pingHandler } = require('./consumers/ping');
const { handlerNotification } = require('./consumers/noitification');
const { TYPE_QUEUES } = require('../constants/common');

const settings = {
    // bull
    [QUEUE.Ping]: {
        concurrency: 1,
        handler: pingHandler,
        type: TYPE_QUEUES.BULL,
    },

    // rabbit
    [QUEUE.Notification]: {
        handler: handlerNotification,
        type: TYPE_QUEUES.RABBIT,
    },
};

let listQueue;

async function createListQueue() {
    const result = {};
    const connection = await connectRabbit();
    for (const queueName in settings) {
        if (!settings[queueName].type) continue;

        if (settings[queueName].type === TYPE_QUEUES.BULL) {
            const { concurrency } = settings[queueName];
            const queue = createBullQueue(queueName, concurrency);
            result[queueName] = queue;
        } else if (settings[queueName].type === TYPE_QUEUES.RABBIT) {
            const queue = await createRabbitQueue(queueName, connection);
            result[queueName] = queue;
        }
    }

    return result;
}

function loadConsumer(listQueueName) {
    for (const queueName in listQueueName) {
        const { handler } = settings[queueName];
        listQueueName[queueName].addConsumer(handler);
    }
}

async function setupJob() {
    listQueue = await createListQueue();
    // add consumers
    loadConsumer(listQueue);

    logger.info('finish load consumer');
}

async function addJob(queueName, jobData, options = {}) {
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
