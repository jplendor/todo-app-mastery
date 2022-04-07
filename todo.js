let todos = []
let id = 0

const setTodos = (newTodos) => todos = newTodos

const getTodos = () => todos

const init = () => {
    document.querySelector(".todo-input-box").addEventListener("submit", handleSubmit)
}

const handleSubmit = (e) => {
    e.preventDefault()
    addTodo()
}

const addTodo = () => {
    const newId = id++
    const todoInputElem = document.querySelector(".todo-input")
    const newTodos = [...getTodos(), {id: newId, content: todoInputElem.value, isCompleted: false}]
    todoInputElem.value = ''
    updateAll(newTodos)
}

const updateAll = (newTodos) => {
    setTodos(newTodos)
    paintTodos()
    calcRate()    
}

const deleteTodo = (todoId) => {
    newTodos = todos.filter(todo => todo.id !== todoId)
    updateAll(newTodos)
}

const completeTodo = (todoId) => {
    newTodos = todos.map(todo => todo.id === todoId? {...todo, isCompleted: !todo.isCompleted}: todo)
    updateAll(newTodos)
}

const paintTodos = () => {
    const todoListElem = document.querySelector(".todo-list")
    todoListElem.innerHTML = null

    todos.forEach(todo => {
        const todoItemElem = document.createElement("li")
        todoItemElem.classList.add("todo-item")
        
        const checkboxElem = document.createElement("div")
        checkboxElem.classList.add("checkbox")
        checkboxElem.addEventListener("click", () => {completeTodo(todo.id)})

        const todoElem = document.createElement("div")
        todoElem.classList.add("todo")
        todoElem.innerText = todo.content

        const delBtnElem = document.createElement("div")
        delBtnElem.classList.add("todo-del-btn")
        delBtnElem.addEventListener("click", () => {deleteTodo(todo.id)})
        delBtnElem.innerText = "❌"

        if(todo.isCompleted) {
            todoItemElem.classList.add("checked")
            checkboxElem.innerText = "✅"
        } else {
            checkboxElem.innerText = "⬜"
        }

        todoItemElem.appendChild(checkboxElem)
        todoItemElem.appendChild(todoElem)
        todoItemElem.appendChild(delBtnElem)

        todoListElem.appendChild(todoItemElem)
    })
}

const calcRate = () => {
    const total = todos.length
    const completedTodos = todos.filter(todo => todo.isCompleted === true)
    const completed = completedTodos.length
    const rate = Math.floor(completed*100/total)

    const rateBarElem = document.querySelector(".rate-bar")
    rateBarElem.value = rate

    const ratePerElem = document.querySelector(".rate-per")
    ratePerElem.innerText = `${rate} %`
}

init()
