const logger = require('./logger');

function isAsync(f) {
    return f.constructor.name === 'AsyncFunction';
}

class VRabbitQueue {
    constructor(queueName, exchange = '') {
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
            exchangeType: 'direct',
        }, options);
        this.channel = await connection.createChannel();
        this.channel.assertExchange(this.exchange, newOptions.exchangeType, {
            durable: newOptions.durable,
        }).catch(this.error);
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
            noAck: false,
            durable: true,
        }, options);
        await this.assertQueue(newOptions);
        this.channel.bindQueue(this.queueName, this.exchange, severity);
        this.channel.consume(this.queueName, async data => {
            try {
                if (typeof hanlder === 'function') {
                    if (isAsync(hanlder)) {
                        await hanlder(data.content.toString());
                    } else {
                        hanlder(data.content.toString());
                    }
                }
            } catch (error) {
                logger.error('Failed to handle function', error);
            }
        }, { noAck: newOptions.noAck });
    }

    error(error) {
        logger.error('Failed to handle rabbit queue', error);
        process.exit(1);
    }
}

module.exports = VRabbitQueue;
