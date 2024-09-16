// Add task to respective day of the week
function addTask(event, dayId, inputId) {
  event.preventDefault(); // Prevent form submission from reloading the page

  const taskInput = document.getElementById(inputId);
  const taskList = document.getElementById(
    `taskList${capitalizeFirstLetter(dayId)}`
  );
  const taskValue = taskInput.value.trim();

  if (taskValue) {
    const taskItem = document.createElement('div');
    taskItem.setAttribute('class', 'task');

    const task = document.createElement('label');
    task.setAttribute('class', 'task-label');
    task.textContent = taskValue; // Set the task value as the label text

    taskItem.appendChild(task);
    taskList.appendChild(taskItem);

    taskInput.value = ''; // Clear input field after adding task
  }
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
