(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
  "actors":[
    {
      "uuid":"a001",
      "name":"Adam",
      "inventory":[],
      "dialog": {
        "uuid":"d001",
        "startTalk":"t001",
        "talks":[
          {
            "uuid":"t001",
            "text":"Talk 1",
            "answers":[
              {
                "uuid":"a001",
                "text":"Answer 1"
              },
              {
                "uuid":"a002",
                "text":"Answer 2"
              }
            ]
          },
          {
            "uuid":"t002",
            "text":"Talk 2",
            "answers":[
              {
                "uuid":"a003",
                "text":"Answer 1"
              },
              {
                "uuid":"a004",
                "text":"Answer 2"
              }
            ]
          },
          {
            "uuid":"t003",
            "text":"Talk 3",
            "answers":[
              {
                "uuid":"a005",
                "text":"Answer 1"
              },
              {
                "uuid":"a006",
                "text":"Answer 2"
              }
            ]
          }
        ]
      }
    },
    {
      "uuid":"a002",
      "name":"Eva",
      "inventory":[],
      "dialog":null
    },
    {
      "uuid":"a003",
      "name":"Player",
      "inventory":[],
      "dialog":null
    },
  ],
  "quests":{},
  "variables":{}
}

},{}],2:[function(require,module,exports){
"use strict";

var _Utils = require('./core/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

var _Actor = require('./actors/Actor');

var _Actor2 = _interopRequireDefault(_Actor);

var _Quest = require('./quests/Quest');

var _Quest2 = _interopRequireDefault(_Quest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RPGSystem = function RPGSystem() {
  var _quests = [],
      _actors = [],
      _addQuest = function _addQuest(quest) {
    _quests = _Utils2.default.addObjectToArray(_quests, quest, _Quest2.default);
  },
      _getQuest = function _getQuest(id) {
    return _Utils2.default.getObjectById(_quests, id);
  },
      _getQuests = function _getQuests() {
    return _quests;
  },
      _addActor = function _addActor(actor) {
    _actors = _Utils2.default.addObjectToArray(_actors, actor, _Actor2.default);
  },
      _getActor = function _getActor(id) {
    return _Utils2.default.getObjectById(_actors, id);
  },
      _getActors = function _getActors() {
    return _actors;
  },
      _parseData = function _parseData(data) {
    _actors = data.actors.length ? data.actors.map(function (a) {
      return new _Actor2.default(a);
    }) : [];
    _quests = data.quests.length ? data.quests.map(function (q) {
      return new _Quest2.default(q);
    }) : [];
  },
      _serializeData = function _serializeData() {
    var data = {
      actors: _actors.map(function (a) {
        return a.getData();
      }),
      quests: _quests.map(function (q) {
        return q.getData();
      })
    };
    return JSON.stringify(data);
  };

  return {
    addQuest: _addQuest,
    getQuest: _getQuest,
    getQuests: _getQuests,
    addActor: _addActor,
    getActor: _getActor,
    getActors: _getActors,
    parseData: _parseData,
    serializeData: _serializeData
  };
};

module.exports = RPGSystem;

},{"./actors/Actor":3,"./core/Utils":6,"./quests/Quest":10}],3:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _UniqueObject2 = require('../core/UniqueObject');

var _UniqueObject3 = _interopRequireDefault(_UniqueObject2);

var _Dialog = require('../dialogs/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Actor = function () {
  //Weak maps are new feature to JavaScript. We can store private
  //object properties in key/value pairs using our instance as the key,
  //and our class can capture those key/value maps in a closure.
  var _name = new WeakMap();
  var _dialog = new WeakMap();
  //let _inventory = new WeakMap();

  var _parseDialog = function _parseDialog(data) {
    return data ? new _Dialog2.default(data) : null;
  };

  return function (_UniqueObject) {
    _inherits(Actor, _UniqueObject);

    function Actor(data) {
      _classCallCheck(this, Actor);

      var _this = _possibleConstructorReturn(this, (Actor.__proto__ || Object.getPrototypeOf(Actor)).call(this, data));

      _name.set(_this, data.name || '');
      _dialog.set(_this, _parseDialog(data.dialog));
      //_inventory.set(this,data.inventory ? );
      return _this;
    }

    _createClass(Actor, [{
      key: 'getData',
      value: function getData() {
        var data = _get(Actor.prototype.__proto__ || Object.getPrototypeOf(Actor.prototype), 'getData', this).call(this);
        data.name = this.getName();
        data.dialog = this.getDialog() ? this.getDialog().getData() : null;
        return data;
      }
    }, {
      key: 'setName',
      value: function setName(value) {
        _name.set(this, value);
      }
    }, {
      key: 'getName',
      value: function getName() {
        return _name.get(this);
      }
    }, {
      key: 'setDialog',
      value: function setDialog(dialog) {
        _dialog.set(this, dialog);
      }
    }, {
      key: 'getDialog',
      value: function getDialog() {
        return _dialog.get(this);
      }

      /*setInventory(inventory) {
        _inventory.set(this,inventory);
      }
        getInventory() {
        return _inventory.get(this);
      }*/

    }]);

    return Actor;
  }(_UniqueObject3.default);
}();

module.exports = Actor;

},{"../core/UniqueObject":5,"../dialogs/Dialog":8}],4:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _UniqueObject2 = require('./UniqueObject');

