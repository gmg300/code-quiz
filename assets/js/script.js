// DOM selection
// Nav elements
var viewHighscoresBtn = document.getElementById("view-highscores");
var timerCardEl = document.getElementById("timer-card");
var timerMinutesEl = document.getElementById("timer-minutes");
var timerSecondsEl = document.getElementById("timer-seconds");
// Introduction Card elements
var introCardEl = document.getElementById("intro-card");
var startQuizBtn = document.getElementById("start-quiz");
// Question Card elements
var questionCardEl = document.getElementById("question-card");
var questionNumberEl = document.getElementById("question-number");
var questionContentEl = document.getElementById("question-content");
var answerListEl = document.getElementById("answer-list");
var feedbackWrongEl = document.getElementById("feedback-wrong");
var feedbackCorrectEl = document.getElementById("feedback-correct");
// Success Card elements
var successCardEl = document.getElementById("success-card");
var showScoreEl = document.getElementById("show-score");
var scoreForm = document.getElementById("score-form");
var userInput = document.getElementById("user-input");
var submitFormBtn = document.getElementById("submit");
var succResetBtn = document.getElementById("success-reset-quiz");
// Fail Card elements
var failCardEl = document.getElementById("fail-card");
var failResetBtn = document.getElementById("fail-reset-quiz");
// Highscores Card elements
var highscoresCardEl = document.getElementById("highscores-card");
var highscoreListEl = document.getElementById("highscore-list");
// Reset elements


// Global variables
// Timer variables
var totalSeconds = 0;
var secondsElapsed = 0;
var penaltyTime = 15;
var interval;
// Question variables
var questions = [
  {
    content: "The temple of Preah Vihear is located in which country?",
    wrong1: "India",
    correct: "Cambodia",
    wrong2: "Indonesia",
    wrong3: "Mongolia"
  },
  {
    content: "Minsk is the capital of which country?",
    wrong1: "Estonia",
    wrong2: "Romania",
    wrong3: "Hungary",
    correct: "Belarus"
  },
  {
    content:
      "The city, once known as Edo and now one of the largest cities in the world is in which country?",
    correct: "Japan",
    wrong1: "India",
    wrong2: "Brazil",
    wrong3: "Mexico"
  },
  {
    content: "The temple of Prambanan is located in which country?",
    wrong1: "Malaysia",
    wrong2: "Thailand",
    wrong3: "India",
    correct: "Indonesia"
  },
  {
    content: "Dodoma is the capital of which country?",
    wrong1: "Morroco",
    correct: "Tanzania",
    wrong2: "Sudan",
    wrong3: "Bolivia"
  },
  {
    content: "Xochicalco is located in which country?",
    wrong1: "Peru",
    correct: "Mexico",
    wrong2: "Chile",
    wrong3: "Costa Rica"
  },
  {
    content: "The city of Allepo is in which country?",
    wrong1: "Iran",
    wrong2: "Spain",
    wrong3: "Angola",
    correct: "Syria"
  },
  {
    content: "Karachi is in what country?",
    correct: "Pakistan",
    wrong1: "Iran",
    wrong2: "India",
    wrong3: "Nepal"
  },
  {
    content: "The ancient city of Carthage is in which country?",
    correct: "Tunisia",
    wrong1: "Greece",
    wrong2: "Italy",
    wrong3: "Turkey"
  },
  {
    content: "Lagos is in what country?",
    wrong1: "Panama",
    wrong2: "Peru",
    correct: "Nigeria",
    wrong3: "Mexico"
  }
];
var randomQuestionNumber = "";
var question = "";
var questionIndex = 1;
// Post Quiz Events variables
var highscores = [];
var userScore = '';
// var highscore = '';

// Timer
function getFormattedMinutes() {
  var secondsLeft = totalSeconds - secondsElapsed;
  var minutesLeft = Math.floor(secondsLeft / 60);
  var formattedMinutes = minutesLeft;
  return formattedMinutes;
}

function getFormattedSeconds() {
  var secondsLeft = (totalSeconds - secondsElapsed) % 60;
  var formattedSeconds;
  if (secondsLeft < 10) {
    formattedSeconds = "0" + secondsLeft;
  } else {
    formattedSeconds = secondsLeft;
  }
  return formattedSeconds;
}

