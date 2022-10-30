let timerForm = document.forms[0];
let startBtn = document.querySelector("#start");
let stopBtn = document.querySelector("#stop");
let resetBtn = document.querySelector("#reset");
const modal = document.querySelector(".modal-container");

let tickSound = new Audio("http://soundbible.com/grab.php?id=2044&type=mp3");

let time = document.querySelector(".time");
let secondDisplay = document.querySelector(".second");
let minuteDisplay = document.querySelector(".minute");
let hourDisplay = document.querySelector(".hour");

startBtn.addEventListener("click", startWatch);
stopBtn.addEventListener("click", stopWatch);
resetBtn.addEventListener("click", resetWatch);

let intervalId;
let second;
let minute;
let hour;

function startWatch(event) {
  event.preventDefault();
  if (intervalId) {
    clearInterval(intervalId);
  }
  second = timerForm.second.value;
  minute = timerForm.minute.value;
  hour = timerForm.hour.value;
  displayTime();
  intervalId = setInterval(updateTime, 1000);
}

function stopWatch() {
  console.log("here");
  clearInterval(intervalId);
  stopSound(tickSound);
}

function resetWatch() {
  clearInterval(intervalId);
  second = 0;
  minute = 0;
  hour = 0;
  displayTime();
  stopSound(tickSound);
}

function updateTime() {
  if (second > 0) {
    second--;
  }

  if (minute > 0 && second === 0) {
    second = 59;
    minute--;
  }

  if (hour > 0 && minute === 0) {
    minute = 59;
    hour--;
  }
  playSound(tickSound);
  displayTime();

  if (second == 0 && minute == 0 && hour == 0) {
    stopWatch();
    displayModal();
  }
}

function displayTime() {
  secondDisplay.innerText = format(second);
  minuteDisplay.innerText = format(minute);
  hourDisplay.innerText = format(hour);
}

function format(num) {
  if (num < 10) {
    num = "0" + num;
  }
  return num;
}

function playSound(tickSound) {
  tickSound.play();
}

function stopSound(tickSound) {
  tickSound.pause();
}

function displayModal() {
  modal.style.display = "block";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
