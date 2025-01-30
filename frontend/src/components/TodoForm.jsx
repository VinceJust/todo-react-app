import React, { useState } from "react";
import { useTodoStore } from "../store/todoStore";

function TodoForm() {
  const [input, setInput] = useState("");
  const addTodo = useTodoStore((state) => state.addTodo);

  function handleSubmit(event) {
    event.preventDefault();
    if (!input.trim()) return;
    addTodo(input);
    setInput("");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
      <input
        type="text"
        placeholder="Neue Aufgabe"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        className="flex-grow rounded border border-gray-300 p-2"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md shadow-md hover:bg-blue-600 transition duration-300">
        Hinzufügen
      </button>
    </form>
  );
}

export default TodoForm;
