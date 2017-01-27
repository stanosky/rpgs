'use strict'
const expect = require('chai').expect;
const ParamsManager = require('../src/rpgs/core/ParamsManager');

let params;
let instance;

describe('Given an instance of ParamsManager',function () {
  beforeEach(function () {
    params = {
      testParam1: {type:'number',value:'1',mand:true},
      testParam2: {type:'string',value:'Hello from test param 2',mand:true},
      testParam3: {type:'string',value:'Hello from test param 3',mand:false}
    };
    instance = new ParamsManager(params);
  });
  describe('#constructor()',function() {
    it('should initialize without params', () => {
      instance = new ParamsManager();
      expect(instance.getParams()).to.deep.equal({});
    });
    it('should initialize with empty object', () => {
      instance = new ParamsManager({});
      expect(instance.getParams()).to.deep.equal({});
    });
    it('should initialize with data object', () => {
      expect(instance.getParams()).to.deep.equal(params);
    });
  });
  describe('#addMandatoryParam()',function() {
    it('should add new mandatory param', () => {
      instance.addMandatoryParam('newMandatory','number','');
      expect(instance.getParam('newMandatory')).to.deep.equal({type:'number',value:'',mand:true});
    });
  });
  describe('#addParam()',function() {
    it('should add new optional param', () => {
      instance.addParam('newOptional','boolean',true);
      expect(instance.getParam('newOptional')).to.deep.equal({type:'boolean',value:true,mand:false});
    });
  });
  describe('#getParam()',function() {
    it('should return param object or null if not exists', () => {
      expect(instance.getParam('testParam2')).to.deep.equal(params['testParam2']);
      expect(instance.getParam('foo')).to.equal(null);
    });
  });
  describe('#getParamValue()',function() {
    it('should return param value', () => {
      expect(instance.getParamValue('testParam1')).to.equal(params.testParam1.value);
      expect(instance.getParamValue('testParam2')).to.equal(params.testParam2.value);
      expect(instance.getParamValue('testParam3')).to.equal(params.testParam3.value);
    });
  });
  describe('#setParamValue()',function() {
    it('should set new param value', () => {
      instance.setParamValue('testParam1','foo');
      expect(instance.getParamValue('testParam1')).to.equal('foo');
    });
  });
  describe('#removeParam()',function() {
    it('should remove param if not mandatory', () => {
      instance.removeParam('testParam1');
      instance.removeParam('testParam2');
      instance.removeParam('testParam3');
      expect(instance.getParam('testParam1')).to.deep.equal(params.testParam1);
      expect(instance.getParam('testParam2')).to.deep.equal(params.testParam2);
      expect(instance.getParam('testParam3')).to.equal(null);
    });
  });
  describe('#getParams()',function() {
    it('should return array of available params', () => {
      expect(instance.getParams()).to.deep.equal(params);
    });
  });
  describe('#dispose()',function() {
    it('should do cleanining and prepare object to garbage collector', () => {
      instance.dispose();
      expect(instance.getParams()).to.equal(undefined);
    });
  });
});
