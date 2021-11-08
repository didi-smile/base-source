const { tryCatchWrapper } = require('../../common/wrapper.js');

// dependencies
const userRepository = require('./repository');
const serviceFactory = require('./service');

class AuthController {
    constructor() {
        this.getListUsers = tryCatchWrapper(this.getListUsers);
    }

    async getListUsers(req, res) {
        const { page, limit } = req.query;

        const userService = serviceFactory({ userRepository });
        const result = await userService.getListUsers(page, limit);

        res.success(result);
    }
}

module.exports = new AuthController();
