import mongoose from "mongoose";

// Custom validator to check if value is purely numeric
const notPurelyNumeric = {
  validator: function(value) {
    if (!value || typeof value !== 'string') return true;
    const trimmed = value.trim();
    // Check if the value contains at least one non-numeric character (letter, symbol, etc.)
    // This allows numbers mixed with text but rejects purely numeric values
    return /[^0-9\s,.-]/.test(trimmed) || trimmed.length === 0;
  },
  message: function(props) {
    return `${props.path} cannot be purely numeric. Please include text with your meal description.`;
  }
};

const mealSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
    unique: true,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ]
  },
  breakfast: { 
    type: String, 
    required: true,
    validate: notPurelyNumeric
  },
  lunch: { 
    type: String, 
    required: true,
    validate: notPurelyNumeric
  },
  dinner: { 
    type: String, 
    required: true,
    validate: notPurelyNumeric
  },
  snacks: { 
    type: String, 
    required: true,
    validate: notPurelyNumeric
  },
  notes: { type: String }
});

// Note: unique: true in the schema definition above automatically creates the index
// No need for explicit index() call to avoid duplicate index warning

export default mongoose.model("Meal", mealSchema);

