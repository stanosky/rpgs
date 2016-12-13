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
  "actors":[
    {
      "class":"Actor",
      "uuid":"ac1",
      "name":"Adam",
      "input":{
        "dialog":["d1"],
      },
      "output":{}
    },
    {
      "class":"Actor",
      "uuid":"ac2",
      "name":"Eva",
      "input":{
        "dialog":["d2"],
      },
      "output":{}
    }
  ],
  "answers":[
    {
      "class":"Answer",
      "uuid":"a1",
      "text":"Answer 1",
      "input":{
        "visibility":[],
        "activity":[]
      },
      "output":{
        "goto":["t2"]
      }
    },
    {
      "class":"Answer",
      "uuid":"a2",
      "text":"Answer 2",
      "input":{
        "visibility":[],
        "activity":[]
      },
      "output":{
        "goto":["t3"]
      }
    },
    {
      "class":"Answer",
      "uuid":"a3",
      "text":"Answer 3",
      "input":{
        "visibility":[],
        "activity":[]
      },
      "output":{
        "goto":[]
      }
    },
    {
      "class":"Answer",
      "uuid":"a4",
      "text":"Answer 4",
      "input":{
        "visibility":[],
        "activity":[]
      },
      "output":{
        "goto":["t5"]
      }
    },
    {
      "class":"Answer",
      "uuid":"a5",
      "text":"Answer 5",
      "input":{
        "visibility":[],
        "activity":[]
      },
      "output":{
        "goto":["t6"]
      }
    },
    {
      "class":"Answer",
      "uuid":"a6",
      "text":"Answer 6",
      "input":{
        "visibility":[],
        "activity":[]
      },
      "output":{
        "goto":[]
      }
    }
  ],
  "talks":[
    {
      "class":"Talk",
      "uuid":"t1",
      "text":"Talk 1",
      "answers":["a1"],
      "input":{
        "goto":[]
      },
      "output":{}
    },
    {
      "class":"Talk",
      "uuid":"t2",
      "text":"Talk 2",
      "answers":["a2"],
      "input":{
        "goto":[]
      },
      "output":{}
    },
    {
      "class":"Talk",
      "uuid":"t3",
      "text":"Talk 3",
      "answers":["a3"],
      "input":{
        "goto":[]
      },
      "output":{}
    },
    {
      "class":"Talk",
      "uuid":"t4",
      "text":"Talk 4",
      "answers":["a4"],
      "input":{
        "goto":[]
      },
      "output":{}
    },
    {
      "class":"Talk",
      "uuid":"t5",
      "text":"Talk 5",
      "answers":["a5"],
      "input":{
        "goto":[]
      },
      "output":{}
    },
    {
      "class":"Talk",
      "uuid":"t6",
      "text":"Talk 6",
      "answers":["a6"],
      "input":{
        "goto":[]
      },
      "output":{}
    }
  ],
  "dialogs":[
    {
      "class":"Dialog",
      "uuid":"d1",
      "startTalk":"t1",
      "talks":["t1","t2","t3"],
      "input":{
        "visibility":[],
        "activity":[]
      },
      "output":{
        "dialog":[]
      }
    },
    {
      "class":"Dialog",
      "uuid":"d2",
      "startTalk":"t4",
      "talks":["t4","t5","t6"],
      "input":{
        "visibility":[],
        "activity":[]
      },
      "output":{
        "dialog":[]
      }
    }
  ],
  "conditions":[],
  "variables":[],
  "links":[
    {
      "class":"Link",
      "uuid":"d1->ac1",
      "type":"dialog",
      "linkInp":"d1",
      "linkOut":"ac1"
    },
    {
      "class":"Link",
      "uuid":"d2->ac2",
      "type":"dialog",
      "linkInp":"d2",
      "linkOut":"ac2"
    },
    {
      "class":"Link",
      "uuid":"a1->t2",
      "type":"goto",
      "linkInp":"a1",
      "linkOut":"t2"
    },
    {
      "class":"Link",
      "uuid":"a2->t3",
      "type":"goto",
      "linkInp":"a2",
      "linkOut":"t3"
    },
    {
      "class":"Link",
      "uuid":"a4->t5",
      "type":"goto",
      "linkInp":"a4",
      "linkOut":"t5"
    },
    {
      "class":"Link",
      "uuid":"a5->t6",
      "type":"goto",
      "linkInp":"a5",
      "linkOut":"t6"
    }
  ]
}

},{}],3:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
//import Inventory    from './actors/Invenotry';


