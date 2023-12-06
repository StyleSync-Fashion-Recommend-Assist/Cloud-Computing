const jwt = require("jsonwebtoken");

function generateAccsToken(payload) {
    return jwt.sign(payload, procces.env.JWT_SECRET, {
        expiresIn: "3m",
    });
}

module.exports = generateAccsToken;