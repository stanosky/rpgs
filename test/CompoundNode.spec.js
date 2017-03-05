'use strict'
const CompoundNode = require('../src/rpgs/core/CompoundNode');

const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const NodeFactory = require('../src/rpgs/core/NodeFactory');
const expect = chai.expect;
const assert = chai.assert;
chai.use(sinonChai);

let fake_child1_getId = sinon.stub().returns('child1');
let fake_child1_getData = sinon.stub().returns({class:'BaseNode'});
let fake_child1 = {getId:fake_child1_getId,getData:fake_child1_getData};

let fake_child2_getId = sinon.stub().returns('child2');
let fake_child2_getData = sinon.stub().returns({class:'BaseNode'});
let fake_child2 = {getId:fake_child2_getId,getData:fake_child2_getData};

let fake_child3_getId = sinon.stub().returns('child3');
let fake_child3_getData = sinon.stub().returns({class:'BaseNode'});
let fake_child3 = {getId:fake_child3_getId,getData:fake_child3_getData};

let fake_child4_getId = sinon.stub().returns('child4');
let fake_child4_getData = sinon.stub().returns({class:'BaseNode'});
let fake_child4 = {getId:fake_child4_getId,getData:fake_child4_getData};

let fake_addNode = sinon.stub().returns(fake_child4);
let fake_findNode = sinon.stub().returns(null);
fake_findNode.withArgs('child1').returns(fake_child1);
fake_findNode.withArgs('child2').returns(fake_child2);
fake_findNode.withArgs('child3').returns(fake_child3);
fake_findNode.withArgs('child4').returns(fake_child4);
let fake_removeNode = sinon.stub().returns(false);
fake_removeNode.withArgs('child1').returns(true);
let fake_NodePool = {
  addNode: fake_addNode,
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
      //expect(instance.getChildren()).to.deep.equal(params.children);
      instance.getChildren().forEach((child,index) => {
        expect(child.getId()).to.equal(params.children[index]);
      });
    });
  });
  describe('#getData()',function() {
    it('should return valid data object', () => {
      expect(instance.getData()).to.have.all.keys(['class','uuid','wires','label','params','children','x','y']);
      expect(instance.getData().class).to.equal('CompoundNode');
      expect(instance.getData().children).to.deep.equal(params.children);
    });
  });
  describe('#setNodeAsChild()',function() {
    it('should treat node as child', () => {
      expect(instance.setNodeAsChild(fake_child4)).to.equal(true);
      expect(instance.getChildren().length).to.equal(4);
    });
  });
  describe('#addChild()',function() {
    it('should add new child to node', () => {
      expect(instance.addChild({uuid:'child4',class:'BaseNode'})).to.equal(fake_child4);
    });
  });
  describe('#removeChild()',function() {
    it('should remove child found on given index', () => {
      instance.removeChild(0);
      expect(fake_removeNode).have.been.calledWith('child1');
      expect(instance.getChildren()[0].getId()).to.equal('child2');
    });
    it('should do nothing if index is out of range', () => {
      instance.removeChild(-10);
      instance.removeChild(10);
      //expect(instance.getChildren()).to.deep.equal(params.children);
      instance.getChildren().forEach((child,index) => {
        expect(child.getId()).to.equal(params.children[index]);
      });
    });
  });
  describe('#getChild()',function() {
    it('should return id of child found on given index', () => {
      expect(instance.getChild(1).getId()).to.equal('child2');
    });
  });
  describe('#getChildren()',function() {
    it('should array of children ids', () => {
      //expect(instance.getChildren()).to.deep.equal(params.children);
      instance.getChildren().forEach((child,index) => {
        expect(child.getId()).to.equal(params.children[index]);
      });
    });
  });
  describe('#setChildIndex()',function() {
    it('should set new index for child', () => {
      instance.setChildIndex('child1',2);
      expect(instance.getChildren().map(child => child.getId()))
                      .to.deep.equal(['child2','child3','child1']);
      instance.setChildIndex('child3',0);
      expect(instance.getChildren().map(child => child.getId()))
                      .to.deep.equal(['child3','child2','child1']);
    });
    it('should adjust new index value if its out of bounds', () => {
      instance.setChildIndex('child1',999);
      expect(instance.getChildren().map(child => child.getId()))
                      .to.deep.equal(['child2','child3','child1']);
      instance.setChildIndex('child3',-100);
      expect(instance.getChildren().map(child => child.getId()))
                      .to.deep.equal(['child3','child2','child1']);
    });
  });
  describe('#dispose()',function() {
    it('should do cleanining and prepare object to garbage collector', () => {
      //expect(instance.getChildren()).to.deep.equal(params.children);
      instance.getChildren().forEach((child,index) => {
        expect(child.getId()).to.equal(params.children[index]);
      });
      instance.dispose();
      expect(instance.getChildren().length).to.equal(0);
    });
  });
});
