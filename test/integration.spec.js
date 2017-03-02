'use strict'
const cleanup = require('jsdom-global')(); // Saving ass line. It emulates global object from browsers.
const expect = require('chai').expect;
//const RPGSystem = require('../src/rpgs/RPGSystem');
//const DialogWalker = require('../src/rpgs/dialogs/DialogWalker');

const RPGSystem = require('../build/rpgs.min').RPGSystem;
const DialogWalker = require('../build/rpgs.min').DialogWalker;


let rpgs;
let dwalker;
let answers;


function expectFollowingConversation(talkText,answersTexts,indexOfChosenAnswer,shouldHaveNextTalk) {
  let conv = dwalker.getConversation();
  let idOfChosenAnswer = conv.options[indexOfChosenAnswer].id;
  expect(conv.text).to.equal(talkText);
  conv.options.map((option,index) => {
    expect(option.text).to.equal(answersTexts[index]);
  });
  expect(dwalker.selectOption(idOfChosenAnswer)).to.equal(shouldHaveNextTalk);
}

describe('Integration test of RPGSystem', function () {
  beforeEach(function () {
    rpgs = new RPGSystem().addDialog('dlg1')

      .addTalk('t0', 'Hello there! How are you?')
        .addAnswer('I`m weel, thank you.').addWire('goto', 't1')
        .addAnswer('Meh, been better.').addWire('goto', 't2')
        .addAnswer('I`m grumpy.').addWire('goto', 't2')

      .addTalk('t1', 'That`s great! Glad to hear it!')
        .addAnswer('So who are you anyway?').addWire('goto', 't3')

      .addTalk('t2', 'I`m sorry to hear that.')
        .addAnswer('So who are you anyway?').addWire('goto', 't3')

      .addTalk('t3', 'I`m the dialog guy of course!')
        .addAnswer('[Investigate]').addWire('goto', 't4')
        .addAnswer('Goodbye.')

      .addTalk('t4', '...')
        .addAnswer('What is your favorite color?').addWire('goto', 't5')
        .addAnswer('How long have you been here?').addWire('goto', 't6')
        .addAnswer('Nevermind.').addWire('goto', 't7')

      .addTalk('t5', 'Hm... black.')
        .addAnswer('[Investigate]').addWire('goto', 't4')

      .addTalk('t6', 'A while.')
        .addAnswer('[Investigate]').addWire('goto', 't4')

      .addTalk('t7', 'I there anything else I can do for you?')
        .addAnswer('[Investigate]').addWire('goto', 't4')
        .addAnswer('Goodbye.')

    dwalker = new DialogWalker(rpgs);
  });
  describe('Example dialog:', function () {
    it('should traverse trough possible options', () => {
      dwalker.setDialog('dlg1');

      expectFollowingConversation(
        'Hello there! How are you?',
        [
          'I`m weel, thank you.',
          'Meh, been better.',
          'I`m grumpy.'
        ],
        0,
        true
      );

      expectFollowingConversation(
        'That`s great! Glad to hear it!',
        [
          'So who are you anyway?'
        ],
        0,
        true
      );

      expectFollowingConversation(
        'I`m the dialog guy of course!',
        [
          '[Investigate]',
          'Goodbye.'
        ],
        0,
        true
      );

      expectFollowingConversation(
        '...',
        [
          'What is your favorite color?',
          'How long have you been here?',
          'Nevermind.'
        ],
        0,
        true
      );

      expectFollowingConversation(
        'Hm... black.',
        [
          '[Investigate]'
        ],
        0,
        true
      );

      expectFollowingConversation(
        '...',
        [
          'What is your favorite color?',
          'How long have you been here?',
          'Nevermind.'
        ],
        1,
        true
      );

      expectFollowingConversation(
        'A while.',
        [
          '[Investigate]'
        ],
        0,
        true
      );

      expectFollowingConversation(
        '...',
        [
          'What is your favorite color?',
          'How long have you been here?',
          'Nevermind.'
        ],
        2,
        true
      );

      expectFollowingConversation(
        'I there anything else I can do for you?',
        [
          '[Investigate]',
          'Goodbye.'
        ],
        1,
        false
      );


    });
  });
});

cleanup();
