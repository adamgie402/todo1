//variables
const todosList = document.getElementById('todos');
const input = document.getElementById('inputTodo');
const addBtn = document.getElementById('add');
const todos = ['learn JS', 'eat something', 'go outside'];

//events
window.addEventListener('DOMContentLoaded', loadTodos);
addBtn.addEventListener('click', addTodo);

//functions
function loadTodos() { 
    // this function load tasks only on startup
    for (let i = 0; i < todos.length; i++){
        let li = document.createElement('li');
        li.textContent = todos[i];
        todosList.appendChild(li);
        addDelButton(li);
    };
};

function addDelButton(li){
    let btn = document.createElement('button');
    btn.setAttribute("onclick", "removeTodo(this)");
    btn.textContent = "del";
    btn.classList.add("delBtn");
    todosList.appendChild(li);
    li.appendChild(btn);
    btn.parentElement.setAttribute("draggable", "true");
}

function addTodo(e) {
    // this function adding new task from input
    e.preventDefault(); // to prevent standard button bevaviour
    let li = document.createElement('li');
    li.textContent = input.value    
    //add to array
    todos.push(input.value);
    console.log(todos);
    //add to screen
    todosList.appendChild(li);
    addDelButton(li);
    input.value = ""; //reset input value in html
};