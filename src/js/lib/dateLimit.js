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
		return ( $.inArray( testDate.iso(), this.options.enableDates) > -1 );
	},
	whiteDate : function ( testDate ) {
		/* Return true if the date is whitelisted */
		if ( this.options.whiteDates === false ) { return false; }

		return ( $.inArray( testDate.iso(), this.options.whiteDates) > -1 );
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

		return  ( testDate.get(0) > testOption ); 
	},
	minYear : function ( testDate ) {
		/* return true if the date is beyond the max year */
		var testOption = this.options.minYear;

		if ( testOption === false ) { return false; }

		return ( testDate.get(0) < testOption ); 
	},
	afterToday : function ( testDate ) {
		/* Return true if the date is BEFORE today's date (dates AFTER are allowed) */
		var testOption = this.options.afterToday;

		if ( testOption === false ) { return false; }

		return ( testDate < this.realToday );
	},
	beforeToday : function ( testDate ) {
		/* return true if the date is AFTER today's date (dates BEFORE are allowed) */
		var testOption = this.options.beforeToday;

		if ( testOption === false ) { return false; }

		return ( testDate > this.realToday );
	},
	minDays : function ( testDate ) {
		/* return true if the date is invalid (too many days before today) */
		var testOption = this.options.minDays;

		if ( testOption === false ) { return false; }

		return ( this.realToday.getEpochDays() - testOption < testDate.getEpochDays() );
	},
	maxDays : function ( testDate ) {
		/* return true if the date is invalid (too many days after today) */
		var testOption = this.options.maxDays;

		if ( testOption === false ) { return false; }

		return ( this.realToday.getEpochDays() + testOption > testDate.getEpochDays() );
	},
	minHour : function ( testDate ) {
		/* return true if the time is invalid (hour before allowed) */
		var testOption = this.options.minHour;

		if ( testOption === false ) { return false; }

		return ( testDate.get(3) < testOption );
	},
	maxHour : function ( testDate ) {
		/* return true if the time is invalid (hour after allowed) */
		var testOption = this.options.maxHour;

		if ( testOption === false ) { return false; }

		return ( testDate.get(3) > testOption );
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
	validHours : function ( testDate ) {
		/* return true if the hour *IS VALID* */
		var testOption = this.options.validHours;

		return ( $.iArray( testDate.get(3), testOption ) > -1 );
	},
	blackDays : function ( testDate ) {
		/* return true if the date matched blacked out days of the week */
		var testOption = this.options.blackDays;

		if ( testOption === false ) { return false; }

		return ( $.inArray( testDate.getDay(), testOption ) > -1 );
	},
	blackDates : function ( testDate ) {
		/* return true if the date is blacklisted */
		var testOption = this.options.blackDates;

		if ( testOption === false ) { return false; }

		return ( $.inArray( testDate.iso(), testOption ) > -1 );
	},
	blackDatesRec : function ( testDate ) {
		/* return true if the date is blacklisted in the recurring dates */
		var i, testOption = this.options.blackDatesRec;

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
		itt, done = false,
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
		];

	w.realToday = new w._date();

	// If "enableDates" is in use, no other checks are performed
	if ( this.options.enableDates !== false ) { 
		if ( w._newDateCheck.whiteDate.apply( w, [ testDate ] ) ) {
			returnObject.passrule = "enableDates";
		} else {
			returnObject.bad = true;
			returnObject.good = false;
			returnObject.failrule = "enableDates";
		}
		return returnObject;
	}

	// If "validHours" is in use, no other checks are performed
	if ( this.options.validHours !==  false ) {
		if ( w._newDateCheck.validHours.apply( w, [ testDate] ) ) {
			returnObject.passrule = "validHours";
		} else {
			returnObject.bad = true;
			returnObject.good = false;
			returnObject.failrule = "validHours";
		}
		return returnObject;
	}

	// If a date is "whiteDates", no other checks are performed
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

JTSageDateBox._getCleanDur = function() {
	var w            = this,
		o            = this,
		thisDuration = w.theDate.getEpoch() - w.initDate.getEpoch();

	// Check for less than zero. (and fix it)
	if ( thisDuration < 0 ) {
		thisDuration = 0;
		w.theDate = w.initDate.copy();
	}

	if ( o.minDur !== false && thisDuration < o.minDur ) {
		w.theDate = new Date( w.initDate.getTime() + ( o.minDur * 1000 ) );
		thisDuration = o.minDur;
	}
	if ( o.maxDur !== false && thisDuration > o.maxDur ) {
		w.theDate = new Date( w.initDate.getTime() + ( o.maxDur * 1000 ) );
		thisDuration = o.maxDur;
	}

	w.lastDuration  = thisDuration;
	w.lastDurationA = w._dur( thisDuration * 1000 );

	return [ thisDuration, w._dur( thisDuration * 1000 ) ];
};

JTSageDateBox._check = function() {
	// Check to see if a date is valid. (Old way, left as a shim)
	var checkObj = this._newDateChecker( this.theDate );

	this.dateOK = ( checkObj.good === true );

	return checkObj.good;
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