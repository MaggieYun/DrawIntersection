/*!
 * Marquee jQuery Plug-in
 *
 * Copyright 2009 Giva, Inc. (http://www.givainc.com/labs/) 
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * 	http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Date: 2009-05-20
 * Rev:  1.0.01
 */
;(function($){
	// set the version of the link select
	$.marquee = {version: "1.0.01"};
	
	$.fn.marquee = function(options) {
		var method = typeof arguments[0] == "string" && arguments[0];
		var args = method && Array.prototype.slice.call(arguments, 1) || arguments;
		// get a reference to the first marquee found
		var self = (this.length == 0) ? null : $.data(this[0], "marquee");
		
		// if a method is supplied, execute it for non-empty results
		if( self && method && this.length ){

			// if request a copy of the object, return it			
			if( method.toLowerCase() == "object" ) return self;
			// if method is defined, run it and return either it's results or the chain
			else if( self[method] ){
				// define a result variable to return to the jQuery chain
				var result;
				this.each(function (i){
					// apply the method to the current element
					var r = $.data(this, "marquee")[method].apply(self, args);
					// if first iteration we need to check if we're done processing or need to add it to the jquery chain
					if( i == 0 && r ){
						// if this is a jQuery item, we need to store them in a collection
						if( !!r.jquery ){
							result = $([]).add(r);
						// otherwise, just store the result and stop executing
						} else {
							result = r;
							// since we're a non-jQuery item, just cancel processing further items
							return false;
						}
					// keep adding jQuery objects to the results
					} else if( !!r && !!r.jquery ){
						result = result.add(r);
					}
				});

				// return either the results (which could be a jQuery object) or the original chain
				return result || this;
			// everything else, return the chain
			} else return this;
		// initializing request
		} else {
			// create a new marquee for each object found
			return this.each(function (){
				new $.Marquee(this, options);
			});
		};
	};

	$.Marquee = function (marquee, options){
		options = $.extend({}, $.Marquee.defaults, options);
		var self = this, $marquee = $(marquee), $lis = $marquee.find("> li"), current = -1, hard_paused = false, paused = false, loop_count = 0, timeOutId = -1, $liTemp;
		// store a reference to this marquee
		$.data($marquee[0], "marquee", self);
		
		// update the marquee
		this.update = function (i){
						$lis = $marquee.find("> li");
            current=i%$lis.length;
		}

		// code to introduce the new marquee message
		function show(i){
			// if we're already scrolling an item, stop processing
			if( $lis.filter("." + options.cssShowing).length > 0 ) return false;
			// run the beforeshow callback
			if( $.isFunction(options.beforeshow) ) options.beforeshow.apply(self, [$marquee, $li, current]);
            
            var $li = $lis.eq(current);
			
			var params;
			if(options.scroll == "top"){
			     params = {
                      top: "-" + $li.outerHeight() + "px"
                      , left: 0
                  };
			}else if(options.scroll == "bottom"){
			     params = {
			     	    top: "+" + $marquee.innerHeight() + "px"
                      , left: 0
                  };
			}else if(options.scroll == "right"){
				params = {
                      top: 0
                      , left: "+" + $marquee.innerWidth() + "px"
                  };
			}else if(options.scroll == "left"){
			    params = {
                      top: 0
                      , left: "-" + $marquee.innerWidth() + "px"
                  };     
			}else if(options.scroll == "center"){//立即显示
                params = {
                      top: 0
                      ,left:0
                  };
            }
			
			$marquee.data("marquee.showing", true);
			$li.addClass(options.cssShowing);
     
			$li.css(params).animate({left: "0px", top: "0px"}, options.showSpeed, options.fxEasingShow, function (){ 
				// run the show callback
				if( $.isFunction(options.show) ) options.show.apply(self, [$marquee, $li]);
				$marquee.data("marquee.showing", false);
				if ( $lis.length > 1 ){
                    timeOutId = setTimeout(function (){
                        // scroll the message down
                        $li.css({ position:"absolute" , left:$marquee.innerWidth(), top:0});
                        // finish showing this message
                        finish($li);
                    }, options.pauseSpeed);
                }
			});
		}

		function finish($li){
			setTimeout(function (){
    			// run the aftershow callback, only after we've displayed the first option
                if( $.isFunction(options.aftershow) ) options.aftershow.apply(self, [$marquee, $li]);
                // mark that we're done scrolling this element
                $li.removeClass(options.cssShowing);
                // show the next message
                showNext();
			}, 1000);
		}

		// show the next message in the queue		
		function showNext(){
			// increase the current counter (starts at -1, to indicate a new marquee beginning)
			current++;
			// if we only have 1 entry and it doesn't need to scroll, just cancel processing
			if( current >= $lis.length ){
				// if we've reached our loop count, cancel processing
				if( !isNaN(options.loop) && options.loop > 0 && (++loop_count >= options.loop ) ) return false;
				current = 0;
			} 
			
			// show the next message
			show(current);
		}
		
		// run the init callback
		if( $.isFunction(options.init) ) options.init.apply(self, [$marquee, options]);
		
		// show the first item
		showNext();
	};

	$.Marquee.defaults = {
		scroll:"right"                          // the position of the marquee initially scroll (can be either "top" or "bottom")
		, showSpeed: 850                          // the speed of to animate the initial dropdown of the messages
		, scrollSpeed: 12                         // the speed of the scrolling (keep number low)
		, pauseSpeed: 5000                        // the time to wait before showing the next message or scrolling current message
		, loop: -1                                // determine how many times to loop through the marquees (#'s < 0 = infinite)
		, fxEasingShow: "swing"                   // the animition easing to use when showing a new marquee
		, fxEasingScroll: "linear"                // the animition easing to use when showing a new marquee
		// define the class statements
		, cssShowing: "marquee-showing"

		// event handlers
		, init: null                              // callback that occurs when a marquee is initialized
		, beforeshow: null                        // callback that occurs before message starts scrolling on screen
		, show: null                              // callback that occurs when a new marquee message is displayed
		, aftershow: null                         // callback that occurs after the message has scrolled
	};

})(jQuery);
