'use strict';
import Utils from './core/Utils';
import BaseNode from './core/BaseNode';
import ErrorHandler from './core/ErrorHandler';
import ErrorCode from './core/ErrorCode';
import ActorNode from './actors/ActorNode';
import ScriptNode from './logic/ScriptNode';
import AnswerNode from './dialogs/AnswerNode';
import DialogNode from './dialogs/DialogNode';
import TalkNode from './dialogs/TalkNode';
import QuestNode from './quests/QuestNode';
import TaskNode from './quests/TaskNode';
import VariableNode from './variables/VariableNode';

let RPGSystem = function (data, editor) {

  let _objectPool = [],
    _editor = editor || null,
    _errorHandler = new ErrorHandler(_editor),
    _lastChild = null,
    _parentHistory = [],
    _tempWires = [];

  function _nodeFactory(data,rpgs) {
    let className = data.class;

    switch (className) {
      case 'BaseNode': return new BaseNode(data,rpgs);
      case 'ActorNode': return new ActorNode(data,rpgs);
      case 'ScriptNode': return new ScriptNode(data,rpgs);
      case 'AnswerNode': return new AnswerNode(data,rpgs);
      case 'DialogNode': return new DialogNode(data,rpgs);
      case 'TalkNode': return new TalkNode(data,rpgs);
      case 'QuestNode': return new QuestNode(data,rpgs);
      case 'TaskNode': return new TaskNode(data,rpgs);
      case 'VariableNode': return new VariableNode(data,rpgs);
      default:
        _errorHandler.showMsg(ErrorCode.CLASS_NOT_DEFINED, {class: className});
        return null;
    }
  }

  let _findNode = function (nodeId) {
    var i;

    for (i = 0; i < _objectPool.length; i++) {
      if (_objectPool[i].getId() === nodeId) return _objectPool[i];
    }
    return null;
  },

  _removeNode = function (id) {
    let index = Utils.getIndexById(_objectPool, id);
    let isNodeFound = index > -1;

    if (isNodeFound) {
      let node = _objectPool.splice(index, 1)[0];

      node.dispose();
    }
    return isNodeFound;
  },

  _setConnection = function (type, nodeId1, nodeId2) {
    if (nodeId1 === nodeId2) {
      _errorHandler.showMsg(ErrorCode.CONNECTION_TO_ITSELF, {node: nodeId1});
    }

    let node1 = _findNode(nodeId1);
    let node2 = _findNode(nodeId2);

    if (node2 === null) {
      _tempWires.push({type: type, targetNode: nodeId1, referenceNode: nodeId2});
      return;
    }
    if (node1.canAddWireType(type)) {
      node1.setWire(type, node2.getId());
    } else {
      _errorHandler.showMsg(ErrorCode.IMPROPER_CONNECTION, {
        type: type,
        node1: nodeId1,
        node2: nodeId2
      });
    }
  };

  ////////////////////////////////////////////////////////////////
  // METHOD CHAINING
  ////////////////////////////////////////////////////////////////

  /**
   * Method used to check passed parameters and later merge them into
   * single object.
   * @param  {string} id      Mandatory id of node.
   * @param  {object} params  Optional parameters.
   * @return {object} Parameters merged into object.
   */
  function _checkAndMergeParams(
                id = _errorHandler.showMsg(ErrorCode.MANDATORY_PARAM, {param: 'id'}),
                params) {
      if (typeof id !== 'string') {
        _errorHandler.showMsg(ErrorCode.INCORRECT_TYPE, {type: 'string'});
      }
      if (params !== undefined && typeof params !== 'object') {
        _errorHandler.showMsg(ErrorCode.INCORRECT_TYPE, {type: 'object'});
      } else if (params === undefined){
        params = {};
      }
      params.uuid = id;
      return params;
  }

  function _chainNodeCreator(id, params, asChild, className) {
    // First, we check that id and params are valid.
    params = _checkAndMergeParams(id, params);
    // Class name for later usage.
    params.class = className;
    _nodeCreator(params, asChild);
    return _self;
  }

  /**
   * This method helps in the creation of nodes. Its focus on proper
   * placement of nodes in tree.
   * @param  {object} params  Parameters of created node.
   * @param  {boolean} asChild Determines if node should be added as child
   * of another node or as an independent node.
   */
  function _nodeCreator(params, asChild) {
    // Test if node should be added as child or parent.
    if (asChild) {
      // If last added child was not null then we must check additional conditions.
      if (_lastChild !== null) {
        // If constructor name of previous child node, is equal to name of class,
        // whose we try to create, it means node should be added to current parent.
        if (_lastChild.constructor.name === params.class) {
          createChildNode(params);
        }
        // If names of constructors not match, then we must check if new node
        // can be added as child to our previous child.
        else if (_lastChild.canAddChild(params.class)) {
          _parentHistory.unshift(_lastChild);
          createChildNode(params);
        }
        // Finally if previous conditions are false we try go back to previous
        // parent node.
        else {
          _lastChild = _parentHistory.shift() || null;
          _nodeCreator(params, asChild);
        }
      }
      // If last child is null, then we check if node can be added to current
      // parent node.
      else if (_parentHistory.length > 0 && _parentHistory[0].canAddChild(params.class)) {
        createChildNode(params);
      }
      // If last child and last parent is equal to null, then new child node
      // cant be added, so we throw error.
      else {
        _errorHandler.showMsg(ErrorCode.INCOMPATIBLE_CHILD,{
          child: params.class,
          parent: _parentHistory.length > 0
                ? _parentHistory[0].constructor.name
                : 'null'
        });
      }
    } else {
      // If node is added as parent, then last child is set to null
      // and parent history is cleared.
      _lastChild = null;
      _parentHistory.length = 0;
      // After that, new node is created.
      let node = _nodeFactory(params, _self);
      _parentHistory = [node];
      _objectPool.push(node);
    }

    _getWaitingWiresForNode(params.uuid).map((wire) => {
      _setConnection(wire.type, wire.targetNode, wire.referenceNode);
    });

    function createChildNode(nodeParams) {
      // We create a new node, and then set as the last child.
      _lastChild = _nodeFactory(nodeParams, _self);
      // Then we add our freshly created node to its parent.
      _parentHistory[0].addChild(_lastChild.getId());
      // Finally new node is added to main storage object.
      _objectPool.push(_lastChild);
    }
  }

  function _getWaitingWiresForNode(nodeId) {
    let wires = [];
    for (var i = _tempWires.length - 1; i >= 0 ; i--) {
      if (_tempWires[i].referenceNode === nodeId) {
        wires.push(_tempWires.splice(i, 1)[0]);
      }
    }
    return wires;
  }


  function _getNodesByClass(className) {
    return _objectPool.map((node) => {
      return node.constructor.name === className;
    });
  }

  /**
   * Helper method that is used to remove nodes from object pool
   * and reset context of 'method chaining' algorithm.
   * @param  {string} id  Id of node to be removed.
   */
  let _chainNodeRemover = function(id) {
    _lastChild = null;
    _parentHistory.length = 0;
    _removeNode(id);
    return this;
  },

  _addNode = function (className, params, asChild) {
    params.class = className;
    _nodeCreator(params, asChild);
    return this;
  },

  _addActor = function (id, params) {
    return _chainNodeCreator(id, params, false, 'ActorNode');
  },

  _addQuest = function (id, params) {
    return _chainNodeCreator(id, params, false, 'QuestNode');
  },

  _addDialog = function (id, params) {
    return _chainNodeCreator(id, params, false, 'DialogNode');
  },

  _addCondition = function (id, params) {
    return _chainNodeCreator(id, params, false, 'ScriptNode');
  },

  _addVariable = function (id, params) {
    return _chainNodeCreator(id, params, false, 'VariableNode');
  },

  _addTalk = function (id, params) {
    return _chainNodeCreator(id, params, true, 'TalkNode');
  },

  _addAnswer = function (id, params) {
    return _chainNodeCreator(id, params, true, 'AnswerNode');
  },

  _setWire = function (type, referenceNodeId) {
    let targetNode = _lastChild;
    if (targetNode === null && _parentHistory.length > 0) {
      targetNode = _parentHistory[0];
    }
    else {
      /* _errorHandler.showMsg(ErrorCode.INCOMPATIBLE_CHILD,{
        child:className,
        parent: _parentHistory.length > 0
              ? _parentHistory[0].constructor.name
              : 'null'
      });*/
    }
    _setConnection(type, targetNode.getId(), referenceNodeId);
    return this;
  },

  ////////////////////////////////////////////////////////////////
  //GETTERS
  ////////////////////////////////////////////////////////////////
  _getActors = function () {
    return _getNodesByClass('ActorNode');
  },

  _getConditions = function () {
    return _getNodesByClass('ScriptNode');
  },

  _getDialogs = function () {
    return _getNodesByClass('DialogNode');
  },

  _getQuests = function () {
    return _getNodesByClass('QuestNode');
  },

  _getVariables = function () {
    return _getNodesByClass('VariableNode');
  },

  ////////////////////////////////////////////////////////////////
  //MISCALINEUS
  ////////////////////////////////////////////////////////////////

  _setVar = function (variableId, value) {
    let _var = _findNode(variableId);
    if (_var !== null) _var.setValue(value);
  },

  _getVar = function (variableId) {
    let _var = _findNode(variableId);
    return _var !== null ? _var.getValue() : undefined;
  },

  _executeScript = function (scriptId) {
    let _script = _findNode(scriptId);
    return _script !== null && _script.execute ? _script.execute({rpgs:_self}) : true;
  },

  _serializeData = function () {
    let data = _objectPool.map((obj) => {
      return obj.getData ? obj.getData() : obj;
    });
    return JSON.stringify(data);
  };

  let _self = {
    ////////////////////////////////////////////
    // General node methods
    ////////////////////////////////////////////
    findNode: _findNode,
    addNode: _addNode,
    removeNode: _removeNode,

    ////////////////////////////////////////////
    // Link creation methods
    ////////////////////////////////////////////
    setWire: _setWire,

    ////////////////////////////////////////////
    // Chainable methods
    ////////////////////////////////////////////
    addActor: _addActor,
    addQuest: _addQuest,
    addDialog: _addDialog,
    addCondition: _addCondition,
    addVariable: _addVariable,
    addTalk: _addTalk,
    addAnswer: _addAnswer,

    ////////////////////////////////////////////
    // Getter methods
    ////////////////////////////////////////////
    getActors: _getActors,
    getConditions: _getConditions,
    getDialogs: _getDialogs,
    getQuests: _getQuests,
    getVariables: _getVariables,

    ////////////////////////////////////////////
    // Miscalineus methods
    ////////////////////////////////////////////
    setVar: _setVar,
    getVar: _getVar,
    executeScript: _executeScript,
    serializeData: _serializeData
  };
  if (data) _objectPool = data.map((d) => _nodeFactory(d, _self));

  return _self;
};
module.exports = RPGSystem;
