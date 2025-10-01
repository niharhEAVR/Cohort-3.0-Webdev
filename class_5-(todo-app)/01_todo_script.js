const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const container = document.getElementsByClassName("container");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Render tasks
function renderTodos() {
    taskList.innerHTML = "";
    todos.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${index+1}. ${task.text}`;

        if (task.done) li.classList.add("done");

        // Toggle complete
        li.addEventListener("click", () => toggleTask(index));

        // Actions container
        const actions = document.createElement("div");
        actions.classList.add("actions");

        // Edit button
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit");
        editBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            editTask(index);
        });

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.classList.add("delete");
        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            deleteTask(index);
        });

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        li.appendChild(actions);

        taskList.appendChild(li);
    });
}

// Add task
function addTask() {
    const text = input.value.trim();
    if (text === "") return;

    todos.push({ text, done: false });
    saveAndRender();
    input.value = "";
}

// Toggle done
function toggleTask(index) {
    todos[index].done = !todos[index].done;
    saveAndRender();
}

// Edit task
function editTask(index) {
    const newText = prompt("Edit task:", todos[index].text);
    if (newText !== null && newText.trim() !== "") {
        todos[index].text = newText.trim();
        saveAndRender();
    }
}

// Delete task
function deleteTask(index) {
    todos.splice(index, 1);
    saveAndRender();
}

// Save to localStorage + render
function saveAndRender() {
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
}

// Event listeners
addBtn.addEventListener("click", addTask);
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});

document.addEventListener("keypress", (e) => {
    if (e.key === "|") deleteTask(todos.length - 1);
    input.value = "";
    
});

// Initial render
renderTodos();