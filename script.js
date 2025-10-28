// 1. Gameboard Module
const gameBoard = (() => {
  let board = Array(9).fill("");

  const getBoard = () => board;
  const setCell = (index, symbol) => {
    if (board[index] === "") {
      board[index] = symbol;
      return true;
    }
    return false;
  };
  const reset = () => board.fill("");

  return { getBoard, setCell, reset };
})();

// 2. Player Factory
const createPlayer = (name, symbol) => ({ name, symbol });

// 3. Game Controller
const gameController = (() => {
  let player1, player2, currentPlayer;
  let gameOver = false;

  const startGame = (name1, name2) => {
    player1 = createPlayer(name1 || "Player 1", "X");
    player2 = createPlayer(name2 || "Player 2", "O");
    currentPlayer = player1;
    gameBoard.reset();
    gameOver = false;
    return `${currentPlayer.name}'s turn`;
  };

  const playRound = (index) => {
    if (gameOver) return;

    const moveMade = gameBoard.setCell(index, currentPlayer.symbol);
    if (!moveMade) return;

    if (checkWinner(currentPlayer.symbol)) {
      gameOver = true;
      return `${currentPlayer.name} wins!`;
    }

    if (gameBoard.getBoard().every(cell => cell !== "")) {
      gameOver = true;
      return "It's a draw!";
    }

    switchPlayer();
    return `${currentPlayer.name}'s turn`;
  };

  const checkWinner = (symbol) => {
    const b = gameBoard.getBoard();
    const combos = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    return combos.some(combo => combo.every(i => b[i] === symbol));
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const getCurrentPlayer = () => currentPlayer;

  const resetGame = () => startGame(player1.name, player2.name);

  return { startGame, playRound, getCurrentPlayer, resetGame };
})();

// 4. Display Controller
const displayController = (() => {
  const cells = document.querySelectorAll(".cell");
  const message = document.querySelector(".message");
  const startButton = document.querySelector(".start");
  const resetButton = document.querySelector(".reset");
  const player1Input = document.querySelector("#player1");
  const player2Input = document.querySelector("#player2");

  const render = () => {
    const board = gameBoard.getBoard();
    cells.forEach((cell, i) => {
      cell.textContent = board[i];
    });
  };

  // Cell clicks
  cells.forEach((cell, i) => {
    cell.addEventListener("click", () => {
      const status = gameController.playRound(i);
      render();
      if (status) message.textContent = status;
    });
  });

  // Start button
  startButton.addEventListener("click", () => {
    const status = gameController.startGame(player1Input.value, player2Input.value);
    render();
    message.textContent = status;
  });

  // Reset button
  resetButton.addEventListener("click", () => {
    const status = gameController.resetGame();
    render();
    message.textContent = status;
  });

  return { render };
})();
