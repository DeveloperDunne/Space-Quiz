"use strict";

//Waiting for DOM to load before game starts.
document.addEventListener("DOMContentLoaded", function () {
  let buttons = document.getElementsByTagName("button");
  for (let button of buttons) {
    button.addEventListener("click", function () {
      if (this.getAttribute("data-type") === "start") {
        quizPage.classList.remove("hide");
        instructionsPage.classList.add("hide");
        startQuiz();
      }
    });
  }
});

//Questions & Answers.
const questions = [
  {
    question: "What planet do we live on?",
    answers: [
      { text: "Mars", correct: false },
      { text: "Earth", correct: true },
      { text: "Saturn", correct: false },
      { text: "The Moon", correct: false },
    ],
  },
  {
    question: "What planet is called the red planet?",
    answers: [
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Pluto", correct: false },
      { text: "Earth", correct: false },
    ],
  },
  {
    question: "What planet is famous for the beautiful rings that surround it?",
    answers: [
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: true },
      { text: "Mars", correct: false },
      { text: "Pluto", correct: false },
    ],
  },
  {
    question: "What is the closest planet to the Sun?",
    answers: [
      { text: "Mercury", correct: true },
      { text: "Venus", correct: false },
      { text: "Jupiter", correct: false },
      { text: "Earth", correct: false },
    ],
  },
  {
    question: "Who was the first person to walk on the moon?",
    answers: [
      { text: "Buzz Aldrin", correct: false },
      { text: "Michael Jackson", correct: false },
      { text: "Neil Armstrong", correct: true },
      { text: "Buzz Lightyear", correct: false },
    ],
  },
  {
    question: "What is the name of NASA’s most famous space telescope?",
    answers: [
      { text: "Hubble Space Telescope", correct: true },
      { text: "Bubble Space Telescope", correct: false },
      { text: "Rubble Space Telescope", correct: false },
      { text: "Plubble Space Telescope", correct: false },
    ],
  },
  {
    question: "Earth is located in which galaxy?",
    answers: [
      { text: "The Mars Bar Galaxy", correct: false },
      { text: "The Galaxy Galaxy", correct: false },
      { text: "The Caramel Galaxy", correct: false },
      { text: "The Milky Way Galaxy", correct: true },
    ],
  },
  {
    question: "How many planets do we have in our solar system?",
    answers: [
      { text: 5, correct: false },
      { text: 8, correct: true },
      { text: 9, correct: false },
      { text: 7, correct: false },
    ],
  },
  {
    question: "What is the force called that is holding us to the Earth?",
    answers: [
      { text: "Vader", correct: false },
      { text: "Holdem", correct: false },
      { text: "Gravity", correct: true },
      { text: "Jedi", correct: false },
    ],
  },
  {
    question: "What is the closest planet to the Earth?",
    answers: [
      { text: "Venus", correct: true },
      { text: "Mercury", correct: false },
      { text: "Pluto", correct: false },
      { text: "Jupiter", correct: false },
    ],
  },
  {
    question: "What is the coldest planet in our solar system?",
    answers: [
      { text: "Jupiter", correct: false },
      { text: "Pluto", correct: false },
      { text: "Earth", correct: false },
      { text: "Neptune", correct: true },
    ],
  },
  {
    question: "What is the largest planet?",
    answers: [
      { text: "Pluto", correct: false },
      { text: "Mars", correct: false },
      { text: "Saturn", correct: false },
      { text: "Jupiter", correct: true },
    ],
  },
  {
    question: " How many planets are there in the milky way galaxy?",
    answers: [
      { text: "100 million planets", correct: false },
      { text: "100 billion planets", correct: true },
      { text: "100 trillion planets", correct: false },
      { text: "84 planets", correct: false },
    ],
  },
  {
    question: "Which planet is farthest from the sun",
    answers: [
      { text: "Pluto", correct: true },
      { text: "Mercury", correct: false },
      { text: "Venus", correct: false },
      { text: "Neptune", correct: false },
    ],
  },
  {
    question: "Which planet has the most moons?",
    answers: [
      { text: "Jupiter", correct: false },
      { text: "Earth", correct: false },
      { text: "Saturn", correct: true },
      { text: "Mercury", correct: false },
    ],
  },
];

const instructionsPage = document.getElementById("instructions");
const quizPage = document.getElementById("quiz-box");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

questions.sort(() => Math.random() - 0.5).slice(0, 10);

let currentQuestionIndex = 0;
let score = 0;

//Starts Quiz.
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
}

//Displays Questions.
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
//Shows score at end of quiz.
function showScore() {
  resetState();
  if (score <= 6) {
    questionElement.innerHTML = `You scored ${score} out of 10! Keep practising!`;
  } else if (score <= 9) {
    questionElement.innerHTML = `You scored ${score} out of 10! Good job!`;
  } else if (score === 10) {
    questionElement.innerHTML = `You scored ${score} out of 10! We have lift off!!`;
  }
  nextButton.innerHTML = "Play Again?";
  nextButton.style.display = "block";
}

//When an answer is selected.
function selectAnswer(e) {
  const selectedBtn = e.target;
  const answerCorrect = selectedBtn.dataset.correct === "true";
  if (answerCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < 10) {
    showQuestion();
  } else {
    showScore();
  }
}
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < 10) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
