import express from "express";
import {registerController, loginController, forgotPasswordController, resetPasswordController} from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/forgot-password', forgotPasswordController);
router.post('/reset-password', resetPasswordController);

export default router;