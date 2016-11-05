"use strict";
import UniqueObject from './UniqueObject';

let BaseObject = (function(id) {
  //Weak maps are new feature to JavaScript. We can store private
  //object properties in key/value pairs using our instance as the key,
  //and our class can capture those key/value maps in a closure.
  let _visible = new WeakMap();
  let _active = new WeakMap();

  return class BaseObject extends UniqueObject {
    constructor(id) {
      super(id);
      _visible.set(this,null);
      _active.set(this,null);
    }
    /**
     * Method sets condition that must be met in order to node was visible.
     * @param {Condition} condition Instance of Condition object
     */
    setVisibleCondition(condition) {
      _visible.set(this,BaseObject.isConditionInstance(condition));
    }

    /**
     * Returns boolean that reflects visiblility state of node.
     * @return {Boolean} Visibility state
     */
    isVisible() {
      return BaseObject.checkCondition(_visible.get(this));
    }

    /**
     * Method sets condition that must be met in order to node was active.
     * @param {Condition} condition Instance of Condition object
     */
    setActiveCondition(condition) {
      _active.set(this,BaseObject.isConditionInstance(condition));
    }

    /**
     * Returns boolean that reflects activity state of node.
     * @return {Boolean} Active state
     */
    isActive() {
      return BaseObject.checkCondition(_active.get(this));
    }

    static checkCondition(condition) {
      if(condition === null) return true;
      return condition.check();
    }

    static isConditionInstance(obj) {
      if(typeof obj !== Condition) {
        throw new Error('Wrong type of object passed. Expected "Condition" object.');
        return null;
      }
      return obj;
    }
  };
})();
module.exports = BaseObject;
