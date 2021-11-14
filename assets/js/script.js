var startButton = document.getElementById('start-btn');
var startMenu = document.getElementById('main-screen');
var quiz = document.getElementById('question-card');

// var questions = [
//     {
//         question:
//     }
// ]

startButton.addEventListener('click', startQuiz);

function startQuiz() {
    console.log('Quiz start');
    startMenu.classList.add('hide');
    quiz.classList.remove('hide');

    nextQuestion();
}

function nextQuestion() {

}

function selectAnswer() {

}