const Screen = require("./screen");
const Cursor = require("./cursor");
const ComputerPlayer = require("./ComputerPlayer");

class TTT {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);
    this.cpu = new Cursor(3, 3);

    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    Screen.addCommand(`w`, `Move Up`, this.cursor.up.bind(this.cursor));
    Screen.addCommand(`s`, `Move Down`, this.cursor.down.bind(this.cursor));
    Screen.addCommand(`a`, `Move Left`, this.cursor.left.bind(this.cursor));
    Screen.addCommand(`d`, `Move Right`, this.cursor.right.bind(this.cursor));
    Screen.addCommand(`t`, `Player turn: ${this.playerTurn}`, this.playMove.bind(this));
    //Screen.addCommand("c", "After `O` moves press this key to get IA's move", this.cpuMove.bind(this));

    this.cursor.resetBackgroundColor();
    this.cursor.setBackgroundColor();

    Screen.render();
  }

  playMove() {
    if (this.playerTurn === "O"){
    const row = this.cursor.row;
    const col = this.cursor.col;
    this.grid[row][col] = this.playerTurn;
    Screen.setGrid(row, col, this.playerTurn);
    Screen.setTextColor(row, col, 'black');
    Screen.render();
    const win = TTT.checkWin(this.grid);
    if(win) {
      TTT.endGame(win);
    }
    this.playerTurn === "O"? this.playerTurn = "X" : this.playerTurn = "O";
  };

  this.cpuMove();
  Screen.render();
  };


  cpuMove() {
    if (this.playerTurn === "X") {
      const checkMove = ComputerPlayer.getSmartMove(this.grid, "X");
      if (checkMove) {
        this.cpu.row = checkMove.row;
        this.cpu.col = checkMove.col;
      }else {
        const randomMove = ComputerPlayer.randomMove(this.grid);
        this.cpu.row = randomMove.row;
        this.cpu.col = randomMove.col;
      }
      const row = this.cpu.row;
      const col = this.cpu.col;
      this.grid[row][col] = this.playerTurn;
      Screen.setGrid(row, col, this.playerTurn);
      Screen.setTextColor(row, col, 'black');
      const win = TTT.checkWin(this.grid);
      if(win) {
        TTT.endGame(win);
      }
      this.playerTurn === "X" ? this.playerTurn = "O" : this.playerTurn = "X";
    };
  };

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
