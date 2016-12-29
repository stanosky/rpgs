"use strict";
import BaseNode from '../core/BaseNode';
import LinkType   from '../core/LinkType';

let AnswerNode = (function() {
  //Weak maps are new feature to JavaScript. We can store private
  //object properties in key/value pairs using our instance as the key,
  //and our class can capture those key/value maps in a closure.
  let _text = new WeakMap();

  return class AnswerNode extends BaseNode {
    constructor(data,rpgs) {
      super(data,rpgs);
      _text.set(this,data.text ? data.text : '');
    }

    getData() {
      let data = super.getData();
      data.text = this.getText();

      return data;
    }

    setText(value) {
      _text.set(this,value);
    }

    getText() {
      return _text.get(this);
    }

    getTalk() {
      let linkId = this.getOutputConnections(LinkType.GOTO)[0];
      let linkNode = this.getRPGS().findNode(linkId);
      return linkNode ? linkNode.getInp() : null;
    }

    canCreateInputConnection(type) {
      switch (type) {
        case LinkType.VISIBILITY:
          return this.getInputConnections(LinkType.VISIBILITY).length === 0;
        case LinkType.ACTIVITY:
          return this.getInputConnections(LinkType.ACTIVITY).length === 0;
        default: return false;
      }
    }

    canCreateOutputConnection(type) {
      switch (type) {
        case LinkType.GOTO:
          return this.getOutputConnections(LinkType.GOTO).length === 0;
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
