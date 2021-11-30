// @ts-check

const mongoose = require('mongoose');
const { mongoConfig } = require('../config');

function connectMongo() {
    return mongoose.connect(mongoConfig.connection);
}

module.exports = {
    connectMongo,
};
