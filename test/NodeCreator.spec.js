'use strict';

const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const NodeCreator = require('../src/rpgs/core/NodeCreator');
const expect = chai.expect;
const assert = chai.assert;
chai.use(sinonChai);

let params;
let instance;

let bn_params = {class:'BaseNode'};
let fake_bn_getId;
let fake_bn_canAddChild;
let fake_bn_addWire;
let fake_bn_canBeWiredTo;
let fake_BaseNode;

let an_params = {class:'AnswerNode',text:''};
let fake_an_getId;
let fake_an_canAddChild;
let fake_an_addWire;
let fake_an_canRecieveWire;
let fake_AnswerNode;

let tn_params = {uuid:'tn',class:'TalkNode',text:''};
let fake_tn_getId;
let fake_tn_canAddChild;
let fake_tn_addWire;
let fake_tn_addChild;
let fake_tn_getData;
let fake_tn_canBeWiredTo;
let fake_TalkNode;

let tn2_params = {uuid:'tn2',class:'TalkNode',text:''};
let fake_tn2_getId;
let fake_tn2_canAddChild;
let fake_tn2_addWire;
let fake_tn2_addChild;
let fake_tn2_getData;
let fake_tn2_canRecieveWire;
let fake_TalkNode2;

let dn_params = {uuid:'dn',class:'DialogNode'};
let fake_dn_getId;
let fake_dn_canAddChild;
let fake_dn_addWire;
let fake_dn_addChild;
let fake_dn_getData;
let fake_DialogNode;

let fake_np_addNode;
let fake_np_findNode;
let fake_nodePool;

let fake_nf_createNode;
let fake_nodeFactory;

let fake_eh_showMsg;
let fake_errorHandler;

