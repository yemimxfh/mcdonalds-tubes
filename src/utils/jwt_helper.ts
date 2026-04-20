import jwt from 'jsonwebtoken';
import { UUIDTypes } from 'uuid';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key'; 

export const generateToken = (userId: UUIDTypes): string => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '30d' }); 
};

export const verifyToken = (token: string): { userId: string } | null => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { userId: string };
    return decoded;
  } catch (err) {
    return null;
  }
};