const amqp = require('amqplib');

const VRabbitQueue = require('../components/rabbit-queue');
const { TYPE_QUEUES } = require('../constants/common');

function connect() {
    return amqp.connect(process.env.RABBIT_HOST);
}

async function getListQueueRabbit(settingsQueueRabbit) {
    const connection = await connect();
    const result = {};
    for (const queueName in settingsQueueRabbit) {
        if (
            !settingsQueueRabbit[queueName].type
            || settingsQueueRabbit[queueName].type === TYPE_QUEUES.BULL
        ) continue;

        const queue = new VRabbitQueue(queueName);
        await queue.init(connection);
        result[queueName] = queue;
    }

    return result;
}

module.exports = {
    getListQueueRabbit,
};
