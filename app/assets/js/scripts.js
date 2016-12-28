(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict'

module.exports = {
  compileCode,
  compileExpression,
  expose,
  hide
}

let globalObj
if (typeof window !== 'undefined') globalObj = window // eslint-disable-line
else if (typeof global !== 'undefined') globalObj = global // eslint-disable-line
else if (typeof self !== 'undefined') globalObj = self // eslint-disable-line
globalObj.$nxCompileToSandbox = toSandbox
globalObj.$nxCompileCreateBackup = createBackup

const proxies = new WeakMap()
const expressionCache = new Map()
const codeCache = new Map()
const globals = new Set()
const handlers = {has}

function compileExpression (src) {
  if (typeof src !== 'string') {
    throw new TypeError('first argument must be a string')
  }
  let expression = expressionCache.get(src)
  if (!expression) {
    expression = new Function('context', // eslint-disable-line
      `const sandbox = $nxCompileToSandbox(context)
      try { with (sandbox) { return ${src} } } catch (err) {
        if (!(err instanceof TypeError)) throw err
      }`)
    expressionCache.set(src, expression)
  }
  return expression
}

function compileCode (src) {
  if (typeof src !== 'string') {
    throw new TypeError('first argument must be a string')
  }
  let code = codeCache.get(src)
  if (!code) {
    code = new Function('context', 'tempVars', // eslint-disable-line
    `const backup = $nxCompileCreateBackup(context, tempVars)
    Object.assign(context, tempVars)
    const sandbox = $nxCompileToSandbox(context)
    try {
      with (sandbox) { ${src} }
    } finally {
      Object.assign(context, backup)
    }`)
    codeCache.set(src, code)
  }
  return code
}

function expose (...globalNames) {
  for (let globalName of globalNames) {
    globals.add(globalName)
  }
}

function hide (...globalNames) {
  for (let globalName of globalNames) {
    globals.delete(globalName)
  }
}

function toSandbox (obj) {
  if (typeof obj !== 'object') {
    throw new TypeError('first argument must be an object')
  }
  let sandbox = proxies.get(obj)
  if (!sandbox) {
    sandbox = new Proxy(obj, handlers)
    proxies.set(obj, sandbox)
  }
  return sandbox
}

function createBackup (context, tempVars) {
  if (typeof tempVars === 'object') {
    const backup = {}
    for (let key of Object.keys(tempVars)) {
      backup[key] = context[key]
    }
    return backup
  }
}

function has (target, key) {
  return globals.has(key) ? Reflect.has(target, key) : true
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],2:[function(require,module,exports){
module.exports={
    "actors":[ {
        "class":"ActorNode",
        "uuid":"act1",
        "input": {
            "dialog": ["4fd7ea56-94c3-4949-ba71-f9f6ecb7ef9e"]
        }
        ,
        "name":"Adam"
    }
    ],
    "conditions":[ {
        "class":"ConditionNode",
        "uuid":"cond1",
        "output": {
            "visibility": ["a086a9cb-3aaa-4cdb-abcc-9955c54673db"]
        }
        ,
        "label":"",
        "code":"\n        (function(){\n          alert(\"Condition test!\");\n          //return true;\n        })();\n      "
    }
    ],
    "dialogs":[ {
        "class":"DialogNode",
        "uuid":"dlg1",
        "input": {}
        ,
        "output": {
            "dialog": ["4fd7ea56-94c3-4949-ba71-f9f6ecb7ef9e"]
        }
        ,
        "children":["tlk0",
        "tlk1",
        "tlk2",
        "tlk3"],
        "startTalk":"tlk0"
    }
    ],
    "links":[ {
        "class": "LinkNode", "uuid": "4fd7ea56-94c3-4949-ba71-f9f6ecb7ef9e", "input": "act1", "output": "dlg1", "type": "dialog"
    }
    ,
    {
        "class": "LinkNode", "uuid": "a086a9cb-3aaa-4cdb-abcc-9955c54673db", "input": "tlk0ans1", "output": "cond1", "type": "visibility"
    }
    ,
    {
        "class": "LinkNode", "uuid": "e52ed77b-515b-4c15-9d50-d43fca635b48", "input": "tlk1", "output": "tlk0ans1", "type": "goto"
    }
    ,
    {
        "class": "LinkNode", "uuid": "c09982b8-5f1f-47c5-b05d-e2ec56187216", "input": "tlk2", "output": "tlk0ans2", "type": "goto"
    }
    ,
    {
        "class": "LinkNode", "uuid": "3d66f4f8-dcd8-486c-bf8d-433531f108b1", "input": "tlk3", "output": "tlk0ans3", "type": "goto"
    }
    ],
    "talks":[ {
        "class":"TalkNode",
        "uuid":"tlk0",
        "input": {}
        ,
        "children": ["tlk0ans1", "tlk0ans2", "tlk0ans3"], "text": "This is talk 0."
    }
    ,
    {
        "class":"TalkNode",
        "uuid":"tlk1",
        "input": {
            "goto": ["e52ed77b-515b-4c15-9d50-d43fca635b48"]
        }
        ,
        "children":["tlk1ans1"],
        "text":"This is talk 1."
    }
    ,
    {
        "class":"TalkNode",
        "uuid":"tlk2",
        "input": {
            "goto": ["c09982b8-5f1f-47c5-b05d-e2ec56187216"]
        }
        ,
        "children":["tlk2ans1"],
        "text":"This is talk 2."
    }
    ,
    {
        "class":"TalkNode",
        "uuid":"tlk3",
        "input": {
            "goto": ["3d66f4f8-dcd8-486c-bf8d-433531f108b1"]
        }
        ,
        "children":["tlk3ans1"],
        "text":"This is talk 3."
    }
    ],
    "answers":[ {
        "class":"AnswerNode",
        "uuid":"tlk0ans1",
        "input": {
            "visibility": ["a086a9cb-3aaa-4cdb-abcc-9955c54673db"]
        }
        ,
        "output": {
            "goto": ["e52ed77b-515b-4c15-9d50-d43fca635b48"]
        }
        ,
        "text":"Answer1"
    }
    ,
    {
        "class":"AnswerNode",
        "uuid":"tlk0ans2",
        "input": {}
        ,
        "output": {
            "goto": ["c09982b8-5f1f-47c5-b05d-e2ec56187216"]
        }
        ,
        "text":"Answer2"
    }
    ,
    {
        "class":"AnswerNode",
        "uuid":"tlk0ans3",
        "input": {}
        ,
        "output": {
            "goto": ["3d66f4f8-dcd8-486c-bf8d-433531f108b1"]
        }
        ,
        "text":"Answer3"
    }
    ,
    {
        "class":"AnswerNode",
        "uuid":"tlk1ans1",
        "input": {}
        ,
        "output": {}
        ,
        "text": "Answer1"
    }
    ,
    {
        "class":"AnswerNode",
        "uuid":"tlk2ans1",
        "input": {}
        ,
        "output": {}
        ,
        "text": "Answer1"
    }
    ,
    {
        "class":"AnswerNode",
        "uuid":"tlk3ans1",
        "input": {}
        ,
        "output": {}
        ,
        "text": "Answer1"
    }
    ]
}

},{}],3:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
//import InventoryNode  from './actors/InventoryNode';


var _Utils = require('./core/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

var _ErrorHandler = require('./core/ErrorHandler');

var _ErrorHandler2 = _interopRequireDefault(_ErrorHandler);

var _ErrorCode = require('./core/ErrorCode');

var _ErrorCode2 = _interopRequireDefault(_ErrorCode);

var _BaseNode = require('./core/BaseNode');

var _BaseNode2 = _interopRequireDefault(_BaseNode);

var _LinkNode = require('./core/LinkNode');

var _LinkNode2 = _interopRequireDefault(_LinkNode);

var _ActorNode = require('./actors/ActorNode');

var _ActorNode2 = _interopRequireDefault(_ActorNode);

var _ScriptNode = require('./logic/ScriptNode');

var _ScriptNode2 = _interopRequireDefault(_ScriptNode);

var _AnswerNode = require('./dialogs/AnswerNode');

var _AnswerNode2 = _interopRequireDefault(_AnswerNode);

var _DialogNode = require('./dialogs/DialogNode');

var _DialogNode2 = _interopRequireDefault(_DialogNode);

var _TalkNode = require('./dialogs/TalkNode');

var _TalkNode2 = _interopRequireDefault(_TalkNode);

var _QuestNode = require('./quests/QuestNode');

var _QuestNode2 = _interopRequireDefault(_QuestNode);

var _TaskNode = require('./quests/TaskNode');

var _TaskNode2 = _interopRequireDefault(_TaskNode);

var _VariableNode = require('./variables/VariableNode');

var _VariableNode2 = _interopRequireDefault(_VariableNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KEY_ACTORS = 'actors';
var KEY_ANSWERS = 'answers';
var KEY_LOGIC = 'logic';
var KEY_DIALOGS = 'dialogs';
var KEY_LINKS = 'links';
var KEY_SCRIPTS = 'scripts';
var KEY_TALKS = 'talks';
var KEY_TASKS = 'tasks';
var KEY_QUESTS = 'quests';
var KEY_VARIABLES = 'variables';

var RPGSystem = function RPGSystem(data, editor) {
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
        return _nodeFactory(d, _self);
      });
    }
  }

  function _nodeFactory(data, rpgs) {
    var className = data.class;
    switch (className) {
      case 'ActorNode':
        return new _ActorNode2.default(data, rpgs);
      case 'ScriptNode':
        return new _ScriptNode2.default(data, rpgs);
      case 'AnswerNode':
        return new _AnswerNode2.default(data, rpgs);
      case 'DialogNode':
        return new _DialogNode2.default(data, rpgs);
      case 'TalkNode':
        return new _TalkNode2.default(data, rpgs);
      case 'QuestNode':
        return new _QuestNode2.default(data, rpgs);
      case 'TaskNode':
        return new _TaskNode2.default(data, rpgs);
      case 'LinkNode':
        return new _LinkNode2.default(data, rpgs);
      case 'VariableNode':
        return new _VariableNode2.default(data, rpgs);
      default:
        _errorHandler.showMsg(_ErrorCode2.default.CLASS_NOT_DEFINED, { class: className });
        return null;
    }
  }

  function _findNodeInArray(array, id) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].getId() === id) return array[i];
    }
    return null;
  }

  var _findNode = function _findNode(objId) {
    for (var key in _objectPool) {
      if (_objectPool.hasOwnProperty(key)) {
        var obj = _findNodeInArray(_objectPool[key], objId);
        if (obj !== null) return obj;
      }
    }
    //Is error message neccessary here? To consider.
    //_errorHandler.showMsg(ErrorCode.OBJECT_NOT_FOUND,{id:objId});
    return null;
  },
      _getNode = function _getNode(key, objId) {
    var obj = _findNodeInArray(_objectPool[key], objId);
    return obj;
  },
      _addNode = function _addNode(key, obj) {
    if (!_objectPool[key]) _objectPool[key] = [];
    _objectPool[key].push(obj);
  },
      _removeNode = function _removeNode(id) {
    for (var key in _objectPool) {
      if (_objectPool.hasOwnProperty(key)) {
        if (this._removeNodeByKey(key, id)) return true;
      }
    }
    return false;
  },
      _removeNodeByKey = function _removeNodeByKey(key, id) {
    var index = _Utils2.default.getIndexById(_objectPool[key], id);
    var isNodeFound = index > -1;
    if (isNodeFound) {
      var node = _objectPool[key].splice(index, 1)[0];
      node.dispose();
    }
    return isNodeFound;
  },
      _setConnection = function _setConnection(type, nodeId1, nodeId2) {
    if (nodeId1 === nodeId2) {
      _errorHandler.showMsg(_ErrorCode2.default.CONNECTION_TO_ITSELF, { node: nodeId1 });
      return false;
    }
    var node1 = _findNode(nodeId1);
    var node2 = _findNode(nodeId2);
    if (node1 === null || node2 === null) return;
    if (node1.canCreateOutputConnection(type) && node2.canCreateInputConnection(type)) {
      var link = new _LinkNode2.default({ type: type, output: nodeId1, input: nodeId2 });
      var linkId = link.getId();
      _addNode(KEY_LINKS, link);
      node1.setOutputConnection(type, linkId);
      node2.setInputConnection(type, linkId);
      return linkId;
    } else {
      _errorHandler.showMsg(_ErrorCode2.default.IMPROPER_CONNECTION, {
        type: type,
        node1: nodeId1,
        node2: nodeId2
      });
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
    this._removeNodeByKey(KEY_LINKS, linkId);
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
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _errorHandler.showMsg(_ErrorCode2.default.MANDATORY_PARAM, { param: 'id' });
    var params = arguments[1];

    if (typeof id !== 'string') {
      _errorHandler.showMsg(_ErrorCode2.default.INCORRECT_TYPE, { type: 'string' });
    }
    if (params !== undefined && (typeof params === 'undefined' ? 'undefined' : _typeof(params)) !== 'object') {
      _errorHandler.showMsg(_ErrorCode2.default.INCORRECT_TYPE, { type: 'object' });
    } else if (params === undefined) {
      params = {};
    }
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
      //If last added child was not null then we must check additional conditions.
      if (_lastChild !== null) {
        //If constructor name of previous child node, is equal to name of class,
        //whose we try to create, it means node should be added to current parent.
        if (_lastChild.constructor.name === className) {
          createChildNode(params);
        }
        //If names of constructors not match, then we must check if new node
        //can be added as child to our previous child.
        else if (_lastChild.canAddChild(className)) {
            _parentHistory.unshift(_lastChild);
            createChildNode(params);
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
          createChildNode(params);
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
      var node = _nodeFactory(params, _self);
      _parentHistory = [node];
      _addNode(storage, node);
    }

    function createChildNode(nodeParams) {
      //We create a new node, and then set as the last child.
      _lastChild = _nodeFactory(nodeParams, _self);
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
    this._removeNodeByKey(key, id);
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
    //First we must check whether our method is called on node.
    if (_lastChild !== null) {
      node = _lastChild;
    } else if (_parentHistory[0] !== undefined) {
      node = _parentHistory[0];
    }
    //If our last node is not null, we can proceed further.
    if (node !== null) {
      //Our next task is to iterate through an array of "half links". This step
      //is necessary to find out whether we should create another "half link"
      //or complete LinkNode. We are looking for the opposite side of the link.
      for (var i = 0; i < _halfLinks[endSide].length; i++) {
        var link = _halfLinks[endSide][i];
        if (link.type === type && link.id === node.getId()) {
          opposite = _halfLinks[endSide].splice(i, 1)[0];
          break;
        }
      }
      //If opposite side is not available, it means we should create "half link".
      if (opposite === null) {
        _halfLinks[startSide].push({ type: type, id: id });
      }
      //Otherwise we create LinkNode.
      else {
          //Method "_setConnection" always create links in defined direction
          //starting from input side to output side, so is it important to
          //pass parameters in proper manner.
          if (startSide === 'inp') {
            _setConnection(type, id, opposite.id);
          } else {
            _setConnection(type, opposite.id, id);
          }
        }
    }
    //Else if a node is null then it means that method was called on
    //an incorrect target.
    else {
        _errorHandler.showMsg(_ErrorCode2.default.INCORRECT_LINK_TARGET);
      }
  }

  var _addActor = function _addActor(id, params) {
    _chainNodeCreator(id, params, false, 'ActorNode', KEY_ACTORS);
    return this;
  },
      _removeActor = function _removeActor(actorId) {
    _chainNodeRemover(actorId, KEY_ACTORS);
    return this;
  },
      _addQuest = function _addQuest(id, params) {
    _chainNodeCreator(id, params, false, 'QuestNode', KEY_QUESTS);
    return this;
  },
      _removeQuest = function _removeQuest(questId) {
    _chainNodeRemover(questId, KEY_QUESTS);
    return this;
  },
      _addDialog = function _addDialog(id, params) {
    _chainNodeCreator(id, params, false, 'DialogNode', KEY_DIALOGS);
    return this;
  },
      _removeDialog = function _removeDialog(dialogId) {
    _chainNodeRemover(dialogId, KEY_DIALOGS);
    return this;
  },
      _addCondition = function _addCondition(id, params) {
    _chainNodeCreator(id, params, false, 'ScriptNode', KEY_LOGIC);
    return this;
  },
      _removeCondition = function _removeCondition(conditionId) {
    _chainNodeRemover(conditionId, KEY_LOGIC);
    return this;
  },
      _addVariable = function _addVariable(id, params) {
    _chainNodeCreator(id, params, false, 'VariableNode', KEY_VARIABLES);
    return this;
  },
      _removeVariable = function _removeVariable(variableId) {
    _chainNodeRemover(variableId, KEY_VARIABLES);
    return this;
  },
      _addTalk = function _addTalk(id, params) {
    _chainNodeCreator(id, params, true, 'TalkNode', KEY_TALKS);
    return this;
  },
      _removeTalk = function _removeTalk(id) {
    _chainNodeRemover(id, KEY_TALKS);
    return this;
  },
      _addAnswer = function _addAnswer(id, params) {
    _chainNodeCreator(id, params, true, 'AnswerNode', KEY_ANSWERS);
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
    return _getNode(KEY_LOGIC, conditionId);
  },
      _getConditions = function _getConditions() {
    return _objectPool[KEY_LOGIC];
  },
      _getDialog = function _getDialog(dialogId) {
    return _getNode(KEY_DIALOGS, dialogId);
  },
      _getDialogs = function _getDialogs() {
    return _objectPool[KEY_DIALOGS];
  },
      _getQuest = function _getQuest(questId) {
    return _getNode(KEY_QUESTS, questId);
  },
      _getQuests = function _getQuests() {
    return _objectPool[KEY_QUESTS];
  },
      _getVariable = function _getVariable(variableId) {
    return _getNode(KEY_VARIABLES, variableId);
  },
      _getVariables = function _getVariables() {
    return _objectPool[KEY_VARIABLES];
  },


  ////////////////////////////////////////////////////////////////
  //MISCALINEUS
  ////////////////////////////////////////////////////////////////

  _setVar = function _setVar(variableId, value) {
    var _var = _getVariable(variableId);
    if (_var !== null) _var.setValue(value);
  },
      _getVar = function _getVar(variableId) {
    var _var = _getVariable(variableId);
    return _var !== null ? _var.getValue() : undefined;
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

  var _self = {
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
    setVar: _setVar,
    getVar: _getVar,
    serializeData: _serializeData
  };
  return _self;
};
module.exports = RPGSystem;

},{"./actors/ActorNode":4,"./core/BaseNode":5,"./core/ErrorCode":7,"./core/ErrorHandler":8,"./core/LinkNode":9,"./core/Utils":11,"./dialogs/AnswerNode":12,"./dialogs/DialogNode":13,"./dialogs/TalkNode":14,"./logic/ScriptNode":15,"./quests/QuestNode":16,"./quests/TaskNode":18,"./variables/VariableNode":19}],4:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseNode2 = require('../core/BaseNode');

var _BaseNode3 = _interopRequireDefault(_BaseNode2);

var _LinkType = require('../core/LinkType');

var _LinkType2 = _interopRequireDefault(_LinkType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ActorNode = function () {
  //Weak maps are new feature to JavaScript. We can store private
  //object properties in key/value pairs using our instance as the key,
  //and our class can capture those key/value maps in a closure.
  var _name = new WeakMap();
  var _dialog = new WeakMap();
  //let _inventory = new WeakMap();


  return function (_BaseNode) {
    _inherits(ActorNode, _BaseNode);

    function ActorNode(data) {
      _classCallCheck(this, ActorNode);

      var _this = _possibleConstructorReturn(this, (ActorNode.__proto__ || Object.getPrototypeOf(ActorNode)).call(this, data));

      _name.set(_this, data ? data.name : '');
      _dialog.set(_this, data ? data.dialog : '');
      //_inventory.set(this,data.inventory ? );
      return _this;
    }

    _createClass(ActorNode, [{
      key: 'getData',
      value: function getData() {
        var data = _get(ActorNode.prototype.__proto__ || Object.getPrototypeOf(ActorNode.prototype), 'getData', this).call(this);
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
        _get(ActorNode.prototype.__proto__ || Object.getPrototypeOf(ActorNode.prototype), 'dispose', this).call(this);
      }
    }]);

    return ActorNode;
  }(_BaseNode3.default);
}();

module.exports = ActorNode;

},{"../core/BaseNode":5,"../core/LinkType":10}],5:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Utils = require('./Utils');

