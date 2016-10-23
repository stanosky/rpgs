"use strict";
const RPGObject = require('./RPGObject.js');

let NPC = function () {
  let _name = '';
  let _dialog = null;
  let _inventory = null;
  let _npc = {};
  _npc.__proto__ = RPGObject();

  _npc.setName = function(value) {
    _name = value;
  };

  _npc.getName = function() {
    return _name;
  };

  _npc.setDialog = function(dialog) {
    _dialog = dialog;
  };

  _npc.getDialog = function() {
    return _dialog;
  };

  _npc.setInventory = function(inventory) {
    _inventory = inventory;
  };

  _npc.getInventory = function() {
    return _inventory;
  };

  /*_npc.toString = function() {
    return 'NPC name: '+this.getName()+', id: ' + this.getId();
  };*/
  return _npc;
};
module.exports = NPC;
