import { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';

// Extend Request to include user_id from auth middleware
export interface AuthRequest extends Request {
    user_id: number;
}

// creates a jwt token to verify a user

export const authMiddleware = (req: AuthRequest, res: Response,  next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    // no jwt token
    if (!token) return res.status(401).json({ error: 'No token provided' });

    try {
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error('JWT_SECRET not defined');
        }

        const decoded = jwt.verify(token, secret) as JwtPayload;

        // Make sure userId exists in token
        if (!decoded.user_id) {
            return res.status(401).json({ error: 'Invalid token payload' });
        }

        req.user_id = decoded.user_id;

        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

export default authMiddleware;