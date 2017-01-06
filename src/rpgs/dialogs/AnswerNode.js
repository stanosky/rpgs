'use strict';
import BaseNode from '../core/BaseNode';
import Prop from '../core/Prop';

let AnswerNode = (function () {
  // Weak maps are new feature to JavaScript. We can store private
  // object properties in key/value pairs using our instance as the key,
  // and our class can capture those key/value maps in a closure.
  let _text = new WeakMap();

  return class AnswerNode extends BaseNode {
    constructor(data, rpgs) {
      super(data, rpgs);
      _text.set(this, data.text ? data.text : '');
    }

    getData() {
      let data = super.getData();
      data.text = this.getText();
      return data;
    }

    setText(value) {
      _text.set(this, value);
    }

    getText() {
      return _text.get(this);
    }

    getTalk() {
      return this.getWires(Prop.GOTO)[0];
    }

    canSetWireType(type) {
      switch (type) {
        case Prop.VISIBILITY:
          return this.getWires(Prop.VISIBILITY).length === 0;
        case Prop.ACTIVITY:
          return this.getWires(Prop.ACTIVITY).length === 0;
        case Prop.GOTO:
          return this.getWires(Prop.GOTO).length === 0;
        default: return false;
      }
    }

    dispose() {
      _text.delete(this);
      super.dispose();
    }

  };
})();
module.exports = AnswerNode;
