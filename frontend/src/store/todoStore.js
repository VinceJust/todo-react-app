import { create } from "zustand";

// Load todos from localStorage
const getTodosFromLocalStorage = () => {
  const storedTodos = localStorage.getItem("todos");
  return storedTodos ? JSON.parse(storedTodos) : [];
};

export const useTodoStore = create((set, get) => ({
  todos: getTodosFromLocalStorage(),
  filter: "all",

  setFilter: (filter) => set({ filter }),

  getFilteredTodos: () => {
    const { todos, filter } = get();
    if (filter === "completed") return todos.filter((todo) => todo.completed);
    if (filter === "active") return todos.filter((todo) => !todo.completed);
    return todos;
  },

  addTodo: (text) =>
    set((state) => {
      const newTodos = [
        ...state.todos,
        { id: Date.now(), text, completed: false },
      ];
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return { todos: newTodos };
    }),

  removeTodo: (id) =>
    set((state) => {
      const newTodos = state.todos.filter((todo) => todo.id !== id);
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return { todos: newTodos };
    }),

  toggleTodo: (id) =>
    set((state) => {
      const newTodos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      );
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return { todos: newTodos };
    }),
}));
