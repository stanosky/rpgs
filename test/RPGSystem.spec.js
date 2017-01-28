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


// Need to add tests of private methods!!!


let rpgs;
let testNodeId = 'testNode';
let serialized = '[{"class":"DialogNode","uuid":"dlg1","wires":{"visible":[],"enabled":[]},"params":{},"children":["tlk0"],"startTalk":"tlk0"},{"class":"TalkNode","uuid":"tlk0","wires":{"visible":[],"enabled":[]},"params":{},"children":["tlk0ans1"],"text":"This is talk 0."},{"class":"AnswerNode","uuid":"tlk0ans1","wires":{"visible":[],"enabled":[],"go_talk":[]},"params":{},"text":"Answer1"}]';

describe('Given an instance of RPGSystem', function () {
  beforeEach(function () {
    rpgs = new RPGSystem()
    /*.addDialog('dlg1',{startTalk:'tlk0'})
      .addTalk('tlk0',{text:'This is talk 0.'})
        .addAnswer('tlk0ans1',{text:'Answer1'}).setWire('go-talk','tlk1')
        .addAnswer('tlk0ans2',{text:'Answer2'}).setWire('go-talk','tlk2')
        .addAnswer('tlk0ans3',{text:'Answer3'}).setWire('go-talk','tlk3')

      .addTalk('tlk1',{text:'This is talk 1.'})
        .addAnswer('tlk1ans1',{text:'Answer1'})

      .addTalk('tlk2',{text:'This is talk 2.'})
        .addAnswer('tlk2ans1',{text:'Answer1'})

      .addTalk('tlk3',{text:'This is talk 3.'})
        .addAnswer('tlk3ans1',{text:'Answer1'})*/
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
      rpgs.addDialog('dlg1',{startTalk:'tlk0'})
            .addTalk('tlk0',{text:'This is talk 0.'})
              .addAnswer('tlk0ans1',{text:'Answer1'}).setWire('go_talk','tlk1')
            .addTalk('tlk1',{text:'This is talk 1.'})
      let answer = rpgs.findNode('tlk0ans1');
      expect(answer.getTalk()).to.equal('tlk1');
    });
    it('should throw error if nodes are incompatible', () => {
      rpgs.addDialog('dlg1',{startTalk:'tlk0'})
      let fn = function() {rpgs.addDialog('dlg2',{startTalk:'tlk0'}).setWire('go_talk','dlg1')};
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
      rpgs.addDialog('dlg1',{startTalk:'tlk0'})
            .addTalk('tlk0',{text:'This is talk 0.'})
      expect(rpgs.findNode('tlk0').getId()).to.equal('tlk0');
    });
  });
  describe('#addAnswer()',function() {
    it('should add new answer node', () => {
      rpgs.addDialog('dlg1',{startTalk:'tlk0'})
            .addTalk('tlk0',{text:'This is talk 0.'})
              .addAnswer('tlk0ans1',{text:'Answer1'})
      expect(rpgs.findNode('tlk0ans1').getId()).to.equal('tlk0ans1');
    });
  });
  describe('#getDialogs()',function() {
    it('should return array of available dialog nodes', () => {
      rpgs.addDialog('dlg1',{startTalk:'tlk0'})
          .addDialog('dlg2',{startTalk:'tlk1'})
      let dialogs = rpgs.getDialogs();
      dialogs.map(d => expect(d).to.be.instanceof(DialogNode));
    });
  });
  describe('#serializeData()',function() {
    it('should return "[]" string if no nodes are added', () => {
      expect(rpgs.serializeData()).to.equal('[]');
    });
    it('should return serialized data string from all nodes in RPGS instance', () => {
      rpgs.addDialog('dlg1',{startTalk:'tlk0'})
            .addTalk('tlk0',{text:'This is talk 0.'})
              .addAnswer('tlk0ans1',{text:'Answer1'})
      expect(rpgs.serializeData()).to.equal(serialized);
    });
  });
});

cleanup();
