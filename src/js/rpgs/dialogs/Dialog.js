"use strict";
const Utils = require('../core/Utils.js');
const Talk = require('./Talk.js');

let Dialog = function() {
  let _start = '';
  let _talks = [];

  let _addTalk = function(talk) {
    Utils.addObjectToArray(_talks,talk, Talk);
  };

  let _removeTalk = function(talkId) {
    Utils.removeObjectFromArray(_talks,talk);
  };

  let _getTalk = function(talkId) {
    return Utils.getObjectById(_talks,talkId);
  };

  let _getTalks = function() {
    return _talks;
  };

  let _setStartTalk = function(talkId) {
    _start = talkId;
  };

  let _getStartTalk = function() {
    return _start
  };

  return {
    addTalk:      _addTalk,
    removeTalk:   _removeTalk,
    getTalk:      _getTalk,
    getTalks:     _getTalks,
    setStartTalk: _setStartTalk,
    getStartTalk: _getStartTalk
  }
};
module.exports = Dialog;
