'use strict';
import Connector from './Connector';

let ConnectorManager = (function () {
  let _connectors = new WeakMap();

  function parseData(data) {
    let parsed = [];
    let connector, limit, nodes;
    for (let type in data) {
      if (data.hasOwnProperty(type)) {
        limit = data[type].limit;
        nodes = data[type].nodes;
        connector = new Connector(type,limit);
        nodes.map(n => connector.addWire(n));
        parsed.push(connector);
      }
    }
    return parsed;
  }


  return class ConnectorManager {

    constructor(data) {
      _connectors.set(this,parseData(data));
    }

    /*addConnector(type,limit) {
      let connectors = _connectors.get(this);
      let alreadyExist = connectors.filter(c => c.getType() === type).length > 0;
      if(!alreadyExist) {
        connectors.push(new Connector(type,limit));
        _connectors.set(this,connectors);
      }
    }*/

    static updateData(data,type,limit) {
      data[type] = data[type]||{} ;
      data[type].limit = data[type].limit||limit;
      data[type].nodes = data[type].nodes||[];
      return data;
    }

    getConnector(type) {
      let connectors = _connectors.get(this);
      return connectors.filter(c => c.getType() === type)[0];
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
      let type, nodes, limit, i;
      for (i = 0; i < connectors.length; i++) {
        type = connectors[i].getType();
        nodes = connectors[i].getWires();
        limit = connectors[i].getLimit();
        data[type] = {limit:limit,nodes:nodes};
      }
      return data;
    }
  };
})();

module.exports = ConnectorManager;
