import User from '..models/user.model.js';
import bcrypt from 'bcryptjs';

// save emial and hash password
export const createUser = async (email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return User.create({ email, password: hashedPassword});
};

// find if user email already exists
export const getUserByEmail = async(email) =>{
    return User.findOne({where: {email} });
};

export default {
    createUser,
    getUserByEmail
};