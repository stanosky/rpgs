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

      data.children = this.getChildren().map(child => child.getId());
      return data;
    }

    setNodeAsChild(node) {
      let canSetAsChild = node !== null && this.canAddChild(node.getData().class);
      let children = _children.get(this);

      // console.log('addChild',child.getId());
      if (canSetAsChild) {
        _children.set(this, Utils.addObjectToArray(children, node.getId()));
      }
      return canSetAsChild;
    }

    canAddChild(type) {
      return true;
    }

    addChild(data) {
      let canSetAsChild = data && data.class ? this.canAddChild(data.class) : false;
      let child = canSetAsChild ? this.nodePool.addNode(data) : null;

      if (child !== null) this.setNodeAsChild(child);
      return child;
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
      let children = this.getChildren();

      return children.length > index ? children[index] : null;
    }

    getChildren() {
      let children = _children.get(this);
      let ret = [];

      if (children !== undefined) {
        ret = children.map(childId => this.nodePool.findNode(childId));
      }
      return ret;
    }

    setChildIndex(childId, newIndex) {
      let children = _children.get(this);
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
