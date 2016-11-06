"use strict";
import BaseObject from '../core/BaseObject';
import Answer from './Answer';

let Talk = (function() {

  let _text = new WeakMap();
  let _answers = new WeakMap();

  let _parseAnswers = function(data) {
    return data.length ? data.map((answerData) => new Answer(answerData)) : [];
  };

  return class Talk extends BaseObject {
    constructor(data) {
      super(data);
      _text.set(this,data.text||'');
      _answers.set(this,_parseAnswers(data.answers));
    }

    getData() {
      let data = super.getData();
      data.text = this.getText();
      data.answers = this.getAnswers().map((a) => a.getData());
      return data;
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
