'use strict';
import CompoundNode from '../core/CompoundNode';
import Plug from '../core/Plug';



// CHANGE FROM NODE TO STATIC ELEMENT!



let DialogNode = (function () {

  let _start = new WeakMap();

  return class DialogNode extends CompoundNode {

    constructor(data) {
      super(data);
      _start.set(this, data.startTalk ? data.startTalk : '');
    }

    getData() {
      let data = super.getData();

      data.startTalk = this.getStartTalk();
      return data;
    }

    canAddChild(type) {
      return type === 'TalkNode';
    }

    setStartTalk(talkId) {
      _start.set(this, talkId);
    }

    getStartTalk() {
      return _start.get(this);
    }

    dispose() {
      _start.delete(this);
      super.dispose();
    }
  };
})();
module.exports = DialogNode;
