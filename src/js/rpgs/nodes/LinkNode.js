"use strict";
const Utils = require('../core/Utils.js');


let LinkNode = function() {
  this._input = '';
  this._output = '';

};
LinkNode.prototype = (function(){
  let _setInput = function(inputNodeId) {
    this._input = inputNodeId;
  },

  _getInput = function() {
    return this._input;
  },

  _setOutput = function(outputNodeId) {
    this._output = outputNodeId;
  },

  _getOutput = function() {
    return this._output;
  };

  return {
    setInput: _setInput,
    getInput: _getInput,
    setOutput: _setOutput,
    getOutput: _getOutput
  };

})();
LinkNode.prototype.constructor = LinkNode;
module.exports = LinkNode;
