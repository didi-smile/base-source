const amqp = require('amqplib');

const VRabbitQueue = require('../components/rabbit-queue');

function connectRabbit() {
    return amqp.connect(process.env.RABBIT_HOST);
}

async function createRabbitQueue(queueName, connection) {
    const queue = new VRabbitQueue(queueName, queueName);
    await queue.init(connection);

    return queue;
}

module.exports = {
    connectRabbit,
    createRabbitQueue,
};
