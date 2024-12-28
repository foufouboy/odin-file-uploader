const errorHandler = (err, req, res, next) => {
    res.status(err.status).json({
        status: err.status,
        message: err.message,
    });
}

export default errorHandler;