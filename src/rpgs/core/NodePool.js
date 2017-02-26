'use strict';
import Utils from './Utils';
// import ErrorCode from './core/ErrorCode';

const NodePool = function (errorHandler) {
  // const _errorHandler = errorHandler;
  let _objectPool = [];

  function _findNode(nodeId) {
    var i;

    for (i = 0; i < _objectPool.length; i++) {
      if (_objectPool[i].getId() === nodeId) return _objectPool[i];
    }
    return null;
  }

  function _addNode(node) {
    if (!node.getId) return; // _errorHandler.showMsg();
    _objectPool.push(node);
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

  function _getNodesByClass(className) {
    return _objectPool.filter((node) => {
      return node.getData().class === className;
      // return node.constructor.name === className;
    });
  }

  function _getNodes(className = '') {
    return className === '' ? _objectPool.slice() : _getNodesByClass(className);
  }

  function _getData() {
    return _objectPool.map((obj) => {
      return obj.getData ? obj.getData() : obj;
    });
  }

  function _clearData() {
    _objectPool.forEach(obj => obj.dispose());
    _objectPool = [];
  }

  function _serialize() {
    return JSON.stringify(_getData());
  }

  return {
    findNode: _findNode,
    addNode: _addNode,
    removeNode: _removeNode,
    getNodes: _getNodes,
    getData: _getData,
    serialize: _serialize,
    clearData: _clearData
  };
};

module.exports = NodePool;
