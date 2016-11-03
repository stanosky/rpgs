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
  _setText = function(value) {
    this._text = value;
  },

  _getText = function() {
    return this._text;
  },

  _addAnswerNode = function(answerNode) {
    Utils.addObjectToArray(this._answerNodes,answerNode,AnswerNode);
  },

  _removeAnswerNode = function(answerNodeId) {
      let index = Utils.indexOfObject(this._answerNodes,answerNodeId);
      if(index > -1) this._answerNodes.splice(index,1);
  },

  _getAnswerNode = function(answerNodeId) {
    return Utils.getObjectById(this._answerNodes,answerNodeId);
  },

  _getAnswerNodes = function() {
    return this._answerNodes;
  },

  /**
   * Method checks if input connection can be set
   * depends on rules defined in node that will inherits from this object.
   * @param  {LinkNode} linkNode LinkNode object
   * @return {Boolean} Returns true if connection can be made.
   */
  _canCreateInputConnection = function(linkNode) {
    //if()
    return true;
  },

  /**
   * Method checks if output connection can be set
   * depends on rules defined in node that will inherits from this object.
   * @return {Boolean} Returns true if connection can be made.
   */
  _canCreateOutputConnection = function() {
    return false;
  };

  _super.setText = _setText;
  _super.getText = _getText;
  _super.addAnswerNode = _addAnswerNode;
  _super.removeAnswerNode = _removeAnswerNode;
  _super.getAnswerNode = _getAnswerNode;
  _super.getAnswerNodes = _getAnswerNodes;
  _super.canCreateInputConnection = _canCreateInputConnection;
  _super.canCreateOutputConnection = _canCreateOutputConnection;
  return _super;
})();
TalkNode.prototype.constructor = TalkNode;
module.exports = TalkNode;
