'use strict';

import ErrorCode from './ErrorCode';

const NodeCreator = function (nodePool, errorHandler) {
  const _nodePool = nodePool,
    _errorHandler = errorHandler;

  let _lastChild = null,
    _parentHistory = [],
    _tempWires = [];

  function _setConnection(type, nodeId1, nodeId2) {
    if (nodeId1 === nodeId2) {
      _errorHandler.showMsg(ErrorCode.CONNECTION_TO_ITSELF, {node: nodeId1});
    }

    let node1 = _nodePool.findNode(nodeId1);
    let node2 = _nodePool.findNode(nodeId2);

    if (node2 === null) {
      _tempWires.push({type: type, targetNode: nodeId1, referenceNode: nodeId2});
      return;
    }

    if (node1.canRecieveWire(type) && node2.canBeWiredTo(type)) {
      node1.addWire(type, node2.getId());
    } else {
      _errorHandler.showMsg(ErrorCode.IMPROPER_CONNECTION, {
        type: type,
        node1: nodeId1,
        node2: nodeId2
      });
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
      // We create a new child node in parent
      _lastChild = _parentHistory[0].addChild(nodeParams);
    }
    // Test if node should be added as child or parent.
    if (asChild) {
      // If last added child was not null then we must check additional conditions.
      if (_lastChild !== null) {
        // If constructor name of previous child node, is equal to name of class,
        // whose we try to create, it means node should be added to current parent.
        if (_lastChild.getData().class === params.class) {
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
                  _parentHistory[0].getData().class : 'null'
        });
      }
    } else {
      // If node is added as parent, then last child is set to null
      // and parent history is cleared.
      _lastChild = null;
      _parentHistory.length = 0;
      // After that, new node is created.
      _parentHistory = [_nodePool.addNode(params)];
    }

    _getWaitingWiresForNode(params.uuid).map((wire) => {
      _setConnection(wire.type, wire.targetNode, wire.referenceNode);
    });
  }

  function _addNode(className, params = {}) {
    let _params = params;

    _params.class = className;
    _nodePool.addNode(_params);
    /* _nodeCreator(_params, false);*/
    return this;
  }

  function _addDialog(id = _errorHandler.showMsg(ErrorCode.MANDATORY_PARAM,
                                {param: 'id'})) {
    let params = {
      uuid: id,
      class: 'DialogNode'
    };

    _nodeCreator(params, false);
    return this;
  }

  function _addTalk(id = _errorHandler.showMsg(ErrorCode.MANDATORY_PARAM,
                                {param: 'id'}), text = '') {
    let params = {
      uuid: id,
      text: text,
      class: 'TalkNode'
    };

    _nodeCreator(params, true);
    return this;
  }

  function _addAnswer(text = '') {
    let params = {
      text: text,
      class: 'AnswerNode'
    };

    _nodeCreator(params, true);
    return this;
  }

  function _addWire(type, referenceNodeId) {
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
    return this;
  }

  return {
    addNode: _addNode,
    addDialog: _addDialog,
    addTalk: _addTalk,
    addAnswer: _addAnswer,
    addWire: _addWire,
    setConnection: _setConnection
  };

};

module.exports = NodeCreator;
