const todoInput = document.querySelector('.todoInput')
const form = document.querySelector('.form')
const todos = document.querySelector('.todos ul')

const addTodo = (text) => {
    if(text){
        const newTodo = `
            <li class="sTodo">
                <span>${text}</span>
                <div class="icons">
                    <i class="flaticon-edit editTodo"></i>
                    <i class="flaticon-delete deleteTodo"></i>
                </div>
            </li>
        `
        todos.innerHTML += newTodo
        todoInput.value = ''
        todoInput.focus()
    }
}

const editTodo = (text) => {
    let newTodo = prompt('Edit todo', text.trim())
    if(!newTodo){
        newTodo = prompt('Edit todo', text.trim())
    }else{
        return newTodo
    }
}

todos.addEventListener('click', (e) => {
    if(e.target.classList.contains('sTodo')){
        e.target.classList.toggle('completeTodo')
    }

    if(e.target.nodeName === "SPAN"){
        e.target.classList.toggle('completeTodo')
    }

    if(e.target.classList.contains('deleteTodo')){
        e.target.parentElement.parentElement.remove()
    }

    if(e.target.classList.contains('editTodo')){
        const editedTodo = editTodo(e.target.parentElement.parentElement.innerText)
        e.target.parentElement.parentElement.innerHTML = `
            <span>${editedTodo}</span>
            <div class="icons">
                <i class="flaticon-edit editTodo"></i>
                <i class="flaticon-delete deleteTodo"></i>
            </div>
        `
    }
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    addTodo(todoInput.value)
})