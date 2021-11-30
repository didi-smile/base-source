// @ts-check

const BaseModel = require('../../common/base-model');

const UserModel = new BaseModel({
    modelName: 'User',
    options: {
        collection: 'users',
    },
    schema: {
        username: {
            type: String,
            minlength: 1,
            maxlength: 100,
        },
        password: {
            type: String,
            minlength: 6,
            maxlength: 500,
        },
    },
});

module.exports = UserModel;
