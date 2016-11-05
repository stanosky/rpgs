"use strict";

/**
 * Fast UUID generator, RFC4122 version 4 compliant.
 * @author Jeff Ward (jcward.com).
 * @license MIT license
 * @link http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
 **/
var UUID = (function() {
  var self = {};
  var lut = []; for (var i=0; i<256; i++) { lut[i] = (i<16?'0':'')+(i).toString(16); }
  self.generate = function() {
    var d0 = Math.random()*0xffffffff|0;
    var d1 = Math.random()*0xffffffff|0;
    var d2 = Math.random()*0xffffffff|0;
    var d3 = Math.random()*0xffffffff|0;
    return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+'-'+
      lut[d1&0xff]+lut[d1>>8&0xff]+'-'+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+'-'+
      lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+'-'+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
      lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
  }
  return self;
})();

exports.UUID = UUID;

let indexOfObject = function(array,obj) {
  for (var i = 0; i < array.length; i++) {
    if(array[i] === obj) return i;
  }
  return -1;
};

exports.indexOfObject = indexOfObject;


exports.getObjectById = function(array,id) {
  for (var i = 0; i < array.length; i++) {
    if(array[i].getId() === id) return array[i];
  }
  return null;
};

let getIndexById = function(array,id) {
  for (var i = 0; i < array.length; i++) {
    if(array[i].getId() === id) return i;
  }
  return -1;
};
exports.getIndexById = getIndexById;

exports.addObjectToArray = function(array,obj,expectedType) {
  if(expectedType !== undefined && expectedType !== null) {
    if(typeof obj !== expectedType) {
      throw new Error('Wrong type of object passed. Expected '
      +expectedType.toString()+' object.');
    }
  }
  if(indexOfObject(array,obj) === -1) {
    array.push(obj);
  }
  return array;
};

exports.removeObjectById = function(array,id) {
  let index = getIndexById(array,id);
  if(index !== -1) {
    array.splice(index,1);
  }
}

exports.removeObjectFromArray = function(array,obj) {
  let index = indexOfObject(array,obj);
  if(index !== -1) {
    array.splice(index,1);
  }
};
