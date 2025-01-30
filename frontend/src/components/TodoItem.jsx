import React from "react";

function TodoItem({ todo, onToggle, onRemove }) {
  return (
    <li className="flex items-center justify-between border-b py-2">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="cursor-pointer"
        />
        <span className={todo.completed ? "line-through text-gray-500" : ""}>
          {todo.text}
        </span>
      </label>
      <button onClick={() => onRemove(todo.id)} className="text-red-500">
        Löschen
      </button>
    </li>
  );
}

export default TodoItem;
