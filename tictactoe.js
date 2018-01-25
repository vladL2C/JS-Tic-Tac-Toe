function playerFactory(name, symbol) {
  return { name, symbol };
}

function gameFactory(name1, name2) {
  let boardArray = ["", "", "", "", "", "", "", "", ""];

  if (name1 === "") name1 = "player 1";
  if (name2 === "") name2 = "player 2";

  let player1 = playerFactory(name1, "X");
  let player2 = playerFactory(name2, "O");

  const gridSquares = document.querySelectorAll(".gridsquare");

  let currentPlayer = player1;
  let turnPerson = document.querySelector(".turn");
  turnPerson.textContent = currentPlayer.name + "'s" + "Turn!";
  function placeSymbol(square, index) {
    if (boardArray[index] !== "") return;
    if (currentPlayer === player1) {
      turnPerson.textContent = player2.name + "'s" + "Turn!";
      square.textContent = currentPlayer.symbol;
      boardArray[index] = currentPlayer.symbol;
      currentPlayer = player2;
    } else {
      turnPerson.textContent = player1.name + "'s" + "Turn!";
      square.textContent = currentPlayer.symbol;
      boardArray[index] = currentPlayer.symbol;
      currentPlayer = player1;
    }
  }

  const modal = document.querySelector(".modal");
  function renderNewGame() {
    boardArray = ["", "", "", "", "", "", "", "", ""];
    modal.classList.remove("is-active");
    gridSquares.forEach(square => (square.innerHTML = ""));
    currentPlayer = player1;
    turnPerson.textContent = currentPlayer.name + "'s" + "Turn!";
  }

  function winDisplay(player) {
    modal.classList.add("is-active");
    let winnerContent = document.querySelector(".thewinner");
    if (player.name) {
      winnerContent.textContent = `${player.name} is the winner!`;
    } else {
      winnerContent.textContent = `It's a Tie!`;
    }
    let restartGame = document.querySelector(".button.is-info.is-large");
    restartGame.addEventListener("click", renderNewGame);
  }

  function checkWin(board) {
    let winner = false;
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    winConditions.forEach(win => {
      if (board[win[0]] === "") return;
      if (board[win[0]] === board[win[1]] && board[win[0]] === board[win[2]]) {
        winner = true;
        if (currentPlayer === player2) {
          winDisplay(player1);
        } else {
          winDisplay(player2);
        }
      }
    });

    if (!boardArray.includes("") && winner === false) winDisplay("Tie");
  }

  function play() {
    gridSquares.forEach((square, index) => {
      square.addEventListener("click", function() {
        placeSymbol(square, index);
        checkWin(boardArray);
      });
    });
  }

  return { play };
}

const form = document.querySelector("form");
const playNow = document.querySelector(".playnow");

function initializeGame() {
  const gameBoard = document.querySelector(".gameboard");
  playNow.addEventListener("click", function() {
    gameBoard.classList.add("fade");
    let game = gameFactory(form.name1.value, form.name2.value);
    form.parentNode.removeChild(form);
    game.play();
  });
}

initializeGame();
