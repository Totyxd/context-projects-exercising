const Screen = require("./screen");
const Cursor = require("./cursor");

class ConnectFour {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' ']]

    this.cursor = new Cursor(6, 7);

    Screen.initialize(6, 7);
    Screen.setGridlines(true);

    Screen.addCommand("a", "Move the cursor left", this.cursor.left.bind(this.cursor));
    Screen.addCommand("d", "Move the cursor right", this.cursor.right.bind(this.cursor));
    Screen.addCommand("t", "Sets the character in the chosen column if its not full.", this.setMove.bind(this));

    this.cursor.resetBackgroundColor();
    this.cursor.setBackgroundColor();

    Screen.render();
  }

  setMove() {
    const currentCol = this.cursor.getCol.call(this.cursor);
    const row = _checkForVerticalElement(this.grid, currentCol);
    if (row !== undefined) {
      this.grid[row][currentCol] = this.playerTurn;
      Screen.setGrid(row, currentCol, this.playerTurn);
      Screen.setTextColor(row, currentCol, "red");
      const win = ConnectFour.checkWin(this.grid);
      if (win) {
        ConnectFour.endGame(win);
      }
    }
    Screen.render();
    this.playerTurn === "O" ? this.playerTurn = "X" : this.playerTurn = "O";
  }

  static checkWin(grid) {
    const checkV = _checkVerticalWin(grid);
    if (checkV !== undefined) return checkV;

    const checkH = _checkHorizontalWin(grid);
    if (checkH !== undefined) return checkH;

    const checkD = _checkDiagonalWin(grid);
    if (checkD !== undefined) return checkD;

    const checkT = _checkTie(grid);
    if (checkT !== undefined) return checkT;

    return false;
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }
}

//-------------------------------- Helper private funcs ------------------------------------------------------//

function _checkVerticalWin(grid, playerO = "O", playerX = "X", countO = 0, countX = 0) {
  for (let colIdx = 0; colIdx < grid[0].length; colIdx++) {
    const col = colIdx;

    for (let rowIdx = 0; rowIdx < grid.length; rowIdx++) {
      const cell = grid[rowIdx][col];

      if (cell === playerO) {
        countO++;
        if (countO === 4) return playerO;
        countX = 0;
      }else if (cell === playerX) {
        countX++;
        if (countX === 4) return playerX;
        countO = 0;
      }else if (cell === " ") {
        countO = 0;
        countX = 0;
      }
    }
      countO = 0;
      countX = 0;
  }
}



function _checkHorizontalWin (grid, playerO = "O", playerX = "X", countO = 0, countX = 0){
  for (let rowIdx = 0; rowIdx < grid.length; rowIdx++) {
    const row = rowIdx;

    for (let colIdx = 0; colIdx < grid[0].length; colIdx++) {
      const cell = grid[row][colIdx];

      if (cell === playerO) {
        countO++;
        if (countO === 4) return playerO;
        countX = 0;
      }else if (cell === playerX) {
        countX++;
        if (countX === 4) return playerX;
        countO = 0;
      }else if (cell === " ") {
        countO = 0;
        countX = 0;
      }
    }

    countO = 0;
    countX = 0;
  }
}


function _checkDiagonalWin(grid, playerO = "O", playerX = "X") {
  const rows = grid.length;
  const cols = grid[0].length;
  const numToWin = 4;

  // Check all diagonal sequences of length 4 that start in the top row
  for (let c = 0; c <= cols - numToWin; c++) {
    for (let r = 0; r <= rows - numToWin; r++) {
      let countO = 0;
      let countX = 0;
      for (let i = 0; i < numToWin; i++) {
        const cell = grid[r + i][c + i];
        if (cell === playerO) {
          countO++;
        } else if (cell === playerX) {
          countX++;
        }
      }
      if (countO === numToWin) {
        return playerO;
      } else if (countX === numToWin) {
        return playerX;
      }
    }
  }

  // Check all diagonal sequences of length 4 that start in the bottom row
  for (let c = 0; c <= cols - numToWin; c++) {
    for (let r = numToWin - 1; r < rows; r++) {
      let countO = 0;
      let countX = 0;
      for (let i = 0; i < numToWin; i++) {
        const cell = grid[r - i][c + i];
        if (cell === playerO) {
          countO++;
        } else if (cell === playerX) {
          countX++;
        }
      }
      if (countO === numToWin) {
        return playerO;
      } else if (countX === numToWin) {
        return playerX;
      }
    }
  }
}

function _checkTie(grid) {
  for (let index = 0; index < grid.length; index++) {

    for (let j = 0; j < grid[0].length; j++) {
      const cell = grid[index][j];

      if (cell === " " || cell === ' ') {
        return undefined;
      }
    }
  }
  return "T";
}

function _checkForVerticalElement(grid, column, playerO = "O", playerX = "X") {
  const col = column;

  if (grid[5][col] === " ") return 5;
  if (grid[0][col] === playerO || grid[0][col] === playerX) console.log("Cannot set character in this column because it's full.");

  for (let rowIdx = 0; rowIdx < grid.length - 1; rowIdx++) {
    const cell = grid[rowIdx][col];
    const belowCell = grid[rowIdx + 1][col];

    if (cell === " " && (belowCell === playerX || belowCell === playerO)){
      return rowIdx;
    }
  }
}


module.exports = ConnectFour;
