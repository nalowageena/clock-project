function startStopWatch() {
    
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