// Import Necesarry Libraries
require('dotenv').config(__dirname + '/../../../.env');

// Import Necessary Files
const {
    validateLoginSchema,
    validateRegisterSchema,
    validateChangePasswordSchema,
    validateResetPasswordSchema
} = require('../../../validasiUser');
const userService = require('../../../userService/service');
const CryptoJS = require('crypto-js');
const AES = require('crypto-js/aes');

/* 
*** 
    POST METHOD: 
    - Register
    - Login 
    - Logout
    - Change Password
    - Reset Password with otp
***
*/
const handlerRegisterUser = async (req, res, next) => {
    try {
        const {name, email, password} = req.body;
        validateRegisterSchema({name, email, password});
        const user = await userService.registerUser(name, email, password);
        res.status(201).json({
            message: "User berhasil Register",
            accesToken: user // user_id, token, nama, email, hashPassword
        });
    } catch (error) {
        next(error);
    }
};

const handlerLoginUser = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        validateLoginSchema({email, password});
        const user = userService.userLogin(email, password);
        res.status(200).json({
            message: "User berhasil Login",
            data: user // User Token atau session
        });
    } catch (error) {
        next(error);
    }
}; 

const handlerLogoutUser = async (req, res, next) => {
    try{
        const uuid = req.user.uuid;
        const user = await userService.userLogOut(uuid);
        res.status(200).json({
            status: "Success",
            message: "Logout Berhasil",
        });
    } catch (errorr){
        next(error);
    }
}; 

const handlerChangePassword = async (req, res, next) => {
    try{
        const {oldPassword, newPassword} = req.body;
        const uuid = req.user.uuid;
        validateChangePasswordSchema({oldPassword, newPassword});
        const user = await userService.changePassword(uuid, oldPassword, newPassword);
        res.status(200).json({
            status: "Success",
            message: "Ubah Password Berhasil",
        });
    } catch(error){
        next(error);
    }
};

const handlerResetPasswordOTP = async (req, res, next) => {
    try{
        const {email} = req.body;
        const user = await userService.generatePassOTP(email);
        res.status(200).json({
            status: "Success",
            message: "The OTP message was successfully sent to email"
        });
    } catch (error){
        next(error);
    }
}; 

const handlerVerifyResetPasswordOTP = async (req,res,next) => {
    try {
        const {otp} = req.body;
        let regex = /\//g
        const verifiedOtpUuid = await userService.verifyResetPasswordOTP(otp);

        const encryptedUuid = AES.encrypt(verifiedOtpUuid,process.env.AES_ENCRYPT_KEY).toString();
        const fixedUuid =  encryptedUuid.replace(new RegExp(regex), '{slash}');

        await userService.deleteOTP(otp, verifiedOtpUuid)
        
        res.status(200).json({
            status: "success",
            message: "Otp verified",
            key: fixedUuid
        });

    } catch (error) {
        next(error)
    }
};

const  handlerGenerateNewResetPassword = async (req,res,next) => {
    try {
        const {encryptKey, password, confirmPassword} = req.body;

        validateResetPasswordSchema({password, confirmPassword});

        let regex = /{slash}/g
        const reformedEncryptKey = encryptKey.replace(new RegExp(regex), '/');
        console.log(reformedEncryptKey);
        const decryptedKey = AES.decrypt(reformedEncryptKey,process.env.AES_ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);


        const newPassword = await userService.generateNewResetPassword(decryptedKey, password, confirmPassword);

        res.status(200).json({
            status: "success",
            message: "success update user password"
        });    

    } catch (error) {
        next(error)
    }
};


/* 
***
    GET METHOD:
    - Get Detail Profile
***
 */
const handlerGetDetailProfile = async (req, res, next) => {
    try {
        const uuid = req.user.uuid;
        const user = await userService.getDetailProfile(uuid);
        res.status(200).json({
            status: "Success",
            data: user
        });
    } catch (error) {
        next(error);
    }
};

/* 
***
    PUT METHOD:
    - Update Profile
***
*/

const handlerUpdateProfile = async (req, res, next) => {
    try{
        const {name, height, weight, gender} = req.body;
        const {uuid} = req.user;
        const user = await userService.updateProfile(uuid, name, height, weight, gender);
    } catch (error){
        next(error);
    }
};


module.exports = {
    handlerRegisterUser,
    handlerLoginUser,
    handlerLogoutUser,
    handlerChangePassword,
    handlerResetPasswordOTP,
    handlerVerifyResetPasswordOTP,
    handlerGenerateNewResetPassword,
    handlerGetDetailProfile,
    handlerUpdateProfile
};
