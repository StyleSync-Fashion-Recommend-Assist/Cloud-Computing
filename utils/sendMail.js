require("dotenv").config(__dirname + "../../.env");
const nodemailer = require("nodemailer");

const settings = {
        host: process.env.HOST_EMAIL,
        service: 'gmail',
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
    }

const transporter = nodemailer.createTransport(settings);
const sendMail = async (data) => {
    try{
        const info = await transporter.sendMail({
            from: process.env.MAIL_USER, // sender address
            to: data.to, // list of receivers
            subject: "Verification Code for Account Verification", // Subject line
            html: `
            <div
                class="container"
                style="max-width: 90%; margin: auto; padding-top: 20px"
            >
                <h2>Hello!</h2>
                <p style="margin-bottom: 30px;">Your OTP (One-Time Password) for account verification is</p>
                <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${data.OTP}</h1>               
            </div>
            `,
          });
        return info;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = sendMail;