'use strict'
const cleanup = require('jsdom-global')() // Saving ass line. It emulates global object from browsers.
const RPGSystem = require('../src/rpgs/RPGSystem')
const BaseNode = require('../src/rpgs/core/BaseNode');
const AnswerNode = require('../src/rpgs/dialogs/AnswerNode');
const TalkNode = require('../src/rpgs/dialogs/TalkNode');
const DialogNode = require('../src/rpgs/dialogs/DialogNode');

const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const NodeFactory = require('../src/rpgs/core/NodeFactory');
const expect = chai.expect;
const assert = chai.assert;
chai.use(sinonChai);

let fake_logger = sinon.stub();


let instance;
let testNodeId = 'testNode';
let serialized = '[{"class":"DialogNode","uuid":"dlg1","label":"","wires":{"visible":[],"enabled":[]},"params":{},"x":0,"y":0,"children":["tlk0"],"startTalk":"tlk0"},{"class":"TalkNode","uuid":"tlk0","label":"","wires":{"visible":[],"enabled":[]},"params":{},"x":0,"y":0,"children":["ad62c1a0-d912-45d4-a0fd-680824c21e22"],"text":"This is talk 0."},{"class":"AnswerNode","uuid":"ad62c1a0-d912-45d4-a0fd-680824c21e22","label":"","wires":{"visible":[],"enabled":[],"goto":[]},"params":{},"x":0,"y":0,"text":"Answer1"}]';

