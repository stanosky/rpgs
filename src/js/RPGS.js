"use strict";

let RPGS = (function () {
  let quests = [];
  let npcs = [];

  function indexOfObject(array,obj) {
    for (var i = 0; i < array.length; i++) {
      if(array[i] === obj) return i;
    }
    return -1;
  }

  function getObjectById(array,id) {
    for (var i = 0; i < array.length; i++) {
      if(array[i].getId() === id) return array[i];
    }
    return null;
  }

  function addObjectToArray(array,obj,expectedType) {
    if(typeof obj !== expectedType) {
      throw new Error('Wrong type of object passed. Expected '+expectedType+' object.');
    }
    if(indexOfObject(array,obj) === -1) {
      array.push(obj);
    }
  }

  return {
    addQuest: function(quest) {
      addObjectToArray(quests,quest,'Quest');
    },

    getQuest: function(id) {
      return getObjectById(quests,id);
    },

    getQuests: function() {
      return quests;
    },

    addNPC: function(npc) {
      addObjectToArray(npcs,npc,'NPC');
    },

    getNPC: function(id) {
      return getObjectById(npcs,id);
    },

    getNPCs: function() {
      return npcs;
    },

    parseData: function(json) {
      //to do: should parse passed JSON
    },

    serializData: function() {
      //to do: should return data in JSON format
    }
  }
})();

module.exports = RPGS;
