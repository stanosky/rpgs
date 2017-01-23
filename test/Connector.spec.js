'use strict'
const expect = require('chai').expect
const Connector = require('../src/rpgs/core/Connector')

let con;
let type = 'myType';
let limit;
let wiresLen;

describe('Given an instance of Connector',function () {
  /*beforeEach(function() {
    con = new Connector();
  });*/
  describe('#constructor()', function() {
    it('should set basic parameters: type, limit', () => {
      limit = 1;
      con = new Connector(type,limit);
      expect(con.getType()).to.equal(type);
      expect(con.getLimit()).to.equal(limit);
      expect(con.getWires().length).to.equal(0);
    });
    it('should set default value to limit if not passed', () => {
      con = new Connector(type);
      expect(con.getLimit()).to.equal(-1);
    });
    it('should parse limit value to int', () => {
      con = new Connector(type,'4,3');
      expect(con.getLimit()).to.equal(4);
    });
  });
  describe('#getType()', function() {
    it('should return value of type', () => {
      con = new Connector(type);
      expect(con.getType()).to.equal(type);
    });
  });
  describe('#getLimit()', function() {
    it('should return value of limit', () => {
      con = new Connector(type,10);
      expect(con.getLimit()).to.equal(10);
    });
  });
  describe('#getWires()', function() {
    it('should return list of connected wires', () => {
      con = new Connector(type);
      con.addWire('testId1');
      con.addWire('testId2');
      con.addWire('testId3');
      expect(con.getWires()[0]).to.equal('testId1');
      expect(con.getWires()[1]).to.equal('testId2');
      expect(con.getWires()[2]).to.equal('testId3');
    });
  });
  describe('#canAddWire()', function() {
    it('should return false if limit is equal to 0', () => {
      con = new Connector(type,0);
      expect(con.canAddWire()).to.equal(false);
    });
    it('should return true if limit is equal to -1', () => {
      con = new Connector(type,-1);
      expect(con.canAddWire()).to.equal(true);
    });
    it('should return false if current limit of wires is exceeded', () => {
      con = new Connector(type,1);
      con.addWire('testId1');
      expect(con.canAddWire()).to.equal(false);
    });
  });
  describe('#addWire()', function() {
    it('should add wire if limit is not exceeded', () => {
      con = new Connector(type,1);
      wiresLen = con.getWires().length;
      con.addWire('testId1');
      expect(con.getWires()[0]).to.equal('testId1');
      expect(con.getWires().length).to.equal(wiresLen + 1);
    });
    it('should not add wire if limit is exceeded', () => {
      con = new Connector(type,1);
      wiresLen = con.getWires().length;
      con.addWire('testId1');
      con.addWire('testId2');
      expect(con.getWires()[0]).to.equal('testId1');
      expect(con.getWires()[1]).to.equal(undefined);
      expect(con.getWires().length).to.equal(wiresLen + 1);      
    });
  });
});
