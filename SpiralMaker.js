export default class SpiralMaker {
  constructor(size) {
    // TODO: validate size to make sure it's a sane number
    this.size = size || 6;
    this.sizeSquared = size * size;
    this.n = 1;

    this._initXY();
    this._initGrid();
    this._populateGrid();
  }

  _initXY() {
    if (this.size % 2 === 0) {
      this.x = this.size / 2 - 1;
      this.y = this.size / 2 - 1;
    } else {
      this.x = Math.floor(this.size / 2);
      this.y = Math.floor(this.size / 2);
    }
  }

  _initGrid() {
    this.grid = [];
    for (let i = 0; i < this.size; i++) {
      this.grid[i] = [];
    }
  }

  _right(times) {
    for (let i = 0; i < times; i++) {
      this.grid[this.x][this.y] = this.n;

      this.x = this.x + 1;
      this.n++;
    }
  }

  _up(times) {
    for (let i = 0; i < times; i++) {
      this.grid[this.x][this.y] = this.n;

      this.y = this.y + 1;
      this.n++;
    }
  }

  _left(times) {
    for (let i = 0; i < times; i++) {
      this.grid[this.x][this.y] = this.n;

      this.x = this.x - 1;
      this.n++;
    }
  }

  _down(times) {
    for (let i = 0; i < times; i++) {
      this.grid[this.x][this.y] = this.n;

      this.y = this.y - 1;
      this.n++;
    }
  }

  _populateGrid() {
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
}
