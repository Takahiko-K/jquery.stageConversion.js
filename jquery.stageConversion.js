/*
 * jQuery stageConversion v0.1 - jQuery JavaScript Plugin
 * 
 *
 * Copyright (c) 2017 Takahiko-K
 * Licensed under the MIT License.
 */

    function stageConversionExec( id, durationNum) {
      $( id).animate( { "height": "100%"}, { duration: durationNum, easing: 'swing'});
    };
(function($) {

  jQuery.fn.extend({

    stageConversion:function(custom){

      this.click( function(){

        var options = $.extend( true, {
          location  : '#',        // window.location value
          line      : 5,
          color     : '#af0a19',  // 
          position  : 'top',      // top or bottom or right or left
        }, custom);

        // -- create elements ----------
        var elements = {};
        for (i = 0; i < options.line; i++) {
          elements[i] = $( '<div></div>', { id: 'stageConversionBlock' + i, addClass: 'stageConversionBlock'});
          $('body').append( elements[i]);
          $('#stageConversionBlock' + i).css( 'left', 100 / options.line * i + '%');
        }

        // -- add css ----------
        if (options.position === 'top') {
          $('.stageConversionBlock').css( 'top', '0');
        } else if (options.position === 'bottom') {
          $('.stageConversionBlock').css( 'bottom', '0');
        }
        
        $('.stageConversionBlock').css({
          display          : 'block',
          width            : 100 / options.line + '%',
          height           : '0',
          'background-color' : options.color,
          position         : 'fixed',
        });
        $('.stageConversionBlock').css( 'display', 'block');

        // -- add animate ----------
        var centerVal = options.line/2;
        var maxVal = 600;
        var stepVal = maxVal / centerVal;
        var start = Math.ceil(centerVal) * stepVal;
        maxVal = Math.floor(centerVal) * stepVal;
        var speed = 1000;
        for (i = 0; i < options.line; i++) {

          if (i < centerVal) {
            start = start - stepVal;
          } else {
            start = start + stepVal;
          }

          setTimeout( "stageConversionExec( '#stageConversionBlock" + i + "'," + speed + ")", start);
        }

        if (options.location) {
          setTimeout( function(){
            window.location = options.location;
          }, maxVal + speed + 100);
        }

      });
      return this;
    }
  });
})(jQuery);
