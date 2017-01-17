'use strict'
const expect = require('chai').expect
const BaseNode = require('../src/rpgs/core/BaseNode')

let bn;
let wires;
let params;
let pattern = new RegExp(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);

describe('Given an instance of BaseNode',function () {
  beforeEach(function () {
    bn = new BaseNode();
    wires = {visibility:['id1','id2'],activity:['id3','id4'],testWire:[]};
    params = {wires:wires};
  });
  describe('#constructor()',function () {
    it('should create new instance which should have Universally Unique ID', () => {
      expect(pattern.test(bn.getId())).to.be.equal(true);
    });
    it('should create new instance with predefined params if passed', () => {
      let id = 'custom id';
      params.uuid = id;
      bn = new BaseNode(params);
      expect(bn.getId()).to.be.equal(id);
      expect(bn.getWires()).to.be.equal(wires);
    });
  });
  describe('#setId()', function () {
    it('should set new id', () => {
      let oldId = bn.getId();
      let newId = 'new id';
      bn.setId(newId);
      expect(bn.getId()).to.not.equal(oldId);
      expect(bn.getId()).to.equal(newId);
    });
  });
  describe('#getId()', function () {
    it('should return id', () => {
      let id = 'test id';
      bn.setId(id);
      expect(bn.getId()).to.be.equal(id);
    });
  });
  describe('#getVisibilityController()', function () {
    it('should return empty string if not set', () => {
      expect(bn.getVisibilityController()).to.be.equal('')
    });
    it('should return id of ScriptNode', () => {
      bn = new BaseNode(params);
      expect(bn.getVisibilityController()).to.be.equal('id1')
    });
  });
  describe('#getActivityControler()', function () {
    it('should return empty string if not set', () => {
      expect(bn.getActivityControler()).to.be.equal('')
    });
    it('should return id of ScriptNode', () => {
      bn = new BaseNode(params);
      expect(bn.getActivityControler()).to.be.equal('id3')
    });
  });
  describe('#getData()', function () {
    it('should return object with default params', () => {
      let data = bn.getData();
      expect(data).to.have.all.keys(['class','uuid','wires']);
      expect(data.class).to.equal('BaseNode');
      expect(pattern.test(data.uuid)).to.equal(true);
    });
    it('should return object with updated params', () => {
      let id = 'test id';
      params.uuid = id;
      bn = new BaseNode(params);
      let data = bn.getData();
      expect(data).to.have.all.keys(['class','uuid','wires']);
      expect(data.class).to.equal('BaseNode');
      expect(data.uuid).to.equal(id);
      expect(data.wires).to.have.any.keys(['visibility','activity']);
    });
  });
  describe('#canAddChild()',function () {
    it('should return false value because child should not be added', () => {
      let childType = ['ActorNode','InventoryNode','BaseNode','CompoundNode',
                      'AnswerNode','DialogNode','TalkNode','ScriptNode',
                      'QuestNode','TaskNode','VariableNode'];
      childType.map((child) => expect(bn.canAddChild(child)).to.equal(false));//
    });
  });
  describe('#addChild()',function () {
    it('should do nothing, it is placeholder for inheritance purposes', () => {
      let len = bn.getChildren().length;
      bn.addChild('testId');
      expect(bn.getChildren().length).to.equal(len);
    });
  });
  describe('#removeChild()',function () {
    it('should do nothing, it is placeholder for inheritance purposes', () => {
      let len = bn.getChildren().length;
      bn.removeChild(0);
      expect(bn.getChildren().length).to.equal(len);
    });
  });
  describe('#getChild()',function () {
    it('should return null, it is placeholder for inheritance purposes', () => {
      expect(bn.getChild(0)).to.equal(null);
    });
  });
  describe('#getChildren()',function () {
    it('should return empty array, it is placeholder for inheritance purposes', () => {
      expect(bn.getChildren().length).to.equal(0);
    });
  });
  describe('#_removeChildren()',function () {
    it('should do nothing, it is placeholder for inheritance purposes', () => {
      let len = bn.getChildren().length;
      bn._removeChildren();
      expect(bn.getChildren().length).to.equal(len);
    });
  });
  describe('#canSetWireType()',function () {
    it('should return false value because wire should not be attached', () => {
      let wireType = ['visibility','activity','action','goto','dialog'];
      wireType.map((wire) => expect(bn.canSetWireType(wire)).to.equal(false));
    });
  });
  describe('#setWire()',function () {
    it('should attach wire of given type', () => {
        let wireType = 'visibility';
        let nodeId = 'testId';
        bn.setWire(wireType,nodeId);
        expect(bn.getWires(wireType)[0]).to.equal(nodeId);
    });
  });
  describe('#getWires()',function () {
    it('should return array of attached wires by type (i.e. ids of nodes)', () => {
      let wireType = ['visibility','activity'];
      let ids = ['i0','i1','i2'];
      wireType.map((wt) => {
        return ids.map((id) => {
          return bn.setWire(wt,id);
        });
      });
      expect(bn.getWires(wireType[0])[0]).to.equal(ids[0]);
      expect(bn.getWires(wireType[1])[2]).to.equal(ids[2]);
    });
  });
  describe('#removeWire()',function () {
    it('should remove wire by type and id', () => {
      let wireType = ['visibility','activity','goto'];
      let ids = ['i0','i1','i2'];
      wireType.map((wt) => {
        return ids.map((id) => {
          return bn.setWire(wt,id);
        });
      });
      //remove first id from "visibility" wires
      bn.removeWire(wireType[0],ids[0]);
      expect(bn.getWires(wireType[0])[0]).to.equal(ids[1]);
      //remove second id from "activity" wires
      bn.removeWire(wireType[1],ids[1]);
      expect(bn.getWires(wireType[1])[1]).to.equal(ids[2]);
      //remove last id from "goto" wires
      bn.removeWire(wireType[2],ids[2]);
      expect(bn.getWires(wireType[2]).length).to.equal(ids.length-1);
    });
  });
  describe('#dispose()',function () {
    it('should do cleanining and prepare object to garbage collector', () => {
      bn.dispose();
      expect(bn.getId()).to.equal(undefined);
      expect(bn.getWires()).to.equal(undefined);
    });
  });
});
