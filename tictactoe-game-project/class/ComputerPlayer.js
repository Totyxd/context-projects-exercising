class ComputerPlayer {

    static getValidMoves(grid) {
        const newGrid = [];
        for (let index = 0; index < grid.length; index++) {
            const row = index;

            for (let col = 0; col < grid[0].length; col++) {
                const cell = grid[row][col];

                if (cell === " ") {
                    newGrid.push({ row: row, col: col });
                };
            };
        };

        return newGrid;
    };

    static randomMove(grid) {
        const validMoves = ComputerPlayer.getValidMoves(grid);
        const randomIdx = Math.floor(Math.random() * validMoves.length);

        return validMoves[randomIdx];
    };

    static getWinningMoves(grid, symbol) {
        let gridCopy = grid.slice();
        const validMoves = ComputerPlayer.getValidMoves(gridCopy);

        for (let i = 0 ; i < validMoves.length ; i++) {
            let move = validMoves[i];
            gridCopy[move.row][move.col] = symbol;
            const win = checkWin(gridCopy);

            if (win) {
                return move;
            };

            gridCopy[move.row][move.col] = ' ';
        };
    };

    static getSmartMove(grid, symbol) {
        const checkWin = this.getWinningMoves(grid, symbol);
        if (checkWin !== undefined) return checkWin;

        const checkBlock = this.getWinningMoves(grid, "O");
        if (checkBlock !== undefined) return checkBlock;
    };

}

module.exports = ComputerPlayer;


// Had to copy manually in here all helper funcs from ttt.js or otherwise game wouldn't work from console. Could look into it in the future.

function checkWin(grid) {

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
