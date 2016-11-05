"use strict";
import UniqueObject from '../core/UniqueObject';

let Actor = (function() {
  //Weak maps are new feature to JavaScript. We can store private
  //object properties in key/value pairs using our instance as the key,
  //and our class can capture those key/value maps in a closure.
  let _name = new WeakMap();
  let _dialog = new WeakMap();
  let _inventory = new WeakMap();

  return class Actor extends UniqueObject {
    constructor(id) {
      super(id);
      _name.set(this,'');
      _dialog.set(this,null);
      _inventory.set(this,null);
    }

    setName(value) {
      _name.set(this,value);
    }

    getName() {
      return _name.get(this);
    }

    setDialog(dialog) {
      _dialog.set(this,dialog);
    }

    getDialog() {
      return _dialog.get(this);
    }

    setInventory(inventory) {
      _inventory.set(this,inventory);
    }

    getInventory() {
      return _inventory.get(this);
    }

  }
})();

module.exports = Actor;
