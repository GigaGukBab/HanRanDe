const toDoForm = document.getElementById("todo-form"); // <- TODO list form을 DOM에서 가져옴
const toDoInput = toDoForm.querySelector("input"); // <- TODO 입력 필드를 DOM에서 가져옴 (할 일 폼 내의 첫 번째 input 요소)
const toDoList = document.getElementById("todo-list"); // <- TODO list 목록을 DOM에서 가져옴

const TODOS_KEY = "todos"; // <- 로컬 스토리지에 사용할 키의 이름을 설정

let toDos = []; // <- TODO list 목록을 저장할 빈 배열을 초기화

// > TODO list 목록을 로컬 스토리지에 저장하는 함수
function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

// > TODO lsit를 삭제하는 함수
function deleteToDo(event) {
  const li = event.target.parentElement; // <- 이벤트가 발생한 요소의 부모 요소(삭제할 li 요소)를 가져옴
  li.remove(); // <- 해당 li 요소를 DOM에서 제거
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id)); // <- 해당 li 요소와 일치하지 않는 할 일만 필터링하여 toDos 배열을 업데이트
  saveToDos(); // <- 변경된 TODO list 목록을 로컬 스토리지에 다시 저장
}

// > 새로운 TODO list를 화면에 표시하는 함수
function paintToDo(newTodo) {
  const newToDoList = document.createElement("li"); // <- 새 li 요소 생성
  newToDoList.id = newTodo.id; // <- TODO list의 고유 ID를 li 요소의 id로 설정
  const newSpan = document.createElement("span"); // <- TODO list 내용을 표시할 span 요소 생성
  newSpan.innerText = newTodo.text; // <- span 요소에 할 일 내용 설정
  const button = document.createElement("button"); // <- 삭제 버튼을 위한 button 요소 생성
  button.innerText = "❌"; // <- 버튼 텍스트 설정
  button.addEventListener("click", deleteToDo); // <- 버튼에 클릭 이벤트 리스너 추가
  newToDoList.appendChild(newSpan); // <- span 요소를 li 요소에 추가
  newToDoList.appendChild(button); // <- button 요소를 li 요소에 추가
  toDoList.appendChild(newToDoList); // <- 완성된 li 요소를 할 일 목록에 추가
}

// > 할 일 제출 이벤트를 처리하는 함수
function handleToDoSubmit(event) {
  event.preventDefault(); // <- 기본 제출 이벤트 방지
  const newTodo = toDoInput.value; // <- 입력 필드에서 값 가져오기
  toDoInput.value = ""; // <- 입력 필드 초기화
  const newTodoObj = {
    text: newTodo,
    id: Date.now(), // <- 현재 시간을 ID로 사용
  };
  toDos.push(newTodoObj); // <- 새 TODO list 객체를 toDos 배열에 추가
  paintToDo(newTodoObj); // <- TODO list 일 화면에 표시
  saveToDos(); // <- 변경된 TODO list 목록을 로컬 스토리지에 저장
}

// <- TODO list form에 submit 이벤트 리스너 추가
toDoForm.addEventListener("submit", handleToDoSubmit);

// > 로컬 스토리지에서 저장된 할 일 목록 가져오기
const savedToDos = localStorage.getItem(TODOS_KEY);

// 저장된 할 일 목록이 있으면 화면에 표시
if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos); // <- JSON 문자열을 배열로 변환
  toDos = parsedToDos; // <- toDos 배열을 로컬 스토리지 데이터로 업데이트
  parsedToDos.forEach((element) => {
    paintToDo(element); // <- 각 TODO list를 화면에 표시
  });
}
