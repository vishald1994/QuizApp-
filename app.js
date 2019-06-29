///Start button on the Start Page takes user to the first question
//When an answer is selected, turn white border box into blue
//when an answer is selected, other answer boxes turn into white border
//when an answer is submitted, Question Status on the bottom adds from 0/10 to 1/10 and so on
//If an answer submitted is correct, add Score status on the bottom from 0/10 to 1/10 and so on
//If a submit button is clicked without an answer choosed, show/ a red bordered box wrapping the whole 4 answers
//If a submit button is clicked without an answer choosed, show a text Please make a choice in red on the top of the red bordered box
//When an anwer is submitted, display the next question
//When an answer is submitted, display the matching choices for the question
//final page will let the user restart the quiz from question one as a new user
//final page with with 10/10 correct answer shows different text than 3/10 or 0/10

//step 1, Define global variable
const questionsArray = [
    //question 0
    {
        questionText: 'What is generally considered to be the first "pony car"?',
        questionChoice: ['Pontiac Firebird', 'Mercury Cougar', 'Ford Mustang', 'Chevrolet Camaro'],
        questionAnswer: 2,
    },
    //question 1
    {
        questionText: 'What was the first Japanese car to be produced in the US?',
        questionChoice: ['Nissan Maxima', 'Honda Accord', 'Mazda Miata', 'Toyota Camry'],
        questionAnswer: 1
    },
    //question 2
    {
        questionText: 'What car sold more than one million units in 1965, setting a record that still stands today?',
        questionChoice: ['Buick Wildcat', 'Chevrolet Impala', 'Pontiac GTO', 'Ford Thunderbird'],
        questionAnswer: 1,
    },
    //question 3
    {
        questionText: 'What was the first car to break the sound barrier?',
        questionChoice: ['Koenigsegg Agera R', 'Hennessey Venom GT', 'Bugatti Veyron', 'Thrust SSC'],
        questionAnswer: 3,
    },
    //question 4
    {
        questionText: 'What year was the corvette first introduced?',
        questionChoice: ['1943', '1973', '1963', '1953'],
        questionAnswer: 3,
    },
    //question 5
    {
        questionText: 'What was the first car to be mass-produced?',
        questionChoice: ['Model T', 'Packard', 'Duryea Motor Wagon', 'Model A'],
        questionAnswer: 0,
    },
    //question 6
    {
        questionText: 'What was the first car launched into space?',
        questionChoice: ['Rolls-Royce Vsion 100', 'Porsche 911', 'Tesla Roadster', 'Rinspeed Oasis'],
        questionAnswer: 2,
    },
    //question 7
    {
        questionText: 'The inventor of cruise control was?',
        questionChoice: ['A 12 year-old child', 'A Homeless Man', 'A Blind Man', 'A Robot'],
        questionAnswer: 2,
    },
    //question 8
    {
        questionText: 'How much did the first Ford Mustang cost?',
        questionChoice: ['$3,484', '$2,368', '$1,652', '$2,944'],
        questionAnswer: 1,
    },
    //question 9
    {
        questionText: 'Which animal is on the Porsche logo?',
        questionChoice: ['Lion', 'Bull', 'Bird', 'Horse'],
        questionAnswer: 3,
    },
];


let currentQuestionNumber = 0;
let totalNumberOfQuestion = questionsArray.length;
let totalScore = 0



//Step 2, Defining functions

//Click .start-button adds .hidden class to Start Section, and removes .hidden class of Question Section
function startChoppin() {
    $('.start-button').click(function () {
        $('.start-section').hide();
        $('.question-section').show();
        $('.final-section').hide();
        console.log('1.startChoppin ran');
        currentQuestionNumber = 0;
        console.log('currentQuestionNumber');
    })
};

//Click .reset-button adds .hidden class to Question and Final Section, and removes .hidden class of Start Section
function tryAgain() {
    $('.reset-button').click(function () {
        location.reload();
        //        $('.start-section').show();
        //        $('.final-section').hide();
        //        $('.question-section').hide();
        //        console.log('Last.tryAgain ran');
        //
        //        //resets currentQuestionNumber and totalScore to 0
        //        currentQuestionNumber = 0;
        //        console.log('currentQuestionNumber')
        //        totalScore = 0;
        //        console.log('totalScore')
    })
}


function checkAnswer() {
    //*****can be any answer from prev. questions

    //    let userAnswer = $('input[class="answer"]:checked').val()
    let userAnswer = $('input[class="answer"]:checked').val();
    console.log($('input[class="answer"]:checked'));
    //if answer === currentQuestionNumber.questionAnswer
    let correctAnswer = questionsArray[currentQuestionNumber].questionAnswer;
    console.log(correctAnswer, userAnswer);
    if (userAnswer == correctAnswer) {
        //add totalScore by 1
        totalScore++;
        console.log(totalScore);
    }
    //else
    //return false
    else {
        console.log(totalScore)
    };
};

//function containerLighter() {
//add class .right
//if (checkAnswer() === true) {
//    target.addClass('right');
//} else {
//    target.addClass('wrong');
//};
//console.log('3.containerLigher ran');
//console.log(target);
//};

function questionDisplay() {
    //    $('.question').empty();
    $('.question').text(questionsArray[currentQuestionNumber].questionText);
    console.log('questionDisplay ran', currentQuestionNumber);
    questionStatus();
    scoreStatus();
}

function answersDisplay() {
    //delete old .answers-container
    $('.answers-container').empty();
    //Amount of answers in a question
    const amountOfAnswers = questionsArray[currentQuestionNumber].questionChoice.length;
    //populate empty .answers-container
    for (let i = 0; i < amountOfAnswers; i++) {
        $('.answers-container').append(
            `<input class='answer' type="radio" name='answer' value='${i}' required>${questionsArray[currentQuestionNumber].questionChoice[i]}<br />`
        );
        console.log(i);
    }
    console.log('answersDisplay ran');
}

function questionStatus() {
    $('.question-circle').empty();
    $('.question-circle').append(
        `<p class= 'question-status'>Question ${currentQuestionNumber + 1} out of 10</p>`
    );
};

function scoreStatus() {
    $('.score-circle').empty();
    $('.score-circle').append(
        `<p>Score ${totalScore} out of 10</p>`
    );
    console.log('scoreStatus ran');
    console.log(totalScore);
};

function submit() {
    $('.submit-button').click(function () {
        if ((currentQuestionNumber + 1) == totalNumberOfQuestion) {
            checkAnswer();
            $('.final-score-container').empty();
            $('.final-score-container').append(
                `<p> Final Score: ${totalScore} out of 10</p>`
            );
            $('.start-section').hide();
            $('.question-section').hide();
            $('.final-section').show();
            scoreStatus();
            
        } else {
            checkAnswer();
            currentQuestionNumber++;
            questionDisplay();
            answersDisplay();
            console.log(totalScore);

        }
    });
}

function functionsHandler() {
    StartQuiz();
    tryAgain();
    checkAnswer();
    containerLighter();
    questionDisplay();
    answersDisplay();
    questionStatus();
    scoreStatus();
};


$(function () {
    //On Start Section
    $('.question-section').hide();
    $('.final-section').hide();

    startChoppin();

    //On Question Section
    submit();

    questionDisplay();
    answersDisplay();
    //    questionStatus();
    //    scoreStatus();
    tryAgain();
})
