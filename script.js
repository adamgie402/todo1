//variables
const todosList = document.getElementById('todos');
const input = document.getElementById('inputTodo');
const addBtn = document.getElementById('addBtn');
const delAllBtn = document.getElementById('delAllBtn');
let todos = [];
let todosDone = [];


//events
window.addEventListener('DOMContentLoaded', getTodos);
document.getElementById("inputTodo").focus();
addBtn.addEventListener('click', addTodo);
delAllBtn.addEventListener('click', deleteAllTodos);


function getTodos(){
    console.log('f getTodos...');
    // let todos;
    if(localStorage.getItem('todos') === null){
        console.log("local storage are empty... add something...");
        loadDefaultTodos();
    } else { 
        todos = JSON.parse(localStorage.getItem('todos'));
        console.log(todos);
        showTodos();
    }
}

function loadDefaultTodos() {
    // for testing purpose only...
    console.log("loading default todos...");
    const defaultTodos = ['learn JS', 'eat something', 'go outside'];
    todos = defaultTodos;
    showTodos();
} 


//functions
function showTodos() { 
    todosList.textContent = "";
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
    console.log('f addtodo...');
    e.preventDefault(); 
    todos.push(input.value);
    console.log(todos);
    input.value = ""; //reset input value in html
    saveTodos();
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
    saveTodos();
    getTodos();
}

function changeStatus(el){
    let element = el.parentElement;
    element = element.firstChild;
    console.log(element);
    element.classList.toggle("taskDone");
}

function saveTodos(){
    console.log("f save todos...");
    localStorage.setItem('todos', JSON.stringify(todos));
    console.log(JSON.parse(localStorage.getItem('todos')));
    getTodos();
};


function deleteAllTodos(){
    console.log('f delalltodos...');
    todos = [];
    saveTodos();
}