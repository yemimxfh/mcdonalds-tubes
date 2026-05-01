import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'mcd_super_secret_key'; 

export const generateToken = (payload: { id: string, role: string }) => {
    return jwt.sign(payload, SECRET_KEY, {
        expiresIn: '1d'
    });
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { id: string, role: string };
    return decoded;
  } catch (err) {
    return null;
  }
};