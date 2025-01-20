const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const TODO_FILE_PATH = path.join(__dirname, "todos.json");
console.log(TODO_FILE_PATH);


app.use(cors());
app.use(express.json());

let todos = [];

try {
  if (fs.existsSync(TODO_FILE_PATH)){
    const data = fs.readFileSync(TODO_FILE_PATH, "utf-8");
    todos = JSON.parse(data);
  } else {
    console.log("File does not exist")
  }  
  
} catch (error) {
  console.log("todo file does not exist",error);
  
}

function saveTodos() {
  fs.writeFileSync(TODO_FILE_PATH, JSON.stringify(todos, null, 2), "utf-8");
}

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
  saveTodos();
  res.json(todo);
});

// update a todo
app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  const newTodo = req.body;
  const index = todos.findIndex((todo) => todo.id === id);
  todos[index] = newTodo;
  saveTodos();
  res.json(todos);
});

// delete a todo
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((todo) => todo.id === id);
  todos.splice(index, 1);
  saveTodos();
  res.json({ message: "Todo deleted" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
