import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./db/config.mjs";
import authRouter from "./routes/auth.routes.mjs";
import studentProfileRouter from "./routes/studentProfile.routes.mjs";
import requestAccessRouter from "./routes/RequestAccess.routes.mjs";
import searchRouter from "./routes/search.route.mjs";

const app = express()
app.use(cors());
app.use(express.json())

dotenv.config()

connectDB()

app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRouter)
app.use("/api/student/", studentProfileRouter)
app.use("/api/privilege/", requestAccessRouter)
app.use("/", searchRouter);

app.use((err, req, res, next) => {
  console.error("ERROR:", err);

  res.status(400).json({
    message: err.message || "Something went wrong",
  });
});


app.listen(process.env.PORT, (req, res) => {
    console.log("The app is running...");
})
