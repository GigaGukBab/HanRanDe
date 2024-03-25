const loginForm = document.querySelector('#login-form');
const loginInput = document.querySelector('#login-form input');

const greetingsContainer = document.querySelector('#greetingsContainer');
const greetingTitle = document.querySelector('#greetingTitle');
const greetingSubTitle = document.querySelector('#greetingSubTitle');

const HIDDEN_CLASSNAME = 'hidden';
const USERNAME_KEY = 'username';

function onLoginSubmit(event) {
  event.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  showGreetings(username);
}

function showGreetings(username) {
  greetingTitle.innerText = `안녕하세요 ${username}님 !`;
  greetingSubTitle.innerHTML = `<span class="Source">Source</span><span class="hub">Space</span>에 방문해주셔서 감사합니다🚀`;
  greetingsContainer.classList.remove(HIDDEN_CLASSNAME);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener('submit', onLoginSubmit);
} else {
  showGreetings(savedUsername);
}
