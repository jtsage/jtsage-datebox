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
	calHighToday        : true,
	calHighPick         : true,
	calHighOutOfBounds  : true,
	
	calShowDays         : true,
	calOnlyMonth        : false,
	calShowWeek         : false,
	calUsePickers       : false,
	calNoHeader         : false,
	
	calYearPickMin      : -6,
	calYearPickMax      : 6,
	calYearPickRelative : true,

	calFormatter        : function(t) { return t.get(2); },
	calBeforeAppendFunc : function(t) { return t; },
	
	highDays            : false,
	highDates           : false,
	highDatesRec        : false,
	highDatesAlt        : false,
	enableDates         : false,
	calDateList         : false,
	calShowDateList     : false
});


JTSageDateBox._cal_ThemeDateCK = {
	selected : function ( testDate ) {
		if ( this.options.calHighPick === false ) { return false; }
		if ( this.originalDate.iso() === testDate.iso() ) { 
			this.calDateVisible = true;
			return true;
		}
		return false;
	},
	today : function ( testDate ) {
		if ( this.options.calHighToday === false ) { return false; }
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
		var i, testOption = this.options.highDatesRec;

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

JTSageDateBox._cal_ThemeDate = function( testDate, dispMonth ) {
	/* Newest Version of the date checker.  With less mess? */
	/*
	 * Returns an object:
	 * 
	 * object.theme = Theme to use for the date
	 */
	var w = this,
		o = this.options,
		itt, done = false,
		returnObject = {
			theme: o.theme_cal_Default,
			inBounds: true
		},
		dateThemes = [
			[ "selected",     "theme_cal_Selected" ],
			[ "today" ,       "theme_cal_Today" ],
			[ "highDates",    "theme_cal_DateHigh" ],
			[ "highDatesAlt", "theme_cal_DateHighAlt" ],
			[ "highDatesRec", "theme_cal_DateHighRec" ],
			[ "highDays",     "theme_cal_DayHigh" ]
		];

	w.realToday = new w._date();

	if ( testDate.get(1) !== dispMonth ) { 
		returnObject.inBounds = false;

		if ( o.calHighOutOfBounds === true ) {
			returnObject.theme = o.theme_cal_OutOfBounds;
			done = true;
		}
	}

	for ( itt = 0; itt < dateThemes.length && !done; itt++ ) {
		if ( w._cal_ThemeDateCK[ dateThemes[ itt ][0] ].apply( w, [ testDate ] ) ) {
			returnObject.theme = o[ dateThemes[ itt ][1] ];
			done = true;
		}
	}

	return returnObject;
};

JTSageDateBox._cal_pickRanges = function ( dispMonth, dispYear, realYear ) {
	var w         = this, i,
		o         = this.options,
		calcYear  = ( o.calYearPickRelative === false ) ? realYear : dispYear,
		startYear = 0,
		endYear   = 0,
		returnVal = {
			month: [],
			year: []
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

JTSageDateBox._build.calbox = function () {
	var w                 = this, i,
		o                 = this.options,
		_sf               = this.styleFunctions,
		// Today's real date, not based on selection
		date_realToday    = new w._date(),
		// First day of the displayed month
		date_firstOfMonth = w.theDate.copy( false, [ 0, 0, 1, 12, 1, 1, 1 ] ),
		// Last day of the displayed month
		date_lastOfMonth  = date_firstOfMonth.copy( [ 0, 1 ] ).adj( 2, -1 ),
		// Actual month (used to find bounds)
		date_displayMonth = date_firstOfMonth.get(1),
		// Actual year (used to find bounds)
		date_displayYear  = date_firstOfMonth.get(0),
		// How many days from the previous month (or blanks) need to appear
		grid_headOffset   = w.__( "calStartDay" ) - date_firstOfMonth.getDay(),
		// How many days from the next month (of blanks) need to appear
		grid_tailOffset   = 6 + ( w.__( "calStartDay" ) - date_lastOfMonth.getDay()),
		// First date of the grid (possibly blanked out)
		date_firstOfGrid  = date_firstOfMonth.copy( [ 0, 0, grid_headOffset ] ),
		// Last date of the grid (possibly blanked out)
		date_lastOfGrid   = date_lastOfMonth.copy( [ 0, 0, grid_tailOffset ] ),
		// How many weeks the grid has (Low 4, Max 6.)
		grid_Weeks        = ( 
			date_lastOfGrid.getEpochDays() - date_firstOfGrid.getEpochDays() + 1 ) / 7,
		// The current working date. Stepped from first to last date of the grid
		date_working      = date_firstOfGrid.copy(),
		// How many columns the grid has (7 days, 8th optional week number)
		grid_Cols         = o.calShowWeek ? 8 : 7,
		// This holds the grid temporarily
		calContent        = "",
		calCntlRow        = "",
		// Control variables.
		cntlRow, cntlCol, cntlObj = {},
		// This holds the day of week display
		weekdayControl    = $("");

	if ( typeof w.d.intHTML !== "boolean" ) { 
		w.d.intHTML.remove(); 
		w.d.intHTML = null;
	}
	
	w.d.headerText = ( ( w._grabLabel() !== false ) ? 
		w._grabLabel() :
		w.__( "titleDateDialogLabel" )
	);
	w.d.intHTML = $( "<span>" );

	// Internal header (not the widget master header, a header for the calendar)
	//
	// Expects a ".dbCalNext" and ".dbCalPrev" for prev/next button events.
	if ( o.calNoHeader === false ) {
		_sf.calHeader.apply( w, [
			w._formatter( w.__( "calHeaderFormat"), w.theDate ),
			o.theme_cal_PrevBtnIcn,
			o.theme_cal_PrevBtnCls,
			o.theme_cal_NextBtnIcn,
			o.theme_cal_NextBtnCls
		] ).appendTo( w.d.intHTML );
		w.d.intHTML
			.on( o.clickEvent, ".dbCalNext", function(e) {
				e.preventDefault();
				e.stopPropagation();
				if ( w.theDate.getDate() > 28 ) { w.theDate.setDate(1); }
				w._offset( "m", 1 );
				return false;
			})
			.on( o.clickEvent, ".dbCalPrev", function(e) {
				e.preventDefault();
				e.stopPropagation();
				if ( w.theDate.getDate() > 28 ) { w.theDate.setDate(1); }
				w._offset( "m", -1 );
				return false;
			});	
	}

	// Picker controls, if enabled.

	if ( o.calUsePickers === true ) {
		_sf.calPickers.apply(
			this,
			[ w._cal_pickRanges( date_displayMonth, date_displayYear, date_realToday.get(0) ) ]
		).appendTo( w.d.intHTML );

		w.d.intHTML.on( "change", "#dbCalPickMonth, #dbCalPickYear", function() {
			if ( w.theDate.get(2) > 28 ) {
				w.theDate.setD( 2, 1 ); //Set first of month if over the 28th.
			}
			w.theDate.setD( 1, $( "#dbCalPickMonth" ).val() ); // Set choosen month
			w.theDate.setD( 0, $( "#dbCalPickYear" ).val() ); // Set choosen year

			w.refresh();
		});
	}

	// The actual grid system.
	calContent = $( _sf.calGrid() ).appendTo( w.d.intHTML ).find( ".dbCalGrid" ).first();
	
	if ( o.calShowDays ) {
		w._cal_days = w.__( "daysOfWeekShort").concat( w.__( "daysOfWeekShort" ) );

		weekdayControl = _sf.calRow();

		if ( o.calShowWeek ) {
			weekdayControl.append( _sf.calNonButton( "&nbsp", false ) );
		}

		for ( i=0; i<=6;i++ ) {
			weekdayControl.append( _sf.calNonButton( 
				w._cal_days[ ( i + w.__( "calStartDay") ) % 7 ],
				true,
				grid_Cols
			) );
		}
		weekdayControl.appendTo( calContent );

		if ( w.__( "isRTL" ) === true ) { 
			weekdayControl.css( { display: "flex", flexDirection: "row-reverse" } );
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

	w.calDateVisible = false;
	
	/* Actually build and populate the calendar. One pass */
	for ( cntlRow = 0; cntlRow < grid_Weeks; cntlRow++ ) {

		// Begin:: ROW
		calCntlRow = _sf.calRow();

		// Show week numbers
		if ( o.calShowWeek ) {
			calCntlRow.append( _sf.calNonButton( date_working.getDWeek(4), false ) );
		}
		
		for ( cntlCol = 0; cntlCol < 7; cntlCol++ ) {

			// Each: Date

			// Check and theme date.
			cntlObj = Object.assign(
				w._newDateChecker( date_working ),
				w._cal_ThemeDate( date_working, date_displayMonth )
			);

			// Format the display date
			cntlObj.displayText = o.calFormatter( cntlObj.dateObj );

			// Create HTML
			//
			// Event "button" needs to have the class of ".dbEvent"
			cntlObj.htmlObj = _sf.calButton( cntlObj, grid_Cols );

			// Add data object to event object
			cntlObj.eventObj = cntlObj.htmlObj.find( ".dbEvent" ).first();
			cntlObj.eventObj.data( cntlObj );

			// Run the before append function
			cntlObj = o.calBeforeAppendFunc( cntlObj );

			// Add to row control object
			if ( o.calOnlyMonth === false || cntlObj.inBounds === true ) {
				calCntlRow.append( cntlObj.htmlObj );
			} else {
				calCntlRow.append( _sf.calNonButton( "&nbsp", false ) );
			}

			//Add ONE day
			date_working.adj( 2, 1 ); 
		}

		// Deal with RTL languages (flex is easiest)
		if ( w.__( "isRTL" ) === true ) { 
			calCntlRow.css( { display: "flex", flexDirection: "row-reverse" } );
		}

		// Add row to grid.
		calCntlRow.appendTo( calContent );
	}

	// Quick Date Picker if turned on.
	if ( o.calShowDateList === true && o.calDateList !== false ) {
		_sf.calDateList.apply(
			this,  
			[ w.__( "calDateListLabel" ), o.calDateList ]
		).appendTo(w.d.intHTML);
		w.d.intHTML.on( "change", "#dbCalPickList", function() {
			w.theDate = new w._date(
					$( this ).val().split( "-" )[0],
					$( this ).val().split( "-" )[1] - 1,
					$( this ).val().split( "-" )[2],
					12, 1, 1, 1
			);
			w._t( { method: "doset" } );
		});
	}

	// Bottom Buttons
	if ( o.useTodayButton || o.useTomorrowButton || o.useClearButton || o.useCancelButton ){
		calCntlRow = _sf.buttonGroup( o.useCollapsedBut );
		
		if ( o.useTodayButton ) {
			calCntlRow.append( w._stdBtn.today.apply( w ) );
		}
		if ( o.useTomorrowButton ) {
			calCntlRow.append( w._stdBtn.tomorrow.apply( w ) );
		}
		if ( o.useClearButton ) {
			calCntlRow.append( w._stdBtn.clear.apply( w ) );
		}
		if ( o.useCancelButton ) {
			calCntlRow.append( w._stdBtn.cancel.apply( w ) );
		}

		calCntlRow.appendTo( w.d.intHTML );
	}

	// Each date event loop, swipe and mouse events.
	w.d.intHTML
		.on( o.clickEvent, ".dbEvent", function(e) {
			e.preventDefault();
			if ( $( this ).data( "good" ) ) {
				w.theDate = $( this ).data( "dateObj" ).copy();
				w._t( {
					method: "set",
					value: w._formatter( w.__fmt(),w.theDate ),
					date: w.theDate
				} );
				w._t( { method: "close" } );
			}
		})
		.on( "swipeleft",  function() { w._offset( "m", 1 ); } )
		.on( "swiperight", function() { w._offset( "m", -1 ); } )
		.on( "mousewheel", function(e,d) {
			e.preventDefault();
			if ( d > 0 ) {
				w.theDate.setD( 2, 1 );
				w._offset( "m", 1 );
			}
			if ( d < 0 ) {
				w.theDate.setD( 2, 1 );
				w._offset( "m", -1 );
			}
		});
};