var _UniqueObject3 = _interopRequireDefault(_UniqueObject2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseObject = function (id) {
  //Weak maps are new feature to JavaScript. We can store private
  //object properties in key/value pairs using our instance as the key,
  //and our class can capture those key/value maps in a closure.
  var _visible = new WeakMap();
  var _active = new WeakMap();

  return function (_UniqueObject) {
    _inherits(BaseObject, _UniqueObject);

    function BaseObject(data) {
      _classCallCheck(this, BaseObject);

      var _this = _possibleConstructorReturn(this, (BaseObject.__proto__ || Object.getPrototypeOf(BaseObject)).call(this, data));

      _visible.set(_this, data.visible || null);
      _active.set(_this, data.active || null);
      return _this;
    }

    _createClass(BaseObject, [{
      key: 'getData',
      value: function getData() {
        var data = _get(BaseObject.prototype.__proto__ || Object.getPrototypeOf(BaseObject.prototype), 'getData', this).call(this);
        data.visible = this.getVisibleCondition() ? this.getVisibleCondition().getData() : null;
        data.active = this.getActiveCondition() ? this.getActiveCondition().getData() : null;
        return data;
      }

      /**
       * Method sets condition that must be met in order to node was visible.
       * @param {Condition} condition Instance of Condition object
       */

    }, {
      key: 'setVisibleCondition',
      value: function setVisibleCondition(condition) {
        _visible.set(this, BaseObject.isConditionInstance(condition));
      }
    }, {
      key: 'getVisibleCondition',
      value: function getVisibleCondition() {
        return _visible.get(this);
      }

      /**
       * Returns boolean that reflects visiblility state of node.
       * @return {Boolean} Visibility state
       */

    }, {
      key: 'isVisible',
      value: function isVisible() {
        return BaseObject.checkCondition(_visible.get(this));
      }

      /**
       * Method sets condition that must be met in order to node was active.
       * @param {Condition} condition Instance of Condition object
       */

    }, {
      key: 'setActiveCondition',
      value: function setActiveCondition(condition) {
        _active.set(this, BaseObject.isConditionInstance(condition));
      }
    }, {
      key: 'getActiveCondition',
      value: function getActiveCondition() {
        return _active.get(this);
      }

      /**
       * Returns boolean that reflects activity state of node.
       * @return {Boolean} Active state
       */

    }, {
      key: 'isActive',
      value: function isActive() {
        return BaseObject.checkCondition(_active.get(this));
      }
    }], [{
      key: 'checkCondition',
      value: function checkCondition(condition) {
        if (condition === null) return true;
        return condition.check();
      }
    }, {
      key: 'isConditionInstance',
      value: function isConditionInstance(obj) {
        if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== Condition) {
          throw new Error('Wrong type of object passed. Expected "Condition" object.');
          return null;
        }
        return obj;
      }
    }]);

    return BaseObject;
  }(_UniqueObject3.default);
}();
module.exports = BaseObject;

},{"./UniqueObject":5}],5:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Utils = require("./Utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UniqueObject = function () {
  //Weak maps are new feature to JavaScript. We can store private
  //object properties in key/value pairs using our instance as the key,
  //and our class can capture those key/value maps in a closure.
  var _uuid = new WeakMap();

  return function () {
    function UniqueObject(data) {
      _classCallCheck(this, UniqueObject);

      //By default we assign Universally Unique ID
      _uuid.set(this, data.uuid || _Utils.UUID.generate());
    }

    _createClass(UniqueObject, [{
      key: "setId",
      value: function setId(value) {
        _uuid.set(this, value);
      }
    }, {
      key: "getId",
      value: function getId() {
        return _uuid.get(this);
      }
    }, {
      key: "getData",
      value: function getData() {
        return {
          uuid: this.getId()
        };
      }
    }]);

    return UniqueObject;
  }();
}();
module.exports = UniqueObject;

},{"./Utils":6}],6:[function(require,module,exports){
"use strict";

/**
 * Fast UUID generator, RFC4122 version 4 compliant.
 * @author Jeff Ward (jcward.com).
 * @license MIT license
 * @link http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
 **/

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var UUID = function () {
  var self = {};
  var lut = [];for (var i = 0; i < 256; i++) {
    lut[i] = (i < 16 ? '0' : '') + i.toString(16);
  }
  self.generate = function () {
    var d0 = Math.random() * 0xffffffff | 0;
    var d1 = Math.random() * 0xffffffff | 0;
    var d2 = Math.random() * 0xffffffff | 0;
    var d3 = Math.random() * 0xffffffff | 0;
    return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' + lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' + lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] + lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
  };
  return self;
}();

exports.UUID = UUID;

var indexOfObject = function indexOfObject(array, obj) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === obj) return i;
  }
  return -1;
};

