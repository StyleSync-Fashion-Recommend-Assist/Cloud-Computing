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
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

/* USERS */
// Restrasi dan Login
router.post('/register', handlerRegisterUser);
router.post('/login', handlerLoginUser);    

// Memerlukan Autentifikasi
router.post('/user/changepassword', authenticateToken, handlerChangePassword);
router.post('/user/genotp', handlerResetPasswordOTP);
router.post('/user/verifyotp', handlerVerifyResetPasswordOTP);
router.post('/user/resetpassword', handlerGenerateNewResetPassword);
router.post('/logout', authenticateToken, handlerLogoutUser);


// Get Detail Profile
router.get('/user/profile', authenticateToken, handlerGetDetailProfile);

// Update Profile
router.put('/user/update', authenticateToken, handlerUpdateProfile);

module.exports = router;