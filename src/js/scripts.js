"use strict";
import data from '../data/data.json';
import RPGSystem from './rpgs/RPGSystem';



(function ($, window, document, undefined) {
  $(function () {
    //console.log(data);
    let rpgs = new RPGSystem();
    rpgs.setData(data);
    console.log(rpgs.serializeData());
  });

})(jQuery, window, document);
