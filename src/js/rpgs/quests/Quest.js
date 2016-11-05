"use strict";
import BaseObject from '../core/BaseObject';
import QuestStatus from './QuestStatus';
import Task from './Task';

let Quest = (function() {
  let _title new WeakMap();
  let _description = new WeakMap();
  let _status = new WeakMap();//QuestStatus.INCOMPLETE;
  let _tasks = new WeakMap();

  return class Quest extends BaseObject {
    constructor(id) {
      super(id);
      _title.set(this,'');
      _description.set(this,'');
      _status.set(this,QuestStatus.INCOMPLETE);
      _tasks.set(this,[]);
    }

    setTitle(value) {
      _title.set(this,value);
    }

    getTitle() {
      return _title.get(this);
    }

    setDescription(value) {
      _description.set(this,value);
    }

    getDescription() {
      return _description.get(this);
    }

    addTask(task) {
      _tasks.set(this,Utils.addObjectToArray(_tasks.get(this),task, Task));
    }

    getTask(taskId) {
      return Utils.getObjectById(_tasks.get(this),taskId);
    }

    getTasks() {
      return _tasks.get(this);
    }

    setStatus(value) {
      switch (value) {
        case QuestStatus.COMPLETED:
        case QuestStatus.FAILED:
          _status.set(this,value);
        case QuestStatus.INCOMPLETE:
        default:
          _status.set(this,QuestStatus.INCOMPLETE);
          break;
      };
    }

    getStatus() {
      return _status.get(this);
    }
  };

})();
module.exports = Quest;
