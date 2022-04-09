const $toDoForm = document.querySelector(".todo-form")

const ToDoListItem =(inputValue) =>{
    const $liElem = document.createElement("li")

    const $delBtn = document.createElement("button")
    const $checkBox = document.createElement("input")
    const $text = document.createElement("div")

    $delBtn.classList.add('todo-delete')
    $delBtn.textContent = "X"
    $delBtn.addEventListener("click", deleteListItem)

    $checkBox.classList.add("todo-checkbox")
    $checkBox.setAttribute('type', 'checkbox')
    $checkBox.addEventListener("click", completeListItem)

    $text.classList.add("todo-text")
    $text.textContent = inputValue
    $text.addEventListener("dblclick", editListItem)

    $liElem.classList.add("todo-item")
    $liElem.appendChild($checkBox)
    $liElem.appendChild($text)
    $liElem.appendChild($delBtn)

    return $liElem
}

const addListItem = (inputValue) => {
    const $ulElem = document.querySelector(".todo-list")
    const $liElem = ToDoListItem(inputValue)
    $ulElem.appendChild($liElem)
}

const deleteListItem = (e) => {
    const $liElem = e.target.parentNode
    $liElem.remove()
    calcProgress()
}

const completeListItem = (e) => {
    e.target.parentNode.classList.toggle("completed")
    calcProgress()
}

const editListItem = (e) => {
    const $liElem = e.target.parentNode
    const inputValue = e.target.textContent
    e.target.remove()

    const $inputElem = document.createElement("input")
    $inputElem.addEventListener("keydown", (e) => {
        if(e.key === 'Enter') {
            const $text = document.createElement("div")
            $text.classList.add("todo-text")
            $text.textContent = $inputElem.value
            $text.addEventListener("dblclick", editListItem)
            $liElem.insertBefore($text, $liElem.lastChild)
            e.target.remove()
        }
    })
    $inputElem.value = inputValue
    $liElem.insertBefore($inputElem, $liElem.lastChild)
}

const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target["todo-input"].value
    addListItem(inputValue)
    e.target["todo-input"].value = ""
    calcProgress()
}

const init = () => {
    $toDoForm.addEventListener("submit", handleSubmit)
}

const calcProgress = () => {
    const $ulElem = document.querySelector(".todo-list")
    const total = $ulElem.children.length || 1
    const completed = $ulElem.getElementsByClassName("completed").length
    
    const rate = Math.round(completed / total * 100)

    document.querySelector(".progress-bar").value = rate
    document.querySelector(".progress-rate").textContent = `${rate} %`
}

init()