var _Utils = require('./core/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

var _BaseObject = require('./core/BaseObject');

var _BaseObject2 = _interopRequireDefault(_BaseObject);

var _ErrorHandler = require('./core/ErrorHandler');

var _ErrorHandler2 = _interopRequireDefault(_ErrorHandler);

var _ErrorCode = require('./core/ErrorCode');

var _ErrorCode2 = _interopRequireDefault(_ErrorCode);

var _Link = require('./core/Link');

var _Link2 = _interopRequireDefault(_Link);

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

var KEY_ACTORS = 'actors';
var KEY_ANSWERS = 'answers';
var KEY_CONDITIONS = 'conditions';
var KEY_DIALOGS = 'dialogs';
var KEY_LINKS = 'links';
var KEY_SCRIPTS = 'scripts';
var KEY_TALKS = 'talks';
var KEY_TASKS = 'tasks';
var KEY_QUESTS = 'quests';
var KEY_VARIABLES = 'variables';

var RPGSystem = function RPGSystem(data, editor) {
  var _this = this;

  var _objectPool = {},
      _editor = editor || null,
      _errorHandler = new _ErrorHandler2.default(_editor),
      _context = null,
      _lastChild = null,
      _parentHistory = [],
      _halfLinks = {
    out: [],
    inp: []
  };

  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      _objectPool[key] = data[key].map(function (d) {
        return _nodeFactory(d, _this);
      });
    }
  }

  function _nodeFactory(data, rpgs) {
    var className = data.class;
    switch (className) {
      case 'Actor':
        return new _Actor2.default(data, rpgs);
      case 'Condition':
        return new _Condition2.default(data, rpgs);
      case 'Answer':
        return new _Answer2.default(data, rpgs);
      case 'Dialog':
        return new _Dialog2.default(data, rpgs);
      case 'Talk':
        return new _Talk2.default(data, rpgs);
      case 'Quest':
        return new _Quest2.default(data, rpgs);
      case 'Task':
        return new _Task2.default(data, rpgs);
      case 'Link':
        return new _Link2.default(data, rpgs);
      default:
        _errorHandler.showMsg(_ErrorCode2.default.CLASS_NOT_DEFINED, { class: className });
        return null;
    }
  }

  var _findNode = function _findNode(objId) {
    for (var key in _objectPool) {
      if (_objectPool.hasOwnProperty(key)) {
        var obj = _Utils2.default.getObjectById(_objectPool[key], objId);
        if (obj !== null) return obj;
      }
    }
    //Is error message neccessary here? To consider.
    //_errorHandler.showMsg(ErrorCode.OBJECT_NOT_FOUND,{id:objId});
    return null;
  },
      _getNode = function _getNode(key, objId) {
    var obj = _Utils2.default.getObjectById(_objectPool[key], objId);
    return obj;
  },
      _addNode = function _addNode(key, obj) {
    if (!_objectPool[key]) _objectPool[key] = [];
    _objectPool[key].push(obj);
  },
      _removeNode = function _removeNode(key, id) {
    _objectPool[key] = _Utils2.default.removeObjectById(_objectPool[key], id);
  },
      _setConnection = function _setConnection(type, nodeId1, nodeId2) {
    console.log('_setConnection', type, nodeId1, nodeId2);
    if (nodeId1 === nodeId2) {
      this._handleError(_ErrorCode2.default.CONNECTION_TO_ITSELF, { node: nodeId1 });
      return false;
    }
    var node1 = _findNode(nodeId1);
    var node2 = _findNode(nodeId2);
    if (node1 === null || node2 === null) return;
    if (node1.canCreateOutputConnection(type) && node2.canCreateInputConnection(type)) {
      var link = new _Link2.default({ type: type, output: nodeId1, input: nodeId2 });
      var linkId = link.getId();
      this._addNode(KEY_LINKS, link);
      node1.setOutputConnection(type, linkId);
      node2.setInputConnection(type, linkId);
      return linkId;
    } else {
      this._handleError(_ErrorCode2.default.IMPROPER_CONNECTION, { type: type, node1: nodeId1, node2: nodeId2 });
      return false;
    }
  },
      _getConnection = function _getConnection(linkId) {
    return this._getNode(KEY_LINKS, linkId);
  },
      _getConnections = function _getConnections() {
    return _objectPool[KEY_LINKS];
  },
      _removeConnection = function _removeConnection(linkId) {
    this._removeNode(KEY_LINKS, linkId);
  };

  ////////////////////////////////////////////////////////////////
  //METHOD CHAINING
  ////////////////////////////////////////////////////////////////

  /**
   * Method used to check passed parameters and later merge them into
   * single object.
   * @param  {string} id      Mandatory id of node.
   * @param  {object} params  Optional parameters.
   * @return {object} Parameters merged into object.
   */
  function _checkAndMergeParams() {
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._handleError(_ErrorCode2.default.MANDATORY_PARAM, { param: 'id' });
    var params = arguments[1];

    if (typeof id !== 'string') this._handleError(_ErrorCode2.default.INCORRECT_TYPE, { type: 'string' });
    if (params !== undefined && (typeof params === 'undefined' ? 'undefined' : _typeof(params)) !== 'object') this._handleError(_ErrorCode2.default.INCORRECT_TYPE, { type: 'object' });else params = {};
    params.uuid = id;
    return params;
  }

  /**
   * This method helps in the creation of nodes. Its focus on proper
   * placement of nodes in tree.
   * @param  {string} id      Mandatory id of newly created node.
   * @param  {object} params  Parameters of created node.
   * @param  {boolean} asChild Determines if node should be added as child
   * of another node or as an independent node.
   * @param  {string} className   Name of class that will be used to create node.
   * @param  {string} storage Name of node group inside which node will be added.
   */
  function _chainNodeCreator(id, params, asChild, className, storage) {
    //First, we check that id and params are valid.
    params = _checkAndMergeParams(id, params);
    //Class name for later usage.
    params.class = className;

    //Test if node should be added as child or parent.
    if (asChild) {
      console.log('_lastChild', _lastChild, '_parentHistory[0]', _parentHistory[0], id);
      //If last added child was not null then we must check additional conditions.
      if (_lastChild !== null) {
        //If constructor name of previous child node, is equal to name of class,
        //whose we try to create, it means node should be added to current parent.
        console.log('canAddChild', className, _lastChild.canAddChild(className));
        if (_lastChild.constructor.name === className) {
          createChildNode();
        }
        //If names of constructors not match, then we must check if new node
        //can be added as child to our previous child.
        else if (_lastChild.canAddChild(className)) {
            _parentHistory.unshift(_lastChild);
            createChildNode();
          }
          //Finally if previous conditions are false we try go back to previous
          //parent node.
          else {
              _lastChild = _parentHistory.shift() || null;
              _chainNodeCreator(id, params, asChild, className, storage);
            }
      }
      //If last child is null, then we check if node can be added to current
      //parent node.
      else if (_parentHistory.length > 0 && _parentHistory[0].canAddChild(className)) {
          createChildNode();
        }
        //If last child and last parent is equal to null, then new child node
        //cant be added, so we throw error.
        else {
            _errorHandler.showMsg(_ErrorCode2.default.INCOMPATIBLE_CHILD, {
              child: className,
              parent: _parentHistory.length > 0 ? _parentHistory[0].constructor.name : 'null'
            });
          }
    } else {
      //If node is added as parent, then last child is set to null
      //and parent history is cleared.
      _lastChild = null;
      _parentHistory.length = 0;
      //After that, new node is created.
      var node = _nodeFactory(params, this);
      _parentHistory = [node];
      _addNode(storage, node);
    }

    function createChildNode() {
      //We create a new node, and then set as the last child.
      _lastChild = _nodeFactory(params, this);
      //Then we add our freshly created node to its parent.
      _parentHistory[0].addChild(_lastChild.getId());
      //Finally new node is added to main storage object.
      _addNode(storage, _lastChild);
    }
  }

  /**
   * Helper method that is used to remove nodes from object pool
   * and reset context of "method chaining" algorithm.
   * @param  {string} id  Id of node to be removed.
   * @param  {string} key Name of node group which contains node to remove.
   */
  function _chainNodeRemover(id, key) {
    _lastChild = null;
    _parentHistory.length = 0;
    this._removeNode(key, id);
  }

  /**
   * Helper method that is used for creating temporary links (half links)
   * or complete Link nodes, when input and output counterparts are present.
   * @param  {string} type      Defines type of connection.
   * @param  {string} id        Id of targeted node into which connection
   * should be made.
   * @param  {string} startSide Defines current start side of the link.
   * @param  {string} endSide   Defines current end side of the link.
   */
  function _chainLinkCreator(type, id, startSide, endSide) {
    var opposite = null;
    var node = null;
    if (_lastChild !== null) {
      node = _lastChild;
    } else if (_parentHistory[0] !== undefined) {
      node = _parentHistory[0];
    }
    if (node !== null) {
      for (var i = 0; i < _halfLinks[endSide].length; i++) {
        var link = _halfLinks[endSide][i];
        if (link.type === type && link.id === node.getId()) {
          opposite = _halfLinks[endSide].splice(i, 1);
          break;
        }
      }
      if (opposite === null) {
        _halfLinks[startSide].push({ type: type, id: id });
      } else {
        _setConnection(type, opposite.id, id);
      }
    } else {
      _errorHandler.showMsg(_ErrorCode2.default.INCORRECT_LINK_TARGET);
    }
  }

  var _addActor = function _addActor(id, params) {
    _chainNodeCreator(id, params, false, 'Actor', KEY_ACTORS);
    return this;
  },
      _removeActor = function _removeActor(actorId) {
    _chainNodeRemover(actorId, KEY_ACTORS);
    return this;
  },
      _addQuest = function _addQuest(id, params) {
    _chainNodeCreator(id, params, false, 'Quest', KEY_QUESTS);
    return this;
  },
      _removeQuest = function _removeQuest(questId) {
    _chainNodeRemover(questId, KEY_QUESTS);
    return this;
  },
      _addDialog = function _addDialog(id, params) {
    _chainNodeCreator(id, params, false, 'Dialog', KEY_DIALOGS);
    return this;
  },
      _removeDialog = function _removeDialog(dialogId) {
    _chainNodeRemover(dialogId, KEY_DIALOGS);
    return this;
  },
      _addCondition = function _addCondition(id, params) {
    _chainNodeCreator(id, params, false, 'Condition', KEY_CONDITIONS);
    return this;
  },
      _removeCondition = function _removeCondition(conditionId) {
    _chainNodeRemover(conditionId, KEY_CONDITIONS);
    return this;
  },
      _addVariable = function _addVariable(id, params) {
    _chainNodeCreator(id, params, false, 'Variable', KEY_VARIABLES);
    return this;
  },
      _removeVariable = function _removeVariable(variableId) {
    _chainNodeRemover(variableId, KEY_VARIABLES);
    return this;
  },
      _addTalk = function _addTalk(id, params) {
    _chainNodeCreator(id, params, true, 'Talk', KEY_TALKS);
    return this;
  },
      _removeTalk = function _removeTalk(id) {
    _chainNodeRemover(id, KEY_TALKS);
    return this;
  },
      _addAnswer = function _addAnswer(id, params) {
    _chainNodeCreator(id, params, true, 'Answer', KEY_ANSWERS);
    return this;
  },
      _removeAnswer = function _removeAnswer(id) {
    _chainNodeRemover(id, KEY_ANSWERS);
    return this;
  },
      _inp = function _inp(type, id) {
    _chainLinkCreator(type, id, 'inp', 'out');
    return this;
  },
      _out = function _out(type, id) {
    _chainLinkCreator(type, id, 'out', 'inp');
    return this;
  },


  ////////////////////////////////////////////////////////////////
  //GETTERS
  ////////////////////////////////////////////////////////////////
  _getActor = function _getActor(actorId) {
    return this._getNode(KEY_ACTORS, actorId);
  },
      _getActors = function _getActors() {
    return _objectPool[KEY_ACTORS];
  },
      _getCondition = function _getCondition(conditionId) {
    return this._getNode(KEY_CONDITIONS, conditionId);
  },
      _getConditions = function _getConditions() {
    return _objectPool[KEY_CONDITIONS];
  },
      _getDialog = function _getDialog(dialogId) {
    return this._getNode(KEY_DIALOGS, dialogId);
  },
      _getDialogs = function _getDialogs() {
    return _objectPool[KEY_DIALOGS];
  },
      _getQuest = function _getQuest(questId) {
    return this._getNode(KEY_QUESTS, questId);
  },
      _getQuests = function _getQuests() {
    return _objectPool[KEY_QUESTS];
  },
      _getVariable = function _getVariable(variableId) {
    return this._getNode(KEY_VARIABLES, variableId);
  },
      _getVariables = function _getVariables() {
    return _objectPool[KEY_VARIABLES];
  },
      _serializeData = function _serializeData() {
    var data = {};
    for (var key in _objectPool) {
      if (_objectPool.hasOwnProperty(key)) {
        data[key] = _objectPool[key].map(function (obj) {
          return obj.getData ? obj.getData() : obj;
        });
      }
    }
    return JSON.stringify(data);
  };

  return {
    ////////////////////////////////////////////
    //General node methods
    ////////////////////////////////////////////
    findNode: _findNode,
    getNode: _getNode,
    addNode: _addNode,
    removeNode: _removeNode,

    ////////////////////////////////////////////
    //Link creation methods
    ////////////////////////////////////////////
    setConnection: _setConnection,
    getConnection: _getConnection,
    getConnections: _getConnections,
    removeConnection: _removeConnection,

    ////////////////////////////////////////////
    //Chainable methods
    ////////////////////////////////////////////
    addActor: _addActor,
    removeActor: _removeActor,
    addQuest: _addQuest,
    removeQuest: _removeQuest,
    addDialog: _addDialog,
    removeDialog: _removeDialog,
    addCondition: _addCondition,
    removeCondition: _removeCondition,
    addVariable: _addVariable,
    removeVariable: _removeVariable,
    addTalk: _addTalk,
    removeTalk: _removeTalk,
    addAnswer: _addAnswer,
    removeAnswer: _removeAnswer,
    inp: _inp,
    out: _out,

    ////////////////////////////////////////////
    //Getter methods
    ////////////////////////////////////////////
    getActor: _getActor,
    getActors: _getActors,
    getCondition: _getCondition,
    getConditions: _getConditions,
    getDialog: _getDialog,
    getDialogs: _getDialogs,
    getQuest: _getQuest,
    getQuests: _getQuests,
    getVariable: _getVariable,
    getVariables: _getVariables,

    ////////////////////////////////////////////
    //Miscalineus methods
    ////////////////////////////////////////////
    serializeData: _serializeData
  };
};
module.exports = RPGSystem;

},{"./actors/Actor":4,"./conditions/Condition":5,"./core/BaseObject":6,"./core/ErrorCode":7,"./core/ErrorHandler":8,"./core/Link":9,"./core/Utils":11,"./dialogs/Answer":12,"./dialogs/Dialog":13,"./dialogs/Talk":14,"./quests/Quest":15,"./quests/Task":17}],4:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseObject2 = require('../core/BaseObject');

