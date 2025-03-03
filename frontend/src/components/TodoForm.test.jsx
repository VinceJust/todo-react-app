import { render, screen, fireEvent } from "@testing-library/react";
import TodoForm from "./TodoForm";
import { vi } from "vitest";
import * as todoStoreModule from "../store/todoStore";

// Mock the entire module instead of just the hook
vi.mock("../store/todoStore", async () => {
  const actual = await vi.importActual("../store/todoStore");
  return {
    ...actual,
    // Instead of mocking the hook directly, we'll set up a proper implementation
  };
});

test("renders input field and submit button", () => {
  // Mock the hook to return a function that returns the addTodo function
  const addTodoMock = vi.fn();
  const useTodoStoreMock = vi.fn((selector) => selector({ addTodo: addTodoMock }));
  vi.spyOn(todoStoreModule, 'useTodoStore').mockImplementation(useTodoStoreMock);

  render(<TodoForm />);

  const input = screen.getByPlaceholderText(/Neue Aufgabe/i);
  const button = screen.getByRole("button", { name: /hinzufügen/i });

  expect(input).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});

test("calls addTodo function when form is submitted", () => {
  const addTodoMock = vi.fn();
  
  // This is the key change - mock the selector pattern correctly
  const useTodoStoreMock = vi.fn((selector) => selector({ addTodo: addTodoMock }));
  vi.spyOn(todoStoreModule, 'useTodoStore').mockImplementation(useTodoStoreMock);

  render(<TodoForm />);

  const input = screen.getByPlaceholderText(/Neue Aufgabe/i);
  const button = screen.getByRole("button", { name: /hinzufügen/i });

  fireEvent.change(input, { target: { value: "Meine neue Aufgabe" } });
  fireEvent.click(button);

  expect(addTodoMock).toHaveBeenCalledTimes(1);
  expect(addTodoMock).toHaveBeenCalledWith("Meine neue Aufgabe");
});