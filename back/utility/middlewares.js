function asyncHandler(fn) {
    return async function(req, res, next) {
        try {
            await fn(req, res, next);
        } catch (error) {
            next(error);
        }
    };
}

function errorHandler(err, req, res, next) {
    console.error(err);

    res.status(err.status).json({
        success: false,
        error: err.message
    });
}

function loggerMiddleware(req, res, next) {
    console.log(`${req.method} - ${req.url}`)
    next()
}

module.exports = { asyncHandler, errorHandler, loggerMiddleware };