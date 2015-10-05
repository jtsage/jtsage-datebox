/* JTSage-DateBox 
 *
 * Date Limiting
 *
 * Contains the shared elements of date limiting.
 * 
 * CalBox specific code is in the calbox build.
 */

JTSageDateBox._minStepFix = function() {
	// Round "extra" minutes when using a stepper.
	var newMinute = this.theDate.get(4), 
		mstep = this.options.minuteStep,
		roundDirection = this.options.minStepRound,
		remainder = newMinute % mstep;

	if ( mstep > 1 && remainder > 0 ) {
		if ( roundDirection < 0 ) {
			newMinute = newMinute - remainder;
		} else if ( roundDirection > 0 ) {
			newMinute = newMinute + ( mstep - remainder );
		} else {
			if ( newMinute % mstep < mstep / 2 ) {
				newMinute = newMinute - remainder;
			} else {
				newMinute = newMinute + ( mstep - remainder );
			}
		}
	this.theDate.setMinutes(newMinute);
	}
};


JTSageDateBox._check = function() {
	// Check to see if a date is valid.
	var td, year, month, date, i, tihm,
		w = this,
		o = this.options,
		now = this.theDate;
	
	w.dateOK = true;
	if ( typeof o.mode === "undefined") { return true; }

	if ( o.afterToday ) {
		td = new w._date();
		if ( now < td ) { now = td; }
	}
	if ( o.beforeToday ) {
		td = new w._date();
		if ( now > td ) { now = td; }
	}
	if ( o.maxDays !== false ) {
		td = new w._date();
		td.adj( 2, o.maxDays );
		if ( now > td ) { now = td; }
	}
	if ( o.minDays !== false ) {
		td = new w._date();
		td.adj( 2, -1 * o.minDays );
		if ( now < td ) { now = td; }
	}
	if ( o.minHour !== false ) {
		if ( now.get(3) < o.minHour ) {
			now.setD( 3, o.minHour );
		}
	}
	if ( o.maxHour !== false ) {
		if ( now.get(3) > o.maxHour ) {
			now.setD( 3, o.maxHour );
		}
	}
	if ( o.minTime !== false ) {
		td = new w._date();
		tihm = o.minTime.split(":"); 
		td.setD( 3, tihm[0] ).setD( 4, tihm[1] );
		if ( now < td ) { now = td; }
	}
	if ( o.maxTime !== false ) {
		td = new w._date();
		tihm = o.maxTime.split(":"); 
		td.setD( 3, tihm[0] ).setD( 4, tihm[1] );
		if ( now > td ) { now = td; }
	}
	if ( o.maxYear !== false ) {
		td = new w._date( o.maxYear, 11, 31 );
		if ( now > td ) { now = td; }
	}
	if ( o.minYear !== false ) {
		td = new w._date( o.minYear, 0, 1 );
		if ( now < td ) { now = td; }
	}

	if ( o.mode.substr(0,4) === "time" || o.mode.substr(0,3) === "dur" ) {
		if ( o.mode === "timeflipbox" && o.validHours !== false ) {
			if ( $.inArray( now.get(3), o.validHours ) < 0 ) { w.dateOK = false; }
		}
	} else {
		if ( o.blackDatesRec !== false ) {
			year = now.get(0);
			month = now.get(1);
			date = now.get(2);

			for ( i=0; i<o.blackDatesRec.length; i++ ) {
				if (
					( o.blackDatesRec[i][0] === -1 || o.blackDatesRec[i][0] === year ) &&
					( o.blackDatesRec[i][1] === -1 || o.blackDatesRec[i][1] === month ) &&
					( o.blackDatesRec[i][2] === -1 || o.blackDatesRec[i][2] === date )
				) { w.dateOK = false; }
			}
		}
		if ( o.blackDates !== false ) {
			if ( $.inArray( now.iso(), o.blackDates ) > -1 ) { 
				w.dateOK = false; 
			}
		}
		if ( o.blackDays !== false ) {
			if ( $.inArray( now.getDay(), o.blackDays ) > -1 ) { 
				w.dateOK = false; 
			}
		}
		if ( o.whiteDates !== false ) {
			if ( $.inArray( w.theDate.iso(), o.whiteDates ) > -1 ) { 
				w.dateOK = true;
				now = w.theDate;
			}
		}
	}
	w.theDate = now;
};

JTSageDateBox._fixstepper = function( order ) {
	// Turn back off steppers when displaying a less precise 
	// unit in the same control.
	var step = this.options.durationSteppers,
		actual = this.options.durationStep;
	
	if ( $.inArray( "s", order ) > -1 ) {
		step.i = 1;
		step.s = actual;
	}
	if ( $.inArray( "i", order ) > -1 ) {
		step.h = 1;
		step.s = actual;
	}
	if ( $.inArray( "h", order ) > -1 ) {
		step.d = 1;
		step.s = actual;
	}
};