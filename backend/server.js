import express from "express";
import dotenv from "dotenv";
import {connectDB }from "./config/db.js";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js"

dotenv.config();
connectDB();
const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/posts",postRouter)

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});