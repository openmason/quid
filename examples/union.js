var quid = require('..');

var bag1 = new quid();
var bag2 = new quid();

var o0 = {name:'User A', id:1234, addr:'123 street', city:'san jose'};
var o1 = {name:'B User', id:1245, addr:'345 street', city:'san jose'};
var o2 = {name:'User C', id:1266, addr:'99 avene', city:'milpitas'};
var o3 = {name:'User A', id:1276, addr:'grissly st', city:'dublin'};

bag1.insert(o0);
bag1.insert(o1);

// add elements another bag
bag2.insert(o2);
bag2.insert(o3);
bag2.insert(o1);

console.log('elements in first bag:');
console.log(bag1.values());
console.log('elements in second bag:');
console.log(bag2.values());
console.log('elements in both bags:');
console.log(bag1.union(bag2).values());
