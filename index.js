//Game display object
let GameDisplay = (() => {

  let boardCells = document.querySelectorAll('.grid-cell');
  let turnString = document.querySelector('.game-turn');

  const updateBoard = (board) => {
    for (i = 0; i < board.length; i++) {
      boardCells[i].innerHTML = board[i];
    }
  };

  const switchMessage = (turn) => {
    let num = 1;
    let mark = "X";

    if (turn === "2") {
      num = 2;
      mark = "O";
    }

    let baseString = `It's player ${num}'s turn. Click a cell to place an "${mark}"`
    turnString.innerText = baseString;
  };

  return { updateBoard, switchMessage };

})();

//game board object
let GameBoard = (() => {

  let boardCells = new Array(9).fill('');

  let whoWon = "";

  const checkCellFilled = index => {
    if (boardCells[index] != "") {
      return true;
    }
    else return false;
  };

  const checkBoardFilled = _ => {
    for (i = 0; i < boardCells.length; i++) {
      if (!checkCellFilled(i)) {
        return false;
      };
    }
    return true;
  }

  const modifyCell = (string, cellIndex) => {
    boardCells[cellIndex] = string;
  };

  const getCells = _ => {
    return boardCells;
  };

  const checkGameOver = _ => {
    win = false;
    let winner = "";

    let winConditions = new Array(8);
    //columns
    winConditions[0] = "036";
    winConditions[1] = "147";
    winConditions[2] = "258";

    //rows
    winConditions[3] = "012";
    winConditions[4] = "345";
    winConditions[5] = "678";

    //diagonals
    winConditions[6] = "048";
    winConditions[7] = "642";

    for (let i = 0; i < winConditions.length; i++) {
      if (
        boardCells[parseInt(winConditions[i].charAt(0))] ===
        boardCells[parseInt(winConditions[i].charAt(1))] &&
        boardCells[parseInt(winConditions[i].charAt(1))] ===
        boardCells[parseInt(winConditions[i].charAt(2))]) {
        if (boardCells[parseInt(winConditions[i].charAt(0))] === '') {
          break;
        }
        win = true;
        winner = boardCells[parseInt(winConditions[i].charAt(0))];
        whoWon = winner;
      }
    }
    return win;
  };

  const getWinner = _ => {
    return whoWon;
  };

  return { modifyCell, getCells, checkCellFilled, checkGameOver, getWinner, checkBoardFilled };

})();

//game object
let Game = (() => {

  let turn = "1";
  GameDisplay.switchMessage("1");

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

    if (GameBoard.checkCellFilled(index)) {
      window.alert("cell filled");
      return;
    }

    let mark = player1.getMark();

    if (turn === "2") {
      mark = player2.getMark();
    }

    GameBoard.modifyCell(mark, index);

    nextTurn();

    GameDisplay.switchMessage(turn);

    GameDisplay.updateBoard(GameBoard.getCells());

    if (GameBoard.checkGameOver()) {
      let winner = "Player 1";

      if (GameBoard.getWinner() === "O") {
        winner = "Player 2";
      }

      window.alert(`${winner} wins!`);
      location.reload();
    }
    else if (GameBoard.checkBoardFilled()) {
      window.alert('It\'s a tie!');
      location.reload();
    }

  };

  return { nextTurn, getTurn, fillCell };

})();


//player object factory
function player(name, mark) {

  const getMark = _ => {
    return mark;
  };

  const getName = _ => {
    return name;
  }

  return { getMark, getName };
};


//game set-up
let cells = document.querySelectorAll('.grid-cell');

cells.forEach((element, index) => {
  element.addEventListener('click', Game.fillCell.bind(null, index));
});




