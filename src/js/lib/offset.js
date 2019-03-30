/**
 * JTSage-DateBox
 * @fileOverview Offset dates
 * @author J.T.Sage <jtsage+datebox@gmail.com>
 * @author {@link https://github.com/jtsage/jtsage-datebox/contributors|GitHub Contributors}
 * @license {@link https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt|MIT}
 * @version 5.0.0
 */


/**
 * This method offsets the current date. Do it in such a way that rollover can be prevented
 * 
 * @param  {string} mode Element to shift
 * @param  {number} amount Amount to shift +/-
 * @param  {boolean} update Set to false, will not update display
 */
JTSageDateBox._offset = function( oper, amount, update ) {
	// Compute a date/time offset.
	//   update = false to prevent controls refresh
	// 
	// The rollover option has no effect on year or meridiem.  It makes no sense with year, and
	// meridiem feels odd when allowed to rollover, so it's set to not.
	var testCurrent, condHigh, condLow, condMulti,
		w               = this,
		o               = w.options,
		operNum         = [ "y", "m", "d", "h", "i", "s" ].indexOf( oper ),
		lastDate        = 32 - w.theDate.copy([0],[0,0,32,13]).getDate(),
		thisYear        = [ // Only used when rollover prevented.
			31, 32 - w.theDate.copy([0],[0,1,32,13]).getDate(), 31,
			30, 31, 30,
			31, 31, 30,
			31, 30, 31
		],
		rolloverAllowed = ( oper !== "a" && ( oper === "y" ||
				typeof o.rolloverMode[oper] === "undefined" ||
				o.rolloverMode[oper] === true) );


	// Trap for un-set argument.
	if ( typeof update === "undefined" ) { update = true; }

	if ( oper === "y" && w.theDate.get( 1 ) === 1 && w.theDate.get( 2 ) === 29 ) {
		// Extreme edge case of altering year when date is set to february 29th (a leap year).

		// For this case, we do not check if the new year is a leap year, I'm willing to be a day 
		// off every 4 years or so.

		// This check is not based on rollover mode, it always happens.
		w.theDate.setD( 2, 28 );
	}
	
	if ( oper === "a" ) {

		// Rollover independant, handle meridiem specially.

		if ( amount % 2 !== 0 ) {

			// we modulus divide by 2, because if we move it twice, it's the same as before.
			// Otherwise, if it is PM, we move 12 hours back, if it's AM, we move 12 hours forward.

			testCurrent = ( w.theDate.get( 3 ) > 11 ) ? -12 : 12;

			w.theDate.adj( 3, testCurrent );
		}
	} else if ( rolloverAllowed ) {

		// Rollover allowed, or year operator, just do the update. (year is always ok)
		w.theDate.adj( operNum, amount );

	} else {

		// Rollover not allowed, need to do it piece by piece.

		switch ( oper ) {
			case "m" : // 12 months in a year, zero based
				condHigh  = 11;
				condLow   = 0;
				condMulti = 12;
				break;
			case "d" : // "lastDate" days in a year, one based
				condHigh  = lastDate;
				condLow   = 1;
				condMulti = lastDate;
				break;
			case "h" : // 24 hours in a day, zero based
				condHigh  = 23;
				condLow   = 0;
				condMulti = 24;
				break;
			case "i" : // 60 minutes in an hour, zero based
			case "s" : // 60 seconds in an hour, zero based
				condHigh  = 59;
				condLow   = 0;
				condMulti = 60;
				break;
		}

		// Get what the new value will be.
		testCurrent = w.theDate.get( operNum ) + amount;

		if ( testCurrent < condLow ) {

			// If it's less than a reasonable minimum, normalize it to be in the range
			testCurrent = ( testCurrent % condMulti ) + condMulti;

		} else if ( testCurrent > condHigh ) {

			// Same for higher than reasonable
			testCurrent = testCurrent % condMulti;

		}

		// Trap for month offset, when the date is very near the end of the month
		// and might make things move oddly.  
		//
		// For instance, May 31 -> offset 1 month previous -> April 30
		//  * note the date change as well, since April does not have 31 days.
		//  * this is done carfully, so that May 31 -> offset 2 month prev -> March 31
		if ( oper === "m" && w.theDate.get( 2 ) > thisYear[ testCurrent ] ) {
			w.theDate.setD( 2, thisYear[ testCurrent ] );
		}

		// Finally, update the value
		w.theDate.setD( operNum, testCurrent );
	}

	// If we wish to update the display, do so
	if ( update === true ) { w.refresh(); }

	// Immediate settting?  do so.
	if ( o.useImmediate ) { w._t( { method : "doset" } ); }

	// This fires when we change the calendar display, but don't set the date.
	if ( o.mode === "calbox" ) {
		w._t( {
			method             : "displayChange",
			selectedDate       : w.originalDate,
			shownDate          : w.theDate,
			thisChange         : oper,
			thisChangeAmount   : amount,
			gridStart          : w.getCalStartGrid(),
			gridEnd            : w.getCalEndGrid(),
			selectedInGrid     : w.isSelectedInCalGrid(),
			selectedInBounds   : w.isSelectedInBounds()
		});
	}
	
	// This is the listener event, to let know whatever might be listening that
	// and offset just occured.
	w._t( {
		method    : "offset",
		type      : oper,
		amount    : amount,
		newDate   : w.theDate
	} );
};

/**
 * Alter a date by the startOffset values.
 * 
 * @param  {object} date JavaScript date object
 * @return {object} JavaScript date object
 */
JTSageDateBox._startOffset = function(date) {
	var o = this.options;

	if ( o.startOffsetYears !== false ) {
		date.adj( 0, o.startOffsetYears );
	}
	if ( o.startOffsetMonths !== false ) {
		date.adj( 1, o.startOffsetMonths );
	}
	if ( o.startOffsetDays !== false ) {
		date.adj( 2, o.startOffsetDays );
	}
	return date;
};