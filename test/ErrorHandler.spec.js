'use strict'
const ErrorHandler = require('../src/rpgs/core/ErrorHandler');
const ErrorCode = require('../src/rpgs/core/ErrorCode');

const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const NodeFactory = require('../src/rpgs/core/NodeFactory');
const expect = chai.expect;
const assert = chai.assert;
chai.use(sinonChai);

let fake_logger = sinon.stub();

let params;
let instance;
let wrapper;

describe('Given an instance of ErrorHandler',function () {
  beforeEach(function () {
    instance = new ErrorHandler();
  });
  describe('#setLogger()',function() {
    it('should set logger handler function', () => {
      instance.setLogger(fake_logger);
      instance.showMsg(0,{type:'BaseNode'});
      expect(fake_logger).have.been.calledWith('Node of type BaseNode is not defined.');
    });
  });
  describe('#showMsg()',function() {
    it('should throw NODE_NOT_EXISTS error', () => {
      wrapper = function() {
        instance.showMsg(ErrorCode.NODE_NOT_EXISTS,{type:'nodeType'})
      };
      expect(wrapper).to.throw(Error);
    });
    it('should throw CLASS_NOT_DEFINED error', () => {
      wrapper = function() {
        instance.showMsg(ErrorCode.CLASS_NOT_DEFINED,{class:'className'})
      };
      expect(wrapper).to.throw(Error);
    });
    it('should throw CONNECTION_TO_ITSELF error', () => {
      wrapper = function() {
        instance.showMsg(ErrorCode.CONNECTION_TO_ITSELF,{node:'nodeId'})
      };
      expect(wrapper).to.throw(Error);
    });
    it('should throw IMPROPER_CONNECTION error', () => {
      wrapper = function() {
        instance.showMsg(ErrorCode.IMPROPER_CONNECTION,{
          type:'nodeType',
          node1:'n1',
          node2:'n2'
        })
      };
      expect(wrapper).to.throw(Error);
    });
    it('should throw OBJECT_NOT_FOUND error', () => {
      wrapper = function() {
        instance.showMsg(ErrorCode.OBJECT_NOT_FOUND,{id:'nodeId'})
      };
      expect(wrapper).to.throw(Error);
    });
    it('should throw MANDATORY_PARAM error', () => {
      wrapper = function() {
        instance.showMsg(ErrorCode.MANDATORY_PARAM,{param:'paramName'})
      };
      expect(wrapper).to.throw(Error);
    });
    it('should throw INCORRECT_TYPE error', () => {
      wrapper = function() {
        instance.showMsg(ErrorCode.INCORRECT_TYPE,{type:'nodeType'})
      };
      expect(wrapper).to.throw(Error);
    });
    it('should throw INCORRECT_PARENT_NODE error', () => {
      wrapper = function() {
        instance.showMsg(ErrorCode.INCORRECT_PARENT_NODE,{
          child:'childNodeId',
          parent:'parentNodeId'
        })
      };
      expect(wrapper).to.throw(Error);
    });
    it('should throw INCORRECT_LINK_TARGET error', () => {
      wrapper = function() {
        instance.showMsg(ErrorCode.INCORRECT_LINK_TARGET)
      };
      expect(wrapper).to.throw(Error);
    });
    it('should throw INCOMPATIBLE_CHILD error', () => {
      wrapper = function() {
        instance.showMsg(ErrorCode.INCOMPATIBLE_CHILD,{
          child:'childNodeId',
          parent:'parentNodeId'
        })
      };
      expect(wrapper).to.throw(Error);
    });
    it('should throw default error', () => {
      wrapper = function() {
        instance.showMsg(999);
      };
      expect(wrapper).to.throw(Error);
    });
  });

});