var _BaseObject3 = _interopRequireDefault(_BaseObject2);

var _LinkType = require('../core/LinkType');

var _LinkType2 = _interopRequireDefault(_LinkType);

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


  return function (_BaseObject) {
    _inherits(Actor, _BaseObject);

    function Actor(data) {
      _classCallCheck(this, Actor);

      var _this = _possibleConstructorReturn(this, (Actor.__proto__ || Object.getPrototypeOf(Actor)).call(this, data));

      _name.set(_this, data ? data.name : '');
      _dialog.set(_this, data ? data.dialog : '');
      //_inventory.set(this,data.inventory ? );
      return _this;
    }

    _createClass(Actor, [{
      key: 'getData',
      value: function getData() {
        var data = _get(Actor.prototype.__proto__ || Object.getPrototypeOf(Actor.prototype), 'getData', this).call(this);
        data.name = this.getName();
        data.dialog = this.getDialog();
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
      key: 'getDialog',
      value: function getDialog() {
        return _dialog.get(this);
      }

      /*getInventory() {
        return _inventory.get(this);
      }*/

    }, {
      key: 'canCreateInputConnection',
      value: function canCreateInputConnection(type) {
        switch (type) {
          case _LinkType2.default.DIALOG:
            return this.getInputConnections(_LinkType2.default.DIALOG).length === 0;
          default:
            return false;
        }
      }
    }, {
      key: 'setOutputConnection',
      value: function setOutputConnection(type, linkId) {}
    }, {
      key: 'getOutputConnections',
      value: function getOutputConnections(type) {}
    }, {
      key: 'removeOutputConnection',
      value: function removeOutputConnection(type, linkId) {}
    }, {
      key: 'dispose',
      value: function dispose() {
        _name.delete(this);
        _dialog.delete(this);
        //_inventory.delete(this);
        _get(Actor.prototype.__proto__ || Object.getPrototypeOf(Actor.prototype), 'dispose', this).call(this);
      }
    }]);

    return Actor;
  }(_BaseObject3.default);
}();

