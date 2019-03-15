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
 * @todo  Re-write.  I'm not sure how half this works anymore.  Variable names are horrid.
 */
JTSageDateBox._offset = function(mode, amount, update) {
	// Compute a date/time offset.
	//   update = false to prevent controls refresh
	var w = this,
		o = this.options,
		now = this.theDate,
		ok = false, tempBad, bad = false,
		monthEnd = 32 - w.theDate.copy([0],[0,0,32,13]).getDate(),
		dPart = false;

	mode = ( mode || "" ).toLowerCase();
	dPart = $.inArray(mode, [ "y", "m", "d", "h", "i", "s" ]);

	if ( typeof update === "undefined" ) { update = true; }

	if ( mode !== "a" && 
			( typeof o.rolloverMode[mode] === "undefined" || o.rolloverMode[mode] === true )
		) {
		ok = dPart;
	} else {
		switch(mode) {
			case "y": ok = 0; break;
			case "m":
				if ( w._btwn( now.get(1) + amount, -1, 12 ) ) { 
					ok = 1;
				} else {
					tempBad = now.get(1) + amount;
					if ( tempBad < 0 ) { 
						bad = [1, 12 + tempBad];
					} else {
						bad = [1, tempBad % 12];
					}
				}
				break;
			case "d":
				if ( w._btwn( 
						now.get(2) + amount, 
						0, 
						( monthEnd + 1 ) 
					)) { 
						ok = 2;
					} else {
						tempBad = now.get(2) + amount;
						if ( tempBad < 1 ) {
							bad = [2, monthEnd + tempBad];
						} else {
							bad = [2, tempBad % monthEnd];
						}
					}
				break;
			case "h":
				if ( w._btwn( now.get(3) + amount, -1, 24 ) ) { 
					ok = 3;
				} else {
					tempBad = now.get(3) + amount;
					if ( tempBad < 0 ) { 
						bad = [3, 24 + tempBad];
					} else {
						bad = [3, tempBad % 24];
					}
				}
				break;
			case "i":
				if ( w._btwn( now.get(4) + amount, -1, 60 ) ) { 
					ok = 4;
				} else {
					tempBad = now.get(4) + amount;
					if ( tempBad < 0 ) { 
						bad = [4, 59 + tempBad];
					} else {
						bad = [4, tempBad % 60];
					}
				}
				break;
			case "s":
				if ( w._btwn( now.get(5) + amount, -1, 60 ) ) { 
					ok = 5; 
				} else {
					tempBad = now.get(5) + amount;
					if ( tempBad < 0 ) { 
						bad = [5, 59 + tempBad];
					} else {
						bad = [5, tempBad % 60];
					}
				}
				break;
			case "a":
				w._offset( "h", ( ( amount > 0 ) ? 1 : -1 ) * 12, false );
				break;
		}
	}
	if ( ok !== false ) { 
		w.theDate.adj( ok, amount );
	} else {
		w.theDate.setD(bad[0],bad[1]);
	}
	if ( update === true ) { w.refresh(); }
	if ( o.useImmediate ) { w._t( { method: "doset" } ); }

	if ( w.calBackDate !== false ) {
		w._t( {
			method: "displayChange",
			selectedDate: w.calBackDate,
			shownDate: w.theDate,
			thisChange: mode,
			thisChangeAmount: amount,
		});
	}
		
	w._t( {
		method: "offset",
		type: mode,
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