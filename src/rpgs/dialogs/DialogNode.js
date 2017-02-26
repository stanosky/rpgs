'use strict';
import CompoundNode from '../core/CompoundNode';

let DialogNode = (function () {

  let _start = new WeakMap();

  return class DialogNode extends CompoundNode {

    constructor(nodePool, data) {
      super(nodePool, data);
      _start.set(this, data && data.startTalk ? data.startTalk : '');
    }

    getData() {
      let data = super.getData();

      data.startTalk = this.getStartTalk();
      return data;
    }

    canAddChild(type) {
      return type === 'TalkNode';
    }

    addChild(childId) {
      super.addChild(childId);
      let children = this.getChildren();

      if (children.length === 1) this.setStartTalk(childId);
    }

    removeChild(index) {
      let child = this.getChild(index);

      if (child === this.getStartTalk()) this.setStartTalk('');
      super.removeChild(index);
    }

    setStartTalk(talkId) {
      // should only add talk nodes from internal children list
      let children = this.getChildren();
      let canAdd = children.filter(child => child === talkId)[0] !== undefined;

      if (canAdd || talkId === '') _start.set(this, talkId);
    }

    getStartTalk() {
      return _start.get(this);
    }

    dispose() {
      // console.log('dispose from DialogNode');
      _start.delete(this);
      super.dispose();
    }
  };
})();

module.exports = DialogNode;
