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

    const removeButton = document.createElement('button');
    removeButton.textContent = '×'; // Using × instead of 'Remove' for a more minimal look
    removeButton.setAttribute('class', 'remove-task-button');
    removeButton.setAttribute('title', 'Remove task'); // Add a tooltip
    removeButton.onclick = function () {
      removeTask(taskItem);
    };

    taskItem.appendChild(task);
    taskItem.appendChild(removeButton);
    taskList.appendChild(taskItem);

    taskInput.value = ''; // Clear input field after adding task
  }
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Remove individual task
function removeTask(taskItem) {
  taskItem.remove();
}

// Remove all tasks for a specific day
function removeAllTasks(dayId) {
  const taskList = document.getElementById(
    `taskList${capitalizeFirstLetter(dayId)}`
  );
  taskList.innerHTML = '';
}

// Add "Clear All" buttons to each day card
function addClearAllButtons() {
  const days = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];
  days.forEach((day) => {
    const dayCard = document.getElementById(`${day}_card`);
    const dayFooter = dayCard.querySelector('.day-footer');
    const clearAllButton = document.createElement('button');
    clearAllButton.textContent = 'Clear All';
    clearAllButton.setAttribute('class', 'remove-all-button');
    clearAllButton.onclick = function () {
      removeAllTasks(day);
    };
    dayFooter.appendChild(clearAllButton);
  });
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', addClearAllButtons);
