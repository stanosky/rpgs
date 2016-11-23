"use strict";
import Utils        from './core/Utils';
import BaseObject   from './core/BaseObject';
import ErrorHandler from './core/ErrorHandler'
import ErrorCode    from './core/ErrorCode';
import Link         from './core/Link';
import Actor        from './actors/Actor';
//import Inventory    from './actors/Invenotry';
import Condition    from './conditions/Condition';
import Answer       from './dialogs/Answer';
import Dialog       from './dialogs/Dialog';
import Talk         from './dialogs/Talk';
import Quest        from './quests/Quest';
import Task         from './quests/Task';


const KEY_LINKS = 'links';

let RPGSystem = function (editor) {

  let _objectPool = {},
  _editor = editor||null,
  _errorHandler = new ErrorHandler(_editor),
  _currContext = null,

  _objectFactory = function(data,rpgs) {
    let className = data.class;
    switch (className) {
      case 'Actor':     return new Actor(data,rpgs);
      case 'Condition': return new Condition(data,rpgs);
      case 'Answer':    return new Answer(data,rpgs);
      case 'Dialog':    return new Dialog(data,rpgs);
      case 'Talk':      return new Talk(data,rpgs);
      case 'Quest':     return new Quest(data,rpgs);
      case 'Task':      return new Task(data,rpgs);
      case 'Link':      return new Link(data,rpgs);
      default:
        _errorHandler.showMsg(ErrorCode.CLASS_NOT_DEFINED,{class:className});
        return null;
    }
  },

  _findNode = function(objId) {
    for (var key in _objectPool) {
      if (_objectPool.hasOwnProperty(key)) {
        let obj = Utils.getObjectById(_objectPool[key],objId);
        if(obj !== null) return obj;
      }
    }
    this._errorHandler(ErrorCode.OBJECT_NOT_FOUND,{id:objId});
    return null;
  },

  _getNode = function(key,objId) {
    let obj = Utils.getObjectById(_objectPool[key],objId);
    return obj;
  },

  _addNode = function(key,obj) {
    _objectPool[key].push(obj);
  },

  _removeNode = function(key,id) {
    _objectPool[key] = Utils.removeObjectById(_objectPool[key],id);
  },

  _setConnection = function(type,nodeId1,nodeId2) {
    if(nodeId1 === nodeId2) {
      this._handleError(ErrorCode.CONNECTION_TO_ITSELF,{node:nodeId1});
      return false;
    }
    let node1 = this._findNode(nodeId1);
    let node2 = this._findNode(nodeId2);
    if(node1 === null || node2 === null) return;
    if(node1.canCreateOutputConnection(type) && node2.canCreateInputConnection(type)) {
      let link = new Link({type:type,output:nodeId1,input:nodeId2});
      let linkId = link.getId();
      this._addNode(KEY_LINKS,link);
      node1.setOutputConnection(type,linkId);
      node2.setInputConnection(type,linkId);
      return linkId;
    } else {
      this._handleError(ErrorCode.IMPROPER_CONNECTION,{type:type,node1:nodeId1,node2:nodeId2});
      return false;
    }
  },

  _getConnection = function(linkId) {
    return this._getNode(KEY_LINKS,linkId);
  },

  _getConnections = function() {
    return _objectPool[KEY_LINKS];
  },

  _removeConnection = function(linkId) {
    this._removeNode(KEY_LINKS,linkId);
  },

  _addActor = function(id,params) {

    return _objectPool.actors.push(new Actor(params));
  },

  _removeActor = function(actorId) {
    _objectPool.actors = Utils.removeObjectById(_objectPool.actors,actorId);
  },

  _getActors = function() {
    return _objectPool.actors;
  },

  _addQuest = function(params) {
    return _objectPool.quests.push(new Quest(params));
  },

  _removeQuest = function(questId) {
    _objectPool.quests = Utils.removeObjectById(_objectPool.quests,questId);
  },

  _getQuests = function() {
    return _objectPool.quests;
  },

  _addDialog = function(params) {
    return _objectPool.dialogs.push(new Dialog(params));
  },

  _removeDialog = function(dialogId) {
    _objectPool.dialogs = Utils.removeObjectById(_objectPool.dialogs,dialogId);
  },

  _getDialogs = function() {
    return _objectPool.dialogs;
  },

  _addCondition = function(params) {
    return _objectPool.conditions.push(new Condition(params));
  },

  _removeCondition = function(conditionId) {
    _objectPool.conditions = Utils.removeObjectById(_objectPool.conditions,conditionId);
  },

  _getConditions = function() {
    return _objectPool.conditions;
  },

  _addVariable = function(params) {
    //return _objectPool.variables.push(new Variable(params));
  },

  _removeVariable = function(variableId) {
    //_objectPool.variables = Utils.removeObjectById(_objectPool.variables,variableId);
  },

  _getVariables = function() {
    //return _objectPool.variables;
  },

  /*_nodeHistory = [],
  _addRootNode = function(type,params) {
    this._done();
    //zmień switch w classFactory!
    let newNode = classFactory(type,params);
    if(newNode) {
      _nodeHistory.push(newNode);
      _objectPool.push(newNode);
    } else {
      _errorHandler.showMsg(ErrorCode.NODE_NOT_EXISTS);
    }
    return this;
  },

  _addChildNode = function(type,params) {
    let len = _nodeHistory.length;
    if(len > 0) {
      let currNode = _nodeHistory[len-1];
      let newNode = classFactory(type,params);
    } else {
      return _addRootNode(type,params);
    }
  },

  //zastanowić się czy przekazywać id czy obiekty
  _connectNodes = function(parentNode,childNode) {
    return this;
  },

  _prevNode = function() {
    if(_nodeHistory.length > 0) _nodeHistory.pop();
    return this;
  },

  _done = function() {
    _nodeHistory = [];
    return this;
  },*/

  _setData = function(data) {
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        _objectPool[key] = data[key].map((d) => _objectFactory(d,this));
      }
    }
  },

  _serializeData = function() {
    let data = {};
    for (var key in _objectPool) {
      if (_objectPool.hasOwnProperty(key)) {
        data[key] = _objectPool[key].map((obj) => {
          return obj.getData ? obj.getData() : obj;
        });
      }
    }
    return JSON.stringify(data);
  };

  return {
    setData:          _setData,
    findNode:         _findNode,
    getNode:          _getNode,
    addNode:          _addNode,
    removeNode:       _removeNode,
    setConnection:    _setConnection,
    getConnection:    _getConnection,
    getConnections:   _getConnections,
    removeConnection: _removeConnection,
    addActor:         _addActor,
    removeActor:      _removeActor,
    getActors:        _getActors,
    addQuest:         _addQuest,
    removeQuest:      _removeQuest,
    getQuests:        _getQuests,
    addDialog:        _addDialog,
    removeDialog:     _removeDialog,
    getDialogs:       _getDialogs,
    addCondition:     _addCondition,
    removeCondition:  _removeCondition,
    getConditions:    _getConditions,
    addVariable:      _addVariable,
    removeVariable:   _removeVariable,
    getVariables:     _getVariables,
    serializeData:    _serializeData
  };
};
module.exports = RPGSystem;
