const { validate } = require('express-validation');

const authMiddleware = require('../../middlewares/auth');
const authController = require('./controller');
const authValidation = require('./validation');

exports.load = (app) => {
    app.get(
        '/users',
        authMiddleware.authenticate,
        validate(authValidation.validateGetListUsers()),
        authController.getListUsers,
    );
};
