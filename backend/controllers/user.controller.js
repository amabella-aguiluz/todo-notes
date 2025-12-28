import {createUserService, getUserEmailService} from '../services/user.service.js';
import errorMsg from '../utils/error.js'; 
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from "dotenv";

dotenv.config();

// register new
export const registerController = async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await createUserService(email, password);
    res.status(201).json({message: 'User successfully registered', userId: user.id});
    console.log(`created user ${userId}`);
  }
  catch (err) {
    errorMsg();
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

export default {
  registerController, loginController
};