
// Task Array
let tasks = [];

// Select Elements
const form = document.querySelector("form");
const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");
const priorityInput = document.getElementById("priority");
const dueDateInput = document.getElementById("dueDate");
const filterSelect = document.getElementById("filter");

// Create task list container dynamically
const taskList = document.createElement("div");
taskList.id = "taskList";
document.querySelector(".todoapp").appendChild(taskList);

//Add Task
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (
    titleInput.value === "" ||
    descInput.value === "" ||
    priorityInput.value === "" ||
    dueDateInput.value === ""
  ) {
    alert("Please fill all fields");
    return;
  }

  const task = {
    id: Date.now(),
    title: titleInput.value,
    description: descInput.value,
    priority: priorityInput.value,
    dueDate: new Date(dueDateInput.value),
    completed: false
  };

  tasks.push(task);
  sortByDate();
  renderTasks();
  form.reset();
});

// Render Tasks
function renderTasks() {
  taskList.innerHTML = "";

  let filteredTasks = tasks;

  if (filterSelect.value === "completed") {
    filteredTasks = tasks.filter(task => task.completed);
  } 
  else if (filterSelect.value === "pending") {
    filteredTasks = tasks.filter(task => !task.completed);
  }

  filteredTasks.forEach(task => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";

    taskDiv.innerHTML = `
      <h4 style="text-decoration:${task.completed ? "line-through" : "none"}">
        ${task.title}
      </h4>
      <p>${task.description}</p>

      <span class="priority ${task.priority}">
        ${task.priority.replace("_", " ")}
      </span>

      <p>Due: ${task.dueDate.toDateString()}</p>

      <button onclick="toggleTask(${task.id})">
        ${task.completed ? "Undo" : "Complete"}
      </button>

      <button onclick="deleteTask(${task.id})">
        Delete
      </button>
    `;

    taskList.appendChild(taskDiv);
  });
}

// Mark Complete / Undo
function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id
      ? { ...task, completed: !task.completed }
      : task
  );
  renderTasks();
}

//Delete Task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}


//Filter Tasks
filterSelect.addEventListener("change", renderTasks);

//Sort by Due Date
function sortByDate() {
  tasks.sort((a, b) => a.dueDate - b.dueDate);
}
