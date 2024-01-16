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

let game = function () {
  let finalResult = 0;
  let computerChoice;
  let humanChoice;
  for (let i = 0; i < 5; i++) {
    computerChoice = getComputerChoice();
    humanChoice = prompt("Choose one move: (rock, paper, scissors)");
    finalResult += playRound(computerChoice, humanChoice);
    alert(`Computer chose: ${computerChoice}, Current score: ${finalResult}`);
  }

  if (finalResult > 0) {
    alert("Congrats, you won!!");
  } else if (finalResult < 0) {
    alert("Too bad, you loose!");
  } else {
    alert("It's a tie!");
  }
};

game();