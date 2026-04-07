import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./db/config.mjs";
import authRouter from "./routes/auth.routes.mjs";
import studentProfileRouter from "./routes/studentProfile.routes.mjs";

const app = express()
app.use(cors());
app.use(express.json())

dotenv.config()

connectDB()


app.use("/api/auth", authRouter)
app.use("/api/student", studentProfileRouter)



app.listen(process.env.PORT, (req, res) => {
    console.log("The app is running...");
})