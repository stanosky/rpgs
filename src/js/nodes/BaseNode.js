"use strict";
const BaseObject = require('../core/BaseObject.js');
const Utils = require('../core/Utils.js');

let BaseNode = function() {
  BaseObject.call(this);
  this._model = null;
  this._x = 0;
  this._y = 0;
  this._width = 0;
  this._height = 0;
  this._label = "";
  this._inputConnections = [];
  this._outputConnections = [];
};

BaseNode.prototype = (function(){
  let _super = new BaseObject(),

  _setModel = function(model) {
    this._model = model;
  },

  _getModel = function() {
    return this._model;
  }

  /**
   * Sets x position of node
   * @param {Number} value Node position on x axis
   */
  _setX = function(value) {
      this._x = value;
  },

  /**
   * Gets x position of node
   * @return {Number} Actual node position on x axis
   */
  _getX = function() {
      return this._x;
  },

  /**
   * Sets y position of node
   * @param {Number} value Node position on y axis
   */
  _setY = function(value) {
      this._y = value;
  },

  /**
   * Gets y position of node
   * @return {Number} Actual node position on y axis
   */
  _getY = function() {
      return this._y;
  },

  /**
   * Sets width of node
   * @param {Number} value Node width
   */
  _setWidth = function(value) {
      this._width = value;
  },

  /**
   * Gets width of node
   * @return {[type]} Actual node width
   */
  _getWidth = function() {
      return this._width;
  },

  /**
   * Sets height of node
   * @param {[type]} value Node height
   */
  _setHeight = function(value) {
      this._height = value;
  },

  /**
   * Gets height of node
   * @return {[type]} Actual node height
   */
  _getHeight = function() {
      return this._height;
  },

  /**
   * Sets label of node
   * @param {String} value Label of node
   */
  _setLabel = function(value) {
    this._label = value;
  },

  /**
   * Gets node label
   * @return {String} Actual node label
   */
  _getLabel = function() {
    return this._label;
  },

  /**
   * Method sets condition that must be met in order to node was visible.
   * @param {Condition} condition Instance of Condition object
   */
  _setVisibleCondition = function(condition) {
    this._model.setVisibleCondition(condition);
  },

  /**
   * Returns boolean that reflects visiblility state of node.
   * @return {Boolean} Visibility state
   */
  _isVisible = function() {
    return this._model.isVisible();
  },

  /**
   * Method sets condition that must be met in order to node was active.
   * @param {Condition} condition Instance of Condition object
   */
  _setActiveCondition = function(condition) {
    this._model.setActiveCondition(condition);
  },

  /**
   * Returns boolean that reflects activity state of node.
   * @return {Boolean} Active state
   */
  _isActive = function() {
    return this._model.isActive();
  },

  /**
   * Method adds new input connection from LinkNode object with given ID
   * @param {String} linkNodeId Id of LinkNode object
   */
  _addInputConnection = function(linkNodeId) {
    Utils.addObjectToArray(this._inputConnections,linkNodeId);
  },

  /**
   * Method removes input connection with given ID
   * @param  {String} linkNodeId Id of LinkNode object
   */
  _removeInputConnection = function(linkNodeId) {
    Utils.removeObjectFromArray(this._inputConnections,linkNodeId);
  },

  /**
   * Method searches input connections with given ID
   * and returns LinkNode object.
   * @param  {String} linkNodeId Id of LinkNode object
   * @return {LinkNode} LinkNode object connected to this node
   */
  _getInputConnection = function(linkNodeId) {
    return Utils.getObjectById(this._inputConnections,linkNodeId);
  },

  /**
   * Method returns array of LinkNode objects connected to this node
   * @return {Array} List of LinkNode objects
   */
  _getInputConnections = function() {
    return this._inputConnections;
  },

  /**
   * Method adds new output connection to LinkNode object with given ID
   * @param {String} linkNodeId Id of LinkNode object
   */
  _addOutputConnection = function(linkNodeId) {
    Utils.addObjectToArray(this._outputConnections,linkNodeId);
  },

  /**
   * Method removes output connection with given ID
   * @param  {String} linkNodeId Id of LinkNode object
   */
  _removeOutputConnection = function(linkNodeId) {
    Utils.removeObjectFromArray(this._outputConnections,linkNodeId);
  },

  /**
   * Method searches output connections with given ID
   * and returns LinkNode object.
   * @param  {String} linkNodeId Id of LinkNode object
   * @return {LinkNode} LinkNode object connected from this node
   */
  _getOutputConnection = function(linkNodeId) {
    return Utils.getObjectById(this._outputConnections,linkNodeId);
  },

  /**
   * Method returns array of LinkNode objects connected from this node
   * @return {Array} List of LinkNode objects
   */
  _getOutputConnections = function() {
    return this._outputConnections;
  },

  /**
   * Method checks if input connection can be set
   * depends on rules defined in node that will inherits from this object.
   * @param  {LinkNode} linkNode LinkNode object
   * @return {Boolean} Returns true if connection can be made.
   */
  _canCreateInputConnection = function(linkNode) {
    return true;
  },

  /**
   * Method checks if output connection can be set
   * depends on rules defined in node that will inherits from this object.
   * @return {Boolean} Returns true if connection can be made.
   */
  _canCreateOutputConnection = function() {
    return true;
  };



  _super.setX = _setX;
  _super.setY = _setY;
  _super.getX = _getX;
  _super.getY = _getY;

  _super.setWidth = _setWidth;
  _super.setHeight = _setHeight;
  _super.getWidth = _getWidth;
  _super.getHeight = _getHeight;

  _super.setLabel = _setLabel;
  _super.getLabel = _getLabel;

  _super.setVisibleCondition = _setVisibleCondition;
  _super.isVisible = _isVisible;

  _super.setActiveCondition = _setActiveCondition;
  _super.isActive = _isActive;

  _super.addInputConnection = _addInputConnection;
  _super.removeInputConnection = _removeInputConnection;
  _super.getInputConnection = _getInputConnection;
  _super.getInputConnections = _getInputConnections;

  _super.addOutputConnection = _addOutputConnection;
  _super.removeOutputConnection = _removeOutputConnection;
  _super.getOutputConnection = _getOutputConnection;
  _super.getOutputConnections = _getOutputConnections;

  _super.canCreateInputConnection = _canCreateInputConnection;
  _super.canCreateOutputConnection = _canCreateOutputConnection;

  return _super;
})();
BaseNode.prototype.constructor = BaseNode;
module.exports = BaseNode;
