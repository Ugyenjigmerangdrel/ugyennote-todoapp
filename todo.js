//selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')

//event listeners
document.addEventListener('DOMContentLoaded', getTodos);

todoButton.addEventListener('click', addTodo);

todoList.addEventListener('click', deleteCheck);

//functions
function addTodo(event){
    if(todoInput.value === ''){
        return 
    }
    event.preventDefault();
    //Creating the list view of the todo list:
    //Todo div which contains the list, button and a checkbox
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo")

    //Todo Li which will used for displaying the list.
    const todoLi = document.createElement('li');
    todoLi.classList.add("todo-item")
    todoLi.innerText = todoInput.value;
    todoDiv.appendChild(todoLi);

    //Todo add to localstorage
    todoSaveLocal(todoInput.value)
    //Todo completed checkbox
    const todoDone = document.createElement('button');
    todoDone.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
    todoDone.classList.add('todo-done');
    todoDiv.appendChild(todoDone);

    //Todo Delete which will delete the todo item
    const todoTrash = document.createElement('button');
    todoTrash.innerHTML= '<i class="fa fa-trash"></i>'
    todoTrash.classList.add('todo-trash')
    todoDiv.appendChild(todoTrash);

    //append tododiv to preexisting list
    todoList.appendChild(todoDiv)
    //Clearing the input value
    todoInput.value = ''
}

function deleteCheck(e){
    const item = e.target;

    if (item.classList[0] === 'todo-trash'){
        const todo = item.parentElement;
        removeTodos(todo);
        todo.classList.add('fall');
        todo.addEventListener('transitionend', () => {
            todo.remove();
        })
    }
    if (item.classList[0] === 'todo-done'){
        const todo = item.parentElement;
        todo.classList.toggle('done')
    }

}

function todoSaveLocal(todo){
    //Item Check:
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.forEach(function(todos){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo")

        //Todo Li which will used for displaying the list.
        const todoLi = document.createElement('li');
        todoLi.classList.add("todo-item")
        todoLi.innerText = todos;
        todoDiv.appendChild(todoLi);


        //Todo completed checkbox
        const todoDone = document.createElement('button');
        todoDone.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
        todoDone.classList.add('todo-done');
        todoDiv.appendChild(todoDone);

        //Todo Delete which will delete the todo item
        const todoTrash = document.createElement('button');
        todoTrash.innerHTML= '<i class="fa fa-trash"></i>'
        todoTrash.classList.add('todo-trash')
        todoDiv.appendChild(todoTrash);

        //append tododiv to preexisting list
        todoList.appendChild(todoDiv)
    });

}

function removeTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos))
    
}

