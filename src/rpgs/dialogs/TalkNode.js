'use strict';
import CompoundNode from '../core/CompoundNode';
import Prop from '../core/Prop';

let TalkNode = (function () {

  let _text = new WeakMap();

  return class TalkNode extends CompoundNode {
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

    canAddChild(type) {
      return type === 'AnswerNode';
    }

    canSetWireType(type) {
      switch (type) {
        case Prop.GOTO:
          return true;
        default: return false;
      }
    }

    dispose() {
      _text.delete(this);
      super.dispose();
    }
  };
})();
module.exports = TalkNode;