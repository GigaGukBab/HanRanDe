const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input"); // <- same as document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement; // <- 화면에서 어떤 HTML의 element를 지워여 하는가
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

// > create a new html element and append
function paintToDo(newTodo) {
  const newToDoList = document.createElement("li");
  newToDoList.id = newTodo.id;
  const newSpan = document.createElement("span");
  newSpan.innerText = newTodo.text;
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteToDo);
  newToDoList.appendChild(newSpan);
  newToDoList.appendChild(button);
  toDoList.appendChild(newToDoList);
}

// > 사용자가 적어둔 text를 object tpye으로 id와 함께 array에 push
function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach((element) => {
    paintToDo(element);
  });
}
