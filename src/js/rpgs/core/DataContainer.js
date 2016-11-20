"use strict";
import Utils from '../core/Utils';
import BaseObject from '../core/BaseObject';

let DataContainer = (function(){
  let _data = new WeakMap();
  let _type = new WeakMap();

  return class DataContainer {
    constructor(type,data) {
      if(BaseObject.isPrototypeOf(type)) {
        _type.set(this,type);
      } else {
        throw new Error('Wrong type of object passed. Expected ancestor of BaseObject object.');
      }
      _data.set(this,data ? data.map((d) => new type(d)) : []);
    }

    addElement(element) {
      _data.set(this,Utils.addObjectToArray(_data.get(this),element,_type.get(this)));
    }

    removeElement(id) {
      _data.set(this,Utils.removeObjectById(_data.get(this),id));
    }

    getElement(id) {
      return Utils.getObjectById(_data.get(this),id);
    }

    getElements() {
      return _data.get(this);
    }

    getData() {
      return _data.get(this).map((d) => d.getData());
    }
  };
})();
module.exports = DataContainer;
