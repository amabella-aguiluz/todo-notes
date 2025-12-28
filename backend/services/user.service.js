import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

// save email and hash password
export const createUserService = async (email, password) => {
    if (!email || !password) {
        throw new Error("Email and password are required");
    };

    const hashedPassword = await bcrypt.hash(password, 10);
    return User.create({ email, password_hash: hashedPassword});
};

// find if user email already exists
export const getUserEmailService = async(email) =>{
    return User.findOne({where: {email} });
};

export default {
    createUserService,
    getUserEmailService
};