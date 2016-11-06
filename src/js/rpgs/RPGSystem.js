"use strict";
import Utils from './core/Utils';
import Actor from './actors/Actor';
import Quest from './quests/Quest';

let RPGSystem = function () {
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

  _parseData = function(data) {
    _actors = data.actors.length ? data.actors.map((a) => new Actor(a)) : [];
    _quests = data.quests.length ? data.quests.map((q) => new Quest(q)) : [];
  },

  _serializeData = function() {
    let data = {
      actors: _actors.map((a) => a.getData()),
      quests: _quests.map((q) => q.getData())
    };
    return JSON.stringify(data);
  };

  return {
    addQuest: _addQuest,
    getQuest: _getQuest,
    getQuests: _getQuests,
    addActor: _addActor,
    getActor: _getActor,
    getActors: _getActors,
    parseData: _parseData,
    serializeData: _serializeData
  };
};

module.exports = RPGSystem;
