# Systems Limited Task
# 🚀 Full-Stack Coding Challenge — Team Tasks Dashboard

## 🧩 Objective
Build a small **Team Task Management App** with the following features:

- User authentication (JWT-based)
- CRUD operations for tasks
- Task assignment to users
- Clean architecture & modular code organization

---

## ⚙️ Technical Requirements

### 🖥️ Frontend — React (TypeScript)

**Stack:**
- React 18+
- TypeScript
- React Router v6+
- Context API for state management

**Requirements:**
- Functional components with hooks
- Routing with React Router
- API integration with the backend
- Clean and reusable UI components

**Features:**
- 📋 View list of all tasks  
- ➕ Create a new task  
- ✏️ Edit an existing task  
- ❌ Delete a task  
- 👥 Assign tasks to team members  

**Bonus Points:**
- Responsive and polished UI
- Loading and error states with React Query
- Component-based folder structure

---

### ⚙️ Backend — Node.js (TypeScript)

**Stack:**
- Node.js 18+
- Express.js
- TypeScript
- MongoDB

**Architecture:**
- Modular file structure (controllers, services, routes, models)
- RESTful API

**Requirements:**
- 🔐 JWT-based authentication (Access Token)
- 🧱 CRUD endpoints for tasks
- 👤 User endpoints (register, login, get profile)
- 🧩 Assign tasks to users
- 🧾 Input validation using Joi 
- 🪵 Basic logging Winston
- 🧰 Global error handling middleware

---

## 🧠 Key Features Overview

| Feature | Description |
|----------|--------------|
| Authentication | JWT-based login/register flow |
| Task Management | CRUD operations for tasks |
| Task Assignment | Assign tasks to team members |
| Validation | Input validation on backend |
| Error Handling | Centralized error middleware |
| Logging | Console or Winston-based logger |

---

## 🧰 Tools & Libraries (Recommended)

**Frontend:**
- React 18+
- TypeScript
- React Router v6
- React Query / Context API
- Axios or Fetch API
- TailwindCSS or Material UI

**Backend:**
- Node.js 18+
- Express.js or NestJS
- TypeScript
- JWT
- MongoDB (Mongoose) or SQLite (Prisma/TypeORM)
- Joi / Zod / class-validator
- Winston (for logging)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB running locally or MongoDB Atlas account
- npm or yarn

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd systems_limited_task
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and set your MongoDB URI and JWT secret
# MONGODB_URI=mongodb://localhost:27017/team-tasks
# JWT_SECRET=your-secret-key

# Create logs directory
mkdir logs

# Run the backend
npm run dev
```

The backend will start on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal and run:

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000" > .env

# Run the frontend
npm start
```

The frontend will start on `http://localhost:3000`

---

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Tasks
- `GET /api/tasks` - Get all tasks (protected)
- `GET /api/tasks/:id` - Get task by ID (protected)
- `POST /api/tasks` - Create a new task (protected)
- `PUT /api/tasks/:id` - Update a task (protected)
- `DELETE /api/tasks/:id` - Delete a task (protected)

### Users
- `GET /api/users` - Get all users (protected)

---

## 🧪 Testing the Application

1. **Register a new user:**
   - Go to `http://localhost:3000/register`
   - Fill in name, email, password
   - Select role (member or admin)
   - Click Register

2. **Login:**
   - Go to `http://localhost:3000/login`
   - Enter your credentials
   - Click Login

3. **Create a task:**
   - Click "Create Task" button
   - Fill in title, description, status, priority
   - Optionally assign to a user and set due date
   - Click Create

4. **Manage tasks:**
   - Filter tasks by status (All, Todo, In Progress, Completed)
   - Click Edit to modify a task
   - Click Delete to remove a task

---

## 📁 Project Structure

```
systems_limited_task/
├── backend/
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Auth, error handling
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Utilities (JWT, logger)
│   │   └── validators/     # Input validation schemas
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── api/            # API calls
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React context
│   │   ├── pages/          # Page components
│   │   ├── types/          # TypeScript types
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

---

## 🛠️ Technologies Used

**Backend:**
- Node.js & Express
- TypeScript
- MongoDB with Mongoose
- JWT Authentication
- Winston for logging
- Joi for validation

**Frontend:**
- React 18
- TypeScript
- React Router v6
- Context API for state management
- Axios for HTTP requests

---

## ✅ Features Implemented

- ✅ JWT-based authentication
- ✅ User registration and login
- ✅ Task CRUD operations
- ✅ Task assignment to users
- ✅ Task filtering by status
- ✅ Clean modular architecture
- ✅ TypeScript for type safety
- ✅ Input validation (Joi)
- ✅ Error handling middleware
- ✅ Winston logging
- ✅ Responsive UI

---

## 📝 Notes

- Backend logs are saved in `backend/logs/` directory
- JWT token expires in 7 days (configurable in .env)
- Passwords are hashed using bcrypt
- All API endpoints require authentication except register/login

---

## 🔧 Development

**Backend:**
```bash
cd backend
npm run dev    # Start with hot reload
npm run build  # Build for production
npm start      # Run production build
```

**Frontend:**
```bash
cd frontend
npm start      # Start development server
npm run build  # Build for production
```

---

## 📄 License

ISC
