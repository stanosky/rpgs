'use strict'
const DialogNode = require('../src/rpgs/dialogs/DialogNode');

const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const NodeFactory = require('../src/rpgs/core/NodeFactory');
const expect = chai.expect;
const assert = chai.assert;
chai.use(sinonChai);

let fake_findNode = sinon.stub().returns(null);
let fake_removeNode = sinon.stub().returns(false);
fake_removeNode.withArgs('child1').returns(true);
let fake_NodePool = {
  findNode: fake_findNode,
  removeNode: fake_removeNode
};



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
              label: 'myDialog',
              params:{},
              children:[],
              startTalk:'',
              'x': 0,
              'y': 0
            };
    keys = ['class','uuid','label','wires','params','children','startTalk','x','y'];
    instance = new DialogNode(fake_NodePool, params);
  });
  describe('#constructor()',function() {
    it('should initialize without params', () => {
      instance = new DialogNode(fake_NodePool, {});
      expect(instance.getData()).to.have.all.keys(keys);
    });
    it('should initialize with empty object', () => {
      instance = new DialogNode(fake_NodePool, {});
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
    it('should remove child and set startTalk to first available child', () => {
      instance.addChild('newTalkNodeId1');
      instance.addChild('newTalkNodeId2');
      expect(instance.getStartTalk()).to.equal('newTalkNodeId1');
      instance.removeChild(0);
      expect(instance.getStartTalk()).to.equal('newTalkNodeId2');
    });
    it('should remove child and set to empty string if no other child exists', () => {
      instance.addChild('newTalkNodeId1');
      instance.addChild('newTalkNodeId2');
      instance.removeChild(0);
      instance.removeChild(0);
      expect(instance.getStartTalk()).to.equal('');
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
