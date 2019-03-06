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

JTSageDateBox._newDateCheck = {
	/* NOTE: These return true if the test passes.  i.e., dobule negatives galore. */
	whiteDate : function ( testDate ) {
		/* Return true if the date is whitelisted */
		if ( $.inArray( testDate.iso(), this.options.whiteDates) > -1 ) {
			return true;
		} else {
			return false;
		}
	},
	notToday : function ( testDate ) {
		/* Return true if the date *is* today */
		if (
			w.realToday.get(0) === testDate.get(0) && 
			w.realToday.get(1) === testDate.get(1) &&
			w.realToday.get(2) === testDate.get(2)
			) {
				return true; 
		} else {
			return false;
		}
	},
	maxYear : function ( testDate ) {
		/* return true if the date is beyond the max year */
		var testOption = this.options.maxYear;

		if ( testOption === false ) { return false; }
		if ( testDate.get(0) > testOption ) { return true; }
		return false; 
	},
	minYear : function ( testDate ) {
		/* return true if the date is beyond the max year */
		var testOption = this.options.minYear;

		if ( testOption === false ) { return false; }
		if ( testDate.get(0) < testOption ) { return true; }
		return false; 
	},
	afterToday : function ( testDate ) {
		/* Return true if the date is BEFORE today's date (dates AFTER are allowed) */
		if ( testDate < w.realToday ) { return true; }
		return false;
	},
	beforeToday : function ( testDate ) {
		/* return true if the date is AFTER today's date (dates BEFORE are allowed) */
		if ( testDate > w.realToday ) { return true; }
		return false;
	}
};

JTSageDateBox._newDateChecker = function( testDate ) {
	/* Newest Version of the date checker.  With less mess? */
	/*
	 * 
	 * Returns an object:
	 * 
	 * object.good = bool (true == good date)
	 * object.bad = bool (true == bad date)
	 * object.failrule = false, or the rule that failed us.
	 * object.passrule = false, or the whitelist location.
	 */
	var w = this,
		o = this.options,
		returnObject = {
			good: false,
			bad: false,
			failrule: false,
			passrule: false,
		};

	w.realToday = new w._date();

	if ( JTSageDateBox._newDateCheck.whiteDate(testDate) ) {
		returnObject.good = true;
		returnObject.passrule = "whiteDates";
		return returnObject;
	}
	if ( JTSageDateBox._newDateCheck.notToday(testDate) ) {
		returnObject.bad = true;
		returnObject.failrule = "notToday";
		return returnObject;
	}
	if ( JTSageDateBox._newDateCheck.maxYear(testDate) ) {
		returnObject.bad = true;
		returnObject.failrule = "maxYear";
		return returnObject;
	}
	if ( JTSageDateBox._newDateCheck.minYear(testDate) ) {
		returnObject.bad = true;
		returnObject.failrule = "minYear";
		return returnObject;
	}
	if ( JTSageDateBox._newDateCheck.afterToday(testDate) ) {
		returnObject.bad = true;
		returnObject.failrule = "afterToday";
		return returnObject;
	}
	if ( JTSageDateBox._newDateCheck.beforeToday(testDate) ) {
		returnObject.bad = true;
		returnObject.failrule = "beforeToday";
		return returnObject;
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

	if ( $.inArray( "d", order ) > -1 ) {
		step.d = actual;
	}
	if ( $.inArray( "h", order ) > -1 ) {
		step.d = 1;
		step.h = actual;
	}
	if ( $.inArray( "i", order ) > -1 ) {
		step.h = 1;
		step.i = actual;
	}
	if ( $.inArray( "s", order ) > -1 ) {
		step.i = 1;
		step.s = actual;
	}
};