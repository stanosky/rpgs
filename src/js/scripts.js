"use strict";
import RPGSystem from './rpgs/RPGSystem';
import data from '../data/data.json';
(function ($, window, document, undefined) {
  $(function () {
    let rpg = new RPGSystem();
    //console.log(data);
    rpg.parseData(data);
    console.log('data',rpg.serializeData());
  });

})(jQuery, window, document);
