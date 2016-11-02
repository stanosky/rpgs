  "use strict";
(function ($, window, document, undefined) {
  const BaseObject = require('./core/BaseObject.js');
  const Actor = require('./actors/Actor.js');
  $(function () {
    var obj1 = new BaseObject();
    var obj2 = new BaseObject();
    console.log(obj1.getId(),obj2.getId(),obj1.getId(),obj2.getId());
    console.log("is obj1 instance of BaseObject",obj1 instanceof BaseObject);

    var npc1 = new Actor();
    var npc2 = new Actor();
    console.log("is npc1 instance of BaseObject",npc1 instanceof BaseObject);
    console.log("is npc1 instance of BaseObject",npc1 instanceof Actor);
    npc1.setName('Adam');
    npc2.setName('Eva');

    console.log(npc1 === npc2);
  });

})(jQuery, window, document);
