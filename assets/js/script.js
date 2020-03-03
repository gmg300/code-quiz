$(document).ready(function() {

  init();

  // Card Switching
  var card = "introCard";
  function renderCard() {
    $("#intro-card").hide();
    $("#question-card").hide();
    $("#score-card").hide();
    $("#highscores-card").hide();
    switch (card) {
      case "introCard":
        $("#intro-card").show();
        break;
      case "questionCard":
        $("#question-card").show();
        break;
      case "scoreCard":
        $("#score-card").show();
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
    var choice = event.target;
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
    card = 'scoreCard';
    renderCard();
    stopTimer();
    calcUserScore();
    renderUserScore();
  }

  function init() {
    totalSeconds = 0;
    secondsElapsed = 0;
    setTime();
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
    randomQuestionNumber = '';
    question = '';
    questionIndex = 1;
    card = 'introCard';
    renderCard();
  }


  // User Score
  var userScore;

  function calcUserScore() {
    var userMinutes = $("#timer-minutes").text();
    var userSeconds = $("#timer-seconds").text();
    userScore = parseInt(userMinutes * 60) + parseInt(userSeconds);
  }

  function renderUserScore() {
    if(userScore == 0) {
      $('#score-form').hide();
      $('#final-score').css('color', '#e53e3e');
    }
    $('#final-score').text("Final Score: " + userScore);
    $('#final-score').css('color', '#48bb78');
  }
  

  // Highscores
  var highscores = [];
  getHighscores();

  function getHighscores() { // Get stored highscores from localStorage
    var storedHighscores = JSON.parse(localStorage.getItem("highscores"));
    if (storedHighscores !== null) { // If highscores were retrieved from localStorage, update the highscores array to it
      highscores = storedHighscores;
    }
    renderHighscores();
  }

  function renderHighscores() {
    $('#highscores-list').empty(); // "Refresh" highscores list to be re-rendered
    for (var i = 0; i < highscores.length; i++) { // append each highscore with its own delete button
      var highscore = highscores[i];
      var li = $('<li>');
      li.text(highscore);
      li.attr("data-index", i);
      var button = $('<button>');
      button.text('Delete Score');
      li.append(button);
      $('#highscores-list').append(li);
    }
  }

  function storeHighscores() {
    localStorage.setItem("highscores", JSON.stringify(highscores));
  }

  function submitHighscore(e) { // Switch card and push new highscores to array
    card = "highscoresCard";
    renderCard();
    e.preventDefault();
    var userInput = $('#user-input').val();
    var scoreText = userScore + ' - ' + userInput;
    highscores.push(scoreText); // Add new scoreText to highscores array, clear the input
    $('#user-input').val('');
    storeHighscores(); // Store updated highscores in localStorage, re-render the list
    renderHighscores();
  }

  // Event Listeners
  $("#start-quiz").on("click", function() {
    card = "questionCard";
    startQuiz();
  });

  $("#answer-list").on("click", function() {
    answerQuestion();
  });

  $("#score-form").on("submit", function(e) { 
    submitHighscore(e);
  });

  // When a element inside of the todoList is clicked...
  $("#highscores-list").on("click", function(e) {
    var element = e.target;
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
  $(".reset-quiz").on("click", init);

});
