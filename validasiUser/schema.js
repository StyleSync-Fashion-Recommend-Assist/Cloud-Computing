const joi = require('joi');

const registerSchema = joi.object({
    name: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(), // Perbaiki ke required()
  });

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).email().required(),
});

const changePasswordSchema = joi.object({
    oldPassword: joi.string().min(8).email().required(),
    newPassword: joi.string().min(8).email().required(),
});

const resetPasswordSchma = joi.object({
    password: joi.string().min(8).email().required(),
    confirmPassword: joi.string().min(8).email().required(),
});

const updateProfileSchema = joi.object({
    name: joi.string().min(3).max(30).required(),
    tinggiBadan: joi.number().integer().required(),
    beratBadan: joi.number().integer().required(),
    phoneNumber: joi.number().min(10).integer().required(),
}); 

module.exports = {
    registerSchema,
    loginSchema,
    changePasswordSchema,
    resetPasswordSchma,
    updateProfileSchema
}