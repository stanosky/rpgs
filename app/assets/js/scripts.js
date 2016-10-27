(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

let Actor = function () {
  this._name = '';
  this._dialog = null;
  this._inventory = null;
};

Actor.prototype = function () {
  let _setName = function (value) {
    this._name = value;
  },
      _getName = function () {
    return this._name;
  },
      _setDialog = function (dialog) {
    this._dialog = dialog;
  },
      _getDialog = function () {
    return this._dialog;
  },
      _setInventory = function (inventory) {
    this._inventory = inventory;
  },
      _getInventory = function () {
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
}();
Actor.prototype.constructor = Actor;
module.exports = Actor;

},{}],2:[function(require,module,exports){
"use strict";

const Utils = require('./Utils.js');

let UniqueObj = function () {
  //By default we assign unique ID
  this._id = Utils.getUniqueId();
};

UniqueObj.prototype = function () {
  //Method useful when object is created by JSON parser.
  //In that case ID should be restored instead generated.
  let _setId = function (value) {
    this._id = value;
  };

  let _getId = function () {
    return this._id;
  };

  return {
    setId: _setId,
    getId: _getId
  };
}();
module.exports = UniqueObj;

},{"./Utils.js":3}],3:[function(require,module,exports){
"use strict";

exports.getUniqueId = function () {
  var id = 0; // This is the private persistent value
  // The outer function returns a nested function that has access
  // to the persistent value.  It is this nested function we're storing
  // in the variable uniqueID above.
  return function () {
    return id++;
  }; // Return and increment
}(); // Invoke the outer function after defining it.

exports.indexOfObject = function (array, obj) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === obj) return i;
  }
  return -1;
};

exports.getObjectById = function (array, id) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].getId() === id) return array[i];
  }
  return null;
};

exports.addObjectToArray = function (array, obj, expectedType) {
  if (typeof obj !== expectedType) {
    throw new Error('Wrong type of object passed. Expected ' + expectedType + ' object.');
  }
  if (_indexOfObject(array, obj) === -1) {
    array.push(obj);
  }
};

},{}],4:[function(require,module,exports){
"use strict";

(function ($, window, document, undefined) {
  const UniqueObj = require('./core/UniqueObj.js');
  const Actor = require('./actors/Actor.js');
  $(function () {
    var obj1 = new UniqueObj();
    var obj2 = new UniqueObj();
    console.log(obj1.getId(), obj2.getId(), obj1.getId(), obj2.getId());
    console.log("is obj1 instance of UniqueObj", obj1 instanceof UniqueObj);

    var npc1 = new Actor();
    var npc2 = new Actor();
    console.log("is npc1 instance of UniqueObj", npc1 instanceof UniqueObj);
    console.log("is npc1 instance of UniqueObj", npc1 instanceof Actor);
    npc1.setName('Adam');
    npc2.setName('Eva');

    console.log(npc1 === npc2);
  });
})(jQuery, window, document);

},{"./actors/Actor.js":1,"./core/UniqueObj.js":2}]},{},[4])

