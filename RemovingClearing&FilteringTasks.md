# REMOVING CLEARING AND FILTERING TASKS

### REQUIRED VARIABLES

```javascript
const taskList = document.querySelector(".collection");

const taskForm = document.querySelector("#task-form");

const taskInput = document.querySelector("#task");

const clearButton = document.querySelector(".clear-tasks");

const filter = document.querySelector("#filter");
```

## Removing a task

When we will click the 'x' item in the Task List it will remove that item from the task List

```javascript
taskList.addEventListener("click", removeTask);

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure you want to remove this task")) {
      e.target.parentElement.parentElement.remove();
    }
  }
}
```

## Clearing a task

If we will click the clear task button in the task list, this function will wipe out all the tasks

```javascript
clearButton.addEventListener("click", clearTask);

function clearTask(e) {
  // Now there are 2 approaches to clear the tasks

  // Approach 1(Slightly slower)

  taskList.innerText = "";

  // Approach 2 (Using a while loop)
  if (confirm("Are You Sure you want to clear all the tasks")) {
    // Means there is still a child present in the list
    while (task.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }
}
```

## Filtering Tasks

Filtering tasks will enable us to filter the tasks while we search through them

```javascript
// e.target.value is the text which will catch when we type for filtering the tasks
// The purpose of converting it into lower case is for complete matching of the tasks

const text = e.target.value.toLowerCase();

// Returns a node list of all the items present in the node list

document.querySelectorAll(".collection-item").forEach(function (task) {
  //* ----------------------------------------------------------------------

  //item stoes the textcontent of the first child present in the list item.

  const item = task.firstChild.textContent;

  // Now if the text content of the first child matched with the text content of the 'text' which we have provided then it will display it otherwise it will display: none;

  if (item.toLocaleLowerCase().indexOf(text) != -1) {
    task.style.display = "block";
  } else {
    task.style.display = "none";
  }
});
```
