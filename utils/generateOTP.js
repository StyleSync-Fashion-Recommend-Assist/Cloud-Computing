const otpGenerator = require("otp-generator");
function generateOTP(){
    return otpGenerator.generate(6, 
        { 
            upperCaseAlphabets: true, 
            specialChars: false 
        });
}; 

module.exports = generateOTP;