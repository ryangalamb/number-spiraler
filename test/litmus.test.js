var test = require('tape');
var lib = require('..');

test('litmus', function(t) {
  t.plan(1);
  t.ok(lib, 'the library loaded');
});
