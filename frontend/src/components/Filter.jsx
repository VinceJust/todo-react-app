import React from "react";
import { useTodoStore } from "../store/todoStore";

function Filter() {
  const setFilter = useTodoStore((state) => state.setFilter);
  const activeFilter = useTodoStore((state) => state.filter);

  return (
    <div className="my-4 flex justify-center gap-2">
      <button
        className={`rounded px-4 py-2 ${
          activeFilter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => setFilter("all")}>
        Alle
      </button>
      <button
        className={`rounded px-4 py-2 ${
          activeFilter === "active" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => setFilter("active")}>
        Offen
      </button>
      <button
        className={`rounded px-4 py-2 ${
          activeFilter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => setFilter("completed")}>
        Erledigt
      </button>
    </div>
  );
}

export default Filter;