const alarmForm = document.forms[0];

let alarmArray;

// check for alarmArr in localstorage.
JSON.parse(localStorage.getItem("alarmArray")) !== null
  ? (alarmArray = JSON.parse(localStorage.getItem("alarmArray")))
  : (alarmArray = []);

updateLocal(alarmArray);

alarmForm.addEventListener("submit", createAlarmObj);

function createAlarmObj(event) {
  event.preventDefault();
  const alarmDataObj = new Alarm();
  alarmDataObj.time = alarmForm.alarm.value;
  alarmDataObj.label = alarmForm.label.value;
  saveAlarm(alarmDataObj);
}

function saveAlarm(alarm) {
  alarmArray.push(alarm);
  updateLocal(alarmArray);
  displayAlarm(alarmArray)
}

function updateLocal(alarmArray) {
  localStorage.setItem("alarmArray", JSON.stringify(alarmArray));
}

function displayAlarm(alarmArray) {
  if (alarmArray.length === 0) return;

  appendAlarm(alarmArray);
}

function appendAlarm(alarmArray) {
  alarmArray.forEach((alarm) => {
    const alarmSample = document.createElement("div");
    alarmSample.className = "alarm";
    let html = `<div>
    <label for="read_only"> Alarm 1 </label>
    <input type="time" id="read_only" value="13:45" readonly />
  </div>
  <div class="actions">
    <i class="fa fa-edit"></i>
    <i class="fa fa-trash"></i>
</div>`;

    alarmSample.innerHTML = html;
    const alarmContainer = document.querySelector(".all-alarms");

    alarmContainer.appendChild(alarmSample);
  });
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
