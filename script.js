//variables
const todosList = document.getElementById('todos');
const input = document.getElementById('inputTodo');
const addBtn = document.getElementById('add');
const todos = ['learn JS', 'eat something', 'go outside'];

//events
window.addEventListener('DOMContentLoaded', loadTodos);
// addBtn.addEventListener('click', addTodo);

//functions
function loadTodos() { 
    // this function load tasks only on startup
    for (let i = 0; i < todos.length; i++){
        let li = document.createElement('li');
        li.textContent = todos[i];
        todosList.appendChild(li);
    };
};

