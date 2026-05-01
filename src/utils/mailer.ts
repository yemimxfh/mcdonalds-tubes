import nodemailer from 'nodemailer';


export const sendResetPasswordEmail = async (to: string, token: string) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'johathan.ruecker@ethereal.email', // Email baru
            pass: '3JZsSFPQpMHTM9rksG'               // Password baru
        }
    });

    await transporter.sendMail({
        from: '"McD Security 🛡️" <security@mcd-gacor.com>',
        to: to,
        subject: "Reset Password Kamu",
        html: `<b>Klik link ini untuk reset password:</b> <a href="http://localhost:3000/reset?token=${token}">Reset Password</a>`
    });
};