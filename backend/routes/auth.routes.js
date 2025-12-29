import express from "express";
<<<<<<< HEAD
import {registerController, loginController} from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
=======
import {registerController, loginController, forgotPasswordController, resetPasswordController} from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', registerController); // register a new user
router.post('/login', loginController); // login a user
router.post('/forgot-password', forgotPasswordController); // create a token to reset your password
router.post('/reset-password', resetPasswordController); // reset password 
>>>>>>> backend-dev

export default router;