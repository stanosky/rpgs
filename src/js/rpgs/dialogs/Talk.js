"use strict";
const BaseObject = require('../core/BaseObject.js');
const Answer = require('./Answer.js');

let Talk = function() {
  BaseObject.call(this);
  this._text = '';
  this._answers = [];
}
Talk.prototype = (function(){
  let _super = new BaseObject(),

  _setText = function(value) {
    this._text = value;
  },

  _getText = function() {
    return this._text;
  },

  _addAnswer = function(answer) {
    Utils.addObjectToArray(this._answers,answer, Answer);
  },

  _removeAnswer = function(answerId) {
      let index = Utils.indexOfObject(this._answers,answerId);
      if(index > -1) this._answers.splice(index,1);
  },

  _getAnswer = function(answerId) {
    return Utils.getObjectById(this._answers,answerId);
  },

  _getAnswers = function() {
    return this._answers;
  },

  _super.setText = _setText;
  _super.getText = _getText;
  _super.addAnswer = _addAnswer;
  _super.removeAnswer = _removeAnswer;
  _super.getAnswer = _getAnswer;
  _super.getAnswers = _getAnswer;

  return _super;
})();
Talk.prototype.constructor = Talk;
module.exports = Talk;
