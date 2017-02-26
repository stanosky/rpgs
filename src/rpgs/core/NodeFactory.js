'use strict';

import ErrorCode from './ErrorCode';
import BaseNode from './BaseNode';
import AnswerNode from '../dialogs/AnswerNode';
import DialogNode from '../dialogs/DialogNode';
import TalkNode from '../dialogs/TalkNode';

const NodeFactory = function (nodePool, errorHandler) {

  const _nodePool = nodePool;
  const _errorHandler = errorHandler;

  function _createNode(data) {
    let className = data.class;

    // console.log('_createNode',_nodePool);
    switch (className) {
      case 'BaseNode': return new BaseNode(_nodePool, data);
      case 'AnswerNode': return new AnswerNode(_nodePool, data);
      case 'DialogNode': return new DialogNode(_nodePool, data);
      case 'TalkNode': return new TalkNode(_nodePool, data);
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
