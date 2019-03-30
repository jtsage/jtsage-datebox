/**
 * JTSage-DateBox
 * @fileOverview Short Utility Functions
 * 
 * Contains often used short utility functions that don't
 * easily fit elsewhere
 * 
 * @author J.T.Sage <jtsage+datebox@gmail.com>
 * @author {@link https://github.com/jtsage/jtsage-datebox/contributors|GitHub Contributors}
 * @license {@link https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt|MIT}
 * @version 5.0.0
 */

/* JTSage-DateBox 
 *
 * Short Utility Functions 
 *
 * Contains often used short utility functions that don't
 * easily fit elsewhere
 */


/**
 * Break the duration into component parts
 * 
 * @param  {number} ms Duration, in milliseconds
 * @return {array} [ days, hours, minutes, seconds ]
 */
JTSageDateBox._dur = function(ms) {
	/* Break the duration value down into days/hrs/mins/secs */
	return [
		Math.max( 0, Math.floor( ms / ( 60*60*1000*24 ) ) ),
		Math.max( 0, Math.floor( ms / ( 60*60*1000) % 24 ) ),
		Math.max( 0, Math.floor( ms / ( 60*1000) % 60 ) ),
		Math.max( 0, Math.floor( ms / ( 1000 ) % 60 ) ),
	];
};

/**
 * Find a i18n string (gettext of a sort)
 *
 * This also handles the option overrideKeyName system, and falls back to 
 * defaults before finally admitting defeat.
 * 
 * @param  {string} Index to find
 * @return {*} Value of i18n entry
 */
JTSageDateBox.__ = function(val) {
	/* Grab a localized version of a string (by index) */
	var o     = this.options,
		lang  = o.lang[o.useLang],
		mode  = o[ o.mode + "lang"],
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
	if ( typeof o.lang[ "default" ][val] !== "undefined" ) {
		return o.lang[ "default" ][ val ];
	}
	return "Err:NotFound";
};

/**
 * Get the most apporopriate formatting string depending on mode.
 *
 * Includes an override setting for parseDate utility function.
 * 
 * @return {string} Format string
 */
JTSageDateBox.__fmt = function() {
	var w = this,
		o = this.options;

	if ( typeof w.fmtOver !== "undefined" && w.fmtOver !== false ) {
		return w.fmtOver;
	}
	
	switch ( o.mode ) {
		case "timebox"         :
		case "timeflipbox"     :
			return w.__( "timeOutput" );
		case "durationbox"     :
		case "durationflipbox" :
			return w.__( "durationFormat" );
		case "datetimebox"     :
		case "datetimeflipbox" :
			return w.__( "datetimeFormat" );
		default:
			return w.__( "dateFormat" );
	}
};

/**
 * Zero pad a number
 * 
 * @param  {number} number Number to alter
 * @param  {string} pad If pad is "-", do nothing
 * @return {string} Formatted number
 */
JTSageDateBox._zPad = function(number, pad) {
	// Zero pad a number.
	if ( typeof pad !== "undefined" && pad === "-" ) { return String(number); }
	return ( number < 10  ? "0" : "" ) + String( number );
};

/**
 * Convert a digit to Indic or Arabic numerals.
 * 
 * @param  {string} Text to alter
 * @param  {number} -1 to go back to western arabic, to eastern arabic otherwise
 * @return {string} Altered text
 */
