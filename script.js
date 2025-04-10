function createPlayer(name, marker) {
  return { name, marker };
}

const gameBoard = (function () {
  let board = ['', '', '', '', '', '', '', '', ''];

  return { board };
})();

const displayController = (function () {
  const getBoardContainer = document.querySelector('#boardContainer');

  const displayBoard = () => {
    let gridSize = gameBoard.board.length;
    for (let i = 0; i < gridSize; i++) {
      const newCell = document.createElement('div');
      newCell.classList.add('gameGrid', `spot${i}`);
      newCell.setAttribute('id', i);
      newCell.textContent = gameBoard.board[i];
      getBoardContainer.appendChild(newCell);
    }
  };

  const clearBoard = () => {
    while (getBoardContainer.firstChild) {
      getBoardContainer.removeChild(getBoardContainer.lastChild);
    }
  };

  displayBoard();
  return { displayBoard, clearBoard };
})();

const gameController = (function () {
  let maxTurns = 9;
  let playerOne = 'X';
  let playerTwo = 'O';
  let currentPlayer = '';
  let gameOver = false;

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

  const placeMarker = () => {
    if (maxTurns % 2 == 0) {
      currentPlayer = playerOne;
      gameBoard.board[spotPicked] = playerOne;
      console.log(playerOne);
      maxTurns--;
    } else {
      currentPlayer = playerTwo;
      gameBoard.board[spotPicked] = playerTwo;
      console.log(playerTwo);
      maxTurns--;
    }
  };

  const playGame = () => {
    const getSpot = document.querySelectorAll('.gameGrid');

    getSpot.forEach(e => {
      e.addEventListener('click', () => {
        spotPicked = e.getAttribute('id');
        if (gameBoard.board[spotPicked] == '') {
          placeMarker(spotPicked);
        }
        checkWinner();
        displayController.clearBoard;
      });
    });
  };

  playGame();
})();
