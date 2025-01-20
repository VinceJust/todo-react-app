import "./style.css";
// selcting all required DOM elements
const input = document.getElementById("todo-item");
const addButton = document.querySelector('button[type="submit"]');
const todoList = document.querySelector("ul");

// API-URL Constant
const API_URL = "http://localhost:3000/todos";

// Initialisation
init();

/**
 * Initialisising the app
 */
function init() {
  // load all todos from the API
  loadTodos();

  // Event-listener for the add button
  addButton.addEventListener("click", createTodo);
}

/**
 * Fetch all todos from the API and render them in the DOM
 */
async function loadTodos() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      // Error-Handling for a failed request (4xx, 5xx)
      throw new Error(`Fehler beim Laden der Todos: ${response.status}`);
    }

    const data = await response.json();

    // Cleanup the list
    todoList.innerHTML = "";

    // Render todos in the DOM
    data.forEach((todo) => {
      renderTodo(todo);
    });
  } catch (error) {
    handleError(error);
  }
}

/**
 * Adds a new Todo to the API and renders it in the DOM
 */
async function createTodo() {
  const text = input.value.trim();
  if (!text) return; // Early return if input is empty

  // New Todo-Object
  const newTodo = {
    id: Date.now(), // Unique ID (for simplicity, we use the current timestamp)
    text,
    done: false,
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    });

    if (!response.ok) {
      throw new Error(`Fehler beim Erstellen eines Todos: ${response.status}`);
    }

    const createdTodo = await response.json();

    // Render the new todo in the DOM
    renderTodo(createdTodo);

    // Reset the input field
    input.value = "";
  } catch (error) {
    handleError(error);
  }
}

/**
 * Updatet a existing Todo in the API
 * @param {object} todo - todo-object with the new values
 */
async function updateTodo(todo) {
  try {
    const response = await fetch(`${API_URL}/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });

    if (!response.ok) {
      throw new Error(
        `Fehler beim Aktualisieren des Todos: ${response.status}`,
      );
    }
    const todos = await response.json();
    renderTodo(todos);
  } catch (error) {
    handleError(error);
  }
}

/**
 * Deletes a Todo from the API and removes it from the DOM
 * @param {number} id - ID for the todo to delete
 * @param {HTMLLIElement} li - Reference to the <li> element in the DOM to remove
 */
async function deleteTodo(id, li) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Fehler beim Löschen des Todos: ${response.status}`);
    }

    // If the request was successful, remove the <li> element from the DOM
    li.remove();
  } catch (error) {
    handleError(error);
  }
}

/**
 * Render a single Todo in the DOM
 * @param {object} todo - Todo-Object
 */
function renderTodo(todo) {
  // Create a new <li> element
  const li = document.createElement("li");
  li.className =
    "flex items-center justify-start border-t border-gray-300 py-2";

  // Checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = !!todo.done;
  checkbox.className =
    "size-5 cursor-pointer rounded border-slate-300 border-b-gray-500 transition-all " +
    "checked:border-blue-600 checked:bg-blue-400 hover:shadow-md";

  // Eventlistener for the checkbox to update the todo
  checkbox.addEventListener("change", () => {
    todo.done = checkbox.checked;
    updateTodo(todo);
  });

  // Text
  const span = document.createElement("span");
  span.className = "mx-4";
  span.textContent = todo.text;

  // Buttons Container
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "ml-auto flex space-x-2";

  // Edit-Button
  const editBtn = document.createElement("button");
  editBtn.textContent = "bearbeiten";
  editBtn.className = "bg-[#29b83a] px-4 py-2 text-white";

  editBtn.addEventListener("click", async () => {
    const newText = prompt("Neuen Text eingeben:", todo.text);
    if (newText !== null && newText.trim() !== "") {
      todo.text = newText.trim();
      span.textContent = todo.text;
      updateTodo(todo);
    }
  });

  // Delete-Button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "löschen";
  deleteBtn.className = "bg-[#C850C0] px-4 py-2 text-white";

  deleteBtn.addEventListener("click", () => {
    // API-Request to delete the todo
    deleteTodo(todo.id, li);
  });

  // Update DOM
  buttonContainer.appendChild(editBtn);
  buttonContainer.appendChild(deleteBtn);

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(buttonContainer);

  todoList.appendChild(li);
}

/**
 * Central Error-Handling
 * - Logs the error to the console or can be used to show a user-friendly error message
 * @param {Error} error - Das Fehler-Objekt
 */
function handleError(error) {
  console.error("Es ist ein Fehler aufgetreten:", error);
  // Optional: UI-Feedback
  alert(`Fehler: ${error.message}`);
}
