'use strict';

const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const NodePool = require('../src/rpgs/core/NodePool');
const expect = chai.expect;
const assert = chai.assert;
chai.use(sinonChai);

let params;
let instance;

let fake_eh_showMsg;
let fake_errorHandler;

let fake_bn_getId;
let fake_bn_dispose;
let fake_bn_getData;
let fake_BaseNode;

let fake_an_getId;
let fake_an_dispose;
let fake_an_getData;
let fake_AnswerNode;

describe('Given an instance of NodePool', function () {
  beforeEach(function () {
    fake_bn_getId = sinon.stub().returns('bn');
    fake_bn_dispose = sinon.stub();
    fake_bn_getData = sinon.stub().returns({class:'BaseNode'});
    fake_BaseNode = {
      getId: fake_bn_getId,
      getData: fake_bn_getData,
      dispose: fake_bn_dispose
    };

    fake_an_getId = sinon.stub().returns('an');
    fake_an_dispose = sinon.stub();
    fake_an_getData = sinon.stub().returns({class:'AnswerNode'});
    fake_AnswerNode = {
      getId: fake_an_getId,
      getData: fake_an_getData,
      dispose: fake_an_dispose
    };

    fake_eh_showMsg = sinon.stub().throws("Error");
    fake_errorHandler = {showMsg: fake_eh_showMsg};
    instance = new NodePool(fake_errorHandler);
  });
  describe('#addNode()', function () {
    it('should add node of given type', () => {
      instance.addNode(fake_BaseNode);
      expect(instance.findNode('bn')).to.equal(fake_BaseNode);
    });
  });
  describe('#findNode()', function () {
    it('should return null if nothing is passed', () => {
      expect(instance.findNode()).to.equal(null);
    });
    it('should return null if we pass invalid id', () => {
      expect(instance.findNode('invalid id')).to.equal(null);
    });
    it('should return BaseNode instance if we pass a valid id', () => {
      instance.addNode(fake_BaseNode);
      expect(instance.findNode('bn')).to.equal(fake_BaseNode);
    });
  });
  describe('#removeNode()', function () {
    it('should remove node with given id', () => {
      instance.addNode(fake_BaseNode);
      expect(instance.removeNode('bn')).to.equal(true);
      expect(instance.findNode('bn')).to.equal(null);
      expect(fake_bn_dispose).have.been.calledOnce;
    });
  });
  describe('#getNodes()',function() {
    it('should return array of available nodes', () => {
      instance.addNode(fake_BaseNode);
      instance.addNode(fake_AnswerNode);
      expect(instance.getNodes()).to.deep.equal([fake_BaseNode,fake_AnswerNode]);
    });
    it('should return array of nodes by type', () => {
      instance.addNode(fake_BaseNode);
      instance.addNode(fake_AnswerNode);
      expect(instance.getNodes('BaseNode')).to.deep.equal([fake_BaseNode]);
      expect(instance.getNodes('AnswerNode')).to.deep.equal([fake_AnswerNode]);
    });
  });

  describe('#serialize()',function() {
    it('should return "[]" string if no nodes are added', () => {
      expect(instance.serialize()).to.equal('[]');
    });
    it('should return serialized data string from all nodes in instance instance', () => {
      instance.addNode(fake_BaseNode);
      instance.addNode(fake_AnswerNode);
      expect(instance.serialize()).to.equal('[{"class":"BaseNode"},{"class":"AnswerNode"}]');
    });
  });
});
