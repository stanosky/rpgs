'use strict';

let ParamsManager = (function () {
  let _params = new WeakMap();

  function _paramExist(paramName, containerObj) {
    let keys = Object.keys(containerObj);

    return keys.filter(k => k === paramName).length > 0;
  }

  function _addParam(paramName, paramType, paramValue, containerObj, isMandatory) {
    if (!_paramExist(paramName, containerObj)) {
      containerObj[paramName] = {
        type: paramType,
        value: paramValue,
        mand: isMandatory
      };
    } else {
      // console.warn();
    }
    return containerObj;
  }

  return class ParamsManager {
    constructor(data) {
      _params.set(this, data || {});
    }

    addMandatoryParam(name, type, value) {
      _params.set(this, _addParam(name, type, value, _params.get(this), true));
    }

    addParam(name, type, value) {
      _params.set(this, _addParam(name, type, value, _params.get(this), false));
    }

    getParam(name) {
      let params = _params.get(this);

      return params[name] !== undefined ? params[name] : null;
    }

    getParamValue(name) {
      let param = this.getParam(name);

      return param !== null ? param.value : null;
    }

    setParamValue(name, value) {
      let params = _params.get(this);

      if (params[name] !== undefined) params[name].value = value;
    }

    removeParam(name) {
      let param = this.getParam(name);
      let params = _params.get(this);

      if (param !== null && !param.mand) {
        delete params[name];
        _params.set(this, params);
      }
    }

    getParams() {
      return _params.get(this);
    }

    dispose() {
      _params.delete(this);
    }
  };
})();

module.exports = ParamsManager;
