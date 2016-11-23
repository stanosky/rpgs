"use strict";

let rpgs = new RPGSystem();

rpgs
.addActor('act1',{name:'Adam'}).input('dialog','dlg1')
.addCondition('cond1',{code:`return true;`})
.addDialog('dlg1',{startTalk:'tlk0'})
  .addTalk('tlk0',{text:'This is talk 0.'})
    .addAnswer('tlk0ans1',{text:'Answer1'}).output('goto','tlk1').input('visibility','cond1')
    .addAnswer('tlk0ans2',{text:'Answer2'}).output('goto','tlk2')
    .addAnswer('tlk0ans3',{text:'Answer3'}).output('goto','tlk3')

  .addTalk('tlk1',{text:'This is talk 1.'})
    .addAnswer('tlk1ans1',{text:'Answer1'})

  .addTalk('tlk2',{text:'This is talk 2.'})
    .addAnswer('tlk2ans1',{text:'Answer1'})

  .addTalk('tlk3',{text:'This is talk 3.'})
    .addAnswer('tlk3ans1',{text:'Answer1'})
