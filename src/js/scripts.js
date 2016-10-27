  "use strict";
(function ($, window, document, undefined) {
  const UniqueObj = require('./core/UniqueObj.js');
  const Actor = require('./actors/Actor.js');
  $(function () {
    var obj1 = new UniqueObj();
    var obj2 = new UniqueObj();
    console.log(obj1.getId(),obj2.getId(),obj1.getId(),obj2.getId());
    console.log("is obj1 instance of UniqueObj",obj1 instanceof UniqueObj);

    var npc1 = new Actor();
    var npc2 = new Actor();
    console.log("is npc1 instance of UniqueObj",npc1 instanceof UniqueObj);
    console.log("is npc1 instance of UniqueObj",npc1 instanceof Actor);
    npc1.setName('Adam');
    npc2.setName('Eva');

    console.log(npc1 === npc2);
  });

})(jQuery, window, document);
