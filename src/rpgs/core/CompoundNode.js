'use strict';
import BaseNode from '../core/BaseNode';
import Utils from '../core/Utils';

let CompoundNode = (function () {

  let _children = new WeakMap();

  return class CompoundNode extends BaseNode {

    constructor(data,rpgs) {
      super(data,rpgs);
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

      if(index >= 0 && index < children.length) {
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

    dispose() {
      if(this.rpgs) {
        _children.get(this).map(childId => {
          let nodeObj = this.rpgs.findNode(childId);
          if(nodeObj !== null) nodeObj.dispose();
        });
      }
      _children.delete(this);
      super.dispose();
    }

  };
})();
module.exports = CompoundNode;
