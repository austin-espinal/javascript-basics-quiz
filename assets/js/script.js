//element ids
var startButton = document.getElementById('start-btn');
var startMenu = document.getElementById('main-screen');
var quiz = document.getElementById('question-card');
var questionEl = document.getElementById('question');
var answerButtonsEl = document.getElementById('answers');
var answer1Btn = document.getElementById('answer-1');
var answer2Btn = document.getElementById('answer-2');
var answer3Btn = document.getElementById('answer-3');
var answer4Btn = document.getElementById('answer-4');
var verfication = document.getElementById('check');
var highscoreSave = document.getElementById('results');
var highscoreBtn = document.getElementById('submit-btn');
var finalScoreText = document.getElementById('final-score-text');
var viewHighscore = document.getElementById('view-highscore');
var scoreTab = document.getElementById('highscores');
var backBtn = document.getElementById('back-btn');
var content = document.getElementById('content');
var scoreList = document.querySelector('#score-list');



var timerEl = document.getElementById('timer');

var shuffledQuestions, currentQuestionIndex

var score = 0;

//sets the quiz timer
var timeLimit = 75;
function timer() {
    setInterval(() => {
        if (timeLimit >= 0) {
            timerEl.textContent = 'Timer: ' + timeLimit;

            timeLimit--;
        } else {
            endQuiz();
        }
    }, 1000);
}

//array for saved high scores
var totalScores = [];

//array of questions
var questions = [
    {
        question: 'Commonly used data types DO NOT include',
        answers: [
            { text: 'alerts', correct: true },
            { text: 'strings', correct: false },
            { text: 'boolean', correct: false },
            { text: 'numbers', correct: false }
        ]
    },
    {
        question: 'Arrays in Javascript can be used to store ______',
        answers: [
            { text: 'strings', correct: false },
            { text: 'boolean', correct: false },
            { text: 'other arrays', correct: false },
            { text: 'all of the above', correct: true }
        ]
    },
    {
        question: 'Which is the correct tag to implement JavaScript in HTML?',
        answers: [
            { text: '<js>', correct: false },
            { text: '<script>', correct: true },
            { text: '<java>', correct: false },
            { text: '<javascript>', correct: false }
        ]
    },
    {
        question: 'What is the correct syntax in order to declare a function?',
        answers: [
            { text: 'function startQuiz', correct: false },
            { text: 'var start = startQuiz() {', correct: false },
            { text: 'function startQuiz {}', correct: false },
            { text: 'function startQuiz() {}', correct: true }
        ]
    },
    {
        question: 'What does DOM stand for?',
        answers: [
            { text: 'Doug Orders Milkshakes', correct: false },
            { text: 'Document Object Message', correct: false },
            { text: 'Document Object Model', correct: true },
            { text: 'Document Object Method', correct: false }
        ]
    },
    {
        question: 'String values must be enclosed in ____ when being assigned to a variable',
        answers: [
            { text: 'quotes', correct: true },
            { text: 'brackets', correct: false },
            { text: 'parenthesis', correct: false },
            { text: 'square brackets', correct: false }
        ]
    }
]

//When the start button is clicked, the Quiz starts
startButton.addEventListener('click', startQuiz);

//start quiz function
function startQuiz() {
    console.log('Quiz start');
    startMenu.classList.add('hide');

    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;

    quiz.classList.remove('hide');

    timer();
    nextQuestion();
}

//brings in random question order
function nextQuestion() {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

//shows current question
function showQuestion(question) {
    questionEl.innerText = question.question

    answer1Btn.textContent = question.answers[0].text;
    answer2Btn.textContent = question.answers[1].text;
    answer3Btn.textContent = question.answers[2].text;
    answer4Btn.textContent = question.answers[3].text;

    answerButtonsEl.addEventListener('click', selectAnswer);

}

//checks if all questions were answered. if yes, then ends quiz. if no, then precedes to the next question
function selectAnswer(event) {
    answerVerify(event.target.innerText, currentQuestionIndex);
    var i = currentQuestionIndex + 1;
    if (i === questions.length) {
        endQuiz();
    } else {
        currentQuestionIndex++
        nextQuestion(currentQuestionIndex);
    }
}

//function that verifies if answer choice is correct or not
function answerVerify(btnText, currentQuestionIndex) {
    for (const currentAnswer of questions[currentQuestionIndex].answers) {
        if (btnText === currentAnswer.text) {
            if (currentAnswer.correct === true) {
                console.log("correct")
                verfication.textContent = "Correct";
                verfication.classList.add('correct');
                verfication.classList.remove('hide', 'incorrect');
                score = score + 5;
                console.log(score);
            } else {
                console.log("wrong")
                verfication.textContent = "Incorrect";
                verfication.classList.add('incorrect');
                verfication.classList.remove('hide', 'correct');
                timeLimit = timeLimit - 5;
            }
        }
    }
}


//runs if time has expired or if answered all questions. allows to save score to local storage
function endQuiz() {
    clearInterval(timer);

    content.classList.add('hide');
    highscoreSave.classList.remove('hide');

    finalScoreText.textContent = "Your final score is " + score;

    highscoreBtn.addEventListener('click', savedScore);

}

//saves players score and name
function savedScore(event) {
    var playerName = event.target.text
    console.log(playerName);
    playerScore = playerName + " " + JSON.stringify(score);
    console.log(playerScore);
    totalScores.push(playerScore)
    localStorage.setItem(playerScore);
    loadScores();
}

 //goes to view highscore screen and adds new score
function loadScores() {
    highscoreSave.classList.add('hide');
    startMenu.classList.add('hide');

    viewHighscore.classList.remove('hide');

    scoreList.appendChild(playerScore);
}

//goes to start menu
function mainMenu() {
    viewHighscore.classList.add('hide');
    startMenu.classList.remove('hide');
}

scoreTab.addEventListener('click', loadScores);
backBtn.addEventListener('click', mainMenu);