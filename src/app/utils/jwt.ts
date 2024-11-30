import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

// Generate JWT Token
export const generateToken = (userId: string,email:string): string => {
  return jwt.sign({ id: userId,email: email}, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Verify JWT Token
export const verifyToken = (token: string): jwt.JwtPayload => {
    
  return jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
};
