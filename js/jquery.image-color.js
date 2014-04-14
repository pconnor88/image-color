;(function ( $, window, document, undefined ) {

    // Default settings
    var pluginName = "ImageColor",
        defaults = {
			
        };

    // Constructor
    function ImageColor(element, options) {
        
		this.element = element;
		this.settings = $.extend( {}, defaults, options );
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
		
    }

    ImageColor.prototype = {

        init: function() {
			
			var instances = $(".imageColorCanvas").length;
			this.imageWidth = $(this.element).width();
			this.imageHeight = $(this.element).height();

			this.canvas = $('<canvas/>',{
				'class':'imageColorCanvas',
				'id' : 'imageColorCanvas' + (instances+1)
			}).attr({
				'width': this.imageWidth,
				'height': this.imageHeight
			}).hide();
			
			$("body").append(this.canvas);
			
			this.canvas.crossOrigin = 'anonymous';
			
			this.context = this.canvas[0].getContext('2d');
			this.context.drawImage(this.element, 0, 0);
						
        },
		
		averageColor: function() {
			
			var pixelInfo = this.context.getImageData(0, 0, this.imageWidth, this.imageHeight);
			var pixels = pixelInfo.data;
			
			var r = 0;
			var g = 0;
			var b = 0;
						
			for(var i=0; i<pixels.length; i+=4) {
				r += pixels[i];
				g += pixels[(i+1)];
				b += pixels[(i+2)];	
			}
			
			var pixelCount = this.imageHeight * this.imageWidth;
			
			r = Math.floor(r/pixelCount);
			g = Math.floor(g/pixelCount);
			b = Math.floor(b/pixelCount);
			
			return "rgb(" + r + "," + g + ", " + b + ")";
			
		},
		
		destroy: function() {
			
		}
		
    };
			

    //Plugin wrapper
    $.fn[pluginName] = function ( options ) {
        var args = arguments;

        // Is the first parameter an object (options), or was omitted,
        // instantiate a new instance of the plugin.
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {

                // Only allow the plugin to be instantiated once,
                // so we check that the element has no plugin instantiation yet
                if (!$.data(this, 'plugin_' + pluginName)) {

                    // if it has no instance, create a new one,
                    // pass options to our plugin constructor,
                    // and store the plugin instance
                    // in the elements jQuery data object.
                    $.data(this, 'plugin_' + pluginName, new ImageColor( this, options ));
                }
            });

        // If the first parameter is a string and it doesn't start
        // with an underscore or "contains" the `init`-function,
        // treat this as a call to a public method.
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {

            // Cache the method call
            // to make it possible
            // to return a value
            var returns;

            this.each(function () {
                var instance = $.data(this, 'plugin_' + pluginName);

                // Tests that there's already a plugin-instance
                // and checks that the requested public method exists
                if (instance instanceof ImageColor && typeof instance[options] === 'function') {

                    // Call the method of our plugin instance,
                    // and pass it the supplied arguments.
                    returns = instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
                }

                // Allow instances to be destroyed via the 'destroy' method
                if (options === 'destroy') {
                  $.data(this, 'plugin_' + pluginName, null);
                }
            });

            // If the earlier cached method
            // gives a value back return the value,
            // otherwise return this to preserve chainability.
            return returns !== undefined ? returns : this;
        }
	};
	
	
})( jQuery, window, document );