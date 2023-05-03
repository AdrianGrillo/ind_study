const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://Admin:Admin@ind-study.etdikm2.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  completed: { type: Boolean, default: false },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = {
  Task,
};
