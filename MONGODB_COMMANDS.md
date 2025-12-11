# MongoDB Shell Commands for Weekly Meal Planner

## Database: `mealplanner`
## Collection: `meals`

---

## 1. Connect to MongoDB Shell

```bash
# Open MongoDB shell
mongosh

# Or if using older version
mongo
```

---

## 2. Select Database and Collection

```javascript
// Switch to mealplanner database
use mealplanner

// Verify current database
db

// View all collections
show collections
```

---

## 3. CREATE Operations (Insert)

### Insert a Single Meal Plan

```javascript
db.meals.insertOne({
  day: "Monday",
  breakfast: "Oatmeal with fruits",
  lunch: "Grilled chicken salad",
  dinner: "Salmon with vegetables",
  snacks: "Apple and nuts",
  notes: "Remember to stay hydrated"
})
```

### Insert Multiple Meal Plans

```javascript
db.meals.insertMany([
  {
    day: "Monday",
    breakfast: "Oatmeal with fruits",
    lunch: "Grilled chicken salad",
    dinner: "Salmon with vegetables",
    snacks: "Apple and nuts",
    notes: "Remember to stay hydrated"
  },
  {
    day: "Tuesday",
    breakfast: "Scrambled eggs with toast",
    lunch: "Vegetable stir fry",
    dinner: "Pasta with marinara sauce",
    snacks: "Yogurt and berries",
    notes: ""
  },
  {
    day: "Wednesday",
    breakfast: "Pancakes with maple syrup",
    lunch: "Caesar salad",
    dinner: "Grilled steak",
    snacks: "Mixed nuts",
    notes: "Special dinner tonight"
  }
])
```

---

## 4. READ Operations (Find/Query)

### Find All Meals

```javascript
// Get all meals
db.meals.find()

// Pretty print (formatted)
db.meals.find().pretty()

// Get all meals sorted by day
db.meals.find().sort({ day: 1 })
```

### Find a Specific Meal by Day

```javascript
// Find meal for Monday
db.meals.findOne({ day: "Monday" })

// Find meal for Tuesday
db.meals.find({ day: "Tuesday" })
```

### Find Meals with Conditions

```javascript
// Find meals with notes
db.meals.find({ notes: { $exists: true, $ne: "" } })

// Find meals containing "chicken" in any field
db.meals.find({
  $or: [
    { breakfast: /chicken/i },
    { lunch: /chicken/i },
    { dinner: /chicken/i }
  ]
})

// Count total meals
db.meals.countDocuments()
```

### Projection (Select Specific Fields)

```javascript
// Get only day and breakfast
db.meals.find({}, { day: 1, breakfast: 1, _id: 0 })

// Get all fields except notes
db.meals.find({}, { notes: 0 })
```

---

## 5. UPDATE Operations

### Update a Meal by Day

```javascript
// Update Monday's meal plan
db.meals.updateOne(
  { day: "Monday" },
  {
    $set: {
      breakfast: "Updated breakfast",
      lunch: "Updated lunch",
      dinner: "Updated dinner",
      snacks: "Updated snacks",
      notes: "Updated notes"
    }
  }
)
```

### Update Specific Fields Only

```javascript
// Update only breakfast for Monday
db.meals.updateOne(
  { day: "Monday" },
  { $set: { breakfast: "New breakfast item" } }
)

// Update notes field
db.meals.updateOne(
  { day: "Tuesday" },
  { $set: { notes: "New note here" } }
)
```

### Update Multiple Documents

```javascript
// Add a note to all meals that don't have notes
db.meals.updateMany(
  { notes: { $exists: false } },
  { $set: { notes: "Default note" } }
)
```

### Update by ObjectId

```javascript
// First, find the ObjectId
db.meals.findOne({ day: "Monday" })

// Then update using the _id
db.meals.updateOne(
  { _id: ObjectId("6939a55...") },  // Replace with actual ObjectId
  { $set: { breakfast: "Updated breakfast" } }
)
```

### Replace Entire Document

```javascript
db.meals.replaceOne(
  { day: "Monday" },
  {
    day: "Monday",
    breakfast: "Completely new breakfast",
    lunch: "Completely new lunch",
    dinner: "Completely new dinner",
    snacks: "Completely new snacks",
    notes: "Completely new notes"
  }
)
```

---

## 6. DELETE Operations

### Delete a Single Meal by Day

```javascript
// Delete Monday's meal plan
db.meals.deleteOne({ day: "Monday" })
```

### Delete by ObjectId