describe('Given an instance of NodeCreator', function () {
  beforeEach(function () {
    fake_bn_getId = sinon.stub().returns('bn');
    fake_bn_canAddChild = sinon.stub().returns(false);
    fake_bn_addWire = sinon.stub();
    fake_bn_canBeWiredTo = sinon.stub().returns(false);
    fake_BaseNode = {
      getId: fake_bn_getId,
      canAddChild: fake_bn_canAddChild,
      addWire: fake_bn_addWire,
      canBeWiredTo: fake_bn_canBeWiredTo
    };

    fake_an_getId = sinon.stub().returns('an');
    fake_an_canAddChild = sinon.stub().returns(false);
    fake_an_addWire = sinon.stub();
    fake_an_canRecieveWire = sinon.stub().returns(true);
    fake_an_canRecieveWire.withArgs('goto')
    fake_AnswerNode = {
      getId: fake_an_getId,
      canAddChild: fake_an_canAddChild,
      addWire: fake_an_addWire,
      canRecieveWire: fake_an_canRecieveWire
    };

    fake_tn_getId = sinon.stub().returns('tn');
    fake_tn_canAddChild = sinon.stub().returns(true);
    fake_tn_addWire = sinon.stub();
    fake_tn_addChild = sinon.stub();
    fake_tn_getData = sinon.stub().returns(tn_params);
    fake_tn_canBeWiredTo = sinon.stub().returns(true);
    fake_TalkNode = {
      getId: fake_tn_getId,
      canAddChild: fake_tn_canAddChild,
      addWire: fake_tn_addWire,
      addChild: fake_tn_addChild,
      getData: fake_tn_getData,
      canBeWiredTo: fake_tn_canBeWiredTo
    };

    fake_tn2_getId = sinon.stub().returns('tn2');
    fake_tn2_canAddChild = sinon.stub().returns(true);
    fake_tn2_addWire = sinon.stub();
    fake_tn2_addChild = sinon.stub();
    fake_tn2_getData = sinon.stub().returns(tn2_params);
    fake_tn2_canRecieveWire = sinon.stub().returns(true);
    fake_TalkNode2 = {
      getId: fake_tn2_getId,
      canAddChild: fake_tn2_canAddChild,
      addWire: fake_tn2_addWire,
      addChild: fake_tn2_addChild,
      getData: fake_tn2_getData
    };

    fake_dn_getId = sinon.stub().returns('dn');
    fake_dn_canAddChild = sinon.stub().returns(true);
    fake_dn_addWire = sinon.stub();
    fake_dn_addChild = sinon.stub();
    fake_dn_getData = sinon.stub().returns(dn_params);
    fake_DialogNode = {
      getId: fake_dn_getId,
      canAddChild: fake_dn_canAddChild,
      addWire: fake_dn_addWire,
      addChild: fake_dn_addChild,
      getData: fake_dn_getData
    };

    fake_np_addNode = sinon.stub();
    fake_np_findNode = sinon.stub().returns(null);
    fake_np_findNode.withArgs('bn').returns(fake_BaseNode);
    fake_np_findNode.withArgs('an').returns(fake_AnswerNode);
    fake_np_findNode.withArgs('tn').returns(fake_TalkNode);
    fake_np_findNode.withArgs('tn2').returns(fake_TalkNode2);
    fake_np_findNode.withArgs('dn').returns(fake_DialogNode);
    fake_nodePool = {
      addNode: fake_np_addNode,
      findNode: fake_np_findNode
    };

    fake_nf_createNode = sinon.stub();
    fake_nf_createNode.withArgs(bn_params).returns(fake_BaseNode);
    fake_nf_createNode.withArgs(an_params).returns(fake_AnswerNode);
    fake_nf_createNode.withArgs(tn_params).returns(fake_TalkNode);
    fake_nf_createNode.withArgs(tn2_params).returns(fake_TalkNode2);
    fake_nf_createNode.withArgs(dn_params).returns(fake_DialogNode);
    fake_nodeFactory = {createNode: fake_nf_createNode};

    fake_eh_showMsg = sinon.stub();
    fake_errorHandler = {showMsg: fake_eh_showMsg};

    instance = new NodeCreator(fake_nodePool, fake_nodeFactory, fake_errorHandler);
  });
  describe('#addNode()', function () {
    it('should be chainable method', () => {
      expect(instance.addNode('BaseNode')).to.equal(instance);
    });
    it('should add node of given type', () => {
      instance.addNode('BaseNode');
      expect(fake_nf_createNode).have.been.calledOnce;
      expect(fake_np_addNode).have.been.calledWith(fake_BaseNode);
    });
  });
  describe('#addDialog()',function() {
    it('should be chainable method', () => {
      expect(instance.addDialog('dn')).to.equal(instance);
    });
    it('should add new dialog node', () => {
      instance.addDialog('dn');
      expect(fake_nf_createNode).have.been.calledOnce;
      expect(fake_np_addNode).have.been.calledWith(fake_DialogNode);
    });
  });
  describe('#addTalk()',function() {
    it('should be chainable method', () => {
      instance.addDialog('dn');
      expect(instance.addTalk('tn')).to.equal(instance);
    });
    it('should add new talk node', () => {
      instance.addDialog('dn')
                .addTalk('tn');
      expect(fake_nf_createNode).have.been.calledTwice;
      expect(fake_dn_addChild).have.been.calledWith('tn');
      expect(fake_np_addNode).have.been.calledWith(fake_DialogNode);
      expect(fake_np_addNode).have.been.calledWith(fake_TalkNode);
    });
  });
  describe('#addAnswer()',function() {
    it('should be chainable method', () => {
      instance.addDialog('dn');
      instance.addTalk('tn');
      expect(instance.addAnswer()).to.equal(instance);
    });
    it('should add new answer node', () => {
      instance.addDialog('dn').addTalk('tn').addAnswer();
      expect(fake_nf_createNode).have.been.calledThrice;
      expect(fake_np_addNode).have.been.calledWith(fake_DialogNode);
      expect(fake_np_addNode).have.been.calledWith(fake_TalkNode);
      expect(fake_np_addNode).have.been.calledWith(fake_AnswerNode);
      expect(fake_dn_addChild).have.been.calledWith('tn');
      expect(fake_tn_addChild).have.been.calledWith('an');
    });
  });
  describe('#addWire()',function() {
    it('should connect two compatible nodes', () => {
      instance.addDialog('dn')
                .addTalk('tn')
                .addTalk('tn2')
                  .addAnswer()
                    .addWire('goto','tn');
      expect(fake_np_findNode).have.been.calledTwice;
      expect(fake_an_canRecieveWire).have.been.calledWith('goto');
      expect(fake_an_addWire).have.been.calledWith('goto','tn');
    });
    it('should throw error if nodes are incompatible', () => {
      instance.addNode('BaseNode');
      instance.addDialog('dn')
                .addTalk('tn')
                .addTalk('tn2')
                  .addAnswer()
                    .addWire('goto','bn');
      expect(fake_np_findNode).have.been.calledTwice;
      expect(fake_an_canRecieveWire).have.been.calledWith('goto');
      expect(fake_bn_canBeWiredTo).have.been.calledWith('goto');
      expect(fake_eh_showMsg).have.been.called;
      expect(fake_eh_showMsg).have.been.calledWith(3,{
        type:'goto',
        node1:'an',
        node2:'bn'
      });
    });
  });
});
