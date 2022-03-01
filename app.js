const taskList = document.querySelector(".collection");

const taskForm = document.querySelector("#task-form");

const taskInput = document.querySelector("#task");

const clearButton = document.querySelector(".clear-tasks");

const filter = document.querySelector("#filter");

taskForm.addEventListener("submit", addTask);

taskList.addEventListener("click", removeTask);

clearButton.addEventListener("click", clearTasks);

filter.addEventListener("keyup", filterTask);

// DOM LOAD EVENT(This function will show the item in the main windows from the local Storage)
document.addEventListener("DOMContentLoaded", getTasks);

function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    const listItem = document.createElement("li");

    listItem.className = "collection-item";

    listItem.appendChild(document.createTextNode(task));

    const link = document.createElement("a");

    link.className = "delete-item secondary-content";

    link.innerHTML = '<i class="fa fa-remove"></i>';

    listItem.appendChild(link);

    taskList.appendChild(listItem);
  });
}

function addTask(e) {
  if (taskInput.value === "") {
    alert("Please add a task to continue");
  }

  const listItem = document.createElement("li");

  listItem.className = "collection-item";

  listItem.appendChild(document.createTextNode(taskInput.value));

  const link = document.createElement("a");

  link.className = "delete-item secondary-content";

  link.innerHTML = '<i class="fa fa-remove"></i>';

  listItem.appendChild(link);

  taskList.appendChild(listItem);

  // Storing the task in Local Storage
  storeTaskInLocalStorage(taskInput.value);

  taskInput.value = "";
  e.preventDefault();
}

// Store Task in Local Storage
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

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure?")) {
      e.target.parentElement.parentElement.remove();

      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearTasks(e) {
  if (confirm("Are you sure you want to clear the tasks")) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }

  // Clear Tasks from local Storgae
  if (localStorage.getItem("tasks") === null) {
    alert("You cannot clear Tasks from empty list");
  } else {
    localStorage.clear();
  }
}

function filterTask(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;

    if (item.toLocaleLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