exports.indexOfObject = indexOfObject;

exports.getObjectById = function (array, id) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].getId() === id) return array[i];
  }
  return null;
};

var getIndexById = function getIndexById(array, id) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].getId() === id) return i;
  }
  return -1;
};
exports.getIndexById = getIndexById;

exports.addObjectToArray = function (array, obj, expectedType) {
  if (expectedType !== undefined && expectedType !== null) {
    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== expectedType) {
      throw new Error('Wrong type of object passed. Expected ' + expectedType.toString() + ' object.');
    }
  }
  if (indexOfObject(array, obj) === -1) {
    array.push(obj);
  }
  return array;
};

exports.removeObjectById = function (array, id) {
  var index = getIndexById(array, id);
  if (index !== -1) {
    array.splice(index, 1);
  }
};

exports.removeObjectFromArray = function (array, obj) {
  var index = indexOfObject(array, obj);
  if (index !== -1) {
    array.splice(index, 1);
  }
};

},{}],7:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseObject2 = require('../core/BaseObject');

var _BaseObject3 = _interopRequireDefault(_BaseObject2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Answer = function () {
  //Weak maps are new feature to JavaScript. We can store private
  //object properties in key/value pairs using our instance as the key,
  //and our class can capture those key/value maps in a closure.
  var _text = new WeakMap();
  var _link = new WeakMap();

  return function (_BaseObject) {
    _inherits(Answer, _BaseObject);

    function Answer(data) {
      _classCallCheck(this, Answer);

      var _this = _possibleConstructorReturn(this, (Answer.__proto__ || Object.getPrototypeOf(Answer)).call(this, data));

      _text.set(_this, data.text || '');
      _link.set(_this, data.link || '');
      return _this;
    }

    _createClass(Answer, [{
      key: 'getData',
      value: function getData() {
        var data = _get(Answer.prototype.__proto__ || Object.getPrototypeOf(Answer.prototype), 'getData', this).call(this);
        data.text = this.getText();
        data.link = this.getLink();
        return data;
      }
    }, {
      key: 'setText',
      value: function setText(value) {
        _text.set(this, value);
      }
    }, {
      key: 'getText',
      value: function getText() {
        return _text.get(this);
      }
    }, {
      key: 'setLink',
      value: function setLink(link) {
        _link.set(this, link);
      }
    }, {
      key: 'getLink',
      value: function getLink() {
        return _link.get(this);
      }
    }]);

    return Answer;
  }(_BaseObject3.default);
}();
module.exports = Answer;

},{"../core/BaseObject":4}],8:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _UniqueObject2 = require('../core/UniqueObject');

var _UniqueObject3 = _interopRequireDefault(_UniqueObject2);

