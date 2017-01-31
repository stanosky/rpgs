'use strict';
import Utils from './core/Utils';
import BaseNode from './core/BaseNode';
import ErrorHandler from './core/ErrorHandler';
import ErrorCode from './core/ErrorCode';
import AnswerNode from './dialogs/AnswerNode';
import DialogNode from './dialogs/DialogNode';
import TalkNode from './dialogs/TalkNode';

let RPGSystem = function (data, editor) {

  let _objectPool = [],
    _editor = editor || null,
    _errorHandler = new ErrorHandler(_editor),
    _lastChild = null,
    _parentHistory = [],
    _tempWires = [],
    _self = {};

  /**
   * Method used to check passed parameters and later merge them into
   * single object.
   * @param  {string} id      Mandatory id of node.
   * @param  {object} params  Optional parameters.
   * @return {object} Parameters merged into object.
   */
  function _checkAndMergeParams(id = _errorHandler.showMsg(ErrorCode.MANDATORY_PARAM,
                                {param: 'id'}), params) {
    if (typeof id !== 'string') {
      _errorHandler.showMsg(ErrorCode.INCORRECT_TYPE, {type: 'string'});
    }
    if (params !== undefined && typeof params !== 'object') {
      _errorHandler.showMsg(ErrorCode.INCORRECT_TYPE, {type: 'object'});
    } else if (params === undefined) {
      params = {};
    }
    params.uuid = id;
    return params;
  }

  function _findNode(nodeId) {
    var i;

    for (i = 0; i < _objectPool.length; i++) {
      if (_objectPool[i].getId() === nodeId) return _objectPool[i];
    }
    return null;
  }

  function _setConnection(type, nodeId1, nodeId2) {
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
  }

  function _nodeFactory(data, rpgs) {
    let className = data.class;

    switch (className) {
      case 'BaseNode': return new BaseNode(data, rpgs);
      case 'AnswerNode': return new AnswerNode(data, rpgs);
      case 'DialogNode': return new DialogNode(data, rpgs);
      case 'TalkNode': return new TalkNode(data, rpgs);
      default:
        _errorHandler.showMsg(ErrorCode.CLASS_NOT_DEFINED, {class: className});
        return null;
    }
  }

  function _getWaitingWiresForNode(nodeId) {
    let wires = [], i;

    for (i = _tempWires.length - 1; i >= 0 ; i--) {
      if (_tempWires[i].referenceNode === nodeId) {
        wires.push(_tempWires.splice(i, 1)[0]);
      }
    }
    return wires;
  }

  /**
   * This method helps in the creation of nodes. Its focus on proper
   * placement of nodes in tree.
   * @param  {object} params  Parameters of created node.
   * @param  {boolean} asChild Determines if node should be added as child
   * of another node or as an independent node.
   */
  function _nodeCreator(params, asChild) {
    function createChildNode(nodeParams) {
      // We create a new node, and then set as the last child.
      _lastChild = _nodeFactory(nodeParams, _self);
      // Then we add our freshly created node to its parent.
      _parentHistory[0].addChild(_lastChild.getId());
      // Finally new node is added to main storage object.
      _objectPool.push(_lastChild);
    }
    // Test if node should be added as child or parent.
    if (asChild) {
      // If last added child was not null then we must check additional conditions.
      if (_lastChild !== null) {
        // If constructor name of previous child node, is equal to name of class,
        // whose we try to create, it means node should be added to current parent.
        if (_lastChild.constructor.name === params.class) {
          createChildNode(params);
        // If names of constructors not match, then we must check if new node
        // can be added as child to our previous child.
        } else if (_lastChild.canAddChild(params.class)) {
          _parentHistory.unshift(_lastChild);
          createChildNode(params);
        // Finally if previous conditions are false we try go back to previous
        // parent node.
        } else {
          _lastChild = _parentHistory.shift() || null;
          _nodeCreator(params, asChild);
        }
      // If last child is null, then we check if node can be added to current
      // parent node.
      } else if (_parentHistory.length > 0 && _parentHistory[0].canAddChild(params.class)) {
        createChildNode(params);
      // If last child and last parent is equal to null, then new child node
      // cant be added, so we throw error.
      } else {
        _errorHandler.showMsg(ErrorCode.INCOMPATIBLE_CHILD, {
          child: params.class,
          parent: _parentHistory.length > 0 ?
                  _parentHistory[0].constructor.name : 'null'
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
  }

  function _removeNode(id) {
    let index = Utils.getIndexById(_objectPool, id);
    let isNodeFound = index > -1;

    if (isNodeFound) {
      let node = _objectPool.splice(index, 1)[0];

      node.dispose();
    }
    return isNodeFound;
  }

  function _addNode(className, params, asChild) {
    params.class = className;
    _nodeCreator(params, asChild);
    return _self;
  }

  function _chainNodeCreator(id, params, asChild, className) {
    // First, we check that id and params are valid.
    params = _checkAndMergeParams(id, params);
    // Class name for later usage.
    params.class = className;
    _nodeCreator(params, asChild);
    return _self;
  }

  function _addDialog(id, params) {
    return _chainNodeCreator(id, params, false, 'DialogNode');
  }

  function _addTalk(id, params) {
    return _chainNodeCreator(id, params, true, 'TalkNode');
  }

  function _addAnswer(id, params) {
    return _chainNodeCreator(id, params, true, 'AnswerNode');
  }

  function _setWire(type, referenceNodeId) {
    let targetNode = _lastChild;

    if (targetNode === null && _parentHistory.length > 0) {
      targetNode = _parentHistory[0];
    } else {
      /* _errorHandler.showMsg(ErrorCode.INCOMPATIBLE_CHILD,{
        child:className,
        parent: _parentHistory.length > 0
              ? _parentHistory[0].constructor.name
              : 'null'
      });*/
    }
    _setConnection(type, targetNode.getId(), referenceNodeId);
    return _self;
  }

  function _getNodesByClass(className) {
    return _objectPool.filter((node) => {
      return node.constructor.name === className;
    });
  }

  // //////////////////////////////////////////////////////////////
  // GETTERS
  // //////////////////////////////////////////////////////////////

  function _getDialogs() {
    return _getNodesByClass('DialogNode');
  }

  // //////////////////////////////////////////////////////////////
  // MISCALINEUS
  // //////////////////////////////////////////////////////////////

  function _serializeData() {
    let data = _objectPool.map((obj) => {
      return obj.getData ? obj.getData() : obj;
    });

    return JSON.stringify(data);
  }

  if (data) _objectPool = JSON.parse(data).map((d) => _nodeFactory(d, _self));

  _self = {
    // //////////////////////////////////////////
    // General node methods
    // //////////////////////////////////////////
    findNode: _findNode,
    addNode: _addNode,
    removeNode: _removeNode,

    // //////////////////////////////////////////
    // Link creation methods
    // //////////////////////////////////////////
    setWire: _setWire,

    // //////////////////////////////////////////
    // Chainable methods
    // //////////////////////////////////////////
    addDialog: _addDialog,
    addTalk: _addTalk,
    addAnswer: _addAnswer,

    // //////////////////////////////////////////
    // Getter methods
    // //////////////////////////////////////////
    getDialogs: _getDialogs,

    // //////////////////////////////////////////
    // Miscalineus methods
    // //////////////////////////////////////////
    serializeData: _serializeData
  };

  return _self;
};

module.exports = RPGSystem;
