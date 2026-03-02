
enum TaskStatus {
  Pending = "pending",
  Completed = "completed"
}

class TaskModel {
  id: number;
  title: string;
  description: string;
  priority: string;
  dueDate: Date;
  status: TaskStatus;

  constructor(
    title: string,
    description: string,
    priority: string,
    dueDate: Date
  ) {
    this.id = Date.now();
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.dueDate = dueDate;
    this.status = TaskStatus.Pending;
  }

  toggle(): void {
    this.status =
      this.status === TaskStatus.Pending
        ? TaskStatus.Completed
        : TaskStatus.Pending;
  }
}
let tasks: TaskModel[] = [];

const form = document.querySelector("form") as HTMLFormElement;
const titleInput = document.getElementById("title") as HTMLInputElement;
const descInput = document.getElementById("description") as HTMLTextAreaElement;
const priorityInput = document.getElementById("priority") as HTMLSelectElement;
const dueDateInput = document.getElementById("dueDate") as HTMLInputElement;
const filterSelect = document.getElementById("filter") as HTMLSelectElement;

const taskList = document.createElement("div");
taskList.id = "taskList";
document.querySelector(".todoapp")!.appendChild(taskList);

form.addEventListener("submit", function (e: Event): void {
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

const task = new TaskModel(
  titleInput.value,
  descInput.value,
  priorityInput.value,
  new Date(dueDateInput.value)
);


  tasks.push(task);
  sortByDate();
  renderTasks();
  form.reset();
});

function renderTasks(): void {
  taskList.innerHTML = "";

  let filteredTasks: TaskModel[] = tasks;

  if (filterSelect.value === "all") {
    filteredTasks = tasks;
  } else if (filterSelect.value === TaskStatus.Completed) {
    filteredTasks = tasks.filter(task => task.status === TaskStatus.Completed);
  } else if (filterSelect.value === TaskStatus.Pending) {
    filteredTasks = tasks.filter(task => task.status === TaskStatus.Pending);
  }

  filteredTasks.forEach((task: TaskModel) => {

    console.log(task.id)
    console.log(task.title)
    console.log(task.description)
    console.log(task.dueDate)
    console.log(task.priority)
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";


    const title = document.createElement("h4");
    title.textContent = task.title;
    title.style.textDecoration = task.status === TaskStatus.Completed ? "line-through" : "none";

    const desc = document.createElement("p");
    desc.textContent = task.description;

    const priority = document.createElement("span");
    priority.className = `priority ${task.priority}`;
    priority.textContent = task.priority.replace("_", " ");

    const due = document.createElement("p");
    due.textContent = `Due: ${task.dueDate.toDateString()}`;

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = task.status === TaskStatus.Completed ? "Undo" : "Complete";
    toggleBtn.addEventListener("click", () => toggleTask(task.id));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    taskDiv.append(title, desc, priority, due, toggleBtn, deleteBtn);
    taskList.appendChild(taskDiv);
  });
}



function toggleTask(id: number): void {
   tasks.forEach(task => {
    if (task.id === id) {
      task.toggle();
    }
  });
  renderTasks();
}

function deleteTask(id: number): void {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

filterSelect.addEventListener("change", renderTasks);

function sortByDate(): void {
  tasks.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
}
