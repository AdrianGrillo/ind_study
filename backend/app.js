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

const taskRoutes = require("./routes/tasks");
app.use("/api/tasks", taskRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
