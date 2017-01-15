'use strict';
import Utils from './Utils';
import Prop from './Prop';

let BaseNode = (function () {

  // Weak maps are new feature to JavaScript. We can store private
  // object properties in key/value pairs using our instance as the key,
  // and our class can capture those key/value maps in a closure.
  let _uuid = new WeakMap();
  let _wires = new WeakMap();

  return class BaseNode {
    constructor(data) {
      data = data||{};
      // If uuid not present, then by default we assign Universally Unique ID.
      _uuid.set(this, data.uuid ? data.uuid : Utils.getUUID());
      _wires.set(this, data.wires ? data.wires : {});
    }

    setId(value) {
      _uuid.set(this, value);
    }

    getId() {
      return _uuid.get(this);
    }

    /**
     * Returns id of ScriptNode that is responsible for visibility state.
     * If id is not present it will return empty string.
     * @return {string} Visibility state
     */
    getVisibilityController() {
      return this.getWires(Prop.VISIBILITY)[0]||'';
    }

    /**
    * Returns id of ScriptNode that is responsible for activity state.
    * If id is not present it will return empty string.
     * @return {string} Active state
     */
    getActivityControler() {
      return this.getWires(Prop.ACTIVITY)[0]||'';
    }

    getData() {
      return {
        class: this.constructor.name,
        uuid: this.getId(),
        wires: _wires.get(this)
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

    _setWire(obj, type, nodeId) {
      if (!obj.hasOwnProperty(type)) {
        obj[type] = [];
      }
      obj[type].push(nodeId);
      return obj;
    }

    setWire(type, nodeId) {
      _wires.set(this, this._setWire(_wires.get(this), type, nodeId));
    }

    _getWires(obj, type) {
      let output;

      if (type) output = !obj.hasOwnProperty(type) ? [] : obj[type];
      else output = obj;
      return output;
    }

    getWires(type) {
      return this._getWires(_wires.get(this), type);
    }

    _removeWire(obj, type, nodeId) {
      if (obj.hasOwnProperty(type)) {
        obj[type] = Utils.removeObjectFromArray(obj[type], nodeId);
      }
      return obj;
    }

    removeWire(type, nodeId) {
      _wires.set(this, this._removeWire(_wires.get(this), type, nodeId));
    }

    dispose() {
      _uuid.delete(this);
      _wires.delete(this);
      this._removeChildren();
    }
  };
})();
module.exports = BaseNode;
