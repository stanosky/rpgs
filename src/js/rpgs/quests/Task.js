"use strict";
import BaseObject from '../core/BaseObject';

let Task = (function(){
  return class Task extends BaseObject {
    constructor(id) {
      super(id);
    }

    //to do
  };
})();

module.exports = Task;
