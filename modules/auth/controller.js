//@ts-check

const { tryCatchWrapper } = require('../../common/wrapper.js');

// dependencies
const userRepository = require('./repository');
const userBusiness = require('./business');

class AuthController {
    constructor() {
        this.getListUsers = tryCatchWrapper(this._getListUsers);
    }

    async _getListUsers(req, res) {
        const { page, limit } = req.query;

        const result = await userBusiness.getListUser(page, limit);

        res.success(result);
    }
}

module.exports = new AuthController();
