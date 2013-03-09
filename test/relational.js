var quid  = require('..');
var assert= require('assert');
var handy = require('handy');

// relational algebra
describe('relational', function() {
  before(function(done) {
    done();
  });
  describe('projection', function() {
    it('on empty fields', function(done) {
      var b1 = new quid();
      b1.insert({a:'a', b:'b'});
      b1.insert({a:'a', b:'b'});
      b1.insert({b:'b1'});
      assert.ok(b1.projection([]).values().length==0);
      done();
    });
    it('on unknown field', function(done) {
      var b1 = new quid();
      b1.insert({a:'a', b:'b'});
      b1.insert({a:'a', b:'b'});
      b1.insert({b:'b1'});
      assert.ok(b1.projection(['c']).values().length==0);
      done();
    });
    // valid cases
    it('ask for one field - string arg', function(done) {
      var b1 = new quid();
      b1.insert({a:'a', b:'b'});
      b1.insert({a:'a', b:'b'});
      b1.insert({b:'b1'});
      assert.ok(b1.projection('b').values().length==3);
      assert.ok(b1.projection('a').values().length==2);
      done();
    });
    it('ask for fields - array arg', function(done) {
      var b1 = new quid();
      b1.insert({a:'a', b:'b'});
      b1.insert({a:'a', b:'b'});
      b1.insert({b:'b1'});
      assert.ok(b1.projection(['b']).values().length==3);
      assert.ok(b1.projection(['a', 'b']).values().length==3);
      assert.ok(b1.projection(['a', 'd']).values().length==2);
      done();
    });
    it('ask for nested level fields', function(done) {
      var b1 = new quid();
      b1.insert({a:'a', b:'b', c:{a:'c1', b:'c2'}});
      b1.insert({a:'a', b:'b', c:{a:'c11', b:'c12'}});
      b1.insert({b:'b1'});
      var p = b1.projection(['c.a']);
      assert.ok(p.values().length==0);
      p = b1.projection(['c']);
      assert.ok(p.values().length==2);
      done();
    });

  });
  describe('selection', function() {
    it('invalid condition', function(done) {
      var b1 = new quid();
      b1.insert({a:'a', b:'b'});
      b1.insert({a:'a', b:'b'});
      b1.insert({b:'b1'});
      assert.ok(b1.selection([]).values().length==0);
      done();
    });
    it('empty condition', function(done) {
      var b1 = new quid();
      b1.insert({a:'a', b:'b'});
      b1.insert({a:'a', b:'b'});
      b1.insert({b:'b1'});
      assert.ok(b1.selection(function(elem){}).values().length==0);
      done();
    });
    it('passthru condition', function(done) {
      var b1 = new quid();
      b1.insert({a:'a', b:'b'});
      b1.insert({a:'a', b:'b'});
      b1.insert({b:'b1'});
      assert.ok(b1.selection(function(elem){ return true;}).values().length==3);
      done();
    });
    it('proper filter condition', function(done) {
      var b1 = new quid();
      b1.insert({a:'a', b:'b'});
      b1.insert({a:'a', b:'b'});
      b1.insert({b:'b1'});
      assert.ok(b1.selection(function(elem){ return elem.a!='a';}).values().length==1);
      done();
    });

  });

});
