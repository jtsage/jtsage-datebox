/* JTSage-DateBox 
 *
 * MODE File
 *
 * Provide the following display modes:
 * * calbox
 *
 * Define the standard options as well
 */

 mergeOpts({
	calHighToday: true,
	calHighPick: true,
	
	calShowDays: true,
	calOnlyMonth: false,
	calWeekMode: false,
	calWeekModeDay: 1,
	calControlGroup: false,
	calShowWeek: false,
	calUsePickers: false,
	calNoHeader: false,
	calFormatter: false,
	calAlwaysValidateDates: false,
	
	calYearPickMin: -6,
	calYearPickMax: 6,
	calYearPickRelative: true,

	calBeforeAppendFunc: function(t) { return t; },
	
	highDays: false,
	highDates: false,
	highDatesRec: false,
	highDatesAlt: false,
	enableDates: false,
	calDateList: false,
	calShowDateList: false
});


JTSageDateBox._cal_ThemeDateCK = {
	selected : function ( testDate ) {
		if ( this.theDate.iso() === testDate.iso() ) { return true; }
		return false;
	},
	today : function ( testDate ) {
		if ( this.realToday.iso() === testDate.iso() ) { return true; }
		return false;
	},
	highDates : function ( testDate ) {
		/* Return true if found */
		var testOption = this.options.highDates;

		if ( testOption === false ) { return false; }

		if ( $.inArray( testDate.iso(), testOption ) > -1 ) {
			return true;
		}
		return false;
	},
	highDatesAlt : function ( testDate ) {
		/* Return true if found */
		var testOption = this.options.highDatesAlt;

		if ( testOption === false ) { return false; }

		if ( $.inArray( testDate.iso(), testOption ) > -1 ) {
			return true;
		}
		return false;
	},
	highDatesRec : function ( testDate ) {
		/* return true if the date is listed in the recurring dates */
		var testOption = this.options.highDatesRec;

		if ( testOption === false ) { return false; }

		for ( i = 0; i < testOption.length; i++ ) {
			if (
				( testOption[i][0] === -1 || testOption[i][0] === testDate.get(0) ) &&
				( testOption[i][1] === -1 || testOption[i][1] === testDate.get(1) ) &&
				( testOption[i][2] === -1 || testOption[i][2] === testDate.get(2) )
			) { return true ;}
		}
		return false;
	},
	highDays : function ( testDate ) {
		/* return true if the date matched blacked out days of the week */
		var testOption = this.options.highDays;

		if ( testOption === false ) { return false; }

		if ( $.inArray( testDate.getDay(), testOption ) > -1 ) {
			return true;
		}
		return false;
	}
};

JTSageDateBox._cal_ThemeDate = function( testDate ) {
	/* Newest Version of the date checker.  With less mess? */
	/*
	 * Returns an object:
	 * 
	 * object.theme = Theme to use for the date
	 */
	var w = this,
		o = this.options,
		t = this.options.theme,
		itt, done = false;
		returnObject = {
			theme: t.cal_Default,
		},
		dateThemes = [
			[ "selected", "cal_Selected" ],
			[ "today" , "cal_Today" ],
			[ "highDates", "cal_DateHigh" ],
			[ "highDatesAlt", "cal_DateHighAlt" ],
			[ "highDatesRec", "cal_DateHighRec" ],
			[ "highDays", "cal_DayHigh" ]
		];

	w.realToday = new w._date();

	for ( itt = 0; itt < dateThemes.length && !done; itt++ ) {
		if ( w._cal_ThemeDateCK[ dateThemes[ itt ][0] ].apply( w, [ testDate ] ) ) {
			returnObject.theme = t[ dateThemes[ itt ][1] ];
			done = true;
		}
	}

	return returnObject;
};

