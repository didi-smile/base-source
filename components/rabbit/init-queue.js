const RQueue = require('./rabbit-queue');

const Constants = require('../../constants/common');

const emailNotification = new RQueue(Constants.QUEUE_NAMES.EMAIL_NOTIFICATION);

module.exports = {
    emailNotification,
};