'use strict';
import BaseNode from '../core/BaseNode';
import compiler from '@risingstack/nx-compile';

let ScriptNode = (function () {

  let _label = new WeakMap();
  let _script = new WeakMap();
  let _compiled = new WeakMap();

  return class ScriptNode extends BaseNode {
    constructor(data) {
      super(data);
      _label.set(this, data.label ? data.label : '');
      _script.set(this, data.script ? data.script : `return true;`);
      compiler.expose('console');
      _compiled.set(this, compiler.compileCode(_script.get(this)));
    }

    setLabel(text) {
      _label.set(this, text);
    }

    getLabel() {
      return _label.get(this);
    }

    setScript(script) {
      _script.set(this, script);
      _compiled.set(this, compiler.compileCode(_script.get(this)));
    }

    getScript() {
      return _script.get(this);
    }

    execute(api) {
      return _compiled.get(this)(api);
    }

    getData() {
      let data = super.getData();
      data.label = this.getLabel();
      data.script = this.getScript();
      return data;
    }

    setWire(type, linkId) {}
    getWires(type) {}
    removeWire(type, linkId) {}

    dispose() {
      _label.delete(this);
      _script.delete(this);
      _compiled.delete(this);
      super.dispose();
    }

  };
})();
module.exports = ScriptNode;
