 /**
     * JTSage-DateBox
     * @fileOverview Offset dates
     * @author J.T.Sage <jtsage+datebox@gmail.com>
     * @author {@link https://github.com/jtsage/jtsage-datebox/contributors|GitHub Contributors}
     * @license {@link https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt|MIT}
     * @version 5.0.0
     *
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
	var testCurrent, condHigh, condLow, condMulti,
		w        = this,
		o        = w.options,
		operNum  = $.inArray( oper, [ "y", "m", "d", "h", "i", "s" ] ),
		lastDate = 32 - w.theDate.copy([0],[0,0,32,13]).getDate();


	// Trap for un-set argument.
	if ( typeof update === "undefined" ) { update = true; }
	
	if (
			oper === "y" ||
			typeof o.rolloverMode[oper] === "undefined" ||
			o.rolloverMode[oper] === true
	) {
		// Rollover allowed, or year operator, just do the update. (year is always ok)
		if ( oper === "a" ) {
			w.theDate.adj( 3, 12 * amount );
		} else {
			w.theDate.adj( operNum, amount );
		}
	} else if ( oper === "a" ) {
		// Rollover disallowed, handle meridiem specially.
		if ( amount % 2 !== 0 ) {
			// do something.  same for all, no matter the amount direction.
			// we modulus divide by 2, because if we move it twice, it's the same
			// as before.
			if ( w.theDate.get( 3 ) > 11 ) {
				w.theDate.adj( 3, -12 );
			} else {
				w.theDate.adj( 3, 12 );
			}
		}
	} else {
		// Rollover not allowed, need to do it piece by piece.

		// Edge case unhandled: May 31 offset month -1 Results in April 31, a.k.a May 1.
		// Not sure how to handle this.
		switch ( oper ) {
			case "m" :
				condHigh  = 11;
				condLow   = 0;
				condMulti = 12;
				break;
			case "d" :
				condHigh  = lastDate;
				condLow   = 1;
				condMulti = lastDate;
				break;
			case "h" :
				condHigh  = 23;
				condLow   = 0;
				condMulti = 24;
				break;
			case "i" :
			case "s" :
				condHigh  = 59;
				condLow   = 0;
				condMulti = 60;
				break;
		}

		testCurrent = w.theDate.get( operNum ) + amount;

		if ( testCurrent < condLow ) {
			w.theDate.setD( operNum, ( testCurrent % condMulti ) + condMulti );
		} else if ( testCurrent > condHigh ) {
			w.theDate.setD( operNum, testCurrent % condMulti );
		} else {
			w.theDate.setD( operNum, testCurrent );
		}
	}

	if ( update === true ) { w.refresh(); }
	if ( o.useImmediate ) { w._t( { method: "doset" } ); }

	if ( w.calBackDate !== false ) {
		w._t( {
			method: "displayChange",
			selectedDate: w.calBackDate,
			shownDate: w.theDate,
			thisChange: oper,
			thisChangeAmount: amount,
		});
	}
		
	w._t( {
		method: "offset",
		type: oper,
		amount: amount,
		newDate: w.theDate
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