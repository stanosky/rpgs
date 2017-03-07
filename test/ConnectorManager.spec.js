'use strict';
const expect = require('chai').expect
const Connector = require('../src/rpgs/core/Connector')
const ConnectorManager = require('../src/rpgs/core/ConnectorManager')

let instance;
let type;
let limit;
let i;

describe('Given an instance of ConnectorManager', function() {
  beforeEach(function(){
    type = ['testZero','testOne','testTwo','testThree','testTypeUnlimited'];
    limit = [0,1,2,3,-1];
    instance = new ConnectorManager();
  });
  describe('#setData()', function() {
    it('should set wires data from object', () => {
      let serialized = '{"class":"AnswerNode","uuid":"698e584f-9a5b-465e-a9f1-dcd66e339c0a","label":"Answer-698e","wires":{"visible":[],"enabled":[],"goto":["t4"]},"params":{},"x":0,"y":0,"text":"[Investigate]"}';
      let data = JSON.parse(serialized);
      instance.addConnector('goto',1);
      instance.addConnector('visible',1);
      instance.setData(data);
      expect(instance.getWires('goto')[0]).to.equal('t4');
      expect(instance.getWires('visible')).to.deep.equal([]);
    });
  });
  describe('#addConnector()', function() {
    it('should add new connectors', () => {
      let len = type.length;
      for(i=0; i < len; i++) instance.addConnector(type[i],limit[i]);
      for(i=0; i < len; i++) {
        expect(instance.getConnector(type[i])).to.not.equal(null);
        expect(instance.getConnector(type[i]).getLimit()).to.equal(limit[i]);
      }
    });
  });
  describe('#getConnector()', function() {
    it('should return Connector object or null', () => {
      instance.addConnector(type[1],limit[1]);
      expect(instance.getConnector(type[1])).to.be.instanceof(Connector);
      expect(instance.getConnector(type[1]).getType()).to.equal(type[1]);
      expect(instance.getConnector(type[1]).getLimit()).to.equal(limit[1]);
      expect(instance.getConnector('undefinedType')).to.equal(null);
    });
  });
  describe('#canRecieveWire()', function() {
    it('should return true if wire can be set', () => {
      let len = type.length;
      for(i=1; i < len; i++) instance.addConnector(type[i],limit[i]);
      for(i=1; i < len; i++) expect(instance.canRecieveWire(type[i])).to.equal(true);
    });
    it('should return false, if wire is not compatible or it has too many connections', () => {
      instance.addConnector(type[0],limit[0]);
      instance.addConnector(type[1],limit[1]);
      instance.getConnector(type[1]).addWire('testWireId');
      expect(instance.canRecieveWire(type[0])).to.equal(false);
      expect(instance.canRecieveWire(type[1])).to.equal(false);
    });
  });
  describe('#addWire()', function() {
    it('should add new wire of given type', () => {
      instance.addConnector(type[1],limit[1]);
      instance.addWire(type[1],'test id');
      expect(instance.getWires(type[1])[0]).to.equal('test id');
    });
  });
  describe('#getWires()', function() {
    it('should return array of wires of given type', () => {
      instance.addConnector(type[2],limit[2]);
      instance.addWire(type[2],'test id1');
      instance.addWire(type[2],'test id2');
      instance.addWire(type[2],'test id3');
      expect(instance.getWires(type[2])).to.deep.equal(['test id1','test id2']);
    });
  });
  describe('#removeWire()', function() {
    it('should remove wire of given type and id', () => {
      instance.addConnector(type[2],limit[2]);
      instance.addWire(type[2],'test id1');
      instance.addWire(type[2],'test id2');
      instance.removeWire(type[2],'test id1')
      expect(instance.getWires(type[2])).to.deep.equal(['test id2']);
    });
  });
  describe('#removeWiresTo()', function() {
    it('should remove wires connected to given id', () => {
      instance.addConnector(type[1],limit[1]);
      instance.addConnector(type[2],limit[2]);
      instance.addWire(type[1],'test id1');
      instance.addWire(type[2],'test id1');
      instance.removeWiresTo('test id1');
      expect(instance.getWires(type[1]).length).to.equal(0);
      expect(instance.getWires(type[2]).length).to.equal(0);
    });
  });
  describe('#getData()', function() {
    it('should return object containing information about added wires', () => {
      let len = type.length;
      let obj = {
        testOne:['t1w1'],
        testTwo:['t2w1','t2w2'],
        testThree:['t3w1','t3w2','t3w3']
      };

      for(i=1; i < 4; i++) instance.addConnector(type[i],limit[i]);

      instance.getConnector(type[1]).addWire('t1w1');
      instance.getConnector(type[2]).addWire('t2w1');
      instance.getConnector(type[2]).addWire('t2w2');
      instance.getConnector(type[3]).addWire('t3w1');
      instance.getConnector(type[3]).addWire('t3w2');
      instance.getConnector(type[3]).addWire('t3w3');

      expect(instance.getData()).to.deep.equal(obj);

    });
  });
  describe('#dispose()', function () {
    it('should do cleanining and prepare object to garbage collector', () => {
      instance.addConnector('type1',2);
      expect(instance.getConnector('type1')).to.not.equal(null);
      expect(instance.getData()).to.not.equal(null);
      instance.dispose();
      expect(instance.getConnector('type1')).to.equal(null);
      expect(instance.getData()).to.deep.equal({});
    });
  });
});
