import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt_helper';
import { middlewareWrapper } from '../utils/middlewareWrapper'; 
import { UUIDTypes } from 'uuid';

interface JwtPayloadWithUserId {
    userId: string | UUIDTypes;
}

export const authenticateJWT = middlewareWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        throw { status: 403, message: 'No token provided' };
    }

    const decoded = verifyToken(token);

    if (!decoded) {
        throw { status: 401, message: 'Invalid or expired token' };
    }

    const { userId } = decoded as JwtPayloadWithUserId;

    if (!req.body) {
        req.body = {};
    }

    req.body.userId = userId;

});