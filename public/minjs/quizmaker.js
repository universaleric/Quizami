let startBtnEl = document.querySelector('.startBtn'),
  instructEl = document.querySelector('#instructions'),
  timeBtnEl = document.querySelector('.time'),
  HighSBtnEl = document.querySelector('.hss'),
  timerEl = document.querySelector('.timer'),
  mainEl = document.querySelector('.main'),
  questCreatedSetEl = document.querySelector('.questCreatedSet'),
  finalScoreEl = document.querySelector('.finalScore'),
  endScreenEl = document.querySelector('.endScreen'),
  questContainEl = document.querySelector('.questContain'),
  questInputEl = document.querySelector('.question'),
  answerBtnsEl = document.getElementsByClassName('answerBtn'),
  answerInputAEl = document.querySelector('#answerchoicea'),
  answerInputBEl = document.querySelector('#answerchoiceb'),
  answerInputCEl = document.querySelector('#answerchoicec'),
  answerInputDEl = document.querySelector('#answerchoiced'),
  correctRInputEl = document.querySelector('#correctR');
startBtnEl.addEventListener('click', function () {
  removeStartBtn(), startGame();
});
function startGame() {
  questContainEl.setAttribute('style', 'display: flex'),
    (timerEl.textContent = 'Quiz Name');
}
function removeStartBtn() {
  startBtnEl.setAttribute('style', 'display:none');
}
function endGame() {
  questContainEl.setAttribute('style', 'display: none'),
    endScreenEl.setAttribute('style', 'display: flex'),
    renderHighScores();
}
HighSBtnEl.addEventListener('click', function (a) {
  a.preventDefault(), removeStartBtn(), endGame();
});
let highscorelog = document.querySelector('#highscorelog'),
  draftList = document.querySelector('#draftlist'),
  saveQuestBtnEl = document.querySelector('.saveQuest'),
  finishQuizBtnEl = document.querySelector('.finishQuiz'),
  playAgainBtnEl = document.querySelector('.playAgain'),
  workingQuestions = [],
  numberedQuestions = [];
function renderHighScores() {
  workingQuestions.innerHTML = '';
  for (var a, b = 0; b < workingQuestions.length; b++) {
    a = workingQuestions[b];
    let d = a.correct_response;
    (d = 1)
      ? a.response_1.toString()
      : (d = 1)
      ? a.response_1.toString()
      : (d = 1)
      ? a.response_1.toString()
      : (d = 4)
      ? a.response_1.toString()
      : 'You did not select a correct answer!';
    var c = document.createElement('li');
    (c.textContent = a.question), draftList.appendChild(c);
  }
}
finishQuizBtnEl.addEventListener('click', async function (a) {
  if (
    (a.preventDefault(),
    console.log(workingQuestions),
    console.log(JSON.stringify(workingQuestions)),
    endGame(),
    workingQuestions)
  ) {
    const a = await fetch(`/api/question/`, {
      method: 'POST',
      body: JSON.stringify(workingQuestions),
      headers: { 'Content-Type': 'application/json' },
    });
    a.ok ? console.log(a.json()) : alert('Failed to create project');
  }
}),
  saveQuestBtnEl.addEventListener('click', function (a) {
    a.preventDefault(), (document.getElementById('qcSet').innerHTML = '');
    let b = workingQuestions.length + 1,
      c = questInputEl.value.trim(),
      d = answerInputAEl.value.trim(),
      e = answerInputBEl.value.trim(),
      f = answerInputCEl.value.trim(),
      g = answerInputDEl.value.trim(),
      h = correctRInputEl.value,
      i = parseInt(
        document.location.pathname.split('/')[
          document.location.pathname.split('/').length - 1
        ]
      );
    workingQuestions.push({
      question: c,
      response_1: d,
      response_2: e,
      response_3: f,
      response_4: g,
      correct_response: h,
      quiz_id: i,
    }),
      numberedQuestions.push({
        qnumber: b,
        question: c,
        response_1: d,
        response_2: e,
        response_3: f,
        response_4: g,
        correct_response: h,
        quiz_id: i,
      });
    let j = [
      numberedQuestions.map(
        (a) =>
          `<button class="questCand" id="${a.qnumber}">${a.qnumber}</button>`
      ),
    ];
    console.log(workingQuestions), console.log(numberedQuestions);
    for (let b = 0; b < j.length; b++)
      document.getElementById('qcSet').innerHTML += j[b];
    [...document.getElementsByClassName('qcFields')].forEach(
      (a) => (a.value = '')
    );
  });
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
