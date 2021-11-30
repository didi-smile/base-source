// @ts-check

require('dotenv').config();

const { serverConfig } = require('../config');
const logger = require('../components/logger');

const app = require('./server');
const errorHandler = require('../components/error-handler');
const { traceRequest } = require('../middlewares/tracer');
const { initTracer } = require('../components/tracing');
const { setupJob } = require('../jobs');
const { connectMongo } = require('../components/connect-mongo');

// load models
require('./model');

const loadAPI = require('./routes');
const { connectRedis } = require('../components/redis');

function runServer(server, port) {
    return new Promise(res => {
        server.listen(port, res);
    });
}

async function main() {
    const { port } = serverConfig;

    // connect db
    await connectMongo();

    // connect redis
    await connectRedis();

    // initialize components
    initTracer();
    setupJob();

    // inject tracer
    app.use(traceRequest);

    // inject api
    loadAPI(app);

    // inject error handler
    app.use(errorHandler(logger));

    await runServer(app, port);
    logger.info(`Server started at port ${serverConfig.port}`);
}

main().catch(err => {
    logger.error(err, 'kill process');
    process.exit(1);
});
