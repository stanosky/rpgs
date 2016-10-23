"use strict";
const Utils = require('./Utils.js');

let RPGObject = function() {
  let _id = Utils.getUniqueId();
  let _getId = function() {
    return _id;
  }
  return {
    getId: _getId
  };
};

module.exports = RPGObject;
