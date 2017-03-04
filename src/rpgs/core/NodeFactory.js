'use strict';

import ErrorCode from './ErrorCode';
import BaseNode from './BaseNode';
import AnswerNode from '../dialogs/AnswerNode';
import DialogNode from '../dialogs/DialogNode';
import TalkNode from '../dialogs/TalkNode';

const NodeFactory = function (errorHandler) {

  const _errorHandler = errorHandler;

  function _createNode(nodePool, data) {
    let className = data.class;

    // console.log('_createNode',_nodePool);
    switch (className) {
      case 'BaseNode': return new BaseNode(nodePool, data);
      case 'AnswerNode': return new AnswerNode(nodePool, data);
      case 'DialogNode': return new DialogNode(nodePool, data);
      case 'TalkNode': return new TalkNode(nodePool, data);
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
