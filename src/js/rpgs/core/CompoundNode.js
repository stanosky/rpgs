"use strict";
import BaseNode from '../core/BaseNode';
import Utils    from '../core/Utils';

let CompoundNode = (function() {
  let _children = new WeakMap();

  return class CompoundNode extends BaseNode {

    constructor(data,rpgs) {
      super(data,rpgs);
      _children.set(this,data.children ? data.children : []);
    }

    getData() {
      let data = super.getData();
      data.children = this.getChildren();
      return data;
    }

    addChild(childId) {
      let children = _children.get(this);
      _children.set(this,Utils.addObjectToArray(children,childId));
    }

    removeChild(index) {
      let children = _children.get(this);
      _children.set(this,children.splice(index,1));
    }

    getChild(index) {
      let children = _children.get(this);
      return children.length > index ? children[index] : null;
    }

    getChildren() {
      return _children.get(this);
    }

    _removeChildren(key) {
      this.removeChildrenFrom(_children.get(this),key);
    }

    dispose() {
      _children.delete(this);
      super.dispose();
    }

  }
})();
module.exports = CompoundNode;
