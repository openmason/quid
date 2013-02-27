var quid  = require('..');
var assert= require('assert');
var handy = require('handy');

// verify basic functions
// - constructor
// - clone
describe('basic', function() {
  before(function(done) {
    done();
  });
  describe('constructor', function() {
    it('should create a new bag', function(done) {
      var b1 = new quid();
      var b2 = new quid();
      assert.notEqual(b1,b2);
      done();
    });
  });
  describe('clone', function() {
    it('empty case', function(done) {
      var b1 = new quid();
      var b2 = new quid();
      assert.ok(handy.isArrayEqual(b1.values(),b2.values()));
      done();
    });
    it('empty case - cloned', function(done) {
      var b1 = new quid();
      var b2 = b1.clone();
      assert.ok(handy.isArrayEqual(b1.values(),b2.values()));
      done();
    });
    it('one element', function(done) {
      var b1 = new quid();
      b1.insert({a:'a', b:'b'});
      var b2 = b1.clone();
      assert.ok(handy.isArrayEqual(b1.values(),b2.values()));
      done();
    });
    it('multiple elements', function(done) {
      var b1 = new quid();
      b1.insert({a:'a', b:'b'});
      b1.insert({a:'a', b:'b'});
      b1.insert({b:'b1'});
      b1.insert({x:'x', y:'y', z:'z'});
      var b2 = b1.clone();
      assert.ok(handy.isArrayEqual(b1.values(),b2.values()));
      done();
    });
    it('update source after clone', function(done) {
      var b1 = new quid();
      b1.insert({a:'a', b:'b'});
      b1.insert({a:'a', b:'b'});
      b1.insert({b:'b1'});
      b1.insert({x:'x', y:'y', z:'z'});
      var b2 = b1.clone();
      b1.insert({n:'new element'});
      assert.ok(handy.isArrayEqual(b1.values(),b2.values())==false);
      done();
    });
    it('update copy after clone', function(done) {
      var b1 = new quid();
      b1.insert({a:'a', b:'b'});
      b1.insert({a:'a', b:'b'});
      b1.insert({b:'b1'});
      b1.insert({x:'x', y:'y', z:'z'});
      var b2 = b1.clone();
      b2.insert({n:'new element'});
      assert.ok(handy.isArrayEqual(b1.values(),b2.values())==false);
      done();
    });
  });

  // --------------------------------------
  // union, intersection and difference
  describe('union', function() {
    it('bag union, check basic union set', function(done) {
      var b1 = new quid();
      b1.insert({a:'a'});
      b1.insert({b:'b'});
      var b2 = new quid();
      b2.insert({c:'c'});
      b2.insert({d:'d'});
      assert.ok(b1.union(b2).values().length==4);
      done();
    });
    it('bag union, check union with dups', function(done) {
      var b1 = new quid();
      b1.insert({a:'a'});
      b1.insert({b:'b'});
      var b2 = new quid();
      b2.insert({c:'c'});
      b2.insert({a:'a'});
      assert.ok(b1.union(b2).values().length==4);
      done();
    });
    it('bag union, check union with double dups', function(done) {
      var b1 = new quid();
      b1.insert({a:'a'});
      b1.insert({b:'b'});
      b1.insert({a:'a'});
      var b2 = new quid();
      b2.insert({c:'c'});
      b2.insert({a:'a'});
      b2.insert({d:'d'});
      b2.insert({c:'c'});
      assert.ok(b1.union(b2).values().length==7);
      done();
    });
  });

  describe('intersection', function() {
    it('empty set', function(done) {
      var b1 = new quid();
      var b2 = new quid();
      assert.ok(b1.intersection(b2).values().length==0);
      done();
    });
    it('one with elements and another empty set', function(done) {
      var b1 = new quid();
      b1.insert({a:'a'});
      b1.insert({b:'b'});
      var b2 = new quid();
      assert.ok(b1.intersection(b2).values().length==0);
      done();
    });
    it('one common element', function(done) {
      var b1 = new quid();
      b1.insert({a:'a'});
      b1.insert({b:'b'});
      var b2 = new quid();
      b2.insert({a:'a'});
      assert.ok(b1.intersection(b2).values().length==1);
      done();
    });
    it('just a key is common, not value', function(done) {
      var b1 = new quid();
      b1.insert({a:'a'});
      b1.insert({b:'b'});
      var b2 = new quid();
      b2.insert({a:'a1'});
      assert.ok(b1.intersection(b2).values().length==0);
      done();
    });
    it('multiple values', function(done) {
      var b1 = new quid();
      b1.insert({a:'a'});
      b1.insert({b:'b'});
      b1.insert({a:'a1'});
      var b2 = new quid();
      b2.insert({a:'a'});
      b2.insert({b:'d'});
      b2.insert({a:'a1'});
      var x = b1.intersection(b2);
      assert.ok(b1.intersection(b2).values().length==2);
      done();
    });
  });


});
