const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const todos = [];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// get all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// get single todo by id
app.get("/todos/:id", (req, res) => {
  const id = req.params.id;
  const todo = todos.find((todo) => todo.id === id);
  res.json(todo);
});

// create a new todo
app.post("/todos", (req, res) => {
  const todo = req.body;
  todos.push(todo);
  res.json(todo);
});

// update a todo
app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const newTodo = req.body;
  const index = todos.findIndex((todo) => todo.id === id);
  todos[index] = newTodo;
  res.json(todos);
});

// delete a todo
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((todo) => todo.id === id);
  todos.splice(index, 1);
  res.json({ message: "Todo deleted" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
