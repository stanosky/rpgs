'use strict';
import Utils from './Utils';
// import ErrorCode from './core/ErrorCode';

const NodePool = function (nodeFactory, errorHandler) {
  const _nodeFactory = nodeFactory;
  // const _errorHandler = errorHandler;
  let _objectPool = [];

  function findNode(nodeId) {
    var i;

    for (i = 0; i < _objectPool.length; i++) {
      if (_objectPool[i].getId() === nodeId) return _objectPool[i];
    }
    return null;
  }

  function addNode(params) {
    let node = _nodeFactory.createNode(this, params);

    if (node !== null) _objectPool.push(node);
    return node;
  }

  function removeNode(id) {
    let index = Utils.getIndexById(_objectPool, id);
    let isNodeFound = index > -1;

    if (isNodeFound) {
      let node = _objectPool.splice(index, 1)[0];

      node.dispose();
    }
    return isNodeFound;
  }

  function getNodesByClass(className) {
    return _objectPool.filter((node) => {
      return node.getData().class === className;
      // return node.constructor.name === className;
    });
  }

  function getNodes(className = '') {
    return className === '' ? _objectPool.slice() : getNodesByClass(className);
  }

  function getData() {
    return _objectPool.map((obj) => {
      return obj.getData ? obj.getData() : obj;
    });
  }

  function clearData() {
    _objectPool.forEach(obj => obj.dispose());
    _objectPool = [];
  }

  function serialize() {
    return JSON.stringify(getData());
  }

  return {
    findNode: findNode,
    addNode: addNode,
    removeNode: removeNode,
    getNodes: getNodes,
    getData: getData,
    serialize: serialize,
    clearData: clearData
  };
};

module.exports = NodePool;
