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
  const _nodeFactory = new NodeFactory(_errorHandler);
  const _nodePool = new NodePool(_nodeFactory, _errorHandler);
  const _nodeCreator = new NodeCreator(_nodePool, _errorHandler);

  function _mergeNodes(data) {
    let _data = data || '[]';

    JSON.parse(_data).forEach((d) => {
      _nodePool.removeNode(d.uuid);
      _nodePool.addNode(d);
    });
  }

  function _setData(data) {
    _nodePool.clearData();
    _mergeNodes(data);
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
