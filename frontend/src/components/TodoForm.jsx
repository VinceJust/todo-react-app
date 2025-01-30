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
      <button type="submit" className="rounded bg-blue-500 p-2 text-white">
        Hinzufügen
      </button>
    </form>
  );
}

export default TodoForm;