module.exports = Actor;

},{"../core/BaseObject":6,"../core/LinkType":10}],5:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseObject2 = require('../core/BaseObject');

var _BaseObject3 = _interopRequireDefault(_BaseObject2);

var _LinkType = require('../core/LinkType');

var _LinkType2 = _interopRequireDefault(_LinkType);

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

  return function (_BaseObject) {
    _inherits(Condition, _BaseObject);

    function Condition(data, rpgs) {
      _classCallCheck(this, Condition);

      var _this = _possibleConstructorReturn(this, (Condition.__proto__ || Object.getPrototypeOf(Condition)).call(this, data, rpgs));

      _label.set(_this, data ? data.label : '');
      _code.set(_this, data ? data.code : 'return true');
      _sandbox.set(_this, { rpgs: rpgs });
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
    }, {
      key: 'canCreateOutputConnection',
      value: function canCreateOutputConnection(type) {
        switch (type) {
          case _LinkType2.default.VISIBILITY:
          case _LinkType2.default.ACTIVITY:
            return true;
          default:
            return false;
        }
      }
    }, {
      key: 'setInputConnection',
      value: function setInputConnection(type, linkId) {}
    }, {
      key: 'getInputConnections',
      value: function getInputConnections(type) {}
    }, {
      key: 'removeInputConnection',
      value: function removeInputConnection(type, linkId) {}
    }, {
      key: 'dispose',
      value: function dispose() {
        _label.delete(this);
        _code.delete(this);
        _sandbox.delete(this);
        _compiled.delete(this);
        _get(Condition.prototype.__proto__ || Object.getPrototypeOf(Condition.prototype), 'dispose', this).call(this);
      }
    }]);

    return Condition;
  }(_BaseObject3.default);
}();

},{"../core/BaseObject":6,"../core/LinkType":10,"@risingstack/nx-compile":1}],6:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Utils = require('./Utils');

var _LinkType = require('./LinkType');

