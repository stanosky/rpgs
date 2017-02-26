'use strict';
const expect = require('chai').expect
const Connector = require('../src/rpgs/core/Connector')
const ConnectorManager = require('../src/rpgs/core/ConnectorManager')

let cm;
let type;
let limit;
let i;

describe('Given an instance of ConnectorManager', function() {
  beforeEach(function(){
    type = ['testZero','testOne','testTwo','testThree','testTypeUnlimited'];
    limit = [0,1,2,3,-1];
    cm = new ConnectorManager();
  });
  describe('#addConnector()', function() {
    it('should add new connectors', () => {
      let len = type.length;
      for(i=0; i < len; i++) cm.addConnector(type[i],limit[i]);
      for(i=0; i < len; i++) {
        expect(cm.getConnector(type[i])).to.not.equal(null);
        expect(cm.getConnector(type[i]).getLimit()).to.equal(limit[i]);
      }
    });
  });
  describe('#getConnector()', function() {
    it('should return Connector object or null', () => {
      cm.addConnector(type[1],limit[1]);
      expect(cm.getConnector(type[1])).to.be.instanceof(Connector);
      expect(cm.getConnector(type[1]).getType()).to.equal(type[1]);
      expect(cm.getConnector(type[1]).getLimit()).to.equal(limit[1]);
      expect(cm.getConnector('undefinedType')).to.equal(null);
    });
  });
  describe('#canRecieveWire()', function() {
    it('should return true if wire can be set', () => {
      let len = type.length;
      for(i=1; i < len; i++) cm.addConnector(type[i],limit[i]);
      for(i=1; i < len; i++) expect(cm.canRecieveWire(type[i])).to.equal(true);
    });
    it('should return false, if wire is not compatible or it has too many connections', () => {
      cm.addConnector(type[0],limit[0]);
      cm.addConnector(type[1],limit[1]);
      cm.getConnector(type[1]).addWire('testWireId');
      expect(cm.canRecieveWire(type[0])).to.equal(false);
      expect(cm.canRecieveWire(type[1])).to.equal(false);
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

      for(i=1; i < 4; i++) cm.addConnector(type[i],limit[i]);

      cm.getConnector(type[1]).addWire('t1w1');
      cm.getConnector(type[2]).addWire('t2w1');
      cm.getConnector(type[2]).addWire('t2w2');
      cm.getConnector(type[3]).addWire('t3w1');
      cm.getConnector(type[3]).addWire('t3w2');
      cm.getConnector(type[3]).addWire('t3w3');

      expect(cm.getData()).to.deep.equal(obj);

    });
  });
  describe('#dispose()', function () {
    it('should do cleanining and prepare object to garbage collector', () => {
      cm.addConnector('type1',2);
      expect(cm.getConnector('type1')).to.not.equal(null);
      expect(cm.getData()).to.not.equal(null);
      cm.dispose();
      expect(cm.getConnector('type1')).to.equal(null);
      expect(cm.getData()).to.deep.equal({});
    });
  });
});
