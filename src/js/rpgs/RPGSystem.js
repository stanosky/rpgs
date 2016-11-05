"use strict";
import Utils from './core/Utils';
import RPGObject from './core/RPGObject';
import Actor from './actors/Actor';
import Quest from './quests/Quest';

let RPGSystem = (function () {
  let _quests = [],
      _actors = [],

  _addQuest = function(quest) {
    _quests = Utils.addObjectToArray(_quests,quest,Quest);
  },

  _getQuest = function(id) {
    return Utils.getObjectById(_quests,id);
  },

  _getQuests = function() {
    return _quests;
  },

  _addActor = function(actor) {
    _actors = Utils.addObjectToArray(_actors,actor,Actor);
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

module.exports = RPGSystem;
