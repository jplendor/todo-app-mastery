var $toDoForm = document.querySelector(".todo-form");
var ToDoListItem = function (inputValue) {
    var $liElem = document.createElement("li");
    var $delBtn = document.createElement("button");
    var $checkBox = document.createElement("input");
    var $text = document.createElement("div");
    $delBtn.classList.add('todo-delete');
    $delBtn.textContent = "X";
    $delBtn.addEventListener("click", deleteListItem);
    $checkBox.classList.add("todo-checkbox");
    $checkBox.setAttribute('type', 'checkbox');
    $checkBox.addEventListener("click", completeListItem);
    $text.classList.add("todo-text");
    $text.textContent = inputValue;
    $text.addEventListener("dblclick", editListItem);
    $liElem.classList.add("todo-item");
    $liElem.appendChild($checkBox);
    $liElem.appendChild($text);
    $liElem.appendChild($delBtn);
    return $liElem;
};
var addListItem = function (inputValue) {
    var $ulElem = document.querySelector(".todo-list");
    var $liElem = ToDoListItem(inputValue);
    if ($ulElem instanceof HTMLUListElement) {
        $ulElem.appendChild($liElem);
    }
};
var deleteListItem = function (e) {
    var $liElem = e.target.parentNode;
    $liElem.remove();
    calcProgress();
};
var completeListItem = function (e) {
    e.target.parentNode.classList.toggle("completed");
    calcProgress();
};
var editListItem = function (e) {
    var $liElem = e.target.parentNode;
    var inputValue = e.target.textContent;
    e.target.remove();
    var $inputElem = document.createElement("input");
    $inputElem.addEventListener("keydown", function (e) {
        if (e.key === 'Enter') {
            var $text = document.createElement("div");
            $text.classList.add("todo-text");
            $text.textContent = $inputElem.value;
            $text.addEventListener("dblclick", editListItem);
            $liElem.insertBefore($text, $liElem.lastChild);
            e.target.remove();
        }
    });
    $inputElem.value = inputValue;
    $liElem.insertBefore($inputElem, $liElem.lastChild);
};
var handleSubmit = function (e) {
    e.preventDefault();
    var inputValue = e.target["todo-input"].value;
    addListItem(inputValue);
    e.target["todo-input"].value = "";
    calcProgress();
};
var init = function () {
    if ($toDoForm instanceof Element) {
        $toDoForm.addEventListener("submit", handleSubmit);
    }
};
var calcProgress = function () {
    var $ulElem = document.querySelector(".todo-list");
    if ($ulElem instanceof HTMLUListElement) {
        var total = $ulElem.children.length || 1;
        var completed = $ulElem.getElementsByClassName("completed").length;
        var rate = Math.round(completed / total * 100);
        var $progressBar = document.querySelector(".progress-bar");
        if ($progressBar instanceof HTMLProgressElement) {
            $progressBar.value = rate;
        }
        var $progressRate = document.querySelector(".progress-rate");
        if ($progressRate instanceof HTMLSpanElement) {
            $progressRate.textContent = "".concat(rate, " %");
        }
    }
};
init();
