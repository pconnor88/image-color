;(function ( $, window, document, undefined ) {

    // Default settings
    var pluginName = "ImageColor",
        defaults = {
			
        };

    // Constructor
    function ImageColor( element, options ) {
        
        this.init();
		
    }

    ImageColor.prototype = {

        init: function() {
	
        },
		
		destroy: function() {
			
		}
		
    };
			

    //Plugin wrapper
    $.fn.ImageColor = function ( options ) {
		var args = Array.prototype.slice.call(arguments, 1);
        return this.each(function () {
            var item = $(this), instance = item.data('ImageColor');
            if(!instance) {
                item.data('ImageColor', new Panels(this, options));
            } else {
                if(typeof options === 'string') {
                    instance[options].apply(instance, args);
                }
            }
        });
    };
	
	
})( jQuery, window, document );