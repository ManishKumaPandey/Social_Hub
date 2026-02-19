import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res) => {
    res.send("Social Hub API Running");
});


const PORT = 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server ka running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Data base Connection Failed:", error);
  });

  
// app.listen(port, () => {
//     console.log(`Server running on port ${PORT}`);
// });