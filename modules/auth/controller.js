//@ts-check

const { tryCatchWrapper } = require('../../common/wrapper.js');

// dependencies
const userRepository = require('./repository');
const serviceFactory = require('./services/list-users');

class AuthController {
    constructor() {
        this.getListUsers = tryCatchWrapper(this._getListUsers);
    }

    async _getListUsers(req, res) {
        const { page, limit } = req.query;

        const listUserService = serviceFactory({ userRepository });
        const result = await listUserService(page, limit);

        res.success(result);
    }
}

module.exports = new AuthController();
