import { login, register, ResetPassword } from "../controllers/auth.controller.mjs";
import { Router } from "express";
import authMiddleware from "../middlewares/middlewares.auth.mjs";
import { validatePassword } from "../middlewares/middlewares.passwordvalidator.mjs";


const authRouter = Router()
authRouter.post("/register",validatePassword, register);
authRouter.post("/login", login)
authRouter.post("/reset-password", authMiddleware, validatePassword,ResetPassword);


export default authRouter;