const VQueue = require('../components/bull-queue');

function getBullQueue(queueName, concurrency) {
    return new VQueue(queueName, concurrency);
}

module.exports = {
    getBullQueue,
};
