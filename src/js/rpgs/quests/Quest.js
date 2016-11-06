"use strict";
import BaseObject from '../core/BaseObject';
import QuestStatus from './QuestStatus';
import Task from './Task';

let Quest = (function() {
  let _title = new WeakMap();
  let _description = new WeakMap();
  let _status = new WeakMap();
  let _tasks = new WeakMap();

  let _parseTasks = function(data) {
    return data.length ? data.map((taskData) => new Task(taskData)) : [];
  };

  return class Quest extends BaseObject {
    constructor(data) {
      super(data);
      _title.set(this,data.title||'');
      _description.set(this,data.description||'');
      _status.set(this,data.status||QuestStatus.INCOMPLETE);
      _tasks.set(this,_parseTasks(data.tasks));
    }

    getData() {
      let data = super.getData();
      data.title = this.getTitle();
      data.description = this.getDescription();
      data.status = this.getStatus();
      data.tasks = this.getTasks().map((t) => t.getData());
      return data;
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
