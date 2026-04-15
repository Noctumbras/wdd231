import { initializeNav } from "./nav.mjs";
import { initializeFooter } from "./footer.mjs";
import { quizQuestions } from "../data/quiz_questions.mjs";

const startQuiz = document.querySelector("#start-quiz");
const activeQuiz = document.querySelector("#active-quiz");
const shortButton = document.querySelector("#short-button");
const fullButton = document.querySelector("#full-button");

const question = document.querySelector("#quiz-question");
const answerZero = document.querySelector("#answer-zero");
const answerOne = document.querySelector("#answer-one");
const answerTwo = document.querySelector("#answer-two");
const answerThree = document.querySelector("#answer-three");
const quizModal = document.querySelector("#quiz-modal")
const questionResult = document.querySelector("#question-result");
const closeModal = document.querySelector("#close-modal");
const lastResult = document.querySelector("#last-result");

const lastQuizResultStrings = ["", "You've aced the short quiz. Now try the full quiz!", "You've aced the full quiz! Wow! Wanna try the quiz again anyways?"];
let lastQuizResultIndex = Number(window.localStorage.getItem("lastQuizResult")) || 0;
let quizTypeFull = false;
let currentQuizQuestions = [];
let questionIndex = 0;
let correctAnswerCount = 0;


function initializeQuiz() {
    if (quizTypeFull) {
        currentQuizQuestions = quizQuestions;
    }
    else {
        currentQuizQuestions = quizQuestions.filter((quizQuestion) => quizQuestion.quizType == 'short');
    }

    questionIndex = 0;
    correctAnswerCount = 0;
    setQuizQuestion();
}

function setQuizQuestion() {
    question.textContent = currentQuizQuestions[questionIndex].question;
    answerZero.textContent = currentQuizQuestions[questionIndex].answers[0];
    answerOne.textContent = currentQuizQuestions[questionIndex].answers[1];
    answerTwo.textContent = currentQuizQuestions[questionIndex].answers[2];
    answerThree.textContent = currentQuizQuestions[questionIndex].answers[3];
}

function answerQuestion(answerChoice) {
    let resultHeader = document.createElement('h2');
    let resultSentence = document.createElement('p');

    if (answerChoice == currentQuizQuestions[questionIndex].correctAnswerIndex) {
        correctAnswerCount++;
        resultHeader.textContent = "Correct!";
        resultSentence.textContent = currentQuizQuestions[questionIndex].explanation;
    }
    else {
        resultHeader.textContent = "Incorrect"
        resultSentence.textContent = "Sorry, that wasn't the correct answer."
    }

    questionIndex++;

    questionResult.innerHTML = '';
    questionResult.appendChild(resultHeader);
    questionResult.appendChild(resultSentence);

    if (questionIndex == currentQuizQuestions.length) {
        let finalResult = document.createElement('p');
        finalResult.textContent = `You got ${correctAnswerCount} out of ${currentQuizQuestions.length} questions correct.`

        if (correctAnswerCount == currentQuizQuestions.length) {
            finalResult.textContent += ` Well done!`;
        }

        questionResult.appendChild(finalResult);
    }

    quizModal.showModal();
}

function closeQuiz() {
    if (correctAnswerCount == currentQuizQuestions.length) {
        if (quizTypeFull) {
            lastQuizResultIndex = 2;
            localStorage.setItem('lastQuizResult', lastQuizResultIndex);
        }
        else if (lastQuizResultIndex < 2) {
            lastQuizResultIndex = 1;
            localStorage.setItem('lastQuizResult', lastQuizResultIndex);
        }

        lastResult.textContent = lastQuizResultStrings[lastQuizResultIndex];
    }

    startQuiz.classList.toggle('hide');
    activeQuiz.classList.toggle('show');
}


shortButton.addEventListener('click', () => {
    quizTypeFull = false;
    startQuiz.classList.toggle('hide');
    activeQuiz.classList.toggle('show');

    initializeQuiz();
});
fullButton.addEventListener('click', () => {
    quizTypeFull = true;
    startQuiz.classList.toggle('hide');
    activeQuiz.classList.toggle('show');

    initializeQuiz();
});

answerZero.addEventListener('click', () => {
    answerQuestion(answerZero.value);
});
answerOne.addEventListener('click', () => {
    answerQuestion(answerOne.value);
});
answerTwo.addEventListener('click', () => {
    answerQuestion(answerTwo.value);
});
answerThree.addEventListener('click', () => {
    answerQuestion(answerThree.value);
});

closeModal.addEventListener('click', () => {
    if (questionIndex == currentQuizQuestions.length) {
        closeQuiz();
    }
    else {
        setQuizQuestion();
    }

    quizModal.close();
});

if(lastQuizResultIndex <= 2) {
    lastResult.textContent = lastQuizResultStrings[lastQuizResultIndex];
}

initializeNav();
initializeFooter();