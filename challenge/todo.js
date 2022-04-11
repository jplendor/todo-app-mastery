const $toDoForm = document.querySelector('.todo-form');

const ToDoListItem = (inputValue) => {
  const $liElem = document.createElement('li');

  const $delBtn = document.createElement('button');
  const $checkBox = document.createElement('input');
  const $text = document.createElement('div');

  $delBtn.classList.add('todo-delete');
  $delBtn.textContent = 'X';
  $delBtn.addEventListener('click', deleteListItem);

  $checkBox.classList.add('todo-checkbox');
  $checkBox.setAttribute('type', 'checkbox');
  $checkBox.addEventListener('click', completeListItem);

  $text.classList.add('todo-text');
  $text.textContent = inputValue;
  $text.addEventListener('dblclick', editListItem);

  $liElem.classList.add('todo-item');
  $liElem.appendChild($checkBox);
  $liElem.appendChild($text);
  $liElem.appendChild($delBtn);

  return $liElem;
};

const addListItem = (inputValue) => {
  const $ulElem = document.querySelector('.todo-list');
  const $liElem = ToDoListItem(inputValue);
  $ulElem.appendChild($liElem);
};

const deleteListItem = (e) => {
  console.log('딜리트');
  const $liElem = e.target.parentNode;
  const $ulElem = document.querySelector('.todo-list');
  $ulElem.remove($liElem);
  calcProgress();
};

const completeListItem = (e) => {
  e.target.parentNode.classList.toggle('completed');
  calcProgress();
};

const editListItem = (e) => {
  // console.log(e.target, e.target.parentNode);
  const $inputElem = document.createElement('input');
  const $liElem = e.target.parentNode;
  const $textElem = document.querySelector('.todo-text');
  $liElem.remove($textElem);
  // e.stopPropagation();

  // 체크 인풋 삭제
  // $liElem.insertBefore($inputElem, $liElem.lastChild);
};

const handleSubmit = (e) => {
  e.preventDefault();
  const inputValue = e.target['todo-input'].value;
  addListItem(inputValue);
  e.target['todo-input'].value = '';
  calcProgress();
};

const init = () => {
  $toDoForm.addEventListener('submit', handleSubmit);
};

const calcProgress = () => {
  const $ulElem = document.querySelector('.todo-list');
  const total = $ulElem.children.length || 1;
  const completed = $ulElem.getElementsByClassName('completed').length;

  const rate = Math.round((completed / total) * 100);

  document.querySelector('.progress-bar').value = rate;
  document.querySelector('.progress-rate').textContent = `${rate} %`;
};

init();
