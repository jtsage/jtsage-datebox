/**
 * JTSage-DateBox
 * @fileOverview Responsible for creation / open / close / destroy of widget
 * @author J.T.Sage <jtsage+datebox@gmail.com>
 * @author {@link https://github.com/jtsage/jtsage-datebox/contributors|GitHub Contributors}
 * @license {@link https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt|MIT}
 * @version 5.2.0
 */

/**
 * Close the DateBox widget
 *
 */
JTSageDateBox.close = function() {
	// Provide a PUBLIC function to close the element.
	var w = this,
		o = this.options,
		basepop = {};

	// Trigger the popup to close
	// // Prepare close callback.

	o.closeCallback = w._prepFunc( o.closeCallback );

	if ( o.closeCallback !== false ) {
		basepop.afterclose = function() {
			o.closeCallback.apply( w, [{
				initDate    : w.initDate,
				date        : w.theDate,
				duration    : w.lastDuration,
				cancelClose : w.cancelClose
			}].concat( o.closeCallbackArgs ) );
		};
	} else {
		basepop.afterclose = function() {
			return true;
		};
	}
	
	/* eslint-disable no-fallthrough */
	switch ( o.displayMode ) {
		case "blind" :
			w.d.mainWrap.slideUp();
		case "inline" :
			basepop.afterclose.call();
			return true;
		//case "modal" :
		//case "dropdown":
		default :
			$( ".jtsage-datebox-backdrop-div" ).remove();
			w.d.mainWrap.removeClass( "db-show" );
			basepop.afterclose.call();
			w.d.mainWrap.hide();
			w.d.mainWrap.detach();
			break;
	}
	/* eslint-enable no-fallthrough */

	// Unbind all drag handlers, and the resize catch
	$( document )
		.off( w.drag.eMove )
		.off( w.drag.eEnd  )
		.off( w.drag.eEndA )
		.off( "resize"  + w.eventNamespace )
		.off( "keydown" + w.eventNamespace );

	if ( o.useFocus ) {
		w.fastReopen = true;
		setTimeout( (function( t ) {
			return function () {
				t.fastReopen = false;
			};
		}( w )), 300 );
	}
};

