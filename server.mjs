import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./db/config.mjs";
import authRouter from "./routes/auth.routes.mjs";
import studentProfileRouter from "./routes/studentProfile.routes.mjs";
import personalRouter from "./routes/personalDetails.routes.mjs";

const app = express()
app.use(cors());
app.use(express.json())

dotenv.config()

connectDB()


app.use("/api/auth", authRouter)
app.use("/api/student/academic", studentProfileRouter)
app.use("/api/student/personal", personalRouter)



app.listen(process.env.PORT, (req, res) => {
    console.log("The app is running...");
})