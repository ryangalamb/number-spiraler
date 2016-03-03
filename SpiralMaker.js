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
  var initGrid = function(gridSize) {
    size = gridSize || size;

    grid = [];
    for (var i = 0; i < size; i++) {
      grid[i] = [];
    }
    // REVIEW: consider splitting this part out into a separate function
    if (size % 2 === 0) {
      x = size / 2 - 1;
      y = size / 2 - 1;
    } else {
      x = Math.floor(size / 2);
      y = Math.floor(size / 2);
    }
  };

  /**
   * Naive brute force prime checker. I will optimize this later, but for now,
   * it runs well enough.
   */
  var isPrime = function(num) { // OPTIMIZE: this runs a bunch.
    var maxPossible = Math.sqrt(num);
    if (n === 1) {
      return false;
    }

    for (var i = 2; i <= maxPossible; i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  };

  /**
   * Sets grid's current x and y to a two element array [num, ...], where the
   * number is the value of n, and the rest of the elements are "tags" that
   * identify properties of the number. Also increments n by one.
   *
   * NOTE: This implementation might get messy. Keep an eye on it as your
   * project grows.
   */
  var setPoint = function() {
    var result = [n];
    if (isPrime(n)) {
      result[1] = "prime";
    }
    grid[x][y] = result;
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
  };

  var generateGrid = function(gridSize) {
    initGrid(gridSize);
    populateGrid();
  }

  /**
   * Filter the grid with a filter function, applying the tag string if the
   * function returns true.
   */
  var filterGrid = function(callback, tag) {
    grid.
      map(function(row) {
      return row.
        map(function(elem) {
        if (callback(elem[0])) {
          elem[elem.length] = tag;
        }
        return elem;
      });
    });
  };

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
    generateGrid: generateGrid,
    filterGrid: filterGrid,
  };
})();
