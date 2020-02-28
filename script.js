// Set constants
const questionCard = document.getElementById('questionCard')
const questionNumber = document.getElementById('questionNumber')
const questionContent = document.getElementById('questionContent')
const answer1 = document.getElementById('answer1')
const answer2 = document.getElementById('answer2')
const answer3 = document.getElementById('answer3')
const answer4 = document.getElementById('answer4')
const feedback = document.getElementById('feedback')
const startBtn = document.getElementById('start')
const timerEl = document.getElementById('timer')
const timerLabel = document.getElementById('timerLabel')
const introCard = document.getElementById('introCard')
const outroCard = document.getElementById('outroCard')
const score = document.getElementById('score')
const submitBtn = document.getElementById('submitBtn')
const gameOver = document.getElementById('gameOver')
const resetBtn = document.getElementById('tryAgain')
const highscores = document.getElementById('highscores')

// Set global variables
let questions = [
  {
    content: "This is question number 1, it'll have a really interesting question that you have to answer.",
    answer1: "totally wrong",
    answer2: "correct",
    answer3: "nah",
    answer4: "almost"
  },
  {
    content: "This is question number 2, it'll be different than question 1 but you pretty much do the same thing and answer it to the best of your ability.",
    answer1: "good try",
    answer2: "you suck",
    answer3: "not even close",
    answer4: "correct"
    
  },
  {
    content: "This is question 3",
    answer1: "good try",
    answer2: "you suck",
    answer3: "not even close",
    answer4: "correct"
    
  },
  {
    content: "This is question 4",
    answer1: "good try",
    answer2: "you suck",
    answer3: "not even close",
    answer4: "correct"
    
  },
  {
    content: "This is question 5",
    answer1: "good try",
    answer2: "you suck",
    answer3: "not even close",
    answer4: "correct"
    
  },
  {
    content: "This is question 6",
    answer1: "good try",
    answer2: "you suck",
    answer3: "not even close",
    answer4: "correct"
    
  },
  {
    content: "This is question 7",
    answer1: "good try",
    answer2: "you suck",
    answer3: "not even close",
    answer4: "correct"
    
  },
  {
    content: "This is question 8",
    answer1: "good try",
    answer2: "you suck",
    answer3: "not even close",
    answer4: "correct"
    
  },
  {
    content: "This is question 9",
    answer1: "good try",
    answer2: "you suck",
    answer3: "not even close",
    answer4: "correct"
    
  },
  {
    content: "This is question 10",
    answer1: "good try",
    answer2: "you suck",
    answer3: "not even close",
    answer4: "correct"
    
  },
]
let question = ''
let questionIndex = 1
let totalTime = 2 * 60 * 1000
let penaltyTime = 15 * 1000
let tickTime = 1000
let finalScore = ''

// Questions
function askQuestion() {
  // Display question card
  feedback.style.display = "none"
  questionCard.style.display = "inline"
  // Set question number and get random question from questions array
  question = questions[Math.floor(Math.random() * questions.length)]
  // Insert in HTML
  questionNumber.innerHTML = `Question ${questionIndex}`
  questionContent.innerHTML = `${question.content}`
  answer1.innerHTML = `${question.answer1}`
  answer2.innerHTML = `${question.answer2}`
  answer3.innerHTML = `${question.answer3}`
  answer4.innerHTML = `${question.answer4}`
}

// Answers
function answerQuestion(e) {
  if(e.target.innerHTML !== "correct") {
    totalTime -= penaltyTime
  } 
  questions.splice(question, 1)
  questionIndex++
  if(questions.length > 0) {
    askQuestion()
  } else {
    stopQuiz()
  }
}

// Timer
function timer() {
  // Start timer
  let interval = setInterval(tick, tickTime)
  // Format to display readable time 
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
  // Decrement timer by 1 second each tick
  function tick() {
    totalTime -= tickTime
    formatTime(totalTime)
    if(totalTime < 1 && questions.length > 0) {
      clearInterval(interval)
      timerEl.innerHTML = '0:00'
      timerEl.style.color = "red"
      stopQuiz()
    } else if(questions.length < 1) {
      clearInterval(interval)
      timerEl.style.color = "green"
      stopQuiz()
    }
  }
}

// Start/Stop/Reset Quiz
function startQuiz() {
  timer()
  introCard.style.display = "none"
  askQuestion()  
}
function stopQuiz() {
  calcScore()
  questionCard.style.display = "none"
  if(totalTime < 1) {
    gameOver.style.display = "block"
  } else {
    score.innerHTML = `Final score: ${finalScore}`
    outroCard.style.display = "block"
  }
}
function resetQuiz() {

}

// Scores
function calcScore() {
  let finalTime = timerEl.innerHTML
  let finalMinute = parseInt(finalTime.charAt(0))
  let finalSecond1 = parseInt(finalTime.charAt(2))
  let finalSecond2 = parseInt(finalTime.charAt(3))
  finalScore = (finalMinute * 60) + finalSecond1 + finalSecond2
}
function showHighscores() {
  scoreboard.style.display = "block"
}

// Buttons
startBtn.addEventListener('click', startQuiz)
answer1.addEventListener('click', answerQuestion)
answer2.addEventListener('click', answerQuestion)
answer3.addEventListener('click', answerQuestion)
answer4.addEventListener('click', answerQuestion)
// submitBtn.addEventListener('click', submitScore)
// resetBtn.addEventListener('click', resetQuiz)
highscores.addEventListener('click', showHighscores)


