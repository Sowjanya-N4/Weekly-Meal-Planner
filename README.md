# Weekly Meal Planner

Full-stack CRUD app for planning meals Monday through Sunday. Backend uses Node.js, Express, MongoDB, and Mongoose. Frontend is a simple React SPA.

## Structure
```
weekly-meal-planner/
  backend/
    package.json
    server.js
    models/
      Meal.js
    routes/
      meals.js
  frontend/
    package.json
    src/
      index.js
      App.js
      api.js
    public/
      index.html
```

## API
Base: `http://localhost:4000/api`
- `GET /health`
- `POST /meals` create (body: day, breakfast, lunch, dinner, snacks, notes?)
- `GET /meals` list (sorted Monday–Sunday)
- `GET /meals/:day` fetch by day
- `PUT /meals/:day` update by day
- `DELETE /meals/:day` delete by day
- `DELETE /meals` clear week

## Setup
Prereqs: Node 18+, MongoDB running locally (or provide `MONGO_URI`).

Backend:
```
cd backend
npm install
# optional .env with MONGO_URI and PORT
npm run dev
```

Frontend:
```
cd frontend
npm install
# optional: REACT_APP_API_URL=http://localhost:4000/api
npm start
```

Open http://localhost:3000 to use the planner.

