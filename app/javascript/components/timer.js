function getTimeDifference(start, end) {
  let milliseconds = new Date(end) - new Date(start);
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);
  // 70 - 48
  hours = hours - (days * 24);
  minutes = minutes - (days * 24 * 60) - (hours * 60);
  seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);
  // return days + " " + hours + " " + minutes + " " + seconds;
  return {
    rDays: days,
    rHours: hours,
    rMinutes: minutes,
    rSeconds: seconds
  }
}

const timerCustom = () => {
  // if first child has timers at 0, move to bottom and then remove
  let timerMinEl = document.querySelector(".timer__min");
  let timerSecEl = document.querySelector(".timer__sec");
  let firsttimerMinEl = document.querySelector(".timer__min");
  let firsttimerSecEl = document.querySelector(".timer__sec");
  let wholeGrid = document.querySelector(".timelist");
  let timeboxSec = document.querySelector(".timeseconds").dataset.seconds;
  let timeboxMin = document.querySelector(".timeminutes").dataset.minutes;
  if (timerMinEl.textContent == 0 && timerSecEl.textContent == 0) {
    firsttimerMinEl.textContent = timeboxMin;
    firsttimerSecEl.textContent = timeboxSec;
    let firstDiv = document.querySelector(".timelist > .red");
    wholeGrid.insertAdjacentElement('beforeend', firstDiv);
    console.log(firsttimerMinEl.textContent);
    console.log(firsttimerSecEl.textContent);
    console.log(firstDiv);
    console.log(firsttimerSecEl.textContent);
    console.log(timeboxSec);
  };

  // UPDATE TOP TIMER
  let startDate = new Date();
  let milliseconds = parseInt(document.querySelector(".timelist > .red > .card-timebox > .remainder").dataset.timeboxduration)
  if (!document.querySelector(".timelist > .red > .card-timebox > .settimes").dataset.startDate)  {
    document.querySelector(".timelist > .red > .card-timebox > .settimes").dataset.startDate = startDate;
    let endDate = new Date(startDate.getTime() + milliseconds);
    document.querySelector(".timelist > .red > .card-timebox > .settimes").dataset.endDate = endDate;
  }

   endDate = document.querySelector(".timelist > .red > .card-timebox > .settimes").dataset.endDate
  if (new Date(endDate) < new Date(startDate)) {
    document.querySelector(".timelist > .red > .card-timebox > .settimes").dataset.startDate = startDate;
     endDate = new Date(startDate.getTime() + milliseconds);
    document.querySelector(".timelist > .red > .card-timebox > .settimes").dataset.endDate = endDate;
  }

  document.querySelector(".timelist > .red > .card-timebox > .settimes").dataset.startDate = startDate

  let endDate = document.querySelector(".timelist > .red > .card-timebox > .settimes").dataset.endDate;
  // console.log(startDate);
  // console.log(endDate);
  let timeDifferenceObj = getTimeDifference(startDate, endDate);
  timerMinEl.textContent = timeDifferenceObj.rMinutes;
  timerSecEl.textContent = timeDifferenceObj.rSeconds;

  // make the div for the active timebox be highlighted
  const timeboxdiv = document.querySelector(".timelist > .red > .card-timebox");
  timeboxdiv.classList.add("active-timebox")
}

// const resetTimer = function (resetTimer) {
//   const mins = document.querySelector(".timeminutes").dataset.minutes
//   const secs = document.querySelector(".timeseconds").dataset.seconds

//   if (timerMinEl === 0 && timerSecEl === 0) {
//     timerMinEl.textContent = mins;
//     timerSecEl.textContent = secs;
//   }
// }

const taskTimer = () => {
  let startDate = new Date();
  let taskmins = document.querySelector(".taskmins");
  let tasksecs = document.querySelector(".tasksecs");
  let milliseconds = parseInt(document.querySelector(".taskduration").dataset.duration)
  if (!document.querySelector(".tasktimes").dataset.startDate) {
    document.querySelector(".tasktimes").dataset.startDate = startDate;
    let endDate = new Date(startDate.getTime() + milliseconds);
    document.querySelector(".tasktimes").dataset.endDate = endDate;
  };
  let endDate = document.querySelector(".tasktimes").dataset.endDate
  let timeDiff = getTimeDifference(startDate, endDate);
  let timeDiffSec = Math.floor((new Date(endDate) - new Date(startDate)) / 1000);
  console.log(timeDiffSec);
  console.log(timeDiffSec === 0);
  taskmins.textContent = `${timeDiff.rMinutes} mins`;
  tasksecs.textContent = `${timeDiff.rSeconds} secs`;

  // progress bar
  let skillper = document.querySelector(".skill-per");
  let dur = (timeDiff.rMinutes * 60) + timeDiff.rSeconds;
  let tasksec = document.querySelector(".tasksecss").dataset.tasksecs;
  if (skillper) {
    skillper.setAttribute("per", `${parseInt((1 - (dur / tasksec)) * 100)}%`);
    skillper.setAttribute("style", `max-width:${(1 - (dur / tasksec)) * 100}%`);
  } else {
    let newDiv = document.createElement("div");
    newDiv.classList.add("skill-per");
    newDiv.setAttribute("per", `${parseInt((1 - (dur / tasksec)) * 100)}%`);
    newDiv.setAttribute("style", `max-width:${(1 - (dur / tasksec)) * 100}%`);
    const skill = document.querySelector(".skill-bar");
    skill.insertAdjacentElement('beforeend', newDiv);
  };
  //


  const done = document.getElementById('doneTask');
  if (timeDiffSec === 0){
    taskmins.textContent = `0 mins`;
    tasksecs.textContent = `0 secs`;
    skillper.setAttribute("per", `100%`);
    skillper.setAttribute("style", `max-width:100%`);
  };

  if (timeDiffSec < 0) {
    taskmins.textContent = `0 mins`;
    tasksecs.textContent = `0 secs`;
    skillper.setAttribute("per", `100%`);
    skillper.setAttribute("style", `max-width:100%`);
  };
  // return timeDiff;
  // console.log(timeDiff);
  // console.log(timeDiff === 0);
}

export { timerCustom, taskTimer };
