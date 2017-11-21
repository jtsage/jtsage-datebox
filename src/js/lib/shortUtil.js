/* JTSage-DateBox 
 *
 * Short Utility Functions 
 *
 * Contains often used short utility functions that don't
 * easily fit elsewhere
 */


JTSageDateBox._dur = function(ms) {
	/* Break the duration value down into days/hrs/mins/secs */
	var theDuration = [
			ms / ( 60*60*1000*24 ),
			ms / ( 60*60*1000) % 24,
			ms / ( 60*1000) % 60,
			ms / ( 1000 ) % 60,
		];
	$.each(theDuration, function( index, value ){
		if ( value < 0 ) { 
			theDuration[ index ] = 0;
		} else { 
			theDuration[ index ] = Math.floor( value );
		}
	});
	return theDuration;
};

JTSageDateBox.__ = function(val) {
	/* Grab a localized version of a string (by index) */
	var o = this.options,
		lang = o.lang[o.useLang],
		mode = o[ o.mode + "lang"],
		oride = "override" + val.charAt(0).toUpperCase() + val.slice(1);

	if ( typeof o[ oride ] !== "undefined" ) {
		return o[ oride ]; 
	}
	if ( typeof lang !== "undefined" && typeof lang[ val ] !== "undefined" ) {
		return lang[ val ];
	}
	if ( ( typeof mode !== "undefined" ) && ( typeof mode[ val ] !== "undefined" ) ) { 
		return mode[ val ]; 
	}
	if ( typeof o.lang["default"][val] !== "undefined" ) {
		return o.lang[ "default" ][ val ];
	}
	return "Err:NotFound";
};

JTSageDateBox.__fmt = function() {
	/* Grab the most appropriate formatting string for output */
	var w = this,
		o = this.options;

	if ( typeof w.fmtOver !== "undefined" && w.fmtOver !== false ) {
		return w.fmtOver;
	}
	
	switch ( o.mode ) {
		case "timebox":
		case "timeflipbox":
			return w.__( "timeOutput" );
		case "durationbox":
		case "durationflipbox":
			return w.__( "durationFormat" );
		case "datetimebox":
		case "datetimeflipbox":
			return w.__( "datetimeFormat" );
		default:
			return w.__( "dateFormat" );
	}
};

JTSageDateBox._zPad = function(number, pad) {
	// Zero pad a number.
	if ( typeof pad !== "undefined" && pad === "-" ) { return String(number); }
	return ( number < 10  ? "0" : "" ) + String( number );
};

JTSageDateBox._dRep = function( oper, direction ) {
	// Digit replacement Indic/Arabic
	var ch, i, 
		start = 48,
		end = 57,
		adder = 1584,
		newString = "";

	if ( direction === -1 ) {
		start += adder;
		end += adder;
		adder = -1584;
	}
	for ( i = 0; i < oper.length; i++ ) {
		ch = oper.charCodeAt( i );
		if ( ch >= start && ch <= end ) {
			newString = newString + String.fromCharCode( ch + adder );
		} else {
			newString = newString + String.fromCharCode( ch );
		}
	}
	return newString;
};
		
JTSageDateBox._doIndic = function() {
	/* Mass replace of all latin digits in the control */
	var w = this;

	w.d.intHTML.find( "*" ).each( function() {
		if ( $( this ).children().length < 1 ) {

			$( this ).text( w._dRep( $( this ).text() ) );

		} else if ( $( this ).hasClass( "ui-datebox-slideday" ) ) {

			$( this ).html( w._dRep( $( this ).html() ) );

		}
	});

	w.d.intHTML.find( "input" ).each(function() {

		$( this ).val( w._dRep( $( this ).val() ) );

	});
};

JTSageDateBox._n = function ( val, def ) {
	// Don't allow negative values, use a default instead
	return ( val < 0 ) ? def : val;
};

JTSageDateBox._pa = function (arr,date) {
	// "Clean" a date for use.
	if ( typeof date === "boolean" ) { 
		return new this._date( arr[0], arr[1], arr[2], 0, 0, 0, 0 );
	}
	return new this._date( 
		date.get(0),
		date.get(1),
		date.get(2),
		arr[0],
		arr[1],
		arr[2],
		0
	);
};

JTSageDateBox._btwn = function(value, low, high) {
	return ( value > low && value < high );
};

JTSageDateBox._grabLabel = function() {
	// Get the most reasonable label for this datebox.
	// In order of preference - placeholder, title, label for=
	var inputPlaceholder, inputTitle,
		w = this,
		o = this.options,
		tmp = false;

	if ( typeof o.overrideDialogLabel === "undefined" ) {
		inputPlaceholder = w.d.input.attr( "placeholder" );
		inputTitle = w.d.input.attr( "title" );
		
		if ( typeof inputPlaceholder !== "undefined" ) {
			return inputPlaceholder;
		}
		if ( typeof inputTitle !== "undefined" ) {
			return inputTitle;
		}
		tmp = $(document).find( "label[for='" + w.d.input.attr( "id" ) + "']" ).text();
		return ( tmp === "" ) ? false : tmp;
	}
	return o.overrideDialogLabel;
};

JTSageDateBox._t = function ( obj ) {
	this.d.input.trigger( "datebox", obj );
};
		
JTSageDateBox._spf = function ( text, repl ) {
	/* A sort of sprintf replacement */
	if ( ! $.isArray(repl) && ! $.isPlainObject(repl) ) { return text; }

	return text.replace(/{(.+?)}/g, function( match, oper ) {
		return repl[oper];
	});
};

