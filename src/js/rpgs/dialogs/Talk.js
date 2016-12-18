"use strict";
import Utils      from '../core/Utils';
import CompoundNode from '../core/CompoundNode';
import LinkType   from '../core/LinkType';

const KEY_ANSWERS = 'answers';

let Talk = (function() {

  let _text = new WeakMap();

  return class Talk extends CompoundNode {
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

    canAddChild(type) {
      return type === 'Answer';
    }

    canCreateInputConnection(type) {
      switch (type) {
        case LinkType.GOTO:
          return true;
        default: return false;
      }
    }

    setOutputConnection(type,linkId) {}
    getOutputConnections(type) {}
    removeOutputConnection(type,linkId) {}

    dispose() {
      this._removeChildren(KEY_ANSWERS);
      _text.delete(this);
      super.dispose();
    }
  };
})();
module.exports = Talk;
