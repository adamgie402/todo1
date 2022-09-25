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

//functions
function getTodos(){
    console.log('f getTodos...');
    // get todos list
    if(localStorage.getItem('todos') === null){
        console.log("local storage are empty... add something...");
        loadDefaultTodos();
    } else {
        // get todos 
        todos = JSON.parse(localStorage.getItem('todos'));
        console.log("todos list: " + todos);
    }
    //get done todos list
    if(localStorage.getItem('todosDone') !== null) {
        todosDone = JSON.parse(localStorage.getItem('todosDone'));
        console.log("done todos list: " + todosDone);
    }
    showTodos();
}

function loadDefaultTodos() {
    // for testing purpose only...
    console.log("loading default todos...");
    const defaultTodos = ['learn JS', 'eat something', 'go outside'];
    todos = defaultTodos;
    showTodos();
} 

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
        // set taskDone attribute on done todos
        if (todosDone.includes(span.textContent)){
            span.setAttribute("class", "taskDone");
        }
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

    // if todo alredy exist on list
    if (todos.includes(input.value)){
        input.value = "";
        input.setAttribute('placeholder', "it's already on list ;)");
        // show modal
        // ...

    } else {
        todos.unshift(input.value);
        console.log(todos);
        input.setAttribute('placeholder', 'type something...');
        input.value = ""; //reset input value in form
        saveTodos();
    }

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
    // togle class on clicked elem.
    element.classList.toggle("taskDone");
    // refresch todosDone array every time when click some done button
    console.log('refresh done todos...');
    // 1. clear current list
    todosDone = [];
    // 2. take htmlcoll. with class taskDone
    let doneItems = document.getElementsByClassName('taskDone');
    console.log(doneItems);
    //iterate on htmlcollection and push to array todosDone
    for(let i=0; i<doneItems.length; i++){
        // console.log(doneItems[i].innerText);
        todosDone.push(doneItems[i].innerText);
    }
    console.log(todosDone);
    saveTodos();
}

function saveTodos(){

    // ...
    // ?? czy przenieść tutaj odświeżanie tablic todos i todosDone (za każdym razem zapis w kolejności takiej jaka jest na ekranie - potrzebne do draggable list)

    //save todos
    console.log("f save todos...");
    localStorage.setItem('todos', JSON.stringify(todos));
    console.log('local strage todos: ');
    console.log(JSON.parse(localStorage.getItem('todos')));
    //save done todos
    localStorage.setItem('todosDone', JSON.stringify(todosDone));
    console.log('local strage todosDone: ');
    console.log(JSON.parse(localStorage.getItem('todosDone')));
    getTodos();
};

function deleteAllTodos(){
    console.log('f deletealltodos...');
    todos = [];
    todosDone = [];
    saveTodos();
}


