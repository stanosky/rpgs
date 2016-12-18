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
        .addAnswer('tlk3ans1',{text:'Answer1'});
    let rpgs1Serialized = rpgs1.serializeData();
    console.log("rpgs1",rpgs1Serialized);

    let rpgs2 = new RPGSystem(JSON.parse(rpgs1Serialized));
    console.log(rpgs2.serializeData());
  });

})(jQuery, window, document);
