const alarmForm = document.forms[0];
const editForm = document.forms[1];
const alarmContainer = document.querySelector(".all-alarms");

const modal = document.querySelector(".modal-container");

let alarmArray = [];
let alarmSound = new Audio("http://soundbible.com/grab.php?id=2061&type=mp3");

// create alarm constructor and define its prototype
let Alarm = function (time, label) {
  this.time = time;
  this.label = label;
  this.active = true;
};

Alarm.prototype = {
  constructor: Alarm,
  getTime: function () {
    return this.time;
  },
  getLabel: function () {
    return this.label;
  },
  ring: function (currentTime) {
    if (currentTime === this.getTime() && this.active == true) {
      this.active = false;
      displayModal(this);
      playAlarmSound(alarmSound);
    }
  },
};

// check for alarmArr in localstorage.
if (JSON.parse(localStorage.getItem("alarmArray")) !== null) {
  JSON.parse(localStorage.getItem("alarmArray")).forEach((alarm) => {
    alarmArray.push(new Alarm(alarm.time, alarm.label));
  });
}

updateLocal(alarmArray);
displayAlarms(alarmArray);
hideEdit();

alarmForm.addEventListener("submit", createAlarmObj);

function createAlarmObj(event) {
  event.preventDefault();
  const alarmDataObj = new Alarm(alarmForm.alarm.value, alarmForm.label.value);

  if (alarmDataObj.label === "") {
    alarmDataObj.label = "New alarm";
  }
  alarmForm.reset();
  saveAlarm(alarmDataObj);
}

function saveAlarm(alarm) {
  alarmArray.push(alarm);
  updateLocal(alarmArray);
  appendAlarm(alarm);
}

function updateLocal(alarmArray) {
  localStorage.setItem("alarmArray", JSON.stringify(alarmArray));
}

function displayAlarms(alarmArray) {
  if (alarmArray.length === 0) return;

  alarmArray.forEach((alarm) => appendAlarm(alarm));
}

function appendAlarm(alarm) {
  const alarmSample = document.createElement("div");
  alarmSample.className = "alarm";
  let html = `
    <label for="read_only"> ${processLabel(alarm.label)} </label>
    <input type="time" id="read_only" value=${alarm.time} readonly />
    <div class="actions">
      <i class="fa fa-edit"></i>
      <i class="fa fa-trash"></i>
    </div>`;

  alarmSample.innerHTML = html;
  alarmContainer.appendChild(alarmSample);

  deleteAlarm(alarmArray);
  editAlarm(alarmArray);
  cancel();
}

function deleteAlarm(alarmArray) {
  const deleteBtn = document.querySelectorAll(".fa-trash");
  Array.from(deleteBtn).forEach((btn) => {
    btn.addEventListener("click", () => {
      let alarm = btn.parentElement.parentElement;
      let alarmIndex = Array.from(alarmContainer.children).indexOf(alarm);
      alarmContainer.removeChild(alarm);
      alarmArray.splice(alarmIndex, 1);
      updateLocal(alarmArray);
    });
  });
}

function editAlarm(alarmArray) {
  const editBtn = document.querySelectorAll(".fa-edit");
  Array.from(editBtn).forEach((btn) => {
    btn.addEventListener("click", () => {
      showEdit();
      let alarm = btn.parentElement.parentElement;
      let alarmIndex = [...alarmContainer.children].indexOf(alarm);
      editForm.alarm.value = alarmArray[alarmIndex].time;
      editForm.label.value = alarmArray[alarmIndex].label;

      editForm.addEventListener("submit", () => {
        alarmArray[alarmIndex].time = editForm.alarm.value;
        alarmArray[alarmIndex].label = editForm.label.value;

        if (editForm.label.value === "") {
          alarmArray[alarmIndex].label = "New alarm";
        }
        updateLocal(alarmArray);
      });
    });
  });
}

function cancel() {
  let cancelBtn = document.querySelectorAll("#cancelBtn");
  Array.from(cancelBtn).forEach((btn) => {
    btn.addEventListener("click", () => {
      hideEdit();
      alarmForm.reset();
    });
  });
}

function hideEdit() {
  editForm.style.display = "none";
  alarmForm.style.display = "flex";
}

function showEdit() {
  alarmForm.style.display = "none";
  editForm.style.display = "flex";
}

function processLabel(label) {
  if (label.length > 14) {
    return label.slice(0, 13) + "...";
  }
  return label;
}

function displayModal(alarm) {
  modal.style.display = "block";
  modal.querySelector("input").value = alarm.time;
  modal.querySelector("label").innerText = alarm.label;

  stopAlarmSound(alarmSound, alarm);
}

function getCurrentTime() {
  const currentDate = new Date();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  if (minutes / 10 < 1) {
    minutes = "0" + minutes;
  }
  if (hours / 10 < 1) {
    hours = "0" + hours;
  }
  let currentTime = hours + ":" + minutes;
  console.log(currentTime);
  checkAlarm(alarmArray, currentTime);
}

setInterval(getCurrentTime, 1000);

function checkAlarm(alarmArray, currentTime) {
  alarmArray.forEach((alarm) => {
    console.log(alarm.label);
    alarm.ring(currentTime);
  });
}

function playAlarmSound(alarmSound) {
  alarmSound.play();
  alarmSound.addEventListener(
    "ended",
    function () {
      this.currentTime = 0;
      this.play();
    },
    false
  );
}

function stopAlarmSound(alarmSound) {
  const stopBtn = document.querySelector("#alarm-stop");

  stopBtn.addEventListener("click", () => {
    alarmSound.pause();
    alarmSound.currentTime = 0;
    modal.style.display = "none";
  });
}
