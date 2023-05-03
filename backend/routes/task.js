const express = require("express");
const { Task } = require("./database"); // assuming your database file is named database.js

const app = express();

app.use(express.json());

// Get all tasks
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

// Add a task
app.post("/api/tasks", async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const newTask = new Task({ title, description, dueDate });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding task" });
  }
});

// Delete a task
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const taskToDelete = await Task.findById(taskId);

    if (!taskToDelete) {
      return res.status(404).json({ message: "Task not found" });
    }

    await taskToDelete.remove();
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting task" });
  }
});

module.exports = app;
