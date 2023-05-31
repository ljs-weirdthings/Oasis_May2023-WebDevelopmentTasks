// Store tasks in an array
let tasks = [];

// Function to add a new task
function addTask(event) {
  event.preventDefault(); // Prevent form submission

  const taskInput = document.getElementById('taskInput');
  const descriptionInput = document.getElementById('descriptionInput');
  const taskText = taskInput.value.trim();
  const descriptionText = descriptionInput.value.trim();

  if (taskText !== '') {
    const task = {
      text: taskText,
      description: descriptionText,
      completed: false,
      added: new Date()
    };

    tasks.push(task);
    taskInput.value = ''; // Clear the input fields
    descriptionInput.value = '';

    renderTasks();
  }
}

// Function to toggle task completion
function toggleTaskCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Function to toggle task expansion
function toggleTaskExpansion(index) {
  const listItem = document.getElementById(`task-${index}`);
  listItem.classList.toggle('expanded');
}

// Function to render tasks
function renderTasks() {
  const pendingTasksList = document.getElementById('pendingTasksList');
  const completedTasksList = document.getElementById('completedTasksList');

  // Clear the task lists
  pendingTasksList.innerHTML = '';
  completedTasksList.innerHTML = '';

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('task-item');
    listItem.id = `task-${index}`;
    if (task.completed) {
      listItem.classList.add('completed');
    }

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTaskCompletion(index));
    listItem.appendChild(checkbox);

    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    listItem.appendChild(taskText);

    const descriptionText = document.createElement('p');
    descriptionText.textContent = task.description;
    listItem.appendChild(descriptionText);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(index));
    listItem.appendChild(deleteButton);

    const expandButton = document.createElement('button');
    expandButton.classList.add('expand-button');
    expandButton.innerHTML = '<span class="expand-icon">&#9654;</span>';
    expandButton.addEventListener('click', () => toggleTaskExpansion(index));
    listItem.appendChild(expandButton);

    if (task.completed) {
      completedTasksList.appendChild(listItem);
    } else {
      pendingTasksList.appendChild(listItem);
    }
  });
}

// Add event listener to the form
const taskForm = document.getElementById('taskForm');
taskForm.addEventListener('submit', addTask);
