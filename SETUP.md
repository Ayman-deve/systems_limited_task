# Setup Guide - Team Tasks Dashboard

## Quick Start

### 1. Install MongoDB
Make sure MongoDB is installed and running on your system.

**macOS (Homebrew):**
```bash
brew install mongodb-community
brew services start mongodb-community
```

**Or use MongoDB Atlas** (cloud database):
- Sign up at https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get your connection string

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
PORT=8080
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/team-tasks
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d
EOF

# Create logs directory
mkdir -p logs

# Start backend (dev mode with hot reload)
npm run dev
```

Backend will run on http://localhost:8080

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000" > .env

# Start frontend
npm start
```

Frontend will run on http://localhost:3000

### 4. Test the Application

1. Open http://localhost:3000
2. Register a new account
3. Login with your credentials
4. Create your first task!

## Troubleshooting

### MongoDB Connection Issues
If you're having trouble connecting to MongoDB:
- Make sure MongoDB is running: `brew services list` (macOS)
- Or use MongoDB Atlas connection string in .env
- Check firewall settings

### Port Already in Use
If port 5000 or 3000 is already in use:
- Change PORT in backend/.env
- Update REACT_APP_API_URL in frontend/.env
- Or kill the process using the port

### Module Not Found
Run `npm install` again in the respective directory

## Production Build

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
# Serve the build folder with a static server
```

## Tech Stack

- **Backend:** Node.js, Express, TypeScript, MongoDB, JWT
- **Frontend:** React 18, TypeScript, React Router v6, Context API
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT with bcrypt
- **Validation:** Joi
- **Logging:** Winston

## Default Users

After starting the backend and frontend, register users through the UI. You can create multiple users and test task assignment between them.

