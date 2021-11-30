// @ts-check

const openTracing = require('opentracing');
const initJaegerTracer = require('jaeger-client').initTracerFromEnv;
const { commonConfig, tracingConfig } = require('../config');

exports.initTracer = () => {
    const { env } = commonConfig;

    let sampler;
    if (env === 'development') {
        sampler = {
            type: 'const',
            param: 1,
        };
    } else {
        sampler = {
            type: 'probabilistic',
            param: tracingConfig.sampleRate,
        };
    }

    const config = {
        sampler,
        serviceName: commonConfig.serviceName,
    };

    const tracer = initJaegerTracer(config, {});
    return openTracing.initGlobalTracer(tracer);
};

exports.getGlobalTracer = () => openTracing.globalTracer();
