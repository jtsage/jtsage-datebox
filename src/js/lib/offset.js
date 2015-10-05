/* JTSage-DateBox 
 *
 * Date Offset
 *
 * Contains the logic to offset the date
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
					if ( bad < 0 ) { 
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
					if ( bad < 0 ) { 
						bad = [3, 23 + tempBad];
					} else {
						bad = [3, tempBad % 23];
					}
				}
				break;
			case "i":
				if ( w._btwn( now.get(4) + amount, -1, 60 ) ) { 
					ok = 4;
				} else {
					tempBad = now.get(4) + amount;
					if ( bad < 0 ) { 
						bad = [4, 59 + tempBad];
					} else {
						bad = [4, tempBad % 59];
					}
				}
				break;
			case "s":
				if ( w._btwn( now.get(5) + amount, -1, 60 ) ) { ok = 5; }
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