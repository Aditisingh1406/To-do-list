const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');

// Load existing todos from localStorage
const todos = JSON.parse(localStorage.getItem('todos'));

if (todos) {
  todos.forEach(todo => addTodo(todo));
}

// Form submission handler
form.addEventListener('submit', (e) => {
  e.preventDefault();
  addTodo();
});

// Add a new todo
function addTodo(todo) {
  let todoText = input.value.trim();

  if (todo) {
    todoText = todo.text;
  }

  if (todoText !== '') {
    const todoEl = document.createElement('li');
    todoEl.innerText = todoText;

    if (todo && todo.completed) {
      todoEl.classList.add('completed');
    }

    // Toggle complete
    todoEl.addEventListener('click', () => {
      todoEl.classList.toggle('completed');
      updateLS();
    });

    // Right click to delete
    todoEl.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      todoEl.remove();
      updateLS();
    });

    todosUL.appendChild(todoEl);
    input.value = '';
    updateLS();
  }
}

// Save todos to localStorage
function updateLS() {
  const todosEl = document.querySelectorAll('li');
  const todos = [];

  todosEl.forEach(todoEl => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains('completed'),
    });
  });

  localStorage.setItem('todos', JSON.stringify(todos));
}