var _Utils = require('../core/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

var _Talk = require('./Talk');

var _Talk2 = _interopRequireDefault(_Talk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dialog = function () {
  var _start = new WeakMap();
  var _talks = new WeakMap();

  var _parseTalks = function _parseTalks(data) {
    return data.length ? data.map(function (talkData) {
      return new _Talk2.default(talkData);
    }) : [];
  };

  return function (_UniqueObject) {
    _inherits(Dialog, _UniqueObject);

    function Dialog(data) {
      _classCallCheck(this, Dialog);

      var _this = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this, data));

      _start.set(_this, data.startTalk || '');
      _talks.set(_this, _parseTalks(data.talks));
      return _this;
    }

    _createClass(Dialog, [{
      key: 'getData',
      value: function getData() {
        var data = _get(Dialog.prototype.__proto__ || Object.getPrototypeOf(Dialog.prototype), 'getData', this).call(this);
        data.startTalk = this.getStartTalk();
        data.talks = this.getTalks().map(function (t) {
          return t.getData();
        });
        return data;
      }
    }, {
      key: 'addTalk',
      value: function addTalk(talk) {
        _talks.set(this, _Utils2.default.addObjectToArray(_talks.get(this), talk, _Talk2.default));
      }
    }, {
      key: 'removeTalk',
      value: function removeTalk(talkId) {
        _Utils2.default.removeObjectById(_talks.get(this), talkId);
      }
    }, {
      key: 'getTalk',
      value: function getTalk(talkId) {
        return _Utils2.default.getObjectById(_talks, talkId);
      }
    }, {
      key: 'getTalks',
      value: function getTalks() {
        return _talks.get(this);
      }
    }, {
      key: 'setStartTalk',
      value: function setStartTalk(talkId) {
        _start.set(this, talkId);
      }
    }, {
      key: 'getStartTalk',
      value: function getStartTalk() {
        return _start.get(this);
      }
    }]);

    return Dialog;
  }(_UniqueObject3.default);
}();
module.exports = Dialog;

},{"../core/UniqueObject":5,"../core/Utils":6,"./Talk":9}],9:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseObject2 = require('../core/BaseObject');

var _BaseObject3 = _interopRequireDefault(_BaseObject2);

var _Answer = require('./Answer');

var _Answer2 = _interopRequireDefault(_Answer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Talk = function () {

  var _text = new WeakMap();
  var _answers = new WeakMap();

  var _parseAnswers = function _parseAnswers(data) {
    return data.length ? data.map(function (answerData) {
      return new _Answer2.default(answerData);
    }) : [];
  };

  return function (_BaseObject) {
    _inherits(Talk, _BaseObject);

    function Talk(data) {
      _classCallCheck(this, Talk);

      var _this = _possibleConstructorReturn(this, (Talk.__proto__ || Object.getPrototypeOf(Talk)).call(this, data));

      _text.set(_this, data.text || '');
      _answers.set(_this, _parseAnswers(data.answers));
      return _this;
    }

    _createClass(Talk, [{
      key: 'getData',
      value: function getData() {
        var data = _get(Talk.prototype.__proto__ || Object.getPrototypeOf(Talk.prototype), 'getData', this).call(this);
        data.text = this.getText();
        data.answers = this.getAnswers().map(function (a) {
          return a.getData();
        });
        return data;
      }
    }, {
      key: 'setText',
      value: function setText(value) {
        _text.set(this, value);
      }
    }, {
      key: 'getText',
      value: function getText() {
        return _text.get(this);
      }
    }, {
      key: 'addAnswer',
      value: function addAnswer(answer) {
        _answers.set(this, Utils.addObjectToArray(_answers.get(this), answer, _Answer2.default));
      }
    }, {
      key: 'removeAnswer',
      value: function removeAnswer(answerId) {
        Utils.removeObjectById(_answers.get(this), answerId);
      }
    }, {
      key: 'getAnswer',
      value: function getAnswer(answerId) {
        return Utils.getObjectById(_answers.get(this), answerId);
      }
    }, {
      key: 'getAnswers',
      value: function getAnswers() {
        return _answers.get(this);
      }
    }]);

    return Talk;
  }(_BaseObject3.default);
}();
module.exports = Talk;

},{"../core/BaseObject":4,"./Answer":7}],10:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseObject2 = require('../core/BaseObject');

var _BaseObject3 = _interopRequireDefault(_BaseObject2);

var _QuestStatus = require('./QuestStatus');

var _QuestStatus2 = _interopRequireDefault(_QuestStatus);

