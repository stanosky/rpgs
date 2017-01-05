"use strict";
import {UUID}   from './Utils';
import Prop from './Prop';

let BaseNode = (function(){
  //Weak maps are new feature to JavaScript. We can store private
  //object properties in key/value pairs using our instance as the key,
  //and our class can capture those key/value maps in a closure.
  let _rpgs = new WeakMap();
  let _uuid = new WeakMap();
  let _wires = new WeakMap();

  return class BaseNode {
    constructor(data,rpgs) {
      _rpgs.set(this,rpgs);
      //If uuid not present, then by default we assign Universally Unique ID.
      _uuid.set(this,data.uuid ? data.uuid : UUID.generate());
      _wires.set(this,data.wires ? data.wires : {});
    }

    getRPGS() {
      return _rpgs.get(this);
    }

    setId(value) {
      _uuid.set(this,value);
    }

    getId() {
      return _uuid.get(this);
    }

    _checkCondition(prop) {
      let nodeId = this.getWires(prop)[0];
      let scriptNode = this.getRPGS().findNode(nodeId);
      return scriptNode != null && scriptNode.execute ? scriptNode.execute() : true;
    }

    /**
     * Returns boolean that reflects visiblility state of node.
     * @return {Boolean} Visibility state
     */
    isVisible() {
      return this._checkCondition(Prop.VISIBILITY);
    }

    /**
     * Returns boolean that reflects activity state of node.
     * @return {Boolean} Active state
     */
    isActive() {
      return this._checkCondition(Prop.ACTIVITY);
    }

    getData() {
      return {
        class:this.constructor.name,
        uuid:this.getId(),
        wires:_wires.get(this)
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

    _removeChildren() {

    }

    canSetWireType(type) {
      return false;
    }

    _setWire(obj,type,nodeId) {
      if(!obj.hasOwnProperty(type)) {
        obj[type] = [];
      }
      obj[type].push(nodeId);
      return obj;
    }

    setWire(type,nodeId) {
      _wires.set(this,this._setWire(_wires.get(this),type,nodeId));
    }

    _getWires(obj,type) {
      if(type) return !obj.hasOwnProperty(type) ? [] : obj[type];
      else return obj;
    }

    getWires(type) {
      return this._getWires(_wires.get(this),type);
    }

    _removeWire(obj,type,nodeId) {
      if(obj.hasOwnProperty(type)) {
        obj[type] = Utils.removeObjectFromArray(obj[type],nodeId);
      }
      return obj;
    }

    removeWire(type,nodeId) {
      _wires.set(this,this._removeWire(_wires.get(this),type,nodeId));
    }

    dispose() {
      _rpgs.delete(this);
      _uuid.delete(this);
      _wires.delete(this);
      _removeChildren();
    }
  };
})();
module.exports = BaseNode;
