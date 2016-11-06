"use strict";
import {UUID} from './Utils';

let UniqueObject = (function(){
  //Weak maps are new feature to JavaScript. We can store private
  //object properties in key/value pairs using our instance as the key,
  //and our class can capture those key/value maps in a closure.
  let _uuid = new WeakMap();

  return class UniqueObject {
    constructor(data) {
      //By default we assign Universally Unique ID
      _uuid.set(this,data.uuid||UUID.generate());
    }

    setId(value) {
      _uuid.set(this,value);
    }

    getId() {
      return _uuid.get(this);
    }

    getData() {
      return {
        uuid:this.getId()
      };
    }
  };
})();
module.exports = UniqueObject;
