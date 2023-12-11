const jwt = require("jsonwebtoken");
require('dotenv').config('./env');

function generateAccsToken(payload) {
    return jwt.sign(payload, process.env.TokenSecretKey, {
        expiresIn: "1m",
    });
}

module.exports = generateAccsToken;