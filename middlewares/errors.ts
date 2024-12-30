const errorHandler = (err, req, res, next) => {
    const status = err.status || 400;

    res.json({
        status: status,
        message: err.message,
    });
}

export default errorHandler;