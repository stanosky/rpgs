  "use strict";
(function ($, window, document, undefined) {
  const RPGObject = require('./RPGObject.js');
  const NPC = require('./NPC.js');
  $(function () {
    var obj1 = new RPGObject();
    var obj2 = new RPGObject();
    console.log(obj1.getId(),obj2.getId(),obj1.getId(),obj2.getId());

    var npc1 = new NPC();
    var npc2 = new NPC();
    npc1.setName('Adam');
    npc2.setName('Eva');
    console.log(npc1.toString(),npc2.toString());
    console.log(npc1 instanceof RPGObject);
  });

})(jQuery, window, document);
