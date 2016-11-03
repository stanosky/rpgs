"use strict";

let Actor = function () {
  this._name = '';
  this._dialog = null;
  this._inventory = null;
};

Actor.prototype = (function(){
  let _setName = function(value) {
    this._name = value;
  },

  _getName = function() {
    return this._name;
  },

  _setDialog = function(dialog) {
    this._dialog = dialog;
  },

  _getDialog = function() {
    return this._dialog;
  },

  _setInventory = function(inventory) {
    this._inventory = inventory;
  },

  _getInventory = function() {
    return this._inventory;
  };

  return {
    setName: _setName,
    getName: _getName,
    setDialog: _setDialog,
    getDialog: _getDialog,
    setInventory: _setInventory,
    getInventory: _getInventory
  };
})();
Actor.prototype.constructor = Actor;
module.exports = Actor;
