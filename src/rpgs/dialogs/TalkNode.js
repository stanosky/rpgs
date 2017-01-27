'use strict';
import CompoundNode from '../core/CompoundNode';
import Plug from '../core/Plug';

let TalkNode = (function () {

  let _text = new WeakMap();

  return class TalkNode extends CompoundNode {
    constructor(data) {
      super(data);
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

    canAddChild(type) {
      return type === 'AnswerNode';
    }

    dispose() {
      _text.delete(this);
      super.dispose();
    }
  };
})();
module.exports = TalkNode;
