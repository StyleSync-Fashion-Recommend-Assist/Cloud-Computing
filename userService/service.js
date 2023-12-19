const { token } = require('morgan');
const {User, ResPassword} = require('../models');
const generateAccsToken = require('../utils/generateAccsToken');
const generateOTP = require('../utils/generateOTP');
const sendMail = require('../utils/sendMail');
const bcrypt = require("bcrypt");



const service = {
    userLogin: async (email, password) => {
        // Cari spesifik User dengan email yang diberikan
        const login = await User.findOne({where: {email: email}});
        if (!login){
            throw new Error('User Not Found');
        }

        // Validasi password
        const validPassword = await bcrypt.compareSync(password, login.password);

        // Jika password tidak sesuai
        if (!validPassword) {
            throw new Error('Invalid password');
        }

        // generate access token
        const accessToken = generateAccsToken({uuid: login.uuid}, "24h");
        await login.update({token: accessToken});
        await login.save();
        return accessToken;
    }, 

    registerUser: async (name, email, password) => {
        console.log(name,email,password);
        const hashPw = await bcrypt.hash(password, 10);
        const [user, created] = await User.findOrCreate({
            where: {email: email},
            defaults: {
                name: name,
                email: email,
                password: hashPw,
            },
        });

        if (!created){
            throw new Error('User Already Exists');
        }; 

        return {
            id: user.id,
            uuid: user.uuid,
            name: user.name,
            email: user.email,
            password: user.password,
        };
    },

    userLogOut: async (uuid) => {
        // Cari user berdasarkan UUID 
        const user = await User.findOne({
            where: {
                uuid: uuid
            }
        })
        if (!user){
            throw new Error('User not found');
        }

        // Logout User dengan Menghapus token atau session
        await user.update({token: null});
        await user.save();
        return user;
    },

    changePassword: async (uuid, oldPassword, newPassword) => {
        // Cari user berdasarkan id
        const user = await User.findOne({
            where: {
                uuid: uuid,
            }
        })
        if (!user){
            throw new Error('User not found');
        }
        
        // Validasi password lama
        const validasi = await bcrypt.compareSync(oldPassword, user.password);
        if (!validasi) {
            throw new Error('Invalid password');
        }
        
        // Update password
        const hashNewPassoword = await bcrypt.hash(newPassword, 10);
        await user.update({password: hashNewPassoword});
        return user;
    },
    
     /* 
     *** 
        Code dibawah berhubungan dengan Forget Password
        Mekanisme Forget Password biasanya, meliputi: 
        1. Verifikasi Identitas
        2. Pengaturan Ulang Kata Sandi: Opsi untuk ngatur ulang kata sandi


        Mengerimkan Kode OTP ke email yang untuk memastikan apakah benar ini penggunanya 
     ***
     */
    generatePassOTP: async (email) => {
        const user = await User.findOne({where: {email: email}});
        if (!user){
            throw new Error('User not found');
        }
        
        const otp = generateOTP();
        const resetOTP = await ResPassword.create({
            userId: user.id,
            email: email,
            otp,
        });

        await sendMail({
            to: email,
            otp: otp,
        });

        return resetOTP; // Data dari databse ResPassword
    },

    /* Pengaturan Ulang Kata Sandi */
    verifyResetPasswordOTP: async (otp) => {
        const resetOTP = await ResPassword.findOne({
            where: {
                otp
            }, 
            include: [
                {
                    model: User,
                    attributes: ["uuid"],
                }
            ],
        });

        if (!resetOTP){
            throw new Error('Invalid OTP');
        }

        const otpJSON = resetOTP.toJSON();
        return otpJSON.User.uuid
    },

    generateNewResetPassword : async (uuid, newPassword, confirmPassword) => {
        const user = await User.findOne({
          where: {
            uuid,
          },
        });
    
        if (!user) {
          throw new Error("User not found");
        }
    
        if (newPassword !== confirmPassword) {
          throw new Error("Confirm Password is not same");
        }
    
        await user.update({
          password: await bcrypt.hash(newPassword, 10),
        });
    
        return user;
    },

    deleteOTP : async (otp, uuid) => {

        const user = await User.findOne({
          where: {
            uuid
          }
        });
    
        const resOtp = await ResPassword.destroy({
          where: {
            otp,
            id_user: user.id
          },
        });
    
        if(!resOtp){
          throw new Error("Otp not found")
        }
    
        return true;
    },

    
    getDetailProfile: async (uuid, res) => {
        const user = await User.findOne({
            where: {
                uuid: uuid,
            }
        });

        console.log(user.token);

        // Kalau User logout 
        if (!user.token){
            res.status(403).json({
                status: "Failed",
                message: "User ini udah Log Out",
            });
        }
        if (!user){
            throw new Error('User not found');
        }

        return {
            id: user.id,
            uuid: user.uuid,
            name: user.name,
            email: user.email,
            height: user.height,
            weight: user.weight,
        }
    }, 

    updateProfile: async (uuid, name, height, weight, gender) => {
        const user = await User.findOne({
            where: {
                uuid: uuid,
            }
        });
        if (!user){
            throw new Error('User not found');
        }

        await user.update({
            name: name,
            height: height,
            weight: weight,
            gender: gender,
        });
    },
}

module.exports = service;
