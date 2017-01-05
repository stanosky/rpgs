"use strict";
import CompoundNode from '../core/CompoundNode';
import Prop     from '../core/Prop';
import Utils        from '../core/Utils';


const KEY_TALKS = 'talks';

let DialogNode = (function() {
  let _start = new WeakMap();

  return class DialogNode extends CompoundNode {

    constructor(data,rpgs) {
      super(data,rpgs);
      _start.set(this,data.startTalk ? data.startTalk : '');
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
      _start.set(this,talkId);
    }

    getStartTalk() {
      return _start.get(this);
    }

    canSetWireType(type) {
      switch (type) {
        case Prop.VISIBILITY:
          return this.getWires(Prop.VISIBILITY).length === 0;
        case Prop.ACTIVITY:
          return this.getWires(Prop.ACTIVITY).length === 0;
        default: return false;
      }
    }

    dispose() {
      _start.delete(this);
      super.dispose();
    }
  }

})();
module.exports = DialogNode;
