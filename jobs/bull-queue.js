const { QUEUE } = require('../constants/queue');
const VQueue = require('../components/bull-queue');
const { pingHandler } = require('./consumers/ping');


function getListQueueBull(settingsQueueBull) {
    const result = {};
    for (const queueName in settingsQueueBull) {
        const { concurrency } = settingsQueueBull[queueName];
        if (
            !settingsQueueBull[queueName].type
            || settingsQueueBull[queueName].type === 'rabbit'
        ) continue;

        const queue = new VQueue(queueName, concurrency);
        result[queueName] = queue;
    }

    return result;
}

module.exports = {
    getListQueueBull,
};
