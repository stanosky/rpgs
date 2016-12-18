"use strict";
import Utils        from './core/Utils';
import BaseNode     from './core/BaseNode';
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

let RPGSystem = function (data,editor) {

  let _objectPool = {},
  _editor = editor||null,
  _errorHandler = new ErrorHandler(_editor),
  _context = null,
  _lastChild = null,
  _parentHistory = [],
  _halfLinks = {
    out: [],
    inp: []
  };

  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      _objectPool[key] = data[key].map((d) => _nodeFactory(d,this));
    }
  }

  function _nodeFactory(data) {
    let className = data.class;
    switch (className) {
      case 'Actor':     return new Actor(data,this);
      case 'Condition': return new Condition(data,this);
      case 'Answer':    return new Answer(data,this);
      case 'Dialog':    return new Dialog(data,this);
      case 'Talk':      return new Talk(data,this);
      case 'Quest':     return new Quest(data,this);
      case 'Task':      return new Task(data,this);
      case 'Link':      return new Link(data,this);
      default:
        _errorHandler.showMsg(ErrorCode.CLASS_NOT_DEFINED,{class:className});
        return null;
    }
  }

  let _findNode = function(objId) {
    for (var key in _objectPool) {
      if (_objectPool.hasOwnProperty(key)) {
        let obj = Utils.getObjectById(_objectPool[key],objId);
        if(obj !== null) return obj;
      }
    }
    //Is error message neccessary here? To consider.
    //_errorHandler.showMsg(ErrorCode.OBJECT_NOT_FOUND,{id:objId});
    return null;
  },

  _getNode = function(key,objId) {
    let obj = Utils.getObjectById(_objectPool[key],objId);
    return obj;
  },

  _addNode = function(key,obj) {
    if(!_objectPool[key]) _objectPool[key] = [];
    _objectPool[key].push(obj);
  },

  _removeNode = function(key,id) {
    _objectPool[key] = Utils.removeObjectById(_objectPool[key],id);
  },

  _setConnection = function(type,nodeId1,nodeId2) {
    if(nodeId1 === nodeId2) {
      _errorHandler.showMsg(ErrorCode.CONNECTION_TO_ITSELF,{node:nodeId1});
      return false;
    }
    let node1 = _findNode(nodeId1);
    let node2 = _findNode(nodeId2);
    if(node1 === null || node2 === null) return;
    if(node1.canCreateOutputConnection(type) && node2.canCreateInputConnection(type)) {
      let link = new Link({type:type,output:nodeId1,input:nodeId2});
      let linkId = link.getId();
      _addNode(KEY_LINKS,link);
      node1.setOutputConnection(type,linkId);
      node2.setInputConnection(type,linkId);
      return linkId;
    } else {
      _errorHandler.showMsg(ErrorCode.IMPROPER_CONNECTION,{
        type:type,
        node1:nodeId1,
        node2:nodeId2
      });
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
  };

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
  function _checkAndMergeParams(
                id = _errorHandler.showMsg(ErrorCode.MANDATORY_PARAM,{param:'id'}),
                params) {
      if(typeof id !== 'string') {
        _errorHandler.showMsg(ErrorCode.INCORRECT_TYPE,{type:'string'});
      }
      if(params !== undefined && typeof params !== 'object') {
        _errorHandler.showMsg(ErrorCode.INCORRECT_TYPE,{type:'object'});
      } else if(params === undefined){
        params = {};
      }
      params.uuid = id;
      return params;
  }

  /**
   * This method helps in the creation of nodes. Its focus on proper
   * placement of nodes in tree.
   * @param  {string} id      Mandatory id of newly created node.
   * @param  {object} params  Parameters of created node.
   * @param  {boolean} asChild Determines if node should be added as child
   * of another node or as an independent node.
   * @param  {string} className   Name of class that will be used to create node.
   * @param  {string} storage Name of node group inside which node will be added.
   */
  function _chainNodeCreator(id,params,asChild,className,storage) {
    //First, we check that id and params are valid.
    params = _checkAndMergeParams(id,params);
    //Class name for later usage.
    params.class = className;

    //Test if node should be added as child or parent.
    if(asChild) {
      //If last added child was not null then we must check additional conditions.
      if(_lastChild !== null) {
        //If constructor name of previous child node, is equal to name of class,
        //whose we try to create, it means node should be added to current parent.
        if(_lastChild.constructor.name === className) {
          createChildNode(params);
        }
        //If names of constructors not match, then we must check if new node
        //can be added as child to our previous child.
        else if(_lastChild.canAddChild(className)) {
          _parentHistory.unshift(_lastChild);
          createChildNode(params);
        }
        //Finally if previous conditions are false we try go back to previous
        //parent node.
        else {
          _lastChild = _parentHistory.shift()||null;
          _chainNodeCreator(id,params,asChild,className,storage);
        }
      }
      //If last child is null, then we check if node can be added to current
      //parent node.
      else if(_parentHistory.length > 0 && _parentHistory[0].canAddChild(className)) {
        createChildNode(params);
      }
      //If last child and last parent is equal to null, then new child node
      //cant be added, so we throw error.
      else {
        _errorHandler.showMsg(ErrorCode.INCOMPATIBLE_CHILD,{
          child:className,
          parent: _parentHistory.length > 0
                ? _parentHistory[0].constructor.name
                : 'null'
        });
      }
    } else {
      //If node is added as parent, then last child is set to null
      //and parent history is cleared.
      _lastChild = null;
      _parentHistory.length = 0;
      //After that, new node is created.
      let node = _nodeFactory(params);
      _parentHistory = [node];
      _addNode(storage,node);
    }

    function createChildNode(nodeParams) {
      //We create a new node, and then set as the last child.
      _lastChild = _nodeFactory(nodeParams);
      //Then we add our freshly created node to its parent.
      _parentHistory[0].addChild(_lastChild.getId());
      //Finally new node is added to main storage object.
      _addNode(storage,_lastChild);
    }
  }

  /**
   * Helper method that is used to remove nodes from object pool
   * and reset context of "method chaining" algorithm.
   * @param  {string} id  Id of node to be removed.
   * @param  {string} key Name of node group which contains node to remove.
   */
  function _chainNodeRemover(id,key) {
    _lastChild = null;
    _parentHistory.length = 0;
    this._removeNode(key,id);
  }

  /**
   * Helper method that is used for creating temporary links (half links)
   * or complete Link nodes, when input and output counterparts are present.
   * @param  {string} type      Defines type of connection.
   * @param  {string} id        Id of targeted node into which connection
   * should be made.
   * @param  {string} startSide Defines current start side of the link.
   * @param  {string} endSide   Defines current end side of the link.
   */
  function _chainLinkCreator(type,id,startSide,endSide) {
    let opposite = null;
    let node = null;
    if(_lastChild !== null) {
      node = _lastChild;
    } else if(_parentHistory[0] !== undefined) {
      node = _parentHistory[0];
    }
    if(node !== null) {
      for (var i = 0; i < _halfLinks[endSide].length; i++) {
        let link = _halfLinks[endSide][i];
        if(link.type === type && link.id === node.getId()){
          opposite = _halfLinks[endSide].splice(i,1)[0];
          break;
        }
      }
      if(opposite === null) {
        _halfLinks[startSide].push({type,id});
      } else {
        if(startSide === 'inp') {
          _setConnection(type,id,opposite.id);
        } else {
          _setConnection(type,opposite.id,id);
        }
      }
    } else {
      _errorHandler.showMsg(ErrorCode.INCORRECT_LINK_TARGET);
    }
  }

  let _addActor = function(id,params) {
    _chainNodeCreator(id,params,false,'Actor',KEY_ACTORS);
    return this;
  },

  _removeActor = function(actorId) {
    _chainNodeRemover(actorId,KEY_ACTORS);
    return this;
  },

  _addQuest = function(id,params) {
    _chainNodeCreator(id,params,false,'Quest',KEY_QUESTS);
    return this;
  },

  _removeQuest = function(questId) {
    _chainNodeRemover(questId,KEY_QUESTS);
    return this;
  },

  _addDialog = function(id,params) {
    _chainNodeCreator(id,params,false,'Dialog',KEY_DIALOGS);
    return this;
  },

  _removeDialog = function(dialogId) {
    _chainNodeRemover(dialogId,KEY_DIALOGS);
    return this;
  },

  _addCondition = function(id,params) {
    _chainNodeCreator(id,params,false,'Condition',KEY_CONDITIONS);
    return this;
  },

  _removeCondition = function(conditionId) {
    _chainNodeRemover(conditionId,KEY_CONDITIONS);
    return this;
  },

  _addVariable = function(id,params) {
    _chainNodeCreator(id,params,false,'Variable',KEY_VARIABLES);
    return this;
  },

  _removeVariable = function(variableId) {
    _chainNodeRemover(variableId,KEY_VARIABLES);
    return this;
  },

  _addTalk = function(id,params) {
    _chainNodeCreator(id,params,true,'Talk',KEY_TALKS);
    return this;
  },

  _removeTalk = function(id) {
    _chainNodeRemover(id,KEY_TALKS);
    return this;
  },

  _addAnswer = function(id,params) {
    _chainNodeCreator(id,params,true,'Answer',KEY_ANSWERS);
    return this;
  },

  _removeAnswer = function(id) {
    _chainNodeRemover(id,KEY_ANSWERS);
    return this;
  },

  _inp = function(type,id) {
    _chainLinkCreator(type,id,'inp','out');
    return this;
  },

  _out = function(type,id) {
    _chainLinkCreator(type,id,'out','inp');
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
    ////////////////////////////////////////////
    //General node methods
    ////////////////////////////////////////////
    findNode:         _findNode,
    getNode:          _getNode,
    addNode:          _addNode,
    removeNode:       _removeNode,

    ////////////////////////////////////////////
    //Link creation methods
    ////////////////////////////////////////////
    setConnection:    _setConnection,
    getConnection:    _getConnection,
    getConnections:   _getConnections,
    removeConnection: _removeConnection,

    ////////////////////////////////////////////
    //Chainable methods
    ////////////////////////////////////////////
    addActor:        _addActor,
    removeActor:     _removeActor,
    addQuest:        _addQuest,
    removeQuest:     _removeQuest,
    addDialog:       _addDialog,
    removeDialog:    _removeDialog,
    addCondition:    _addCondition,
    removeCondition: _removeCondition,
    addVariable:     _addVariable,
    removeVariable:  _removeVariable,
    addTalk:         _addTalk,
    removeTalk:      _removeTalk,
    addAnswer:       _addAnswer,
    removeAnswer:    _removeAnswer,
    inp:             _inp,
    out:             _out,

    ////////////////////////////////////////////
    //Getter methods
    ////////////////////////////////////////////
    getActor:        _getActor,
    getActors:       _getActors,
    getCondition:    _getCondition,
    getConditions:   _getConditions,
    getDialog:       _getDialog,
    getDialogs:      _getDialogs,
    getQuest:        _getQuest,
    getQuests:       _getQuests,
    getVariable:     _getVariable,
    getVariables:    _getVariables,

    ////////////////////////////////////////////
    //Miscalineus methods
    ////////////////////////////////////////////
    serializeData:    _serializeData
  };
};
module.exports = RPGSystem;
