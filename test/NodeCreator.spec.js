'use strict'
const cleanup = require('jsdom-global')() // Saving ass line. It emulates global object from browsers.
const expect = require('chai').expect
const NodeCreator = require('../src/rpgs/NodeCreator')
const BaseNode = require('../src/rpgs/core/BaseNode');
const AnswerNode = require('../src/rpgs/dialogs/AnswerNode');
const TalkNode = require('../src/rpgs/dialogs/TalkNode');
const DialogNode = require('../src/rpgs/dialogs/DialogNode');



let instance;
let testNodeId = 'testNode';

describe('Given an instance of NodeCreator', function () {
  beforeEach(function () {
    instance = new NodeCreator()
  });
  describe('#addNode()', function () {
    it('should add node of given type', () => {
      instance.addNode('BaseNode',{uuid:testNodeId},false);
      expect(instance.findNode(testNodeId)).to.be.instanceof(BaseNode)
    });
  });
  describe('#setWire()',function() {
    it('should connect two compatible nodes', () => {
      instance.addDialog('dlg1')
            .addTalk('tlk0','This is talk 0.')
              .addAnswer('Answer1').setWire('goto','tlk1')
            .addTalk('tlk1','This is talk 1.')
      let answerId = instance.findNode('tlk0').getChild(0);
      let answer = instance.findNode(answerId);
      expect(answer.getTalk()).to.equal('tlk1');
    });
    it('should throw error if nodes are incompatible', () => {
      instance.addDialog('dlg1')
      let fn = function() {instance.addDialog('dlg2').setWire('goto','dlg1')};
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
});

cleanup();
