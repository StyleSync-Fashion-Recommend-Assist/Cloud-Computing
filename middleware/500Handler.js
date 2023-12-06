function handler500(err, req, res, next) {
    console.log(err);
    res.status(500).json({
        status: "Error Accured",
        message: err.message,
    });
}

module.exports = handler500;