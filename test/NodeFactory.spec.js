'use strict';
import BaseNode from '../src/rpgs/core/BaseNode';
import AnswerNode from '../src/rpgs/dialogs/AnswerNode';
import DialogNode from '../src/rpgs/dialogs/DialogNode';
import TalkNode from '../src/rpgs/dialogs/TalkNode';

const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const NodeFactory = require('../src/rpgs/core/NodeFactory');
const expect = chai.expect;
const assert = chai.assert;
chai.use(sinonChai);

let params;
let instance;
let fake_eh_showMsg;
let fake_errorHandler;

let fake_np_addNode;
let fake_np_findNode;
let fake_nodePool;

describe('Given an instance of NodeFactory',function () {
  beforeEach(function () {
    fake_eh_showMsg = sinon.stub();
    fake_eh_showMsg.withArgs('').throws("Error");
    fake_errorHandler = {showMsg: fake_eh_showMsg};

    fake_np_addNode = sinon.stub();
    fake_np_findNode = sinon.stub().returns(null);
    fake_nodePool = {
      addNode: fake_np_addNode,
      findNode: fake_np_findNode
    };

    instance = new NodeFactory(fake_errorHandler);
  });
  describe('#createNode()',function() {
    it('should create different nodes depends on given class name', () => {
      expect(instance.createNode(fake_nodePool,{class:'BaseNode'})).to.be.instanceof(BaseNode);
      expect(instance.createNode(fake_nodePool,{class:'AnswerNode'})).to.be.instanceof(AnswerNode);
      expect(instance.createNode(fake_nodePool,{class:'DialogNode'})).to.be.instanceof(DialogNode);
      expect(instance.createNode(fake_nodePool,{class:'TalkNode'})).to.be.instanceof(TalkNode);
    });
    it('should throw error if node of given name cannot be created', () => {
      instance.createNode(fake_nodePool,{class:''});
      expect(fake_eh_showMsg).to.have.been.calledWith(1,{class:''});
    });
  });
});
