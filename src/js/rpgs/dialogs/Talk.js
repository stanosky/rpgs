"use strict";
import BaseObject from '../core/BaseObject';
import Answer from './Answer';

let Talk = (function() {

  let _text = new WeakMap();
  let _answers = new WeakMap();

  return class Talk extends BaseObject {
    constructor(id) {
      super(id);
      _text.set(this,'');
      _answers.set(this, []);
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
