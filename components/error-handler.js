const _ = require('lodash');
const { StatusCodes } = require('http-status-codes');
const { ValidationError } = require('express-validation');

const VError = require('../common/error');

module.exports = (logger) => (err, req, res, _next) => {
    if (err instanceof ValidationError) {
        logger.error(err.details);

        let messages = [];
        const details = _.get(err, 'details');
        for (let key in details) {
            for (const err of details[key]) {
                messages.push(err.message);
            }
        }

        let dataResponse = {};
        if (messages.length == 1) {
            dataResponse.message = messages[0];
        } else if (messages.length > 1) {
            dataResponse.messages = messages;
        }
        return res.status(err.statusCode).json(dataResponse);
    }

    if (err instanceof VError) {
        logger.error(err.rootCause, err.message);

        const errInstance = {
            message: err.message,
        };

        if (req.isOpenAPI) {
            errInstance.errorCode = err.errorCode();
        }

        return res.status(err.statusCode)
            .json(errInstance);
    }

    logger.error(err, 'unexpected error');
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            message: 'unexpected error',
        });
};
