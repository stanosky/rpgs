"use strict";
let getUniqueId = (function() {
   var id = 0; // This is the private persistent value
   // The outer function returns a nested function that has access
   // to the persistent value.  It is this nested function we're storing
   // in the variable uniqueID above.
   return function() { return id++; };  // Return and increment
})(); // Invoke the outer function after defining it.

exports.getUniqueId = getUniqueId;
