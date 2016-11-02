"use strict";
const Utils = require('../core/Utils.js');
const BaseNode = require('./BaseNode.js');

let TalkNode = function() {
  BaseNode.call(this);
  this._text = '';
  this._answerNodes = [];
};
TalkNode.prototype = (function(){
  let _super = new BaseNode(),
  let _setText = function(value) {
    this._text = value;
  };

  let _getText = function() {
    return this._text;
  };

  let _addAnswerNode = function(answerNode) {
    Utils.addObjectToArray(this._answerNodes,answerNode,AnswerNode);
  };

  let _removeAnswerNode = function(answerNodeId) {
      let index = Utils.indexOfObject(this._answerNodes,answerNodeId);
      if(index > -1) this._answerNodes.splice(index,1);
  };

  let _getAnswerNode = function(answerNodeId) {
    return Utils.getObjectById(this._answerNodes,answerNodeId);
  };

  let _getAnswerNodes = function() {
    return this._answerNodes;
  };

  _super.setText = _setText;
  _super.getText = _getText;
  _super.addAnswerNode = _addAnswerNode;
  _super.removeAnswerNode = _removeAnswerNode;
  _super.getAnswerNode = _getAnswerNode;
  _super.getAnswerNodes = _getAnswerNodes;
  return _super;
})();
TalkNode.prototype.constructor = TalkNode;
module.exports = TalkNode;
