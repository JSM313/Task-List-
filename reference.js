// Defined UI Variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// LOAD ALL EVENT LISTENERS
loadEventListeners();

function loadEventListeners() {
  // DOM load event
  document.addEventListener("DOMContentLoaded", getTasks);

  // Add task Event
  form.addEventListener("submit", addTask);

  // Remove Task Event
  // ! (We can also do this)
  // * document.querySelector(".collection").addEventListener("click", removeTask);
  taskList.addEventListener("click", removeTask);

  // Clear Tasks Event
  clearBtn.addEventListener("click", clearTasks);

  // Filter Task Events
  filter.addEventListener("keyup", filterTasks);
}

// Get tasks
function getTasks(e) {
  let tasks;
  if (localStorage.getItem === "") {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    const li = document.createElement("li");

    li.className = "collection-item";

    // The text node is the task which is the text form like "Walk the Dog".

    li.appendChild(document.createTextNode(task.value));

    const link = document.createElement("a");

    link.className = "delete-item secondary-content";

    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);

    taskList.appendChild(li);
  });
}

// Add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Please add a task to continue");
  }

  // Creating List item which will further get registered when we add a task
  const li = document.createElement("li");

  // Adding a class to the li
  li.className = "collection-item";

  // Creating a text node which will register the text that we have entered
  const textNode = document.createTextNode(taskInput.value);
  li.appendChild(textNode);

  // Creating a new link element
  const link = document.createElement("a");

  //Adding a class to that link element so that we can style it later
  link.className = "delete-item secondary-content";

  // Add icon to HTML(the 'x' icon from font awesome)
  link.innerHTML = '<i class="fa fa-remove"></i>';

  // Appending the link to li
  li.appendChild(link);

  // Appending li to ul
  document.querySelector(".collection").appendChild(li);

  // Store in local storage
  storeTaskInLocalStorage(taskInput.value);

  // Clear Input
  taskInput.value = "";

  e.preventDefault();
}

// Store Task

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// To remove a task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure you want to delete this task")) {
      e.target.parentElement.parentElement.remove();

      // Remove Task from local Storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Removing from Local Storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem === "") {
    tasks = "";
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
  // * Option 1
  // taskList.innerHTML = "";

  // * Faster Option
  // USING A WHILE LOOP AND CLEAR IT ONE BY ONE
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear Tasks from LS
  localStorage.clear();
}

// Filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
