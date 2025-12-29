<<<<<<< HEAD
import {createUserService, getUserEmailService} from '../services/user.service.js';
=======
import {createUserService, getUserEmailService, generatePasswordResetToken,
    resetPasswordService} from '../services/user.service.js';
>>>>>>> backend-dev
import errorMsg from '../utils/error.js'; 
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from "dotenv";

dotenv.config();

// register new
export const registerController = async (req, res) => {
<<<<<<< HEAD
  const {email, password} = req.body;
  try {
    const user = await createUserService(email, password);
    res.status(201).json({message: 'User successfully registered', userId: user.id});
    console.log(`created user ${userId}`);
  }
  catch (err) {
    errorMsg();
=======
  const {email, password, passwordConfirm} = req.body;
  try {
    const user = await createUserService(email, password, passwordConfirm);
    console.log(`registering...`);
    res.status(201).json({message: 'User successfully registered', userId: user.id});
    console.log(`created user ${user.id}`);
  }
  catch (err) {
    errorMsg(res, err);
>>>>>>> backend-dev
  }
};

// login to account
export const loginController = async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await getUserEmailService(email);
    if(!user) return res.status(404).json({error: 'User not found'});

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({error: 'Invalid password'});
    

    const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: '2h'});
    res.json({token, userId: user.id});
    console.log(`logged into user ${userId}`);
  }
  catch(err) {
    errorMsg(res, err);
    console.log(`could not log into user ${userId}`);
  }
};

<<<<<<< HEAD
export default {
  registerController, loginController
=======
  // forgot password
// Request password reset
export const forgotPasswordController = async (req, res) => {
  const { email } = req.body;
  if (!email)
    return res.status(400).json({ error: 'Email required' });
  try {
    const user = await getUserEmailService(email);
    
    if (!user) return res.status(404).json({ error: "User not found" });

    const token = generatePasswordResetToken(user);
    // TODO: send token via email
    res.json({ message: "Reset token generated", token });
    // TODO: send token via email
  } catch (err) {
    errorMsg(res, err);
  }
};

// Reset password
export const resetPasswordController = async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword)
    return res.status(400).json({ error: 'Token and new password required' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.purpose !== 'password_reset')
      return res.status(400).json({ error: 'Invalid reset token' });

    await resetPasswordService(decoded.userId, newPassword);

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    return res.status(400).json({ error: 'Invalid or expired token' });
  }
};


export default {
  registerController, loginController, forgotPasswordController, resetPasswordController
>>>>>>> backend-dev
};