"use strict";
const Utils = require('./core/Utils.js');
const RPGObject = require('./core/RPGObject.js');
const Actor = require('./actors/Actor.js');
const Quest = require('./quests/Quest.js');

let RPGS = (function () {
  let _quests = [],
      _actors = [],

  _addQuest = function(quest) {
    Utils.addObjectToArray(_quests,quest,Quest);
  },
  _getQuest = function(id) {
    return Utils.getObjectById(_quests,id);
  },
  _getQuests = function() {
    return _quests;
  },
  _addActor = function(actor) {
    Utils.addObjectToArray(_actors,actor,Actor);
  },
  _getActor = function(id) {
    return Utils.getObjectById(_actors,id);
  },
  _getActors = function() {
    return _actors;
  },
  _parseData = function(json) {
    //to do: should parse passed JSON
  },
  _serializeData = function() {
    //to do: should return data in JSON format
  };

  return {
    addQuest: _addQuest,
    getQuest: _getQuest,
    getQuests: _getQuests,
    addActor: _addActor,
    getActor: _getActor,
    getActors: _getActors,
    parseData: _parseData,
    serializData: _serializData
  };
})();

module.exports = RPGS;
