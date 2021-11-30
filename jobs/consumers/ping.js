const logger = require('../../components/logger');

function pingHandler(job, done) {
    const { time } = job.data;
    logger.info('OK', time);
    done();
}

module.exports = {
    pingHandler,
};
