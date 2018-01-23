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

  function placeSymbol(player) {
    gridSquares.forEach((square,index) => {
      square.addEventListener('click',function(){
          let symbol = player.symbol
          this.textContent = symbol;
          boardArray[index] = symbol;       
      });
    });
  }
  return {placeSymbol,boardArray};

}

let vlad = playerFactory('Vlad','O');
let game = gameFactory();
