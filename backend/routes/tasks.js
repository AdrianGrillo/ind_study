const express = require("express");
const { Task } = require("../database");

const router = express.Router();

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

// Add a task
router.post("/", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const taskToDelete = await Task.findById(taskId);

    if (!taskToDelete) {
      return res.status(404).json({ message: "Task not found" });
    }

    await taskToDelete.deleteOne();
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting task" });
  }
});

module.exports = router;
