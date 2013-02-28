# Query Update Insert Delete - Data structures (quid)
Bag datastructure with QUID operations. Core capability is to provide all the relational algebra on bags.

## Operations
To create a new quid datastructure (referred as bag or quid)

    var quid = require('quid');
    var bag1 = new quid();

All the following basic operations would work on this datastructure.

   * clone() - returns a new copy of the quid
   * update??
   * insert(element) - adds element to the quid
   * delete??
   
### Core algebra
Following are the core operations

   * union(quid) - returns a new quid with union of this and quid (arg)
   * intersection(quid) - returns a new quid with intersecting elements of this and quid (arg)
   * diff(quid) ??
   
### Relational operations

   * selection ??
   * projection ??
   * distinct ??
   * sorting ??
   * grouping ??
   * aggregation ??

## References
  * js_cols - lib for datastructures (http://code.google.com/p/jscols/)

## License
  * js_cols - Apache License 
  * for rest of the stuff, please refer to LICENSE file
