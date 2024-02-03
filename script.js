// Global Variables
let choices = ["rock", "paper", "scissors"];
let humanChoice;
let computerChoice;
let globalResult = 0;
let globalHumanResult = 0;
let globalComputerResult = 0;

let humanScoreBarElement = document.querySelector(".human-score-bar");
let computerScoreBarElement = document.querySelector(".computer-score-bar");
let humanScoreElement = document.querySelector(".human-score");
let computerScoreElement = document.querySelector(".computer-score");
let roundElement = document.querySelector(".round");
let humanChoiceElement = document.querySelector(".human-choice");
let computerChoiceElement = document.querySelector(".computer-choice");

// Helper Functions
// Generate random computer choice
function getComputerChoice() {
  return choices[Math.floor(Math.random() * 3)];
}

// Play one round and return a numerical value representing the result
function playRound(computerChoice, humanChoice) {
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
}

// Reset the page including styles and global variables
function resetToDefault() {
  globalResult = 0;
  globalHumanResult = 0;
  globalComputerResult = 0;

  humanScoreBarElement.style.flexGrow = "1";
  computerScoreBarElement.style.flexGrow = "1";
  humanScoreElement.textContent = "YOU: 0";
  computerScoreElement.textContent = "COMPUTER: 0";
  humanChoiceElement.textContent = "YOU CHOSE: ?";
  computerChoiceElement.textContent = "COMPUTER CHOSE: ?";
  // roundElement.textContent = `ROUND ${1}`;
}

// Update the round count and score bar display according to the current result
function updateGameData() {
  if (globalHumanResult || globalComputerResult) {
    humanScoreBarElement.style.flexGrow = `${globalHumanResult}`;
    computerScoreBarElement.style.flexGrow = `${globalComputerResult}`;
  }

  humanChoiceElement.textContent = `YOU CHOSE: ${humanChoice.toUpperCase()}`;
  computerChoiceElement.textContent = `COMPUTER CHOSE: ${computerChoice.toUpperCase()}`;

  humanScoreElement.textContent = `YOU: ${globalHumanResult}`;
  computerScoreElement.textContent = `COMPUTER: ${globalComputerResult}`;
}

// Click event listener and game logic
let playCardsElement = document.querySelector(".play-cards");
playCardsElement.addEventListener("click", (event) => {
  let card = event.target.closest(".play-card");
  if(!card) return;

  // Play one round
  humanChoice = card.dataset.value;
  computerChoice = getComputerChoice();
  roundResult = playRound(computerChoice, humanChoice);
  if (roundResult == 1) {
    globalHumanResult++;
  } else {
    globalComputerResult -= roundResult;
  }
  globalResult += roundResult;

  updateGameData();

  // Show the result of the game (5 rounds)
  if (globalComputerResult == 5 || globalHumanResult == 5) {
    alert(`Global Result : ${globalResult}`);
    resetToDefault();
  }
});
