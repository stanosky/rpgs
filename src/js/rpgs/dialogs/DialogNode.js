"use strict";
import CompoundNode from '../core/CompoundNode';
import LinkType     from '../core/LinkType';
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
        case LinkType.DIALOG:
          return true;
        default: return false;
      }
    }

    dispose() {
      this._removeChildren(KEY_TALKS);
      _start.delete(this);
      super.dispose();
    }
  }

})();
module.exports = DialogNode;
