require("dotenv").config(); // MUST BE FIRST

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// ================= DB CONNECTION =================
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch(err => {
    console.error("DB ERROR:", err);
    process.exit(1);
});

// ================= SCHEMA =================
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    date: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const Task = mongoose.model("Task", taskSchema);

// ================= ROUTES =================

// CREATE TASK
app.post("/tasks", async (req, res) => {
    try {
        const { title, description, date } = req.body;

        if (!title) {
            return res.status(400).json({ error: "Title is required" });
        }

        if (!date) {
            return res.status(400).json({ error: "Date is required" });
        }

        const task = new Task({ title, description, date });
        await task.save();

        res.json(task);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// GET ALL TASKS
app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch {
        res.status(500).json({ error: "Error fetching tasks" });
    }
});

// UPDATE TASK
app.put("/tasks/:id", async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title) {
            return res.status(400).json({ error: "Title required" });
        }

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description },
            { new: true }
        );

        res.json(task);
    } catch {
        res.status(500).json({ error: "Update failed" });
    }
});

// DELETE TASK
app.delete("/tasks/:id", async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch {
        res.status(500).json({ error: "Delete failed" });
    }
});

// MARK COMPLETE
app.patch("/tasks/:id/complete", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ error: "Not found" });
        }

        if (task.completed) {
            return res.status(400).json({ error: "Already completed" });
        }

        task.completed = true;
        await task.save();

        res.json(task);
    } catch {
        res.status(500).json({ error: "Error updating task" });
    }
});

// ================= START SERVER =================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
