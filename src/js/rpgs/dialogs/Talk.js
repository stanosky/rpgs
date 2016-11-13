"use strict";
import Utils from '../core/Utils';
import BaseObject from '../core/BaseObject';
import Answer from './Answer';

const ANSWER = 'answer';

let Talk = (function() {

  let _text = new WeakMap();
  let _answers = new WeakMap();

  return class Talk extends BaseObject {
    constructor(data) {
      super(data);
      _text.set(this,data ? data.text : '');
      _answers.set(this,[]);
    }

    getData() {
      let data = super.getData();
      data.text = this.getText();
      return data;
    }

    getDependencies() {
      let dependencies = super.getDependencies();
      if(this.getAnswers()) {
        dependencies[ANSWER] = this.getAnswers().map((a) => a.getId());
      }
      return dependencies;
    }

    setDependency(type,obj) {
      super.setDependency(type,obj);
      switch (type) {
        case ANSWER:
          this.addAnswer(obj);
          break;
        default:
          break;
      };
    }

    setText(value) {
      _text.set(this,value);
    }

    getText() {
      return _text.get(this);
    }

    addAnswer(answer) {
      _answers.set(this,Utils.addObjectToArray(_answers.get(this),answer, Answer));
    }

    removeAnswer(answerId) {
      Utils.removeObjectById(_answers.get(this),answerId);
    }

    getAnswer(answerId) {
      return Utils.getObjectById(_answers.get(this),answerId);
    }

    getAnswers() {
      return _answers.get(this);
    }
  };
})();
module.exports = Talk;
