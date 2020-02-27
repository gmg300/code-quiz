
// Questions
// Set hooks and variables
const questionCard = document.getElementById('questionCard')
const questionNumber = document.getElementById('questionNumber')
const questionContent = document.getElementById('questionContent')
const answer1 = document.getElementById('answer1')
const answer2 = document.getElementById('answer2')
const answer3 = document.getElementById('answer3')
const answer4 = document.getElementById('answer4')
const feedback = document.getElementById('feedback')
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
    
  }
]
let question = ''
let questionIndex = 1

function askQuestion() {
  // Display question card
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
    e.target.style.backgroundColor = "red"
  } else {
    e.target.style.backgroundColor = "green"
  }
  questions.splice(question, 1)
  questionIndex++
  if(questions.length > 0) {
    askQuestion()
  } else {
    endQuiz()
  }
}

// Timer
// Set hooks and variables
const startBtn = document.getElementById('start')
const timerEl = document.getElementById('timer')
const timerLabel = document.getElementById('timerLabel')
const introCard = document.getElementById('introCard')
let totalTime = 2 * 60 * 1000
let penaltyTime = 15 * 1000
let tickTime = 1000

function timer() {
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
  }
  // Start timer
  setInterval(tick, tickTime)
}

// Start Quiz
function playQuiz() {
  timer()
  introCard.style.display = "none"
  if(questions.length === 0) {
    endQuiz()
  } else {
    askQuestion()
  }
}

// End Quiz
function endQuiz() {
  questionCard.style.display = "none"
}

// Buttons
startBtn.addEventListener('click', playQuiz)
answer1.addEventListener('click', answerQuestion)
answer2.addEventListener('click', answerQuestion)
answer3.addEventListener('click', answerQuestion)
answer4.addEventListener('click', answerQuestion)

