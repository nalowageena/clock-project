let startBtn = document.querySelector("#start");
let stopBtn = document.querySelector("#stop");
let resetBtn = document.querySelector("#reset");

let tickSound = new Audio("http://soundbible.com/grab.php?id=2044&type=mp3");

let time = document.querySelector(".time");
let secondDisplay = document.querySelector(".second");
let minuteDisplay = document.querySelector(".minute");
let hourDisplay = document.querySelector(".hour");

startBtn.addEventListener("click", startWatch);
stopBtn.addEventListener("click", stopWatch);
resetBtn.addEventListener("click", resetWatch);

let second = parseInt(secondDisplay.innerText);
let minute = parseInt(minuteDisplay.innerText);
let hour = parseInt(hourDisplay.innerText);

let intervalId;

function startWatch() {
  if (intervalId) {
    clearInterval(intervalId);
  }
  intervalId = setInterval(updateTime, 1000);
}

function stopWatch() {
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
  second++;

  if (second / 60 === 1) {
    second = 0;
    minute++;
  }

  if (minute / 60 === 1) {
    minute = 0;
    hour++;
  }
  playSound(tickSound)
  displayTime();
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
