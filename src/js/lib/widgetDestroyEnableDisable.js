/**
 * JTSage-DateBox
 * @fileOverview Responsible for creation / open / close / destroy of widget
 * @author J.T.Sage <jtsage+datebox@gmail.com>
 * @author {@link https://github.com/jtsage/jtsage-datebox/contributors|GitHub Contributors}
 * @license {@link https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt|MIT}
 * @version 5.0.0
 */

/**
 * Destroy the DateBox widget and data
 *
 */
JTSageDateBox._destroy = function() {
	var w      = this,
		o      = this.options,
		button = w.d.wrap.find( "bdOpenButton" );

	if ( o.useButton === true ) {
		button.remove();
		w.d.input.unwrap();
	}

	if ( o.lockInput ) {
		w.d.input.removeAttr( "readonly" );
	}

	w.d.input
		.off( "datebox"        )
		.off( "focus.datebox"  )
		.off( "blur.datebox"   )
		.off( "change.datebox" );
		
	$( document )
		.off( w.drag.eMove  )
		.off( w.drag.eStart )
		.off( w.drag.eEnd   )
		.off( w.drag.eEndA  )
		.off( "resize" + w.eventNamespace );
};

/**
 * Disable the control
 */
JTSageDateBox.disable = function() {
	var w = this;
	// Provide a PUBLIC function to Disable the element
	w.d.input.attr( "disabled", true );
	w.disabled = true;
	w._t( { method : "disable" } );
};

/**
 * Enable the control
 */
JTSageDateBox.enable = function() {
	var w = this;
	// Provide a PUBLIC function to Enable the element
	w.d.input.attr( "disabled", false );
	w.disabled = false;
	w._t( { method : "enable" } );
};