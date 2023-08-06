"use strict";

// Variable

const choices = ["Rock", "Siccor", "Papper"];
let you;
let com;
let turn = 0;
let youScore = 0;
let comScore = 0;
let difficult = 3;
let playing = true;
let playerName;

// Elements
const playerNameEl = document.querySelector(".player-name");
const getName = document.querySelector(".get-name");
const youEl = document.querySelector(".player-img-box");
const comEl = document.querySelector(".competor-img-box");
const winEl = document.querySelector(".alert-win-img");
const loseEl = document.querySelector(".alert-lose-img");
const drawEl = document.querySelector(".alert-draw-img");
let boardList = document.querySelectorAll(".score");

// Chose difficult
const scoreBoard = document.querySelector(".score-board");
const difficultLevel = document.querySelector(".difficult-level");

// filter end game & win lose
const filterBackground = document.querySelector(".filter-background");
const filter = document.querySelector(".filter");
const filterTitleEl = document.querySelector(".filter-title");
const playerNameScoreEl = document.querySelector(".player-name-score");
const playerScoreEl = document.querySelector(".player-score");
const comScoreEl = document.querySelector(".competor-score");

// Buttons
const selectBtns = document.querySelectorAll(".select-btn");
const restartBtn = document.querySelector(".restart-btn");
const difficultBtn = document.querySelector(".difficult-btn");
const filterBtn = document.querySelector(".btn-filter");
const getNameBtn = document.querySelector(".get-name-btn");

const getNameFuntion = function () {
  const nameInput = document.getElementById("name");

  if (nameInput.checkValidity()) {
    playerName = nameInput.value;
    playerNameEl.textContent = playerName;
    getName.classList.add("hidden");
    filterBackground.classList.add("hidden");
  }
};

// Restart funtion

const restartGame = function () {
  if (turn != 0) {
    youEl.removeChild(you);
    comEl.removeChild(com);
  }
  loseEl.classList.add("hidden");
  winEl.classList.add("hidden");
  drawEl.classList.add("hidden");
  for (let i = 0; i < turn; i++) boardList[i].replaceChildren(scorePoints());
  comScore = 0;
  youScore = 0;
  turn = 0;
  playing = true;
};

// Open and Close filter

const closeFilter = function () {
  if (playerName) {
    filterBackground.classList.add("hidden");
    filter.classList.add("hidden");
    restartGame();
  }
};

const openFilter = function () {
  filterBackground.classList.remove("hidden");
  filter.classList.remove("hidden");
};

// Board Score

const selectChoices = function (value) {
  const choice = document.createElement("img");
  choice.src = `img/${value}.avif`;
  choice.id = `${value}`;
  choice.classList.add("display-img");
  return choice;
};

const scorePoints = function (type = "dot") {
  const score = document.createElement("img");
  score.src = `img/${type}.avif`;
  score.classList.add("score-img");
  return score;
};

// Change Difficulties

const addLevel = function () {
  if (difficult === 3) {
    difficult = 5;
    difficultLevel.textContent = "5️⃣";
    for (let i = 0; i < 2; i++) {
      const scoreEl = document.createElement("li");
      scoreEl.classList.add("score");
      scoreEl.append(scorePoints());
      scoreBoard.append(scoreEl);
    }
  } else if (difficult === 5) {
    difficult = 3;
    difficultLevel.textContent = "3️⃣";
    for (let i = 0; i < 2; i++) {
      scoreBoard.removeChild(scoreBoard.lastChild);
    }
  }
  restartGame();
  boardList = document.querySelectorAll(".score");
};

// Win picture

const winAlert = function () {
  drawEl.classList.add("hidden");
  loseEl.classList.add("hidden");
  winEl.classList.remove("hidden");
};

// Lose picture

const loseAlert = function () {
  winEl.classList.add("hidden");
  drawEl.classList.add("hidden");
  loseEl.classList.remove("hidden");
};

// Draw picture

const drawAlert = function () {
  winEl.classList.add("hidden");
  loseEl.classList.add("hidden");
  drawEl.classList.remove("hidden");
};

// Game logic

const logicPoint = function (com, you) {
  let getPoint = 0;
  if (com === you) {
    drawAlert();
  } else if (com === "Rock") {
    if (you === "Papper") {
      getPoint = 1;
      youScore++;
      winAlert();
    } else if (you === "Siccor") {
      getPoint = -1;

      comScore++;
      loseAlert();
    }
  } else if (com === "Papper") {
    if (you === "Siccor") {
      getPoint = 1;

      youScore++;
      winAlert();
    } else if (you === "Rock") {
      getPoint = -1;

      comScore++;
      loseAlert();
    }
  } else if (com === "Siccor") {
    if (you === "Rock") {
      getPoint = 1;

      youScore++;
      winAlert();
    } else if (you === "Papper") {
      getPoint = -1;

      comScore++;
      loseAlert();
    }
  }

  // Score board

  if (getPoint !== 0) {
    boardList[turn].replaceChildren(
      scorePoints(getPoint === 1 ? "human" : "robot")
    );
    turn++;
  }

  // End game

  if (turn === difficult) {
    playing = false;
    playerNameScoreEl.textContent = playerName;
    playerScoreEl.textContent = youScore;
    comScoreEl.textContent = comScore;
    if (youScore > comScore) {
      filterTitleEl.textContent = "You Win 🎉🎉🎉";
    } else if (comScore > youScore) {
      filterTitleEl.textContent = "You Lose 😢";
    }
    openFilter();
  }
};

// Select choice

selectBtns.forEach((button) =>
  button.addEventListener("click", function () {
    // Player
    if (playing) {
      you = selectChoices(button.id);
      youEl.replaceChildren(you);

      // Competor
      com = selectChoices(choices[Math.trunc(Math.random() * 3)]);
      comEl.replaceChildren(com);
      logicPoint(com.id, you.id);
    }
  })
);

getNameBtn.addEventListener("click", getNameFuntion);
// Restart Game
restartBtn.addEventListener("click", restartGame);
// Change difficult
difficultBtn.addEventListener("click", addLevel);
// Close filter
filterBtn.addEventListener("click", closeFilter);
filterBackground.addEventListener("click", closeFilter);