describe('Given an instance of RPGSystem', function () {
  beforeEach(function () {
    instance = new RPGSystem();
  });
  describe('#setData()', function () {
    it('should clear previous list of nodes', () => {
      instance.addDialog('dlg1')
            .addTalk('tlk0','This is talk 0.')
              .addAnswer('Answer1').addWire('goto','tlk1')
            .addTalk('tlk1','This is talk 1.');
      instance.setData();
      expect(instance.serialize()).to.equal('[]');
      expect(instance.getNodes().length).to.equal(0);
      expect(instance.getData().length).to.equal(0);
      expect(instance.findNode('dlg1')).to.equal(null);
      expect(instance.findNode('tlk0')).to.equal(null);
      expect(instance.findNode('Answer1')).to.equal(null);
      expect(instance.findNode('tlk1')).to.equal(null);
    });
    it('should create new nodes from string', () => {
      instance.setData(serialized);
      expect(instance.serialize()).to.equal(serialized);
      expect(instance.getNodes().length).to.equal(3);
      expect(instance.getData().length).to.equal(3);
      expect(instance.findNode('dlg1')).to.not.equal(null);
      expect(instance.findNode('tlk0')).to.not.equal(null);
      expect(instance.findNode('ad62c1a0-d912-45d4-a0fd-680824c21e22')).to.not.equal(null);

    });
  });
  describe('#setLogger()', function () {
    it('should set logger handler function', () => {
      instance.setLogger(fake_logger);
      instance.addDialog();
      expect(fake_logger).have.been.calledOnce;
    });
  });
  describe('#mergeNodes()', function () {
    it('should merge list of data objects with existing node pool', () => {
      let instance2 = new RPGSystem();

      instance.addDialog('dlg1')
            .addTalk('tlk0','This is talk 0.')
              .addAnswer('Answer1 text');
      instance2.addDialog('dlg2')
            .addTalk('tlk1','This is talk 1.')
              .addAnswer('Answer2 text');
      instance.mergeNodes(instance2.getData());
      expect(instance.getNodes().length).to.equal(6);
      expect(instance.getData().length).to.equal(6);
      expect(instance.findNode('dlg1')).to.not.equal(null);
      expect(instance.findNode('dlg2')).to.not.equal(null);

      let tlk0 = instance.findNode('tlk0');
      let tlk1 = instance.findNode('tlk1');
      expect(instance.findNode('tlk0')).to.not.equal(null);
      expect(instance.findNode('tlk1')).to.not.equal(null);

      let ans0 = tlk0.getChild(0);
      let ans1 = tlk1.getChild(0);
      expect(instance.findNode(ans0)).to.not.equal(null);
      expect(instance.findNode(ans1)).to.not.equal(null);
    });
  });
  describe('#clearData()', function () {
    it('should clear and dispose nodes in node pool', () => {
      instance.addDialog('dlg1')
            .addTalk('tlk0','This is talk 0.')
              .addAnswer('Answer1').addWire('goto','tlk1')
            .addTalk('tlk1','This is talk 1.');
      instance.clearData();
      expect(instance.serialize()).to.equal('[]');
      expect(instance.getNodes().length).to.equal(0);
      expect(instance.getData().length).to.equal(0);
      expect(instance.findNode('dlg1')).to.equal(null);
      expect(instance.findNode('tlk0')).to.equal(null);
      expect(instance.findNode('Answer1')).to.equal(null);
      expect(instance.findNode('tlk1')).to.equal(null);
    });
  });
  describe('#addNode()', function () {
    it('should add node of given type', () => {
      instance.addNode('AnswerNode',{uuid:testNodeId});
      expect(instance.getNodes().length).to.equal(1);
      expect(instance.findNode(testNodeId)).to.be.instanceof(AnswerNode)
    });
  });
  describe('#findNode()', function () {
    it('should return null if nothing is passed', () => {
      expect(instance.findNode()).to.be.equal(null)
    });
    it('should return null if we pass invalid id', () => {
      expect(instance.findNode('invalid id')).to.be.equal(null)
    });
    it('should return BaseNode instance if we pass a valid id', () => {
      instance.addNode('BaseNode',{uuid:testNodeId});
      expect(instance.findNode(testNodeId)).to.be.instanceof(BaseNode)
    });
  });
  describe('#removeNode()', function () {
    it('should remove node with given id', () => {
      instance.addNode('BaseNode',{uuid:testNodeId});
      expect(instance.findNode(testNodeId)).to.be.instanceof(BaseNode)
      instance.removeNode(testNodeId)
      expect(instance.findNode(testNodeId)).to.be.equal(null)
    });
  });
  describe('#addWire()',function() {
    it('should connect two compatible nodes', () => {
      instance.addDialog('dlg1')
            .addTalk('tlk0','This is talk 0.')
              .addAnswer('Answer1').addWire('goto','tlk1')
            .addTalk('tlk1','This is talk 1.')
      let answerId = instance.findNode('tlk0').getChild(0);
      let answer = instance.findNode(answerId);
      expect(answer.getTalk()).to.equal('tlk1');
    });
    it('should throw error if nodes are incompatible', () => {
      instance.addDialog('dlg1')
      let fn = function() {instance.addDialog('dlg2').addWire('goto','dlg1')};
      expect(fn).to.throw(Error);

    });
  });
  describe('#addDialog()',function() {
    it('should add new dialog node', () => {
      instance.addDialog('dlg1',{startTalk:'tlk0'})
      expect(instance.findNode('dlg1').getId()).to.equal('dlg1');
    });
  });
  describe('#addTalk()',function() {
    it('should add new talk node', () => {
      instance.addDialog('dlg1')
            .addTalk('tlk0','This is talk 0.')
      expect(instance.findNode('tlk0').getId()).to.equal('tlk0');
    });
  });
  describe('#addAnswer()',function() {
    it('should add new answer node', () => {
      instance.addDialog('dlg1')
            .addTalk('tlk0','This is talk 0.')
              .addAnswer('Answer1')
      let answerId = instance.findNode('tlk0').getChild(0);
      let answerNode = instance.findNode(answerId)
      expect(answerNode).to.be.instanceof(AnswerNode);
    });
  });
  describe('#getNodes()',function() {
    it('should return array of available nodes', () => {
      instance.addDialog('dlg1')
            .addTalk('tlk1')
            .addTalk('tlk2')
          .addDialog('dlg2')
            .addTalk('tlk3')
            .addTalk('tlk4')
      let nodes = instance.getNodes();
      nodes.map(n => expect(n).to.be.instanceof(BaseNode));
    });
    it('should return array of nodes by type', () => {
      instance.addDialog('dlg1')
            .addTalk('tlk1')
            .addTalk('tlk2')
          .addDialog('dlg2')
            .addTalk('tlk3')
            .addTalk('tlk4')
      let nodes = instance.getNodes('DialogNode');
      nodes.map(n => expect(n).to.be.instanceof(DialogNode));
      nodes = instance.getNodes('TalkNode');
      nodes.map(n => expect(n).to.be.instanceof(TalkNode));
    });
  });

  describe('#serialize()',function() {
    it('should return "[]" string if no nodes are added', () => {
      expect(instance.serialize()).to.equal('[]');
    });
    it('should return serialized data string from all nodes in RPGS instance', () => {
      instance.addDialog('dlg1')
            .addTalk('tlk0','This is talk 0.')
              .addAnswer('Answer1')
      let sd = instance.serialize();
      let instance2 = new RPGSystem();
      instance2.setData(sd);
      expect(instance2.serialize()).to.equal(sd);
    });
  });
});

cleanup();
