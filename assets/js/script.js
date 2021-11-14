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
var timerEl = document.getElementById('timer');

var shuffleQuestions, currentQuestionIndex

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

//array of questions
var questions = [
    {
        question: 'what is my first name?',
        answers: [
            { text: 'austin', correct: true },
            { text: 'adam', correct: false },
            { text: 'oz', correct: false },
            { text: 'thiccboi', correct: false }
        ]
    },
    {
        question: 'what is my last name?',
        answers: [
            { text: 'spinal', correct: false },
            { text: 'esp', correct: false },
            { text: 'espinal', correct: true },
            { text: 'esper', correct: false }
        ]
    },
    {
        question: 'who is my friend?',
        answers: [
            { text: 'mary', correct: false },
            { text: 'bob', correct: true },
            { text: 'joe', correct: false },
            { text: 'esteban', correct: false }
        ]
    },
    {
        question: 'What is my favorite food?',
        answers: [
            { text: 'tacos', correct: false },
            { text: 'burgers', correct: false },
            { text: 'hot dogs', correct: false },
            { text: 'pizza', correct: true }
        ]
    },
    {
        question: 'what is my favorite music?',
        answers: [
            { text: 'rap', correct: false },
            { text: 'pop', correct: false },
            { text: 'rock', correct: true },
            { text: 'country', correct: false }
        ]
    },
    {
        question: 'what is my favorite animal?',
        answers: [
            { text: 'monkey', correct: true },
            { text: 'dog', correct: false },
            { text: 'cat', correct: false },
            { text: 'spider', correct: false }
        ]
    }
]

//When the start button is clicked, the Quiz starts
startButton.addEventListener('click', startQuiz);

//start quiz function
function startQuiz() {
    console.log('Quiz start');
    startMenu.classList.add('hide');

    shuffleQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;

    quiz.classList.remove('hide');

    timer();
    nextQuestion();
}

//brings in random question order
function nextQuestion() {
    showQuestion(shuffleQuestions[currentQuestionIndex]);
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
    quiz.classList.add('hide');
    highscoreSave.classList.remove('hide');

    var highScore = localStorage.getItem("highscore");
    if (highScore === null) {
        highScore = 0;
    }

    if (score > highScore) {
        localStorage.setItem("highscore", score);
        localStorage.setItem("name", playerName);
    }
}