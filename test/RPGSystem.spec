'use strict'
const cleanup = require('jsdom-global')() // Saving ass line. It emulates global object from browsers.
const expect = require('chai').expect
const RPGSystem = require('../src/rpgs/RPGSystem')
const BaseNode = require('../src/rpgs/core/BaseNode');
const AnswerNode = require('../src/rpgs/dialogs/AnswerNode');
const TalkNode = require('../src/rpgs/dialogs/TalkNode');
const DialogNode = require('../src/rpgs/dialogs/DialogNode');
//const data = require('../data/data.json');
//const DialogWalker = require('./rpgs/dialogs/DialogWalker');


let rpgs;
let testNodeId = 'testNode';
let serialized = '[{"class":"DialogNode","uuid":"dlg1","label":"","wires":{"visible":[],"enabled":[]},"params":{},"x":0,"y":0,"children":["tlk0"],"startTalk":"tlk0"},{"class":"TalkNode","uuid":"tlk0","label":"","wires":{"visible":[],"enabled":[]},"params":{},"x":0,"y":0,"children":["ad62c1a0-d912-45d4-a0fd-680824c21e22"],"text":"This is talk 0."},{"class":"AnswerNode","uuid":"ad62c1a0-d912-45d4-a0fd-680824c21e22","label":"","wires":{"visible":[],"enabled":[],"goto":[]},"params":{},"x":0,"y":0,"text":"Answer1"}]';

describe('Given an instance of RPGSystem', function () {
  beforeEach(function () {
    rpgs = new RPGSystem()
  });
  describe('new RPGSystem()', function () {
    it('should create new instance even if no parameters has been passed', () => {
      expect(rpgs.serializeData()).to.equal('[]');
    });
    it('should create new instance with predefined nodes if serialized string has been passed', () => {
      rpgs = new RPGSystem(serialized);
      expect(rpgs.serializeData()).to.equal(serialized);
    });
  });
  describe('#addNode()', function () {
    it('should add node of given type', () => {
      rpgs.addNode('BaseNode',{uuid:testNodeId},false);
      expect(rpgs.findNode(testNodeId)).to.be.instanceof(BaseNode)
    });
  });
  describe('#findNode()', function () {
    it('should return null if nothing is passed', () => {
      expect(rpgs.findNode()).to.be.equal(null)
    });
    it('should return null if we pass invalid id', () => {
      expect(rpgs.findNode('invalid id')).to.be.equal(null)
    });
    it('should return BaseNode instance if we pass a valid id', () => {
      rpgs.addNode('BaseNode',{uuid:testNodeId},false);
      expect(rpgs.findNode(testNodeId)).to.be.instanceof(BaseNode)
    });
  });
  describe('#removeNode()', function () {
    it('should remove node with given id', () => {
      rpgs.addNode('BaseNode',{uuid:testNodeId},false);
      expect(rpgs.findNode(testNodeId)).to.be.instanceof(BaseNode)
      rpgs.removeNode(testNodeId)
      expect(rpgs.findNode(testNodeId)).to.be.equal(null)
    });
  });
  describe('#setWire()',function() {
    it('should connect two compatible nodes', () => {
      rpgs.addDialog('dlg1')
            .addTalk('tlk0','This is talk 0.')
              .addAnswer('Answer1').setWire('goto','tlk1')
            .addTalk('tlk1','This is talk 1.')
      let answerId = rpgs.findNode('tlk0').getChild(0);
      let answer = rpgs.findNode(answerId);
      expect(answer.getTalk()).to.equal('tlk1');
    });
    it('should throw error if nodes are incompatible', () => {
      rpgs.addDialog('dlg1')
      let fn = function() {rpgs.addDialog('dlg2').setWire('goto','dlg1')};
      expect(fn).to.throw(Error);

    });
  });
  describe('#addDialog()',function() {
    it('should add new dialog node', () => {
      rpgs.addDialog('dlg1',{startTalk:'tlk0'})
      expect(rpgs.findNode('dlg1').getId()).to.equal('dlg1');
    });
  });
  describe('#addTalk()',function() {
    it('should add new talk node', () => {
      rpgs.addDialog('dlg1')
            .addTalk('tlk0','This is talk 0.')
      expect(rpgs.findNode('tlk0').getId()).to.equal('tlk0');
    });
  });
  describe('#addAnswer()',function() {
    it('should add new answer node', () => {
      rpgs.addDialog('dlg1')
            .addTalk('tlk0','This is talk 0.')
              .addAnswer('Answer1')
      let answerId = rpgs.findNode('tlk0').getChild(0);
      let answerNode = rpgs.findNode(answerId)
      expect(answerNode).to.be.instanceof(AnswerNode);
    });
  });
  /*describe('#getDialogs()',function() {
    it('should return array of available dialog nodes', () => {
      rpgs.addDialog('dlg1')
          .addDialog('dlg2')
      let dialogs = rpgs.getDialogs();
      dialogs.map(d => expect(d).to.be.instanceof(DialogNode));
    });
  });*/
  describe('#getNodes()',function() {
    it('should return array of available nodes', () => {
      rpgs.addDialog('dlg1')
            .addTalk('tlk1')
            .addTalk('tlk2')
          .addDialog('dlg2')
            .addTalk('tlk3')
            .addTalk('tlk4')
      let nodes = rpgs.getNodes();
      nodes.map(n => expect(n).to.be.instanceof(BaseNode));
    });
    it('should return array of nodes by type', () => {
      rpgs.addDialog('dlg1')
            .addTalk('tlk1')
            .addTalk('tlk2')
          .addDialog('dlg2')
            .addTalk('tlk3')
            .addTalk('tlk4')
      let nodes = rpgs.getNodes('DialogNode');
      nodes.map(n => expect(n).to.be.instanceof(DialogNode));
      nodes = rpgs.getNodes('TalkNode');
      nodes.map(n => expect(n).to.be.instanceof(TalkNode));
    });
  });

  describe('#serializeData()',function() {
    it('should return "[]" string if no nodes are added', () => {
      expect(rpgs.serializeData()).to.equal('[]');
    });
    it('should return serialized data string from all nodes in RPGS instance', () => {
      rpgs.addDialog('dlg1')
            .addTalk('tlk0','This is talk 0.')
              .addAnswer('Answer1')
      let sd = rpgs.serializeData();
      let rpgs2 = new RPGSystem(sd);
      expect(rpgs2.serializeData()).to.equal(sd);
    });
  });
});

cleanup();
