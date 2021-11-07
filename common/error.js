const { ERROR } = require('../constants/error');
const { StatusCodes } = require('http-status-codes');

class VError extends Error {
    constructor({ err, message, code, errCode }) {
        if (!err instanceof Error) {
            message = err;
            if (!message) {
                throw new Error('invalid error definition');
            }
        }

        if (message) {
            super(message);
        } else {
            super('something went wrong');
        }

        this._rootCause = err;
        this._statusCode = code || StatusCodes.INTERNAL_SERVER_ERROR;
        this._errorCode = errCode || ERROR.INTERNAL_SERVER;
    }

    get rootCause() {
        return this._rootCause;
    }

    get statusCode() {
        return this._statusCode;
    }

    get errorCode() {
        return this._errorCode;
    }
}

module.exports = VError;
