'use strict';
import CompoundNode from '../core/CompoundNode';
import Utils from '../core/Utils';

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

    setNodeAsChild(node) {
      let canSetAsChild = super.setNodeAsChild(node);
      let children = this.getChildren();

      if (canSetAsChild && children.length === 1) this.setStartTalk(node.getId());
      return canSetAsChild;
    }

    removeChild(index) {
      let child = this.getChild(index);
      let talkId = child !== null ? child.getId() : '';
      let startTalk = this.getStartTalk();

      super.removeChild(index);
      if (talkId === startTalk) {
        this.setStartTalk('');
      }
    }

    setStartTalk(talkId) {
      // should only add talk nodes from internal children list
      let children = this.getChildren();
      let childExist = Utils.getIndexById(children, talkId) > -1;

      if (childExist) {
        _start.set(this, talkId);
      } else if (children[0] !== undefined) {
        _start.set(this, children[0].getId());
      } else {
        _start.set(this, '');
      }
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
