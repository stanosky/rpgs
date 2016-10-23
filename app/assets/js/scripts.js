(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

const RPGObject = require('./RPGObject.js');

let NPC = function () {
  let _name = '';
  let _dialog = null;
  let _inventory = null;
  let _npc = {};
  _npc.__proto__ = RPGObject();

  _npc.setName = function (value) {
    _name = value;
  };

  _npc.getName = function () {
    return _name;
  };

  _npc.setDialog = function (dialog) {
    _dialog = dialog;
  };

  _npc.getDialog = function () {
    return _dialog;
  };

  _npc.setInventory = function (inventory) {
    _inventory = inventory;
  };

  _npc.getInventory = function () {
    return _inventory;
  };

  /*_npc.toString = function() {
    return 'NPC name: '+this.getName()+', id: ' + this.getId();
  };*/
  return _npc;
};
module.exports = NPC;

},{"./RPGObject.js":2}],2:[function(require,module,exports){
"use strict";

const Utils = require('./Utils.js');

let RPGObject = function () {
  let _id = Utils.getUniqueId();
  let _getId = function () {
    return _id;
  };
  return {
    getId: _getId
  };
};

module.exports = RPGObject;

},{"./Utils.js":3}],3:[function(require,module,exports){
"use strict";

let getUniqueId = function () {
   var id = 0; // This is the private persistent value
   // The outer function returns a nested function that has access
   // to the persistent value.  It is this nested function we're storing
   // in the variable uniqueID above.
   return function () {
      return id++;
   }; // Return and increment
}(); // Invoke the outer function after defining it.

exports.getUniqueId = getUniqueId;

},{}],4:[function(require,module,exports){
"use strict";

(function ($, window, document, undefined) {
  const RPGObject = require('./RPGObject.js');
  const NPC = require('./NPC.js');
  $(function () {
    var obj1 = new RPGObject();
    var obj2 = new RPGObject();
    console.log(obj1.getId(), obj2.getId(), obj1.getId(), obj2.getId());

    var npc1 = new NPC();
    var npc2 = new NPC();
    npc1.setName('Adam');
    npc2.setName('Eva');
    console.log(npc1.toString(), npc2.toString());
    console.log(npc1 instanceof RPGObject);
  });
})(jQuery, window, document);

},{"./NPC.js":1,"./RPGObject.js":2}]},{},[4])

