// @ts-check

const { StatusCodes } = require('http-status-codes');
const logger = require('../components/logger');

function calculateResponseTime(begin) {
    return `${(Date.now() - begin) / 1000}s`;
}

exports.attachResponseBuilder = (req, res, next) => {
    const begin = Date.now();
    res.success = (result, message, statusCode = StatusCodes.OK) => {
        const dataResponse = {};

        logger.info({
            path: req.url,
            method: req.method,
            status: statusCode,
            responseTime: calculateResponseTime(begin),
        });

        if (result) {
            dataResponse.data = result;
        }

        if (message) {
            dataResponse.message = message;
        }

        res.json(dataResponse);
    };

    next();
};
