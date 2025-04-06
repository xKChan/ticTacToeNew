function createPlayer(name, marker) {
  return { name, marker };
}

const gameBoard = (function () {
  let board = ['', '', '', '', '', '', '', '', ''];

  return { board };
})();

const displayController = (function () {
  const displayBoard = () => {
    console.log(`        ${gameBoard.board[0]} | ${gameBoard.board[1]} | ${gameBoard.board[2]}
      ----------
        ${gameBoard.board[3]} | ${gameBoard.board[4]} | ${gameBoard.board[5]}
      ----------
        ${gameBoard.board[6]} | ${gameBoard.board[7]} | ${gameBoard.board[8]}`);
  };

  return { displayBoard };
})();

const gameController = (function () {
  let maxTurns = 9;
  let playerOne = 'X';
  let playerTwo = 'O';

  function playGame() {
    for (let i = 1; i <= maxTurns; i++) {
      let spotPicked = getPickedSpot();

      if (i % 2 == 0) {
        gameBoard.board[spotPicked] = playerOne;
      } else {
        gameBoard.board[spotPicked] = playerTwo;
      }
      displayController.displayBoard();

      checkWinner();
    }
  }

  function getPickedSpot() {
    while (true) {
      let getSpot = parseInt(prompt('pick a spot: '));

      if (gameBoard.board[getSpot] == '') {
        console.log('hi');
        return getSpot;
      }
    }
  }

  function checkWinner() {}

  // playGame();
})();
