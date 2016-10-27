"use strict";
const Utils = require('./Utils.js');

let UniqueObj = function() {
  //By default we assign unique ID
  this._id = Utils.getUniqueId();
}

UniqueObj.prototype = (function() {
  //When object is created by JSON parser
  //ID should be restored instead of generated.
  let _setId = function(value) {
    this._id = value;
  };

  let _getId = function() {
    return this._id;
  };

  return {
    setId: _setId,
    getId: _getId
  }

})();
module.exports = UniqueObj;
