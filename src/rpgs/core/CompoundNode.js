'use strict';
import BaseNode from '../core/BaseNode';
import Utils from '../core/Utils';

let CompoundNode = (function () {

  let _children = new WeakMap();

  return class CompoundNode extends BaseNode {

    constructor(nodePool, data) {
      super(nodePool, data);
      _children.set(this, data && data.children ? data.children : []);
    }

    getData() {
      let data = super.getData();

      data.children = this.getChildren();
      return data;
    }

    addChild(childId) {
      let children = _children.get(this);

      _children.set(this, Utils.addObjectToArray(children, childId));
    }

    removeChild(index) {
      let children = _children.get(this);

      if (index >= 0 && index < children.length) {
        this.nodePool.removeNode(children[index]);
        children.splice(index, 1);
        _children.set(this, children);
      }
    }

    getChild(index) {
      let children = _children.get(this);

      return children.length > index ? children[index] : null;
    }

    getChildren() {
      return _children.get(this);
    }

    setChildIndex(childId, newIndex) {
      let children = this.getChildren();
      let len = children.length;
      let oldIndex = children.indexOf(childId);

      if (oldIndex < 0) return;
      newIndex = newIndex < 0 ? 0 : (newIndex >= len ? len - 1 : newIndex);
      children.splice(newIndex, 0, children.splice(oldIndex, 1)[0]);
    }

    dispose() {
      // console.log('dispose from CompoundNode');
      _children.get(this).map(childId => {
        this.nodePool.removeNode(childId);
      });
      _children.delete(this);
      super.dispose();
    }

  };
})();

module.exports = CompoundNode;
