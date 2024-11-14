document.addEventListener("DOMContentLoaded", ()=> {
const todoform = document.getElementById("todo-form") as HTMLFormElement;
const todoinput = document.getElementById("todo-input") as HTMLInputElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;

interface todo{
    id : number;
    text: string;

};

let todos : todo[] = [];

todoform.addEventListener(("submit"), (event : Event)=>
{
    event.preventDefault();
    addInput();
});
function addInput(): void{
    const todoText  = todoinput.value.trim();
    if (todoText !== "")
    {
        const task: todo = {
            id : Date.now(),
            text : todoText
        };

        todos.push(task);
        renderTodos();
        todoinput.value = "";
    }
}
function renderTodos(): void{
    todoList.innerHTML = "";
    todos.forEach(todo=>{
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${todo.text}</span>
            <div class = "actions">
                <button data-id = "${todo.id}" class = "delete-btn">Delete task</button>
                <button data-id = "${todo.id}" class = "edit-btn">Update Task</button>
            </div>
        `
        todoList.appendChild(li);
    });
    document.querySelectorAll('.delete-btn').forEach(button =>{
        button.addEventListener("click", ()=>{
            const id = Number((button as HTMLButtonElement).getAttribute('data-id'));
            deleteTodo(id);
        });
    });
    document.querySelectorAll(".edit-btn").forEach(button =>{
        button.addEventListener("click", ()=>{
            const id = Number((button as HTMLButtonElement).getAttribute('data-id'));
            updateTodo(id);
        });
    });
};

function deleteTodo(id: number): void {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

function updateTodo(id : number) : void{
    const newText = prompt("Enter new task : ");
    if (newText !== null && newText !== "")
        {
            const todo = todos.find(todo => todo.id === id);
            if (todo)
            {
                todo.text = newText;
                renderTodos();
            }
        } 
}

});