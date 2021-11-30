// @ts-check

const { tryCatchWrapper } = require('../../common/wrapper');
const { addJob } = require('../../jobs');
const { QUEUE } = require('../../constants/queue');

// dependencies
const userBusiness = require('./business');

class AuthController {
    constructor() {
        this.getListUsers = tryCatchWrapper(this._getListUsers);
    }

    async _getListUsers(req, res) {
        const { page, limit } = req.query;

        const result = await userBusiness.getListUser(page, limit);
        await addJob(QUEUE.Ping, { time: new Date() });

        res.success(result);
    }
}

module.exports = new AuthController();
