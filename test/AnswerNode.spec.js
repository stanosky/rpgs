'use strict'
const expect = require('chai').expect;
const AnswerNode = require('../src/rpgs/dialogs/AnswerNode');

let params;
let instance;
let keys;

describe('Given an instance of AnswerNode',function () {
  beforeEach(function () {
    params = {uuid:'myAnswerId',
              class:'AnswerNode',
              wires:{
                enabled: [],
                goto: [],
                visible: []
              },
              params:{},
              text:'This is my answer.'
            };
    keys = ['class','uuid','wires','params','text'];
    instance = new AnswerNode(params);
  });
  describe('#constructor()',function() {
    it('should initialize without params', () => {
      instance = new AnswerNode();
      expect(instance.getData()).to.have.all.keys(keys);
    });
    it('should initialize with empty object', () => {
      instance = new AnswerNode({});
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
    it('should set answer text', () => {
      let text = 'New answer text.';
      instance.setText(text);
      expect(instance.getText()).to.equal(text);
    });
  });
  describe('#getText()',function() {
    it('should return answer text', () => {
      expect(instance.getText()).to.equal(params.text);
    });
  });
  describe('#getTalk()',function() {
    it('should return id of linked talk node', () => {
      instance.setWire('goto','talkNodeId');
      expect(instance.getTalk()).to.equal('talkNodeId');
    });
  });
  describe('#dispose()',function() {
    it('should do cleanining and prepare object to garbage collector', () => {
      instance.dispose();
      expect(instance.getText()).to.equal(undefined);
    });
  });
});
