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



let RPGSystem = function (data) {
  let _data = data||{objects:[],dependencies:[]};
  let _objects = _data.objects ? Object.values(_data.objects) : [];
  let _dependencies = _data.dependencies ? Object.values(_data.dependencies) : [];
  let _objectPool = _objects.map((obj) => {
      switch (obj.class) {
        case 'Actor':     return new Actor(obj);
        case 'Condition': return new Condition(obj);
        case 'Answer':    return new Answer(obj);
        case 'Dialog':    return new Dialog(obj);
        case 'Talk':      return new Talk(obj);
        case 'Quest':     return new Quest(obj);
        case 'Task':      return new Task(obj);
        default:          return new UniqueObject(obj);
      }
    });

  for (let i = 0, dependentId, dependent, dependencies;
    i < _dependencies.length; i++) {
    dependentId = _dependencies[i]['dependent'];
    dependent = Utils.getObjectById(_objectPool,dependentId);
    dependencies = _dependencies[i]['dependencies'];
    if(dependent && dependencies) {
      setDependencies(dependent,dependencies)
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
    console.log('dependency',dependency);
    if(dependency) {
      dependent.setDependency(type,dependency);
    }
  }

  let _serializeData = function() {
    let objects = [];
    let dependencies = [];
    for (var i = 0, obj,dep; i < _objectPool.length; i++) {
      obj = _objectPool[i].getData();
      dep = _objectPool[i].getDependencies();
      objects.push(obj);
      if(Object.keys(dep).length !== 0) {
        dependencies.push(dep);
      }
    }
    return JSON.stringify({objects,dependencies});
  };
  console.log(_serializeData());
  return {
    serializeData: _serializeData
  };
};

module.exports = RPGSystem;
