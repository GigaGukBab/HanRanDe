const clock_time = document.getElementsByClassName('clock_time')[0];

// > 현재 시간을 가져와서 화면에 표시하고 <time> 태그의 datetime 속성을 업데이트하는 함수
function getClock() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  clock_time.innerText = `${hours}:${minutes}:${seconds}`;
  clock_time.setAttribute('datetime', date.toISOString());
}
getClock(); // <- by calling getClock() initialy, we can see time immediately
setInterval(getClock, 1000);
