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
// Fail Card elements
var failCardEl = document.getElementById("fail-card");
var failResetBtn = document.getElementById("fail-reset-quiz");
// Highscores Card elements
var highscoresCardEl = document.getElementById("highscores-card");
var highscoreListEl = document.getElementById("highscore-list");
var successResetBtn = document.getElementById("success-reset-quiz");

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
      content: "The city, once known as Edo and now one of the largest cities in the world is in which country?",
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
    },
  ];
var question = '';
var questionIndex = 1;
// Post Quiz Events variables
var userScore = '';
var highscore = '';
var highscores = [];


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
}

function startTimer() {
    setTime();
    interval = setInterval(function() {
        secondsElapsed++;
        renderTime();
        if(secondsElapsed >= totalSeconds || questions.length < 1){
            stopTimer();
            stopQuiz();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(interval);
    if(secondsElapsed >= totalSeconds){
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
    question = questions[Math.floor(Math.random() * questions.length)];
    // Insert in HTML
    questionNumberEl.innerHTML = 'Question ' + questionIndex;
    questionContentEl.innerHTML = question.content;
    clearAnswerList();
    for(i = 1; i < 5; i++) {
        var index = i;
        // Find the each answer in the choosen question and create li
        var answer = Object.values(question);
        var li = document.createElement("li");
        li.innerHTML = answer[index];
        answerListEl.appendChild(li);
    } 
}

function answerQuestion(event) {
  console.log(event.target)
    if(event.target.innerHTML !== "correct") {
        secondsElapsed += penaltyTime;
        setTimeout(function(){
            feedbackWrongEl.style.display = "block";
        }, 1000);
    } else {
        setTimeout(function(){
            feedbackCorrectEl.style.display = "block";
        }, 1000);
    }
    feedbackWrongEl.style.display = "none";
    feedbackCorrectEl.style.display = "none";
    questions.splice(question, 1);
    questionIndex++;
    if(questions.length > 0) {
        askQuestion();
    } else {
        stopQuiz();
    }
  }

function clearAnswerList(){
    while (answerListEl.firstChild) {
        answerListEl.firstChild.remove();
    }
}


// Post Quiz Events
function stopQuiz() {
    if(secondsElapsed >= totalSeconds) {
        questionCardEl.style.display = "none";
        failCardEl.style.display = "flex";
    } else {
        questionCardEl.style.display = "none";
        successCardEl.style.display = "flex";
        calcScore();
    }
}

// function resetQuiz() {
//     totalTime = 2 * 60 * 1000
//     questions = [
//       {
//         content: "This is question number 1, it'll have a really interesting question that you have to answer.",
//         answer1: "totally wrong",
//         answer2: "correct",
//         answer3: "nah",
//         answer4: "almost"
//       },
//       {
//         content: "This is question number 2, it'll be different than question 1 but you pretty much do the same thing and answer it to the best of your ability.",
//         answer1: "good try",
//         answer2: "you suck",
//         answer3: "not even close",
//         answer4: "correct"
        
//       },
//       {
//         content: "This is question 3",
//         answer1: "good try",
//         answer2: "you suck",
//         answer3: "not even close",
//         answer4: "correct"
        
//       },
//       {
//         content: "This is question 4",
//         answer1: "good try",
//         answer2: "you suck",
//         answer3: "not even close",
//         answer4: "correct"
        
//       },
//       {
//         content: "This is question 5",
//         answer1: "good try",
//         answer2: "you suck",
//         answer3: "not even close",
//         answer4: "correct"
        
//       },
//       {
//         content: "This is question 6",
//         answer1: "good try",
//         answer2: "you suck",
//         answer3: "not even close",
//         answer4: "correct"
        
//       },
//       {
//         content: "This is question 7",
//         answer1: "good try",
//         answer2: "you suck",
//         answer3: "not even close",
//         answer4: "correct"
        
//       },
//       {
//         content: "This is question 8",
//         answer1: "good try",
//         answer2: "you suck",
//         answer3: "not even close",
//         answer4: "correct"
        
//       },
//       {
//         content: "This is question 9",
//         answer1: "good try",
//         answer2: "you suck",
//         answer3: "not even close",
//         answer4: "correct"
        
//       },
//       {
//         content: "This is question 10",
//         answer1: "good try",
//         answer2: "you suck",
//         answer3: "not even close",
//         answer4: "correct"
        
//       },
//     ]
//     question = ''
//     questionIndex = 1
//     scoreboardCard.style.display = "none"
//     introCard.style.display = "none"
//     outroCard.style.display = "none"
//     gameOver.style.display = "none"
//     questionCard.style.display = "flex"
//     timerEl.style.color = "#805ad5"
//     timer()
//     askQuestion()
//   }

function calcScore() {
    var userMinutes = timerMinutesEl.innerHTML;
    var userSeconds = timerSecondsEl.innerHTML;
    userScore = parseInt(userMinutes * 60) + parseInt(userSeconds);
    showScoreEl.innerHTML = "Final Score: " + userScore;
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
startQuizBtn.addEventListener('click', function(){
    introCardEl.style.display = "none";
    questionCardEl.style.display = "flex";
    startTimer();
    askQuestion();
});

answerListEl.addEventListener("click", answerQuestion);

submitFormBtn.addEventListener('click', function() {
    successCardEl.style.display = "none";
    highscoresCardEl.style.display = "flex";
});

scoreForm.addEventListener("submit", function(event) {
    event.preventDefault();
    var scoreText = userScore + " - " + userInput.value.trim();
    // Return from function early if submitted scoreText is blank
    if (scoreText === "") {
      return;
    }
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


