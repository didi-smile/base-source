//@ts-check

const authAPI = require('../modules/auth/express-api');
// const userAPI = require('../modules/user/express-api');

module.exports = (app) => {
    authAPI.load(app);
    // userAPI.load(app);
};
