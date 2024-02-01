// Global Variables
let choices = ["rock", "paper", "scissors"];
let humanChoice;
let computerChoice;
let numberOfRounds = 0;
let globalResult = 0;
let globalHumanResult = 0;
let globalComputerResult = 0;

let humanScoreElement = document.querySelector(".human-score");
let computerScoreElement = document.querySelector(".computer-score");

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
  numberOfRounds = 0;
  globalResult = 0;
  globalHumanResult = 0;
  globalComputerResult = 0;

  humanScoreElement.style.flexGrow = "1";
  computerScoreElement.style.flexGrow = "1";
}

// Update the score bar display according to the current result
function updateScoreDisplay() {
  humanScoreElement.style.flexGrow = `${globalHumanResult}`;
  computerScoreElement.style.flexGrow = `${globalComputerResult}`;
  humanScoreElement.querySelector('p').textContent = `YOU: ${globalHumanResult}`;
  computerScoreElement.querySelector('p').textContent = `COMPUTER: ${globalComputerResult}`;
}

// Click event listener and game logic
let playCardsElement = document.querySelector(".play-cards");
playCardsElement.addEventListener("click", (event) => {
  if (!event.target.classList.contains("play-card")) {
    return;
  }
  // Play one round
  humanChoice = event.target.dataset.value;
  computerChoice = getComputerChoice();
  roundResult = playRound(computerChoice, humanChoice);
  if (roundResult == 1) {
    globalHumanResult++;
  } else {
    globalComputerResult -= roundResult;
  }
  globalResult += roundResult;
  numberOfRounds++;
  alert(
    `You chose ${humanChoice}, Computer chose ${computerChoice}, Result: ${roundResult}`
  );
  // Show the result of the game (5 rounds)
  if (numberOfRounds == 5) {
    alert(`Global Result : ${globalResult}`);
    resetToDefault();
  }

  updateScoreDisplay();
});
