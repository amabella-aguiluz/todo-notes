import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// save email and hash password
export const createUserService = async (email, password, passwordConfirm) => {
    if (!email || !password || !passwordConfirm) {
        throw new Error("All fields are required");
    };

    if (password !== passwordConfirm) {
        throw new Error("Passwords do not match");
    };

    if (!email || !password) {
        throw new Error("Email and password are required");
    };
    const existingUser = await getUserEmailService(email);
    if (existingUser) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return User.create({ email, password_hash: hashedPassword});
};

// find if user email already exists
export const getUserEmailService = async(email) =>{
    return User.findOne({where: {email} });
};


    // forgot password
// generate a token to reset password
export const generatePasswordResetToken = (user) => {
  // Token expires in 15 mins
  return jwt.sign({ userId: user.id, purpose: 'password_reset'},
     process.env.JWT_SECRET,
      { expiresIn: '15m' });
};

// validated password reset
export const resetPasswordService = async (userId, newPassword) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  return await User.update({ password_hash: hashedPassword }, { where: { id: userId } });
};


export default {
    createUserService,
    getUserEmailService,
    generatePasswordResetToken,
    resetPasswordService
};