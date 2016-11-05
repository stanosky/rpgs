"use strict";
import {UUID} from './Utils';

let UniqueObject = (function(){
  //Weak maps are new feature to JavaScript. We can store private
  //object properties in key/value pairs using our instance as the key,
  //and our class can capture those key/value maps in a closure.
  let _uuid = new WeakMap();

  return class UniqueObject {
    constructor(id) {
      //By default we assign Universally Unique ID
      _uuid.set(this,id||UUID.generate());
    }

    setId(value) {
      _uuid.set(this,value);
    }

    getId() {
      return _uuid.get(this);
    }
  };
})();
module.exports = UniqueObject;
