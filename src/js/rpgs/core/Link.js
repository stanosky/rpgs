"use strict";
import BaseNode from '../core/BaseNode';


let Link = (function() {

  let _type = new WeakMap();
  let _output = new WeakMap();
  let _input = new WeakMap();

  return class Link extends BaseNode {
    constructor(data,rpgs){
      super(data,rpgs);
      _type.set(this,data.type);
      _input.set(this,data.input ? data.input : '');
      _output.set(this,data.output ? data.output : '');
    }

    getInp() {
      return _input.get(this);
    }

    getOut() {
      return _output.get(this);
    }

    getType() {
      return _type.get(this);
    }

    getData() {
      let data = super.getData();
      data.type = this.getType();
      data.input = this.getInp();
      data.output = this.getOut();
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
      _input.delete(this);
      _output.delete(this);
      super.dispose();
    }
  };
})();
module.exports = Link;
