(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _UniqueObject2 = require('../core/UniqueObject');

var _UniqueObject3 = _interopRequireDefault(_UniqueObject2);

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
  var _inventory = new WeakMap();

  return function (_UniqueObject) {
    _inherits(Actor, _UniqueObject);

    function Actor(id) {
      _classCallCheck(this, Actor);

      var _this = _possibleConstructorReturn(this, (Actor.__proto__ || Object.getPrototypeOf(Actor)).call(this, id));

      _name.set(_this, '');
      _dialog.set(_this, null);
      _inventory.set(_this, null);
      return _this;
    }

    _createClass(Actor, [{
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
    }, {
      key: 'setInventory',
      value: function setInventory(inventory) {
        _inventory.set(this, inventory);
      }
    }, {
      key: 'getInventory',
      value: function getInventory() {
        return _inventory.get(this);
      }
    }]);

    return Actor;
  }(_UniqueObject3.default);
}();

module.exports = Actor;

},{"../core/UniqueObject":3}],2:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

    function BaseObject(id) {
      _classCallCheck(this, BaseObject);

      var _this = _possibleConstructorReturn(this, (BaseObject.__proto__ || Object.getPrototypeOf(BaseObject)).call(this, id));

      _visible.set(_this, null);
      _active.set(_this, null);
      return _this;
    }
    /**
     * Method sets condition that must be met in order to node was visible.
     * @param {Condition} condition Instance of Condition object
     */


    _createClass(BaseObject, [{
      key: 'setVisibleCondition',
      value: function setVisibleCondition(condition) {
        _visible.set(this, BaseObject.isConditionInstance(condition));
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

},{"./UniqueObject":3}],3:[function(require,module,exports){
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
    function UniqueObject(id) {
      _classCallCheck(this, UniqueObject);

      //By default we assign Universally Unique ID
      _uuid.set(this, id || _Utils.UUID.generate());
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
    }]);

    return UniqueObject;
  }();
}();
module.exports = UniqueObject;

},{"./Utils":4}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
"use strict";

var _Utils = require('./rpgs/core/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

var _UniqueObject = require('./rpgs/core/UniqueObject');

var _UniqueObject2 = _interopRequireDefault(_UniqueObject);

var _BaseObject = require('./rpgs/core/BaseObject');

var _BaseObject2 = _interopRequireDefault(_BaseObject);

var _Actor = require('./rpgs/actors/Actor');

var _Actor2 = _interopRequireDefault(_Actor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function ($, window, document, undefined) {
      $(function () {
            var uniqueObject = new _UniqueObject2.default();
            console.log('uniqueObject.getId()', uniqueObject.getId());

            var baseObject = new _BaseObject2.default();
            console.log('baseObject.isVisible()', baseObject.isVisible());
            console.log('baseObject.isActive()', baseObject.isActive());
            console.log('baseObject.getId()', baseObject.getId());

            var actor = new _Actor2.default();
            console.log('actor.getId()', actor.getId());
            actor.setName('Adam');
            console.log('actor.getName()', actor.getName());

            var myWeakMap = new WeakMap().set(this, ['a']);
            console.log('weakmap test1:', myWeakMap.get(this));
            myWeakMap.set(this, _Utils2.default.addObjectToArray(myWeakMap.get(this), 'b'));
            console.log('weakmap test2:', myWeakMap.get(this));
      });
})(jQuery, window, document);

},{"./rpgs/actors/Actor":1,"./rpgs/core/BaseObject":2,"./rpgs/core/UniqueObject":3,"./rpgs/core/Utils":4}]},{},[5])

