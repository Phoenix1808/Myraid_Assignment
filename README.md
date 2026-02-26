# 🚀 TaskForge – Full Stack Task Management System

A secure and scalable full-stack task management application built using the MERN stack (MongoDB, Express, React, Node.js).

This project was developed as part of a Full Stack Intern Assignment to demonstrate backend architecture, authentication, API design, and frontend integration.

---

## 🌐 Live Demo

> myraid-assignment.onrender.com

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js (v5)
- MongoDB (Mongoose ODM)
- JWT Authentication
- Cookie-based session handling

### Frontend
- React (Vite)
- Axios
- React Router

### Deployment
- Render (Backend + Frontend served from Express)

---

## ✨ Features

### 🔐 Authentication & Authorization
- User Registration (hashed passwords using bcrypt)
- Secure Login using JWT
- HTTP-only Cookie based authentication
- Protected routes using middleware
- Users can only access their own tasks

---

### 📋 Task Management (CRUD)
- Create Task
- Get Tasks (with pagination, filter & search)
- Update Task Status
- Delete Task

---

### 🔎 Advanced Query Features
- Pagination (`?page=1&limit=5`)
- Status Filtering (`?status=pending`)
- Search by title (`?search=keyword`)
- Sorted by latest created

---

### 🗃 Database Design

#### User Schema
```js
{
  name: String,
  email: String (unique),
  password: String (hashed),
  timestamps: true
}

#### Task Schema
```js
{
  title: String (required),
  description: String,
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending"
  },
  user: ObjectId (ref: User),
  timestamps: true
}
```

---

## 📂 Project Structure

```
backend/
│
├── dist/                  # Production React build
├── src/
│   ├── config/            # Database connection setup
│   ├── models/            # Mongoose schemas
│   ├── routes/            # Auth & Task routes
│   ├── middlewares/       # Auth & Error handling middleware
│   └── server.js          # Entry point
│
└── package.json

taskforge-frontend/        # Frontend (Vite + React)
```

---

## 🔐 API Endpoints

### Auth Routes

| Method | Endpoint              | Description            |
|--------|-----------------------|------------------------|
| POST   | /api/auth/register    | Register a new user    |
| POST   | /api/auth/login       | Login user             |
| POST   | /api/auth/logout      | Logout user            |

---

### Task Routes (Protected)

| Method | Endpoint           | Description           |
|--------|-------------------|-----------------------|
| POST   | /api/tasks        | Create a task         |
| GET    | /api/tasks        | Get all user tasks    |
| PUT    | /api/tasks/:id    | Update task status    |
| DELETE | /api/tasks/:id    | Delete task           |

---

## 🔄 Query Parameters (GET /api/tasks)

| Parameter | Description |
|-----------|------------|
| page      | Page number for pagination |
| limit     | Number of tasks per page |
| status    | Filter by `pending` or `completed` |
| search    | Search tasks by title |

### Example:

```
GET /api/tasks?page=1&limit=5&status=pending
```

---

## 🔒 Security Implementation

- Password hashing using bcrypt
- JWT-based authentication
- HTTP-only cookies
- Protected routes middleware
- Ownership validation for update & delete
- Enum validation for task status
- Error handling middleware

---

## ⚙️ Local Setup Instructions

### 1️⃣ Clone Repository

```
git clone <your-repo-url>
cd backend
```

### 2️⃣ Install Dependencies

```
npm install
```

### 3️⃣ Create `.env` File

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
NODE_ENV=development
```

### 4️⃣ Run Backend (Serves Frontend Also)

```
npm run dev
```

Open in browser:

```
http://localhost:5000
```

---

## 🚀 Production Deployment

- Frontend is built using `npm run build`
- The `dist/` folder is served via Express static middleware
- Deployed as a single service on Render
- Environment variables configured in Render dashboard

---

## 🧠 Concepts Demonstrated

- RESTful API Design
- Middleware-based architecture
- JWT authentication lifecycle
- Cookie-based session handling
- MongoDB schema validation
- Pagination & filtering
- React state management
- Conditional rendering
- Serving frontend from backend in production

---

## 📌 Assumptions

- MongoDB Atlas is used for cloud database
- JWT secret is securely stored in environment variables
- Frontend is served from backend in production (no CORS required)

---

## 👨‍💻 Author

**Divyansh Goyal**  
GitHub: https://github.com/Phoenix1808  

---

## 📜 License

This project was built for educational and internship evaluation purposes.

