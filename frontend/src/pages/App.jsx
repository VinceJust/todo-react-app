import React from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import Filter from "../components/Filter";

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-300 to-blue-500">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Meine To-Do-App
        </h1>
        <TodoForm />
        <Filter />
        <TodoList />
      </div>
    </div>
  );
}

export default App;

