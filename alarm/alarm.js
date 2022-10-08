const alarmForm = document.forms[0];
const editForm = document.forms[1];
const alarmContainer = document.querySelector(".all-alarms");

let alarmArray;

// check for alarmArr in localstorage.
JSON.parse(localStorage.getItem("alarmArray")) !== null
  ? (alarmArray = JSON.parse(localStorage.getItem("alarmArray")))
  : (alarmArray = []);

updateLocal(alarmArray);
displayAlarms(alarmArray);
hideEdit();

alarmForm.addEventListener("submit", createAlarmObj);

function createAlarmObj(event) {
  event.preventDefault();
  const alarmDataObj = new Alarm();
  alarmDataObj.time = alarmForm.alarm.value;
  alarmDataObj.label = alarmForm.label.value;

  if (alarmDataObj.label == '') {
    alarmDataObj.label = 'New alarm'
  }
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
  let html = `<div>
    <label for="read_only"> ${alarm.label} </label>
    <input type="time" id="read_only" value=${alarm.time} readonly />
  </div>
  <div class="actions">
    <i class="fa fa-edit"></i>
    <i class="fa fa-trash"></i>
</div>`;

  alarmSample.innerHTML = html;
  alarmContainer.appendChild(alarmSample);

  deleteAlarm(alarmArray);
  editAlarm(alarmArray);
}

function deleteAlarm(alarmArray) {
  const deleteBtn = document.querySelectorAll(".fa-trash");
  Array.from(deleteBtn).forEach((btn) => {
    btn.addEventListener("click", () => {
      let alarm = btn.parentElement.parentElement;
      let alarmIndex = [...alarmContainer.children].indexOf(alarm);
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

      editForm.addEventListener("submit", ()=>{
        alarmArray[alarmIndex].time = editForm.alarm.value;
        alarmArray[alarmIndex].label = editForm.label.value;
        updateLocal(alarmArray);
      });      
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

let Alarm = function (time, label) {
  this.time = time;
  this.label = label;
};

Alarm.prototype = {
  constructor: Alarm,
  getTime: function () {
    return question;
  },
  getLabel: function () {
    return this.answer;
  },
};
