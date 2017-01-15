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
});
