//variables
const todosList = document.getElementById('todos');
const input = document.getElementById('inputTodo');
const addBtn = document.getElementById('add');
const todos = ['learn JS', 'eat something', 'go outside'];

//events
window.addEventListener('DOMContentLoaded', loadTodos);
document.getElementById("inputTodo").focus();
addBtn.addEventListener('click', addTodo);

//functions
function loadTodos() { 
    // this function load tasks only on startup
    for (let i = 0; i < todos.length; i++){
        let span = document.createElement('span');
        let li = document.createElement('li');
        span.textContent = todos[i]; 
        todosList.appendChild(li);
        li.appendChild(span);
        addDelButton(li);
        addDoneButton(li);
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

function addDoneButton(li){
    let btn = document.createElement('button');
    btn.setAttribute("onclick", "changeStatus(this)");
    btn.textContent = "done";
    btn.classList.add("doneBtn");
    todosList.appendChild(li);
    li.appendChild(btn);
    // btn.parentElement.setAttribute("draggable", "true");
}

function addTodo(e) {
    // this function adding new task from input
    e.preventDefault(); // to prevent standard button bevaviour
    let span = document.createElement('span');
    let li = document.createElement('li');
    span.textContent = input.value;   
    //add to array
    todos.push(input.value);
    console.log(todos);
    //add to screen
    todosList.appendChild(li);
    li.appendChild(span);
    addDelButton(li);
    addDoneButton(li);
    input.value = ""; //reset input value in html
};

function removeTodo(el){
    let element = el.parentElement; //parent to del button
    //removing from array
    itemToRemove = element.firstChild;
    let index = todos.indexOf(itemToRemove.textContent); //checking array index of element to remove
    console.log('deleting item with index: ' + index);
    if (index <= todos.length) {
        todos.splice(index, 1);
        console.log(todos);
    };
    //removing from screen
    element.remove();
}

function changeStatus(el){
    
    let element = el.parentElement;
    element = element.firstChild;
    console.log(element);
    element.classList.toggle("taskDone");
    
}