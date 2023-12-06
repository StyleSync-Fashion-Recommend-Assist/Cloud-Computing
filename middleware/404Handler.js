function handler404(err, req, res, next){
    console.log(err);
    res.status(404).json({
        status: "Error Accured",
        message: err.message,
    });
};

module.exports = handler404;