const { serverConfig } = require('../config');
const logger = require('../components/logger');

const app = require('./server');
const errorHandler = require('../components/error-handler');
const { traceRequest } = require('../middlewares/tracer');
const { initTracer } = require('../components/tracing');
const { setupJob } = require('../jobs');
const { connectMongo } = require('../components/connect-mongo');

const loadAPI = require('./route');

function runServer(app, port) {
    return new Promise(res => {
        app.listen(port, res);
    });
}

async function main() {
    const port = serverConfig.port;

    // connect db
    await connectMongo();

    // initialize components
    initTracer();
    setupJob();

    // inject tracer
    app.use(traceRequest);

    // inject api
    loadAPI(app);

    // inject error handler
    app.use(errorHandler);

    await runServer(app, port);
    logger.info(`Server started at port ${serverConfig.port}`);
}

main().catch(err => {
    logger.error(err, 'kill process');
    process.exit(1);
});
