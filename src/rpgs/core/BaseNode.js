'use strict';
import Utils from './Utils';
import Plug from './Plug';
import ConnectorManager from './ConnectorManager';
import ParamsManager from './ParamsManager';

let BaseNode = (function () {

  // Weak maps are new feature to JavaScript. We can store private
  // object properties in key/value pairs using our instance as the key,
  // and our class can capture those key/value maps in a closure.
  let _uuid = new WeakMap();

  function executeScript (rpgs,scriptId) {
    let _script = rpgs.findNode(scriptId);
    return _script !== null && _script.execute ? _script.execute({rpgs:rpgs}) : true;
  }

  return class BaseNode {
    constructor(data,rpgs) {
      data = data||{};
      // If uuid not present, then by default we assign Universally Unique ID.
      _uuid.set(this, data.uuid ? data.uuid : Utils.getUUID());
      this.rpgs = rpgs;
      this.pm = new ParamsManager(data.params||{});
      this.cm = new ConnectorManager();
      this._init();
      this.cm.setData(data);
    }

    _init() {
      this.cm.addConnector(Plug.VISIBLE,1);
      this.cm.addConnector(Plug.ENABLED,1);
    }

    addParam(name,type,value) {
      this.pm.addParam(name,type,value)
    }

    getParam(name) {
      return this.pm.getParamValue(name);
    }

    setParam(name,value) {
      this.pm.setParamValue(name,value);
    }

    removeParam(name) {
      this.pm.removeParam(name);
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
      return executeScript(this.rpgs, this.cm.getWiresType(Plug.VISIBLE)[0]);
    }

    /**
     * Returns activity state.
     * @return {boolean} Active state
     */
    isActive() {
      return executeScript(this.rpgs, this.cm.getWiresType(Plug.ENABLED)[0]);
    }

    getData() {
      return {
        class: this.constructor.name,
        uuid: this.getId(),
        wires: this.cm.getData(),
        params: this.pm.getParams()
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
      this.pm.dispose();
      this.cm = null;
      this.pm = null;
      this.rpgs = null;
      _uuid.delete(this);
    }
  };
})();
module.exports = BaseNode;
