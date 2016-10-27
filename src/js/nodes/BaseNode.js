"use strict";
const UniqueObj = require('../core/UniqueObj.js');

let BaseNode = function() {
  this._x = 0;
  this._y = 0;
  this._width = 0;
  this._height = 0;
};

BaseNode.prototype = (function(){
  let _super = new UniqueObj(),
  _setX = function(value) {
      this._x = value;
  },

  _setY = function(value) {
      this._y = value;
  },

  _getX = function() {
      return this._x;
  },

  _getY = function() {
      return this._y;
  },

  _setWidth = function(value) {
      this._width = value;
  },

  _setHeight = function(value) {
      this._height = value;
  },

  _getWidth = function() {
      return this._width;
  },

  _getHeight = function() {
      return this._height;
  };

  _super.setX = _setX;
  _super.setY = _setY;
  _super.getX = _getX;
  _super.getY = _getY;
  _super.setWidth = _setWidth;
  _super.setHeight = _setHeight;
  _super.getWidth = _getWidth;
  _super.getHeight = _getHeight;
  return _super;
})();
BaseNode.prototype.constructor = BaseNode;
module.exports = BaseNode;
