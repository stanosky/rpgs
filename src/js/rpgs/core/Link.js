"use strict";
import BaseObject from '../core/BaseObject';


let Link = (function() {

  let _type = new WeakMap();
  let _linkStart = new WeakMap();
  let _linkEnd = new WeakMap();

  return class Link extends BaseObject {
    constructor(data,rpgs){
      super(data,rpgs);
      _type.set(this,data.type);
      _linkStart.set(this,data.linkStart);
      _linkEnd.set(this,data.linkEnd);
    }

    getStart() {
      return _linkStart.get(this);
    }

    getEnd() {
      return _linkEnd.get(this);
    }

    getType() {
      return _type.get(this);
    }

    getData() {
      let data = super.getData();
      data.type = this.getType();
      data.linkStart = this.getStart();
      data.linkEnd = this.getEnd();
      return data;
    }

    setOutputConnection(type,linkId) {}
    setInputConnection(type,linkId) {}
    getOutputConnections(type) {}
    getInputConnections(type) {}
    removeOutputConnection(type,linkId) {}
    removeInputConnection(type,linkId) {}

    dispose() {
      let linkStart = this.getStart();
      let linkEnd = this.getEnd();
      let inputObj = this.getRPGS().findNode(linkStart);
      let outputObj = this.getRPGS().findNode(linkEnd);
      if(inputObj) inputObj.removeInputConnection(this.getType(),linkStart);
      if(outputObj) outputObj.removeOutputConnection(this.getType(),linkEnd);
      _type.delete(this);
      _linkStart.delete(this);
      _linkEnd.delete(this);
      super.dispose();
    }
  };
})();
module.exports = Link;
