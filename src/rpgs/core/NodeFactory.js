'use strict';

import ErrorCode from './ErrorCode';
import BaseNode from './BaseNode';
import AnswerNode from '../dialogs/AnswerNode';
import DialogNode from '../dialogs/DialogNode';
import TalkNode from '../dialogs/TalkNode';

const NodeFactory = function(nodePool, errorHandler) {

  const _nodePool = nodePool;
  const _errorHandler = errorHandler;

  function _createNode(data) {
    let className = data.class;

    //console.log('NodeFactory::createNode', _nodePool);
    switch (className) {
      case 'BaseNode': return new BaseNode(data, _nodePool);
      case 'AnswerNode': return new AnswerNode(data, _nodePool);
      case 'DialogNode': return new DialogNode(data, _nodePool);
      case 'TalkNode': return new TalkNode(data, _nodePool);
      default:
        _errorHandler.showMsg(ErrorCode.CLASS_NOT_DEFINED, {class: className});
        return null;
    }
  }

  return {
    createNode: _createNode
  };
};

module.exports = NodeFactory;
