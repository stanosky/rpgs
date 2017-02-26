'use strict';

let Connector = (function () {
  let _type = new WeakMap();
  let _limit = new WeakMap();
  let _wires = new WeakMap();

  return class Connector {

    constructor(type, limit) {
      _type.set(this, type);
      _limit.set(this, isNaN(parseInt(limit, 10)) ? -1 : parseInt(limit, 10));
      _wires.set(this, []);
    }

    getType() {
      return _type.get(this);
    }

    getLimit() {
      return _limit.get(this);
    }

    getWires() {
      return _wires.get(this);
    }

    canAddWire() {
      let limit = this.getLimit();
      let wireLen = this.getWires().length;

      return limit === -1 || (limit > 0 && wireLen < limit);
    }

    addWire(nodeId) {
      let wire = this.getWires();

      if (this.canAddWire()) {
        wire.push(nodeId);
        _wires.set(this, wire);
      }
    }

    removeWire(nodeId) {
      _wires.set(this, _wires.get(this).filter(wire => {
        return wire !== nodeId;
      }));
    }

    dispose() {
      _type.delete(this);
      _limit.delete(this);
      _wires.delete(this);
    }
  };
})();

module.exports = Connector;
