"use strict";
import data from '../data/data.json';
import RPGSystem from './rpgs/RPGSystem';
//import UniqueObject from './rpgs/core/UniqueObject';
//import BaseObject from './rpgs/core/BaseObject';


(function ($, window, document, undefined) {
  $(function () {
    //console.log(data);
    let rpg = new RPGSystem(data);

    //let uo = new UniqueObject();
    //console.log(uo.getData());
  });

})(jQuery, window, document);
