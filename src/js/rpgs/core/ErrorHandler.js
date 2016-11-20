"use strict";

import ErrorCode from './ErrorCode';


let ErrorHandler = function(editor){
  return {
    showMsg:function(errorCode,params) {
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
          msg = `Cannot create connection of type "${params.type}" from node id "${params.node1}" to node id "${params.node2}".`;
          break;
        case ErrorCode.OBJECT_NOT_FOUND:
          msg = `Cannot find object with id "${params.id}"`;
          break;
        default:
          msg = `Unknown error code passed: ${errorCode}`;
      }
      if(editor) {
        editor.showMsg(msg);
      } else {
        throw new Error(msg);
      }
    }
  };
};
module.exports = ErrorHandler;
