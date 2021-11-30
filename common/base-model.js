// @ts-check

const mongoose = require('mongoose');

const Common = require('../constants/common');

class BaseModel {
    constructor({ modelName, options, schema }) {
        const defaultOptions = {
            timestamps: true,
            collation: { locale: 'vi' },
        };

        this.options = {
            ...defaultOptions,
            options,
        };

        this.modelName = modelName;
        this.schema = {
            ...schema,
            isActive: {
                type: String,
                enum: Object.values(Common.STATUS),
                default: Common.STATUS.ACTIVE,
            },
        };

        this.init();
    }

    init() {
        const schema = new mongoose.Schema(this.schema, this.options);
        return mongoose.model(this.modelName, schema);
    }
}

module.exports = BaseModel;
