"use strict";
import UniqueObject from '../core/UniqueObject';
import Dialog from '../dialogs/Dialog';

let Actor = (function() {
  //Weak maps are new feature to JavaScript. We can store private
  //object properties in key/value pairs using our instance as the key,
  //and our class can capture those key/value maps in a closure.
  let _name = new WeakMap();
  let _dialog = new WeakMap();
  //let _inventory = new WeakMap();

  let _parseDialog = function(data) {
    return data ? new Dialog(data) : null;
  };

  return class Actor extends UniqueObject {
    constructor(data) {
      super(data);
      _name.set(this,data.name||'');
      _dialog.set(this,_parseDialog(data.dialog));
      //_inventory.set(this,data.inventory ? );
    }

    getData() {
      let data = super.getData();
      data.name = this.getName();
      data.dialog = this.getDialog() ? this.getDialog().getData() : null;
      return data;
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

    /*setInventory(inventory) {
      _inventory.set(this,inventory);
    }

    getInventory() {
      return _inventory.get(this);
    }*/

  }
})();

module.exports = Actor;
