const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);

    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    Screen.addCommand('check', 'Returs the winner, tie or false if not ended.', TTT.checkWin);
    Screen.addCommand('u', 'Moves the cursor up', this.cursor.up);
    Screen.addCommand('d', 'Moves the cursor down', this.cursor.down);
    Screen.addCommand('r', 'Moves the cursor rigth', this.cursor.right);
    Screen.addCommand('l', 'Moves the cursor left', this.cursor.left);
    Screen.addCommand('s', 'Sets the cursor at the current grid', TTT.setCursor);

    Screen.render();
  }

  static setCursor() {
    Screen.setGrid(this.cursor.row, this.cursor.col, this.playerTurn);
    if (this.playerTurn === "O") {
      this.playerTurn = "X";
    }else {
      this.playerTurn = "O";
    }

    const checkPoint = this.checkWin(this.grid);

    if (checkPoint !== false) {
      TTT.endGame(checkPoint);
    }
  }

  static checkWin(grid) {

    //Check for all possible types of win.
    const checkV = _checkVerticalWin(grid);
    if (checkV !== undefined) return checkV;

    const checkH = _checkHorizontalWin(grid);
    if (checkH !== undefined) return checkH;

    const checkD = _checkDiagonalWin(grid);
    if (checkD !== undefined) return checkD;

    const checkT = _checkTie(grid);
    if (checkT !== undefined) return checkT;

    //If the function is called and after checking every type of win there isn't any, it returns false.
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

//-------------------------------- Helper private funcs ------------------------------------------------------

function _checkVerticalWin(grid, playerO = "O", playerX = "X", countO = 0, countX = 0) {
  for (let colIdx = 0; colIdx < grid[0].length; colIdx++) {
    const col = colIdx;

    for (let rowIdx = 0; rowIdx < grid.length; rowIdx++) {
      const cell = grid[rowIdx][col];

      if (cell === playerO) {
        countO++;
      }else if (cell === playerX) {
        countX++;
      }
    }

    if (countO === 3) {
      return playerO;
    }
    else if (countX === 3) {
      return playerX;
    }else {
      countO = 0;
      countX = 0;
    }
  }
}


function _checkHorizontalWin (grid, playerO = "O", playerX = "X", countO = 0, countX = 0){
  for (let rowIdx = 0; rowIdx < grid.length; rowIdx++) {
    const row = rowIdx;

    for (let colIdx = 0; colIdx < grid[0].length; colIdx++) {
      const cell = grid[row][colIdx]

      if (cell === playerO) {
        countO++;
      }else if (cell === playerX) {
        countX++;
      }
    }

    if (countO === 3) {
      return playerO;
    }
    else if (countX === 3) {
      return playerX;
    }else {
      countO = 0;
      countX = 0;
    }
  }
}

function _checkDiagonalWin(grid, playerO = "O", playerX = "X", countO = 0, countX = 0) {
  //First check left to right diagonal.

  for (let index = 0; index < grid.length; index++) {
    const cell = grid[index][index];

    if (cell === playerO) {
      countO++;
    }else if (cell === playerX) {
      countX++;
    }
  }

  if (countO === 3) {
    return playerO;
  }
  else if (countX === 3) {
    return playerX;
  }else {
    countO = 0;
    countX = 0;
  }

  //If that kind of diagonal win hasn't occurred, check right to left.
  let colIdx = grid[0].length - 1;
  for (let rowIdx = 0; rowIdx < grid.length; rowIdx++) {
    const row = rowIdx;
    const col = colIdx;
    const cell = grid[row][col];

    if (cell === playerO) {
      countO++;
    }else if (cell === playerX) {
      countX++;
    }

    colIdx--;
  }

  if (countO === 3) {
    return playerO;
  }
  else if (countX === 3) {
    return playerX;
  }else {
    countO = 0;
    countX = 0;
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
module.exports = TTT;
