// @ts-check

const { createClient } = require('redis');

const { redisConfig } = require('../config');
const logger = require('./logger');

let client;

async function connectRedis() {
    client = createClient({
        url: redisConfig.host,
    });

    client.on('error', err => {
        logger.error('redis error', err);
    });

    await client.connect();
    logger.info('redis connected');
}

function getRedisClient() {
    if (!client) {
        logger.error('lost connection to redis');
        return;
    }
    return client;
}

module.exports = {
    connectRedis,
    getRedisClient,
};
