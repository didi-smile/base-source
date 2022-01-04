// @ts-check

const _ = require('lodash');
const { StatusCodes } = require('http-status-codes');
const { ValidationError } = require('express-validation');

const VError = require('../common/error');

module.exports = logger => (err, req, res, next) => {
    if (err instanceof ValidationError) {
        logger.error(err.details);

        const messages = [];
        const details = _.get(err, 'details');
        for (const key in details) {
            for (const error of details[key]) {
                messages.push(error.message);
            }
        }

        const dataResponse = {};
        if (messages.length === 1) {
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
            errInstance.errorCode = err.errorCode;
        }

        return res.status(err.statusCode)
            .json(errInstance);
    }

    logger.error(err, 'unexpected error');
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            message: 'unexpected error',
        });

    next();
};
