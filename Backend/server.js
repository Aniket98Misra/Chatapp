import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import mongoose from "mongoose";
const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World??");
});

app.use("/api/auth", authRoutes);
const uri =
  "mongodb+srv://misra98aniket:JWfBzcqxNtdyLwds@cluster0.ujknh.mongodb.net/chat-app?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Optional: Adjust the timeout as needed
  })
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });
app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on Port ${PORT}`);
});
//help me connect react to mongoose
