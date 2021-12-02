const amqp = require('amqplib');

const RQueue = require('../components/rabbit-queue');
const { QUEUE } = require('../constants/queue');
const { handlerNotification } = require('./consumers/noitification');

const settingsQueueRabbit = {
    [QUEUE.Notification]: {
        handler: handlerNotification,
    },
};

function connect() {
    return amqp.connect(process.env.RABBIT_HOST);
}

async function getListQueueRabbit() {
    const connection = await connect();
    return Object.keys(settingsQueueRabbit).reduce(async (init, queueName) => {
        const queue = new RQueue(queueName);
        await queue.init(connection);
        return Object.assign(init, {
            [queueName]: queue,
        });
    }, {});
}

module.exports = {
    getListQueueRabbit,
    settingsQueueRabbit,
};
