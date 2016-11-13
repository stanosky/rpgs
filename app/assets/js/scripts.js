(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'

module.exports = {
  compileCode,
  compileExpression
}

function compileExpression (src, sandbox) {
  if (typeof src !== 'string') {
    throw new TypeError('first argument must be a string')
  }
  if (typeof sandbox !== 'object') {
    throw new TypeError('second argument must be an object')
  }

  sandbox = new Proxy(sandbox, {get, has})
  const expression = `
  try { with (sandbox) { return ${src} } } catch (err) {
    if (!(err instanceof ReferenceError || err instanceof TypeError)) throw err
  }`
  return new Function('sandbox', expression).bind(sandbox, sandbox) // eslint-disable-line
}

function compileCode (src, sandbox) {
  if (typeof src !== 'string') {
    throw new TypeError('first argument must be a string')
  }
  if (typeof sandbox !== 'object') {
    throw new TypeError('second argument must be an object')
  }

  sandbox = new Proxy(sandbox, {get, has})
  return new Function('sandbox', `with (sandbox) { ${src} }`).bind(sandbox, sandbox) // eslint-disable-line
}

function get (target, key, receiver) {
  if (key === Symbol.unscopables) {
    return undefined
  }
  return Reflect.get(target, key, receiver)
}

function has (target, key) {
  return true
}

},{}],2:[function(require,module,exports){
module.exports={
  "objects":[
    {
      "class":"Actor",
      "uuid":"a1",
      "name":"Adam"
    },
    {
      "class":"Actor",
      "uuid":"a2",
      "name":"Eva"
    },
    {
      "class":"Dialog",
      "uuid":"d1",
      "startTalk":"t1"
    },
    {
      "class":"Dialog",
      "uuid":"d2",
      "startTalk":"t4"
    },
    {
      "class":"Talk",
      "uuid":"t1",
      "text":"Talk 1"
    },
    {
      "class":"Talk",
      "uuid":"t2",
      "text":"Talk 2"
    },
    {
      "class":"Talk",
      "uuid":"t3",
      "text":"Talk 3"
    },
    {
      "class":"Talk",
      "uuid":"t4",
      "text":"Talk 4"
    },
    {
      "class":"Talk",
      "uuid":"t5",
      "text":"Talk 5"
    },
    {
      "class":"Talk",
      "uuid":"t6",
      "text":"Talk 6"
    },
    {
      "class":"Answer",
      "uuid":"a1",
      "text":"Answer 1"
    },
    {
      "class":"Answer",
      "uuid":"a2",
      "text":"Answer 2"
    },
    {
      "class":"Answer",
      "uuid":"a3",
      "text":"Answer 3"
    },
    {
      "class":"Answer",
      "uuid":"a4",
      "text":"Answer 4"
    },
    {
      "class":"Answer",
      "uuid":"a5",
      "text":"Answer 5"
    },
    {
      "class":"Answer",
      "uuid":"a6",
      "text":"Answer 6"
    }
  ],
  "dependencies":[
    {
      "dependent":"a1",
      "dependencies": {
        "dialog": "d1"
      }
    },
    {
      "dependent":"a2",
      "dependencies": {
        "dialog": "d2"
      }
    },
    {
      "dependent":"d1",
      "dependencies": {
        "talk":["t1","t2","t3"]
      }
    },
    {
      "dependent":"d2",
      "dependencies": {
        "talk":["t4","t5","t6"]
      }
    },
    {
      "dependent":"t1",
      "dependencies": {
        "answer": ["a1"]
      }
    },
    {
      "dependent":"t2",
      "dependencies": {
        "answer": ["a2"]
      }
    },
    {
      "dependent":"t3",
      "dependencies": {
        "answer": ["a3"]
      }
    },
    {
      "dependent":"t4",
      "dependencies": {
        "answer": ["a4"]
      }
    },
    {
      "dependent":"t5",
      "dependencies": {
        "answer": ["a5"]
      }
    },
    {
      "dependent":"t6",
      "dependencies": {
        "answer": ["a6"]
      }
    },
    {
      "dependent":"a1",
      "dependencies": {
        "talk":"t2"
      }
    },
    {
      "dependent":"a2",
      "dependencies": {
        "talk":"t3"
      }
    },
    {
      "dependent":"a4",
      "dependencies": {
        "talk":"t4"
      }
    },
    {
      "dependent":"a5",
      "dependencies": {
        "talk":"t5"
      }
    }
  ]
}

},{}],3:[function(require,module,exports){
"use strict";

var _Utils = require('./core/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

var _UniqueObject = require('./core/UniqueObject');

var _UniqueObject2 = _interopRequireDefault(_UniqueObject);

var _BaseObject = require('./core/BaseObject');

var _BaseObject2 = _interopRequireDefault(_BaseObject);

var _Actor = require('./actors/Actor');

var _Actor2 = _interopRequireDefault(_Actor);

var _Condition = require('./conditions/Condition');

var _Condition2 = _interopRequireDefault(_Condition);

var _Answer = require('./dialogs/Answer');

var _Answer2 = _interopRequireDefault(_Answer);

var _Dialog = require('./dialogs/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _Talk = require('./dialogs/Talk');

var _Talk2 = _interopRequireDefault(_Talk);

var _Quest = require('./quests/Quest');

var _Quest2 = _interopRequireDefault(_Quest);

var _Task = require('./quests/Task');

var _Task2 = _interopRequireDefault(_Task);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import Inventory from './actors/Invenotry';
var nodeFactory = function nodeFactory(type, params) {
  switch (type) {
    case 'Actor':
      return new _Actor2.default(params);
    case 'Condition':
      return new _Condition2.default(params);
    case 'Answer':
      return new _Answer2.default(params);
    case 'Dialog':
      return new _Dialog2.default(params);
    case 'Talk':
      return new _Talk2.default(params);
    case 'Quest':
      return new _Quest2.default(params);
    case 'Task':
      return new _Task2.default(params);
    default:
      return new _UniqueObject2.default(params);
  }
};

var dataParser = function dataParser(objects, dependencies) {
  var _objectPool = objects.map(function (obj) {
    return nodeFactory(obj.class, obj);
  });

  for (var i = 0, dId, depObj, toInject; i < dependencies.length; i++) {
    dId = dependencies[i]['dependent'];
    depObj = _Utils2.default.getObjectById(_objectPool, dId);
    toInject = dependencies[i]['dependencies'];
    if (depObj && toInject) {
      setDependencies(depObj, toInject);
    }
  }

  function setDependencies(dependent, dependencies) {
    for (var type in dependencies) {
      if (dependencies.hasOwnProperty(type)) {
        if (dependencies[type] instanceof Array) {
          for (var _i = 0; _i < dependencies[type].length; _i++) {
            setDependency(dependent, type, dependencies[type][_i]);
          }
        } else {
          setDependency(dependent, type, dependencies[type]);
        }
      }
    }
  }

  function setDependency(dependent, type, uuid) {
    var dependency = _Utils2.default.getObjectById(_objectPool, uuid);
    //console.log('dependency',dependency);
    if (dependency) {
      dependent.setDependency(type, dependency);
    }
  }

  return _objectPool;
};

var RPGSystem = function RPGSystem(data) {
  var _data = data || { objects: [], dependencies: [] };
  var _objects = _data.objects ? Object.values(_data.objects) : [];
  var _dependencies = _data.dependencies ? Object.values(_data.dependencies) : [];
  var _objectPool = dataParser(_objects, _dependencies);

  var _rpgSystem = this;

  var _createNode = function (type, params, parent) {
    var _parent = parent || null;
    var obj = nodeFactory(type, params);

    if (parent !== null) {
      //parent.getObj().addChild(obj);
      //setDependency...
    } else {
      _objectPool.push(obj);
    }

    var _creator = {

      setParam: function setParam(param, value) {
        obj.setParam(param, value);
        return _creator;
      },

      addNode: function addNode(nodeType, nodeParams) {
        return _createNode(nodeType, nodeParams, _parent);
      },

      getObj: function getObj() {
        return obj;
      },

      back: function back() {
        return _parent || this.done();
      },

      done: function done() {
        return _rpgSystem;
      }
    };
    return _creator;
  }();

  var _serializeData = function _serializeData() {
    var objects = [];
    var dependencies = [];
    for (var i = 0, obj, dep; i < _objectPool.length; i++) {
      obj = _objectPool[i].getData();
      dep = _objectPool[i].getDependencies();
      objects.push(obj);
      if (Object.keys(dep).length > 0) {
        dependencies.push(dep);
      }
    }
    return JSON.stringify({ objects: objects, dependencies: dependencies });
  };

  return {
    serializeData: _serializeData
  };
};

module.exports = RPGSystem;

},{"./actors/Actor":4,"./conditions/Condition":5,"./core/BaseObject":6,"./core/UniqueObject":7,"./core/Utils":8,"./dialogs/Answer":9,"./dialogs/Dialog":10,"./dialogs/Talk":11,"./quests/Quest":12,"./quests/Task":14}],4:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _UniqueObject2 = require('../core/UniqueObject');

var _UniqueObject3 = _interopRequireDefault(_UniqueObject2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DIALOG = 'dialog';

var Actor = function () {
  //Weak maps are new feature to JavaScript. We can store private
  //object properties in key/value pairs using our instance as the key,
  //and our class can capture those key/value maps in a closure.
  var _name = new WeakMap();
  var _dialog = new WeakMap();
  //let _inventory = new WeakMap();


  return function (_UniqueObject) {
    _inherits(Actor, _UniqueObject);

    function Actor(data) {
      _classCallCheck(this, Actor);

      var _this = _possibleConstructorReturn(this, (Actor.__proto__ || Object.getPrototypeOf(Actor)).call(this, data));

      _name.set(_this, data ? data.name : '');
      _dialog.set(_this, null);
      //_inventory.set(this,data.inventory ? );
      return _this;
    }

    _createClass(Actor, [{
      key: 'getData',
      value: function getData() {
        var data = _get(Actor.prototype.__proto__ || Object.getPrototypeOf(Actor.prototype), 'getData', this).call(this);
        data.name = this.getName();
        return data;
      }
    }, {
      key: 'getDependencies',
      value: function getDependencies() {
        var dependencies = _get(Actor.prototype.__proto__ || Object.getPrototypeOf(Actor.prototype), 'getDependencies', this).call(this);
        if (this.getDialog()) {
          dependencies[DIALOG] = this.getDialog().getId();
        }
        return dependencies;
      }
    }, {
      key: 'setDependency',
      value: function setDependency(type, obj) {
        _get(Actor.prototype.__proto__ || Object.getPrototypeOf(Actor.prototype), 'setDependency', this).call(this, type, obj);
        switch (type) {
          case DIALOG:
            this.setDialog(obj);
            break;
          default:
            break;
        };
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

},{"../core/UniqueObject":7}],5:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _UniqueObject2 = require('../core/UniqueObject');

var _UniqueObject3 = _interopRequireDefault(_UniqueObject2);

var _nxCompile = require('@risingstack/nx-compile');

var _nxCompile2 = _interopRequireDefault(_nxCompile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Condition = function () {
  var _label = new WeakMap();
  var _code = new WeakMap();
  var _compiled = new WeakMap();
  var _sandbox = new WeakMap();

  return function (_UniqueObject) {
    _inherits(Condition, _UniqueObject);

    function Condition(data, sandbox) {
      _classCallCheck(this, Condition);

      var _this = _possibleConstructorReturn(this, (Condition.__proto__ || Object.getPrototypeOf(Condition)).call(this, data));

      _label.set(_this, data ? data.label : '');
      _code.set(_this, data ? data.code : 'return true');
      _sandbox.set(_this, sandbox || {});
      _compiled.set(_this, _nxCompile2.default.compileExpression(_code.get(_this), _sandbox.get(_this)));
      return _this;
    }

    _createClass(Condition, [{
      key: 'setLabel',
      value: function setLabel(text) {
        _label.set(this, text);
      }
    }, {
      key: 'getLabel',
      value: function getLabel() {
        return _label.get(this);
      }
    }, {
      key: 'setCode',
      value: function setCode(code) {
        _code.set(this, code);
        _compiled.set(this, _nxCompile2.default.compileExpression(_code.get(this), _sandbox.get(this)));
      }
    }, {
      key: 'getCode',
      value: function getCode() {
        return _code.get(this);
      }
    }, {
      key: 'check',
      value: function check() {
        return _compiled.get(this)();
      }
    }, {
      key: 'getData',
      value: function getData() {
        var data = _get(Condition.prototype.__proto__ || Object.getPrototypeOf(Condition.prototype), 'getData', this).call(this);
        data.label = this.getLabel();
        data.code = this.getCode();
        return data;
      }
    }]);

    return Condition;
  }(_UniqueObject3.default);
}();

},{"../core/UniqueObject":7,"@risingstack/nx-compile":1}],6:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _UniqueObject2 = require('./UniqueObject');

var _UniqueObject3 = _interopRequireDefault(_UniqueObject2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VISIBLE = 'visible';
var ACTIVE = 'active';

var BaseObject = function () {
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

      _visible.set(_this, null);
      _active.set(_this, null);
      return _this;
    }

    _createClass(BaseObject, [{
      key: 'getDependencies',
      value: function getDependencies() {
        var dependencies = {};
        if (this.getVisibleCondition()) {
          dependencies[VISIBLE] = this.getVisibleCondition().getId();
        }
        if (this.getActiveCondition()) {
          dependencies[ACTIVE] = this.getActiveCondition().getId();
        }
        return dependencies;
      }
    }, {
      key: 'setDependency',
      value: function setDependency(type, obj) {
        switch (type) {
          case VISIBLE:
            this.setVisibleCondition(obj);
            break;
          case ACTIVE:
            this.setActiveCondition(obj);
            break;
          default:
            break;
        };
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

},{"./UniqueObject":7}],7:[function(require,module,exports){
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
      _uuid.set(this, data ? data.uuid : _Utils.UUID.generate());
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
          class: this.constructor.name,
          uuid: this.getId()
        };
      }
    }, {
      key: "getDependencies",
      value: function getDependencies() {
        var dependencies = {};
        return dependencies;
      }
    }, {
      key: "setDependency",
      value: function setDependency(type, obj) {}
    }]);

    return UniqueObject;
  }();
}();
module.exports = UniqueObject;

},{"./Utils":8}],8:[function(require,module,exports){
"use strict";

/**
 * Fast UUID generator, RFC4122 version 4 compliant.
 * @author Jeff Ward (jcward.com).
 * @license MIT license
 * @link http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
 **/

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
    if (expectedType.isPrototypeOf(obj)) {
      throw new Error('Wrong type of object passed. Expected ' + expectedType.constructor.name + ' object.');
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
  return array;
};

exports.removeObjectFromArray = function (array, obj) {
  var index = indexOfObject(array, obj);
  if (index !== -1) {
    array.splice(index, 1);
  }
  return array;
};

},{}],9:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseObject2 = require('../core/BaseObject');

var _BaseObject3 = _interopRequireDefault(_BaseObject2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TALK = 'talk';

var Answer = function () {
  //Weak maps are new feature to JavaScript. We can store private
  //object properties in key/value pairs using our instance as the key,
  //and our class can capture those key/value maps in a closure.
  var _text = new WeakMap();
  var _talk = new WeakMap();

  return function (_BaseObject) {
    _inherits(Answer, _BaseObject);

    function Answer(data) {
      _classCallCheck(this, Answer);

      var _this = _possibleConstructorReturn(this, (Answer.__proto__ || Object.getPrototypeOf(Answer)).call(this, data));

      _text.set(_this, data ? data.text : '');
      _talk.set(_this, data ? data.talk : '');
      return _this;
    }

    _createClass(Answer, [{
      key: 'getData',
      value: function getData() {
        var data = _get(Answer.prototype.__proto__ || Object.getPrototypeOf(Answer.prototype), 'getData', this).call(this);
        data.text = this.getText();
        return data;
      }
    }, {
      key: 'getDependencies',
      value: function getDependencies() {
        var dependencies = _get(Answer.prototype.__proto__ || Object.getPrototypeOf(Answer.prototype), 'getDependencies', this).call(this);
        if (this.getTalk()) {
          dependencies[TALK] = this.getTalk().getId();
        }
        return dependencies;
      }
    }, {
      key: 'setDependency',
      value: function setDependency(type, obj) {
        _get(Answer.prototype.__proto__ || Object.getPrototypeOf(Answer.prototype), 'setDependency', this).call(this, type, obj);
        switch (type) {
          case TALK:
            this.setTalk(obj);
            break;
          default:
            break;
        };
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
      key: 'setTalk',
      value: function setTalk(talk) {
        _talk.set(this, talk);
      }
    }, {
      key: 'getTalk',
      value: function getTalk() {
        return _talk.get(this);
      }
    }]);

    return Answer;
  }(_BaseObject3.default);
}();
module.exports = Answer;

},{"../core/BaseObject":6}],10:[function(require,module,exports){
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

var TALK = 'talk';

var Dialog = function () {
  var _start = new WeakMap();
  var _talks = new WeakMap();

  return function (_UniqueObject) {
    _inherits(Dialog, _UniqueObject);

    function Dialog(data) {
      _classCallCheck(this, Dialog);

      var _this = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this, data));

      _start.set(_this, data ? data.startTalk : '');
      _talks.set(_this, []);
      return _this;
    }

    _createClass(Dialog, [{
      key: 'getData',
      value: function getData() {
        var data = _get(Dialog.prototype.__proto__ || Object.getPrototypeOf(Dialog.prototype), 'getData', this).call(this);
        data.startTalk = this.getStartTalk();
        return data;
      }
    }, {
      key: 'getDependencies',
      value: function getDependencies() {
        var dependencies = {};
        if (this.getTalks()) {
          dependencies[TALK] = this.getTalks().map(function (t) {
            return t.getId();
          });
        }
        return dependencies;
      }
    }, {
      key: 'setDependency',
      value: function setDependency(type, obj) {
        switch (type) {
          case TALK:
            this.addTalk(obj);
            break;
          default:
            break;
        };
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

},{"../core/UniqueObject":7,"../core/Utils":8,"./Talk":11}],11:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Utils = require('../core/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

var _BaseObject2 = require('../core/BaseObject');

var _BaseObject3 = _interopRequireDefault(_BaseObject2);

var _Answer = require('./Answer');

var _Answer2 = _interopRequireDefault(_Answer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ANSWER = 'answer';

var Talk = function () {

  var _text = new WeakMap();
  var _answers = new WeakMap();

  return function (_BaseObject) {
    _inherits(Talk, _BaseObject);

    function Talk(data) {
      _classCallCheck(this, Talk);

      var _this = _possibleConstructorReturn(this, (Talk.__proto__ || Object.getPrototypeOf(Talk)).call(this, data));

      _text.set(_this, data ? data.text : '');
      _answers.set(_this, []);
      return _this;
    }

    _createClass(Talk, [{
      key: 'getData',
      value: function getData() {
        var data = _get(Talk.prototype.__proto__ || Object.getPrototypeOf(Talk.prototype), 'getData', this).call(this);
        data.text = this.getText();
        return data;
      }
    }, {
      key: 'getDependencies',
      value: function getDependencies() {
        var dependencies = _get(Talk.prototype.__proto__ || Object.getPrototypeOf(Talk.prototype), 'getDependencies', this).call(this);
        if (this.getAnswers()) {
          dependencies[ANSWER] = this.getAnswers().map(function (a) {
            return a.getId();
          });
        }
        return dependencies;
      }
    }, {
      key: 'setDependency',
      value: function setDependency(type, obj) {
        _get(Talk.prototype.__proto__ || Object.getPrototypeOf(Talk.prototype), 'setDependency', this).call(this, type, obj);
        switch (type) {
          case ANSWER:
            this.addAnswer(obj);
            break;
          default:
            break;
        };
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
        _answers.set(this, _Utils2.default.addObjectToArray(_answers.get(this), answer, _Answer2.default));
      }
    }, {
      key: 'removeAnswer',
      value: function removeAnswer(answerId) {
        _Utils2.default.removeObjectById(_answers.get(this), answerId);
      }
    }, {
      key: 'getAnswer',
      value: function getAnswer(answerId) {
        return _Utils2.default.getObjectById(_answers.get(this), answerId);
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

},{"../core/BaseObject":6,"../core/Utils":8,"./Answer":9}],12:[function(require,module,exports){
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

var TASK = 'task';

var Quest = function () {
  var _title = new WeakMap();
  var _description = new WeakMap();
  var _status = new WeakMap();
  var _tasks = new WeakMap();

  return function (_BaseObject) {
    _inherits(Quest, _BaseObject);

    function Quest(data) {
      _classCallCheck(this, Quest);

      var _this = _possibleConstructorReturn(this, (Quest.__proto__ || Object.getPrototypeOf(Quest)).call(this, data));

      _title.set(_this, data ? data.title : '');
      _description.set(_this, data ? data.description : '');
      _status.set(_this, data ? data.status : _QuestStatus2.default.INCOMPLETE);
      _tasks.set(_this, []);
      return _this;
    }

    _createClass(Quest, [{
      key: 'getData',
      value: function getData() {
        var data = _get(Quest.prototype.__proto__ || Object.getPrototypeOf(Quest.prototype), 'getData', this).call(this);
        data.title = this.getTitle();
        data.description = this.getDescription();
        data.status = this.getStatus();
        return data;
      }
    }, {
      key: 'getDependencies',
      value: function getDependencies() {
        var dependencies = _get(Quest.prototype.__proto__ || Object.getPrototypeOf(Quest.prototype), 'getDependencies', this).call(this);
        if (this.getTasks()) {
          dependencies[TASK] = this.getTasks().map(function (t) {
            return t.getId();
          });
        }
        return dependencies;
      }
    }, {
      key: 'setDependency',
      value: function setDependency(type, obj) {
        _get(Quest.prototype.__proto__ || Object.getPrototypeOf(Quest.prototype), 'setDependency', this).call(this, type, obj);
        switch (type) {
          case TASK:
            this.setTask(obj);
            break;
          default:
            break;
        };
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

},{"../core/BaseObject":6,"./QuestStatus":13,"./Task":14}],13:[function(require,module,exports){
"use strict";

var INCOMPLETE = 'questIncomplete';
var COMPLETED = 'questCompleted';
var FAILED = 'questFailed';

exports.INCOMPLETE = INCOMPLETE;
exports.COMPLETED = COMPLETED;
exports.FAILED = FAILED;

},{}],14:[function(require,module,exports){
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

},{"../core/BaseObject":6}],15:[function(require,module,exports){
"use strict";

var _data = require('../data/data.json');

var _data2 = _interopRequireDefault(_data);

var _RPGSystem = require('./rpgs/RPGSystem');

var _RPGSystem2 = _interopRequireDefault(_RPGSystem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import UniqueObject from './rpgs/core/UniqueObject';
//import BaseObject from './rpgs/core/BaseObject';


(function ($, window, document, undefined) {
  $(function () {
    //console.log(data);
    var rpg = new _RPGSystem2.default(_data2.default);
    console.log(rpg.serializeData());
    //let uo = new UniqueObject();
    //console.log(uo.getData());
  });
})(jQuery, window, document);

},{"../data/data.json":2,"./rpgs/RPGSystem":3}]},{},[15])

