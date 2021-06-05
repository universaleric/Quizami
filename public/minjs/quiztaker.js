let secondsPassed,
  questions,
  startBtnEl = document.querySelector('.startBtn'),
  instructEl = document.querySelector('#instructions'),
  timeBtnEl = document.querySelector('.time'),
  HighSBtnEl = document.querySelector('.hss'),
  timerEl = document.querySelector('.timer'),
  mainEl = document.querySelector('.main'),
  finalScoreEl = document.querySelector('.finalScore'),
  endScreenEl = document.querySelector('.endScreen'),
  questContainEl = document.querySelector('.questContain'),
  questEl = document.querySelector('.questionPrompt'),
  answerBtnsEl = document.getElementsByClassName('answerBtn'),
  answerBtnAEl = document.querySelector('#answerchoicea'),
  answerBtnBEl = document.querySelector('#answerchoiceb'),
  answerBtnCEl = document.querySelector('#answerchoicec'),
  answerBtnDEl = document.querySelector('#answerchoiced'),
  user_idEl = document.querySelector('#user_idNumber'),
  usernameEl = document.querySelector('#user_nameText'),
  username = usernameEl.innerHTML,
  user_id = parseInt(user_idEl.innerHTML),
  quiz_id = parseInt(
    document.location.pathname.split('/')[
      document.location.pathname.split('/').length - 1
    ]
  ),
  secondsLeft = 1,
  score = 0,
  currentQuest = 0,
  scoreset = [];
questQuest();
async function questQuest() {
  await fetch(`/api/quiztaker/${quiz_id}`)
    .then((a) => a.json())
    .then((a) => (questions = a)),
    console.log(questions);
}
console.log(questions),
  setTime(),
  startBtnEl.addEventListener('click', function () {
    (secondsLeft = 1),
      removeStartBtn(),
      timeBtnEl.setAttribute('style', 'display: flex'),
      startGame();
  });
function startGame() {
  questContainEl.setAttribute('style', 'display: flex'), renderQuestions();
}
function setTime() {
  let a = setInterval(function () {
    0 < secondsLeft ? secondsLeft++ : endGame(),
      (timerEl.textContent = secondsLeft + ' seconds');
  }, 1e3);
  if (0 >= secondsLeft) return clearInterval(a), void endGame();
}
function removeStartBtn() {
  startBtnEl.setAttribute('style', 'display:none');
}
function renderQuestions() {
  (questEl.textContent = questions[currentQuest].question),
    (answerBtnAEl.textContent = questions[currentQuest].response_1),
    (answerBtnBEl.textContent = questions[currentQuest].response_2),
    (answerBtnCEl.textContent = questions[currentQuest].response_3),
    (answerBtnDEl.textContent = questions[currentQuest].response_4),
    0 > secondsLeft && endGame();
  for (let a = 0; a < answerBtnsEl.length; a++) {
    let b = questions[currentQuest].correct_response;
    a === b - 1 && answerBtnsEl[a].classList.add('correct');
  }
  answerBtnAEl.addEventListener('click', checkValidity),
    answerBtnBEl.addEventListener('click', checkValidity),
    answerBtnCEl.addEventListener('click', checkValidity),
    answerBtnDEl.addEventListener('click', checkValidity);
}
function checkValidity(a) {
  let b = a.target;
  b.classList.contains('correct')
    ? (score++, console.log(score))
    : (console.log(score), (secondsLeft += 10)),
    resetQA(),
    currentQuest++,
    currentQuest < questions.length
      ? renderQuestions()
      : ((secondsPassed = secondsLeft), endGame());
}
function resetQA() {
  answerBtnAEl.classList.contains('correct') &&
    answerBtnAEl.classList.remove('correct'),
    answerBtnBEl.classList.contains('correct') &&
      answerBtnBEl.classList.remove('correct'),
    answerBtnCEl.classList.contains('correct') &&
      answerBtnCEl.classList.remove('correct'),
    answerBtnDEl.classList.contains('correct') &&
      answerBtnDEl.classList.remove('correct');
}
async function endGame() {
  questContainEl.setAttribute('style', 'display: none'),
    endScreenEl.setAttribute('style', 'display: flex'),
    timeBtnEl.setAttribute('style', 'display: hidden');
  let a = secondsPassed;
  if (
    ((finalScoreEl.textContent =
      'Final score: ' +
      score +
      '\n | \n Time: ' +
      secondsPassed +
      '\n | \n Username: ' +
      username +
      '\n | \n Quiz name: '),
    scoreset.push({ quiz_id, user_id, score, time: a }),
    console.log(scoreset),
    console.log(JSON.stringify(scoreset)),
    scoreset)
  ) {
    const b = await fetch(`/api/score/`, {
      method: 'POST',
      body: JSON.stringify({ quiz_id, user_id, score, time: a }),
      headers: { 'Content-Type': 'application/json' },
    });
    b.ok ? console.log('Score added') : alert('Failed to create score data');
  }
}
HighSBtnEl.addEventListener('click', function (a) {
  a.preventDefault(), (secondsLeft = 0), removeStartBtn(), endGame();
});
let userInput = document.querySelector('#initialsText'),
  highscorelog = document.querySelector('#highscorelog'),
  playAgainBtnEl = document.querySelector('.playAgain'),
  highscores = [];
const quizPagehandler = function (a) {
  a.preventDefault(),
    (secondsLeft = 1),
    (currentQuest = 0),
    (score = 0),
    endScreenEl.setAttribute('style', 'display: none');
  const b = parseInt(
    document.location.pathname.split('/')[
      document.location.pathname.split('/').length - 1
    ]
  );
  document.location.replace(`/quiz/${b}`);
};
document.querySelector('.playAgain').addEventListener('click', quizPagehandler);
