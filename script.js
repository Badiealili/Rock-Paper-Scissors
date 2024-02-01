// Game functionality

let choices = ["rock", "paper", "scissors"];

let getComputerChoice = function () {
  return choices[Math.floor(Math.random() * 3)];
};

let playRound = function (computerChoice, humanChoice) {
  let computerChoiceValue = choices.indexOf(computerChoice.toLowerCase());
  let humanChoiceValue = choices.indexOf(humanChoice.toLowerCase());
  let diff = humanChoiceValue - computerChoiceValue;

  let gameState;
  switch (diff) {
    case 1:
    case -2:
      gameState = 1;
      break;
    case 0:
      gameState = 0;
      break;
    default:
      gameState = -1;
      break;
  }

  return gameState;
};

// Global Variables
let humanChoice;
let computerChoice;
let numberOfRounds = 0;
let globalResult = 0;
let globalHumanResult = 0;
let globalComputerResult = 0;

// Click event listener and game logic

let playCards = document.querySelector(".play-cards");
playCards.addEventListener("click", (event) => {
  if (!event.target.classList.contains("play-card")) {
    return;
  }
  // Play one round
  humanChoice = event.target.dataset.value;
  computerChoice = getComputerChoice();
  roundResult = playRound(computerChoice, humanChoice);
  if(roundResult == 1){
    globalHumanResult++
  } else {
    globalComputerResult -= roundResult;
  }
  globalResult += roundResult;
  numberOfRounds++
  alert(
    `You chose ${humanChoice}, Computer chose ${computerChoice}, Result: ${roundResult}`
  );
  // Show the result of the game (5 rounds)
  if(numberOfRounds == 5){
    numberOfRounds = 0;
    alert(`Global Result : ${globalResult}`)
  }
});

