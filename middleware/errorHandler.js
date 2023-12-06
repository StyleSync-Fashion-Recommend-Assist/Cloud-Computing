function errorHandler(err, req, res, next) {
    console.log(err);
    res.status(400).json({
        status: 'Sorry, an Error Accured',
        message: err.message,
    });
};

module.exports = errorHandler;