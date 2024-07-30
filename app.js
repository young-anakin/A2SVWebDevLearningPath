document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    let todos = [];

    todoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        addTodo();
    });

    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText !== '') {
            const todo = {
                id: Date.now(),
                text: todoText
            };
            todos.push(todo);
            renderTodos();
            todoInput.value = '';
        }
    }

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${todo.text}</span>
                <div class="actions">
                    <button onclick="editTodo(${todo.id})">Edit</button>
                    <button onclick="deleteTodo(${todo.id})">Delete</button>
                </div>
            `;
            todoList.appendChild(li);
        });
    }

    window.editTodo = function(id) {
        const newText = prompt('Edit your todo:');
        if (newText !== null && newText.trim() !== '') {
            const todo = todos.find(todo => todo.id === id);
            todo.text = newText;
            renderTodos();
        }
    };

    window.deleteTodo = function(id) {
        todos = todos.filter(todo => todo.id !== id);
        renderTodos();
    };
});
