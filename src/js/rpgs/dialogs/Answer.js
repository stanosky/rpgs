"use strict";
import BaseObject from '../core/BaseObject';

let Answer = (function() {
  //Weak maps are new feature to JavaScript. We can store private
  //object properties in key/value pairs using our instance as the key,
  //and our class can capture those key/value maps in a closure.
  let _text = new WeakMap();
  let _link = new WeakMap();

  return class Answer extends BaseObject {
    constructor(id) {
      super(id);
      _text.set(this,'');
      _link.set(this,'');
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
