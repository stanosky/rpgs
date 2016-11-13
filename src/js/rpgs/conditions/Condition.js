"use strict";

import UniqueObject from '../core/UniqueObject';
import compiler from '@risingstack/nx-compile';

let Condition = (function(){
  let _label = new WeakMap();
  let _code = new WeakMap();
  let _compiled = new WeakMap();
  let _sandbox = new WeakMap();

  return class Condition extends UniqueObject {
    constructor(data,sandbox) {
      super(data);
      _label.set(this,data ? data.label : '');
      _code.set(this,data ? data.code : 'return true');
      _sandbox.set(this,sandbox||{});
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

  };
})();