JTSageDateBox._build.calbox = function () {
	var w = this,
		o = this.options,
		t = this.options.theme,
		_sf = this.styleFunctions,
		uid = "ui-datebox-",
		// Today's real date, not based on selection
		date_realToday = new w._date(),
		// Currently selected date, possibly not confirmed (next/prev month)
		date_selected = w.theDate,
		// First day of the displayed month
		date_firstOfMonth = w.theDate.copy( false, [ 0, 0, 1, 12, 1, 1, 1 ] ),
		// Last day of the displayed month
		date_lastOfMonth = date_firstOfMonth.copy( [ 0, 1 ] ).adj( 2, -1 ),
		// How many days from the previous month (or blanks) need to appear
		grid_headOffset = w.__( "calStartDay" ) - date_firstOfMonth.getDay(),
		// How many days from the next month (of blanks) need to appear
		grid_tailOffset = 6 + ( w.__( "calStartDay" ) - date_lastOfMonth.getDay()),
		// First date of the grid (possibly blanked out)
		date_firstOfGrid = date_firstOfMonth.copy( [ 0, 0, grid_headOffset ] ),
		// Last date of the grid (possibly blanked out)
		date_lastOfGrid = date_lastOfMonth.copy( [ 0, 0, grid_tailOffset ] ),
		// How many weeks the grid has (Low = 4, Max = 6.)
		grid_Weeks = ( date_lastOfGrid.getEpochDays() - date_firstOfGrid.getEpochDays() + 1 ) / 7,
		// The current working date. Stepped from first to last date of the grid
		date_working = date_firstOfGrid.copy(),
		// How many columns the grid has (7 days, 8th optional week number)
		grid_Cols = o.calShowWeek ? 8 : 7,
		// This holds the grid temporarily
		calContent = "",
		// Control variables.
		cntlRow, cntlCol, cntlObj = {};
		// This holds the day of week display
		weekdayControl = "";

	if ( typeof w.d.intHTML !== "boolean" ) { 
		w.d.intHTML.remove(); 
		w.d.intHTML = null;
	}
	
	w.d.headerText = ( ( w._grabLabel() !== false ) ? 
		w._grabLabel() :
		w.__( "titleDateDialogLabel" )
	);
	w.d.intHTML = $( "<span>" );

	calContent = $( _sf.calGrid() ).appendTo( w.d.intHTML );
	
	if ( o.calShowDays ) {
		w._cal_days = w.__( "daysOfWeekShort").concat( w.__( "daysOfWeekShort" ) );

		if ( o.calShowWeek ) {
			weekdayControl += _sf.calNonButton( "&nbsp" );
		}

		for ( i=0; i<=6;i++ ) {
			weekdayControl +=  _sf.calNonButton( 
				w._cal_days[ ( i + w.__( "calStartDay") ) % 7 ],
				grid_Cols
			);
		}
		weekdayControl =  $( _sf.calRow( weekdayControl ) )
			.appendTo( calContent );

		if ( w.__( "isRTL" ) === true ) { 
			weekdayControl.css( "direction", "rtl" );
		}

	}

	if ( ! $.isFunction( o.calFormatter ) && 
		o.calFormatter !== false &&
		$.isFunction( window[ o.calFormatter ] ) ) {
			o.calFormatter = window[ o.calFormatter ];
	}

	if ( ! $.isFunction( o.calBeforeAppendFunc ) && 
		o.calBeforeAppendFunc !== false &&
		$.isFunction( window[ o.calBeforeAppendFunc ] ) ) {
			o.calBeforeAppendFunc = window[ o.calBeforeAppendFunc ];
	}

	/* Actually build and populate the calendar. One pass */
	for ( cntlRow = 0; cntlRow < grid_Weeks; cntlRow++ ) {
		for ( cntlCol = 0; cntlCol < 7; cntlCol++ ) {
			cntlObj = Object.assign(
				w._newDateChecker(date_working),
				w._cal_ThemeDate(date_working)
			);
			console.log(cntlObj);

			date_working.adj( 2, 1 ); //Add ONE day
		}
	}



};