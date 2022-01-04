// @ts-check

const { StatusCodes } = require('http-status-codes');

const { ERROR } = require('../constants/error');

class VError extends Error {
    constructor({
        message,
        err = null,
        code = StatusCodes.INTERNAL_SERVER_ERROR,
        errCode = ERROR.INTERNAL_SERVER,
    }) {
        let msg = message;
        if (err && !(err instanceof Error)) {
            msg = err;
            if (!msg) {
                throw new Error('invalid error definition');
            }
        }

        if (msg) {
            super(msg);
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
