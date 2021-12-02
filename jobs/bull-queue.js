const VQueue = require('../components/bull-queue');
const { TYPE_QUEUES } = require('../constants/common');

function getListQueueBull(settingsQueueBull) {
    const result = {};
    for (const queueName in settingsQueueBull) {
        const { concurrency } = settingsQueueBull[queueName];
        if (
            !settingsQueueBull[queueName].type
            || settingsQueueBull[queueName].type === TYPE_QUEUES.RABBIT
        ) {
            continue;
        }

        const queue = new VQueue(queueName, concurrency);
        result[queueName] = queue;
    }

    return result;
}

module.exports = {
    getListQueueBull,
};
