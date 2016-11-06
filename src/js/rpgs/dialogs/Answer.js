"use strict";
import BaseObject from '../core/BaseObject';

let Answer = (function() {
  //Weak maps are new feature to JavaScript. We can store private
  //object properties in key/value pairs using our instance as the key,
  //and our class can capture those key/value maps in a closure.
  let _text = new WeakMap();
  let _link = new WeakMap();

  return class Answer extends BaseObject {
    constructor(data) {
      super(data);
      _text.set(this,data.text||'');
      _link.set(this,data.link||'');
    }

    getData() {
      let data = super.getData();
      data.text = this.getText();
      data.link = this.getLink();
      return data;
    }

    setText(value) {
      _text.set(this,value);
    }

    getText() {
      return _text.get(this);
    }

    setLink(link) {
      _link.set(this,link);
    }

    getLink() {
      return _link.get(this);
    }

  };
})();
module.exports = Answer;
