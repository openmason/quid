/**
 * quid - copyright(c) 2013 openmason.
 * MIT Licensed
 */


// dependencies
var handy    = require('handy');

// following requires are for data structure 
require('./js_cols/base');
js_cols.require('js_cols.RedBlackBag');

/**
 * constructor for Quid
 */
function Quid() {
  this.bag_ = new js_cols.RedBlackBag();
};


Quid.prototype.version = handy.getVersion();

/**
 * clone:
 *  - creates a new copy of this
 */
Quid.prototype.clone = function() {
  var copy = new Quid();
  copy.bag_ = this.bag_.clone();
  return copy;
};

/**
 * insert:
 *  - insert element to the bag
 */
Quid.prototype.insert = function(element) {
  this.bag_.insert(element);
};

/*
 * union:
 * - produces union of two Quid (bags)
 * - doesn't impact current bag
 * - returns bag that contains the intersection
 */
Quid.prototype.union = function(anotherBag) {
  var combinedBag = this.clone();
  combinedBag.bag_.insertAll(anotherBag.bag_);
  return combinedBag;
};

/*
 * intersection:
 * - produces intersection of two Quid (bags).
 */
Quid.prototype.intersection = function(anotherBag) {
  var commonBag = new Quid();
  commonBag.bag_ = this.bag_.intersection(anotherBag.bag_);
  return commonBag;
};

/*
 * return values of the bag
 */
Quid.prototype.values = function() {
  return this.bag_.getValues();
};

module.exports = Quid;

// -- EOF
