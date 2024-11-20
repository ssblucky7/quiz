document.addEventListener("DOMContentLoaded", () => {
  const username = "admin";
  const password = "admin123";
  const loginForm = document.getElementById("login-form");
  const loginSection = document.getElementById("login-section");
  const dashboardSection = document.getElementById("dashboard-section");
  const addQuestionForm = document.getElementById("add-question-form");
  const questionsTableBody = document.querySelector("#questions-table tbody");
  const loginError = document.getElementById("login-error");
  const formError = document.getElementById("form-error");

  // Authenticate Admin
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputUsername = document.getElementById("username").value.trim();
    const inputPassword = document.getElementById("password").value.trim();

    if (inputUsername === username && inputPassword === password) {
      loginSection.style.display = "none";
      dashboardSection.style.display = "block";
      loadQuestions();
    } else {
      loginError.textContent = "Invalid username or password.";
    }
  });

  // Add New Question
  addQuestionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const question = document.getElementById("question").value.trim();
    const options = [
      document.getElementById("option1").value.trim(),
      document.getElementById("option2").value.trim(),
      document.getElementById("option3").value.trim(),
      document.getElementById("option4").value.trim(),
    ];
    const correct = parseInt(document.getElementById("correct").value);

    if (question && options.every((opt) => opt) && correct >= 0 && correct <= 3) {
      const newQuestion = {
        id: Date.now(),
        question,
        options,
        correct,
      };
      saveQuestion(newQuestion);
      loadQuestions();
      addQuestionForm.reset();
      formError.textContent = "";
    } else {
      formError.textContent = "Please fill out all fields correctly.";
    }
  });

  // Load Questions
  function loadQuestions() {
    const questions = getQuestions();
    questionsTableBody.innerHTML = "";
    questions.forEach((q) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${q.id}</td>
        <td>${q.question}</td>
        <td>${q.options.join(", ")}</td>
        <td>${q.options[q.correct]}</td>
        <td>
          <button onclick="editQuestion(${q.id})">Edit</button>
          <button onclick="deleteQuestion(${q.id})">Delete</button>
        </td>
      `;
      questionsTableBody.appendChild(row);
    });
  }

  // CRUD Functions
  function getQuestions() {
    return JSON.parse(localStorage.getItem("quizQuestions")) || [];
  }

  function saveQuestion(question) {
    const questions = getQuestions();
    questions.push(question);
    localStorage.setItem("quizQuestions", JSON.stringify(questions));
  }

  window.editQuestion = function (id) {
    alert("Edit functionality is a placeholder. Implement as needed!");
  };

  window.deleteQuestion = function (id) {
    const questions = getQuestions();
    const updatedQuestions = questions.filter((q) => q.id !== id);
    localStorage.setItem("quizQuestions", JSON.stringify(updatedQuestions));
    loadQuestions();
  };
});
