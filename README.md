---

## ✅ Backend — `README.md` (Server)

# DoTask - Freelance Task Marketplace (Backend)

## 🔗 Server Live URL (Vercel):

[https://b11a10-server-side-aminulislamrahat.vercel.app/]

## ⚙️ API Overview:

The backend supports all task operations including:

- Creating and editing tasks
- Submitting and tracking bids
- Fetching recent or deadline-based tasks
- User-based task queries and deletions

## 🚀 Key Features:

- 🌐 RESTful API built with Express.js
- 📦 MongoDB integration for persistent task storage
- 🔁 Bidding system using `PATCH` requests
- 📆 Recent tasks fetched by deadline sorting
- 🔒 CORS-enabled, dotenv-based secure environment
- ⚙️ Auto-deployed on Vercel for scalable access

## 📦 Key Endpoints:

- `POST /api/tasks` – Add a new task
- `GET /api/tasks` – Fetch all tasks
- `GET /api/tasks/:id` – Fetch single task by ID
- `PATCH /project/bid/:id` – Update bid count
- `DELETE /api/tasks/:id` – Delete a task
- `GET /get/recent/projects` – Fetch top 6 upcoming deadline tasks

## 🧰 Tech Stack:

- Node.js + Express.js
- MongoDB (CRUD operations)
- Vercel for deployment
- Dotenv for secure config

## 📦 NPM Packages Used:

```bash
npm install express cors mongodb dotenv
```
