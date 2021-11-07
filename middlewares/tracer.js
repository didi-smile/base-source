const openTracing = require('opentracing');
const tracer = require('../components/tracing').getGlobalTracer();

exports.traceRequest = (req, res, next) => {
    const writeCtx = tracer.extract(openTracing.FORMAT_HTTP_HEADERS, req.headers);
    const span = tracer.startSpan(req.path, {
        childOf: writeCtx,
    });

    span.log({ event: 'request_received' });
    span.setTag(openTracing.Tags.HTTP_METHOD, req.method);
    span.setTag(openTracing.Tags.HTTP_URL, req.path);
    span.setTag(openTracing.Tags.SPAN_KIND, openTracing.Tags.SPAN_KIND_RPC_SERVER);

    const responseHeaders = {};
    tracer.inject(span, openTracing.FORMAT_HTTP_HEADERS, responseHeaders);
    res.set(responseHeaders);

    Object.assign(req, { span });
    const finishSpan = () => {
        if (res.statusCode >= 400) {
            span.setTag(openTracing.Tags.SAMPLING_PRIORITY, 1);
            span.setTag(openTracing.Tags.ERROR, true);
            span.log({ event: 'error', message: res.statusMessage });
        }

        span.setTag(openTracing.Tags.HTTP_STATUS_CODE, res.statusCode);
        span.log({ event: "request_end" });
        span.finish();
    };

    res.on('finish', finishSpan);
    next();
};
