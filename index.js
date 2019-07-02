///Start button on the Start Page takes user to the first question
//When an answer is selected, turn white circle to blue
//when user submits answer choice it will display correct/incorrect result on next page
//final score will be displayed on final score page
//Try again button displayed on final score page 
//need a function to display start page to document
$(function () {
  beginQuiz();
  handleAnswerFeedback();
  handleAnswerSubmits();
  renderQuestionPage();
});

var state = {
  questions: [
    {//question 1
      question: 'What is generally considered to be the first "pony car"?',
      answers: ['Pontiac Firebird',
                'Mercury Cougar',
                'Ford Mustang',
                'Chevrolet Camaro'],
      correctAnswer: 'Ford Mustang'
    },
    {//question 2
      question:'What was the first Japanese car to be produced in the US?',
      answers: ['Nissan Maxima', 'Honda Accord', 'Mazda Miata', 'Toyota Camry'],
      correctAnswer: 'Honda Accord'
    },
    {//question 3
      question:'Which animal is on the Porsche logo?',
      answers: ['Lion', 'Bull', 'Bird', 'Horse'],
      correctAnswer: 'Horse'
    },
    {//question 4
      question:'What car sold more than one million units in 1965, setting a record that still stands today?',
      answers: ['Buick Wildcat', 'Chevrolet Impala', 'Pontiac GTO', 'Ford Thunderbird'],
      correctAnswer: 'Chevrolet Impala'
    },
    {//question 5
      question:'What was the first car to break the sound barrier?',
      answers: ['Koenigsegg Agera R', 'Hennessey Venom GT', 'Bugatti Veyron', 'Thrust SSC'],
      correctAnswer: 'Thrust SSC'
    },
    {//question 6
      question:'What year was the corvette first introduced?',
      answers: ['1943', '1973', '1963', '1953'],
      correctAnswer: '1953'
    },
    {//question 7
      question: 'What was the first car to be mass-produced?',
      answers: ['Model T', 'Packard', 'Duryea Motor Wagon', 'Model A'],
      correctAnswer: 'Model T'
    },
    {//question 8
      question:'What was the first car launched into space?',
      answers: ['Rolls-Royce Vsion 100', 'Porsche 911', 'Tesla Roadster', 'Rinspeed Oasis'],
      correctAnswer: 'Tesla Roadster'
    },
    {//question 9
      question:'The inventor of cruise control was?',
      answers: ['A 12 year-old child', 'A Homeless Man', 'A Blind Man', 'A Robot'],
      correctAnswer: 'A Blind Man'
    },
    {//question 10
      question:'How much did the first Ford Mustang cost?',
      answers: ['$3,484', '$2,368', '$1,652', '$2,944'],
      correctAnswer: '$2,368'
    }
    ],
    currentQuestionIndex: 0,
    correctCount: 0,
    quizStarted: false,
      // need to have the feedback box cleared
    // renderQuestionFeedback: text()
};

function resetQuiz() {
  state.correctCount = 0;
  state.currentQuestionIndex = 0;
}

//need a function to display:question number, corresponding question and answer choices, and a submit (Next) button
//need a function to close popup and move to/display next question
function renderQuestionPage() {
  var currentQuestionObj = state.questions[state.currentQuestionIndex];
  renderQuestion();
  renderQuestionChoices(currentQuestionObj.answers);
  // $(".popup-inner").addClass("hidden");
}

function renderQuestion() {
  var progressHTML = "<span>(" + (state.currentQuestionIndex + 1) + '/' + state.questions.length + ")</span>"
  var questionText = state.questions[state.currentQuestionIndex].question;
  $(".js-question-text").html(progressHTML + questionText);
  // console.log(renderQuestion);
}

function renderQuestionChoices(answers) {
  $("#question-form label").each(function (index,label) {
    $(this).find("input").attr("value", answers[index]);
    $(this).find("input").prop("checked", false);
    $(this).find("span").text(answers[index]);
    // $("#submit-answer").addClass("hidden");
    //is this where I might add in code to make an answer choice REQUIRED?
    //also add a removeClass("hidden") on the #submit-answer button if I decide to go that route?
  });
}

//function to display results
function renderFinalResults() {
  $("#my-quiz").addClass("hidden");
  $("#results-page").removeClass("hidden");
  $("#retake-button").removeClass("hidden");
  var element = $(".js-final-results");
  element.html("<h2>" + "You got" + ' ' + state.correctCount + ' ' + "out of" + ' ' + state.questions.length + ' ' + "correct" + "</h2>");
  handleQuizRestart();
}

function checkAnswer(userChoice) {
  var correctChoice = state.questions[state.currentQuestionIndex].correctAnswer;
  // console.log(state.currentQuestionIndex,state.questions[state.currentQuestionIndex]);
  if (userChoice === correctChoice) {
    state.correctCount++;
    renderQuestionFeedback(true);
    // $("#submit-answer").removeClass("hidden");
    state.currentQuestionIndex++;
  }
  else if (userChoice === undefined) {
    renderQuestionFeedback ("unanswered");
  }
  else {
    renderQuestionFeedback (false);
    state.currentQuestionIndex++;
  }
  if (state.currentQuestionIndex == state.questions.length) {
    renderFinalResults()
  }
  else {
    renderQuestionPage();
  }
  // console.log(userChoice);
}

//need a function to call "popup-feedback" and display in DOM
function renderQuestionFeedback(response) {
  var feedback = $(".popup-inner");
  if (response === true) {
    feedback.find("h2").text("That was correct!");
  }
  else if (response === false) {
    feedback.find("h2").text("Sorry your answer was not correct.");
  }
  else if (response === "unanswered") {
    feedback.find("h2").text("Must answer question");
  }
}

//need a function to change the page to question page upon button click (Take Quiz!)
function beginQuiz() {
 $("#start-button").click(function (e) {
   $("#my-quiz").removeClass("hidden");
   $("#start-button").addClass("hidden");
  // console.log("take quiz clicked");
 }); 
}

function handleQuizRestart() {
    $("#retake-button").click(function (e) {
  // $("#start-quiz").click(function (e) {
    $("#my-quiz").removeClass("hidden");
    $("#retake-button").addClass("hidden");
    $("#txt-feedback").empty();
    $(".js-final-results").text("");
    resetQuiz();
    renderQuestionPage();
  });
}


//need a function to evaluate whether user is correct/incorrect
//should this be coded as a loop to evaluate if answer is correct/incorrect?
function handleAnswerSubmits() {
  $("#submit-answer").click(function (e) {
  e.preventDefault();
  // $(".popup-inner").removeClass("hidden");
  var userChoice = $("input[name='answerChoice']:checked").val();
  renderQuestionFeedback();
  checkAnswer(userChoice);
  });
}

//need a function to open a feedback window after answer is submitted
function handleAnswerFeedback() {
  // to open...
  $("#submit-answer").on("click", function (e) {
    e.preventDefault();
    var targetPopupClass = $(this).attr("data-popup-open");
    $(`[data-popup="' + targetPopupClass + '"]`).fadeIn(250);
    e.preventDefault();
  });
  //to close...
  $("#close-feedback-modal").on("click", function (e) {
    var targetPopupClass = $(this).attr("data-popup-close");
    $(`[data-popup = "' + targetPopupClass + '"]`).fadeOut(250);
    e.preventDefault();
    renderQuestionFeedback();
  });
}



//need  function(s) to display results (# out of 10), final message, display "retake-button" which should go back to start page
function resetQuiz() {
  state.correctCount = 0;
  state.currentQuestionIndex = 0;
}
