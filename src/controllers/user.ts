import { Request } from 'express';
import { User } from '../../models/user';
import { controllerWrapper } from '../utils/controllerWrapper';
import { generateToken } from '../utils/jwt_helper';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { PasswordReset } from '../../models/password-reset';
import { sendResetPasswordEmail } from '../utils/mailer';

export const register = controllerWrapper(async (req: Request) => {

    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw { status: 400, message: "Email ini sudah terdaftar di sistem McD!" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        name,    
        email,
        password: hashedPassword,
        role: role || 'cashier' 
    });

    return {
        message: "Akun kasir/admin berhasil dibuat!",
        data: { 
            id: newUser.id, 
            name: newUser.name 
        }
    };
});

export const login = controllerWrapper(async (req) => { 
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw { status: 401, message: "Email atau Password salah!" };
    }

    const token = generateToken({ id: user.id, role: user.role });

    return {
        message: "Login Berhasil!",
        token,
        data: {
            name: user.name, 
            role: user.role
        }
    };
});

export const forgotPassword = controllerWrapper(async (req: Request) => {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw { status: 404, message: "Email tidak ditemukan di sistem McD!" };
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiredAt = new Date();
    expiredAt.setHours(expiredAt.getHours() + 1);

    await PasswordReset.create({
        user_id: user.id,
        email: user.email,
        token: token,
        expired_at: expiredAt,
        is_used: false
    });

    await sendResetPasswordEmail(user.email, token);

    return {
        message: "Link reset password sudah dikirim ke email (Cek Ethereal)!"
    };
});

export const resetPassword = controllerWrapper(async (req: Request) => {
    const { token, newPassword } = req.body;

    const resetEntry = await PasswordReset.findOne({ 
        where: { token, is_used: false } 
    });

    if (!resetEntry) {
        throw { status: 400, message: "Token tidak valid atau sudah digunakan!" };
    }

    if (new Date() > resetEntry.expired_at) {
        throw { status: 400, message: "Token sudah kadaluwarsa!" };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.update(
        { password: hashedPassword },
        { where: { id: resetEntry.user_id } }
    );

    await resetEntry.update({ is_used: true });

    return { message: "Password berhasil diubah! Silakan login kembali." };
});