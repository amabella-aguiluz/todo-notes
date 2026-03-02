import express from "express";
import { registerController, loginController, forgotPasswordController, resetPasswordController } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();


router.post("/register", registerController as unknown as (req: express.Request, res: express.Response) => any);
router.post("/login", loginController as unknown as (req: express.Request, res: express.Response) => any);
router.post("/forgot-password", forgotPasswordController as unknown as (req: express.Request, res: express.Response) => any);
router.post("/reset-password", resetPasswordController as unknown as (req: express.Request, res: express.Response) => any);

router.use(authMiddleware); // protect routes


export default router;
