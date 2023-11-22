//Waiting for DOM to load before game starts.
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.getElementsByTagName("button");
  for (let button of buttons) {
    button.addEventListener("click", function () {
      if (this.getAttribute("data-type") === "start") {
        quizPage.classList.remove("hide");
        instructionsPage.classList.add("hide");
        btn.classList.add("hide");
        startQuiz();
      }
    });
  }
});

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

//Randomises questions.

questions.sort(() => Math.random() - 0.5).slice(0, 10);

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
  if (score <= 6) {
    questionElement.innerHTML = `You scored ${score} out of 10! Keep practising!`;
  } else if (score <= 8) {
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




// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

startQuiz();
