"use strict";
import BaseNode from '../core/BaseNode';
import VariableType from './VariableType';

let VariableNode = (function(){
  let _value = new WeakMap();
  let _type = new WeakMap();

  function _parseBoolean(val) {
    let isBool = typeof val === VariableType.BOOLEAN;
    if(isBool) {
      return val;
    } else {
      switch(String(val).toLowerCase().trim()){
        case "true": case "yes": case "1": return true;
        case "false": case "no": case "0": case null: return false;
        default: return Boolean(val);
      }
    }
  }

  function _parseString(val) {
    return typeof val === VariableType.STRING ? val : String(val);
  }

  function _parseNumber(val) {
    return typeof val === VariableType.NUMBER ? val : parseFloat(val);
  }

  function _parseValue(val,type) {
    switch (type) {
      case VariableType.BOOLEAN:
        return _parseBoolean(val);
      case VariableType.NUMBER:
        return _parseNumber(val);
      case VariableType.STRING:
      default:
        return _parseString(val);
    }
  }

  return class VariableNode extends BaseNode {
    constructor(data,rpgs) {
      super(data,rpgs);
      _type.set(this, data.hasOwnProperty('type') ? data.type : VariableType.STRING);
      _value.set(this, data.hasOwnProperty('value') ? _parseValue(data.value,_type.get(this)) : '');
    }

    getData() {
      let data = super.getData();
      data.type = this.getType();
      data.value = this.getValue();
      return data;
    }

    setValue(val) {
      _value.set(this,_parseValue(val,_type.get(this)));
    }

    getValue() {
      return _value.get(this);
    }

    getType() {
      return _type.get(this);
    }

    canCreateInputConnection(type) {
      return false;
    }

    canCreateOutputConnection(type) {
      switch (type) {
        case LinkType.REFERENCE:
          return true;
        default: return false;
      }
    }

    dispose() {
      _value.delete(this);
      _type.delete(this);
      super.dispose();
    }
  };
})();

module.exports = VariableNode;
