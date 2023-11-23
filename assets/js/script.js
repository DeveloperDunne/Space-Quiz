//Waiting for DOM to load before game starts.
document.addEventListener("DOMContentLoaded", function () {
  setUp();
});

//Elements grabbed for manipulation.
const buttons = document.getElementsByTagName("button");
const instructionsPage = document.getElementById("instructions");
const quizPage = document.getElementById("quiz-box");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const modal = document.getElementById("myModal");
const btn = document.getElementById("play");
const span = document.getElementsByClassName("close")[0];

let currentQuestionIndex = 0;
let score = 0;

//Listens for start button to be clicked to begin quiz.
function setUp() {
  for (let button of buttons) {
    button.addEventListener("click", function () {
      if (this.getAttribute("data-type") === "start") {
        hideInfo();
        shuffle();
        startQuiz();
      }
    });
  }
}
//Modal (Scourced form W3 Schools).
btn.onclick = function () {
  modal.style.display = "block";
};
span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

//Randomises questions.
function shuffle() {
  questions.sort(() => Math.random() - 0.5).slice(0, 10);
}

//Hides play button and instructions page when quiz starts.
function hideInfo() {
  quizPage.classList.remove("hide");
  instructionsPage.classList.add("hide");
  btn.classList.add("hide");
}

//Starts Quiz.
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
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
 if (score === 10) {
   questionElement.innerHTML = `You scored ${score} out of 10! We have lift off!!`;
 } else if (score >= 7) {
   questionElement.innerHTML = `You scored ${score} out of 10! So close yet so far.`;
 } else if (score >= 5) {
   questionElement.innerHTML = `You scored ${score} out of 10! Keep practising.`;
 } else {
   questionElement.innerHTML = `You scored ${score} out of 10! It's back to base for you.`;
 }
  nextButton.innerHTML = "Play Again?";
  nextButton.style.display = "block";
  shuffle();
}

//Addes to score if answer is correct.
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

//Runs through questions up to 10 then shows score.
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