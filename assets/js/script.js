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

var shuffleQuestions, currentQuestionIndex

var score = 0;

// function timer() {
//     const timeInterval = setInterval(() => {
//       if (timeLeft >= 1) {
//         timerEl.textContent = `Timer: ${timeLeft}`;
  
//         timeLeft--; // decrement timeLeft by 1
//       } else {
//         // run endQuiz function
//       }
//     }, 1000);
//   }

//array of questions
var questions = [
    {
        question: 'what is my first name',
        answers: [
            {text: 'austin', correct: true},
            {text: 'adam', correct: false},
            {text: 'oz', correct: false},
            {text: 'thiccboi', correct: false}
        ]
    },
    {
        question: 'what is my last name',
        answers: [
            {text: 'spinal', correct: false},
            {text: 'esp', correct: false},
            {text: 'espinal', correct: true},
            {text: 'esper', correct: false}
        ]
    }
]

startButton.addEventListener('click', startQuiz);
//Start quiz function
function startQuiz() {
    console.log('Quiz start');
    startMenu.classList.add('hide');

    shuffleQuestions = questions.sort(()=> Math.random() - 0.5);
    currentQuestionIndex = 0;

    quiz.classList.remove('hide');

    nextQuestion();
}

function nextQuestion() {
    showQuestion(shuffleQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionEl.innerText = question.question

    answer1Btn.textContent = question.answers[0].text;
    answer2Btn.textContent = question.answers[1].text;
    answer3Btn.textContent = question.answers[2].text;
    answer4Btn.textContent = question.answers[3].text;

    answerButtonsEl.addEventListener('click', selectAnswer);

}

function selectAnswer(event) {
    // var btnPress = event.target.innerText;
    // console.log(event.target.innerText)
    // var correct = btnPress.dataset.correct;

    // if (answers[i] === true) {
    //     console.log("correct");
    //     currentQuestionIndex++
    //     nextQuestion();
    // }
}