// Load tasks from local storage
function loadTasks() {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  days.forEach((day) => {
    const tasks = JSON.parse(localStorage.getItem(`tasks_${day}`)) || [];
    const taskList = document.getElementById(`taskList${capitalizeFirstLetter(day)}`);
    tasks.forEach((taskText) => {
      const taskItem = createTaskElement(taskText);
      taskList.appendChild(taskItem);
    });
  });
}

// Save tasks to local storage
function saveTasks(dayId) {
  const taskList = document.getElementById(`taskList${capitalizeFirstLetter(dayId)}`);
  const tasks = Array.from(taskList.children).map(task => task.querySelector('.task-label').textContent);
  localStorage.setItem(`tasks_${dayId}`, JSON.stringify(tasks));
}

// Create a task element
function createTaskElement(taskText) {
  const taskItem = document.createElement('div');
  taskItem.setAttribute('class', 'task');

  const task = document.createElement('label');
  task.setAttribute('class', 'task-label');
  task.textContent = taskText;

  const removeButton = document.createElement('button');
  removeButton.textContent = '×';
  removeButton.setAttribute('class', 'remove-task-button');
  removeButton.setAttribute('title', 'Remove task');
  removeButton.onclick = function () {
    removeTask(taskItem);
  };

  taskItem.appendChild(task);
  taskItem.appendChild(removeButton);
  return taskItem;
}

// Add task to respective day of the week
function addTask(event, dayId, inputId) {
  event.preventDefault();

  const taskInput = document.getElementById(inputId);
  const taskList = document.getElementById(`taskList${capitalizeFirstLetter(dayId)}`);
  const taskValue = taskInput.value.trim();

  if (taskValue) {
    const taskItem = createTaskElement(taskValue);
    taskList.appendChild(taskItem);
    taskInput.value = '';
    saveTasks(dayId);
  }
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Remove individual task
function removeTask(taskItem) {
  const dayId = taskItem.closest('.day-card').id.replace('_card', '');
  taskItem.remove();
  saveTasks(dayId);
}

// Remove all tasks for a specific day
function removeAllTasks(dayId) {
  const taskList = document.getElementById(`taskList${capitalizeFirstLetter(dayId)}`);
  taskList.innerHTML = '';
  saveTasks(dayId);
}

// Add "Clear All" buttons to each day card and highlight current day
function addClearAllButtonsAndHighlightToday() {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const today = new Date().getDay(); // 0 is Sunday, 1 is Monday, etc.

  days.forEach((day, index) => {
    const dayCard = document.getElementById(`${day}_card`);
    const dayHeader = dayCard.querySelector('.day-title');
    const dayFooter = dayCard.querySelector('.day-footer');

    // Add "(today)" text for the current day
    if ((today === 0 && index === 6) || (today === index + 1)) {
      const todaySpan = document.createElement('span');
      todaySpan.setAttribute('class', 'today')
      todaySpan.textContent = ' (today)';
      dayHeader.appendChild(todaySpan);
    }

    // Add "Clear All" button
    const clearAllButton = document.createElement('button');
    clearAllButton.textContent = 'Clear All';
    clearAllButton.setAttribute('class', 'remove-all-button');
    clearAllButton.onclick = function () {
      removeAllTasks(day);
    };
    dayFooter.appendChild(clearAllButton);
  });
}

// Call these functions when the page loads
document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
  addClearAllButtonsAndHighlightToday();
});