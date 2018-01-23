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

  function placeSymbol() {
    gridSquares.forEach((square,index) => {
      square.addEventListener('click',function(){
        if(currentPlayer === player1) {
          let symbol = currentPlayer.symbol
          this.textContent = symbol;
          boardArray[index] = symbol;
          currentPlayer = player2; 
        } else {
          let symbol = currentPlayer.symbol
          this.textContent = symbol;
          boardArray[index] = symbol;
          currentPlayer = player1; 
        } 
      });
    });
  }



  

  return {placeSymbol}

}

let vlad = playerFactory('Vlad','O');
let game = gameFactory();
