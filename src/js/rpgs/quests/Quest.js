"use strict";
import BaseObject from '../core/BaseObject';
import QuestStatus from './QuestStatus';
import Task from './Task';

const TASK = 'task';

let Quest = (function() {
  let _title = new WeakMap();
  let _description = new WeakMap();
  let _status = new WeakMap();
  let _tasks = new WeakMap();

  return class Quest extends BaseObject {
    constructor(data) {
      super(data);
      _title.set(this,data ? data.title : '');
      _description.set(this,data ? data.description : '');
      _status.set(this,data ? data.status : QuestStatus.INCOMPLETE);
      _tasks.set(this,[]);
    }

    getData() {
      let data = super.getData();
      data.title = this.getTitle();
      data.description = this.getDescription();
      data.status = this.getStatus();
      return data;
    }

    getDependencies() {
      let dependencies = super.getDependencies();
      if(this.getTasks()) {
        dependencies[TASK] = this.getTasks().map((t) => t.getId());
      }
      return dependencies;
    }

    setDependency(type,obj) {
      super.setDependency(type,obj);
      switch (type) {
        case TASK:
          this.setTask(obj);
          break;
        default:
          break;
      };
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
