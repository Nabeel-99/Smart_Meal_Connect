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
import { deleteFakeData, seedDatabase } from "./utils/faker.js";
import fs from "fs";
import Recipe from "./models/recipeModel.js";

dotenv.config();

const app = express();

// fileConfig
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(
  cors({
    origin: [
      process.env.PRODUCTION_URL,
      process.env.FRONTEND_URL,
      "capacitor://localhost",
      "http://10.0.2.2",
      "http://localhost",
      "http://10.0.2.2:5173",
      "http://192.168.100.19",
      "http://192.168.100.19:5173",
    ],
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

// connect to DB
connectDB();

// // faker
// seedDatabase();

// // deletefaker
// deleteFakeData();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
