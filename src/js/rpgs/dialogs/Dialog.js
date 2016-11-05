"use strict";
import BaseObject from '../core/BaseObject';
import Utils from '../core/Utils';
import Talk from './Talk';

let Dialog = (function() {
  let _start = new WeakMap();
  let _talks = new WeakMap();

  return class Dialog extends BaseObject {

    constructor(id) {
      super(id);
      _start.set(this,'');
      _talks.set(this,[]);
    }

    addTalk(talk) {
      _talks.set(this,Utils.addObjectToArray(_talks.get(this),talk, Talk));
    }

    removeTalk(talkId) {
      Utils.removeObjectById(_talks.get(this),talkId);
    }

    getTalk(talkId) {
      return Utils.getObjectById(_talks,talkId);
    }

    getTalks() {
      return _talks.get(this);
    }

    setStartTalk(talkId) {
      _start.set(this,talkId);
    }

    getStartTalk() {
      return _start.get(this);
    }
  }

})();
module.exports = Dialog;
