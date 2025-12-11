import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import mealRoutes from "./routes/meals.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const mongoUri =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mealplanner";
mongoose.connect(mongoUri, {});

// Health check
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

// Debug: Log all requests to /api/meals
app.use("/api/meals", (req, res, next) => {
  console.log(`${req.method} ${req.path} - Full URL: ${req.url}`);
  next();
});

app.use("/api/meals", mealRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});