var _LinkType = require('./LinkType');

var _LinkType2 = _interopRequireDefault(_LinkType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KEY_LINKS = 'links';
var KEY_LOGIC = 'logic';

var BaseNode = function () {
  //Weak maps are new feature to JavaScript. We can store private
  //object properties in key/value pairs using our instance as the key,
  //and our class can capture those key/value maps in a closure.
  var _rpgs = new WeakMap();
  var _uuid = new WeakMap();
  var _input = new WeakMap();
  var _output = new WeakMap();

  return function () {
    function BaseNode(data, rpgs) {
      _classCallCheck(this, BaseNode);

      _rpgs.set(this, rpgs);
      //If uuid not present, then by default we assign Universally Unique ID.
      _uuid.set(this, data.uuid ? data.uuid : _Utils.UUID.generate());
      _input.set(this, data.input ? data.input : {});
      _output.set(this, data.output ? data.output : {});
    }

    _createClass(BaseNode, [{
      key: 'getRPGS',
      value: function getRPGS() {
        return _rpgs.get(this);
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
        var condition = this.getRPGS().getNode(KEY_LOGIC, conditionId);
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
      key: '_removeChildren',
      value: function _removeChildren(key) {}
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
        _output.set(this, this._setConnection(_output.get(this), type, linkId));
      }
    }, {
      key: 'setInputConnection',
      value: function setInputConnection(type, linkId) {
        _input.set(this, this._setConnection(_input.get(this), type, linkId));
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

    return BaseNode;
  }();
}();
module.exports = BaseNode;

},{"./LinkType":10,"./Utils":11}],6:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseNode2 = require('../core/BaseNode');

var _BaseNode3 = _interopRequireDefault(_BaseNode2);

var _Utils = require('../core/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CompoundNode = function () {
  var _children = new WeakMap();

  return function (_BaseNode) {
    _inherits(CompoundNode, _BaseNode);

    function CompoundNode(data, rpgs) {
      _classCallCheck(this, CompoundNode);

      var _this = _possibleConstructorReturn(this, (CompoundNode.__proto__ || Object.getPrototypeOf(CompoundNode)).call(this, data, rpgs));

      _children.set(_this, data.children ? data.children : []);
      return _this;
    }

    _createClass(CompoundNode, [{
      key: 'getData',
      value: function getData() {
        var data = _get(CompoundNode.prototype.__proto__ || Object.getPrototypeOf(CompoundNode.prototype), 'getData', this).call(this);
        data.children = this.getChildren();
        return data;
      }
    }, {
      key: 'addChild',
      value: function addChild(childId) {
        var children = _children.get(this);
        _children.set(this, _Utils2.default.addObjectToArray(children, childId));
      }
    }, {
      key: 'removeChild',
      value: function removeChild(index) {
        var children = _children.get(this);
        _children.set(this, children.splice(index, 1));
      }
    }, {
      key: 'getChild',
      value: function getChild(index) {
        var children = _children.get(this);
        return children.length > index ? children[index] : null;
      }
    }, {
      key: 'getChildren',
      value: function getChildren() {
        return _children.get(this);
      }
    }, {
      key: '_removeChildren',
      value: function _removeChildren(key) {
        this.removeChildrenFrom(_children.get(this), key);
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        _children.delete(this);
        _get(CompoundNode.prototype.__proto__ || Object.getPrototypeOf(CompoundNode.prototype), 'dispose', this).call(this);
      }
    }]);

    return CompoundNode;
  }(_BaseNode3.default);
}();
module.exports = CompoundNode;

},{"../core/BaseNode":5,"../core/Utils":11}],7:[function(require,module,exports){
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

var _BaseNode2 = require('../core/BaseNode');

var _BaseNode3 = _interopRequireDefault(_BaseNode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LinkNode = function () {

  var _type = new WeakMap();
  var _output = new WeakMap();
  var _input = new WeakMap();

  return function (_BaseNode) {
    _inherits(LinkNode, _BaseNode);

    function LinkNode(data, rpgs) {
      _classCallCheck(this, LinkNode);

      var _this = _possibleConstructorReturn(this, (LinkNode.__proto__ || Object.getPrototypeOf(LinkNode)).call(this, data, rpgs));

      _type.set(_this, data.type);
      _input.set(_this, data.input ? data.input : '');
      _output.set(_this, data.output ? data.output : '');
      return _this;
    }

    _createClass(LinkNode, [{
      key: 'getInp',
      value: function getInp() {
        return _input.get(this);
      }
    }, {
      key: 'getOut',
      value: function getOut() {
        return _output.get(this);
      }
    }, {
      key: 'getType',
      value: function getType() {
        return _type.get(this);
      }
    }, {
      key: 'getData',
      value: function getData() {
        var data = _get(LinkNode.prototype.__proto__ || Object.getPrototypeOf(LinkNode.prototype), 'getData', this).call(this);
        data.type = this.getType();
        data.input = this.getInp();
        data.output = this.getOut();
        return data;
      }
    }, {
      key: 'setOutputConnection',
      value: function setOutputConnection(type, linkId) {}
    }, {
      key: 'setInputConnection',
      value: function setInputConnection(type, linkId) {}
    }, {
      key: 'getOutputConnections',
      value: function getOutputConnections(type) {}
    }, {
      key: 'getInputConnections',
      value: function getInputConnections(type) {}
    }, {
      key: 'removeOutputConnection',
      value: function removeOutputConnection(type, linkId) {}
    }, {
      key: 'removeInputConnection',
      value: function removeInputConnection(type, linkId) {}
    }, {
      key: 'dispose',
      value: function dispose() {
        var linkInp = this.getInp();
        var linkOut = this.getOut();
        var inpObj = this.getRPGS().findNode(linkInp);
        var outObj = this.getRPGS().findNode(linkOut);
        if (inpObj) inpObj.removeInputConnection(this.getType(), linkInp);
        if (outObj) outObj.removeOutputConnection(this.getType(), linkOut);
        _type.delete(this);
        _input.delete(this);
        _output.delete(this);
        _get(LinkNode.prototype.__proto__ || Object.getPrototypeOf(LinkNode.prototype), 'dispose', this).call(this);
      }
    }]);

    return LinkNode;
  }(_BaseNode3.default);
}();
module.exports = LinkNode;

},{"../core/BaseNode":5}],10:[function(require,module,exports){
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

/*exports.removeObjectById = function(array,id) {
  let index = getIndexById(array,id);
  if(index !== -1) {
    let spliced = array.splice(index,1);
    if(spliced.dispose) spliced.dispose();
  }
  return array;
}*/

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

var _BaseNode2 = require('../core/BaseNode');

var _BaseNode3 = _interopRequireDefault(_BaseNode2);

var _LinkType = require('../core/LinkType');

var _LinkType2 = _interopRequireDefault(_LinkType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AnswerNode = function () {
  //Weak maps are new feature to JavaScript. We can store private
  //object properties in key/value pairs using our instance as the key,
  //and our class can capture those key/value maps in a closure.
  var _text = new WeakMap();

  return function (_BaseNode) {
    _inherits(AnswerNode, _BaseNode);

    function AnswerNode(data, rpgs) {
      _classCallCheck(this, AnswerNode);

      var _this = _possibleConstructorReturn(this, (AnswerNode.__proto__ || Object.getPrototypeOf(AnswerNode)).call(this, data, rpgs));

      _text.set(_this, data.text ? data.text : '');
      return _this;
    }

    _createClass(AnswerNode, [{
      key: 'getData',
      value: function getData() {
        var data = _get(AnswerNode.prototype.__proto__ || Object.getPrototypeOf(AnswerNode.prototype), 'getData', this).call(this);
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
        _get(AnswerNode.prototype.__proto__ || Object.getPrototypeOf(AnswerNode.prototype), 'dispose', this).call(this);
      }
    }]);

    return AnswerNode;
  }(_BaseNode3.default);
}();
module.exports = AnswerNode;

},{"../core/BaseNode":5,"../core/LinkType":10}],13:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _CompoundNode2 = require('../core/CompoundNode');

var _CompoundNode3 = _interopRequireDefault(_CompoundNode2);

var _LinkType = require('../core/LinkType');

var _LinkType2 = _interopRequireDefault(_LinkType);

var _Utils = require('../core/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KEY_TALKS = 'talks';

var DialogNode = function () {
  var _start = new WeakMap();

  return function (_CompoundNode) {
    _inherits(DialogNode, _CompoundNode);

    function DialogNode(data, rpgs) {
      _classCallCheck(this, DialogNode);

      var _this = _possibleConstructorReturn(this, (DialogNode.__proto__ || Object.getPrototypeOf(DialogNode)).call(this, data, rpgs));

      _start.set(_this, data.startTalk ? data.startTalk : '');
      return _this;
    }

    _createClass(DialogNode, [{
      key: 'getData',
      value: function getData() {
        var data = _get(DialogNode.prototype.__proto__ || Object.getPrototypeOf(DialogNode.prototype), 'getData', this).call(this);
        data.startTalk = this.getStartTalk();
        return data;
      }
    }, {
      key: 'canAddChild',
      value: function canAddChild(type) {
        return type === 'TalkNode';
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
        this._removeChildren(KEY_TALKS);
        _start.delete(this);
        _get(DialogNode.prototype.__proto__ || Object.getPrototypeOf(DialogNode.prototype), 'dispose', this).call(this);
      }
    }]);

    return DialogNode;
  }(_CompoundNode3.default);
}();
module.exports = DialogNode;

},{"../core/CompoundNode":6,"../core/LinkType":10,"../core/Utils":11}],14:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Utils = require('../core/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

var _CompoundNode2 = require('../core/CompoundNode');

var _CompoundNode3 = _interopRequireDefault(_CompoundNode2);

var _LinkType = require('../core/LinkType');

var _LinkType2 = _interopRequireDefault(_LinkType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KEY_ANSWERS = 'answers';

var TalkNode = function () {

  var _text = new WeakMap();

  return function (_CompoundNode) {
    _inherits(TalkNode, _CompoundNode);

    function TalkNode(data, rpgs) {
      _classCallCheck(this, TalkNode);

      var _this = _possibleConstructorReturn(this, (TalkNode.__proto__ || Object.getPrototypeOf(TalkNode)).call(this, data, rpgs));

      _text.set(_this, data.text ? data.text : '');
      return _this;
    }

    _createClass(TalkNode, [{
      key: 'getData',
      value: function getData() {
        var data = _get(TalkNode.prototype.__proto__ || Object.getPrototypeOf(TalkNode.prototype), 'getData', this).call(this);
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
      key: 'canAddChild',
      value: function canAddChild(type) {
        return type === 'AnswerNode';
      }
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
        this._removeChildren(KEY_ANSWERS);
        _text.delete(this);
        _get(TalkNode.prototype.__proto__ || Object.getPrototypeOf(TalkNode.prototype), 'dispose', this).call(this);
      }
    }]);

    return TalkNode;
  }(_CompoundNode3.default);
}();
module.exports = TalkNode;

},{"../core/CompoundNode":6,"../core/LinkType":10,"../core/Utils":11}],15:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseNode2 = require('../core/BaseNode');

var _BaseNode3 = _interopRequireDefault(_BaseNode2);

var _LinkType = require('../core/LinkType');

var _LinkType2 = _interopRequireDefault(_LinkType);

var _nxCompile = require('@risingstack/nx-compile');

var _nxCompile2 = _interopRequireDefault(_nxCompile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScriptNode = function () {
  var _label = new WeakMap();
  var _script = new WeakMap();
  var _compiled = new WeakMap();

  return function (_BaseNode) {
    _inherits(ScriptNode, _BaseNode);

    function ScriptNode(data, rpgs) {
      _classCallCheck(this, ScriptNode);

      var _this = _possibleConstructorReturn(this, (ScriptNode.__proto__ || Object.getPrototypeOf(ScriptNode)).call(this, data, rpgs));

      _label.set(_this, data.label ? data.label : '');
      _script.set(_this, data.script ? data.script : 'return true;');
      _nxCompile2.default.expose('console');
      _compiled.set(_this, _nxCompile2.default.compileCode(_script.get(_this)));
      return _this;
    }

    _createClass(ScriptNode, [{
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
      key: 'setScript',
      value: function setScript(script) {
        _script.set(this, script);
        _compiled.set(this, _nxCompile2.default.compileCode(_script.get(this)));
      }
    }, {
      key: 'getScript',
      value: function getScript() {
        return _script.get(this);
      }
    }, {
      key: 'execute',
      value: function execute() {
        return _compiled.get(this)({ rpgs: this.getRPGS() });
      }
    }, {
      key: 'getData',
      value: function getData() {
        var data = _get(ScriptNode.prototype.__proto__ || Object.getPrototypeOf(ScriptNode.prototype), 'getData', this).call(this);
        data.label = this.getLabel();
        data.script = this.getScript();
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
        _script.delete(this);
        _compiled.delete(this);
        _get(ScriptNode.prototype.__proto__ || Object.getPrototypeOf(ScriptNode.prototype), 'dispose', this).call(this);
      }
    }]);

    return ScriptNode;
  }(_BaseNode3.default);
}();
module.exports = ScriptNode;

},{"../core/BaseNode":5,"../core/LinkType":10,"@risingstack/nx-compile":1}],16:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _CompoundNode2 = require('../core/CompoundNode');

var _CompoundNode3 = _interopRequireDefault(_CompoundNode2);

var _QuestStatus = require('./QuestStatus');

var _QuestStatus2 = _interopRequireDefault(_QuestStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KEY_TASKS = 'tasks';

var QuestNode = function () {
  var _title = new WeakMap();
  var _description = new WeakMap();
  var _status = new WeakMap();

  return function (_CompoundNode) {
    _inherits(QuestNode, _CompoundNode);

    function QuestNode(data, rpgs) {
      _classCallCheck(this, QuestNode);

      var _this = _possibleConstructorReturn(this, (QuestNode.__proto__ || Object.getPrototypeOf(QuestNode)).call(this, data, rpgs));

      _title.set(_this, data.title ? data.title : '');
      _description.set(_this, data.description ? data.description : '');
      _status.set(_this, data.status ? data.status : _QuestStatus2.default.INCOMPLETE);
      return _this;
    }

    _createClass(QuestNode, [{
      key: 'getData',
      value: function getData() {
        var data = _get(QuestNode.prototype.__proto__ || Object.getPrototypeOf(QuestNode.prototype), 'getData', this).call(this);
        data.title = this.getTitle();
        data.description = this.getDescription();
        data.status = this.getStatus();
        return data;
      }
    }, {
      key: 'canAddChild',
      value: function canAddChild(type) {
        return type === 'Task';
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
        this._removeChildren(KEY_TASKS);
        _title.delete(this);
        _description.delete(this);
        _status.delete(this);
      }
    }]);

    return QuestNode;
  }(_CompoundNode3.default);
}();
module.exports = QuestNode;

},{"../core/CompoundNode":6,"./QuestStatus":17}],17:[function(require,module,exports){
"use strict";

var INCOMPLETE = 'questIncomplete';
var COMPLETED = 'questCompleted';
var FAILED = 'questFailed';

exports.INCOMPLETE = INCOMPLETE;
exports.COMPLETED = COMPLETED;
exports.FAILED = FAILED;

},{}],18:[function(require,module,exports){
"use strict";

var _BaseNode2 = require("../core/BaseNode");

var _BaseNode3 = _interopRequireDefault(_BaseNode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TaskNode = function () {
  return function (_BaseNode) {
    _inherits(TaskNode, _BaseNode);

    function TaskNode(data) {
      _classCallCheck(this, TaskNode);

      return _possibleConstructorReturn(this, (TaskNode.__proto__ || Object.getPrototypeOf(TaskNode)).call(this, data));
    }

    //to do


    return TaskNode;
  }(_BaseNode3.default);
}();

module.exports = TaskNode;

},{"../core/BaseNode":5}],19:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _BaseNode2 = require('../core/BaseNode');

var _BaseNode3 = _interopRequireDefault(_BaseNode2);

var _VariableType = require('./VariableType');

var _VariableType2 = _interopRequireDefault(_VariableType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VariableNode = function () {
  var _value = new WeakMap();
  var _type = new WeakMap();

  function _parseBoolean(val) {
    var isBool = (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === _VariableType2.default.BOOLEAN;
    if (isBool) {
      return val;
    } else {
      switch (String(val).toLowerCase().trim()) {
        case "true":case "yes":case "1":
          return true;
        case "false":case "no":case "0":case null:
          return false;
        default:
          return Boolean(val);
      }
    }
  }

  function _parseString(val) {
    return (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === _VariableType2.default.STRING ? val : String(val);
  }

  function _parseNumber(val) {
    return (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === _VariableType2.default.NUMBER ? val : parseFloat(val);
  }

  function _parseValue(val, type) {
    switch (type) {
      case _VariableType2.default.BOOLEAN:
        return _parseBoolean(val);
      case _VariableType2.default.NUMBER:
        return _parseNumber(val);
      case _VariableType2.default.STRING:
      default:
        return _parseString(val);
    }
  }

  return function (_BaseNode) {
    _inherits(VariableNode, _BaseNode);

    function VariableNode(data, rpgs) {
      _classCallCheck(this, VariableNode);

      var _this = _possibleConstructorReturn(this, (VariableNode.__proto__ || Object.getPrototypeOf(VariableNode)).call(this, data, rpgs));

      _type.set(_this, data.hasOwnProperty('type') ? data.type : _VariableType2.default.STRING);
      _value.set(_this, data.hasOwnProperty('value') ? _parseValue(data.value, _type.get(_this)) : '');
      return _this;
    }

    _createClass(VariableNode, [{
      key: 'getData',
      value: function getData() {
        var data = _get(VariableNode.prototype.__proto__ || Object.getPrototypeOf(VariableNode.prototype), 'getData', this).call(this);
        data.type = this.getType();
        data.value = this.getValue();
        return data;
      }
    }, {
      key: 'setValue',
      value: function setValue(val) {
        _value.set(this, _parseValue(val, _type.get(this)));
      }
    }, {
      key: 'getValue',
      value: function getValue() {
        return _value.get(this);
      }
    }, {
      key: 'getType',
      value: function getType() {
        return _type.get(this);
      }
    }, {
      key: 'canCreateInputConnection',
      value: function canCreateInputConnection(type) {
        return false;
      }
    }, {
      key: 'canCreateOutputConnection',
      value: function canCreateOutputConnection(type) {
        switch (type) {
          case LinkType.REFERENCE:
            return true;
          default:
            return false;
        }
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        _value.delete(this);
        _type.delete(this);
        _get(VariableNode.prototype.__proto__ || Object.getPrototypeOf(VariableNode.prototype), 'dispose', this).call(this);
      }
    }]);

    return VariableNode;
  }(_BaseNode3.default);
}();

module.exports = VariableNode;

},{"../core/BaseNode":5,"./VariableType":20}],20:[function(require,module,exports){
'use strict';

var BOOLEAN = 'boolean';
var STRING = 'string';
var NUMBER = 'number';

exports.BOOLEAN = BOOLEAN;
exports.STRING = STRING;
exports.NUMBER = NUMBER;

},{}],21:[function(require,module,exports){
"use strict";

var _data = require('../data/data.json');

var _data2 = _interopRequireDefault(_data);

var _RPGSystem = require('./rpgs/RPGSystem');

var _RPGSystem2 = _interopRequireDefault(_RPGSystem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function ($, window, document, undefined) {
  $(function () {
    var rpgs1 = new _RPGSystem2.default();
    rpgs1.addActor('act1', { name: 'Adam' }).inp('dialog', 'dlg1').addCondition('cond1', {
      script: 'return 2>1 && rpgs.getVar(\'b1\') === false;'
    }).out('visibility', 'tlk0ans1').addDialog('dlg1', { startTalk: 'tlk0' }).out('dialog', 'act1').addTalk('tlk0', { text: 'This is talk 0.' }).addAnswer('tlk0ans1', { text: 'Answer1' }).out('goto', 'tlk1').inp('visibility', 'cond1').addAnswer('tlk0ans2', { text: 'Answer2' }).out('goto', 'tlk2').addAnswer('tlk0ans3', { text: 'Answer3' }).out('goto', 'tlk3').addTalk('tlk1', { text: 'This is talk 1.' }).inp('goto', 'tlk0ans1').addAnswer('tlk1ans1', { text: 'Answer1' }).addTalk('tlk2', { text: 'This is talk 2.' }).inp('goto', 'tlk0ans2').addAnswer('tlk2ans1', { text: 'Answer1' }).addTalk('tlk3', { text: 'This is talk 3.' }).inp('goto', 'tlk0ans3').addAnswer('tlk3ans1', { text: 'Answer1' }).addVariable('b1', { type: 'boolean', value: false }).addVariable('s1', { type: 'string', value: 'This is message from compiled code!' }).addVariable('n1', { type: 'number', value: 56 });
    var cond = rpgs1.getCondition('cond1');
    console.log(cond.execute());
    var b1 = rpgs1.getVariable('b1');
    var s1 = rpgs1.getVariable('s1');
    var n1 = rpgs1.getVariable('n1');
    /*console.log('b1 value',b1.getValue(),b1.getType());
    console.log('s1 value',s1.getValue(),s1.getType());
    console.log('n1 value',n1.getValue(),n1.getType());*/

    var rpgs1Serialized = rpgs1.serializeData();
    console.log("rpgs1", rpgs1Serialized);

    var rpgs2 = new _RPGSystem2.default(JSON.parse(rpgs1Serialized));
    console.log("data created is equal to data parsed:", rpgs1Serialized === rpgs2.serializeData());
  });
})(jQuery, window, document);

},{"../data/data.json":2,"./rpgs/RPGSystem":3}]},{},[21])

