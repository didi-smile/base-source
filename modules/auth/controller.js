const { tryCatchWrapper } = require('../../common/wrapper.js');

class AuthController {
    constructor() {
        this.getListUsers = tryCatchWrapper(this.getListUsers);
    }

    getListUsers(req, res) {
        const { page, limit } = req.query;
        console.log('page', page);
        console.log('limit', limit);

        res.send('get list users successfully');
    }
}

module.exports = new AuthController();
