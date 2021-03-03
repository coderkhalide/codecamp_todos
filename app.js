const todoInput = document.querySelector('.todoInput')
const form = document.querySelector('.form')
const todosOutput = document.querySelector('.todos ul')

const getTodos = () => {
    const todos = JSON.parse(localStorage.getItem('todos'))
    let allTodos = ''
    todos.forEach((todo, index) => {
        const newTodo = `
            <li class="sTodo">
                <span>${todo.text}</span>
                <div class="icons">
                    <i class="flaticon-edit editTodo" data-id=${index}></i>
                    <i class="flaticon-delete deleteTodo" data-id=${index}></i>
                </div>
            </li>
        `
        
        allTodos += newTodo
       
    })
    todosOutput.innerHTML = allTodos
}

const addTodo = (text) => {
    if(text){
        let oldTodos = JSON.parse(localStorage.getItem('todos')) ? JSON.parse(localStorage.getItem('todos')) : []

        localStorage.setItem('todos', JSON.stringify([...oldTodos, {text}]))

        todoInput.value = ''
        todoInput.focus()
        getTodos()
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

todosOutput.addEventListener('click', (e) => {
    if(e.target.classList.contains('sTodo')){
        e.target.classList.toggle('completeTodo')
    }

    if(e.target.nodeName === "SPAN"){
        e.target.classList.toggle('completeTodo')
    }

    if(e.target.classList.contains('deleteTodo')){
        const id = e.target.getAttribute('data-id')
        
        let allTodos = JSON.parse(localStorage.getItem('todos')) ? JSON.parse(localStorage.getItem('todos')) : []

        allTodos.splice(Number(id), 1)

        localStorage.setItem('todos', JSON.stringify(allTodos))
        getTodos()
    }

    if(e.target.classList.contains('editTodo')){
        const editedTodo = editTodo(e.target.parentElement.parentElement.innerText)

        const id = e.target.getAttribute('data-id')

        let allTodos = JSON.parse(localStorage.getItem('todos')) ? JSON.parse(localStorage.getItem('todos')) : []

        allTodos.splice(Number(id), 1, {text: editedTodo})

        localStorage.setItem('todos', JSON.stringify(allTodos))
        getTodos()
    }
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    addTodo(todoInput.value)
})

getTodos()
