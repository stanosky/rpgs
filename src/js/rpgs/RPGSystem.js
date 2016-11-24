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

const KEY_ACTORS = 'actors';
const KEY_ANSWERS = 'answers';
const KEY_CONDITIONS = 'conditions';
const KEY_DIALOGS = 'dialogs';
const KEY_LINKS = 'links';
const KEY_SCRIPTS = 'scripts';
const KEY_TALKS = 'talks';
const KEY_TASKS = 'tasks';
const KEY_QUESTS = 'quests';
const KEY_VARIABLES = 'variables';

let RPGSystem = function (editor) {

  let _objectPool = {},
  _editor = editor||null,
  _errorHandler = new ErrorHandler(_editor),
  _context = null,
  _lastChild = null,
  _parentHistory = [],

  _nodeFactory = function(data,rpgs) {
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
      this._handleError(ErrorCode.IMPROPER_CONNECTION,
        {type:type,node1:nodeId1,node2:nodeId2});
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

  ////////////////////////////////////////////////////////////////
  //METHOD CHAINING
  ////////////////////////////////////////////////////////////////

  /**
   * Method used to check passed parameters and later merge them into
   * single object.
   * @param  {string} id      Mandatory id of node.
   * @param  {object} params  Optional parameters.
   * @return {object} Parameters merged into object.
   */
  _checkAndMergeParams(id = this._handleError(ErrorCode.MANDATORY_PARAM,{param:'id'}),
                          params) {
      if(typeof id !== 'string')
        this._handleError(ErrorCode.INCORRECT_TYPE,{type:'string'});
      if(params !== undefined && typeof params !== 'object')
        this._handleError(ErrorCode.INCORRECT_TYPE,{type:'object'});
      else params = {};
      params.uuid = id;
      return params;
  },

  /**
   * This method helps in the creation of nodes. Its focus on proper
   * placement of nodes in tree.
   * @param  {string} id      Mandatory id of newly created node.
   * @param  {object} params  Parameters of created node.
   * @param  {boolean} asChild Determines if node should be added as child
   * of another node or as an independent node.
   * @param  {string} class   Name of class that will be used to create node.
   * @param  {string} storage Name of node group inside which node will be added.
   */
  _chainNodeCreator = function(id,params,asChild,class,storage) {
    params = this._checkAndMergeParams(id,params);
    params.class = class;

    if(asChild) {
      if(_lastChild !== null) {
        if(_lastChild.constructor.name === class) {
          _lastChild = _nodeFactory(params,this);
          _parentHistory[0].addChild(_lastChild.getId());
          this._addNode(storage,_lastChild);
        } else if(_lastChild.canAddChild(class)) {
          _parentHistory.unshift(_lastChild);
          _lastChild = _nodeFactory(params,this);
          _parentHistory[0].addChild(_lastChild.getId());
          this._addNode(storage,_lastChild);
        } else {
          _lastChild = _parentHistory.shift();//czy to ma sens?
          this._chainNodeCreator(id,params,asChild,class,storage);
        }
      } else if(_parentHistory[0].canAddChild(class)) {
        _lastChild = _nodeFactory(params,this);
        _parentHistory[0].addChild(_lastChild.getId());
        this._addNode(storage,node);
      } else {
        //_errorHandler.showMsg(ErrorCode.INCOMPATIBLE_CHILD,{});
      }
    } else {
      _lastChild = null;
      _parentHistory.length = 0;
      let node = _nodeFactory(params,this);
      _parentHistory = [node];
      this._addNode(storage,node);
    }
  },

  /**
   * Helper method that is used to remove nodes from object pool
   * and reset context of "method chaining" algorithm.
   * @param  {string} id  Id of node to be removed.
   * @param  {string} key Name of node group which contains node to remove.
   */
  _chainNodeRemover = function(id,key) {
    _lastChild = null;
    _parentHistory.length = 0;
    this._removeNode(key,id);
  },

  _addActor = function(id,params) {
    this._chainNodeCreator(id,params,false,'Actor',KEY_ACTORS);
    return this;
  },

  _removeActor = function(actorId) {
    this._chainNodeRemover(actorId,KEY_ACTORS);
    return this;
  },

  _addQuest = function(id,params) {
    this._chainNodeCreator(id,params,false,'Quest',KEY_QUESTS);
    return this;
  },

  _removeQuest = function(questId) {
    this._chainNodeRemover(questId,KEY_QUESTS);
    return this;
  },

  _addDialog = function(id,params) {
    this._chainNodeCreator(id,params,false,'Dialog',KEY_DIALOGS);
    return this;
  },

  _removeDialog = function(dialogId) {
    this._chainNodeRemover(dialogId,KEY_DIALOGS);
    return this;
  },

  _addCondition = function(id,params) {
    this._chainNodeCreator(id,params,false,'Condition',KEY_CONDITIONS);
    return this;
  },

  _removeCondition = function(conditionId) {
    this._chainNodeRemover(conditionId,KEY_CONDITIONS);
    return this;
  },

  _addVariable = function(id,params) {
    this._chainNodeCreator(id,params,false,'Variable',KEY_VARIABLES);
    return this;
  },

  _removeVariable = function(variableId) {
    this._chainNodeRemover(variableId,KEY_VARIABLES);
    return this;
  },

  _addTalk = function(id,params) {
    this._chainNodeCreator(id,params,true,'Talk',KEY_TALKS);
    return this;
  },

  _removeTalk = function(id) {
    this._chainNodeRemover(id,KEY_TALKS);
    return this;
  },

  _addAnswer = function(id,params) {
    this._chainNodeCreator(id,params,true,'Answer',KEY_ANSWERS);
    return this;
  },

  _removeAnswer = function(id) {
    this._chainNodeRemover(id,KEY_ANSWERS);
    return this;
  },

  ////////////////////////////////////////////////////////////////
  //GETTERS
  ////////////////////////////////////////////////////////////////
  _getActor = function(actorId) {
    return this._getNode(KEY_ACTORS,actorId);
  },

  _getActors = function() {
    return _objectPool[KEY_ACTORS];
  },

  _getCondition = function(conditionId) {
    return this._getNode(KEY_CONDITIONS,conditionId);
  },

  _getConditions = function() {
    return _objectPool[KEY_CONDITIONS];
  },

  _getDialog = function(dialogId) {
    return this._getNode(KEY_DIALOGS,dialogId);
  },

  _getDialogs = function() {
    return _objectPool[KEY_DIALOGS];
  },

  _getQuest = function(questId) {
    return this._getNode(KEY_QUESTS,questId);
  },

  _getQuests = function() {
    return _objectPool[KEY_QUESTS];
  },

  _getVariable = function(variableId) {
    return this._getNode(KEY_VARIABLES,variableId);
  },

  _getVariables = function() {
    return _objectPool[KEY_VARIABLES];
  },

  _setData = function(data) {
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        _objectPool[key] = data[key].map((d) => _nodeFactory(d,this));
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

    setData:          _setData,
    serializeData:    _serializeData
  };
};
module.exports = RPGSystem;
