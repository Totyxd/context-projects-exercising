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

  resetBackgroundColor = () => {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
  };

  setBackgroundColor = () => {
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
  }

  left() {
    this.resetBackgroundColor();
    if (this.col > 0) this.col -= 1;
    this.setBackgroundColor();
    Screen.render();
  }

  right() {
    this.resetBackgroundColor();
    if (this.col < 6) this.col += 1;
    this.setBackgroundColor();
    Screen.render();
  }

  getCol = () => {
    return this.col;
  }
}


module.exports = Cursor;
