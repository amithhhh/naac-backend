import express, { Router } from "express";
import authMiddleware from "../middlewares/middlewares.auth.mjs";
import { CreateOrUpdate } from "../controllers/studentProfile.controller.mjs";


const studentProfileRouter = Router();

studentProfileRouter.post("/profile", authMiddleware, CreateOrUpdate);

export default studentProfileRouter;