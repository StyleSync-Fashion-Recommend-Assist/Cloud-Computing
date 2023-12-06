const {registerSchema, loginSchema, changePasswordSchema, resetPasswordSchma, updateProfileSchema} = require('./schema');

// Validasi untuk Register
function validateRegisterSchema(data) {
    const validate = registerSchema.validate(data);
    if (validate.error) {
        return validate.error.message;
    }
};

// Validasi untuk Login Schema
function validateLoginSchema(data) {
    const validate = loginSchema.validate(data);
    if (validate.error) {
        return validate.error.message;
    }
};

// Validasi untuk Change Password
function validateChangePasswordSchema(data) {
    const validate = changePasswordSchema.validate(data);
    if (validate.error) {
        return validate.error.message;
    }
};

// Validasi untuk Reset Password
function validateResetPasswordSchema(data) {
    const validate = resetPasswordSchma.validate(data);
    if (validate.error) {
        return validate.error.message;
    }
}; 

module.exports = {
    validateRegisterSchema,
    validateLoginSchema,
    validateChangePasswordSchema,
    validateResetPasswordSchema,
}