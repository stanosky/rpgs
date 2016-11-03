"use strict";
const Utils = require('./Utils.js');

let BaseObject = function() {
  //By default we assign unique ID
  this._id = Utils.getUniqueId();
  this._visible = null;
  this._active = null;
}

BaseObject.prototype = (function() {
  //When object is created by JSON parser
  //ID should be restored instead of generated.
  let _setId = function(value) {
    this._id = value;
  },

  _getId = function() {
    return this._id;
  },

  /**
   * Method sets condition that must be met in order to node was visible.
   * @param {Condition} condition Instance of Condition object
   */
  _setVisibleCondition = function(condition) {
    this._visible = _isConditionInstance(condition);
  },

  /**
   * Returns boolean that reflects visiblility state of node.
   * @return {Boolean} Visibility state
   */
  _isVisible = function() {
    return _checkCondition(this._visible);
  },

  /**
   * Method sets condition that must be met in order to node was active.
   * @param {Condition} condition Instance of Condition object
   */
  _setActiveCondition = function(condition) {
    this._active = _isConditionInstance(condition);
  },

  /**
   * Returns boolean that reflects activity state of node.
   * @return {Boolean} Active state
   */
  _isActive = function() {
    return _checkCondition(this._active);
  },

  _checkCondition = function(condition) {
    if(condition === null) return true;
    return condition.check();
  },

  _isConditionInstance = function(obj) {
    if(typeof obj !== Condition) {
      throw new Error('Wrong type of object passed. Expected "Condition" object.');
      return null;
    }
    return obj;
  };

  return {
    setId: _setId,
    getId: _getId,
    setVisibleCondition: _setVisibleCondition,
    isVisible: _isVisible,
    setActiveCondition: _setActiveCondition,
    isActive: _isActive
  };

})();
BaseObject.prototype.constructor = BaseObject;
module.exports = BaseObject;
