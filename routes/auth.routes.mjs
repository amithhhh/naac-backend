import { login, register } from "../controllers/auth.controller.mjs";
import { Router } from "express";


const authRouter = Router()
authRouter.post("/register", register);
authRouter.post("/login", login)


export default authRouter;