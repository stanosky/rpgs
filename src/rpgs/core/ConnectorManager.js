'use strict';
import Connector from './Connector';

let ConnectorManager = (function () {
  let _connectors = new WeakMap();

  return class ConnectorManager {

    constructor() {
      _connectors.set(this,[]);
    }

    setData(data) {
      let wires = data.wires||{}
      let parsed = [];
      let connector, limit, nodes;
      for (let type in wires) {
        if (wires.hasOwnProperty(type)) {
          connector = this.getConnector(type);
          if(connector !== null) {
            nodes = wires[type];
            nodes.map(n => connector.addWire(n));
            parsed.push(connector);
          }
        }
      }
      return parsed;
    }

    addConnector(type,limit) {
      let connectors = _connectors.get(this);
      let alreadyExist = connectors.filter(c => c.getType() === type).length > 0;
      if(!alreadyExist) {
        connectors.push(new Connector(type,limit));
        _connectors.set(this,connectors);
      }
    }

    getConnector(type) {
      let connectors = _connectors.get(this);
      return connectors.filter(c => c.getType() === type)[0]||null;
    }

    canSetWireType(type) {
      let connectors = _connectors.get(this);
      return connectors.filter(c => {
        return c.getType() === type && c.canAddWire()
      }).length > 0;
    }

    getData() {
      let data = {};
      let connectors = _connectors.get(this);
      let type, nodes, i;
      for (i = 0; i < connectors.length; i++) {
        type = connectors[i].getType();
        nodes = connectors[i].getWires();
        data[type] = nodes;
      }
      return data;
    }
  };
})();

module.exports = ConnectorManager;
