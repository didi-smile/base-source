// @ts-check

function isAsync(f) {
    return f.constructor.name === 'AsyncFunction';
}

/*
 * params
 * - f: is a controller function
 * return
 * - wrapper function with try catch
*/
exports.tryCatchWrapper = f => {
    if (typeof f === 'function') {
        if (isAsync(f)) {
            return async function (req, res, next) {
                try {
                    await f(req, res);
                } catch (error) {
                    next(error);
                }
            };
        }
        return function (req, res, next) {
            try {
                f(req, res);
            } catch (error) {
                next(error);
            }
        };
    }
    throw new Error('input must be a function');
};
