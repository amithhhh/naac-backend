import express, { Router } from "express";
import authMiddleware from "../middlewares/middlewares.auth.mjs";
import { CreateOrUpdate, GetAcademicDetails } from "../controllers/studentProfile.controller.mjs";


const studentProfileRouter = Router();

studentProfileRouter.post("/profile", authMiddleware, CreateOrUpdate);
studentProfileRouter.get("/profile", authMiddleware, GetAcademicDetails)

export default studentProfileRouter;