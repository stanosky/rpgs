"use strict";
const QuestStatus = require('./QuestStatus.js');

let Quest = function() {
  this._title = '';
  this._description = '';
  this._status = QuestStatus.INCOMPLETE;
  this._tasks = [];
};

Quest.prototype = (function(){
  let _setTitle = function(value) {
    this._title = value;
  },
  _getTitle = function() {
    return this._title;
  },
  _setDescription = function(value) {
    this._description = value;
  },
  _getDescription = function() {
    return this._description;
  },
  _addTask = function(task) {
    //to do:
  },
  _getTask = function() {
    //to do:
  },
  _getTasks = function() {
    return this._tasks;
  },
  _setStatus = function(value) {
    switch (value) {
      case QuestStatus.COMPLETED:
      case QuestStatus.FAILED:
        this._status = value;
      case QuestStatus.INCOMPLETE:
      default:
        this._status = QuestStatus.INCOMPLETE;
        break;
    };
  },
  _getStatus = function() {
    return this._status;
  };

  return {
    setTitle: _setTitle,
    getTitle: _getTitle,
    setDescription: _setDescription,
    getDescription: _getDescription,
    addTask: _addTask,
    getTask: _getTask,
    getTasks: _getTasks,
    setStatus: _setStatus,
    getStatus: _getStatus
  };
})();
