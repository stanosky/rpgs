'use strict'
const cleanup = require('jsdom-global')() // Saving ass line. It emulates global object from browsers.
const expect = require('chai').expect
const RPGSystem = require('../src/rpgs/RPGSystem')
//const TalkNode = require('../src/rpgs/dialogs/TalkNode');
const BaseNode = require('../src/rpgs/core/BaseNode');
//const data = require('../data/data.json');
//const DialogWalker = require('./rpgs/dialogs/DialogWalker');

let rpgs;

describe('Integration test of RPGSystem', function () {
  describe('Given an instance of RPGSystem', function () {
    before(function () {
      rpgs = new RPGSystem()
      .addActor('act1',{name:'Adam'}).setWire('dialog','dlg1')
      .addCondition('cond1',{script:`return rpgs.getVar('b1');`})
      .addDialog('dlg1',{startTalk:'tlk0'})
        .addTalk('tlk0',{text:'This is talk 0.'})
          .addAnswer('tlk0ans1',{text:'Answer1'}).setWire('visibility','cond1')
                                                 .setWire('goto','tlk1')
          .addAnswer('tlk0ans2',{text:'Answer2'}).setWire('goto','tlk2')
          .addAnswer('tlk0ans3',{text:'Answer3'}).setWire('goto','tlk3')

        .addTalk('tlk1',{text:'This is talk 1.'})
          .addAnswer('tlk1ans1',{text:'Answer1'})

        .addTalk('tlk2',{text:'This is talk 2.'})
          .addAnswer('tlk2ans1',{text:'Answer1'})

        .addTalk('tlk3',{text:'This is talk 3.'})
          .addAnswer('tlk3ans1',{text:'Answer1'})
      .addVariable('b1',{type:'boolean',value:false})
      .addVariable('s1',{type:'string',value:'This is message from compiled code!'})
      .addVariable('n1',{type:'number',value:56})

      /*let cond = rpgs1.findNode('cond1');
      let b1 = rpgs1.findNode('b1');
      let s1 = rpgs1.findNode('s1');
      let n1 = rpgs1.findNode('n1');

      let rpgs1Serialized = rpgs1.serializeData();
      console.log("rpgs1",rpgs1Serialized);

      let rpgs2 = new RPGSystem(JSON.parse(rpgs1Serialized));

      let rpgs2Serialized = rpgs2.serializeData();
      console.log("rpgs2",rpgs2Serialized);

      console.log("data created is equal to data parsed:",rpgs1Serialized === rpgs2Serialized);

      let walker = new DialogWalker(rpgs2);
      walker.setDialog('dlg1');
      console.log('conversation1:',walker.getConversation());
      walker.selectOption('tlk0ans1');
      console.log('conversation2:',walker.getConversation());
      */
    });
    describe('#findNode()', function () {
      it('should return null if nothing is passed', () => {
        expect(rpgs.findNode()).to.be.equal(null)
      });
      it('should return BaseNode instance if we pass a valid id', () => {
        expect(rpgs.findNode('tlk2')).to.be.instanceof(BaseNode)
      });
    });
  });
});

cleanup();
