function playerFactory(name, symbol) {
  return {name, symbol};
}


function gameFactory(name1, name2) {
  let boardArray = ["","","","","","","","",""];

  let player1 = playerFactory(name1, "X");
  let player2 = playerFactory(name2, "O");


  let gridSquares = document.querySelectorAll('.gridsquare');
  function drawGameBoard() {
    gridSquares.forEach((square, index) => (square.innerHTML = boardArray[index]));
  }

  let currentPlayer = player1;

  function placeSymbol(square,index) {
        if (boardArray[index] !== "") return;
        if(currentPlayer === player1) {
          square.textContent = currentPlayer.symbol;
          boardArray[index] = currentPlayer.symbol;;
          currentPlayer = player2; 
        } else {
          square.textContent = currentPlayer.symbol;
          boardArray[index] = currentPlayer.symbol;
          currentPlayer = player1; 
        } 
  }

  let modal = document.querySelector('.modal');
  function renderNewGame() {
    boardArray = ["","","","","","","","",""];
    modal.classList.remove('is-active');
    console.log(boardArray);
    gridSquares.forEach(square => square.innerHTML = '');
    currentPlayer = player1;
  }

  
  function winDisplay(player) {
    modal.classList.add('is-active');
    let winnerContent = document.querySelector('.thewinner');
    if (player.name) { 
      winnerContent.textContent = `${player.name} is the winner!`;
    } else {
      winnerContent.textContent = `It's a Tie!`;
    } 
    let restartGame = document.querySelector('.button.is-info.is-large');
    restartGame.addEventListener('click', renderNewGame);
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

    winConditions.forEach((win) => {
      if (board[win[0]] === '') return;
      if (board[win[0]] === board[win[1]]
        && board[win[0]] === board[win[2]]) {
        winner = true;
        if (currentPlayer === player2) {
          winDisplay(player1);
        } else {
          winDisplay(player2);
        }
      }
    });

    if (!boardArray.includes('') 
        && winner === false )
      winDisplay('Tie');

  }

  function play() {
    gridSquares.forEach((square,index) => {
      square.addEventListener('click', function() {
        placeSymbol(square, index);
        checkWin(boardArray);
      });
    });

  }

  

  return {play}

}


let game = gameFactory('vlad','malika');
game.play();
