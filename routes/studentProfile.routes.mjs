import express, { Router } from "express";
import authMiddleware from "../middlewares/middlewares.auth.mjs";
import { CreateOrUpdate } from "../controllers/studentProfile.controller.mjs";
import upload from "../configs/multer.mjs"

const studentProfileRouter = Router();

studentProfileRouter.post("/profile", upload.fields([
    { name: "fellowshipLetter", maxCount: 1 },
    { name: "passportDoc", maxCount: 1 },
    { name: "visaDoc", maxCount: 1 },
     {name: "birthcertificateDoc", maxCount: 1},
  ]), authMiddleware, CreateOrUpdate);
// studentProfileRouter.get("/profile", authMiddleware, GetAcademicDetails)

export default studentProfileRouter;
