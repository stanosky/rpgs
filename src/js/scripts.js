"use strict";
import data from '../data/data.json';
import RPGSystem from './rpgs/RPGSystem';

(function ($, window, document, undefined) {
  $(function () {
    let rpgs1 = new RPGSystem();
    rpgs1
    .addActor('act1',{name:'Adam'}).inp('dialog','dlg1')
    .addCondition('cond1',{code:`
        (function(){
          alert("Condition test!");
          //return true;
        })();
      `}).out('visibility','tlk0ans1')
    .addDialog('dlg1',{startTalk:'tlk0'}).out('dialog','act1')
      .addTalk('tlk0',{text:'This is talk 0.'})
        .addAnswer('tlk0ans1',{text:'Answer1'}).out('goto','tlk1')
                                               .inp('visibility','cond1')
        .addAnswer('tlk0ans2',{text:'Answer2'}).out('goto','tlk2')
        .addAnswer('tlk0ans3',{text:'Answer3'}).out('goto','tlk3')

      .addTalk('tlk1',{text:'This is talk 1.'}).inp('goto','tlk0ans1')
        .addAnswer('tlk1ans1',{text:'Answer1'})

      .addTalk('tlk2',{text:'This is talk 2.'}).inp('goto','tlk0ans2')
        .addAnswer('tlk2ans1',{text:'Answer1'})

      .addTalk('tlk3',{text:'This is talk 3.'}).inp('goto','tlk0ans3')
        .addAnswer('tlk3ans1',{text:'Answer1'})
    .addVariable('b1',{type:'boolean',value:false})
    .addVariable('s1',{type:'string',value:'sssssss'})
    .addVariable('n1',{type:'number',value:56})
    let b1 = rpgs1.getVariable('b1');
    let s1 = rpgs1.getVariable('s1');
    let n1 = rpgs1.getVariable('n1');
    console.log('b1 value',b1.getValue(),b1.getType());
    console.log('s1 value',s1.getValue(),s1.getType());
    console.log('n1 value',n1.getValue(),n1.getType());

    let rpgs1Serialized = rpgs1.serializeData();
    console.log("rpgs1",rpgs1Serialized);

    let rpgs2 = new RPGSystem(JSON.parse(rpgs1Serialized));
    console.log("data created is equal to data parsed:",rpgs1Serialized === rpgs2.serializeData());
  });

})(jQuery, window, document);
