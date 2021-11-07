const mongoose = require('mongoose');
const { mongoConfig } = require('../config');

function connectMongo() {
    return mongoose.connect(mongoConfig.connection, mongoConfig.options);
}

module.exports = {
    connectMongo,
};
