$(document).ready(function() {
  // Nav elements
  // Success Card elements
  var showScoreEl = document.getElementById("show-score");
  var userInput = document.getElementById("user-input");
  // Highscores Card elements
  var highscoreListEl = document.getElementById("highscore-list");

  // Card Switching
  var card = "introCard";
  renderCard();
  function renderCard() {
    $("#intro-card").hide();
    $("#question-card").hide();
    $("#success-card").hide();
    $("#fail-card").hide();
    $("#highscores-card").hide();
    switch (card) {
      case "introCard":
        $("#intro-card").show();
        break;
      case "questionCard":
        $("#question-card").show();
        break;
      case "successCard":
        $("#success-card").show();
        break;
      case "failCard":
        $("#fail-card").show();
        break;
      case "highscoresCard":
        $("#highscores-card").show();
        break;
    }
  }

  // Timer
  var totalSeconds = 0;
  var secondsElapsed = 0;
  var penaltyTime = 15;
  var interval;

  function setTime() {
    totalSeconds = 3 * 60;
    renderTime();
  }

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

  function renderTime() {
    $("#timer-minutes").css("color", "#805ad5");
    $("#timer-seconds").css("color", "#805ad5");
    $("#timer-minutes").text(getFormattedMinutes());
    $("#timer-seconds").text(getFormattedSeconds());
  }

  function startTimer() {
    setTime();
    interval = setInterval(function() {
      secondsElapsed++;
      renderTime();
      if (secondsElapsed >= totalSeconds) {
        stopQuiz();
      }
    }, 1000);
  }

  function stopTimer() {
    clearInterval(interval);
    if (secondsElapsed >= totalSeconds) {
      $("#timer-minutes").css("color", "#e53e3e");
      $("#timer-seconds").css("color", "#e53e3e");
      $("#timer-minutes").text("0");
      $("#timer-seconds").text("00");
    } else {
      renderTime();
    }
  }

  // Play Quiz
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
  var randomQuestionNumber;
  var question;
  var questionIndex = 1;

  function setQuestion() {
    randomQuestionNumber = Math.floor(Math.random() * questions.length);
    question = questions[randomQuestionNumber];
  }

  function renderQuestion() {
    $("#answer-list").empty();
    $("#question-number").text("Question " + questionIndex);
    $("#question-content").text(question.content);
    for (i = 1; i < 5; i++) {
      // Find each answer in the selected question and create a li
      var answer = Object.values(question);
      var li = $("<li>");
      li.text(answer[i]);
      $("#answer-list").append(li);
    }
  }

  function answerQuestion() {
    var correct = question.correct;
    console.log(correct);
    var choice = event.target;
    console.log(choice);
    if (choice.textContent !== correct) {
      secondsElapsed += penaltyTime;
      $("#feedback-wrong").show();
      setTimeout(function() {
        $("#feedback-wrong").hide();
      }, 1000);
    } else {
      $("#feedback-correct").show();
      setTimeout(function() {
        $("#feedback-correct").hide();
      }, 1000);
    }
    questions.splice(randomQuestionNumber, 1);
    questionIndex++;
    if (questions.length > 0) {
      setQuestion();
      renderQuestion();
    } else {
      stopQuiz();
    }
  }

  function startQuiz() {
    renderCard();
    startTimer();
    setQuestion();
    renderQuestion();
  }

  function stopQuiz() {
    renderCard();
    stopTimer();
    calcScore();
    renderFinalScore();
  }

  // Post Quiz
  var highscores = [];
  var userScore;

  function renderFinalScore() {
    var userMinutes = $("#timer-minutes").text();
    var userSeconds = $("#timer-seconds").text();
    userScore = parseInt(userMinutes * 60) + parseInt(userSeconds);
    showScoreEl.innerHTML = "Final Score: " + userScore;
  }

  function resetQuiz() {}

  // function resetQuiz() {
  //   totalSeconds = 0;
  //   secondsElapsed = 0;
  //   setTime()
  //   renderTime()
  //   questions = [
  //     {
  //       content: "The temple of Preah Vihear is located in which country?",
  //       wrong1: "India",
  //       correct: "Cambodia",
  //       wrong2: "Indonesia",
  //       wrong3: "Mongolia"
  //     },
  //     {
  //       content: "Minsk is the capital of which country?",
  //       wrong1: "Estonia",
  //       wrong2: "Romania",
  //       wrong3: "Hungary",
  //       correct: "Belarus"
  //     },
  //     {
  //       content:
  //         "The city, once known as Edo and now one of the largest cities in the world is in which country?",
  //       correct: "Japan",
  //       wrong1: "India",
  //       wrong2: "Brazil",
  //       wrong3: "Mexico"
  //     },
  //     {
  //       content: "The temple of Prambanan is located in which country?",
  //       wrong1: "Malaysia",
  //       wrong2: "Thailand",
  //       wrong3: "India",
  //       correct: "Indonesia"
  //     },
  //     {
  //       content: "Dodoma is the capital of which country?",
  //       wrong1: "Morroco",
  //       correct: "Tanzania",
  //       wrong2: "Sudan",
  //       wrong3: "Bolivia"
  //     },
  //     {
  //       content: "Xochicalco is located in which country?",
  //       wrong1: "Peru",
  //       correct: "Mexico",
  //       wrong2: "Chile",
  //       wrong3: "Costa Rica"
  //     },
  //     {
  //       content: "The city of Allepo is in which country?",
  //       wrong1: "Iran",
  //       wrong2: "Spain",
  //       wrong3: "Angola",
  //       correct: "Syria"
  //     },
  //     {
  //       content: "Karachi is in what country?",
  //       correct: "Pakistan",
  //       wrong1: "Iran",
  //       wrong2: "India",
  //       wrong3: "Nepal"
  //     },
  //     {
  //       content: "The ancient city of Carthage is in which country?",
  //       correct: "Tunisia",
  //       wrong1: "Greece",
  //       wrong2: "Italy",
  //       wrong3: "Turkey"
  //     },
  //     {
  //       content: "Lagos is in what country?",
  //       wrong1: "Panama",
  //       wrong2: "Peru",
  //       correct: "Nigeria",
  //       wrong3: "Mexico"
  //     }
  //   ];
  //   randomQuestionNumber = "";
  //   question = "";
  //   questionIndex = 1;
  //   introCardEl.style.display = "flex";
  //   questionCardEl.style.display = "none";
  //   feedbackWrongEl.style.display = "none";
  //   feedbackCorrectEl.style.display = "none";
  //   successCardEl.style.display = "none";
  //   failCardEl.style.display = "none";
  //   highscoresCardEl.style.display = "none";
  // }

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
  // Start quiz
  $("#start-quiz").on("click", function() {
    card = "questionCard";
    startQuiz();
  });

  // Answer question
  $("#answer-list").on("click", function() {
    answerQuestion();
  });

  // Submit initials and score
  $("#submit").on("click", function() {
    card = "highscoresCard";
    renderCard();
  });

  // Push new initials and score to highscores array
  $("#score-form").on("submit", function(event) {
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
  $("#highscore-list").on("click", function(event) {
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
  $("#view-highscores").on("click", function() {
    card = "highscoresCard";
    renderCard();
  });

  // Reset buttons
  $("#success-reset-quiz").on("click", function() {
    card = "introCard";
    renderCard();
  });

  $("#fail-reset-quiz").on("click", function() {
    card = "introCard";
    renderCard();
  });
});
