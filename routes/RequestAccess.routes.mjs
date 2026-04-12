import { Router } from "express";
import { requestAccess } from "../controllers/RequestAccess.controller.mjs";
import authMiddleware from "../middlewares/middlewares.auth.mjs";


const requestAccessRouter = Router();

requestAccessRouter.post("/request-access", authMiddleware,requestAccess)


export default requestAccessRouter;