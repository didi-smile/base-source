//@ts-check

const { Joi } = require('express-validation');

exports.validateGetListUsers = () => ({
    query: Joi.object({
        page: Joi.number().min(1),
        limit: Joi.number().min(1),
    }),
});
