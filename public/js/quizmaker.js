let startBtnEl = document.querySelector(".startBtn");
let instructEl = document.querySelector("#instructions");
let timeBtnEl = document.querySelector(".time");
let HighSBtnEl = document.querySelector(".hss");
let timerEl = document.querySelector(".timer");
let mainEl = document.querySelector(".main");

let finalScoreEl = document.querySelector(".finalScore")
let endScreenEl = document.querySelector(".endScreen")
let questContainEl = document.querySelector(".questContain")

let questInputEl = document.querySelector(".question")
let answerBtnsEl = document.getElementsByClassName("answerBtn")
let answerInputAEl = document.querySelector("#answerchoicea")
let answerInputBEl = document.querySelector("#answerchoiceb")
let answerInputCEl = document.querySelector("#answerchoicec")
let answerInputDEl = document.querySelector("#answerchoiced")
let correctRInputEl = document.querySelector("#correctR")


startBtnEl.addEventListener("click", function(){
  removeStartBtn();
  timeBtnEl.setAttribute("style", "display: flex")
  startGame();
});

function startGame() {
  questContainEl.setAttribute("style", "display: flex");
  timerEl.textContent = "Quiz Name";
}
 
function removeStartBtn() {
  startBtnEl.setAttribute("style", "display:none")
//   instructEl.setAttribute("style", "display:none")
}

// function renderQuestions(){
  
//   questEl.textContent = questions[currentQuest].question
//   answerBtnAEl.textContent = questions[currentQuest].answers[0].text
//   answerBtnBEl.textContent = questions[currentQuest].answers[1].text
//   answerBtnCEl.textContent = questions[currentQuest].answers[2].text
//   answerBtnDEl.textContent = questions[currentQuest].answers[3].text

//   if ((secondsLeft<= 0)) {
//     endGame();
//   } else {
//   }
//   for (let i = 0; i < answerBtnsEl.length; i++) {
    
//     let ac = questions[currentQuest].answers[i].correct;
//     if(ac === true){
//       answerBtnsEl[i].classList.add("correct")
//     }
//   }

//   answerBtnAEl.addEventListener("click", checkValidity)
//   answerBtnBEl.addEventListener("click", checkValidity)
//   answerBtnCEl.addEventListener("click", checkValidity)
//   answerBtnDEl.addEventListener("click", checkValidity)
// };

// function checkValidity(chose){

//   let chosenA = chose.target;
//   if (chosenA.classList.contains("correct")){
//     score++;
//   } else {   
//     secondsLeft = secondsLeft + 10;
//   };

//   resetQA();
//   currentQuest++;
//   if (currentQuest < questions.length){
//     renderQuestions();
//   } else{
//     secondsLeft = 0;
//     endGame();
//   }
  
// };

// function resetQA() {
  
//   if(answerBtnAEl.classList.contains("correct")){
//     answerBtnAEl.classList.remove("correct")    
//   }  
//   if(answerBtnBEl.classList.contains("correct")){
//     answerBtnBEl.classList.remove("correct")    
//   } 
//   if(answerBtnCEl.classList.contains("correct")){
//     answerBtnCEl.classList.remove("correct")    
//   }  
//   if (answerBtnDEl.classList.contains("correct")){
//     answerBtnDEl.classList.remove("correct")    
//   }  
//   return
// }


  
function endGame() {
  questContainEl.setAttribute("style", "display: none")
  endScreenEl.setAttribute("style", "display: flex")

  finalScoreEl.textContent = "Final score: " + score;
}

HighSBtnEl.addEventListener("click", function(event) {
  event.preventDefault();
  removeStartBtn();
  endGame();
})

let userInput = document.querySelector("#initialsText");
let highscorelog = document.querySelector("#highscorelog");
let draftList = document.querySelector("#draftlist");
let clearHSBtnEl = document.querySelector(".clearHighScores");
let saveQuestBtnEl = document.querySelector(".saveQuest");
let playAgainBtnEl = document.querySelector(".playAgain");

let workingQuestions = [];

function renderHighScores() {
  workingQuestions.innerHTML = "";

  for (var i = 0; i < workingQuestions.length; i++) {
    var questionDraft = workingQuestions[i];

    var li = document.createElement("li");
    li.textContent = questionDraft.question + " --- " + questionDraft.correct_response;
    draftList.appendChild(li);
  }
}

function storeHighscores() {

    console.log(workingQuestions)
//   localStorage.setItem("highscores", JSON.stringify(highscores));
}

saveQuestBtnEl.addEventListener("click", async function(event) {
  event.preventDefault();
  
  let question = questInputEl.value.trim();
  let response_1 = answerInputAEl.value.trim();
  let response_2 = answerInputBEl.value.trim();
  let response_3 = answerInputCEl.value.trim();
  let response_4 = answerInputDEl.value.trim();
  let correct_response = correctRInputEl.value
  // let quiz_id = parseInt(document.location.pathname.split('/')[document.location.pathname.split('/').length-1])
  let quiz_id = 1

  
  
  workingQuestions.push({question, response_1, response_2, response_3, response_4, correct_response, quiz_id});
  console.log(workingQuestions)
  
  storeHighscores();
  renderHighScores();
  if (question && response_1 && response_2 && response_3 && response_4 && correct_response && quiz_id) {
    const response = await fetch(`/api/question/`, {
      method: 'POST',
      body: JSON.stringify({question, response_1, response_2, response_3, response_4, correct_response, quiz_id}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // document.location.replace('/profile');
      console.log(question)
    } else {
      alert('Failed to create project');
    }
  }





});

clearHSBtnEl.addEventListener("click", function(event){
  event.preventDefault();
  highscores = [];
  
  renderHighScores();
  
});

playAgainBtnEl.addEventListener("click", function(event){
  event.preventDefault();
  
  storeHighscores();
  secondsLeft = 1
  currentQuest = 0;
  score = 0;
  endScreenEl.setAttribute("style", "display: none")  
  timeBtnEl.setAttribute("style", "display: none")  
  startBtnEl.setAttribute("style", "display:flex")
  
});
  
function init() {
  let storedHighscores = JSON.parse(localStorage.getItem("highscores"));
  
  if (storedHighscores !== null) {
    highscores = storedHighscores;
  }
  
  renderHighScores();
}
    
init();