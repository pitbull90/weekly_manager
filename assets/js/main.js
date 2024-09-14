function addTask(dayId, inputId) {
  const taskInput = document.getElementById(inputId);
  const taskList = document.getElementById(
    `taskList${capitalizeFirstLetter(dayId)}`
  );
  const taskValue = taskInput.value.trim();

  if (taskValue) {
    const taskItem = document.createElement('div');
    taskItem.setAttribute('class', 'task');
  }
}
