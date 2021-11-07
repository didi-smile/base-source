const authAPI = require('../modules/auth/api');

module.exports = (app) => {
    authAPI.load(app);
};
