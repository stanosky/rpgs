'use strict';

let Connector = (function (){
  let _type = new WeakMap();
  let _limit = new WeakMap();
  let _wires = new WeakMap();
  return class Connector {

    constructor(type,limit) {
      _type.set(this,type);
      _limit.set(this, isNaN(parseInt(limit)) ? -1 : parseInt(limit));
      _wires.set(this,[]);
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
      let wiresLen = this.getWires().length;
      return limit === -1 || (limit > 0 && wiresLen < limit);
    }

    addWire(nodeId) {
      let wires = this.getWires();
      if(this.canAddWire()) {
        wires.push(nodeId);
        _wires.set(this,wires);
      }
    }

  };
})();

module.exports = Connector
