import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(express.json()); 

const PORT = process.env.PORT || 5000;
const IP_ADDRESS = process.env.IP_ADDRESS || "127.0.0.1";

// IP address must for CICD when NGINX is only entry point to server.
app.listen(PORT, IP_ADDRESS, () => {
  console.log(`Server running on port ${PORT} and IP ${IP_ADDRESS}`);
});

app.get("/test", async (req, res) => {
  res.json("Testing");
});

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
//Define the Todo model:
const Todo = mongoose.model("Todo", {
  text: String
});
//GET route – fetch all todos:
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});
//POST route – add a todo:
app.post("/todos", async (req, res) => {
  const todo = new Todo({ text: req.body.text });
  await todo.save();
  res.json(todo);
});