```javascript
// Delete using ObjectId
db.meals.deleteOne({ _id: ObjectId("6939a55...") })  // Replace with actual ObjectId
```

### Delete Multiple Meals

```javascript
// Delete all meals for weekdays (example)
db.meals.deleteMany({
  day: { $in: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] }
})
```

### Delete All Meals (Clear Week)

```javascript
// Delete all documents in the collection
db.meals.deleteMany({})

// Verify deletion
db.meals.countDocuments()  // Should return 0
```

---

## 7. Advanced Queries

### Sort Meals by Day Order

```javascript
// Custom sort order (Monday to Sunday)
db.meals.find().sort({
  $sortBy: {
    $arrayElemAt: [
      [
        { $cond: [{ $eq: ["$day", "Monday"] }, 1, 0] },
        { $cond: [{ $eq: ["$day", "Tuesday"] }, 2, 0] },
        { $cond: [{ $eq: ["$day", "Wednesday"] }, 3, 0] },
        { $cond: [{ $eq: ["$day", "Thursday"] }, 4, 0] },
        { $cond: [{ $eq: ["$day", "Friday"] }, 5, 0] },
        { $cond: [{ $eq: ["$day", "Saturday"] }, 6, 0] },
        { $cond: [{ $eq: ["$day", "Sunday"] }, 7, 0] }
      ],
      0
    ]
  }
})
```

**Simpler approach:**
```javascript
// Sort manually by creating an array
const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
db.meals.find().toArray().sort((a, b) => {
  return dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
})
```

### Search Meals

```javascript
// Search for meals containing specific text
db.meals.find({
  $or: [
    { breakfast: { $regex: "chicken", $options: "i" } },
    { lunch: { $regex: "chicken", $options: "i" } },
    { dinner: { $regex: "chicken", $options: "i" } }
  ]
})
```

---

## 8. Index Operations

### View Indexes

```javascript
// List all indexes on meals collection
db.meals.getIndexes()
```

### Create Index

```javascript
// Create unique index on day field (if not already exists)
db.meals.createIndex({ day: 1 }, { unique: true })
```

### Drop Index

```javascript
// Drop an index
db.meals.dropIndex({ day: 1 })
```

---

## 9. Collection Management

### Drop Entire Collection

```javascript
// Delete the entire meals collection
db.meals.drop()
```

### Rename Collection

```javascript
// Rename collection
db.meals.renameCollection("weekly_meals")
```

### Get Collection Stats

```javascript
// Get collection statistics
db.meals.stats()
```

---

## 10. Quick Reference Examples

### Complete CRUD Workflow

```javascript
// 1. CREATE
db.meals.insertOne({
  day: "Monday",
  breakfast: "Oatmeal",
  lunch: "Salad",
  dinner: "Pasta",
  snacks: "Fruits"
})

// 2. READ
db.meals.findOne({ day: "Monday" })

// 3. UPDATE
db.meals.updateOne(
  { day: "Monday" },
  { $set: { breakfast: "Updated Oatmeal" } }
)

// 4. DELETE
db.meals.deleteOne({ day: "Monday" })
```

---

## 11. Useful Helper Commands

### Check if Document Exists

```javascript
// Check if Monday meal exists
db.meals.findOne({ day: "Monday" }) ? "Exists" : "Does not exist"
```

### Get All Unique Days

```javascript
db.meals.distinct("day")
```

### Aggregate Operations

```javascript
// Count meals per day
db.meals.aggregate([
  { $group: { _id: "$day", count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
])
```

---

## Notes:

1. **ObjectId**: MongoDB automatically creates `_id` field with ObjectId type
2. **Case Sensitivity**: Day names are case-sensitive ("Monday" ≠ "monday")
3. **Validation**: The application validates that meal fields cannot be purely numeric
4. **Unique Constraint**: The `day` field must be unique (one meal plan per day)
5. **Required Fields**: `breakfast`, `lunch`, `dinner`, and `snacks` are required fields

---

## Quick Start Example

```javascript
// Connect to MongoDB
mongosh

// Select database
use mealplanner

// Insert a meal
db.meals.insertOne({
  day: "Monday",
  breakfast: "Oatmeal with fruits",
  lunch: "Grilled chicken salad",
  dinner: "Salmon with vegetables",
  snacks: "Apple and nuts"
})

// View all meals
db.meals.find().pretty()

// Update a meal
db.meals.updateOne(
  { day: "Monday" },
  { $set: { breakfast: "Updated breakfast" } }
)

// Delete a meal
db.meals.deleteOne({ day: "Monday" })
```

