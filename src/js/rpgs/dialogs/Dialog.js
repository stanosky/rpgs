"use strict";
import UniqueObject from '../core/UniqueObject';
import Utils from '../core/Utils';
import Talk from './Talk';

const TALK = 'talk';

let Dialog = (function() {
  let _start = new WeakMap();
  let _talks = new WeakMap();

  return class Dialog extends UniqueObject {

    constructor(data) {
      super(data);
      _start.set(this,data ? data.startTalk : '');
      _talks.set(this,[]);
    }

    getData() {
      let data = super.getData();
      data.startTalk = this.getStartTalk();
      return data;
    }

    getDependencies() {
      let dependencies = {};
      if(this.getTalks()) {
        dependencies[TALK] = this.getTalks().map((t) => t.getId());
      }
      return dependencies;
    }

    setDependency(type,obj) {
      switch (type) {
        case TALK:
          this.addTalk(obj);
          break;
        default:
          break;
      };
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
