'use strict'
const expect = require('chai').expect;
const ActorNode = require('../src/rpgs/actors/ActorNode');

let params;
let instance;

describe('Given an instance of ActorNode',function () {
  beforeEach(function () {
    params = {name:'Adam',dialog:'dialogId'};
    instance = new ActorNode(params);
  });
  describe('#constructor()',function() {
    it('should initialize without params', () => {
      instance = new ActorNode();
      expect(instance.getName()).to.equal('');
      expect(instance.getDialog()).to.equal('');
    });
    it('should initialize with empty object', () => {
      instance = new ActorNode({});
      expect(instance.getName()).to.equal('');
      expect(instance.getDialog()).to.equal('');
    });
    it('should initialize with data object', () => {
      expect(instance.getName()).to.equal('Adam');
      expect(instance.getDialog()).to.equal('dialogId');
    });
  });
  describe('#getData()',function() {
    it('should return valid data object', () => {
      expect(instance.getData()).to.have.all.keys(['class','uuid','wires','name','dialog']);
      expect(instance.getData().class).to.equal('ActorNode');
      expect(instance.getData().name).to.equal('Adam');
      expect(instance.getData().dialog).to.equal('dialogId');
    });
  });
  describe('#setName()',function() {
    it('should set name for actor', () => {
      expect(instance.getName()).to.equal('Adam');
      instance.setName('Eva');
      expect(instance.getName()).to.equal('Eva');
    });
  });
  describe('#getName()',function() {
    it('should return name of actor', () => {
      expect(instance.getName()).to.equal('Adam');
    });
  });
  describe('#getDialog()',function() {
    it('should return dialog id', () => {
      expect(instance.getDialog()).to.equal('dialogId');
    });
  });
  describe('#dispose()',function() {
    it('should do cleanining and prepare object to garbage collector', () => {
      expect(instance.getName()).to.equal('Adam');
      expect(instance.getDialog()).to.equal('dialogId');
      instance.dispose();
      expect(instance.getName()).to.equal(undefined);
      expect(instance.getDialog()).to.equal(undefined);
    });
  });
});
