const userRepository = require('./repository');

class UserService {
    getListUser(page, limit) {
        return userRepository.getMany({
            page,
            limit,
        });
    }
}

module.exports = new UserService();
