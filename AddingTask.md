# ADDING THE TASK

```javascript
// Storing the ul as a collection
const taskList = document.querySelector(".collection");

// Storing the form
const taskForm = document.querySelector("#task-form");

//Storing the input as a task
const taskInput = document.querySelector("#task");

// Listening the event on taskForm when we submit the form or when we will click the button 'Add Task' the event triggers

taskForm.addEventListener("submit", addTask);

function addTask(e) {
  // If we enter nothing and submitted the form then this case will fire
  if (taskInput.value === "") {
    alert("Please add a task to continue");
  }

  // Else create a list item
  const listItem = document.createElement("li");

  // Assigning materialize css class to the list item
  listItem.className = "collection-item";

  listItem.appendChild(document.createTextNode(taskInput.value));

  // Create a link
  const link = document.createElement("a");

  // Assign a class to the link
  link.className = "delete-item secondary-content";

  link.innerHTML = '<i class="fa fa-remove"></i>';

  // Append the link to the list item
  listItem.appendChild(link);

  taskList.appendChild(listItem);

  taskInput.value = "";

  e.preventDefault();
}
```