var _Task = require('./Task');

var _Task2 = _interopRequireDefault(_Task);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Quest = function () {
  var _title = new WeakMap();
  var _description = new WeakMap();
  var _status = new WeakMap();
  var _tasks = new WeakMap();

  var _parseTasks = function _parseTasks(data) {
    return data.length ? data.map(function (taskData) {
      return new _Task2.default(taskData);
    }) : [];
  };

  return function (_BaseObject) {
    _inherits(Quest, _BaseObject);

    function Quest(data) {
      _classCallCheck(this, Quest);

      var _this = _possibleConstructorReturn(this, (Quest.__proto__ || Object.getPrototypeOf(Quest)).call(this, data));

      _title.set(_this, data.title || '');
      _description.set(_this, data.description || '');
      _status.set(_this, data.status || _QuestStatus2.default.INCOMPLETE);
      _tasks.set(_this, _parseTasks(data.tasks));
      return _this;
    }

    _createClass(Quest, [{
      key: 'getData',
      value: function getData() {
        var data = _get(Quest.prototype.__proto__ || Object.getPrototypeOf(Quest.prototype), 'getData', this).call(this);
        data.title = this.getTitle();
        data.description = this.getDescription();
        data.status = this.getStatus();
        data.tasks = this.getTasks().map(function (t) {
          return t.getData();
        });
        return data;
      }
    }, {
      key: 'setTitle',
      value: function setTitle(value) {
        _title.set(this, value);
      }
    }, {
      key: 'getTitle',
      value: function getTitle() {
        return _title.get(this);
      }
    }, {
      key: 'setDescription',
      value: function setDescription(value) {
        _description.set(this, value);
      }
    }, {
      key: 'getDescription',
      value: function getDescription() {
        return _description.get(this);
      }
    }, {
      key: 'addTask',
      value: function addTask(task) {
        _tasks.set(this, Utils.addObjectToArray(_tasks.get(this), task, _Task2.default));
      }
    }, {
      key: 'getTask',
      value: function getTask(taskId) {
        return Utils.getObjectById(_tasks.get(this), taskId);
      }
    }, {
      key: 'getTasks',
      value: function getTasks() {
        return _tasks.get(this);
      }
    }, {
      key: 'setStatus',
      value: function setStatus(value) {
        switch (value) {
          case _QuestStatus2.default.COMPLETED:
          case _QuestStatus2.default.FAILED:
            _status.set(this, value);
          case _QuestStatus2.default.INCOMPLETE:
          default:
            _status.set(this, _QuestStatus2.default.INCOMPLETE);
            break;
        };
      }
    }, {
      key: 'getStatus',
      value: function getStatus() {
        return _status.get(this);
      }
    }]);

    return Quest;
  }(_BaseObject3.default);
}();
module.exports = Quest;

},{"../core/BaseObject":4,"./QuestStatus":11,"./Task":12}],11:[function(require,module,exports){
"use strict";

var INCOMPLETE = 'questIncomplete';
var COMPLETED = 'questCompleted';
var FAILED = 'questFailed';

exports.INCOMPLETE = INCOMPLETE;
exports.COMPLETED = COMPLETED;
exports.FAILED = FAILED;

},{}],12:[function(require,module,exports){
"use strict";

var _BaseObject2 = require("../core/BaseObject");

var _BaseObject3 = _interopRequireDefault(_BaseObject2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Task = function () {
  return function (_BaseObject) {
    _inherits(Task, _BaseObject);

    function Task(data) {
      _classCallCheck(this, Task);

      return _possibleConstructorReturn(this, (Task.__proto__ || Object.getPrototypeOf(Task)).call(this, data));
    }

    //to do


    return Task;
  }(_BaseObject3.default);
}();

module.exports = Task;

},{"../core/BaseObject":4}],13:[function(require,module,exports){
"use strict";

var _RPGSystem = require('./rpgs/RPGSystem');

var _RPGSystem2 = _interopRequireDefault(_RPGSystem);

var _data = require('../data/data.json');

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function ($, window, document, undefined) {
  $(function () {
    var rpg = new _RPGSystem2.default();
    //console.log(data);
    rpg.parseData(_data2.default);
    console.log('data', rpg.serializeData());
  });
})(jQuery, window, document);

},{"../data/data.json":1,"./rpgs/RPGSystem":2}]},{},[13])

