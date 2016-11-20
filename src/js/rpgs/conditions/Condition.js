"use strict";

import BaseObject from '../core/BaseObject';
import LinkType   from '../core/LinkType';
import compiler   from '@risingstack/nx-compile';

let Condition = (function(){
  let _label = new WeakMap();
  let _code = new WeakMap();
  let _compiled = new WeakMap();
  let _sandbox = new WeakMap();

  return class Condition extends BaseObject {
    constructor(data,rpgs) {
      super(data,rpgs);
      _label.set(this,data ? data.label : '');
      _code.set(this,data ? data.code : 'return true');
      _sandbox.set(this,{rpgs});
      _compiled.set(this,compiler.compileExpression(_code.get(this), _sandbox.get(this)));
    }

    setLabel(text) {
      _label.set(this,text);
    }

    getLabel() {
      return _label.get(this);
    }

    setCode(code) {
      _code.set(this,code);
      _compiled.set(this,compiler.compileExpression(_code.get(this), _sandbox.get(this)));
    }

    getCode() {
      return _code.get(this);
    }

    check() {
      return _compiled.get(this)();
    }

    getData() {
      let data = super.getData();
      data.label = this.getLabel();
      data.code = this.getCode();
      return data;
    }

    canCreateOutputConnection(type) {
      switch (type) {
        case LinkType.VISIBILITY:
        case LinkType.ACTIVITY:
        return true;
        default: return false;
      }
    }

    setInputConnection(type,linkId) {}
    getInputConnections(type) {}
    removeInputConnection(type,linkId) {}

    dispose() {
      _label.delete(this);
      _code.delete(this);
      _sandbox.delete(this);
      _compiled.delete(this);
      super.dispose();
    }

  };
})();
