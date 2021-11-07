exports.serverConfig = {
    port: process.env.PORT || 3000,
};

exports.getCORSOrigin = () => {
    const origins = process.env.ORIGINS || '*';
    return origins.split(',').map(o => o.trim());
};

exports.mongoConfig = {
    connection: process.env.MONGO_CONNECTION || 'mongodb://localhost:27017/test',
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
};

exports.redisConfig = {
    host: process.env.REDIS_HOST || 'redis://127.0.0.1:6379',
};

exports.commonConfig = {
    env: process.env.NODE_ENV || 'development',
    serviceName: process.env.SERVICE || 'app',
};

exports.loggerConfig = {
    service: process.env.SERVICE || 'app',
    elasticHost: process.env.ELASTIC_HOST,
    elasticUser: process.env.ELASTIC_USER,
    elasticPass: process.env.ELASTIC_PASS,
    level: process.env.LOG_LEVEL || 'info',
};