var _LinkType2 = _interopRequireDefault(_LinkType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KEY_LINKS = 'links';
var KEY_CONDITIONS = 'conditions';

var BaseObject = function () {
  //Weak maps are new feature to JavaScript. We can store private
  //object properties in key/value pairs using our instance as the key,
  //and our class can capture those key/value maps in a closure.
  var _rpgs = new WeakMap();
  var _uuid = new WeakMap();
  var _input = new WeakMap();
  var _output = new WeakMap();

  return function () {
    function BaseObject(data, rpgs) {
      _classCallCheck(this, BaseObject);

      _rpgs.set(this, rpgs);
      //By default we assign Universally Unique ID
      _uuid.set(this, data ? data.uuid : _Utils.UUID.generate());
      _input.set(this, data ? data.input : {});
      _output.set(this, data ? data.output : {});
    }

    _createClass(BaseObject, [{
      key: 'getRPGS',
      value: function getRPGS() {
        return this.getRPGS();
      }
    }, {
      key: 'setId',
      value: function setId(value) {
        _uuid.set(this, value);
      }
    }, {
      key: 'getId',
      value: function getId() {
        return _uuid.get(this);
      }
    }, {
      key: 'checkCondition',
      value: function checkCondition(conditionId) {
        var condition = this.getRPGS().getNode(KEY_CONDITIONS, conditionId);
        return condition ? condition.check() : true;
      }

      /**
       * Returns boolean that reflects visiblility state of node.
       * @return {Boolean} Visibility state
       */

    }, {
      key: 'isVisible',
      value: function isVisible() {
        var conditions = getInputConnections(_LinkType2.default.VISIBILITY);
        return conditions ? this.checkCondition(conditions[0]) : true;
      }

      /**
       * Returns boolean that reflects activity state of node.
       * @return {Boolean} Active state
       */

    }, {
      key: 'isActive',
      value: function isActive() {
        var conditions = getInputConnections(_LinkType2.default.ACTIVITY);
        return conditions ? this.checkCondition(conditions[0]) : true;
      }
    }, {
      key: 'getData',
      value: function getData() {
        return {
          class: this.constructor.name,
          uuid: this.getId(),
          input: this.getInputConnections(),
          output: this.getOutputConnections()
        };
      }
    }, {
      key: 'canAddChild',
      value: function canAddChild(type) {
        return false;
      }
    }, {
      key: 'addChild',
      value: function addChild(childId) {}
    }, {
      key: 'removeChild',
      value: function removeChild(index) {}
    }, {
      key: 'getChild',
      value: function getChild(index) {
        return null;
      }
    }, {
      key: 'getChildren',
      value: function getChildren() {
        return [];
      }
    }, {
      key: 'canCreateInputConnection',
      value: function canCreateInputConnection(type) {
        return false;
      }
    }, {
      key: 'canCreateOutputConnection',
      value: function canCreateOutputConnection(type) {
        return false;
      }
    }, {
      key: '_setConnection',
      value: function _setConnection(obj, type, linkId) {
        if (!obj.hasOwnProperty(type)) {
          obj[type] = [];
        }
        obj[type].push(linkId);
        return obj;
      }
    }, {
      key: 'setOutputConnection',
      value: function setOutputConnection(type, linkId) {
        _output.set(this, _setConnection(_output.get(this), type, linkId));
      }
    }, {
      key: 'setInputConnection',
      value: function setInputConnection(type, linkId) {
        _input.set(this, _setConnection(_input.get(this), type, linkId));
      }
    }, {
      key: '_getConnections',
      value: function _getConnections(obj, type) {
        if (type) return !obj.hasOwnProperty(type) ? [] : obj[type];else return obj;
      }
    }, {
      key: 'getOutputConnections',
      value: function getOutputConnections(type) {
        return this._getConnections(_output.get(this), type);
      }
    }, {
      key: 'getInputConnections',
      value: function getInputConnections(type) {
        return this._getConnections(_input.get(this), type);
      }
    }, {
      key: '_removeConnection',
      value: function _removeConnection(obj, type, linkId) {
        if (obj.hasOwnProperty(type)) {
          obj[type] = Utils.removeObjectFromArray(obj[type], linkId);
        }
        return obj;
      }
    }, {
      key: 'removeOutputConnection',
      value: function removeOutputConnection(type, linkId) {
        _output.set(this, this._removeConnection(_output.get(this), type, linkId));
      }
    }, {
      key: 'removeInputConnection',
      value: function removeInputConnection(type, linkId) {
        _input.set(this, this._removeConnection(_input.get(this), type, linkId));
      }
    }, {
      key: 'removeChildrenFrom',
      value: function removeChildrenFrom(obj, key) {
        var _this = this;

        obj.filter(function (childId, index, arr) {
          _this.getRPGS().removeNode(key, childId);
          return true;
        });
      }
    }, {
      key: '_removeLinksFrom',
      value: function _removeLinksFrom(obj) {
        for (var type in obj) {
          if (obj.hasOwnProperty(type)) {
            removeChildrenFrom(obj[type], KEY_LINKS);
          }
        }
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        this._removeLinksFrom(_output.get(this));
        this._removeLinksFrom(_input.get(this));
        _rpgs.delete(this);
        _uuid.delete(this);
        _input.delete(this);
        _output.delete(this);
      }
    }]);

    return BaseObject;
  }();
}();
module.exports = BaseObject;

},{"./LinkType":10,"./Utils":11}],7:[function(require,module,exports){
"use strict";

var NODE_NOT_EXISTS = 0;
var CLASS_NOT_DEFINED = 1;
var CONNECTION_TO_ITSELF = 2;
var IMPROPER_CONNECTION = 3;
var OBJECT_NOT_FOUND = 4;
var MANDATORY_PARAM = 5;
var INCORRECT_TYPE = 6;
var INCORRECT_PARENT_NODE = 7;
var INCORRECT_LINK_TARGET = 8;
var INCOMPATIBLE_CHILD = 9;

exports.NODE_NOT_EXISTS = NODE_NOT_EXISTS;
exports.CLASS_NOT_DEFINED = CLASS_NOT_DEFINED;
exports.CONNECTION_TO_ITSELF = CONNECTION_TO_ITSELF;
exports.IMPROPER_CONNECTION = IMPROPER_CONNECTION;
exports.OBJECT_NOT_FOUND = OBJECT_NOT_FOUND;
exports.MANDATORY_PARAM = MANDATORY_PARAM;
exports.INCORRECT_TYPE = INCORRECT_TYPE;
exports.INCORRECT_PARENT_NODE = INCORRECT_PARENT_NODE;
exports.INCORRECT_LINK_TARGET = INCORRECT_LINK_TARGET;
exports.INCOMPATIBLE_CHILD = INCOMPATIBLE_CHILD;

},{}],8:[function(require,module,exports){
"use strict";

var _ErrorCode = require('./ErrorCode');

var _ErrorCode2 = _interopRequireDefault(_ErrorCode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ErrorHandler = function ErrorHandler(editor) {
  return {
    showMsg: function showMsg(errorCode, params) {
      var msg = '';
      switch (errorCode) {
        case _ErrorCode2.default.NODE_NOT_EXISTS:
          msg = 'Node of type ' + params.type + ' is not defined.';
          break;
        case _ErrorCode2.default.CLASS_NOT_DEFINED:
          msg = 'Class ' + params.class + ' is not defined.';
          break;
        case _ErrorCode2.default.CONNECTION_TO_ITSELF:
          msg = 'Cannot connect node "' + params.node + '" to itself.';
          break;
        case _ErrorCode2.default.IMPROPER_CONNECTION:
          msg = 'Cannot create connection of type "' + params.type + '" from node id "' + params.node1 + '" to node id "' + params.node2 + '".';
          break;
        case _ErrorCode2.default.OBJECT_NOT_FOUND:
          msg = 'Cannot find object with id "' + params.id + '"';
          break;
        case _ErrorCode2.default.MANDATORY_PARAM:
          msg = 'Parameter "' + params.param + '" was expected but instead got undefined.';
          break;
        case _ErrorCode2.default.INCORRECT_TYPE:
          msg = 'Wrong type of argument. Expected "' + params.type + '"';
          break;
        case _ErrorCode2.default.INCORRECT_PARENT_NODE:
          msg = 'Node of type "' + params.child + '" can be added only to "' + params.parent + '" node.';
          break;
        case _ErrorCode2.default.INCORRECT_LINK_TARGET:
          msg = 'Cannot create link connection to null node.';
          break;
        case _ErrorCode2.default.INCOMPATIBLE_CHILD:
          msg = 'Cannot add child of type "' + params.child + '" into parent of type "' + params.parent + '".';
          break;
        default:
          msg = 'Unknown error code passed: ' + errorCode;
      }
      if (editor) {
        editor.showMsg(msg);
      } else {
        throw new Error(msg);
        //add warning mode?
      }
    }
  };
};
module.exports = ErrorHandler;

},{"./ErrorCode":7}],9:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseObject2 = require("../core/BaseObject");

var _BaseObject3 = _interopRequireDefault(_BaseObject2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Link = function () {

  var _type = new WeakMap();
  var _linkOut = new WeakMap();
  var _linkInp = new WeakMap();

  return function (_BaseObject) {
    _inherits(Link, _BaseObject);

    function Link(data, rpgs) {
      _classCallCheck(this, Link);

      var _this = _possibleConstructorReturn(this, (Link.__proto__ || Object.getPrototypeOf(Link)).call(this, data, rpgs));

      _type.set(_this, data.type);
      _linkInp.set(_this, data.linkInp);
      _linkOut.set(_this, data.linkOut);
      return _this;
    }

    _createClass(Link, [{
      key: "getInp",
      value: function getInp() {
        return _linkInp.get(this);
      }
    }, {
      key: "getOut",
      value: function getOut() {
        return _linkOut.get(this);
      }
    }, {
      key: "getType",
      value: function getType() {
        return _type.get(this);
      }
    }, {
      key: "getData",
      value: function getData() {
        var data = _get(Link.prototype.__proto__ || Object.getPrototypeOf(Link.prototype), "getData", this).call(this);
        data.type = this.getType();
        data.linkInp = this.getInp();
        data.linkOut = this.getOut();
        return data;
      }
    }, {
      key: "setOutputConnection",
      value: function setOutputConnection(type, linkId) {}
    }, {
      key: "setInputConnection",
      value: function setInputConnection(type, linkId) {}
    }, {
      key: "getOutputConnections",
      value: function getOutputConnections(type) {}
    }, {
      key: "getInputConnections",
      value: function getInputConnections(type) {}
    }, {
      key: "removeOutputConnection",
      value: function removeOutputConnection(type, linkId) {}
    }, {
      key: "removeInputConnection",
      value: function removeInputConnection(type, linkId) {}
    }, {
      key: "dispose",
      value: function dispose() {
        var linkInp = this.getInp();
        var linkOut = this.getOut();
        var inpObj = this.getRPGS().findNode(linkInp);
        var outObj = this.getRPGS().findNode(linkOut);
        if (inpObj) inpObj.removeInputConnection(this.getType(), linkInp);
        if (outObj) outObj.removeOutputConnection(this.getType(), linkOut);
        _type.delete(this);
        _linkInp.delete(this);
        _linkOut.delete(this);
        _get(Link.prototype.__proto__ || Object.getPrototypeOf(Link.prototype), "dispose", this).call(this);
      }
    }]);

    return Link;
  }(_BaseObject3.default);
}();
module.exports = Link;

},{"../core/BaseObject":6}],10:[function(require,module,exports){
"use strict";

var REFERENCE = 'reference';
var VISIBILITY = 'visibility';
var ACTIVITY = 'activity';
var ACTION = 'action';
var GOTO = 'goto';
var DIALOG = 'dialog';

exports.REFERENCE = REFERENCE;
exports.VISIBILITY = VISIBILITY;
exports.ACTIVITY = ACTIVITY;
exports.ACTION = ACTION;
exports.GOTO = GOTO;
exports.DIALOG = DIALOG;

},{}],11:[function(require,module,exports){
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

exports.getObjectsByType = function (array, type) {
  var out = [];
  for (var i = 0; i < array.length; i++) {
    if (type.isPrototypeOf(array[i])) {
      out.push(array[i]);
    }
  }
  return out;
};

exports.removeObjectById = function (array, id) {
  var index = getIndexById(array, id);
  if (index !== -1) {
    var spliced = array.splice(index, 1);
    if (spliced.dispose) spliced.dispose();
  }
  return array;
};

exports.removeObjectFromArray = function (array, obj) {
  var index = indexOfObject(array, obj);
  if (index !== -1) {
    var spliced = array.splice(index, 1);
    if (spliced.dispose) spliced.dispose();
  }
  return array;
};

},{}],12:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseObject2 = require('../core/BaseObject');

