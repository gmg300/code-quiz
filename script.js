let totalTime = 5 * 60 * 1000;
let penaltyTime = 30 * 1000;
let tickTime = 1000;

function formatTime(ms) {
  let minutes = Math.floor(ms / 60000);
  let seconds = ms % 60000;
  seconds /= 1000;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  let timerEl = document.getElementById("timer");
  timerEl.textContent = `${minutes}:${seconds}`;
}

function tick() {
  totalTime -= tickTime;
  formatTime(totalTime);
}

let myInterval = setInterval(tick, tickTime);

let wrongEl = document.getElementById("wrong");

wrongEl.addEventListener("click", function() {
  totalTime -= penaltyTime;
  formatTime(totalTime);
});
