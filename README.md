# Scaffolding-Task-Management-

# Task Manager — Role-Based REST API

A full-stack task management system built for the Primetrade.ai Backend Developer assignment. It includes JWT authentication, role-based access control (user/admin), task CRUD APIs, Swagger documentation, and a React frontend for testing.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Node.js, Express, MongoDB, Mongoose |
| Auth | JWT (access + refresh), bcrypt |
| Validation | express-validator |
| Docs | Swagger UI |
| Frontend | React, Vite, Tailwind CSS, Axios |

## Features

### Backend
- User registration & login with password hashing
- JWT access tokens + httpOnly refresh token cookies
- Role-based access: `user` sees own tasks, `admin` sees all
- Full task CRUD with soft delete
- API versioning (`/api/v1`)
- Centralized error handling & input validation
- Security: Helmet, CORS, rate limiting, XSS & NoSQL sanitization
- Swagger docs at `/api-docs`

### Frontend
- Register & login pages
- Protected dashboard (JWT required)
- Create, edit, delete tasks
- Success/error messages from API responses
- Auto token refresh on 401

## Project Structure

```
task-manager/
├── backend/
│   ├── src/
│   │   ├── config/       # DB, Swagger
│   │   ├── constants/    # Roles, task statuses
│   │   ├── controllers/  # Auth & task logic
│   │   ├── middlewares/    # Auth, roles, validation, errors
│   │   ├── models/       # User & Task schemas
│   │   ├── routes/       # API route definitions
│   │   ├── utils/        # JWT, ApiError, ApiResponse
│   │   └── validators/   # Request validation rules
│   └── server.js
├── frontend/
│   └── src/
│       ├── api/          # Axios client & API calls
│       ├── components/   # UI components
│       ├── context/      # Auth state
│       └── pages/        # Home, Login, Register, Dashboard
└── docs/
    ├── SCALABILITY.md
    └── postman-collection.json
```

## Prerequisites

- Node.js 18+
- MongoDB running locally (or MongoDB Atlas URI)

## Setup

### 1. Clone & install

```bash
cd task-manager/backend
npm install
cp .env.example .env   # edit values as needed

cd ../frontend
npm install
```

### 2. Configure environment

Edit `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/task-manager
JWT_ACCESS_SECRET=your_secret_here
JWT_REFRESH_SECRET=your_refresh_secret_here
CLIENT_URL=http://localhost:5173
```

### 3. Start MongoDB

```bash
# Windows (if installed as service)
net start MongoDB

# Or with Docker
docker run -d -p 27017:27017 --name mongodb mongo:7
```

### 4. Run the app

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

- Frontend: http://localhost:5173
- API: http://localhost:5000/api/v1
- Swagger: http://localhost:5000/api-docs

## API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/v1/auth/register` | Public | Register user |
| POST | `/api/v1/auth/login` | Public | Login |
| POST | `/api/v1/auth/refresh` | Public | Refresh access token |
| POST | `/api/v1/auth/logout` | Public | Clear refresh cookie |
| GET | `/api/v1/auth/me` | Private | Get profile |

### Tasks
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/v1/tasks` | Private | List tasks |
| POST | `/api/v1/tasks` | Private | Create task |
| GET | `/api/v1/tasks/:id` | Private | Get task |
| PUT | `/api/v1/tasks/:id` | Private | Update task |
| DELETE | `/api/v1/tasks/:id` | Private | Soft delete |

**Authorization header:** `Bearer <accessToken>`

## Create an Admin User

Register normally, then update the role in MongoDB:

```javascript
// In mongosh
use task-manager
db.users.updateOne({ email: "admin@example.com" }, { $set: { role: "admin" } })
```

## Testing

1. Open http://localhost:5173
2. Register a new account
3. Log in and go to Dashboard
4. Create, edit, and delete tasks
5. Import `docs/postman-collection.json` into Postman for API testing
6. View Swagger docs at http://localhost:5000/api-docs

## Scalability

See [docs/SCALABILITY.md](docs/SCALABILITY.md) for notes on caching, microservices, load balancing, and deployment.

## Author

Built as part of the Primetrade.ai Backend Developer Intern assignment.
