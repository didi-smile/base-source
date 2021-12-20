// @ts-check

const BaseController = require('../../common/base-controller');
const { addJob } = require('../../jobs');
const { QUEUE } = require('../../constants/queue');

// dependencies
const userBusiness = require('./business');

class AuthController extends BaseController {
    async getListUsers(req, res) {
        const { page, limit } = req.query;

        const result = await userBusiness.getListUser(page, limit);
        await addJob(QUEUE.Ping, { time: new Date() });
        res.success(result);
    }
}

module.exports = new AuthController();
