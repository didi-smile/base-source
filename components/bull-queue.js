// @ts-check

const Queue = require('bull');

const logger = require('./logger');

const BACK_OFF = {
    type: 'exponential',
    delay: 1000,
};

class VQueue {
    constructor(name, concurrency, redisHost = process.env.REDIS_HOST) {
        this.name = name;
        this.concurrency = concurrency;
        this.queue = new Queue(this.name, redisHost, {
            settings: {
                stalledInterval: 600000,
            },
        });
        this.initEvent();
    }

    getQueue() {
        return this.queue;
    }

    provide(data, options = {}) {
        return this.queue.add(data, {
            backOff: BACK_OFF,
            removeOnComplete: true,
            ...options,
        });
    }

    addConsumer(handler) {
        return this.queue.process(
            this.concurrency,
            handler,
        );
    }

    async removeJob(jobId) {
        const job = await this.queue.getJob(jobId);
        if (job) {
            return job.remove();
        }
        return Promise.resolve();
    }

    initEvent() {
        this.queue.on('completed', job => {
            logger.info(`${this.name.toUpperCase()}: ${job.id} sent successfully`);
        });

        this.queue.on('error', error => {
            const err = Object.assign(error, {
                message: `ERR: ${this.name.toUpperCase()}: ${error.message}`,
            });
            logger.error(err, `${this.name.toUpperCase()} failed`);
        });
    }
}

module.exports = VQueue;
