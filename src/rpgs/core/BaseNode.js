'use strict';
import Utils from './Utils';
import Prop from './Prop';
import ConnectorManager from './ConnectorManager';

let BaseNode = (function () {

  // Weak maps are new feature to JavaScript. We can store private
  // object properties in key/value pairs using our instance as the key,
  // and our class can capture those key/value maps in a closure.
  let _uuid = new WeakMap();
  let _rpgs = new WeakMap();

  function executeScript (rpgs,scriptId) {
    let _script = rpgs.findNode(scriptId);
    return _script !== null && _script.execute ? _script.execute({rpgs:rpgs}) : true;
  }

  return class BaseNode {
    constructor(data,rpgs) {
      data = data||{};
      // If uuid not present, then by default we assign Universally Unique ID.
      _uuid.set(this, data.uuid ? data.uuid : Utils.getUUID());
      _rpgs.set(this, rpgs);
      this.cm = new ConnectorManager();
      this._init();
      this.cm.setData(data);
    }

    _init() {
      this.cm.addConnector(Prop.VISIBILITY,1);
      this.cm.addConnector(Prop.ACTIVITY,1);
    }

    setId(value) {
      _uuid.set(this, value);
    }

    getId() {
      return _uuid.get(this);
    }

    /**
     * Returns visibility state.
     * @return {boolean} Visibility state
     */
    isVisible() {
      return executeScript(_rpgs.get(this),
              this.cm.getWiresType(Prop.VISIBILITY)[0]);
    }

    /**
     * Returns activity state.
     * @return {boolean} Active state
     */
    isActive() {
      return executeScript(_rpgs.get(this),
              this.cm.getWiresType(Prop.ACTIVITY)[0]);
    }

    getData() {
      return {
        class: this.constructor.name,
        uuid: this.getId(),
        wires: this.cm.getData()
      };
    }

    canAddChild(type) {
      // false because cannot have children
      return false;
    }

    addChild(childId) {
      // empty because cannot have children
    }

    removeChild(index) {
      // empty because cannot have children
    }

    getChild(index) {
      // null because cannot have children
      return null;
    }

    getChildren() {
      // empty array because cannot have children
      return [];
    }

    _removeChildren() {
      // empty because cannot have children
    }

    canAddWireType(type) {
      return this.cm.canAddWireType(type);
    }

    setWire(type, nodeId) {
      this.cm.addWireType(type,nodeId);
    }

    getWires(type) {
      return this.cm.getWiresType(type);
    }

    removeWire(type, nodeId) {
      this.cm.removeWireType(type,nodeId);
    }

    dispose() {
      this.cm.dispose();
      this.cm = null;
      this._removeChildren();
      _uuid.delete(this);
      _rpgs.delete(this);      
    }
  };
})();
module.exports = BaseNode;
