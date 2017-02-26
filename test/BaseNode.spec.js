'use strict'
const BaseNode = require('../src/rpgs/core/BaseNode')

const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const NodeFactory = require('../src/rpgs/core/NodeFactory');
const expect = chai.expect;
const assert = chai.assert;
chai.use(sinonChai);

let fake_findNode = sinon.stub().returns(null);
let fake_NodePool = {
  findNode: fake_findNode
};

let instance;
let wires;
let data;
let pattern = new RegExp(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);


describe('Given an instance of BaseNode',function () {
  beforeEach(function () {
    instance = new BaseNode(fake_NodePool, {});
    wires = {visible:['id1'],enabled:['id2']};
    data = {wires:wires};
    instance.addParam('cat','boolean',true);
  });
  describe('#constructor()',function () {
    it('should create new instance which should have Universally Unique ID', () => {
      expect(pattern.test(instance.getId())).to.be.equal(true);
    });
    it('should create new instance with predefined data if passed', () => {
      let id = 'custom id';
      data.uuid = id;
      instance = new BaseNode(fake_NodePool, data);
      expect(instance.getId()).to.be.equal(id);
      expect(instance.getWires('visible')).to.deep.equal(wires.visible);
      expect(instance.getWires('enabled')).to.deep.equal(wires.enabled);
    });
  });
  describe('#setId()', function () {
    it('should set new id', () => {
      let oldId = instance.getId();
      let newId = 'new id';
      instance.setId(newId);
      expect(instance.getId()).to.not.equal(oldId);
      expect(instance.getId()).to.equal(newId);
    });
  });
  describe('#getId()', function () {
    it('should return id', () => {
      let id = 'test id';
      instance.setId(id);
      expect(instance.getId()).to.be.equal(id);
    });
  });

  describe('#x', function () {
    it('should set/get x position of node', () => {
      expect(instance.x).to.be.equal(0);
      instance.x = 123;
      expect(instance.x).to.be.equal(123);
    });
  });

  describe('#y', function () {
    it('should set/get y position of node', () => {
      expect(instance.y).to.be.equal(0);
      instance.y = 123;
      expect(instance.y).to.be.equal(123);
    });
  });

  describe('#setLabel()', function () {
    it('should set new label', () => {
      let oldLabel = instance.getLabel();
      let newLabel = 'new label';
      instance.setLabel(newLabel);
      expect(instance.getLabel()).to.not.equal(oldLabel);
      expect(instance.getLabel()).to.equal(newLabel);
    });
  });
  describe('#getLabel()', function () {
    it('should return label', () => {
      let label = 'test label';
      instance.setLabel(label);
      expect(instance.getLabel()).to.be.equal(label);
    });
  });

  describe('#isVisible()', function () {
    it('should return visibility state true if no script was attached', () => {
      instance = new BaseNode(fake_NodePool, data);
      expect(instance.isVisible()).to.be.equal(true);
    });
    it('should return visibility state form script if attached', () => {
      instance = new BaseNode(fake_NodePool, data);
      expect(instance.isVisible()).to.be.equal(true);
    });
  });
  describe('#addParam()',function() {
    it('should add new param to node', () => {
      instance.addParam('custom','string','foo');
      expect(instance.getParam('custom')).to.equal('foo');
    });
  });
  describe('#getParam()',function() {
    it('should return param value', () => {
      expect(instance.getParam('cat')).to.equal(true);
    });
  });
  describe('#setParam()',function() {
    it('should set new value to param', () => {
      instance.setParam('cat',false);
      expect(instance.getParam('cat')).to.equal(false);
    });
  });
  describe('#removeParam()',function() {
    it('should remove param', () => {
      instance.removeParam('cat');
      expect(instance.getParam('cat')).to.equal(null);
    });
  });
  describe('#isActive()', function () {
    it('should return activity state true if no script was attached', () => {
      instance = new BaseNode(fake_NodePool, data);
      expect(instance.isActive()).to.be.equal(true);
    });
    it('should return activity state form script if attached', () => {
      instance = new BaseNode(fake_NodePool, data);
      expect(instance.isActive()).to.be.equal(true);
    });
  });
  describe('#getData()', function () {
    it('should return object with default data', () => {
      let data = instance.getData();
      expect(data).to.have.all.keys(['class','uuid','label','wires','params','x','y']);
      expect(data.class).to.equal('BaseNode');
      expect(pattern.test(data.uuid)).to.equal(true);
    });
    it('should return object with updated data', () => {
      let id = 'test id';
      data.uuid = id;
      instance = new BaseNode(fake_NodePool, data);
      let output = instance.getData();
      expect(output).to.have.all.keys(['class','uuid','label','wires','params','x','y']);
      expect(output.class).to.equal('BaseNode');
      expect(output.uuid).to.equal(id);
      expect(output.wires).to.have.any.keys(['visible','enabled']);
    });
  });
  describe('#canAddChild()',function () {
    it('should return false value because child should not be added', () => {
      let childType = ['ActorNode','InventoryNode','BaseNode','CompoundNode',
                      'AnswerNode','DialogNode','TalkNode','ScriptNode',
                      'QuestNode','TaskNode','VariableNode'];
      childType.map((child) => expect(instance.canAddChild(child)).to.equal(false));//
    });
  });
  describe('#addChild()',function () {
    it('should do nothing, it is placeholder for inheritance purposes', () => {
      let len = instance.getChildren().length;
      instance.addChild('testId');
      expect(instance.getChildren().length).to.equal(len);
    });
  });
  describe('#removeChild()',function () {
    it('should do nothing, it is placeholder for inheritance purposes', () => {
      let len = instance.getChildren().length;
      instance.removeChild(0);
      expect(instance.getChildren().length).to.equal(len);
    });
  });
  describe('#getChild()',function () {
    it('should return null, it is placeholder for inheritance purposes', () => {
      expect(instance.getChild(0)).to.equal(null);
    });
  });
  describe('#getChildren()',function () {
    it('should return empty array, it is placeholder for inheritance purposes', () => {
      expect(instance.getChildren().length).to.equal(0);
    });
  });
  describe('#canRecieveWire()',function () {
    it('should return true/false depends on wire type', () => {
      let wireType = ['visible','enabled','action','goto','dialog'];
      let expOutput = [true,true,false,false,false];
      for (var i = 0; i < wireType.length; i++) {
        expect(instance.canRecieveWire(wireType[i])).to.equal(expOutput[i]);
      }
    });
  });
  describe('#addWire()',function () {
    it('should attach wire of given type', () => {
        let wireType = 'visible';
        let nodeId = 'testId';
        instance.addWire(wireType,nodeId);
        expect(instance.getWires(wireType)[0]).to.equal(nodeId);
    });
  });
  describe('#getWires()',function () {
    it('should return array of attached wires by type (i.e. ids of nodes)', () => {
      let wireType = ['visible','enabled'];
      let ids = ['i0','i1'];
      instance.addWire(wireType[0],ids[0]);
      instance.addWire(wireType[1],ids[1]);
      expect(instance.getWires(wireType[0])[0]).to.equal(ids[0]);
      expect(instance.getWires(wireType[1])[0]).to.equal(ids[1]);
    });
  });
  describe('#removeWire()',function () {
    it('should remove wire by type and id', () => {
      let wireType = ['visible','enabled'];
      let ids = ['i0','i1'];
      instance.addWire(wireType[0],ids[0]);
      instance.addWire(wireType[1],ids[1]);
      //remove first id from "visibility" wires
      instance.removeWire(wireType[0],ids[0]);
      expect(instance.getWires(wireType[0])[0]).to.equal(undefined);
      //remove second id from "activity" wires
      instance.removeWire(wireType[1],ids[1]);
      expect(instance.getWires(wireType[1])[0]).to.equal(undefined);
    });
  });
  describe('#dispose()',function () {
    it('should do cleanining and prepare object to garbage collector', () => {
      expect(instance.cm).to.not.equal(null);
      expect(instance.getId()).to.not.equal(undefined);
      instance.dispose();
      expect(instance.getId()).to.equal(undefined);
      expect(instance.cm).to.equal(null);
    });
  });
});
