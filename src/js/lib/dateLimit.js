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
	enableDate : function ( testDate ) {
		/* Return true if the date is whitelisted */
		if ( $.inArray( testDate.iso(), this.options.enableDates) > -1 ) {
			return true;
		} else {
			return false;
		}
	},
	whiteDate : function ( testDate ) {
		/* Return true if the date is whitelisted */
		if ( this.options.whiteDates === false ) { return false; }

		if ( $.inArray( testDate.iso(), this.options.whiteDates) > -1 ) {
			return true;
		} else {
			return false;
		}
	},
	notToday : function ( testDate ) {
		/* Return true if the date *is* today */
		if ( this.options.notToday === false ) { return false; }

		if (
			this.realToday.get(0) === testDate.get(0) && 
			this.realToday.get(1) === testDate.get(1) &&
			this.realToday.get(2) === testDate.get(2)
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
		var testOption = this.options.afterToday;

		if ( testOption === false ) { return false; }

		if ( testDate < this.realToday ) { return true; }
		return false;
	},
	beforeToday : function ( testDate ) {
		/* return true if the date is AFTER today's date (dates BEFORE are allowed) */
		var testOption = this.options.beforeToday;

		if ( testOption === false ) { return false; }

		if ( testDate > this.realToday ) { return true; }
		return false;
	},
	minDays : function ( testDate ) {
		/* return true if the date is invalid (too many days before today) */
		var testOption = this.options.minDays;

		if ( testOption === false ) { return false; }

		if ( this.realToday.getEpochDays() - testOption < testDate.getEpochDays() ) {
			return true;
		}
		return false;
	},
	maxDays : function ( testDate ) {
		/* return true if the date is invalid (too many days after today) */
		var testOption = this.options.maxDays;

		if ( testOption === false ) { return false; }

		if ( this.realToday.getEpochDays() + testOption > testDate.getEpochDays() ) {
			return true;
		}
		return false;
	},
	minHour : function ( testDate ) {
		/* return true if the time is invalid (hour before allowed) */
		var testOption = this.options.minHour;

		if ( testOption === false ) { return false; }

		if ( testDate.get(3) < testOption ) { return true; }
		return false;
	},
	maxHour : function ( testDate ) {
		/* return true if the time is invalid (hour after allowed) */
		var testOption = this.options.maxHour;

		if ( testOption === false ) { return false; }

		if ( testDate.get(3) > testOption ) { return true; }
		return false;
	},
	minTime : function ( testDate ) {
		/* return true if the time is before the minimum allowed */
		var testOption = this.options.minTime,
			splitOption = null,
			testHour = testDate.get(3);

		if ( testOption === false ) { return false; }

		splitOption = this.options.minTime.split(":");

		// Hour is before allowed, fail
		if ( testHour < splitOption[0] ) { return true; }
		// Hour is after allowed, pass
		if ( testHour > splitOption[0] ) { return false; }
		// Hour is the same, check minutes
		if ( testDate.get(4) < splitOption[1] ) { return true; }
		return false;
	},
	maxTime : function ( testDate ) {
		/* return true if the time is after the maximum allowed */
		var testOption = this.options.maxTime,
			splitOption = null,
			testHour = testDate.get(3);

		if ( testOption === false ) { return false; }

		splitOption = this.options.maxTime.split(":");
		// Hour is before allowed, pass
		if ( testHour < splitOption[0] ) { return false; }
		// Hour is after allowed, fail
		if ( testHour > splitOption[0] ) { return true; }
		// Hour is the same, check minutes
		if ( testDate.get(4) > splitOption[1] ) { return true; }
		return false;
	},
	blackDays : function ( testDate ) {
		/* return true if the date matched blacked out days of the week */
		var testOption = this.options.blackDays;

		if ( testOption === false ) { return false; }

		if ( $.inArray( testDate.getDay(), testOption ) > -1 ) {
			return true;
		}
		return false;
	},
	blackDates : function ( testDate ) {
		/* return true if the date is blacklisted */
		var testOption = this.options.blackDates;

		if ( testOption === false ) { return false; }

		if ( $.inArray( testDate.iso(), testOption ) > -1 ) {
			return true;
		}
		return false;
	},
	blackDatesRec : function ( testDate ) {
		/* return true if the date is blacklisted in the recurring dates */
		var testOption = this.options.blackDatesRec;

		if ( testOption === false ) { return false; }

		for ( i = 0; i < testOption.length; i++ ) {
			if (
				( testOption[i][0] === -1 || testOption[i][0] === testDate.get(0) ) &&
				( testOption[i][1] === -1 || testOption[i][1] === testDate.get(1) ) &&
				( testOption[i][2] === -1 || testOption[i][2] === testDate.get(2) )
			) { return true ;}
		}
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
		itt, done = false;
		returnObject = {
			good: true,
			bad: false,
			failrule: false,
			passrule: false,
			dateObj: testDate.copy()
		},
		badChecks = [
			"blackDays", "blackDates", "blackDatesRec",
			"notToday", "maxYear", "minYear", "afterToday", "beforeToday",
			"minDays", "maxDays", "minHour", "maxHour", "minTime", "maxTime"
		]

	w.realToday = new w._date();

	if ( this.options.enableDates !== false ) { 
		if ( w._newDateCheck.whiteDate.apply( w, [ testDate ] ) ) {
			returnObject.passrule = "enableDates";
			return returnObject;
		} else {
			returnObject.bad = true;
			returnObject.good = false;
			returnObject.failrule = "enableDates";
			return returnObject;
		}
	}

	if ( w._newDateCheck.whiteDate.apply( w, [ testDate ] ) ) {
		returnObject.passrule = "whiteDates";
		return returnObject;
	}

	for ( itt = 0; itt < badChecks.length && !done; itt++ ) {
		if ( w._newDateCheck[ badChecks[ itt ] ].apply( w, [ testDate ] ) ) {
			returnObject.bad = true;
			returnObject.good = false;
			returnObject.failrule = badChecks[ itt ];
			done = true;
		}
	}

	return returnObject;
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