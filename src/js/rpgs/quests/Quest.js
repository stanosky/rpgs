"use strict";
import BaseObject   from '../core/BaseObject';
import QuestStatus  from './QuestStatus';
import Task         from './Task';

const KEY_TASKS = 'tasks'

let Quest = (function() {
  let _title = new WeakMap();
  let _description = new WeakMap();
  let _status = new WeakMap();
  let _tasks = new WeakMap();

  return class Quest extends BaseObject {
    constructor(data,rpgs) {
      super(data,rpgs);
      _title.set(this,data ? data.title : '');
      _description.set(this,data ? data.description : '');
      _status.set(this,data ? data.status : QuestStatus.INCOMPLETE);
      _tasks.set(this,data ? data.tasks.map((params) => {
        let task = new Task(params,rpgs);
        rpgs.setObjectByKey(KEY_TASKS,task);
        return task.getId();
      }):[]);
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
      this.getRPGS().setObject(KEY_TASKS,task);
      _tasks.set(this,task.getId());
    }

    removeTask(taskId) {
      this.getRPGS().removeObject(KEY_TASKS,taskId);
      _tasks.set(this,Utils.removeObjectFromArray(_tasks.get(this),taskId));
    }

    getTask(taskId) {
      return this.getRPGS().getObjectByKey(KEY_TASKS,taskId);
    }

    getTasks() {
      return _tasks.get(this).map((a) => {
        this.getRPGS().getObjectByKey(KEY_TASKS,a.getId())
      });
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

    dispose() {
      this.removeChildrenFrom(_tasks.get(this),KEY_TASKS);
      _title.delete(this);
      _description.delete(this);
      _status.delete(this);
      _tasks.delete(this);
    }
  };

})();
module.exports = Quest;
