'use strict'
const DialogNode = require('../src/rpgs/dialogs/DialogNode');

const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const NodeFactory = require('../src/rpgs/core/NodeFactory');
const expect = chai.expect;
const assert = chai.assert;
chai.use(sinonChai);

let fake_child1_getId = sinon.stub().returns('child1');
let fake_child1 = {getId:fake_child1_getId};

let fake_child2_getId = sinon.stub().returns('child2');
let fake_child2 = {getId:fake_child2_getId};

let fake_child3_getId = sinon.stub().returns('child3');
let fake_child3 = {getId:fake_child3_getId};

let fake_child4_getId = sinon.stub().returns('child4');
let fake_child4 = {getId:fake_child4_getId};

let fake_addNode = sinon.stub().returns(null);
fake_addNode.withArgs('child1').returns(fake_child1);
fake_addNode.withArgs('child2').returns(fake_child2);
fake_addNode.withArgs('child3').returns(fake_child3);
fake_addNode.withArgs('child4').returns(fake_child4);
let fake_findNode = sinon.stub().returns(null);
fake_findNode.withArgs('child1').returns(fake_child1);
fake_findNode.withArgs('child2').returns(fake_child2);
fake_findNode.withArgs('child3').returns(fake_child3);
fake_findNode.withArgs('child4').returns(fake_child4);
let fake_removeNode = sinon.stub().returns(false);
fake_removeNode.withArgs('child1').returns(true);
let fake_NodePool = {
  addNode: fake_addNode,
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
      expect(instance.addChild('child1').getId()).to.equal('child1');
      expect(instance.addChild('child2').getId()).to.equal('child2');
      expect(instance.getStartTalk()).to.equal('child1');
    });
  });
  describe('#removeChild()',function() {
    it('should remove child and set startTalk to first available child', () => {
      instance.addChild('child1');
      instance.addChild('child2');
      expect(instance.getStartTalk()).to.equal('child1');
      instance.removeChild(0);
      expect(instance.getStartTalk()).to.equal('child2');
    });
    it('should remove child and set to empty string if no other child exists', () => {
      instance.addChild('child1');
      instance.addChild('child2');
      instance.removeChild(0);
      instance.removeChild(0);
      expect(instance.getStartTalk()).to.equal('');
    });
  });
  describe('#setStartTalk()',function() {
    it('should set talk node id from which dialog starts', () => {
      instance.addChild('child1');
      instance.addChild('child2');
      instance.addChild('child3');
      instance.setStartTalk('child3')
      expect(instance.getStartTalk()).to.equal('child3');
    });
    it('should not set talk node id which is not its child', () => {
      instance.setStartTalk('child3')
      expect(instance.getStartTalk()).to.equal('');
    });
  });
  describe('#getStartTalk()',function() {
    it('should return start talk node id', () => {
      instance.addChild('child1');
      expect(instance.getStartTalk()).to.equal('child1');
    });
  });
  describe('#dispose()',function() {
    it('should do cleanining and prepare object to garbage collector', () => {
      instance.addChild('child1');
      instance.dispose();
      expect(instance.getStartTalk()).to.equal(undefined);
    });
  });
});
