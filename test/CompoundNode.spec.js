'use strict'
const CompoundNode = require('../src/rpgs/core/CompoundNode');

const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const NodeFactory = require('../src/rpgs/core/NodeFactory');
const expect = chai.expect;
const assert = chai.assert;
chai.use(sinonChai);

let fake_findNode = sinon.stub().returns(null);
let fake_removeNode = sinon.stub().returns(false);
fake_removeNode.withArgs('child1').returns(true);
let fake_NodePool = {
  findNode: fake_findNode,
  removeNode: fake_removeNode
};

let empty;
let params;
let instance;

describe('Given an instance of CompoundNode',function () {
  beforeEach(function () {
    empty = {};
    params = {children:['child1','child2','child3']};
    instance = new CompoundNode(fake_NodePool, params);
  });
  describe('#constructor()',function() {
    it('should initialize without params', () => {
      instance = new CompoundNode(fake_NodePool, empty);
      expect(instance.getChildren().length).to.equal(0);
    });
    it('should initialize with empty object', () => {
      instance = new CompoundNode(fake_NodePool, empty);
      expect(instance.getChildren().length).to.equal(0);
    });
    it('should initialize with data object', () => {
      instance = new CompoundNode(fake_NodePool, params);
      expect(instance.getChildren()).to.deep.equal(params.children);
    });
  });
  describe('#getData()',function() {
    it('should return valid data object', () => {
      expect(instance.getData()).to.have.all.keys(['class','uuid','wires','label','params','children','x','y']);
      expect(instance.getData().class).to.equal('CompoundNode');
      expect(instance.getData().children).to.deep.equal(params.children);
    });
  });
  describe('#addChild()',function() {
    it('should add new child to node', () => {
      let newChild = 'newChild'
      instance.addChild(newChild);
      expect(instance.getChildren().pop()).to.equal(newChild);
    });
  });
  describe('#removeChild()',function() {
    it('should remove child found on given index', () => {
      instance.removeChild(0);
      expect(fake_removeNode).have.been.calledWith('child1');
      expect(instance.getChildren()[0]).to.equal('child2');
    });
    it('should do nothing if index is out of range', () => {
      instance.removeChild(-10);
      instance.removeChild(10);
      expect(instance.getChildren()).to.deep.equal(params.children);
    });
  });
  describe('#getChild()',function() {
    it('should return id of child found on given index', () => {
      expect(instance.getChild(1)).to.equal('child2');
    });
  });
  describe('#getChildren()',function() {
    it('should array of children ids', () => {
      expect(instance.getChildren()).to.deep.equal(params.children);
    });
  });
  describe('#dispose()',function() {
    it('should do cleanining and prepare object to garbage collector', () => {
      expect(instance.getChildren()).to.deep.equal(params.children);
      instance.dispose();
      expect(instance.getChildren()).to.equal(undefined);
    });
  });
});
