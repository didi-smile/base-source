const { emailNotification } = require('./init-queue');
const { handler } = require('../handler-email-notification/email-notification');

function setupQueue() {
    emailNotification.receive(handler);
}

module.exports = {
    setupQueue,
};