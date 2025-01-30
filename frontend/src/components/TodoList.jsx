import React from "react";
import { useTodoStore } from "../store/todoStore";
import TodoItem from "./TodoItem";

function TodoList() {
  const { todos, removeTodo, toggleTodo } = useTodoStore();

  return (
    <ul className="mt-4 rounded-lg bg-white p-4 shadow-md">
      {todos.length === 0 ? (
        <p className="text-center text-gray-500">Keine Aufgaben vorhanden</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onRemove={removeTodo}
          />
        ))
      )}
    </ul>
  );
}

export default TodoList;
