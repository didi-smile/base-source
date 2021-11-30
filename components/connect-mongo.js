// @ts-check

const mongoose = require('mongoose');
const { mongoConfig } = require('../config');
const logger = require('./logger');

async function connectMongo() {
    const connection = await mongoose.connect(mongoConfig.connection);
    logger.info('mongo connected');

    return connection;
}

module.exports = {
    connectMongo,
};
