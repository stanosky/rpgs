"use strict";
import Utils            from './core/Utils';
import ErrorHandler     from './core/ErrorHandler'
import ErrorCode        from './core/ErrorCode';
import BaseNode         from './core/BaseNode';
import ActorNode        from './actors/ActorNode';
//import InventoryNode  from './actors/InventoryNode';
import ScriptNode       from './logic/ScriptNode';
import AnswerNode       from './dialogs/AnswerNode';
import DialogNode       from './dialogs/DialogNode';
import TalkNode         from './dialogs/TalkNode';
import QuestNode        from './quests/QuestNode';
import TaskNode         from './quests/TaskNode';
import VariableNode     from './variables/VariableNode';

const KEY_ACTORS = 'actors';
const KEY_ANSWERS = 'answers';
const KEY_LOGIC = 'logic';
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
  _tempWires = [];

  function _nodeFactory(data,rpgs) {
    let className = data.class;
    switch (className) {
      case 'ActorNode':     return new ActorNode(data,rpgs);
      case 'ScriptNode':    return new ScriptNode(data,rpgs);
      case 'AnswerNode':    return new AnswerNode(data,rpgs);
      case 'DialogNode':    return new DialogNode(data,rpgs);
      case 'TalkNode':      return new TalkNode(data,rpgs);
      case 'QuestNode':     return new QuestNode(data,rpgs);
      case 'TaskNode':      return new TaskNode(data,rpgs);
      //case 'LinkNode':      return new LinkNode(data,rpgs);
      case 'VariableNode':  return new VariableNode(data,rpgs);
      default:
        _errorHandler.showMsg(ErrorCode.CLASS_NOT_DEFINED,{class:className});
        return null;
    }
  }

  function _findNodeInArray(array,id) {
    for (var i = 0; i < array.length; i++) {
      if(array[i].getId() === id) return array[i];
    }
    return null;
  }

  let _findNode = function(objId) {
    for (var key in _objectPool) {
      if (_objectPool.hasOwnProperty(key)) {
        let obj = _findNodeInArray(_objectPool[key],objId);
        if(obj !== null) return obj;
      }
    }
    //Is error message neccessary here? To consider.
    //_errorHandler.showMsg(ErrorCode.OBJECT_NOT_FOUND,{id:objId});
    return null;
  },

  _addNode = function(key,obj) {
    if(!_objectPool[key]) _objectPool[key] = [];
    _objectPool[key].push(obj);
  },

  _removeNode = function(id) {
    for (var key in _objectPool) {
      if (_objectPool.hasOwnProperty(key)) {
        if(this._removeNodeByKey(key,id)) return true;
      }
    }
    return false;
  },

  _removeNodeByKey = function(key,id) {
    let index = Utils.getIndexById(_objectPool[key],id);
    let isNodeFound = index > -1;
    if(isNodeFound) {
      let node = _objectPool[key].splice(index,1)[0];
      node.dispose();
    }
    return isNodeFound;
  },

  _setConnection = function(type,nodeId1,nodeId2) {
    if(nodeId1 === nodeId2) {
      _errorHandler.showMsg(ErrorCode.CONNECTION_TO_ITSELF,{node:nodeId1});
    }
    let node1 = _findNode(nodeId1);
    let node2 = _findNode(nodeId2);
    if(node2 === null) {
      console.log('rpgs::tempWire',type,nodeId1,nodeId2);
      _tempWires.push({type:type,targetNode:nodeId1,referenceNode:nodeId2});
      return;
    }
    if(node1.canSetWireType(type)) {
      console.log('rpgs::createWire',type,nodeId1,nodeId2);
      node1.setWire(type,node2.getId());
    } else {
      _errorHandler.showMsg(ErrorCode.IMPROPER_CONNECTION,{
        type:type,
        node1:nodeId1,
        node2:nodeId2
      });
    }
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
      let node = _nodeFactory(params,_self);
      _parentHistory = [node];
      _addNode(storage,node);
    }

    _getWaitingWiresForNode(id).map((wire) => {
      //console.log('wire',wire,wire.type,wire.targetNode,wire.referenceNode);
      _setConnection(wire.type,wire.targetNode,wire.referenceNode);
      return null;
    });

    function createChildNode(nodeParams) {
      //We create a new node, and then set as the last child.
      _lastChild = _nodeFactory(nodeParams,_self);
      //Then we add our freshly created node to its parent.
      _parentHistory[0].addChild(_lastChild.getId());
      //Finally new node is added to main storage object.
      _addNode(storage,_lastChild);
    }
  }

  function _getWaitingWiresForNode(nodeId) {
    let wires = [];
    for (var i = _tempWires.length - 1; i >= 0 ; i--) {
      //console.log('_getWaitingWiresForNode',_tempWires[i].referenceNode,nodeId);
      if(_tempWires[i].referenceNode === nodeId) {
        wires.push(_tempWires.splice(i,1)[0]);
      }
    }
    return wires;
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
    this._removeNodeByKey(key,id);
  }

  let _addActor = function(id,params) {
    _chainNodeCreator(id,params,false,'ActorNode',KEY_ACTORS);
    return this;
  },

  _removeActor = function(actorId) {
    _chainNodeRemover(actorId,KEY_ACTORS);
    return this;
  },

  _addQuest = function(id,params) {
    _chainNodeCreator(id,params,false,'QuestNode',KEY_QUESTS);
    return this;
  },

  _removeQuest = function(questId) {
    _chainNodeRemover(questId,KEY_QUESTS);
    return this;
  },

  _addDialog = function(id,params) {
    _chainNodeCreator(id,params,false,'DialogNode',KEY_DIALOGS);
    return this;
  },

  _removeDialog = function(dialogId) {
    _chainNodeRemover(dialogId,KEY_DIALOGS);
    return this;
  },

  _addCondition = function(id,params) {
    _chainNodeCreator(id,params,false,'ScriptNode',KEY_LOGIC);
    return this;
  },

  _removeCondition = function(conditionId) {
    _chainNodeRemover(conditionId,KEY_LOGIC);
    return this;
  },

  _addVariable = function(id,params) {
    _chainNodeCreator(id,params,false,'VariableNode',KEY_VARIABLES);
    return this;
  },

  _removeVariable = function(variableId) {
    _chainNodeRemover(variableId,KEY_VARIABLES);
    return this;
  },

  _addTalk = function(id,params) {
    _chainNodeCreator(id,params,true,'TalkNode',KEY_TALKS);
    return this;
  },

  _removeTalk = function(id) {
    _chainNodeRemover(id,KEY_TALKS);
    return this;
  },

  _addAnswer = function(id,params) {
    _chainNodeCreator(id,params,true,'AnswerNode',KEY_ANSWERS);
    return this;
  },

  _removeAnswer = function(id) {
    _chainNodeRemover(id,KEY_ANSWERS);
    return this;
  },

  _setWire = function(type,referenceNodeId) {
    let targetNode = _lastChild;
    if(targetNode === null && _parentHistory.length > 0) {
      targetNode = _parentHistory[0];
    }
    else {
      /*_errorHandler.showMsg(ErrorCode.INCOMPATIBLE_CHILD,{
        child:className,
        parent: _parentHistory.length > 0
              ? _parentHistory[0].constructor.name
              : 'null'
      });*/
    }
    _setConnection(type,targetNode.getId(),referenceNodeId);
    return this;
  },

  ////////////////////////////////////////////////////////////////
  //GETTERS
  ////////////////////////////////////////////////////////////////
  _getActor = function(actorId) {
    return this._findNode(actorId);
  },

  _getActors = function() {
    return _objectPool[KEY_ACTORS];
  },

  _getCondition = function(conditionId) {
    return _findNode(conditionId);
  },

  _getConditions = function() {
    return _objectPool[KEY_LOGIC];
  },

  _getDialog = function(dialogId) {
    return _findNode(dialogId);
  },

  _getDialogs = function() {
    return _objectPool[KEY_DIALOGS];
  },

  _getQuest = function(questId) {
    return _findNode(questId);
  },

  _getQuests = function() {
    return _objectPool[KEY_QUESTS];
  },

  _getVariable = function(variableId) {
    return _findNode(variableId);
  },

  _getVariables = function() {
    return _objectPool[KEY_VARIABLES];
  },

  ////////////////////////////////////////////////////////////////
  //MISCALINEUS
  ////////////////////////////////////////////////////////////////

  _setVar = function(variableId,value) {
    let _var = _getVariable(variableId);
    if(_var !== null) _var.setValue(value);
  },

  _getVar = function(variableId) {
    let _var = _getVariable(variableId);
    return _var !== null ? _var.getValue() : undefined;
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

  let _self = {
    ////////////////////////////////////////////
    //General node methods
    ////////////////////////////////////////////
    findNode:         _findNode,
    //getNode:          _getNode,
    addNode:          _addNode,
    removeNode:       _removeNode,

    ////////////////////////////////////////////
    //Link creation methods
    ////////////////////////////////////////////
    setWire:         _setWire,

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
    //inp:             _inp,
    //out:             _out,

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
    setVar:           _setVar,
    getVar:           _getVar,
    serializeData:    _serializeData
  };

  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      _objectPool[key] = data[key].map((d) => _nodeFactory(d,_self));
    }
  }

  return _self;
};
module.exports = RPGSystem;
