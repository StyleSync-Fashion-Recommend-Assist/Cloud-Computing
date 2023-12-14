const jwt = require("jsonwebtoken");
require('dotenv').config('./env');

function generateAccsToken(payload, time = null) {
    if (time){
        console.log("masuk")
        return jwt.sign(payload, process.env.TokenSecretKey, {
            expiresIn: time,
        })
    };

    return jwt.sign(payload, process.env.TokenSecretKey, {
        expiresIn: 1,
    });
}
module.exports = generateAccsToken;