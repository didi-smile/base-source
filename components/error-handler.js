const { StatusCodes } = require('http-status-codes');
const VError = require('../common/error');

module.exports = (logger) => (err, req, res, _) => {
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
