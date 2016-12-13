"use strict";
import BaseObject from '../core/BaseObject';


let Link = (function() {

  let _type = new WeakMap();
  let _linkOut = new WeakMap();
  let _linkInp = new WeakMap();

  return class Link extends BaseObject {
    constructor(data,rpgs){
      super(data,rpgs);
      _type.set(this,data.type);
      _linkInp.set(this,data.linkInp);
      _linkOut.set(this,data.linkOut);
    }

    getInp() {
      return _linkInp.get(this);
    }

    getOut() {
      return _linkOut.get(this);
    }

    getType() {
      return _type.get(this);
    }

    getData() {
      let data = super.getData();
      data.type = this.getType();
      data.linkInp = this.getInp();
      data.linkOut = this.getOut();
      return data;
    }

    setOutputConnection(type,linkId) {}
    setInputConnection(type,linkId) {}
    getOutputConnections(type) {}
    getInputConnections(type) {}
    removeOutputConnection(type,linkId) {}
    removeInputConnection(type,linkId) {}

    dispose() {
      let linkInp = this.getInp();
      let linkOut = this.getOut();
      let inpObj = this.getRPGS().findNode(linkInp);
      let outObj = this.getRPGS().findNode(linkOut);
      if(inpObj) inpObj.removeInputConnection(this.getType(),linkInp);
      if(outObj) outObj.removeOutputConnection(this.getType(),linkOut);
      _type.delete(this);
      _linkInp.delete(this);
      _linkOut.delete(this);
      super.dispose();
    }
  };
})();
module.exports = Link;
