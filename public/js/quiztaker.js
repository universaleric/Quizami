let startBtnEl = document.querySelector('.startBtn');
let instructEl = document.querySelector('#instructions');
let timeBtnEl = document.querySelector('.time');
let HighSBtnEl = document.querySelector('.hss');
let timerEl = document.querySelector('.timer');
let mainEl = document.querySelector('.main');

let finalScoreEl = document.querySelector('.finalScore');
let endScreenEl = document.querySelector('.endScreen');
let questContainEl = document.querySelector('.questContain');
let questEl = document.querySelector('.questionPrompt');

let answerBtnsEl = document.getElementsByClassName('answerBtn');
let answerBtnAEl = document.querySelector('#answerchoicea');
let answerBtnBEl = document.querySelector('#answerchoiceb');
let answerBtnCEl = document.querySelector('#answerchoicec');
let answerBtnDEl = document.querySelector('#answerchoiced');

let secondsLeft = 1;
let secondsPassed;
let score = 0;
let currentQuest = 0;

let questions;

questQuest();
let scoreset = [];

async function questQuest() {
  await fetch('/')
    .then((questionJSON) => questionJSON.json())
    .then((questionData) => (questions = questionData));

  // console.log(questions)
}

// console.log(questionsData)

// let questions = [
//   {
//     question: "What's my favorite color?",
//     answers: [
//       { text: 'Green', correct: false },
//       { text: 'Blue', correct: false },
//       { text: 'Red', correct: true },
//       { text: 'Black', correct: false },
//     ],
//   },
//   {
//     question: "What's my favorite band?",
//     answers: [
//       { text: 'Vampire Weekend', correct: true },
//       { text: 'The Strokes', correct: false },
//       { text: 'Glass Animals', correct: false },
//       { text: 'Bombay Bicyle Club', correct: false },
//     ],
//   },
//   {
//     question: 'What is my birthday? 🤨',
//     answers: [
//       { text: 'August 20', correct: false },
//       { text: 'August 21', correct: true },
//       { text: 'August 22', correct: false },
//       { text: 'August 24', correct: false },
//     ],
//   },
//   {
//     question: "What's my favorite food?",
//     answers: [
//       { text: 'Gyros', correct: false },
//       { text: 'Pizza', correct: false },
//       { text: 'Tacos', correct: true },
//       { text: 'Sushi', correct: false },
//     ],
//   },
//   {
//     question: "What's my dream vacation?",
//     answers: [
//       { text: 'Athens', correct: false },
//       { text: 'Iceland', correct: false },
//       { text: 'Tokyo', correct: true },
//       { text: 'Fiji', correct: false },
//     ],
//   },
//   {
//     question:
//       'Which TV Show would I pick if I could only watch one for the rest of my life?',
//     answers: [
//       { text: 'Midnight Gospel', correct: false },
//       { text: 'Game Of Thrones', correct: false },
//       { text: 'Parks and Rec', correct: true },
//       { text: 'The Office', correct: false },
//     ],
//   },
// ];

console.log(questions);

setTime();

startBtnEl.addEventListener('click', function () {
  secondsLeft = 1;
  removeStartBtn();
  timeBtnEl.setAttribute('style', 'display: flex');
  startGame();
});

function startGame() {
  questContainEl.setAttribute('style', 'display: flex');
  renderQuestions();
}

function setTime() {
  let timerInterval = setInterval(function () {
    if (secondsLeft > 0) {
      secondsLeft++;
    } else {
      endGame();
    }
    timerEl.textContent = secondsLeft + ' seconds';
  }, 1000);
  if (secondsLeft <= 0) {
    clearInterval(timerInterval);
    endGame();
    return;
  }
}

function removeStartBtn() {
  startBtnEl.setAttribute('style', 'display:none');
  //   instructEl.setAttribute("style", "display:none")
}

function renderQuestions() {
  questEl.textContent = questions[currentQuest].question;
  answerBtnAEl.textContent = questions[currentQuest].answers[0].text;
  answerBtnBEl.textContent = questions[currentQuest].answers[1].text;
  answerBtnCEl.textContent = questions[currentQuest].answers[2].text;
  answerBtnDEl.textContent = questions[currentQuest].answers[3].text;

  if (secondsLeft <= 0) {
    endGame();
  } else {
  }
  for (let i = 0; i < answerBtnsEl.length; i++) {
    let ac = questions[currentQuest].answers[i].correct;
    if (ac === true) {
      answerBtnsEl[i].classList.add('correct');
    }
  }

  answerBtnAEl.addEventListener('click', checkValidity);
  answerBtnBEl.addEventListener('click', checkValidity);
  answerBtnCEl.addEventListener('click', checkValidity);
  answerBtnDEl.addEventListener('click', checkValidity);
}

