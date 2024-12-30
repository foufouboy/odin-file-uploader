const errorHandler = (err, req, res, next) => {
    res.json({
        status: err.status,
        message: err.message,
    });
}

export default errorHandler;