"use strict";
const BaseObject = require('../core/BaseObject.js');

let Answer = function() {
  BaseObject.call(this);
  this._text = '';
  this._link = '';
};

Answer.prototype = (function(){
  let _super = new BaseObject(),

  _setText = function(value) {
    this._text = value;
  },

  _getText = function() {
    return this._text;
  },

  _setLink = function(link) {
    this._link = link;
  },

  _getLink = function() {
    return this._link;
  };

  _super.setText = _setText;
  _super.getText = _getText;
  _super.setLink = _setLink;
  _super.getLink = _getLink;

  return _super;
})();
Answer.prototype.constructor = Answer;
module.exports = Answer;
