module.exports = (function() {
  "use strict";
  // private variables and functions
  var size = 10;
  var n = 1;

  var grid;
  var x, y;

  /**
   * Initialize the grid to a size x size empty grid. Also initialize x and y to
   * the starting point
   *
   * Depends on size
   */
  var initGrid = function(newSize) {
    size = newSize || size;

    grid = [];
    for (var i = 0; i < size; i++) {
      grid[i] = [];
    }

    if (size % 2 === 0) {
      x = size / 2 - 1;
      y = size / 2 - 1;
    } else {
      x = Math.floor(size / 2);
      y = Math.floor(size / 2);
    }
  }

  /**
   * Naive brute force prime checker. I will optimize this later, but for now,
   * it runs well enough.
   */
  var isPrime = function(num) { // OPTIMIZE: this runs a bunch.
    var maxPossible = Math.sqrt(num);

    for (var i = 2; i <= maxPossible; i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  }

  /**
   * Sets grid's current x and y to a two element array [num, bool], where the
   * number is the value of n, and the boolean is whether or not that value is
   * prime. Also increments n by one.
   */
  var setPoint = function() {
    var nIsPrime = isPrime(n);
    grid[x][y] = [n, nIsPrime];
    n++;
  }

  /**
   * Move in direction and place the next number there
   */
  var direction = {
    right: function(times) {
      for(var i = 0; i < times; i++) {
        setPoint();
        x++;
      }
    },
    up: function(times) {
      for(var i = 0; i < times; i++) {
        setPoint();
        y++;
      }
    },
    left: function(times) {
      for(var i = 0; i < times; i++) {
        setPoint();
        x--;
      }
    },
    down: function(times) {
      for(var i = 0; i < times; i++) {
        setPoint();
        y--;
      }
    },
  };

  /**
   * Populate the grid with a spiral of numbers. 
   */
  var populateGrid = function() {
    for (var i = 1; i < size; i++) {
      if (i % 2 === 1) {
        direction.up(i);
        direction.right(i);
      } else {
        direction.down(i);
        direction.left(i);
      }
    }
    if (size % 2 === 1) { // FIXME: cludgy
      direction.up(size);
    } else {
      direction.down(size);
    }
  }

  return {
    // public variables and functions
    getGrid: function() {
      return grid;
    },
    getSize: function() {
      return size;
    },
    initGrid: initGrid,
    populateGrid: populateGrid,
  };
})();
