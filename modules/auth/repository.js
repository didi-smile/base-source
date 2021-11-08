const BaseRepository = require('../../common/base-repository');

class UserRepository extends BaseRepository {
    constructor() {
        super('User');
    }

    getMany() {
        return "list users";
    }
}

module.exports = new UserRepository();
