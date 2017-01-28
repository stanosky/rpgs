'use strict'
const expect = require('chai').expect;
const TalkNode = require('../src/rpgs/dialogs/TalkNode');

let params;
let instance;
let keys;

describe('Given an instance of TalkNode',function () {
  beforeEach(function () {
    params = {uuid:'myTalkId',
              class:'TalkNode',
              wires:{
                enabled: [],
                visible: []
              },
              params:{},
              children:[],
              text:''
            };
    keys = ['class','uuid','wires','params','children','text'];
    instance = new TalkNode(params)
  });
  describe('#constructor()',function() {
    it('should initialize without params', () => {
      instance = new TalkNode();
      expect(instance.getData()).to.have.all.keys(keys);
    });
    it('should initialize with empty object', () => {
      instance = new TalkNode({});
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
  describe('#setText()',function() {
    it('should set new talk text', () => {
      let text = 'Npc new talk.';
      instance.setText(text);
      expect(instance.getText()).to.equal(text);
    });
  });
  describe('#getText()',function() {
    it('should return npc talk text', () => {
      expect(instance.getText()).to.equal('');
    });
  });
  describe('#canAddChild()',function() {
    it('should return boolean that indicates if child can be added', () => {
      let childType = ['ActorNode','InventoryNode','BaseNode','CompoundNode',
                      'DialogNode','TalkNode','ScriptNode',
                      'QuestNode','TaskNode','VariableNode'];
      childType.map((child) => expect(instance.canAddChild(child)).to.equal(false));
      expect(instance.canAddChild('AnswerNode')).to.equal(true);
    });
  });
  describe('#dispose()',function() {
    it('should do cleanining and prepare object to garbage collector', () => {
      instance.setText('New NPC talk.');
      instance.dispose();
      expect(instance.getText()).to.equal(undefined);
    });
  });
});
