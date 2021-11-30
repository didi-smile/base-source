// @ts-check

// import modules
const authAPI = require('../modules/auth/express-api');

module.exports = app => {
    // import api
    authAPI.load(app);

};
