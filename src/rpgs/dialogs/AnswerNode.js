'use strict';
import BaseNode from '../core/BaseNode';
import Plug from '../core/Plug';

let AnswerNode = (function () {
  // Weak maps are new feature to JavaScript. We can store private
  // object properties in key/value pairs using our instance as the key,
  // and our class can capture those key/value maps in a closure.
  let _text = new WeakMap();

  return class AnswerNode extends BaseNode {
    constructor(nodePool, data) {
      super(nodePool, data);
      _text.set(this, data && data.text ? data.text : '');
    }

    _init() {
      super._init();
      this.cm.addConnector(Plug.GOTO, 1);
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

    dispose() {
      // console.log('dispose from AnswerNode');
      _text.delete(this);
      super.dispose();
    }

  };
})();

module.exports = AnswerNode;
