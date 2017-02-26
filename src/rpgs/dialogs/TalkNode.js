'use strict';
import CompoundNode from '../core/CompoundNode';

let TalkNode = (function () {

  let _text = new WeakMap();

  return class TalkNode extends CompoundNode {
    constructor(nodePool, data) {
      super(nodePool, data);
      _text.set(this, data && data.text ? data.text : '');
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

    canAddChild(type) {
      return type === 'AnswerNode';
    }

    canBeWiredTo(type) {
      return type === 'goto';
    }

    dispose() {
      // console.log('dispose from TalkNode');
      _text.delete(this);
      super.dispose();
    }
  };
})();

module.exports = TalkNode;
