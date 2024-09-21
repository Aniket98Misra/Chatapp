import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import mongoose from "mongoose";
import { app, server } from "./socket/socket.js";
const PORT = process.env.PORT || 5000;
dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World??");
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

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
server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on Port ${PORT}`);
});
