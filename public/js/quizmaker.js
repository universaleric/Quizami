let startBtnEl = document.querySelector('.startBtn');
let instructEl = document.querySelector('#instructions');
let timeBtnEl = document.querySelector('.time');
let HighSBtnEl = document.querySelector('.hss');
let timerEl = document.querySelector('.timer');
let mainEl = document.querySelector('.main');
let questCreatedSetEl = document.querySelector('.questCreatedSet');

let finalScoreEl = document.querySelector('.finalScore');
let endScreenEl = document.querySelector('.endScreen');
let questContainEl = document.querySelector('.questContain');

let questInputEl = document.querySelector('.question');
let answerBtnsEl = document.getElementsByClassName('answerBtn');
let answerInputAEl = document.querySelector('#answerchoicea');
let answerInputBEl = document.querySelector('#answerchoiceb');
let answerInputCEl = document.querySelector('#answerchoicec');
let answerInputDEl = document.querySelector('#answerchoiced');
let correctRInputEl = document.querySelector('#correctR');

startBtnEl.addEventListener('click', function () {
  removeStartBtn();
  startGame();
});

function startGame() {
  questContainEl.setAttribute('style', 'display: flex');
  timerEl.textContent = 'Quiz Name';
}

function removeStartBtn() {
  startBtnEl.setAttribute('style', 'display:none');
}


function endGame() {
  questContainEl.setAttribute('style', 'display: none');
  endScreenEl.setAttribute('style', 'display: flex');
  renderHighScores();
}

HighSBtnEl.addEventListener('click', function (event) {
  event.preventDefault();
  removeStartBtn();
  endGame();
});

let highscorelog = document.querySelector('#highscorelog');
let draftList = document.querySelector('#draftlist');
let saveQuestBtnEl = document.querySelector('.saveQuest');
let finishQuizBtnEl = document.querySelector('.finishQuiz');
let playAgainBtnEl = document.querySelector('.playAgain');

let workingQuestions = [];
let numberedQuestions = [];

function renderHighScores() {
  workingQuestions.innerHTML = '';

  for (var i = 0; i < workingQuestions.length; i++) {
    var questionDraft = workingQuestions[i];
    let numberedAnswer = questionDraft.correct_response;
    let answerString;

    if ((numberedAnswer = 1)) {
      answerString = questionDraft.response_1.toString();
    } else if ((numberedAnswer = 1)) {
      answerString = questionDraft.response_1.toString();
    } else if ((numberedAnswer = 1)) {
      answerString = questionDraft.response_1.toString();
    } else if ((numberedAnswer = 4)) {
      answerString = questionDraft.response_1.toString();
    } else {
      answerString = 'You did not select a correct answer!';
    }

    var li = document.createElement('li');
    li.textContent =
      questionDraft.question;
    draftList.appendChild(li);
  }
}

finishQuizBtnEl.addEventListener('click', async function (event) {
  event.preventDefault();

  console.log(workingQuestions);
  console.log(JSON.stringify(workingQuestions));

  endGame();
  if (workingQuestions) {
    const response = await fetch(`/api/question/`, {
      method: 'POST',
      // body: JSON.stringify({question, response_1, response_2, response_3, response_4, correct_response, quiz_id}),
      body: JSON.stringify(workingQuestions),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log(response.json());
    } else {
      alert('Failed to create project');
    }
  }
});

saveQuestBtnEl.addEventListener('click', function (event) {
  event.preventDefault();

  document.getElementById('qcSet').innerHTML = '';

  let qnumber = workingQuestions.length + 1;
  let question = questInputEl.value.trim();
  let response_1 = answerInputAEl.value.trim();
  let response_2 = answerInputBEl.value.trim();
  let response_3 = answerInputCEl.value.trim();
  let response_4 = answerInputDEl.value.trim();
  let correct_response = correctRInputEl.value;
  let quiz_id = parseInt(
    document.location.pathname.split('/')[
      document.location.pathname.split('/').length - 1
    ]
  );
  // let quiz_id = 1

  workingQuestions.push({
    question,
    response_1,
    response_2,
    response_3,
    response_4,
    correct_response,
    quiz_id,
  });
  numberedQuestions.push({
    qnumber,
    question,
    response_1,
    response_2,
    response_3,
    response_4,
    correct_response,
    quiz_id,
  });

  let workingQbtns = [
    numberedQuestions.map(
      (questDraft) =>
        `<button class="questCand" id="${questDraft.qnumber}">${questDraft.qnumber}</button>`
    ),
  ];

  console.log(workingQuestions);
  console.log(numberedQuestions);

  for (let i = 0; i < workingQbtns.length; i++) {
    document.getElementById('qcSet').innerHTML += workingQbtns[i];
  }

  [...document.getElementsByClassName('qcFields')].forEach(el => el.value='')
});

const quizPagehandler = function (event) {
  event.preventDefault();

  secondsLeft = 1;
  currentQuest = 0;
  score = 0;
  endScreenEl.setAttribute('style', 'display: none');
  
  const qid = parseInt(
    document.location.pathname.split('/')[
      document.location.pathname.split('/').length - 1
    ]
  );

  document.location.replace(`/quiz/${qid}`);
};


document
.querySelector('.playAgain')
.addEventListener('click', quizPagehandler);
