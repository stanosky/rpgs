"use strict";

let rpgs = new RPGSystem();

rpgs
.addActor('act1',{name:'Adam'}).inp('dialog','dlg1')
.addCondition('cond1',{code:`return true;`}).out('visibility','tlk0ans1')
.addDialog('dlg1',{startTalk:'tlk0'}).out('dialog','act1')
  .addTalk('tlk0',{text:'This is talk 0.'})
    .addAnswer('tlk0ans1',{text:'Answer1'}).out('goto','tlk1').inp('visibility','cond1')
    .addAnswer('tlk0ans2',{text:'Answer2'}).out('goto','tlk2')
    .addAnswer('tlk0ans3',{text:'Answer3'}).out('goto','tlk3')

  .addTalk('tlk1',{text:'This is talk 1.'}).inp('goto','tlk0ans1')
    .addAnswer('tlk1ans1',{text:'Answer1'})

  .addTalk('tlk2',{text:'This is talk 2.'}).inp('goto','tlk0ans2')
    .addAnswer('tlk2ans1',{text:'Answer1'})

  .addTalk('tlk3',{text:'This is talk 3.'}).inp('goto','tlk0ans3')
    .addAnswer('tlk3ans1',{text:'Answer1'})


//_parentHistory = [talk2,dialog1]
//_lastChild = answer3
_parentHistory = [dialog1]
_lastChild = talk2
