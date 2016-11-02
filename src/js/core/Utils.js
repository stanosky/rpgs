"use strict";
exports.getUniqueId = (function() {
   var id = 0; // This is the private persistent value
   // The outer function returns a nested function that has access
   // to the persistent value.  It is this nested function we're storing
   // in the variable uniqueID above.
   return function() { return id++; };  // Return and increment
})(); // Invoke the outer function after defining it.

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
};

exports.removeObjectFromArray = function(array,obj) {
  let index = indexOfObject(array,obj);
  if(index !== -1) {
    array.splice(index,1);
  }
};
