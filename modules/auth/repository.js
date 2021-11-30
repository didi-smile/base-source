// @ts-check

const BaseRepository = require('../../common/base-repository');

class UserRepository extends BaseRepository {
    constructor() {
        super('User');
    }
}

module.exports = new UserRepository();
