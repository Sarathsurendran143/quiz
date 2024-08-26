const startBtn = document.getElementById("startbtn");
const startContainer = document.getElementById("start-container");
const quizContainer = document.getElementById("quiz-container");
const endContainer = document.getElementById("end-container");
const summaryContainer = document.getElementById("summary-container");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("time");
const nextBtn = document.getElementById("nextbtn");
const summaryEl = document.getElementById("summary");
const viewSummaryBtn = document.getElementById("view-summary-btn");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restartbtn");

let currentQuestionIndex = 0;
let timeLeft = 30;
let timer;
let userAnswers = [];
let score = 0;

const questions = [
    {
        question: "Which country won the FIFA World Cup in 2018?",
        options: ["Brazil", "France", "Germany", "Argentina"],
        correct: 1
    },
    {
        question: "In which sport would you perform a slam dunk?",
        options: ["Basketball", "Tennis", "Volleyball", "Cricket"],
        correct: 0
    },
    {
        question: "Which tennis tournament is played on a grass court?",
        options: ["US Open", "French Open", "Wimbledon", "Australian Open"],
        correct: 2
    },
    {
        question: "Which NFL team won the Super Bowl in 2020?",
        options: ["New England Patriots", "Kansas City Chiefs", "San Francisco 49ers", "Green Bay Packers"],
        correct: 1
    },
    {
        question: "In what sport do players use a shuttlecock?",
        options: ["Badminton", "Squash", "Tennis", "Ping Pong"],
        correct: 0
    },
    {
        question: "Who holds the record for the most home runs in a single MLB season?",
        options: ["Barry Bonds", "Babe Ruth", "Hank Aaron", "Alex Rodriguez"],
        correct: 0
    },
    {
        question: "Which country has won the most Olympic gold medals in hockey?",
        options: ["Canada", "India", "Netherlands", "Germany"],
        correct: 1
    },
    {
        question: "Which soccer player is known as 'The King of Football'?",
        options: ["Cristiano Ronaldo", "Pele", "Lionel Messi", "Diego Maradona"],
        correct: 1
    },
    {
        question: "In which sport would you find a 'putter' and a 'driver'?",
        options: ["Golf", "Baseball", "Ice Hockey", "Rugby"],
        correct: 0
    },
    {
        question: "What is the maximum score in a single frame of bowling?",
        options: ["200", "250", "300", "400"],
        correct: 2
    },
];


startBtn.addEventListener("click", startQuiz);
function startQuiz() {
    startContainer.style.display = "none";
    quizContainer.style.display = "block";
    showQuestion();
    startTimer();
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionEl.textContent = question.question;
    optionsEl.innerHTML = "";
    nextBtn.disabled = true;

    // Animation for questions appearing
    questionEl.style.opacity = 0;
    setTimeout(() => { questionEl.style.opacity = 1; }, 100);

    question.options.forEach((option, index) => {
        const li = document.createElement("li");
        li.textContent = option;
        li.addEventListener("click", () => selectOption(index, li));
        optionsEl.appendChild(li);
    });
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Time's up!");
            selectOption(-1);
        }
    }, 1000);
}

function selectOption(index, li) {
    const previouslySelected = optionsEl.querySelector('.selected');
    if (previouslySelected) {
        previouslySelected.classList.remove('selected');
    }
    li.classList.add('selected');
    userAnswers[currentQuestionIndex] = index;
    nextBtn.disabled = false;
}

nextBtn.addEventListener("click", moveToNextQuestion);
function moveToNextQuestion() {
    const selectedOption = userAnswers[currentQuestionIndex];
    if (selectedOption === questions[currentQuestionIndex].correct) {
        score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        timeLeft = 30;
        showQuestion();
        resetTimer();
    } else {
        clearInterval(timer);
        quizContainer.style.display = "none";
        showEndScreen();
    }
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 30;
    startTimer();
}

function showEndScreen() {
    endContainer.style.display = "block";
    scoreEl.textContent = $(score) / $(questions.length);
}

viewSummaryBtn.addEventListener("click", showSummary);
function showSummary() {
    endContainer.style.display = "none";
    summaryContainer.style.display = "block";
    summaryEl.innerHTML = "";
    questions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const correctAnswer = question.correct;

        const div = document.createElement("div");
        div.innerHTML = `<p>Question: ${question.question}</p>
                         <p>Your answer: ${userAnswer >= 0 ? question.options[userAnswer] : "No answer selected"}</p>
                         <p>Correct answer: ${question.options[correctAnswer]}</p><hr>`;
        summaryEl.appendChild(div);
    });
}

restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    timeLeft = 30;
    score = 0;
    userAnswers = [];
    summaryContainer.style.display = "none";
    startContainer.style.display = "block";
});
