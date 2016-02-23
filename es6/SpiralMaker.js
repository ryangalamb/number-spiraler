export default class SpiralMaker {
  constructor() {
    this.size = 10;
    this.sizeSquared = this.size * this.size;
    this.n = 1;

    this.initGrid();
  }

  initGrid(newSize) {
    this.size = newSize || this.size;
    this.grid = [];
    for (let i = 0; i < this.size; i++) {
      this.grid[i] = [];
    }

    if (this.size % 2 === 0) {
      this.x = this.size / 2 - 1;
      this.y = this.size / 2 - 1;
    } else {
      this.x = Math.floor(this.size / 2);
      this.y = Math.floor(this.size / 2);
    }
  }

  _setPoint() {
    this.grid[this.x][this.y] = this.n;
    this.n++;
  }

  _right(times) {
    for (let i = 0; i < times; i++) {
      this._setPoint();
      this.x++;
    }
  }

  _up(times) {
    for (let i = 0; i < times; i++) {
      this._setPoint();
      this.y++;
    }
  }

  _left(times) {
    for (let i = 0; i < times; i++) {
      this._setPoint();
      this.x--;
    }
  }

  _down(times) {
    for (let i = 0; i < times; i++) {
      this._setPoint();
      this.y--;
    }
  }

  /**
   * Populate the grid with a spiral of numbers. 
   */
  populateGrid() {
    for (let i = 1; i < this.size; i++) {
      if (i % 2 === 1) {
        this._up(i);
        this._right(i);
      } else {
        this._down(i);
        this._left(i);
      }
    }
    if (this.size % 2 === 1) { // FIXME: this is cludgy
      this._up(this.size);
    } else { 
      this._down(this.size);
    }
  }

  getGrid() {
    return this.grid;
  }
}
