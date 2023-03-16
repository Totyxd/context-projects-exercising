const Screen = require("./screen");

class Cursor {

  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.row = 0;
    this.col = 0;

    this.gridColor = 'black';
    this.cursorColor = 'yellow';
  }

  resetBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
  }

  setBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
  }

  up() {
    this.row -= 1;

    if (this.row < 0) {
      this.row = 0;
    }
  }

  down() {
    this.row += 1;

    if (this.row > 2) {
      this.row = 2;
    }
  }

  left() {
    this.col -= 1;

    if (this.col < 0) {
      this.col = 0;
    }
  }

  right() {
    this.col += 1;

    if (this.col > 2) {
      this.col = 2;
    }
  }
}


module.exports = Cursor;
