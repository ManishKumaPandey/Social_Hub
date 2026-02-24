import express from "express";
import dotenv from "dotenv";
// import mongoose from "mongoose";
import connectDB from "./config/db.js";
import cors from "cors";
import router from "./routes/user.route.js";

dotenv.config();
connectDB();
const app = express();
// connectDB();
app.use(cors());
app.use(express.json());
app.use("/api/users", router);

// app.get("/",(req,res) => {
//     res.send("Social Hub API Running");
// });


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});