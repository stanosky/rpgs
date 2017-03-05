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
  let _label = new WeakMap();
  let _x = new WeakMap();
  let _y = new WeakMap();

  const getRandomLabel = (prefix, id) => prefix + id.substr(0, 4);
  /* function executeScript(rpgs, scriptId) {
    let _script = rpgs.findNode(scriptId);

    return _script !== null && _script.execute ? _script.execute({rpgs: rpgs}) : true;
  }*/

  return class BaseNode {
    constructor(nodePool, data) {
      let _data = data || {};

      // console.log('BaseNode', nodePool);
      // If uuid not present, then by default we assign Universally Unique ID.
      _uuid.set(this, _data.uuid ? _data.uuid : Utils.getUUID());

      let className = this.constructor.name;
      let prefix = className.substr(0, className.indexOf('Node')) + '-';

      _label.set(this, _data.label ?
        _data.label : getRandomLabel(prefix, _uuid.get(this)));
      _x.set(this, _data.x ? _data.x : 0);
      _y.set(this, _data.y ? _data.y : 0);
      this.nodePool = nodePool;
      this.pm = new ParamsManager(_data.params || {});
      this.cm = new ConnectorManager();
      this._init();
      this.cm.setData(_data);
    }

    _init() {
      this.cm.addConnector(Plug.VISIBLE, 1);
      this.cm.addConnector(Plug.ENABLED, 1);
    }

    addParam(name, type, value) {
      this.pm.addParam(name, type, value);
    }

    getParam(name) {
      return this.pm.getParamValue(name);
    }

    setParam(name, value) {
      this.pm.setParamValue(name, value);
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

    setLabel(value) {
      _label.set(this, value);
    }

    getLabel() {
      return _label.get(this);
    }

    set x(value) {
      _x.set(this, value);
    }

    get x() {
      return _x.get(this);
    }

    set y(value) {
      _y.set(this, value);
    }

    get y() {
      return _y.get(this);
    }

    /**
     * Returns visibility state.
     * @return {boolean} Visibility state
     */
    isVisible() {
      return true;// executeScript(this.rpgs, this.cm.getWires(Plug.VISIBLE)[0]);
    }

    /**
     * Returns activity state.
     * @return {boolean} Active state
     */
    isActive() {
      return true;// executeScript(this.rpgs, this.cm.getWires(Plug.ENABLED)[0]);
    }

    getData() {
      return {
        class: this.constructor.name,
        uuid: this.getId(),
        label: this.getLabel(),
        wires: this.cm.getData(),
        params: this.pm.getParams(),
        x: this.x,
        y: this.y
      };
    }

    canAddChild(type) {
      // false because cannot have children
      return false;
    }

    addChild(params) {
      // empty because cannot have children
    }

    setNodeAsChild(node) {
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

    canBeWiredTo(type) {
      return false;
    }

    canRecieveWire(type) {
      return this.cm.canRecieveWire(type);
    }

    addWire(type, nodeId) {
      this.cm.addWire(type, nodeId);
    }

    getWires(type) {
      return this.cm.getWires(type);
    }

    removeWire(type, nodeId) {
      this.cm.removeWire(type, nodeId);
    }

    dispose() {
      // console.log('dispose from BaseNode');
      this.cm.dispose();
      this.pm.dispose();
      this.cm = null;
      this.pm = null;
      this.nodePool = null;
      _uuid.delete(this);
      _label.delete(this);
      _x.delete(this);
      _y.delete(this);
    }
  };
})();

module.exports = BaseNode;