var _BaseObject3 = _interopRequireDefault(_BaseObject2);

var _LinkType = require('../core/LinkType');

var _LinkType2 = _interopRequireDefault(_LinkType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Answer = function () {
  //Weak maps are new feature to JavaScript. We can store private
  //object properties in key/value pairs using our instance as the key,
  //and our class can capture those key/value maps in a closure.
  var _text = new WeakMap();

  return function (_BaseObject) {
    _inherits(Answer, _BaseObject);

    function Answer(data, rpgs) {
      _classCallCheck(this, Answer);

      var _this = _possibleConstructorReturn(this, (Answer.__proto__ || Object.getPrototypeOf(Answer)).call(this, data, rpgs));

      _text.set(_this, data ? data.text : '');
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
      key: 'getTalk',
      value: function getTalk() {
        var talks = getOutputConnections(_LinkType2.default.GOTO);
        return talks ? talks[0] : null;
      }
    }, {
      key: 'canCreateInputConnection',
      value: function canCreateInputConnection(type) {
        switch (type) {
          case _LinkType2.default.VISIBILITY:
            return this.getInputConnections(_LinkType2.default.VISIBILITY).length === 0;
          case _LinkType2.default.ACTIVITY:
            return this.getInputConnections(_LinkType2.default.ACTIVITY).length === 0;
          default:
            return false;
        }
      }
    }, {
      key: 'canCreateOutputConnection',
      value: function canCreateOutputConnection(type) {
        switch (type) {
          case _LinkType2.default.GOTO:
            return this.getOutputConnections(_LinkType2.default.GOTO).length === 0;
          default:
            return false;
        }
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        _text.delete(this);
        _get(Answer.prototype.__proto__ || Object.getPrototypeOf(Answer.prototype), 'dispose', this).call(this);
      }
    }]);

    return Answer;
  }(_BaseObject3.default);
}();
module.exports = Answer;

},{"../core/BaseObject":6,"../core/LinkType":10}],13:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseObject2 = require('../core/BaseObject');

