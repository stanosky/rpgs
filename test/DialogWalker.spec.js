'use strict'
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const DialogWalker = require('../src/rpgs/dialogs/DialogWalker');
const expect = chai.expect;
const assert = chai.assert;
chai.use(sinonChai);

let instance;

let fake_rpgs;
let fake_rpgs_findNode;

let fake_dialog;
let fake_dialog_getStartTalk;

let fake_talk1;
let fake_talk1_getText;
let fake_talk1_getChildren;

let fake_talk2;
let fake_talk2_getText;
let fake_talk2_getChildren;


let fake_answer1
let fake_answer1_getId;
let fake_answer1_getText;
let fake_answer1_isActive;
let fake_answer1_isVisible;
let fake_answer1_getTalk;

let fake_answer2;
let fake_answer2_getId;
let fake_answer2_getText;
let fake_answer2_isActive;
let fake_answer2_isVisible;
let fake_answer2_getTalk;

let fake_answer3;
let fake_answer3_getId;
let fake_answer3_getText;
let fake_answer3_isActive;
let fake_answer3_isVisible;
let fake_answer3_getTalk;

describe('Given an instance of DialogWalker',function () {
  beforeEach(function () {

    fake_dialog_getStartTalk = sinon.stub().returns('talk1');

    fake_dialog = {getStartTalk:fake_dialog_getStartTalk};

    fake_talk1_getText = sinon.stub().returns('Talk1 fake text.');
    fake_talk1_getChildren = sinon.stub().returns(['ans1','ans2','ans3']);

    fake_talk1 = {
      getText:fake_talk1_getText,
      getChildren:fake_talk1_getChildren
    };

    fake_talk2_getText = sinon.stub().returns('Talk2 fake text.');
    fake_talk2_getChildren = sinon.stub().returns([]);

    fake_talk2 = {
      getText:fake_talk2_getText,
      getChildren:fake_talk2_getChildren
    };

    fake_answer1_getId = sinon.stub().returns('ans1');
    fake_answer1_getText = sinon.stub().returns('Answer1 fake text.');
    fake_answer1_isActive = sinon.stub().returns(true);
    fake_answer1_isVisible = sinon.stub().returns(true);
    fake_answer1_getTalk =  sinon.stub().returns('talk2');

    fake_answer1 = {
      getId:fake_answer1_getId,
      getText:fake_answer1_getText,
      isActive:fake_answer1_isActive,
      isVisible:fake_answer1_isVisible,
      getTalk:fake_answer1_getTalk
    }

    fake_answer2_getId = sinon.stub().returns('ans2');
    fake_answer2_getText = sinon.stub().returns('Answer2 fake text.');
    fake_answer2_isActive = sinon.stub().returns(false);
    fake_answer2_isVisible = sinon.stub().returns(false);
    fake_answer2_getTalk =  sinon.stub().returns('talk3');

    fake_answer2 = {
      getId:fake_answer2_getId,
      getText:fake_answer2_getText,
      isActive:fake_answer2_isActive,
      isVisible:fake_answer2_isVisible,
      getTalk:fake_answer2_getTalk
    }

    fake_answer3_getId = sinon.stub().returns('ans3');
    fake_answer3_getText = sinon.stub().returns('Answer3 fake text.');
    fake_answer3_isActive = sinon.stub().returns(false);
    fake_answer3_isVisible = sinon.stub().returns(false);
    fake_answer3_getTalk =  sinon.stub().returns(undefined);

    fake_answer3 = {
      getId:fake_answer3_getId,
      getText:fake_answer3_getText,
      isActive:fake_answer3_isActive,
      isVisible:fake_answer3_isVisible,
      getTalk:fake_answer3_getTalk
    }

    fake_rpgs_findNode = sinon.stub().returns(null);
    fake_rpgs_findNode.withArgs('dlg1').returns(fake_dialog);
    fake_rpgs_findNode.withArgs('talk1').returns(fake_talk1);
    fake_rpgs_findNode.withArgs('talk2').returns(fake_talk2);
    fake_rpgs_findNode.withArgs('ans1').returns(fake_answer1);
    fake_rpgs_findNode.withArgs('ans2').returns(fake_answer2);
    fake_rpgs_findNode.withArgs('ans3').returns(fake_answer3);

    fake_rpgs = {findNode:fake_rpgs_findNode};

    instance = new DialogWalker(fake_rpgs);
  });
  describe('#constructor()',function() {
    it('should not initialize without RPGSystem instance passed', () => {
      let fn = function() {new DialogWalker()};
      expect(fn).to.throw(Error);
    });
    it('should initialize only with RPGSystem instance', () => {
      let fn = function() {new DialogWalker(fake_rpgs)};
      expect(fn).to.not.throw(Error);
    });
  });
  describe('#setDialog()',function() {
    it('should set dialog node', () => {
      instance.setDialog('dlg1');
      expect(fake_rpgs_findNode).to.have.been.calledWith('dlg1');
      expect(fake_dialog_getStartTalk).to.have.been.calledOnce;
      expect(fake_rpgs_findNode).to.have.been.calledWith('talk1');
    });
  });
  describe('#setTalk()',function() {
    it('should set talk node', () => {
      instance.setDialog('dlg1');
      instance.setTalk('talk2');
      expect(fake_rpgs_findNode).to.have.been.calledWith('talk2');
    });
    it('should throw error if node was not found', () => {
      instance.setDialog('dlg1');
      let fn = function(){instance.setTalk('talk3')};
      expect(fn).to.throw(Error);
      expect(fake_rpgs_findNode).to.have.been.calledWith('talk3');
    });
  });
  describe('#getConversation()',function() {
    it('should return object which contains data from talk node and its children', () => {
      instance.setDialog('dlg1');
      expect(fake_rpgs_findNode).to.have.been.calledWith('dlg1');
      expect(fake_dialog_getStartTalk).to.have.been.calledOnce;
      expect(fake_rpgs_findNode).to.have.been.calledWith('talk1');

      let conv = instance.getConversation();
      expect(fake_talk1_getText).to.have.been.calledOnce;
      expect(fake_talk1_getChildren).to.have.been.calledOnce;
      expect(fake_rpgs_findNode).to.have.been.calledWith('ans1');
      expect(fake_rpgs_findNode).to.have.been.calledWith('ans2');
      expect(fake_rpgs_findNode).to.have.been.calledWith('ans3');

      expect(fake_answer1_getId).to.have.been.calledOnce;
      expect(fake_answer1_getText).to.have.been.calledOnce;
      expect(fake_answer1_isActive).to.have.been.calledOnce;
      expect(fake_answer1_isVisible).to.have.been.calledOnce;

      expect(fake_answer2_getId).to.have.been.calledOnce;
      expect(fake_answer2_getText).to.have.been.calledOnce;
      expect(fake_answer2_isActive).to.have.been.calledOnce;
      expect(fake_answer2_isVisible).to.have.been.calledOnce;

      expect(fake_answer3_getId).to.have.been.calledOnce;
      expect(fake_answer3_getText).to.have.been.calledOnce;
      expect(fake_answer3_isActive).to.have.been.calledOnce;
      expect(fake_answer3_isVisible).to.have.been.calledOnce;

      expect(conv).to.have.all.keys(['text','options']);
      expect(conv.text).to.equal('Talk1 fake text.');

      let keys = ['id','text','active','enabled'];
      let opt1 = ['ans1','Answer1 fake text.',true,true];
      let opt2 = ['ans2','Answer2 fake text.',false,false];
      let opt3 = ['ans3','Answer3 fake text.',false,false];
      let opts = [opt1,opt2,opt3];
      conv.options.map((opt, optIndex) => {
        expect(opt).to.have.all.keys(keys);
        keys.map((k,i) => {
          expect(opt[k]).to.equal(opts[optIndex][i]);
        });
      });
    });
    it('should return default object if talk node was not set', () => {
      let conv = instance.getConversation();
      expect(conv).to.have.all.keys('text','options');
      expect(conv.text).to.equal('');
      expect(conv.options).to.deep.equal([]);
    });
  });
  describe('#selectOption()',function() {
    it('should select one of answers from talk node children', () => {
      instance.setDialog('dlg1');
      expect(fake_rpgs_findNode).to.have.been.calledWith('dlg1');
      expect(fake_dialog_getStartTalk).to.have.been.calledOnce;
      expect(fake_rpgs_findNode).to.have.been.calledWith('talk1');
      expect(instance.selectOption('ans1')).to.equal(true);
      expect(fake_talk1_getChildren).to.have.been.calledOnce;
      expect(fake_rpgs_findNode).to.have.been.calledWith('ans1');
      expect(fake_answer1_getTalk).to.have.been.calledOnce;
      expect(fake_rpgs_findNode).to.have.been.calledWith('talk2');
    });
    it('should return boolean value which indicates that answer leads (or not) to another talk', () => {
      instance.setDialog('dlg1');
      expect(instance.selectOption('ans1')).to.equal(true);
      expect(instance.selectOption('ans3')).to.equal(false);
    });
  });
  describe('#reset()',function() {
    it('should reset dialog to initial state', () => {
      instance.setDialog('dlg1');
      instance.setTalk('talk2');
      instance.reset();
      expect(fake_rpgs_findNode).to.have.been.calledWith('dlg1');
      expect(fake_dialog_getStartTalk).to.have.been.calledTwice;
      expect(fake_rpgs_findNode).to.have.been.calledWith('talk1');
      expect(fake_rpgs_findNode).to.have.been.calledWith('talk2');
      expect(fake_rpgs_findNode).to.have.been.callCount(4);
    });
  });
});
