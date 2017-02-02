'use strict'
const cleanup = require('jsdom-global')(); // Saving ass line. It emulates global object from browsers.
const expect = require('chai').expect;
const RPGSystem = require('../src/rpgs/RPGSystem');
const BaseNode = require('../src/rpgs/core/BaseNode');
const AnswerNode = require('../src/rpgs/dialogs/AnswerNode');
const TalkNode = require('../src/rpgs/dialogs/TalkNode');
const DialogNode = require('../src/rpgs/dialogs/DialogNode');
const DialogWalker = require('../src/rpgs/dialogs/DialogWalker');

let rpgs;
let dwalker;

describe('Given an instance of RPGSystem', function () {
  beforeEach(function () {
    rpgs = new RPGSystem().addDialog('dlg1')

      .addTalk('t0', 'Hello there! How are you?')
        .addAnswer('I`m weel, thank you.').setWire('goto', 't1')
        .addAnswer('Meh, been better.').setWire('goto', 't2')
        .addAnswer('I`m grumpy.').setWire('goto', 't2')

      .addTalk('t1', 'That`s great! Glad to hear it!')
        .addAnswer('So who are you anyway?').setWire('goto', 't3')

      .addTalk('t2', 'I`m sorry to hear that.')
        .addAnswer('So who are you anyway?').setWire('goto', 't3')

      .addTalk('t3', 'I`m the dialog guy of course!')
        .addAnswer('[Investigate]').setWire('goto', 't4')
        .addAnswer('Goodbye.')

      .addTalk('t4', '...')
        .addAnswer('What is your favorite color?').setWire('goto', 't5')
        .addAnswer('How long have you been here?').setWire('goto', 't6')
        .addAnswer('Nevermind.').setWire('goto', 't7')

      .addTalk('t5', 'Hm... black.')
        .addAnswer('[Investigate]').setWire('goto', 't4')

      .addTalk('t6', 'A while.')
        .addAnswer('[Investigate]').setWire('goto', 't4')

      .addTalk('t7', 'I there anything else I can do for you?')
        .addAnswer('[Investigate]').setWire('goto', 't4')
        .addAnswer('Goodbye.')

    dwalker = new DialogWalker(rpgs);
  });
  describe('Example dialog:', function () {
    it('should traverse trough possible options', () => {
      let conv;
      dwalker.setDialog('dlg1');
      conv = dwalker.getConversation();
      expect(conv).to.have.all.keys(['id','text','active','enabled']);
    });
  });
});

cleanup();