JTSageDateBox._dRep = function( oper, direction ) {
	// Digit replacement Indic/Arabic
	var ch, i,
		start     = 48,
		end       = 57,
		adder     = 1584,
		newString = "";

	if ( direction === -1 ) {
		start += adder;
		end   += adder;
		adder  = -1584;
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

/**
 * Find all numbers in control and replace with eastern arabic
 */
JTSageDateBox._doIndic = function() {
	/* Mass replace of all latin digits in the control */
	var w = this;

	w.d.intHTML.find( "*" ).each( function() {
		if ( $( this ).children().length < 1 ) {

			$( this ).html( w._dRep( $( this ).html() ) );

		}
	});

	w.d.intHTML.find( "input" ).each(function() {

		$( this ).val( w._dRep( $( this ).val() ) );

	});
};

/**
 * Instead of a negative val, return a defautl def
 * 
 * @param  {number} val Value to check
 * @param  {number} def Default if value is negative
 * @return {number} OK or changed value
 */
JTSageDateBox._n = function ( val, def ) {
	return ( val < 0 ) ? def : val;
};

/**
 * This cleans un-needed information from a date.
 *
 * Returns a new date, does not alter reference.
 *
 * Always sets milliseconds to 0.
 *
 * When 2nd argument is a boolean, returns a date of Y-M-DT00:00:00 using arr
 *
 * When 2nd argument is a date, returns [date]T(arg[0][0]):(arg[0][1]):(arg[0][2])
 * 
 * @param  {array} arr h,m,s or y,m,d depending on arg[1]
 * @param  {object|boolean} date Date object, or boolean false
 * @return {object} JavaScript date object
 */
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

/**
 * Checks if a number is between 2 other (non-inclusive)
 *
 * i.e. Valid hours are 0...23, so _btwn(#, -1, 24)
 * 
 * @param  {number} value Number to check
 * @param  {number} low Lower bound
 * @param  {number} high Upper bound
 * @return {boolean} True if number is between low and high
 */
JTSageDateBox._btwn = function(value, low, high) {
	return ( value > low && value < high );
};

/**
 * Finds the most appropriate label for the DateBox.
 *
 * 0, overrideDialogLabel, if set
 * 1. Placeholder text, if set
 * 2. Title attribute, if set
 * 3. Label attached to input, if found
 * 4. boolean false
 * 
 * @return {string} Label for DateBox
 */
JTSageDateBox._grabLabel = function( deflt ) {
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
		return ( tmp === "" ) ? deflt : tmp;
	}
	return o.overrideDialogLabel;
};

/** 
 * Get the appropriate filed order for the mode
 * 
 * @param {string} mode Mode of operation
 * @return {array} Field order
 */
JTSageDateBox._getFldOrder = function( mode ) {
	switch ( mode ) {
		case "durationbox"     :
		case "durationflipbox" :
			return this.__( "durationOrder" );
		case "timebox"         :
		case "timeflipbox"     :
			return this.__( "timeFieldOrder" );
		case "datetimebox"     :
		case "datetimeflipbox" :
			return this.__( "datetimeFieldOrder" );
		default :
			return this.__( "dateFieldOrder" );
	}
};

/**
 * Shortcut method to run a trigger. Used to cut quite a few characters from minified output
 * 
 * @param  {object} Object to pass to trigger
 */
JTSageDateBox._t = function ( obj ) {
	this.d.input.trigger( "datebox", obj );
};

/** 
 * Prep function, pull from global if needed
 * 
 * @param {mixed} Value of function option
 * @return {mixe} Function, or false
 * 
 */
JTSageDateBox._prepFunc = function ( func ) {
	if ( func === false || typeof func === "function" ) { return func; }

	if ( typeof window[ func ] === "function" ) {
		return window[ func ];
	}
	return false;
};

/**
 * @typedef {Object} _pickRanges_Return
 * @property {array} month Arrays of [ value, label, slected (boolean) ]
 * @property {array} year Arrays of [ value, label, selected(boolean) ]
 */

/**
 * Generate the ranges (data contents) of the month and year pickers
 * 
 * @param  {number} dispMonth Current month displayed
 * @param  {number} dispYear Current year displayed
 * @param  {number} realYear Today's year
 * @param  {boolean} relative Year is realtive to real current year, not selected year
 * @return {_pickRanges_Return}
 */
JTSageDateBox._pickRanges = function ( dispMonth, dispYear, realYear, relative ) {
	var w         = this, i,
		o         = this.options,
		calcYear  = ( relative === false ) ? realYear : dispYear,
		startYear = 0,
		endYear   = 0,
		returnVal = {
			month : [],
			year  : []
		};

	for ( i = 0; i <= 11; i++ ) {
		if ( i === dispMonth ) {
			returnVal.month.push( [ i, w.__( "monthsOfYear" )[i], true ] );
		} else {
			returnVal.month.push( [ i, w.__( "monthsOfYear" )[i], false ] );
		}
	}

	if ( o.calYearPickMin < 1 ) {
		startYear = calcYear + o.calYearPickMin;
	} else if ( o.calYearPickMin < 1800 ) {
		startYear = calcYear - o.calYearPickMin;
	} else if ( o.calYearPickMin === "NOW" ) {
		startYear = realYear;
	} else {
		startYear = o.calYearPickMin;
	}

	if ( o.calYearPickMax < 1800 ) {
		endYear = calcYear + o.calYearPickMax;
	} else if ( o.calYearPickMax === "NOW" ) {
		endYear = realYear;
	} else {
		endYear = o.calYearPickMax;
	}

	for ( i = startYear; i <= endYear; i++ ) {
		if ( i === dispYear ) {
			returnVal.year.push( [ i, i, true ] );
		} else {
			returnVal.year.push( [ i, i, false ] );
		}
	}

	return returnVal;
};
