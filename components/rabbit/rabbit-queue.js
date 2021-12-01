const RabbitQueue = require('amqplib');

const logger = require('../../components/logger');

class RQueue {
    constructor(queueName, host = process.env.RABBIT_HOST) {
        this.name = queueName;
        this.queue = RabbitQueue.connect(host);
    }

    getQueueName() {
        return this.name;
    }

    createConnection() {
        return this.queue.then(connection => { return connection }).catch(this.error);
    }

    async createChannel() {
        const connection = await this.createConnection();

        return connection.createChannel().then(channel => { return channel }).catch(this.error);
    }

    async send(data, options = {}) {
        const newOptions = Object.assign({
            durable: false,
        }, options);

        const channel = await this.createChannel();
        channel.assertQueue(this.name, newOptions);
        channel.sendToQueue(this.name, Buffer.from(JSON.stringify(data)));
    }

    async receive(handler, options = {}) {
        const newOptions = Object.assign({
            durable: false,
            noAck: true,
        }, options);

        const channel = await this.createChannel();
        channel.assertQueue(this.name, {
            durable: newOptions.durable,
        });
        channel.consume(this.name, function (data) {
            handler(data.content);
        }, { noAck: newOptions.noAck });
    }

    error(error) {
        error.message = `ERROR: ${this.name.toUpperCase()}: ${error.message}`;
        logger.error(error);
        process.exit(1);
    }
}

module.exports = RQueue;