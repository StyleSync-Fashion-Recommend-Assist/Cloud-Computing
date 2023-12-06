const express = require('express');
const { handlerRegisterUser,
    handlerLoginUser,
    handlerLogoutUser,
    handlerChangePassword,
    handlerResetPasswordOTP,
    handlerVerifyResetPasswordOTP,
    handlerGenerateNewResetPassword,
    handlerGetDetailProfile,
    handlerUpdateProfile
} = require('../handler/app/User/handler');
const {authenticateToken} = require('../middleware/authenticateToken');

    








const router = express.Router();