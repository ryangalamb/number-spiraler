module.exports = (function() {
  "use strict";
  // private variables and functions
  var size = null;
  var n = 1;

  var grid = null;
  var x = null,
      y = null;

  /**
   * Initialize the grid to a size x size empty grid. Also initialize x and y to
   * the starting point
   *
   * Depends on size
   */
  var initGrid = function(gridSize) {
    size = gridSize;

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
   * Sets grid's current x and y to a two element array [num, ...], where the
   * number is the value of n, and the rest of the elements are "tags" that
   * identify properties of the number. Also increments n by one.
   *
   * NOTE: This implementation might get messy. Keep an eye on it as your
   * project grows.
   */
  var setPoint = function() {
    var result = [n];
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
   * Populate the initialized grid with a spiral of numbers. 
   */
  var populateGrid = function() {
    n = 1;

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

  /**
   * Generate a spiral-populated grid of the specified size and return 'this'.
   *
   * @param gridSize Number to specify both height and width of grid
   * @returns this
   */
  var generateGrid = function(gridSize) {
    initGrid(gridSize);
    populateGrid();
    return(this);
  };

  /**
   * Destroy the grid, setting grid, size, and n to null.
   *
   * @returns this
   */
  var destroyGrid = function() {
    grid = null;
    size = null;
    n = null;

    return this;
  };

  /**
   * Filter the grid with a filter function, appending the tag string if the
   * function returns true. 
   *
   * @param callback fn(num) -> bool
   * @param tag A string to be appended to the grid element if callback function
   * returns true
   *
   * @return this
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

    return this;
  };

  return {
    // public methods
    getGrid: function() {
      return grid;
    },
    getSize: function() {
      return size;
    },
    generateGrid: generateGrid,
    destroyGrid: destroyGrid,
    filterGrid: filterGrid,
  };
})();
