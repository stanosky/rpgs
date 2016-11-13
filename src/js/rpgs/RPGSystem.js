"use strict";
import Utils from './core/Utils';

import UniqueObject from './core/UniqueObject';
import BaseObject from './core/BaseObject';
import Actor from './actors/Actor';
//import Inventory from './actors/Invenotry';
import Condition from './conditions/Condition';
import Answer from './dialogs/Answer';
import Dialog from './dialogs/Dialog';
import Talk from './dialogs/Talk'
import Quest from './quests/Quest';
import Task from './quests/Task';

let nodeFactory = function(type,params) {
  switch (type) {
    case 'Actor':     return new Actor(params);
    case 'Condition': return new Condition(params);
    case 'Answer':    return new Answer(params);
    case 'Dialog':    return new Dialog(params);
    case 'Talk':      return new Talk(params);
    case 'Quest':     return new Quest(params);
    case 'Task':      return new Task(params);
    default:          return new UniqueObject(params);
  }
};

let dataParser = function(objects,dependencies) {
  let _objectPool = objects.map((obj) => nodeFactory(obj.class,obj));

  for (let i = 0, dId, depObj, toInject; i < dependencies.length; i++) {
    dId = dependencies[i]['dependent'];
    depObj = Utils.getObjectById(_objectPool,dId);
    toInject = dependencies[i]['dependencies'];
    if(depObj && toInject) {
      setDependencies(depObj,toInject)
    }
  }

  function setDependencies(dependent,dependencies) {
    for (let type in dependencies) {
      if (dependencies.hasOwnProperty(type)) {
        if(dependencies[type] instanceof Array) {
          for (let i = 0; i < dependencies[type].length; i++) {
            setDependency(dependent,type,dependencies[type][i]);
          }
        } else {
          setDependency(dependent,type,dependencies[type]);
        }
      }
    }
  }

  function setDependency(dependent,type,uuid) {
    let dependency = Utils.getObjectById(_objectPool,uuid);
    //console.log('dependency',dependency);
    if(dependency) {
      dependent.setDependency(type,dependency);
    }
  }

  return _objectPool;
};

let RPGSystem = function (data) {
  let _data = data||{objects:[],dependencies:[]};
  let _objects = _data.objects ? Object.values(_data.objects) : [];
  let _dependencies = _data.dependencies ? Object.values(_data.dependencies) : [];
  let _objectPool = dataParser(_objects,_dependencies);

  let _rpgSystem = this;

  let _createNode = (function(type,params,parent) {
    let _parent = parent||null;
    let obj = nodeFactory(type,params);

    if(parent !== null){
      //parent.getObj().addChild(obj);
      //setDependency...
    } else {
      _objectPool.push(obj);
    }

    let _creator = {

      setParam:function(param,value) {
        obj.setParam(param,value);
        return _creator;
      },

      addNode: function(nodeType,nodeParams) {
        return _createNode(nodeType,nodeParams,_parent);
      },

      getObj: function() {
        return obj;
      },

      back: function() {
        return _parent||this.done();
      },

      done: function() {
        return _rpgSystem
      }
    }
    return _creator;
  })();

  let _serializeData = function() {
    let objects = [];
    let dependencies = [];
    for (var i = 0, obj,dep; i < _objectPool.length; i++) {
      obj = _objectPool[i].getData();
      dep = _objectPool[i].getDependencies();
      objects.push(obj);
      if(Object.keys(dep).length > 0) {
        dependencies.push(dep);
      }
    }
    return JSON.stringify({objects,dependencies});
  };

  return {
    serializeData: _serializeData
  };
};

module.exports = RPGSystem;
