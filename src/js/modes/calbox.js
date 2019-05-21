/**
 * JTSage-DateBox
 * @fileOverview Provides the calbox mode
 * @author J.T.Sage <jtsage+datebox@gmail.com>
 * @author {@link https://github.com/jtsage/jtsage-datebox/contributors|GitHub Contributors}
 * @license {@link https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt|MIT}
 * @version 5.0.0
 */

mergeOpts({
	calHighToday           : true,
	calHighPick            : true,
	calHighOutOfBounds     : true,
	calSelectedOutOfBounds : true,
	
	calShowDays         : true,
	calOnlyMonth        : false,
	calShowWeek         : false,
	calUsePickers       : false,
	calNoHeader         : false,
	
	calYearPickMin      : -6,
	calYearPickMax      : 6,
	calYearPickRelative : true,

	calFormatter        : false,
	calBeforeAppendFunc : function(t) { return t; },
	
	highDays            : false,
	highDates           : false,
	highDatesRec        : false,
	highDatesAlt        : false,
	enableDates         : false,
	calDateList         : false,
	calShowDateList     : false
});

/**  
 * Return first date of visible calendar grid
 * 
 * @return {object} JavaScript Date Object
 */
JTSageDateBox.getCalStartGrid = function () {
	return this.firstOfGrid;
};

/**  
 * Return last date of visible calendar grid
 * 
 * @return {object} JavaScript Date Object
 */
JTSageDateBox.getCalEndGrid = function() {
	return this.lastOfGrid;
};

/**  
 * Is the currently selected date in the visible calendar grid?
 * 
 * @return {boolean} True = yes it is
 */
JTSageDateBox.isSelectedInCalGrid = function() {
	var w = this;

	if ( w.firstOfGrid === false || w.lastOfGrid === false ) {
		return false;
	}
	return (
		w.firstOfGrid.comp() <= w.originalDate.comp() &&
		w.originalDate.comp() <= w.lastOfGrid.comp()
	);
};

JTSageDateBox.isSelectedInBounds = function() {
	var w = this;

	if ( w.firstOfMonth === false || w.lastOfMonth === false ) {
		return false;
	}
	return (
		w.firstOfMonth.comp() <= w.originalDate.comp() &&
		w.originalDate.comp() <= w.lastOfMonth.comp()
	);
};

/**  
 * Is the specified date in the visible calendar grid?
 * 
 * @param {object} JavaScript Date Object
 * @return {boolean} True = yes it is
 */
JTSageDateBox.isInCalGrid = function ( date ) {
	var w = this;

	if ( w.firstOfGrid === false || w.lastOfGrid === false ) {
		return false;
	}

	return (
		w.firstOfGrid.comp() <= date.comp() &&
		date.comp() <= w.lastOfGrid.comp()
	);
};

/**
 * @typedef {Object} _cal_ThemeDate_Return
 * @property {string} theme Theme class to use
 * @property {boolean} inBounds Date appears in the "current" month
 */

/**
 * Apply theme information for a date
 * 
 * @param  {object} javascript Date Object
 * @param  {number} dispMonth Current month of display
 * @return {_cal_ThemeDate_Return} Theme information
 */
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
			theme    : o.theme_cal_Default,
			inBounds : true
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

	// Shortcut if out of bounds, no other theme can apply.
	if ( testDate.get(1) !== dispMonth ) {
		returnObject.inBounds = false;

		if ( o.calHighOutOfBounds !== false ) {
			returnObject.theme = o.theme_cal_OutOfBounds;
			done = true;
			// Allow only selected theme if specifly enabled.
			if (
				o.calSelectedOutOfBounds !== false &&
				w._ThemeDateCK.selected.call( w, testDate )
			) {
				returnObject.theme = o.theme_cal_Selected;
			}
		}
	}

	for ( itt = 0; itt < dateThemes.length && !done; itt++ ) {
		if ( w._ThemeDateCK[ dateThemes[ itt ][0] ].call( w, testDate ) ) {
			returnObject.theme = o[ dateThemes[ itt ][1] ];
			done = true;
		}
	}

	return returnObject;
};

