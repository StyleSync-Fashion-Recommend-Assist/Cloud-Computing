const express = require('express');

// ! User
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

// ! Outfit
const { handlerGetAllOutfits,
    handlerGetOutfitById,
    handlerGetOutfitByOccupation,
    handlerAddOutfit,
    handlerAddItemToOutfit,
    handlerChangeFavorite,
    handlerUpdateOutfit,
    handlerDeleteOutfit,
    handlerDeleteItem } = require('../handler/app/Closet/outfit.controller');

// ! Closet
const {
    handlerAddItem, 
    handlerChangeFav,
    handlerDeleteClosetItem,
    handlerGetAllKategori,
    handlerGetClosetById,
    handlerGetItemByOutfitId,
    handlergetItemByCategory,
    handlergetItemBySubCategory,
    handlerGetSubByCategory,
    handlerGetOutfitByName,
    handlerUpdateData } = require('../handler/app/Closet/closet.controller');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// ! USER ! //
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

// ! CLOSET ! //
router.post('/closet/addItem', authenticateToken, handlerAddItem);
router.post('/closet/changeFav', authenticateToken, handlerChangeFav);

router.get('/closet/allKategori', authenticateToken, handlerGetAllKategori);
router.get('/closet/closetById', authenticateToken, handlerGetClosetById);
router.get('/closet/itemByOutfitId', authenticateToken, handlerGetItemByOutfitId);
router.get('/closet/itemByCategory', authenticateToken, handlergetItemByCategory);
router.get('/closet/itemBySubCategory', authenticateToken, handlergetItemBySubCategory);
router.get('/closet/subByCategory', authenticateToken, handlerGetSubByCategory);
router.get('/closet/outfitByName', authenticateToken, handlerGetOutfitByName);

router.put('/closet/update', authenticateToken, handlerUpdateData);

router.delete('/closet/delete', authenticateToken, handlerDeleteClosetItem);

// ! OUTFIT ! /
router.get('/outfit/allOutfit', authenticateToken, handlerGetAllOutfits);
router.get('/outfit/id', authenticateToken, handlerGetOutfitById);
router.get('/outfit/occupation', authenticateToken, handlerGetOutfitByOccupation);

router.post('/outfit/addItemOutfit', authenticateToken, handlerAddItemToOutfit);
router.post('/outfit/changeFav', authenticateToken, handlerChangeFavorite);
router.post('/outfit/addOutfit', authenticateToken, handlerAddOutfit);

router.put('/outfit/update', authenticateToken, handlerUpdateOutfit);

router.delete('/outfit/delete', authenticateToken, handlerDeleteOutfit);
router.delete('/outfit/deleteItem', authenticateToken, handlerDeleteItem);


module.exports = router;