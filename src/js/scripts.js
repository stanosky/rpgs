"use strict";
import Utils from './rpgs/core/Utils';
import UniqueObject from './rpgs/core/UniqueObject';
import BaseObject from './rpgs/core/BaseObject';
import Actor from './rpgs/actors/Actor';

(function ($, window, document, undefined) {
  $(function () {
      let uniqueObject = new UniqueObject();
      console.log('uniqueObject.getId()',uniqueObject.getId());

      let baseObject = new BaseObject();
      console.log('baseObject.isVisible()',baseObject.isVisible());
      console.log('baseObject.isActive()',baseObject.isActive());
      console.log('baseObject.getId()',baseObject.getId());

      let actor = new Actor();
      console.log('actor.getId()',actor.getId());
      actor.setName('Adam');
      console.log('actor.getName()',actor.getName());

      let myWeakMap = new WeakMap().set(this,['a']);
      console.log('weakmap test1:',myWeakMap.get(this));
      myWeakMap.set(this,Utils.addObjectToArray(myWeakMap.get(this),'b'));
      console.log('weakmap test2:',myWeakMap.get(this));

  });

})(jQuery, window, document);
