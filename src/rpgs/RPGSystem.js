/**
 * Role-Playing Game System
 * @author Krzysztof Stano (stanosky)
 * @license MIT license
 * @link https://github.com/stanosky/rpgs
 * @version 1.0.0rc
 **/

'use strict';
import ErrorHandler from './core/ErrorHandler';
import NodePool from './core/NodePool';
import NodeFactory from './core/NodeFactory';
import NodeCreator from './core/NodeCreator';

const RPGSystem = function () {

  const _errorHandler = new ErrorHandler();
  const _nodePool = new NodePool(_errorHandler);
  const _nodeFactory = new NodeFactory(_nodePool, _errorHandler);
  const _nodeCreator = new NodeCreator(_nodePool, _nodeFactory, _errorHandler);

  function _mergeNodes(data) {
    data.forEach((d) => {
      _nodePool.addNode(_nodeFactory.createNode(d));
    });
  }

  function _setData(data) {
    let _data = data || '[]';

    _nodePool.clearData();
    _mergeNodes(JSON.parse(_data));
  }

  function _setLogger(logger) {
    _errorHandler.setLogger(logger);
  }

  return {
    setData: _setData,
    setLogger: _setLogger,
    mergeNodes: _mergeNodes,

    addDialog: _nodeCreator.addDialog,
    addTalk: _nodeCreator.addTalk,
    addAnswer: _nodeCreator.addAnswer,
    addWire: _nodeCreator.addWire,
    addNode: _nodeCreator.addNode,

    findNode: _nodePool.findNode,
    removeNode: _nodePool.removeNode,
    getNodes: _nodePool.getNodes,
    getData: _nodePool.getData,
    clearData: _nodePool.clearData,
    serialize: _nodePool.serialize,
    toString: _nodePool.serialize  // it is just alias of serialize
  };
};

module.exports = RPGSystem;
