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
  const alarmDataObj = new Alarm(alarmForm.alarm.value, alarmForm.label.value);

  if (alarmDataObj.label === '') {
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
  cancel()
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

      editForm.addEventListener("submit", ()=>{
        alarmArray[alarmIndex].time = editForm.alarm.value;
        alarmArray[alarmIndex].label = editForm.label.value;
        updateLocal(alarmArray);
      });      
    });
  });
}

function cancel() {
  let cancelBtn = document.querySelectorAll('#cancelBtn')
  Array.from(cancelBtn).forEach(btn => {
    btn.addEventListener('click', ()=>{
      hideEdit();
      alarmForm.alarm.value = '00:00';
      alarmForm.label.value = '';
    })
  })
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
  if (label.length>14) {
    return label.slice(0,13) + '...'
  }
  return label
}


let Alarm = function (time, label) {
  this.time = time;
  this.label = label;
};

Alarm.prototype = {
  constructor: Alarm,
  getTime: function () {
    return time;
  },
  getLabel: function () {
    return this.label;
  },
};
