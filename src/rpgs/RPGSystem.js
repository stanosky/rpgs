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

const RPGSystem = function (data, editor) {

  const _data = data || '[]';
  const _editor = editor || null;
  const _errorHandler = new ErrorHandler(_editor);
  const _nodePool = new NodePool(_errorHandler);
  const _nodeFactory = new NodeFactory(_nodePool, _errorHandler);
  const _nodeCreator = new NodeCreator(_nodePool, _nodeFactory, _errorHandler);

  JSON.parse(_data).map((d) => {
    _nodePool.addNode(_nodeFactory.createNode(d));
  });

  return {
    createNode: _nodeFactory.createNode,

    addDialog: _nodeCreator.addDialog,
    addTalk: _nodeCreator.addTalk,
    addAnswer: _nodeCreator.addAnswer,
    addWire: _nodeCreator.addWire,
    addNode: _nodeCreator.addNode,

    findNode: _nodePool.findNode,
    removeNode: _nodePool.removeNode,
    getNodes: _nodePool.getNodes,

    serialize: _nodePool.serialize,
    toString: _nodePool.serialize  // it is just alias of serialize
  };
};

module.exports = RPGSystem;
