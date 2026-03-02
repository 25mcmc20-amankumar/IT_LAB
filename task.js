"use strict";
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["Pending"] = "pending";
    TaskStatus["Completed"] = "completed";
})(TaskStatus || (TaskStatus = {}));
class TaskModel {
    constructor(title, description, priority, dueDate) {
        this.id = Date.now();
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
        this.status = TaskStatus.Pending;
    }
    toggle() {
        this.status =
            this.status === TaskStatus.Pending
                ? TaskStatus.Completed
                : TaskStatus.Pending;
    }
}
let tasks = [];
const form = document.querySelector("form");
const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");
const priorityInput = document.getElementById("priority");
const dueDateInput = document.getElementById("dueDate");
const filterSelect = document.getElementById("filter");
const taskList = document.createElement("div");
taskList.id = "taskList";
document.querySelector(".todoapp").appendChild(taskList);
form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (titleInput.value === "" ||
        descInput.value === "" ||
        priorityInput.value === "" ||
        dueDateInput.value === "") {
        alert("Please fill all fields");
        return;
    }
    const task = new TaskModel(titleInput.value, descInput.value, priorityInput.value, new Date(dueDateInput.value));
    tasks.push(task);
    sortByDate();
    renderTasks();
    form.reset();
});
function renderTasks() {
    taskList.innerHTML = "";
    let filteredTasks = tasks;
    if (filterSelect.value === "all") {
        filteredTasks = tasks;
    }
    else if (filterSelect.value === TaskStatus.Completed) {
        filteredTasks = tasks.filter(task => task.status === TaskStatus.Completed);
    }
    else if (filterSelect.value === TaskStatus.Pending) {
        filteredTasks = tasks.filter(task => task.status === TaskStatus.Pending);
    }
    filteredTasks.forEach((task) => {
        console.log(task.id);
        console.log(task.title);
        console.log(task.description);
        console.log(task.dueDate);
        console.log(task.priority);
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
function toggleTask(id) {
    tasks.forEach(task => {
        if (task.id === id) {
            task.toggle();
        }
    });
    renderTasks();
}
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}
filterSelect.addEventListener("change", renderTasks);
function sortByDate() {
    tasks.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
}
