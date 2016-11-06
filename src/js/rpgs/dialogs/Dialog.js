"use strict";
import UniqueObject from '../core/UniqueObject';
import Utils from '../core/Utils';
import Talk from './Talk';

let Dialog = (function() {
  let _start = new WeakMap();
  let _talks = new WeakMap();

  let _parseTalks = function(data) {
    return data.length ? data.map((talkData) => new Talk(talkData)) : [];
  }

  return class Dialog extends UniqueObject {

    constructor(data) {
      super(data);
      _start.set(this,data.startTalk||'');
      _talks.set(this,_parseTalks(data.talks));
    }

    getData() {
      let data = super.getData();
      data.startTalk = this.getStartTalk();
      data.talks = this.getTalks().map((t) => t.getData());
      return data;
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
