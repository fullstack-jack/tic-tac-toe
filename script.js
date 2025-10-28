// 1. Make board
const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const setCell = (index, symbol) => {
    if (board[index] === "") {
      board[index] = symbol;
      return true; 
    }
    return false;
  };

  const reset = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };

  // Add a function to print board neatly in console
  const printBoard = () => {
    console.log(`
      ${board[0] || " "} | ${board[1] || " "} | ${board[2] || " "}
      ---------
      ${board[3] || " "} | ${board[4] || " "} | ${board[5] || " "}
      ---------
      ${board[6] || " "} | ${board[7] || " "} | ${board[8] || " "}
    `);
  };

  return { getBoard, setCell, reset, printBoard };
})();

// 2. Player factory
const createPlayer = (name, symbol) => ({ name, symbol });

// 3. Game controller module
const gameController = (() => {
  const player1 = createPlayer("Player 1", "X");
  const player2 = createPlayer("Player 2", "O");
  let currentPlayer = player1;

  const playRound = (index) => {
    const moveMade = gameBoard.setCell(index, currentPlayer.symbol);
    if (!moveMade) {
      console.log("Cell already taken, try again.");
      return;
    }

    console.log(`${currentPlayer.name} placed ${currentPlayer.symbol} in cell ${index}`);
    gameBoard.printBoard();

    if (checkWinner(currentPlayer.symbol)) {
      console.log(`${currentPlayer.name} wins!`);
      return;
    }

    if (gameBoard.getBoard().every(cell => cell !== "")) {
      console.log("It's a draw!");
      return;
    }

    switchPlayer();
    console.log(`Next turn: ${currentPlayer.name}`);
  };

  const checkWinner = (symbol) => {
    const b = gameBoard.getBoard();
    const winningCombos = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];
    return winningCombos.some(combo =>
      combo.every(i => b[i] === symbol)
    );
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const getCurrentPlayer = () => currentPlayer;

  const resetGame = () => {
    gameBoard.reset();
    currentPlayer = player1;
    console.log("Game reset!");
    gameBoard.printBoard();
  };

  return { playRound, getCurrentPlayer, resetGame };
})();

// 4. Test in the console:
gameController.resetGame();
gameController.playRound(0);
gameController.playRound(1);
gameController.playRound(4);
gameController.playRound(2);
gameController.playRound(8);



// 5. Once it works in the console, make an object for the DOM logic/have a function to render to the webpage 
// Clean up the interface to allow players to put in their names, include a button to start/restart the game 
// and add a display element that shows the results upon game end!
// (Your main goal here is to have as little global code as possible)


