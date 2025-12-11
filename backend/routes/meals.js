import express from "express";
import mongoose from "mongoose";
import Meal from "../models/Meal.js";

const router = express.Router();
const dayOrder = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

// Helper function to check if string is a valid MongoDB ObjectId
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// Add meal
router.post("/", async (req, res) => {
  try {
    const meal = await Meal.create(req.body);
    res.status(201).json(meal);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "Meal for this day already exists" });
    }
    res.status(400).json({ error: err.message });
  }
});

// Get all meals (sorted Monday–Sunday)
router.get("/", async (_req, res) => {
  const meals = await Meal.find({});
  const sorted = meals.sort(
    (a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day)
  );
  res.json(sorted);
});

// Get meal by day (specific route to avoid conflicts)
router.get("/day/:day", async (req, res) => {
  const day = req.params.day;
  if (!dayOrder.includes(day)) {
    return res.status(400).json({ error: "Invalid day name" });
  }
  const meal = await Meal.findOne({ day });
  if (!meal) return res.status(404).json({ error: "Meal not found for this day" });
  res.json(meal);
});

// Clear entire week (must come before /:id route)
router.delete("/", async (_req, res) => {
  await Meal.deleteMany({});
  res.json({ success: true });
});

// Update meal by ID - MUST come before GET /day/:day to avoid conflicts
router.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log("PUT /api/meals/:id - Received ID:", id);
    console.log("Request body:", req.body);
    
    if (!id) {
      return res.status(400).json({ error: "Meal ID is required" });
    }
    
    if (!isValidObjectId(id)) {
      console.log("Invalid ObjectId format:", id);
      return res.status(400).json({ error: "Invalid meal ID format" });
    }
    
    const meal = await Meal.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!meal) {
      console.log("Meal not found with ID:", id);
      return res.status(404).json({ error: "Meal not found" });
    }
    
    console.log("Meal updated successfully:", meal._id);
    res.json(meal);
  } catch (err) {
    console.error("Error updating meal:", err);
    if (err.name === "CastError") {
      return res.status(404).json({ error: "Invalid meal ID" });
    }
    res.status(400).json({ error: err.message });
  }
});

// Delete meal by ID
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid meal ID format" });
    }
    const result = await Meal.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ error: "Meal not found" });
    res.json({ success: true });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(404).json({ error: "Invalid meal ID" });
    }
    res.status(400).json({ error: err.message });
  }
});

export default router;

