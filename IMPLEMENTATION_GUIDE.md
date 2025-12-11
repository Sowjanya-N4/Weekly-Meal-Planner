# Weekly Meal Planner - Implementation Guide

## Table of Contents
1. [Hardware Requirements](#hardware-requirements)
2. [Software Requirements](#software-requirements)
3. [Project Setup](#project-setup)
4. [Backend Implementation](#backend-implementation)
5. [Frontend Implementation](#frontend-implementation)
6. [Database Setup](#database-setup)
7. [Running the Application](#running-the-application)
8. [Testing the Application](#testing-the-application)

---

## Hardware Requirements

### Minimum Requirements
- **Processor**: Intel Core i3 or AMD equivalent (2.0 GHz or higher)
- **RAM**: 4 GB minimum (8 GB recommended)
- **Storage**: 500 MB free disk space
- **Internet Connection**: Required for downloading dependencies
- **Display**: 1366x768 resolution minimum

### Recommended Requirements
- **Processor**: Intel Core i5 or AMD equivalent (2.5 GHz or higher)
- **RAM**: 8 GB or higher
- **Storage**: 1 GB free disk space
- **Internet Connection**: Broadband connection for faster npm installs
- **Display**: 1920x1080 resolution or higher

---

## Software Requirements

### Operating System
- Windows 10/11 (64-bit)
- macOS 10.15 or later
- Linux (Ubuntu 18.04+ or equivalent)

### Development Tools
- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 9.0.0 or higher (comes with Node.js)
- **MongoDB**: Version 6.0 or higher
- **Git**: Version 2.30.0 or higher (optional, for version control)
- **Code Editor**: VS Code, WebStorm, or any modern IDE

### Runtime Dependencies
- **Backend**:
  - Express.js 4.19.2
  - Mongoose 8.5.1
  - CORS 2.8.5
  - dotenv 16.4.5
- **Frontend**:
  - React 18.3.1
  - React DOM 18.3.1
  - React Scripts 5.0.1

### Browser Requirements (for testing)
- Google Chrome (latest version)
- Mozilla Firefox (latest version)
- Microsoft Edge (latest version)
- Safari (latest version, macOS)

---

## Project Setup

### Step 1: Install Node.js and npm
- Download Node.js from https://nodejs.org/
- Install Node.js (includes npm)
- Verify installation:
  ```bash
  node --version
  npm --version
  ```

### Step 2: Install MongoDB
- Download MongoDB Community Server from https://www.mongodb.com/try/download/community
- Install MongoDB on your system
- Start MongoDB service:
  - **Windows**: MongoDB runs as a Windows service automatically
  - **macOS/Linux**: Run `mongod` command or start service
- Verify MongoDB is running:
  ```bash
  mongosh
  ```

### Step 3: Create Project Directory
- Create a new folder: `weekly-meal-planner`
- Open terminal/command prompt in the project directory

### Step 4: Initialize Project Structure
- Create backend folder: `mkdir backend`
- Create frontend folder: `mkdir frontend`
- Create necessary subdirectories

---

## Backend Implementation

### Step 1: Initialize Backend Project
- Navigate to backend directory: `cd backend`
- Initialize npm project: `npm init -y`
- Install backend dependencies:
  ```bash
  npm install express mongoose cors dotenv
  ```
- Install dev dependencies:
  ```bash
  npm install --save-dev nodemon
  ```

### Step 2: Create Backend File Structure
- Create `server.js` (main entry point)
- Create `models/` directory
- Create `routes/` directory
- Create `models/Meal.js` (Mongoose schema)
- Create `routes/meals.js` (API routes)

### Step 3: Configure Server (server.js)
- Import required modules (Express, Mongoose, CORS, dotenv)
- Configure environment variables
- Set up MongoDB connection
- Configure middleware (CORS, JSON parser)
- Define API routes
- Start server on port 4000

### Step 4: Create Meal Model (models/Meal.js)
- Define Mongoose schema with fields:
  - day (String, required, unique, enum)
  - breakfast (String, required, custom validation)
  - lunch (String, required, custom validation)
  - dinner (String, required, custom validation)
  - snacks (String, required, custom validation)
  - notes (String, optional)
- Add custom validator to prevent purely numeric values
- Export Meal model

### Step 5: Create API Routes (routes/meals.js)
- Import Express Router and Meal model
- Define route handlers:
  - POST `/` - Create new meal plan
  - GET `/` - Get all meals (sorted Monday-Sunday)
  - GET `/day/:day` - Get meal by day
  - PUT `/id` - Update meal by ID
  - DELETE `/id` - Delete meal by ID
  - DELETE `/` - Clear entire week
- Add error handling and validation
- Export router

### Step 6: Configure package.json Scripts
- Add start script: `"start": "node server.js"`
- Add dev script: `"dev": "nodemon server.js"`

### Step 7: Create .env File (Optional)
- Create `.env` file in backend directory
- Add MongoDB connection string: `MONGO_URI=mongodb://127.0.0.1:27017/mealplanner`
- Add port: `PORT=4000`

---

## Frontend Implementation

### Step 1: Initialize Frontend Project
- Navigate to frontend directory: `cd frontend`
- Create React app: `npx create-react-app .` (or use existing structure)
- Install dependencies:
  ```bash
  npm install
  ```

### Step 2: Create Frontend File Structure
- Create `src/` directory
- Create `public/` directory
- Create `src/App.js` (main component)
- Create `src/App.css` (styles)
- Create `src/api.js` (API functions)
- Create `src/index.js` (entry point)
- Create `public/index.html` (HTML template)

### Step 3: Create API Service (src/api.js)
- Define API base URL
- Create functions:
  - `fetchMeals()` - GET all meals
  - `createMeal(payload)` - POST new meal
  - `updateMeal(id, payload)` - PUT update meal
  - `deleteMeal(id)` - DELETE meal
  - `clearWeek()` - DELETE all meals
- Add error handling for all API calls

### Step 4: Create Main Component (src/App.js)
- Import React hooks (useState, useEffect, useMemo)
- Import API functions
- Define state variables:
  - meals array
  - form data
  - editing state
  - loading state
  - error state
  - filter state
  - confirmation modal state
- Implement functions:
  - `load()` - Fetch meals from API
  - `handleChange()` - Handle form input changes
  - `handleSubmit()` - Handle form submission
  - `startEdit()` - Start editing meal
  - `cancelEdit()` - Cancel editing
  - `showDeleteConfirm()` - Show delete confirmation
  - `showClearWeekConfirm()` - Show clear week confirmation
  - `validateMealFields()` - Validate form fields
  - `isPurelyNumeric()` - Check if value is purely numeric
- Create JSX structure:
  - Header section
  - Error message display
  - Meal form (add/edit)
  - Filter controls
  - Meal cards grid
  - Confirmation modal

### Step 5: Create Styles (src/App.css)
- Define global styles (reset, body, container)
- Style header section
- Style form components
- Style meal cards
- Style buttons and controls
- Style confirmation modal
- Add responsive design (media queries)
- Add animations and transitions

### Step 6: Create Entry Point (src/index.js)
- Import React and ReactDOM
- Import App component
- Render App to root element

### Step 7: Configure package.json Scripts
- Add start script: `"start": "react-scripts start"`
- Add build script: `"build": "react-scripts build"`

---

## Database Setup

### Step 1: Start MongoDB Service
- **Windows**: MongoDB starts automatically as Windows service
- **macOS/Linux**: Start MongoDB service manually
- Verify MongoDB is running: `mongosh`

### Step 2: Create Database
- Connect to MongoDB: `mongosh`
- Create database: `use mealplanner`
- Database is created automatically on first document insert

### Step 3: Verify Database Connection
- Check database exists: `show dbs`
- Check collections: `show collections`
- Test connection from backend (server will create collection automatically)

### Step 4: Create Indexes (Optional)
- Unique index on day field is created automatically by Mongoose
- Verify indexes: `db.meals.getIndexes()`

---

## Running the Application

### Step 1: Start MongoDB
- Ensure MongoDB service is running
- Verify connection: `mongosh`

### Step 2: Start Backend Server
- Navigate to backend directory: `cd backend`
- Install dependencies (if not done): `npm install`
- Start server:
  - Development: `npm run dev`
  - Production: `npm start`
- Verify server is running: Check console for "API running on http://localhost:4000"

### Step 3: Start Frontend Application
- Open new terminal/command prompt
- Navigate to frontend directory: `cd frontend`
- Install dependencies (if not done): `npm install`
- Start React app: `npm start`
- Browser opens automatically at `http://localhost:3000`

### Step 4: Verify Application
- Check backend API: Visit `http://localhost:4000/api/health`
- Check frontend: Visit `http://localhost:3000`
- Test CRUD operations through UI

---

## Testing the Application

### Step 1: Test Create Operation
- Fill out meal plan form
- Select day from dropdown
- Enter breakfast, lunch, dinner, snacks
- Add optional notes
- Click "Add Meal" button
- Verify meal appears in the grid

### Step 2: Test Read Operation
- Verify all meals display correctly
- Test day filter buttons
- Verify meals are sorted Monday-Sunday
- Check "No meals added" message when empty

### Step 3: Test Update Operation
- Click "Edit" button on any meal card
- Modify meal fields
- Click "Update Meal" button
- Verify changes are saved and displayed

### Step 4: Test Delete Operation
- Click "Delete" button on any meal card
- Confirm deletion in modal
- Verify meal is removed from grid

### Step 5: Test Clear Week Operation
- Click "Clear Entire Week" button
- Confirm deletion in modal
- Verify all meals are removed

### Step 6: Test Validation
- Try submitting form with empty fields
- Try entering purely numeric values (should show error)
- Verify error messages display correctly
- Test form validation prevents invalid submissions

### Step 7: Test Responsive Design
- Resize browser window
- Test on mobile viewport
- Verify layout adapts correctly
- Check all buttons and forms are accessible

---

## Project Structure

```
weekly-meal-planner/
├── backend/
│   ├── models/
│   │   └── Meal.js
│   ├── routes/
│   │   └── meals.js
│   ├── server.js
│   ├── package.json
│   └── .env (optional)
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── api.js
│   │   └── index.js
│   └── package.json
├── MONGODB_COMMANDS.md
└── IMPLEMENTATION_GUIDE.md
```

---

## Key Features Implemented

### Backend Features
- RESTful API with Express.js
- MongoDB database with Mongoose ODM
- Data validation (required fields, unique constraints)
- Custom validation (prevent purely numeric values)
- Error handling and status codes
- CORS enabled for frontend communication

### Frontend Features
- React-based user interface
- Responsive design (mobile-friendly)
- Real-time form validation
- Custom confirmation modals
- Day filtering functionality
- Beautiful UI with modern design
- Loading states and error handling
- Smooth animations and transitions

### Database Features
- MongoDB document storage
- Unique constraint on day field
- Indexed queries for performance
- Schema validation at database level

---

## Troubleshooting

### Common Issues and Solutions

**Issue**: MongoDB connection error
- **Solution**: Ensure MongoDB service is running
- **Solution**: Check connection string in server.js

**Issue**: Port already in use
- **Solution**: Change port in .env file or server.js
- **Solution**: Kill process using the port

**Issue**: npm install fails
- **Solution**: Clear npm cache: `npm cache clean --force`
- **Solution**: Delete node_modules and package-lock.json, then reinstall

**Issue**: CORS errors
- **Solution**: Verify CORS middleware is enabled in backend
- **Solution**: Check API base URL in frontend api.js

**Issue**: Validation errors
- **Solution**: Ensure all required fields are filled
- **Solution**: Check that meal fields contain text (not purely numeric)

---

## Deployment Considerations

### Backend Deployment
- Set environment variables (MONGO_URI, PORT)
- Use process manager (PM2) for production
- Enable HTTPS for secure connections
- Configure CORS for production domain

### Frontend Deployment
- Build production bundle: `npm run build`
- Deploy build folder to hosting service
- Update API base URL for production
- Configure environment variables

### Database Deployment
- Use MongoDB Atlas for cloud database
- Update connection string in backend
- Configure database access and security
- Set up database backups

---

## Conclusion

This implementation guide provides step-by-step instructions for setting up and running the Weekly Meal Planner application. Follow each section sequentially to ensure proper installation and configuration of all components.

