import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

// fileConfig
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(
  cors({
    origin: [
      process.env.PRODUCTION_URL || "https://smart-meal-frontend.onrender.com",
      process.env.FRONTEND_URL || "http://localhost:5173",
    ],
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(cookieParser());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);

// make uploaded files accessible to the browser
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/", (req, res) => {
  res.json("Hello")
})
// connect to DB
connectDB();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
