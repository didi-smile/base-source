const authMiddleware = require('../../middlewares/auth');
const authController = require('./controller');

exports.load = (app) => {
    app.get('/users', authMiddleware.authenticate, authController.getListUsers);
};
