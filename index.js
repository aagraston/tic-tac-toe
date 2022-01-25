//game object
let Game = (() => {
  
  let turn = "1";

  //player objects
  let player1 = player("Player 1", "X");
  let player2 = player("PLayer 2", "O");

  const nextTurn = _ => {
    if (turn === "1") {
      turn = "2";
    }
    else {
      turn = "1";
    }
  };

  const getTurn = _ => {
    return turn;
  };

  const fillCell = (index) => {
    let mark = "X";

    if (turn === "2") {
      mark = "O";
    }
    
    GameBoard.modifyCell(mark, index);

    nextTurn();

    GameDisplay.modifyCell(mark, index);

  };

  return {nextTurn, getTurn, fillCell};

})();

//game board object
let GameBoard = (() => {
  
  let boardCells = new Array(9).fill('');

  const modifyCell = (string, cellIndex) => {
    boardCells[cellIndex] = string;
  }; 

  const getCells = _ => {
    return boardCells;
  };

  return {modifyCell, getCells};

})();


//Game display object
let GameDisplay = (() => {
  
  let boardCells = document.querySelectorAll('.grid-cell');

  const modifyCell = (string, cellIndex) => {
    boardCells[cellIndex].innerText = string;
  }; 

  return {modifyCell};

})();

//player object factory
function player (name, mark) {
  
  const getMark = _ => {
    return mark;
  };

  const getName = _ => {
    return name;
  }

  return {getMark, getName};
};


//game set-up
let cells = document.querySelectorAll('.grid-cell');

cells.forEach((element, index) => {
  element.addEventListener('click', Game.fillCell.bind(null, index));
});




