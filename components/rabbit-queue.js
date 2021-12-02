const logger = require('./logger');

class VRabbitQueue {
    constructor(queueName, exchange) {
        this.queueName = queueName;
        this.exchange = exchange;
    }

    getQueueName() {
        return this.queueName;
    }

    async createChannel(connection) {
        return connection.createChannel().catch(this.error);
    }

    async init(connection, options = {}) {
        const newOptions = Object.assign({
            durable: true,
        }, options);
        this.channel = await connection.createChannel();
        this.channel.assertExchange(this.exchange, 'direct', newOptions).catch(this.error);
    }

    provide(message, options = {}) {
        const severity = options.severity || '';
        const msg = JSON.stringify(message, null, 0);
        this.channel.publish(this.exchange, severity, Buffer.from(msg));
    }

    assertQueue(options = {}) {
        return this.channel.assertQueue(this.queueName, {
            durable: options.durable,
        }).catch(this.error);
    }

    async addConsumer(hanlder, options = {}) {
        const severity = options.severity || '';
        const newOptions = Object.assign({
            noAck: true,
            durable: true,
        }, options);
        await this.assertQueue(newOptions);
        this.channel.bindQueue(this.queueName, this.exchange, severity);
        this.channel.consume(this.queueName, data => {
            hanlder(data.content.toString());
        }, { noAck: newOptions.noAck });
    }

    error(error) {
        logger.error('Failed to handle rabbit queue', error);
        process.exit(1);
    }
}

module.exports = VRabbitQueue;
