function createPlayer(name, marker) {
  return { name, marker };
}

const gameBoard = (function () {
  let board = ['X', 'X', 'O', 'O', 'X', 'O', 'O', 'X', 'X'];

  return { board };
})();

const displayController = (function () {
  const getBoardContainer = document.querySelector('#boardContainer');

  const displayBoard = () => {
    let gridSize = gameBoard.board.length;
    for (let i = 0; i < gridSize; i++) {
      const newCell = document.createElement('div');
      newCell.classList.add('gameGrid');
      newCell.setAttribute('id', `sq${i}`);
      newCell.textContent = gameBoard.board[i];
      getBoardContainer.appendChild(newCell);
    }
  };

  displayBoard();
  return { displayBoard };
})();

const gameController = (function () {
  let maxTurns = 9;
  let playerOne = 'X';
  let playerTwo = 'O';
  let currentPlayer = '';
  let gameOver = false;

  const getPickedSpot = () => {
    while (true) {
      let getSpot = parseInt(prompt('pick a spot: '));

      if (gameBoard.board[getSpot] == '') {
        return getSpot;
      }
    }
  };

  const checkWinner = () => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winConditions.length; i++) {
      const conditions = winConditions[i];
      const square1 = gameBoard.board[conditions[0]];
      const square2 = gameBoard.board[conditions[1]];
      const square3 = gameBoard.board[conditions[2]];

      if (square1 == '' || square2 == '' || square3 == '') {
        continue;
      } else if (square1 == square2 && square2 == square3) {
        gameOver = true;
        break;
      }
    }
    if (gameOver) {
      console.log(`Game Over!!
        ${currentPlayer} is the winner`);
    }
  };

  const playGame = () => {
    for (let i = 1; i <= maxTurns; i++) {
      let spotPicked = getPickedSpot();

      if (i % 2 == 0) {
        gameBoard.board[spotPicked] = playerOne;
        currentPlayer = playerOne;
      } else {
        gameBoard.board[spotPicked] = playerTwo;
        currentPlayer = playerTwo;
      }
      displayController.displayBoard();
      checkWinner();
      if (gameOver) {
        return;
      }
    }
  };

  // playGame();
})();
