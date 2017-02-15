'use strict'
const expect = require('chai').expect;
const CompoundNode = require('../src/rpgs/core/CompoundNode');

let empty;
let params;
let cn;

describe('Given an instance of CompoundNode',function () {
  beforeEach(function () {
    empty = {};
    params = {children:['child1','child2','child3']};
    cn = new CompoundNode(params);
  });
  describe('#constructor()',function() {
    it('should initialize without params', () => {
      cn = new CompoundNode();
      expect(cn.getChildren().length).to.equal(0);
    });
    it('should initialize with empty object', () => {
      cn = new CompoundNode(empty);
      expect(cn.getChildren().length).to.equal(0);
    });
    it('should initialize with data object', () => {
      cn = new CompoundNode(params);
      expect(cn.getChildren()).to.deep.equal(params.children);
    });
  });
  describe('#getData()',function() {
    it('should return valid data object', () => {
      expect(cn.getData()).to.have.all.keys(['class','uuid','wires','label','params','children']);
      expect(cn.getData().class).to.equal('CompoundNode');
      expect(cn.getData().children).to.deep.equal(params.children);
    });
  });
  describe('#addChild()',function() {
    it('should add new child to node', () => {
      let newChild = 'newChild'
      cn.addChild(newChild);
      expect(cn.getChildren().pop()).to.equal(newChild);
    });
  });
  describe('#removeChild()',function() {
    it('should remove child found on given index', () => {
      cn.removeChild(0);
      expect(cn.getChildren()[0]).to.equal('child2');
    });
    it('should do nothing if index is out of range', () => {
      cn.removeChild(-10);
      cn.removeChild(10);
      expect(cn.getChildren()).to.deep.equal(params.children);
    });
  });
  describe('#getChild()',function() {
    it('should return id of child found on given index', () => {
      expect(cn.getChild(1)).to.equal('child2');
    });
  });
  describe('#getChildren()',function() {
    it('should array of children ids', () => {
      expect(cn.getChildren()).to.deep.equal(params.children);
    });
  });
  describe('#dispose()',function() {
    it('should do cleanining and prepare object to garbage collector', () => {
      expect(cn.getChildren()).to.deep.equal(params.children);
      cn.dispose();
      expect(cn.getChildren()).to.equal(undefined);
    });
  });
});