function setTime() {
  totalSeconds = 2 * 60;
}

function renderTime() {
  timerMinutesEl.innerHTML = getFormattedMinutes();
  timerSecondsEl.innerHTML = getFormattedSeconds();
  timerMinutesEl.style.color = "#805ad5";
  timerSecondsEl.style.color = "#805ad5";

}

function startTimer() {
  setTime();
  interval = setInterval(function() {
    secondsElapsed++;
    renderTime();
    if (secondsElapsed >= totalSeconds) {
      stopTimer();
      stopQuiz();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
  if (secondsElapsed >= totalSeconds) {
    timerMinutesEl.style.color = "red";
    timerSecondsEl.style.color = "red";
    timerMinutesEl.innerHTML = "0";
    timerSecondsEl.innerHTML = "00";
  } else {
    renderTime();
  }
}

// Questions
function askQuestion() {
  // Set question number and get random question from questions array
  randomQuestionNumber = Math.floor(Math.random() * questions.length);
  question = questions[randomQuestionNumber];
  // Insert in HTML
  questionNumberEl.innerHTML = "Question " + questionIndex;
  questionContentEl.innerHTML = question.content;
  clearAnswerList();
  for (i = 1; i < 5; i++) {
    // Find each answer in the selected question and create a li
    var answer = Object.values(question);
    var li = document.createElement("li");
    li.innerHTML = answer[i];
    li.classList.add("bg-purple-800");
    answerListEl.appendChild(li);
  }
}

function answerQuestion(event) {
  var correct = question.correct;
  var element = event.target;
  if (event.target.innerHTML !== correct) {
    secondsElapsed += penaltyTime;
    feedbackWrongEl.style.display = "block";
    setTimeout(function() {
      feedbackWrongEl.style.display = "none";
    }, 1000);
  } else {
    feedbackCorrectEl.style.display = "block";
    setTimeout(function() {
      feedbackCorrectEl.style.display = "none";
    }, 1000);
  }
  questions.splice(randomQuestionNumber, 1);
  questionIndex++;
  if (questions.length > 0) {
    askQuestion();
  } else {
    stopTimer()
    stopQuiz();
  }
}

function clearAnswerList() {
  while (answerListEl.firstChild) {
    answerListEl.firstChild.remove();
  }
}

// Post Quiz Events
function stopQuiz() {
  if (secondsElapsed >= totalSeconds) {
    questionCardEl.style.display = "none";
    failCardEl.style.display = "flex";
  } else {
    questionCardEl.style.display = "none";
    successCardEl.style.display = "flex";
    calcScore();
  }
}

function resetQuiz() {
  totalSeconds = 0;
  secondsElapsed = 0;
  setTime()
  renderTime()
  questions = [
    {
      content: "The temple of Preah Vihear is located in which country?",
      wrong1: "India",
      correct: "Cambodia",
      wrong2: "Indonesia",
      wrong3: "Mongolia"
    },
    {
      content: "Minsk is the capital of which country?",
      wrong1: "Estonia",
      wrong2: "Romania",
      wrong3: "Hungary",
      correct: "Belarus"
    },
    {
      content:
        "The city, once known as Edo and now one of the largest cities in the world is in which country?",
      correct: "Japan",
      wrong1: "India",
      wrong2: "Brazil",
      wrong3: "Mexico"
    },
    {
      content: "The temple of Prambanan is located in which country?",
      wrong1: "Malaysia",
      wrong2: "Thailand",
      wrong3: "India",
      correct: "Indonesia"
    },
    {
      content: "Dodoma is the capital of which country?",
      wrong1: "Morroco",
      correct: "Tanzania",
      wrong2: "Sudan",
      wrong3: "Bolivia"
    },
    {
      content: "Xochicalco is located in which country?",
      wrong1: "Peru",
      correct: "Mexico",
      wrong2: "Chile",
      wrong3: "Costa Rica"
    },
    {
      content: "The city of Allepo is in which country?",
      wrong1: "Iran",
      wrong2: "Spain",
      wrong3: "Angola",
      correct: "Syria"
    },
    {
      content: "Karachi is in what country?",
      correct: "Pakistan",
      wrong1: "Iran",
      wrong2: "India",
      wrong3: "Nepal"
    },
    {
      content: "The ancient city of Carthage is in which country?",
      correct: "Tunisia",
      wrong1: "Greece",
      wrong2: "Italy",
      wrong3: "Turkey"
    },
    {
      content: "Lagos is in what country?",
      wrong1: "Panama",
      wrong2: "Peru",
      correct: "Nigeria",
      wrong3: "Mexico"
    }
  ];
  randomQuestionNumber = "";
  question = "";
  questionIndex = 1;
  introCardEl.style.display = "flex";
  questionCardEl.style.display = "none";
  feedbackWrongEl.style.display = "none";
  feedbackCorrectEl.style.display = "none";
  successCardEl.style.display = "none";
  failCardEl.style.display = "none";
  highscoresCardEl.style.display = "none";
}

function calcScore() {
  var userMinutes = timerMinutesEl.innerHTML;
  var userSeconds = timerSecondsEl.innerHTML;
  userScore = parseInt(userMinutes * 60) + parseInt(userSeconds);
  showScoreEl.innerHTML = "Final Score: " + userScore;
  console.log(timerMinutesEl.innerHTML)
}

// Highscores
init();
function renderHighscores() {
  highscoreListEl.innerHTML = "";
  for (var i = 0; i < highscores.length; i++) {
    var highscore = highscores[i];
    var li = document.createElement("li");
    li.textContent = highscore;
    li.setAttribute("data-index", i);
    var button = document.createElement("button");
    button.textContent = "Delete Score";
    li.appendChild(button);
    highscoreListEl.appendChild(li);
  }
}
function init() {
  // Get stored highscores from localStorage
  var storedHighscores = JSON.parse(localStorage.getItem("highscores"));
  // If highscores were retrieved from localStorage, update the highscores array to it
  if (storedHighscores !== null) {
    highscores = storedHighscores;
  }
  // Render highscores to the DOM
  renderHighscores();
}

function storeHighscores() {
  // Stringify and set highscores key in localStorage to highscores array
  localStorage.setItem("highscores", JSON.stringify(highscores));
}

// Event Listeners
// Start quiz button
startQuizBtn.addEventListener("click", function() {
  introCardEl.style.display = "none";
  questionCardEl.style.display = "flex";
  startTimer();
  askQuestion();
});

// Answer question
answerListEl.addEventListener("click", answerQuestion);

// Submit initials and score
submitFormBtn.addEventListener("click", function() {
  successCardEl.style.display = "none";
  highscoresCardEl.style.display = "flex";
});

// Push new initials and score to highscores array
scoreForm.addEventListener("submit", function(event) {
  event.preventDefault();
  var scoreText = userScore + " - " + userInput.value.trim();
  // if(userInput == "") {
  //   userInput = "Anon"
  //   scoreText = userScore + " - " + userInput.value.trim();
  // }
  // Add new scoreText to highscores array, clear the input
  highscores.push(scoreText);
  userInput.value = "";
  // Store updated highscores in localStorage, re-render the list
  storeHighscores();
  renderHighscores();
});

// When a element inside of the todoList is clicked...
highscoreListEl.addEventListener("click", function(event) {
  var element = event.target;
  // If that element is a button...
  if (element.matches("button") === true) {
    // Get its data-index value and remove the todo element from the list
    var index = element.parentElement.getAttribute("data-index");
    highscores.splice(index, 1);
    // Store updated highscores in localStorage, re-render the list
    storeHighscores();
    renderHighscores();
  }
});

// View highscores button
viewHighscoresBtn.addEventListener("click", function() {
  stopTimer();
  introCardEl.style.display = "none";
  questionCardEl.style.display = "none";
  successCardEl.style.display = "none";
  failCardEl.style.display = "none";
  highscoresCardEl.style.display = "flex";
});

// Reset button
succResetBtn.onclick = resetQuiz
failResetBtn.onclick = resetQuiz
