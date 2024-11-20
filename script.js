document.addEventListener("DOMContentLoaded", () => {
  const questionContainer = document.getElementById("question-container");
  const nextButton = document.getElementById("next-btn");
  const scoreSection = document.getElementById("score-section");
  const finalScoreElement = document.getElementById("final-score");
  const timerElement = document.getElementById("timer");

  let questions = JSON.parse(localStorage.getItem("quizQuestions")) || [];
  let currentQuestionIndex = 0;
  let score = 0;
  let timeLeft = 300;

  function startQuiz() {
    if (questions.length === 0) {
      questionContainer.innerHTML = "No questions available. Please contact the admin.";
      nextButton.style.display = "none";
      return;
    }

    showQuestion(currentQuestionIndex);
    const timerInterval = setInterval(() => {
      timeLeft--;
      updateTimer();
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endQuiz();
      }
    }, 1000);
  }

  function showQuestion(index) {
    const question = questions[index];
    questionContainer.innerHTML = `
      <p>${question.question}</p>
      ${question.options
        .map(
          (option, i) => `
        <button class="option-btn" data-index="${i}">${option}</button>
      `
        )
        .join("")}
    `;

    document.querySelectorAll(".option-btn").forEach((btn) => {
      btn.addEventListener("click", handleAnswer);
    });
  }

  function handleAnswer(e) {
    const selectedIndex = parseInt(e.target.getAttribute("data-index"));
    const correctIndex = questions[currentQuestionIndex].correct;

    if (selectedIndex === correctIndex) {
      score++;
      e.target.style.backgroundColor = "green";
    } else {
      e.target.style.backgroundColor = "red";
    }

    setTimeout(() => {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex);
      } else {
        endQuiz();
      }
    }, 1000);
  }

  function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.textContent = `Time Left: ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  function endQuiz() {
    questionContainer.style.display = "none";
    nextButton.style.display = "none";
    scoreSection.style.display = "block";
    finalScoreElement.textContent = `${score} / ${questions.length}`;
  }

  startQuiz();
});
