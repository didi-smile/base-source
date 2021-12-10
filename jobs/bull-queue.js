const VQueue = require('../components/bull-queue');

function createBullQueue(queueName, concurrency) {
    return new VQueue(queueName, concurrency);
}

module.exports = {
    createBullQueue,
};
