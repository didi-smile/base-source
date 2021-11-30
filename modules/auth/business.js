//@ts-check

const userService = require('./service');

class UserBusiness {
    getListUser(page, limit) {
        return userService.getListUser(page, limit);
    }
}

module.exports = new UserBusiness();
