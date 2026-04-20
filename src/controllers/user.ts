import { Request } from 'express';
import { User } from '../../models/user';
import { controllerWrapper } from '../utils/controllerWrapper';
import { generateToken } from '../utils/jwt_helper';
import bcrypt from 'bcrypt';

export const register = controllerWrapper(async (req: Request) => {
    const { username, email, password, role } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw { status: 400, message: "Email ini sudah jadi member McD!" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        role: role || 'customer'
    });

    return {
        message: "Akun berhasil dibuat, selamat bergabung!",
        data: { id: newUser.id, username: newUser.username }
    };
});

export const login = controllerWrapper(async (req: Request) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw { status: 401, message: "Email atau Password salah, coba cek lagi!" };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw { status: 401, message: "Email atau Password salah, coba cek lagi!" };
    }

    const token = generateToken(user.id);

    return {
        message: "Login Berhasil! Drive-thru sekarang?",
        token: token,
        role: user.role
    };
});