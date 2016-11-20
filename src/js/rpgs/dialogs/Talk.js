"use strict";
import Utils      from '../core/Utils';
import BaseObject from '../core/BaseObject';
import LinkType   from '../core/LinkType';
import Answer     from './Answer';

const KEY_ANSWERS = 'answers';

let Talk = (function() {

  let _text = new WeakMap();
  let _answers = new WeakMap();

  return class Talk extends BaseObject {
    constructor(data,rpgs) {
      super(data,rpgs);
      _text.set(this,data ? data.text : '');
      /*_answers.set(this,data ? data.answers.map((params) => {
        let answer = new Answer(params,rpgs);
        rpgs.setObject(KEY_ANSWERS,answer);
        return answer.getId();
      }):[]);*/
      _answers.set(this,data ? data.answers : []);
    }

    getData() {
      let data = super.getData();
      data.text = this.getText();
      data.answers = this.getAnswers();
      return data;
    }

    setText(value) {
      _text.set(this,value);
    }

    getText() {
      return _text.get(this);
    }

    addAnswer(answer) {
      this.getRPGS().setObject(KEY_ANSWERS,answer);
      _answers.set(this,answer.getId());
    }

    removeAnswer(answerId) {
      this.getRPGS().removeObject(KEY_ANSWERS,answerId);
      _answers.set(this,Utils.removeObjectFromArray(_answers.get(this),answerId));
    }

    getAnswer(answerId) {
      return this.getRPGS().getObjectByKey(KEY_ANSWERS,answerId);
    }

    getAnswers() {
      return _answers.get(this);/*.map((a) => {
        this.getRPGS().getObjectByKey(KEY_ANSWERS,a.getId())
      });*/
    }

    canCreateInputConnection(type) {
      switch (type) {
        case LinkType.GOTO:
          return true;
        default: return false;
      }
    }

    setOutputConnection(type,linkId) {}
    getOutputConnections(type) {}
    removeOutputConnection(type,linkId) {}

    dispose() {
      this.removeChildrenFrom(_answers.get(this),KEY_ANSWERS);
      _text.delete(this);
      _answers.delete(this);
      super.dispose();
    }
  };
})();
module.exports = Talk;
