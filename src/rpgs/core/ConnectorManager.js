'use strict';
import Connector from './Connector';

let ConnectorManager = (function () {

  let _connectors = new WeakMap();

  return class ConnectorManager {

    constructor() {
      _connectors.set(this, []);
    }

    setData(data) {
      let wires = data.wires || {};
      let parsed = [];
      let connector, nodes;

      for (let type in wires) {
        if (wires.hasOwnProperty(type)) {
          connector = this.getConnector(type);
          if (connector !== null) {
            nodes = wires[type];
            nodes.map(n => connector.addWire(n));
            parsed.push(connector);
          }
        }
      }
      return parsed;
    }

    addConnector(type, limit) {
      let connectors = _connectors.get(this);
      let alreadyExist = connectors.filter(c => c.getType() === type).length > 0;

      if (!alreadyExist) {
        connectors.push(new Connector(type, limit));
        _connectors.set(this, connectors);
      }
    }

    getConnector(type) {
      let connectors = _connectors.get(this) || null;
      let connector = null;

      if (connectors !== null) {
        connector = connectors.filter(c => c.getType() === type);
      }
      return connector !== null && connector.length > 0 ? connector[0] : null;
    }

    canRecieveWire(type) {
      let connectors = _connectors.get(this);

      return connectors.filter(c => {
        return c.getType() === type && c.canAddWire();
      }).length > 0;
    }

    addWire(type, nodeId) {
      let connector = this.getConnector(type);

      if (connector !== null) {
        connector.addWire(nodeId);
      }
    }

    getWires(type) {
      let connector = this.getConnector(type);

      return connector !== null ? connector.getWires() : [];
    }

    removeWire(type, nodeId) {
      let connector = this.getConnector(type);

      if (connector !== null) {
        connector.removeWire(nodeId);
      }
    }

    getData() {
      let data = {};
      let connectors = _connectors.get(this) || [];
      let type, nodes, i;

      for (i = 0; i < connectors.length; i++) {
        type = connectors[i].getType();
        nodes = connectors[i].getWires();
        data[type] = nodes;
      }
      return data;
    }

    dispose() {
      _connectors.get(this).map((c) => { c.dispose(); });
      _connectors.delete(this);
    }
  };
})();

module.exports = ConnectorManager;
