"use strict";
import BaseObject from '../core/BaseObject';
import LinkType   from '../core/LinkType';
import Utils      from '../core/Utils';
import Talk       from './Talk';

const KEY_TALKS = 'talks';

let Dialog = (function() {
  let _start = new WeakMap();
  let _talks = new WeakMap();

  return class Dialog extends BaseObject {

    constructor(data,rpgs) {
      super(data,rpgs);
      _start.set(this,data ? data.startTalk : '');
      /*_talks.set(this,data ? data.talks.map((params) => {
        let talk = new Talk(params,rpgs);
        rpgs.addNode(KEY_TALKS,talk);
        return talk.getId();
      }):[]);*/
      _talks.set(this,data ? data.talks : []);
    }

    getData() {
      let data = super.getData();
      data.startTalk = this.getStartTalk();
      data.talks = this.getTalks();
      return data;
    }

    addTalk(talk) {
      this.getRPGS().addNode(KEY_TALKS,talk);
      _talks.set(this,talk.getId());
    }

    removeTalk(talkId) {
      this.getRPGS().removeNode(KEY_TALKS,talkId);
      _talks.set(this,Utils.removeObjectFromArray(_talks.get(this),talkId));
    }

    getTalk(talkId) {
      return this.getRPGS().getNode(KEY_TALKS,talkId);
    }

    getTalks() {
      return _talks.get(this);/*.map((t) => {
        return this.getRPGS().getNode(KEY_TALKS,t);
      });*/
    }

    setStartTalk(talkId) {
      _start.set(this,talkId);
    }

    getStartTalk() {
      return _start.get(this);
    }

    canCreateInputConnection(type) {
      switch (type) {
        case LinkType.VISIBILITY:
          return this.getInputConnections(LinkType.VISIBILITY).length === 0;
        case LinkType.ACTIVITY:
          return this.getInputConnections(LinkType.ACTIVITY).length === 0;
        default: return false;
      }
    }

    canCreateOutputConnection(type) {
      switch (type) {
        case LinkType.DIALOG:
          return true;
        default: return false;
      }
    }

    dispose() {
      this.removeChildrenFrom(_talks.get(this),KEY_TALKS);
      _start.delete(this);
      _talks.delete(this);
      super.dispose();
    }
  }

})();
module.exports = Dialog;
