import { Router } from "express";
import {
  createOrUpdatePersonal,
} from "../controllers/personalDetails.controller.mjs";
import authMiddleware from "../middlewares/middlewares.auth.mjs";


const personalRouter = Router();

personalRouter.post("/personal-details", authMiddleware, createOrUpdatePersonal);
// personalRouter.get("/personal-details", authMiddleware, getPersonalDetails);

export default personalRouter;