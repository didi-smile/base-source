const { QUEUE } = require('../constants/queue');
const VQueue = require('../components/bull-queue');
const { pingHandler } = require('./consumers/ping');

const settingsQueueBull = {
    [QUEUE.Ping]: {
        concurrency: 1,
        handler: pingHandler,
    },
};

function getListQueueBull() {
    return Object.keys(settingsQueueBull).reduce((init, queueName) => {
        const { concurrency } = settingsQueueBull[queueName];
        return Object.assign(init, {
            [queueName]: new VQueue(queueName, concurrency),
        });
    }, {});
}

module.exports = {
    getListQueueBull,
    settingsQueueBull,
};
