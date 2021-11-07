const openTracing = require('opentracing');
const initJaegerTracer = require('jaeger-client').initTracerFromEnv;
const { commonConfig } = require('../config');

exports.initTracer = () => {
    const env = commonConfig.env;

    let sampler;
    if (env == 'development') {
        sampler = {
            type: 'const',
            param: 1,
        };
    } else {
        sampler = {
            type: 'probabilistic',
            param: 0.1,
        };
    }

    const config = {
        sampler,
        serviceName: commonConfig.serviceName,
    };

    const tracer = initJaegerTracer(config);
    return openTracing.initGlobalTracer(tracer);
};

exports.getGlobalTracer = () => {
    return openTracing.globalTracer();
};
