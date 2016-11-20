"use strict";
import BaseObject from '../core/BaseObject';
import LinkType   from '../core/LinkType';

let Actor = (function() {
  //Weak maps are new feature to JavaScript. We can store private
  //object properties in key/value pairs using our instance as the key,
  //and our class can capture those key/value maps in a closure.
  let _name = new WeakMap();
  let _dialog = new WeakMap();
  //let _inventory = new WeakMap();


  return class Actor extends BaseObject {
    constructor(data) {
      super(data);
      _name.set(this,data ? data.name : '');
      _dialog.set(this,data ? data.dialog : '');
      //_inventory.set(this,data.inventory ? );
    }

    getData() {
      let data = super.getData();
      data.name = this.getName();
      data.dialog = this.getDialog();
      return data;
    }

    setName(value) {
      _name.set(this,value);
    }

    getName() {
      return _name.get(this);
    }

    getDialog() {
      return _dialog.get(this);
    }

    /*getInventory() {
      return _inventory.get(this);
    }*/

    canCreateInputConnection(type) {
      switch (type) {
        case LinkType.DIALOG:
          return this.getInputConnections(LinkType.DIALOG).length === 0;
        default: return false;
      }
    }

    setOutputConnection(type,linkId) {}
    getOutputConnections(type) {}
    removeOutputConnection(type,linkId) {}

    dispose() {
      _name.delete(this);
      _dialog.delete(this);
      //_inventory.delete(this);
      super.dispose();
    }

  }
})();

module.exports = Actor;
