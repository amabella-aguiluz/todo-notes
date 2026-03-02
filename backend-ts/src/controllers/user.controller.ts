import {
    createUserService, getUserEmailService, generatePasswordResetToken,
    resetPasswordService
} from '../services/user.service.js';

import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from "dotenv";
import { Response } from 'express';

dotenv.config();

// register new
export const registerController = async (req: Request, res: Response) => {
    try {
        const { email, password, passwordConfirm } = req.body as unknown as
            {
                email: string,
                password: string,
                passwordConfirm: string
            };
        const user = await createUserService(email, password, passwordConfirm);

        console.log(`registering...`);
        res.status(201).json({ message: 'User successfully registered', user_id: user.user_id });
        console.log(`created user ${user.user_id}`);
    }
    catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
};

// login to account
export const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body as unknown as
            {
                email: string,
                password: string
            };
        const user = await getUserEmailService(email);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const valid = await bcrypt.compare(password, user.password!);
        if (!valid) return res.status(401).json({ error: 'Invalid password' });

        const secret = process.env.JWT_SECRET!;
        const token = jwt.sign({ user_id: user.user_id }, secret, { expiresIn: '2h' });

        res.json({ token, user_id: user.user_id });
        console.log(`logged into user ${user.user_id}`);
    }
    catch (err) {
        res.status(500).json({ error: (err as Error).message });;
        console.log(`could not log into user`, err);
    }
};

// forgot password
// Request password reset
export const forgotPasswordController = async (req: Request, res: Response) => {
    try {
        const { email } = req.body as unknown as
            { email: string };
        if (!email)
            return res.status(400).json({ error: 'Email required' });

        const user = await getUserEmailService(email);
        if (!user) return res.status(404).json({ error: "User not found" });

        const token = generatePasswordResetToken(user.user_id);

        // TODO: send token via email
        res.json({ message: "Reset token generated", token });
        // TODO: send token via email
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
};

// Reset password
export const resetPasswordController = async (req: Request, res: Response) => {
    try {
        const { token, newPassword } = req.body as unknown as
            {
                token: string,
                newPassword: string
            };
        if (!token || !newPassword)
            return res.status(400).json({ error: 'Token and new password required' });

        const secret = process.env.JWT_SECRET!;
        if (!secret) throw new Error("JWT_SECRET not defined");
        const decoded = jwt.verify(token, secret) as JwtPayload & { user_id: number; purpose: string };;

        if (decoded.purpose !== 'password_reset')
            return res.status(400).json({ error: 'Invalid reset token' });

        await resetPasswordService(decoded.user_id, newPassword);
        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        return res.status(400).json({ error: 'Invalid or expired token' });
    }
};


export default {
    registerController, loginController, forgotPasswordController, resetPasswordController
};