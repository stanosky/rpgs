"use strict";
import BaseObject from '../core/BaseObject';

const TALK = 'talk';

let Answer = (function() {
  //Weak maps are new feature to JavaScript. We can store private
  //object properties in key/value pairs using our instance as the key,
  //and our class can capture those key/value maps in a closure.
  let _text = new WeakMap();
  let _talk = new WeakMap();

  return class Answer extends BaseObject {
    constructor(data) {
      super(data);
      _text.set(this,data ? data.text : '');
      _talk.set(this,data ? data.talk : '');
    }

    getData() {
      let data = super.getData();
      data.text = this.getText();
      return data;
    }

    getDependencies() {
      let dependencies = super.getDependencies();
      if(this.getTalk()) {
        dependencies[TALK] = this.getTalk().getId();
      }
      return dependencies;
    }

    setDependency(type,obj) {
      super.setDependency(type,obj);
      switch (type) {
        case TALK:
          this.setTalk(obj);
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

    setTalk(talk) {
      _talk.set(this,talk);
    }

    getTalk() {
      return _talk.get(this);
    }

  };
})();
module.exports = Answer;
