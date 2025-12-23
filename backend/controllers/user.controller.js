import userService from '../services/notes.service.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from "dotenv";

dotenv.config();

// register new
export const register = async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await userService.createUser(email, password);
    res.status(201).json({message: 'User successfully registered', userId: user.id});
  }
  catch (err) {
    res.status(500).json({error: err.message});
  }
};

// login to account
export const login = async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await userService.getUserByEmail(email);
    if(!user) return res.status(404).json({error: 'User not found'});

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({error: 'Invalid password'});

    const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: '1d'});
    res.json({token, userId: user.id});
  }
  catch(err) {
    res.status(500).json({error: err.message});
  }
};