var _BaseObject3 = _interopRequireDefault(_BaseObject2);

var _LinkType = require('../core/LinkType');

var _LinkType2 = _interopRequireDefault(_LinkType);

var _Utils = require('../core/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

var _Talk = require('./Talk');

var _Talk2 = _interopRequireDefault(_Talk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KEY_TALKS = 'talks';

var Dialog = function () {
  var _start = new WeakMap();
  var _talks = new WeakMap();

  return function (_BaseObject) {
    _inherits(Dialog, _BaseObject);

    function Dialog(data, rpgs) {
      _classCallCheck(this, Dialog);

      var _this = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this, data, rpgs));

      _start.set(_this, data ? data.startTalk : '');
      _talks.set(_this, data ? data.talks : []);
      return _this;
    }

    _createClass(Dialog, [{
      key: 'getData',
      value: function getData() {
        var data = _get(Dialog.prototype.__proto__ || Object.getPrototypeOf(Dialog.prototype), 'getData', this).call(this);
        data.startTalk = this.getStartTalk();
        //data.talks = this.getTalks();
        return data;
      }
    }, {
      key: 'canAddChild',
      value: function canAddChild(type) {
        return type === 'Talk';
      }
    }, {
      key: 'addChild',
      value: function addChild(childId) {}
    }, {
      key: 'removeChild',
      value: function removeChild(index) {}
    }, {
      key: 'getChild',
      value: function getChild(index) {
        return null;
      }
    }, {
      key: 'getChildren',
      value: function getChildren() {
        return [];
      }

      /*addTalk(talk) {
        this.getRPGS().addNode(KEY_TALKS,talk);
        _talks.set(this,talk.getId());
      }
        removeTalk(talkId) {
        this.getRPGS().removeNode(KEY_TALKS,talkId);
        _talks.set(this,Utils.removeObjectFromArray(_talks.get(this),talkId));
      }
        getTalk(talkId) {
        return this.getRPGS().getNode(KEY_TALKS,talkId);
      }
        getTalks() {
        return _talks.get(this);
      }*/

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
    }, {
      key: 'canCreateInputConnection',
      value: function canCreateInputConnection(type) {
        switch (type) {
          case _LinkType2.default.VISIBILITY:
            return this.getInputConnections(_LinkType2.default.VISIBILITY).length === 0;
          case _LinkType2.default.ACTIVITY:
            return this.getInputConnections(_LinkType2.default.ACTIVITY).length === 0;
          default:
            return false;
        }
      }
    }, {
      key: 'canCreateOutputConnection',
      value: function canCreateOutputConnection(type) {
        switch (type) {
          case _LinkType2.default.DIALOG:
            return true;
          default:
            return false;
        }
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        this.removeChildrenFrom(_talks.get(this), KEY_TALKS);
        _start.delete(this);
        _talks.delete(this);
        _get(Dialog.prototype.__proto__ || Object.getPrototypeOf(Dialog.prototype), 'dispose', this).call(this);
      }
    }]);

    return Dialog;
  }(_BaseObject3.default);
}();
module.exports = Dialog;

},{"../core/BaseObject":6,"../core/LinkType":10,"../core/Utils":11,"./Talk":14}],14:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Utils = require('../core/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

var _BaseObject2 = require('../core/BaseObject');

var _BaseObject3 = _interopRequireDefault(_BaseObject2);

var _LinkType = require('../core/LinkType');

var _LinkType2 = _interopRequireDefault(_LinkType);

var _Answer = require('./Answer');

var _Answer2 = _interopRequireDefault(_Answer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KEY_ANSWERS = 'answers';

var Talk = function () {

  var _text = new WeakMap();
  var _answers = new WeakMap();

  return function (_BaseObject) {
    _inherits(Talk, _BaseObject);

    function Talk(data, rpgs) {
      _classCallCheck(this, Talk);

      var _this = _possibleConstructorReturn(this, (Talk.__proto__ || Object.getPrototypeOf(Talk)).call(this, data, rpgs));

      _text.set(_this, data ? data.text : '');
      /*_answers.set(this,data ? data.answers.map((params) => {
        let answer = new Answer(params,rpgs);
        rpgs.addNode(KEY_ANSWERS,answer);
        return answer.getId();
      }):[]);*/
      _answers.set(_this, data ? data.answers : []);
      return _this;
    }

    _createClass(Talk, [{
      key: 'getData',
      value: function getData() {
        var data = _get(Talk.prototype.__proto__ || Object.getPrototypeOf(Talk.prototype), 'getData', this).call(this);
        data.text = this.getText();
        //data.answers = this.getAnswers();
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
      key: 'canAddChild',
      value: function canAddChild(type) {
        return type === 'Answer';
      }
    }, {
      key: 'addChild',
      value: function addChild(childId) {}
    }, {
      key: 'removeChild',
      value: function removeChild(index) {}
    }, {
      key: 'getChild',
      value: function getChild(index) {
        return null;
      }
    }, {
      key: 'getChildren',
      value: function getChildren() {
        return [];
      }

      /*addAnswer(answer) {
        this.getRPGS().addNode(KEY_ANSWERS,answer);
        _answers.set(this,answer.getId());
      }
        removeAnswer(answerId) {
        this.getRPGS().removeNode(KEY_ANSWERS,answerId);
        _answers.set(this,Utils.removeObjectFromArray(_answers.get(this),answerId));
      }
        getAnswer(answerId) {
        return this.getRPGS().getNode(KEY_ANSWERS,answerId);
      }
        getAnswers() {
        return _answers.get(this);
      }*/

    }, {
      key: 'canCreateInputConnection',
      value: function canCreateInputConnection(type) {
        switch (type) {
          case _LinkType2.default.GOTO:
            return true;
          default:
            return false;
        }
      }
    }, {
      key: 'setOutputConnection',
      value: function setOutputConnection(type, linkId) {}
    }, {
      key: 'getOutputConnections',
      value: function getOutputConnections(type) {}
    }, {
      key: 'removeOutputConnection',
      value: function removeOutputConnection(type, linkId) {}
    }, {
      key: 'dispose',
      value: function dispose() {
        this.removeChildrenFrom(_answers.get(this), KEY_ANSWERS);
        _text.delete(this);
        _answers.delete(this);
        _get(Talk.prototype.__proto__ || Object.getPrototypeOf(Talk.prototype), 'dispose', this).call(this);
      }
    }]);

    return Talk;
  }(_BaseObject3.default);
}();
module.exports = Talk;

},{"../core/BaseObject":6,"../core/LinkType":10,"../core/Utils":11,"./Answer":12}],15:[function(require,module,exports){
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

var KEY_TASKS = 'tasks';

var Quest = function () {
  var _title = new WeakMap();
  var _description = new WeakMap();
  var _status = new WeakMap();
  var _tasks = new WeakMap();

  return function (_BaseObject) {
    _inherits(Quest, _BaseObject);

    function Quest(data, rpgs) {
      _classCallCheck(this, Quest);

      var _this = _possibleConstructorReturn(this, (Quest.__proto__ || Object.getPrototypeOf(Quest)).call(this, data, rpgs));

      _title.set(_this, data ? data.title : '');
      _description.set(_this, data ? data.description : '');
      _status.set(_this, data ? data.status : _QuestStatus2.default.INCOMPLETE);
      _tasks.set(_this, data ? data.tasks.map(function (params) {
        var task = new _Task2.default(params, rpgs);
        rpgs.addNode(KEY_TASKS, task);
        return task.getId();
      }) : []);
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
        this.getRPGS().addNode(KEY_TASKS, task);
        _tasks.set(this, task.getId());
      }
    }, {
      key: 'removeTask',
      value: function removeTask(taskId) {
        this.getRPGS().removeNode(KEY_TASKS, taskId);
        _tasks.set(this, Utils.removeObjectFromArray(_tasks.get(this), taskId));
      }
    }, {
      key: 'getTask',
      value: function getTask(taskId) {
        return this.getRPGS().getNode(KEY_TASKS, taskId);
      }
    }, {
      key: 'getTasks',
      value: function getTasks() {
        var _this2 = this;

        return _tasks.get(this).map(function (a) {
          _this2.getRPGS().getNode(KEY_TASKS, a.getId());
        });
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
    }, {
      key: 'dispose',
      value: function dispose() {
        this.removeChildrenFrom(_tasks.get(this), KEY_TASKS);
        _title.delete(this);
        _description.delete(this);
        _status.delete(this);
        _tasks.delete(this);
      }
    }]);

    return Quest;
  }(_BaseObject3.default);
}();
module.exports = Quest;

},{"../core/BaseObject":6,"./QuestStatus":16,"./Task":17}],16:[function(require,module,exports){
"use strict";

var INCOMPLETE = 'questIncomplete';
var COMPLETED = 'questCompleted';
var FAILED = 'questFailed';

exports.INCOMPLETE = INCOMPLETE;
exports.COMPLETED = COMPLETED;
exports.FAILED = FAILED;

},{}],17:[function(require,module,exports){
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

},{"../core/BaseObject":6}],18:[function(require,module,exports){
"use strict";

var _data = require('../data/data.json');

var _data2 = _interopRequireDefault(_data);

var _RPGSystem = require('./rpgs/RPGSystem');

var _RPGSystem2 = _interopRequireDefault(_RPGSystem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function ($, window, document, undefined) {
  $(function () {
    //console.log(data);
    //let rpgs = new RPGSystem(data);
    //console.log(rpgs.serializeData());
    var rpgs = new _RPGSystem2.default();
    rpgs.addActor('act1', { name: 'Adam' }).inp('dialog', 'dlg1')
    //.addCondition('cond1',{code:`return true;`}).out('visibility','tlk0ans1');
    .addDialog('dlg1', { startTalk: 'tlk0' }).out('dialog', 'act1').addTalk('tlk0', { text: 'This is talk 0.' }).addAnswer('tlk0ans1', { text: 'Answer1' }).out('goto', 'tlk1').inp('visibility', 'cond1').addAnswer('tlk0ans2', { text: 'Answer2' }).out('goto', 'tlk2').addAnswer('tlk0ans3', { text: 'Answer3' }).out('goto', 'tlk3').addTalk('tlk1', { text: 'This is talk 1.' }).inp('goto', 'tlk0ans1').addAnswer('tlk1ans1', { text: 'Answer1' }).addTalk('tlk2', { text: 'This is talk 2.' }).inp('goto', 'tlk0ans2').addAnswer('tlk2ans1', { text: 'Answer1' }).addTalk('tlk3', { text: 'This is talk 3.' }).inp('goto', 'tlk0ans3').addAnswer('tlk3ans1', { text: 'Answer1' });
    console.log(rpgs.serializeData());
  });
})(jQuery, window, document);

},{"../data/data.json":2,"./rpgs/RPGSystem":3}]},{},[18])