/**
 * Build the calbox
 *
 * @memberOf JTSageDateBox._build
 * @this JTSageDateBox
 */
JTSageDateBox._build.calbox = function () {
	var w                 = this, i,
		o                 = this.options,
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
		weekdayControl    = "";

	// Set up some info to pull from calbox if needed.
	w.firstOfGrid = date_firstOfGrid;
	w.lastOfGrid  = date_lastOfGrid;
	w.firstOfMonth = date_firstOfMonth;
	w.lastOfMonth = date_lastOfMonth;
	
	// Clear internal widget HTML, if not already empty.
	if ( typeof w.d.intHTML !== "boolean" ) {
		w.d.intHTML.remove();
		w.d.intHTML = null;
	}
	
	// Attempt to grab associated label, fallback to i18n string if none found
	w.d.headerText = w._grabLabel( w.__( "titleDateDialogLabel" ) );

	w.d.intHTML = $( "<span>" );

	w.d.intHTML.addClass( o.theme_spanStyle );

	// Internal header (not the widget master header, a header for the calendar)
	//
	// Expects a ".dbCalNext" and ".dbCalPrev" for prev/next button events.
	if ( o.calNoHeader === false ) {
		calContent = w.style_pnHead(
			w._formatter( w.__( "calHeaderFormat"), w.theDate ),
			( w.__( "isRTL" ) === true ) ? o.theme_cal_NextBtn : o.theme_cal_PrevBtn,
			( w.__( "isRTL" ) === true ) ? o.theme_cal_PrevBtn : o.theme_cal_NextBtn,
			"dbCalPrev",
			"dbCalNext"
		);

		if ( w.__( "isRTL" ) === true ) {
			calContent.children().each( function( i, item ) {
				calContent.prepend( item );
			});
		}
		
		calContent.appendTo( w.d.intHTML );

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

	if ( o.calUsePickers !== false ) {
		calContent = w.style_picker(
			w._pickRanges(
				date_displayMonth,
				date_displayYear,
				date_realToday.get(0),
				o.calYearPickRelative
			),
			o.theme_cal_Pickers,
			"dbCalPickMonth",
			"dbCalPickYear"
		);

		if ( w.__( "isRTL" ) === true ) {
			calContent.children().each( function( i, item ) {
				calContent.prepend( item );
			});
		}
		
		calContent.appendTo( w.d.intHTML );

		w.d.intHTML.on( "change", "#dbCalPickMonth, #dbCalPickYear", function() {
			if ( w.theDate.get(2) > 28 ) {
				w.theDate.setD( 2, 1 ); //Set first of month if over the 28th.
			}
			w.theDate.setD( 1, $( "#dbCalPickMonth" ).val() ); // Set choosen month
			w.theDate.setD( 0, $( "#dbCalPickYear" ).val() ); // Set choosen year

			w._t( {
				method             : "displayChange",
				selectedDate       : w.originalDate,
				shownDate          : w.theDate,
				thisChange         : "p",
				thisChangeAmount   : null,
				gridStart          : w.firstOfGrid,
				gridEnd            : w.lastOfGrid,
				selectedInGrid     : w.isSelectedInCalGrid(),
				selectedInBounds   : w.isSelectedInBounds()
			});

			w.refresh();
		});
	}

	// The actual grid system.
	calContent = $( w.style_calGrid() ).appendTo( w.d.intHTML ).find( ".dbCalGrid" ).first();
	
	if ( o.calShowDays ) {
		w._cal_days = w.__( "daysOfWeekShort").concat( w.__( "daysOfWeekShort" ) );

		weekdayControl = w.style_calRow();

		if ( o.calShowWeek ) {
			weekdayControl.append( w.style_calTxt( "&nbsp", false, 8 ) );
		}

		for ( i=0; i<=6;i++ ) {
			weekdayControl.append( w.style_calTxt(
				w._cal_days[ ( i + w.__( "calStartDay") ) % 7 ],
				true,
				grid_Cols
			) );
		}
		weekdayControl.appendTo( calContent );

		if ( w.__( "isRTL" ) === true ) {
			weekdayControl.children().each( function( i, item ) {
				weekdayControl.prepend( item );
			} );
		}
	}

	// if options.calFormatter is just a string, attempt to pull it as a function
	// reference from the global namespace
	o.calFormatter = w._prepFunc( o.calFormatter );

	// if options.calBeforeAppendFunc is just a string, attempt to pull it as a
	// function reference from the global namespace
	o.calBeforeAppendFunc = w._prepFunc( o.calBeforeAppendFunc );
	
	/* Actually build and populate the calendar. One pass */
	for ( cntlRow = 0; cntlRow < grid_Weeks; cntlRow++ ) {

		// Begin:: ROW
		calCntlRow = w.style_calRow();

		// Show week numbers
		if ( o.calShowWeek ) {
			calCntlRow.append( w.style_calTxt( date_working.getDWeek(4), false, 8 ) );
		}
		
		for ( cntlCol = 0; cntlCol < 7; cntlCol++ ) {

			// Each: Date

			// Check and theme date.
			cntlObj = Object.assign(
				w._newDateChecker( date_working ),
				w._cal_ThemeDate( date_working, date_displayMonth )
			);

			// Format the display date
			cntlObj.displayText = ( o.calFormatter === false ) ?
				cntlObj.dateObj.get(2) :
				o.calFormatter.call( w, cntlObj );

			// Create HTML
			//
			// Event "button" MUST have the class of ".dbEvent"
			cntlObj.htmlObj = w.style_calBtn( cntlObj, grid_Cols );

			// Add data object to event object
			cntlObj.eventObj = cntlObj.htmlObj.find( ".dbEvent" ).first();
			cntlObj.eventObj.data( cntlObj );

			// Run the before append function
			if ( o.calBeforeAppendFunc !== false ) {
				cntlObj = o.calBeforeAppendFunc.call( w, cntlObj );
			}

			// Add to row control object
			if ( o.calOnlyMonth === false || cntlObj.inBounds === true ) {
				calCntlRow.append( cntlObj.htmlObj );
			} else {
				calCntlRow.append( w.style_calTxt( "&nbsp", false, grid_Cols ) );
			}

			//Add ONE day
			date_working.adj( 2, 1 );
		}

		// Deal with RTL languages (flex is easiest)
		if ( w.__( "isRTL" ) === true ) {
			calCntlRow.children().each( function( i, item ) {
				calCntlRow.prepend( item );
			});
		}

		// Add row to grid.
		calCntlRow.appendTo( calContent );
	}

	// Quick Date Picker if turned on.
	if ( o.calShowDateList !== false && o.calDateList !== false ) {
		w.style_dateList(
			w.__( "calDateListLabel" ),
			o.calDateList,
			o.theme_cal_DateList,
			"dbCalPickList"
		).appendTo(w.d.intHTML);
		w.d.intHTML.on( "change", "#dbCalPickList", function() {
			var iPut = $(this).val().split( "-" );
			w.theDate = new w._date(
				iPut[0],
				iPut[1] - 1,
				iPut[2],
				12, 1, 1, 1
			);
			w._t( { method : "doset" } );
		});
	}

	// Bottom Buttons
	w.d.intHTML.append( w._doBottomButtons.call( w, false ) );

	// Each date event loop, swipe and mouse events.
	w.d.intHTML
		.on( o.clickEvent, ".dbEvent", function(e) {
			e.preventDefault();
			if ( $( this ).data( "good" ) ) {
				w.theDate = $( this ).data( "dateObj" ).copy();
				w._t( {
					method : "set",
					value  : w._formatter( w.__fmt(),w.theDate ),
					date   : w.theDate
				} );
				w._t( { method : "close" } );
			}
		})
		.on( w.wheelEvent, function(e,d) {
			e.preventDefault();
			d = ( typeof d === "undefined" ) ? Math.sign(e.originalEvent.wheelDelta) : d;
			
			w.theDate.setD( 2, 1 );
			w._offset( "m", ( d > 0 ) ? 1 : -1 );
		});
};
