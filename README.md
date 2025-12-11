# 🍽️ Weekly Meal Planner

A full-stack CRUD web application for planning and managing weekly meal schedules. Plan your breakfast, lunch, dinner, and snacks for all seven days of the week with an intuitive and beautiful user interface.

## ✨ Features

- **📅 Weekly Planning**: Plan meals for all seven days (Monday through Sunday)
- **➕ Create Meal Plans**: Add meal plans with breakfast, lunch, dinner, snacks, and optional notes
- **✏️ Edit Meals**: Update existing meal plans easily
- **🗑️ Delete Meals**: Remove individual meal plans or clear the entire week
- **🔍 Filter by Day**: Filter meal plans by specific days or view all
- **✅ Input Validation**: Prevents purely numeric entries, ensures data quality
- **🎨 Modern UI**: Beautiful, responsive design with smooth animations
- **💾 MongoDB Storage**: Persistent data storage with MongoDB
- **🔄 Real-time Updates**: Instant updates when adding, editing, or deleting meals

## 🛠️ Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend
- **React** - UI library
- **React Scripts** - Build tooling
- **CSS3** - Styling with modern features

## 📁 Project Structure

```
weekly-meal-planner/
├── backend/
│   ├── models/
│   │   └── Meal.js          # Mongoose schema and model
│   ├── routes/
│   │   └── meals.js         # API route handlers
│   ├── server.js            # Express server setup
│   ├── package.json         # Backend dependencies
│   └── .env                 # Environment variables (optional)
├── frontend/
│   ├── public/
│   │   └── index.html       # HTML template
│   ├── src/
│   │   ├── App.js           # Main React component
│   │   ├── App.css          # Styles
│   │   ├── api.js           # API service functions
│   │   └── index.js         # React entry point
│   └── package.json         # Frontend dependencies
├── README.md                 # Project documentation
├── IMPLEMENTATION_GUIDE.md   # Detailed implementation steps
└── MONGODB_COMMANDS.md       # MongoDB shell commands reference
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)
- **MongoDB** (v6.0 or higher)
- Modern web browser (Chrome, Firefox, Edge, Safari)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sowjanya-N4/Weekly-Meal-Planner.git
   cd Weekly-Meal-Planner
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Start MongoDB**
   - Ensure MongoDB service is running on your system
   - Default connection: `mongodb://127.0.0.1:27017/mealplanner`

5. **Configure Environment Variables (Optional)**
   
   Create `backend/.env`:
   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/mealplanner
   PORT=4000
   ```

   Create `frontend/.env` (if needed):
   ```env
   REACT_APP_API_URL=http://localhost:4000/api
   ```

### Running the Application

1. **Start Backend Server**
   ```bash
   cd backend
   npm run dev    # Development mode with nodemon
   # OR
   npm start      # Production mode
   ```
   Backend runs on `http://localhost:4000`

2. **Start Frontend Application**
   ```bash
   cd frontend
   npm start
   ```
   Frontend runs on `http://localhost:3000` (opens automatically)

3. **Access the Application**
   - Open your browser and navigate to `http://localhost:3000`
   - Start planning your meals!

## 📡 API Documentation

Base URL: `http://localhost:4000/api`

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check endpoint |
| POST | `/meals` | Create a new meal plan |
| GET | `/meals` | Get all meal plans (sorted Monday-Sunday) |
| GET | `/meals/day/:day` | Get meal plan by specific day |
| PUT | `/meals/:id` | Update meal plan by ID |
| DELETE | `/meals/:id` | Delete meal plan by ID |
| DELETE | `/meals` | Clear entire week (delete all meals) |

### Request/Response Examples

**Create Meal Plan**
```json
POST /api/meals
Content-Type: application/json

{
  "day": "Monday",
  "breakfast": "Oatmeal with fruits",
  "lunch": "Grilled chicken salad",
  "dinner": "Salmon with vegetables",
  "snacks": "Apple and nuts",
  "notes": "Remember to stay hydrated"
}
```

**Get All Meals**
```json
GET /api/meals

Response: [
  {
    "_id": "...",
    "day": "Monday",
    "breakfast": "Oatmeal with fruits",
    "lunch": "Grilled chicken salad",
    "dinner": "Salmon with vegetables",
    "snacks": "Apple and nuts",
    "notes": "Remember to stay hydrated"
  },
  ...
]
```

## 🎯 Usage

1. **Add a Meal Plan**
   - Select a day from the dropdown
   - Fill in breakfast, lunch, dinner, and snacks
   - Add optional notes
   - Click "Add Meal"

2. **Edit a Meal Plan**
   - Click the "Edit" button on any meal card
   - Modify the fields as needed
   - Click "Update Meal"

3. **Delete a Meal Plan**
   - Click the "Delete" button on any meal card
   - Confirm deletion in the modal

4. **Filter by Day**
   - Use the filter buttons to view meals for specific days
   - Click "All Days" to view everything

5. **Clear Entire Week**
   - Click "Clear Entire Week" button
   - Confirm deletion in the modal

## 🔒 Validation Rules

- All meal fields (breakfast, lunch, dinner, snacks) are required
- Meal fields cannot be purely numeric (must contain text)
- Each day can only have one meal plan (unique constraint)
- Day must be one of: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday

## 📚 Additional Documentation

- **[Implementation Guide](IMPLEMENTATION_GUIDE.md)** - Detailed setup and implementation steps
- **[MongoDB Commands](MONGODB_COMMANDS.md)** - MongoDB shell commands reference