function checkValidity(chose) {
  let chosenA = chose.target;
  if (chosenA.classList.contains('correct')) {
    score++;
    console.log(score);
  } else {
    console.log(score);
    secondsLeft = secondsLeft + 10;
  }

  resetQA();
  currentQuest++;
  if (currentQuest < questions.length) {
    renderQuestions();
  } else {
    secondsPassed = secondsLeft;
    endGame();
  }
}

function resetQA() {
  if (answerBtnAEl.classList.contains('correct')) {
    answerBtnAEl.classList.remove('correct');
  }
  if (answerBtnBEl.classList.contains('correct')) {
    answerBtnBEl.classList.remove('correct');
  }
  if (answerBtnCEl.classList.contains('correct')) {
    answerBtnCEl.classList.remove('correct');
  }
  if (answerBtnDEl.classList.contains('correct')) {
    answerBtnDEl.classList.remove('correct');
  }
  return;
}

async function endGame() {
  questContainEl.setAttribute('style', 'display: none');
  endScreenEl.setAttribute('style', 'display: flex');
  timeBtnEl.setAttribute('style', 'display: hidden');

  let time = secondsPassed;
  //This must be changed to a req.session.user_id within score routes POST route.
  let user_id = 1;
  // let quiz_id = parseInt(document.location.pathname.split('/')[document.location.pathname.split('/').length-1])
  let quiz_id = 1;

  finalScoreEl.textContent =
    'Final score: ' +
    score +
    '\n Time:' +
    secondsPassed +
    '\n User name' +
    '\n Quiz name';

  scoreset.push({ quiz_id, user_id, score, time });

  console.log(scoreset);
  console.log(JSON.stringify(scoreset));

  if (scoreset) {
    const response = await fetch(`/api/score/`, {
      method: 'POST',
      // body: JSON.stringify({quiz_id, user_id, score, time),
      body: JSON.stringify(scoreset),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // document.location.replace('/profile');
      console.log(question);
    } else {
      alert('Failed to create score data');
    }
  }
}

HighSBtnEl.addEventListener('click', function (event) {
  event.preventDefault();
  secondsLeft = 0;
  removeStartBtn();
  endGame();
});

let userInput = document.querySelector('#initialsText');
let highscorelog = document.querySelector('#highscorelog');
let highscoreList = document.querySelector('#highscorelist');
let clearHSBtnEl = document.querySelector('.clearHighScores');
let saveHSBtnEl = document.querySelector('.saveHighScores');
let playAgainBtnEl = document.querySelector('.playAgain');

let highscores = [];

function renderHighScores() {
  highscoreList.innerHTML = '';

  for (var i = 0; i < highscores.length; i++) {
    var highscore = highscores[i];

    var li = document.createElement('li');
    li.textContent = highscore.userText + ' --- ' + highscore.userScore;
    highscoreList.appendChild(li);
  }
}

function storeHighscores() {
  localStorage.setItem('highscores', JSON.stringify(highscores));
}

saveHSBtnEl.addEventListener('click', function (event) {
  event.preventDefault();

  let userText = userInput.value.trim();
  let userScore = score;

  if (userText === '') {
    return;
  }

  highscores.push({ userText, userScore });
  userInput.value = '';

  storeHighscores();
  renderHighScores();
});

clearHSBtnEl.addEventListener('click', function (event) {
  event.preventDefault();
  highscores = [];

  renderHighScores();
});

playAgainBtnEl.addEventListener('click', function (event) {
  event.preventDefault();

  storeHighscores();
  secondsLeft = 1;
  currentQuest = 0;
  score = 0;
  endScreenEl.setAttribute('style', 'display: none');
  timeBtnEl.setAttribute('style', 'display: none');
  startBtnEl.setAttribute('style', 'display:flex');
});

function init() {
  let storedHighscores = JSON.parse(localStorage.getItem('highscores'));

  if (storedHighscores !== null) {
    highscores = storedHighscores;
  }

  renderHighScores();
}

init();
