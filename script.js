"use strict";

// Global Variables
let choices = ["rock", "paper", "scissors"];
let htmlEmojiChoices = ["&#129704;", "&#128195;", "&#9986;&#65039;"];
let humanChoice;
let computerChoice;
let roundResult;
let globalResult = 0;
let globalHumanResult = 0;
let globalComputerResult = 0;

let humanScoreBarElement = document.querySelector(".human-score-bar");
let computerScoreBarElement = document.querySelector(".computer-score-bar");
let humanScoreElement = document.querySelector(".human-score");
let computerScoreElement = document.querySelector(".computer-score");
let humanChoiceElement = document.querySelector(".human-choice");
let computerChoiceElement = document.querySelector(".computer-choice");
let overlayElement = document.querySelector(".overlay");
let resultElement = document.querySelector(".result");

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

// Update the round count and score bar display according to the current result
function updateGameData() {
  if (globalHumanResult || globalComputerResult) {
    humanScoreBarElement.style.flexGrow = `${globalHumanResult}`;
    computerScoreBarElement.style.flexGrow = `${globalComputerResult}`;
  }

  humanChoiceElement.innerHTML = htmlEmojiChoices[choices.indexOf(humanChoice)];
  computerChoiceElement.innerHTML = htmlEmojiChoices[choices.indexOf(computerChoice)];

  humanScoreElement.textContent = `${globalHumanResult}`;
  computerScoreElement.textContent = `${globalComputerResult}`;
}

// Display the game result on the screen

function displayResult(gameWon) {
  let resultText;
  if (gameWon) {
    resultText = "&#127881; YOU WON!";
  } else {
    resultText = "&#10060; YOU LOST!";
  }
  resultElement.querySelector(".result-text").innerHTML = resultText;
  overlayElement.style.display = "block";
  resultElement.style.display = "block";
}

// Reset the page including styles and global variables
function resetToDefault() {
  globalResult = 0;
  globalHumanResult = 0;
  globalComputerResult = 0;

  humanScoreBarElement.style.flexGrow = "1";
  computerScoreBarElement.style.flexGrow = "1";
  humanScoreElement.textContent = "0";
  computerScoreElement.textContent = "0";
  humanChoiceElement.textContent = "";
  computerChoiceElement.textContent = "";
  // roundElement.textContent = `ROUND ${1}`;
}

// Click event listener and game logic
let playCardsElement = document.querySelector(".play-cards");
playCardsElement.addEventListener("click", (event) => {
  let card = event.target.closest(".play-card");
  if (!card) return;

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

  // Show the result of the game (First to 5)
  if (globalComputerResult == 5 || globalHumanResult == 5) {
    displayResult(globalResult > 0);
  }
});

// Click event listener to replay another game
let replayButtonElement = resultElement.querySelector(".replay-btn");
replayButtonElement.addEventListener("click", () => {
  resetToDefault();
  overlayElement.style.display = "none";
  resultElement.style.display = "none";
});
