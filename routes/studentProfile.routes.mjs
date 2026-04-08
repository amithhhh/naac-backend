import express, { Router } from "express";
import authMiddleware from "../middlewares/middlewares.auth.mjs";
import { CreateOrUpdate, GetAcademicDetails } from "../controllers/studentProfile.controller.mjs";


const studentProfileRouter = Router();

studentProfileRouter.post("/academic-profile", authMiddleware, CreateOrUpdate);
studentProfileRouter.get("/academic-profile", authMiddleware, GetAcademicDetails)

export default studentProfileRouter;