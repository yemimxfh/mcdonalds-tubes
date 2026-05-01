import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt_helper';
import { middlewareWrapper } from '../utils/middlewareWrapper'; 
import { User } from '../../models/user';

interface AuthenticatedRequest extends Request {
    user?: User;
}

export const authenticateJWT = middlewareWrapper(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        throw { status: 403, message: 'Token nggak ada, login dulu ya!' };
    }

    const decoded = verifyToken(token) as { id: string };

    if (!decoded || !decoded.id) {
        throw { status: 401, message: 'Token salah atau sudah kadaluarsa' };
    }

    const user = await User.findByPk(decoded.id);
    if (!user) {
        throw { status: 401, message: 'User tidak ditemukan' };
    }
    req.user = user; 
});

export const authorizeRole = (roles: string[]) => {
    return middlewareWrapper(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            throw { status: 403, message: 'Maaf, kamu nggak punya akses ke sini!' };
        }
    });
};