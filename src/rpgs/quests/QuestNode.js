'use strict';
import CompoundNode from '../core/CompoundNode';
import QuestStatus from './QuestStatus';

let QuestNode = (function () {
  let _title = new WeakMap();
  let _description = new WeakMap();
  let _status = new WeakMap();

  return class QuestNode extends CompoundNode {
    constructor(data, rpgs) {
      super(data, rpgs);
      _title.set(this, data.title ? data.title : '');
      _description.set(this, data.description ? data.description : '');
      _status.set(this, data.status ? data.status : QuestStatus.INCOMPLETE);
    }

    getData() {
      let data = super.getData();
      data.title = this.getTitle();
      data.description = this.getDescription();
      data.status = this.getStatus();
      return data;
    }

    canAddChild(type) {
      return type === 'TaskNode';
    }

    setTitle(value) {
      _title.set(this, value);
    }

    getTitle() {
      return _title.get(this);
    }

    setDescription(value) {
      _description.set(this, value);
    }

    getDescription() {
      return _description.get(this);
    }

    setStatus(value) {
      switch (value) {
        case QuestStatus.COMPLETED:
        case QuestStatus.FAILED:
          _status.set(this, value);
          break;
        case QuestStatus.INCOMPLETE:
        default:
          _status.set(this, QuestStatus.INCOMPLETE);
          break;
      };
    }

    getStatus() {
      return _status.get(this);
    }

    dispose() {
      _title.delete(this);
      _description.delete(this);
      _status.delete(this);
      super.dispose();
    }
  };

})();
module.exports = QuestNode;
