"use strict";
import {UUID}   from './Utils';
import LinkType from './LinkType';

const KEY_LINKS = 'links';
const KEY_CONDITIONS = 'conditions';

let BaseNode = (function(){
  //Weak maps are new feature to JavaScript. We can store private
  //object properties in key/value pairs using our instance as the key,
  //and our class can capture those key/value maps in a closure.
  let _rpgs = new WeakMap();
  let _uuid = new WeakMap();
  let _input = new WeakMap();
  let _output = new WeakMap();

  return class BaseNode {
    constructor(data,rpgs) {
      _rpgs.set(this,rpgs);
      //If uuid not present, then by default we assign Universally Unique ID.
      _uuid.set(this,data.uuid ? data.uuid : UUID.generate());
      _input.set(this,data.input ? data.input : {});
      _output.set(this,data.output ? data.output : {});
    }

    getRPGS() {
      return this.getRPGS();
    }

    setId(value) {
      _uuid.set(this,value);
    }

    getId() {
      return _uuid.get(this);
    }

    checkCondition(conditionId) {
      let condition = this.getRPGS().getNode(KEY_CONDITIONS,conditionId);
      return condition ? condition.check() : true;
    }

    /**
     * Returns boolean that reflects visiblility state of node.
     * @return {Boolean} Visibility state
     */
    isVisible() {
      let conditions = getInputConnections(LinkType.VISIBILITY);
      return conditions ? this.checkCondition(conditions[0]) : true;
    }

    /**
     * Returns boolean that reflects activity state of node.
     * @return {Boolean} Active state
     */
    isActive() {
      let conditions = getInputConnections(LinkType.ACTIVITY);
      return conditions ? this.checkCondition(conditions[0]) : true;
    }

    getData() {
      return {
        class:this.constructor.name,
        uuid:this.getId(),
        input:this.getInputConnections(),
        output:this.getOutputConnections()
      };
    }

    canAddChild(type) {
      return false;
    }

    addChild(childId) {

    }

    removeChild(index) {

    }

    getChild(index) {
      return null;
    }

    getChildren() {
      return [];
    }

    _removeChildren(key) {

    }

    canCreateInputConnection(type) {
      return false;
    }

    canCreateOutputConnection(type) {
      return false;
    }

    _setConnection(obj,type,linkId) {
      if(!obj.hasOwnProperty(type)) {
        obj[type] = [];
      }
      obj[type].push(linkId);
      return obj;
    }

    setOutputConnection(type,linkId) {
      _output.set(this,this._setConnection(_output.get(this),type,linkId));
    }

    setInputConnection(type,linkId) {
      _input.set(this,this._setConnection(_input.get(this),type,linkId));
    }

    _getConnections(obj,type) {
      if(type) return !obj.hasOwnProperty(type) ? [] : obj[type];
      else return obj;
    }

    getOutputConnections(type) {
      return this._getConnections(_output.get(this),type);
    }

    getInputConnections(type) {
      return this._getConnections(_input.get(this),type);
    }

    _removeConnection(obj,type,linkId) {
      if(obj.hasOwnProperty(type)) {
        obj[type] = Utils.removeObjectFromArray(obj[type],linkId);
      }
      return obj;
    }

    removeOutputConnection(type,linkId) {
      _output.set(this,this._removeConnection(_output.get(this),type,linkId));
    }

    removeInputConnection(type,linkId) {
      _input.set(this,this._removeConnection(_input.get(this),type,linkId));
    }

    removeChildrenFrom(obj,key) {
      obj.filter((childId, index, arr) => {
        this.getRPGS().removeNode(key,childId);
        return true;
      });
    }

    _removeLinksFrom(obj) {
      for (var type in obj) {
        if (obj.hasOwnProperty(type)) {
          removeChildrenFrom(obj[type],KEY_LINKS);
        }
      }
    }

    dispose() {
      this._removeLinksFrom(_output.get(this));
      this._removeLinksFrom(_input.get(this));
      _rpgs.delete(this);
      _uuid.delete(this);
      _input.delete(this);
      _output.delete(this);
    }
  };
})();
module.exports = BaseNode;
