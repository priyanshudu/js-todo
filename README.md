# js-todo
A full stack To-Do List app built using HTML, CSS, JS, Node.js, Express, and MongoDB. It allows users to create, view, update, delete, and mark tasks as completed. Tasks are stored in MongoDB with validation and proper error handling. It demonstrates CRUD operations and full-stack integration.
Here is a **medium-length README (balanced and professional)**:

---

 📝 To-Do List Application

📌 Overview
This is a full-stack To-Do List application built using **HTML, CSS, JavaScript, Node.js, Express, and MongoDB**. It allows users to manage daily tasks with basic CRUD operations and ensures data persistence using MongoDB.

🚀 Features
* Create tasks with title, description, and date
* View tasks filtered by date
* Edit and update task details
* Delete tasks permanently
* Mark tasks as completed
* Prevent past date task creation
* Input validation for required fields
* Real-time updates with database sync

 🛠️ Tech Stack
* Frontend: HTML, CSS, JavaScript
* Backend: Node.js, Express.js
* Database: MongoDB (Atlas)
* API: RESTful APIs


## 📂 Project Structure

```
project/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── server.js
├── package.json
```



 🔗 API Endpoints
* POST `/tasks` → Create a task
* GET `/tasks` → Get all tasks
* PUT `/tasks/:id` → Update task
* DELETE `/tasks/:id` → Delete task
* PATCH `/tasks/:id/complete` → Mark task as completed

 🧠 Working Flow
User creates a task from the frontend → data is sent to the backend → stored in MongoDB → frontend fetches and displays tasks → user can update, delete, or mark tasks as completed.

🎯 Purpose
This project demonstrates full-stack development concepts including REST API creation, database integration, and frontend-backend communication using modern web technologies.

👨‍💻 Author
Developed as a learning project for full-stack web development practice.
