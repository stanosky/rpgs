'use strict'
const expect = require('chai').expect;
const DialogNode = require('../src/rpgs/dialogs/DialogNode');

let params;
let instance;
let keys;

describe('Given an instance of DialogNode',function () {
  beforeEach(function () {
    params = {uuid:'myDialogId',
              class:'DialogNode',
              wires:{
                enabled: [],
                visible: []
              },
              params:{},
              children:[],
              startTalk:''
            };
    keys = ['class','uuid','wires','params','children','startTalk'];
    instance = new DialogNode(params);
  });
  describe('#constructor()',function() {
    it('should initialize without params', () => {
      instance = new DialogNode();
      expect(instance.getData()).to.have.all.keys(keys);
    });
    it('should initialize with empty object', () => {
      instance = new DialogNode({});
      expect(instance.getData()).to.have.all.keys(keys);
    });
    it('should initialize with data object', () => {
      expect(instance.getData()).to.have.all.keys(keys);
    });
  });
  describe('#getData()',function() {
    it('should return data object', () => {
      expect(instance.getData()).to.deep.equal(params);
    });
  });
  describe('#canAddChild()',function() {
    it('should return boolean that indicates if child can be added', () => {
      let childType = ['ActorNode','InventoryNode','BaseNode','CompoundNode',
                      'AnswerNode','DialogNode','ScriptNode',
                      'QuestNode','TaskNode','VariableNode'];
      childType.map((child) => expect(instance.canAddChild(child)).to.equal(false));
      expect(instance.canAddChild('TalkNode')).to.equal(true);
    });
  });
  describe('#addChild()',function() {
    it('should add new child to node and set startTalk if it is first child', () => {
      instance.addChild('newTalkNodeId1');
      instance.addChild('newTalkNodeId2');
      let children = instance.getChildren();
      expect(children[0]).to.equal('newTalkNodeId1');
      expect(children[1]).to.equal('newTalkNodeId2');
      expect(instance.getStartTalk()).to.equal('newTalkNodeId1');
    });
  });
  describe('#removeChild()',function() {
    it('should remove child and unset startTalk if euqals id of removed child', () => {
      instance.addChild('newTalkNodeId1');
      instance.addChild('newTalkNodeId2');
      expect(instance.getStartTalk()).to.equal('newTalkNodeId1');
      instance.removeChild(0);
      expect(instance.getStartTalk()).to.equal('');
      //expect(instance.getChildren()[0]).to.equal('newTalkNodeId2');
    });
  });
  describe('#setStartTalk()',function() {
    it('should set talk node id from which dialog starts', () => {
      instance.addChild('newTalkNodeId1');
      instance.addChild('newTalkNodeId2');
      instance.addChild('newTalkNodeId3');
      instance.setStartTalk('newTalkNodeId3')
      expect(instance.getStartTalk()).to.equal('newTalkNodeId3');
    });
    it('should not set talk node id which is not its child', () => {
      instance.setStartTalk('newTalkNodeId3')
      expect(instance.getStartTalk()).to.equal('');
    });
  });
  describe('#getStartTalk()',function() {
    it('should return start talk node id', () => {
      instance.addChild('newTalkNodeId1');
      expect(instance.getStartTalk()).to.equal('newTalkNodeId1');
    });
  });
  describe('#dispose()',function() {
    it('should do cleanining and prepare object to garbage collector', () => {
      instance.addChild('newTalkNodeId1');
      instance.dispose();
      expect(instance.getStartTalk()).to.equal(undefined);
    });
  });
});
