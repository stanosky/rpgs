'use strict';

import ErrorCode from './ErrorCode';


let ErrorHandler = function (editor) {
  return {
    showMsg: function (errorCode, params) {
      let msg = '';

      switch (errorCode) {
        case ErrorCode.NODE_NOT_EXISTS:
          msg = `Node of type ${params.type} is not defined.`;
          break;
        case ErrorCode.CLASS_NOT_DEFINED:
          msg = `Class ${params.class} is not defined.`;
          break;
        case ErrorCode.CONNECTION_TO_ITSELF:
          msg = `Cannot connect node "${params.node}" to itself.`;
          break;
        case ErrorCode.IMPROPER_CONNECTION:
          msg = `Cannot create connection of type "${params.type}"` +
          ` from node id "${params.node1}" to node id "${params.node2}".`;
          break;
        case ErrorCode.OBJECT_NOT_FOUND:
          msg = `Cannot find object with id "${params.id}"`;
          break;
        case ErrorCode.MANDATORY_PARAM:
          msg = `Parameter "${params.param}" was expected but instead got undefined.`;
          break;
        case ErrorCode.INCORRECT_TYPE:
          msg = `Wrong type of argument. Expected "${params.type}"`;
          break;
        case ErrorCode.INCORRECT_PARENT_NODE:
          msg = `Node of type "${params.child}" can be added only to "${params.parent}" node.`;
          break;
        case ErrorCode.INCORRECT_LINK_TARGET:
          msg = `Cannot create link connection to null node.`;
          break;
        case ErrorCode.INCOMPATIBLE_CHILD:
          msg = `Cannot add child of type "${params.child}" into parent of type "${params.parent}".`;
          break;
        default:
          msg = `Unknown error code passed: ${errorCode}`;
      }
      if (editor) {
        editor.showMsg(msg);
      } else {
        throw new Error(msg);
        // add warning mode?
      }
    }
  };
};

module.exports = ErrorHandler;
