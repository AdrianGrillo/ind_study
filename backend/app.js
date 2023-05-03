const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Task } = require("./database");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

const taskRoutes = require("./routes/taskRoutes");
app.use("/api/tasks", taskRoutes);

app.get("/api/tasks", (req, res) => {
  // Implement logic to fetch tasks from the database
  res.send("List of tasks will be displayed here");
});

app.post("/api/tasks", async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
    res.send("New task added");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put("/tasks/:id", (req, res) => {
  // Implement logic to update a task with the specified id
  res.send(`Task with id: ${req.params.id} updated`);
});

app.delete("/tasks/:id", (req, res) => {
  // Implement logic to delete a task with the specified id
  res.send(`Task with id: ${req.params.id} deleted`);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
