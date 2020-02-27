
// Timer
const startBtn = document.getElementById('start')
const timerEl = document.getElementById('timer')
const timerLabel = document.getElementById('timerLabel')

function timer() {
  let totalTime = 5 * 60 * 1000
  let penaltyTime = 30 * 1000
  let tickTime = 1000

  function formatTime(ms) {
    let minutes = Math.floor(ms / 60000)
    let seconds = ms % 60000
    seconds /= 1000
    if (seconds < 10) {
      seconds = "0" + seconds
    }
    timerLabel.innerHTML = "Time:"
    timerEl.innerHTML = `${minutes}:${seconds}`
  }
  function tick() {
    totalTime -= tickTime
    formatTime(totalTime)
  }
  setInterval(tick, tickTime)
}

startBtn.addEventListener('click', timer)
