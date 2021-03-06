'use strict';
import BaseNode from '../core/BaseNode';
import Plug from '../core/Plug';



// CHANGE FROM NODE TO STATIC ELEMENT!



let ActorNode = (function () {
  // Weak maps are new feature to JavaScript. We can store private
  // object properties in key/value pairs using our instance as the key,
  // and our class can capture those key/value maps in a closure.
  let _name = new WeakMap();
  let _dialog = new WeakMap();
  // let _inventory = new WeakMap();

  return class ActorNode extends BaseNode {
    constructor(data) {
      super(data);
      _name.set(this, data && data.name ? data.name : '');
      _dialog.set(this, data && data.dialog ? data.dialog : '');
      // _inventory.set(this,data.inventory ? );
    }

    _init() {
      super._init();
      this.cm.addConnector(Plug.DIALOG,1);
    }

    getData() {
      let data = super.getData();

      data.name = this.getName();
      data.dialog = this.getDialog();
      return data;
    }

    setName(value) {
      _name.set(this, value);
    }

    getName() {
      return _name.get(this);
    }

    getDialog() {
      return _dialog.get(this);
    }

    /* getInventory() {
      return _inventory.get(this);
    }*/

    dispose() {
      _name.delete(this);
      _dialog.delete(this);
      // _inventory.delete(this);
      super.dispose();
    }

  };
})();

module.exports = ActorNode;
