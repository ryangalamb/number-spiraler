var test = require('tape');
var spiraler = require('..');

var fiveByFiveGrid = 
[ [ [ 21 ], [ 22 ], [ 23 ], [ 24 ], [ 25 ] ],
  [ [ 20 ], [ 7 ], [ 8 ], [ 9 ], [ 10 ] ],
  [ [ 19 ], [ 6 ], [ 1 ], [ 2 ], [ 11 ] ],
  [ [ 18 ], [ 5 ], [ 4 ], [ 3 ], [ 12 ] ],
  [ [ 17 ], [ 16 ], [ 15 ], [ 14 ], [ 13 ] ] ];

test('5x5 grid', function(t) {
  spiraler.generateGrid(5);
  t.deepEqual(spiraler.getGrid(), fiveByFiveGrid, "grid is correct");

  spiraler.destroyGrid();
  t.equal(spiraler.getGrid(), null, "Destroyed grid is null");
  t.end();
});
