const logger = require('./logger');

class RQueue {
    constructor(exchange) {
        this.queueName = exchange;
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
        this.channel.assertExchange(this.queueName, 'direct', newOptions);
    }

    provide(message, options = {}) {
        const severity = options.severity || '';
        const msg = JSON.stringify(message, null, 0);
        this.channel.publish(this.queueName, severity, Buffer.from(msg));
    }

    assertQueue(options = {}) {
        return this.channel.assertQueue(this.queueName, options).catch(this.error);
    }

    async addConsumer(hanlder, options = {}) {
        const severity = options.severity || '';
        const newOptions = Object.assign({
            durable: true,
        }, options);
        await this.assertQueue(newOptions);
        this.channel.bindQueue(this.queueName, this.queueName, severity);
        this.channel.consume(this.queueName, data => {
            if (data.content) {
                hanlder();
            }
        }, { noAck: true });
    }

    error(error) {
        error.message = `ERROR: ${this.name.toUpperCase()}: ${error.message}`;
        logger.error(error);
        process.exit(1);
    }
}

module.exports = RQueue;
