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
	slideHighToday        : true,
	slideHighPick         : true,
	
	slideUsePickers       : false,
	slideNoHeader         : false,
	
	slideYearPickMin      : -6,
	slideYearPickMax      : 6,
	slideYearPickRelative : true,
	
	highDays              : false,
	highDates             : false,
	highDatesRec          : false,
	highDatesAlt          : false,
	enableDates           : false,
	slideDateList         : false,
	slideShowDateList     : false
});


JTSageDateBox._slide_ThemeDateCK = {
	selected : function ( testDate ) {
		if ( this.options.sslideHighPick === false ) { return false; }
		if ( this.originalDate.iso() === testDate.iso() ) { 
			return true;
		}
		return false;
	},
	today : function ( testDate ) {
		if ( this.options.slideHighToday === false ) { return false; }
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

JTSageDateBox._slide_ThemeDate = function( testDate ) {
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
			theme: o.theme_slide_Default,
			inBounds: true
		},
		dateThemes = [
			[ "selected",     "theme_slide_Selected" ],
			[ "today" ,       "theme_slide_Today" ],
			[ "highDates",    "theme_slide_DateHigh" ],
			[ "highDatesAlt", "theme_slide_DateHighAlt" ],
			[ "highDatesRec", "theme_slide_DateHighRec" ],
			[ "highDays",     "theme_slide_DayHigh" ]
		];

	w.realToday = new w._date();

	for ( itt = 0; itt < dateThemes.length && !done; itt++ ) {
		if ( w._slide_ThemeDateCK[ dateThemes[ itt ][0] ].apply( w, [ testDate ] ) ) {
			returnObject.theme = o[ dateThemes[ itt ][1] ];
			done = true;
		}
	}

	return returnObject;
};

JTSageDateBox._slide_pickRanges = function ( dispMonth, dispYear, realYear ) {
	var w         = this, i,
		o         = this.options,
		calcYear  = ( o.slideYearPickRelative === false ) ? realYear : dispYear,
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

	if ( o.slideYearPickMin < 1 ) {
		startYear = calcYear + o.slideYearPickMin;
	} else if ( o.slideYearPickMin < 1800 ) {
		startYear = calcYear - o.slideYearPickMin;
	} else if ( o.slideYearPickMin === "NOW" ) {
		startYear = realYear;
	} else {
		startYear = o.slideYearPickMin;
	}

	if ( o.slideYearPickMax < 1800 ) {
		endYear = calcYear + o.slideYearPickMax;
	} else if ( o.slideYearPickMax === "NOW" ) {
		endYear = realYear;
	} else {
		endYear = o.slideYearPickMax;
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

JTSageDateBox._build.slidebox = function () {
	var w                 = this,
		o                 = this.options,
		_sf               = this.styleFunctions,
		// Today's real date, not based on selection
		date_realToday    = new w._date(),
		// The month ( of the middle date )
		date_displayMonth = w.theDate.get(1),
		// The year ( of the middle date )
		date_displayYear  = w.theDate.get(0),
		// Working date.
		date_working      = ( w.theDate.copy( false, [ 0, 0, 0, 12, 1, 1, 1 ] ) ).adj( 2, -3 ),
		// This holds the grid temporarily
		calContent        = "",
		calCntlRow        = "",
		// Control variables.
		cntlCol, cntlObj = {};

	if ( typeof w.d.intHTML !== "boolean" ) { 
		w.d.intHTML.remove(); 
		w.d.intHTML = null;
	}

	w.dateOK = true;
	
	w.d.headerText = ( ( w._grabLabel() !== false ) ? 
		w._grabLabel() :
		w.__( "titleDateDialogLabel" )
	);
	w.d.intHTML = $( "<span>" );

	// Internal header (not the widget master header, a header for the calendar)
	//
	// Expects a ".dbCalNext" and ".dbCalPrev" for prev/next button events.
	if ( o.slideNoHeader === false ) {
		_sf.slideHeader( 
			w._formatter( w.__( "calHeaderFormat"), w.theDate ),
			o.theme_slide_PrevBtnIcn,
			o.theme_slide_PrevBtnCls,
			o.theme_slide_NextBtnIcn,
			o.theme_slide_NextBtnCls
		).appendTo( w.d.intHTML );
		w.d.intHTML
			.on( o.clickEvent, ".dbSlideNext", function(e) {
				e.preventDefault();
				e.stopPropagation();
				if ( w.theDate.getDate() > 28 ) { w.theDate.setDate(1); }
				w._offset( "m", 1 );
				return false;
			})
			.on( o.clickEvent, ".dbSlidePrev", function(e) {
				e.preventDefault();
				e.stopPropagation();
				if ( w.theDate.getDate() > 28 ) { w.theDate.setDate(1); }
				w._offset( "m", -1 );
				return false;
			});	
	}

	// Picker controls, if enabled.

	if ( o.slideUsePickers === true ) {
		_sf.slidePickers.apply(
			this,
			[ w._slide_pickRanges( date_displayMonth, date_displayYear, date_realToday.get(0) ) ]
		).appendTo( w.d.intHTML );

		w.d.intHTML.on( "change", "#dbSlidePickMonth, #dbSlidePickYear", function() {
			if ( w.theDate.get(2) > 28 ) {
				w.theDate.setD( 2, 1 ); //Set first of month if over the 28th.
			}
			w.theDate.setD( 1, $( "#dbSlidePickMonth" ).val() ); // Set choosen month
			w.theDate.setD( 0, $( "#dbSlidePickYear" ).val() ); // Set choosen year

			w.refresh();
		});
	}

	// The actual grid system.
	calContent = $( _sf.slideGrid() ).appendTo( w.d.intHTML ).find( ".dbSlideGrid" ).first();

	calCntlRow = _sf.slideRow();

	calCntlRow.append( _sf.slideMoveButton(
		"dbSlideWkPrev",
		o.theme_slide_PrevDateBtnIcn,
		o.theme_slide_PrevDateBtnCls
	) );

	for ( cntlCol = -3; cntlCol <= 3; cntlCol++ ) {

		cntlObj = Object.assign(
			w._newDateChecker( date_working ),
			w._slide_ThemeDate( date_working )
		);
		console.log(cntlObj);
		cntlObj.htmlObj = _sf.slideDateButton.apply( w, [ cntlObj ] );

		// Add data object to event object
		cntlObj.eventObj = cntlObj.htmlObj.find( ".dbEventS" ).first();
		cntlObj.eventObj.data( cntlObj );

		calCntlRow.append( cntlObj.htmlObj );

		date_working.adj( 2, 1 );

	}

	calCntlRow.append( _sf.slideMoveButton(
		"dbSlideWkNext",
		o.theme_slide_NextDateBtnIcn,
		o.theme_slide_NextDateBtnCls
	) );
	
	// Deal with RTL languages (flex is easiest)
	if ( w.__( "isRTL" ) === true ) { 
		calCntlRow.css( { display: "flex", flexDirection: "row-reverse" } );
	}

	// Add row to grid.
	calCntlRow.appendTo( calContent );


	// Quick Date Picker if turned on.
	if ( o.slideShowDateList === true && o.slideDateList !== false ) {
		_sf.slideDateList.apply(
			this,  
			[ w.__( "calDateListLabel" ), o.slideDateList ]
		).appendTo(w.d.intHTML);
		w.d.intHTML.on( "change", "#dbSlidePickList", function() {
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
	if ( 
			o.useSetButton      ||
			o.useTodayButton    ||
			o.useTomorrowButton ||
			o.useClearButton    ||
			o.useCancelButton
	) {
		calCntlRow = _sf.buttonGroup( o.useCollapsedBut );

		if ( o.useSetButton ) {
			calCntlRow.append( w._stdBtn.close.apply( w, [ w.__( "setDateButtonLabel" ) ] ) );
		}
		
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
		.on( o.clickEvent, ".dbEventS", function(e) {
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
		.on( o.clickEvent, ".dbSlideWkNext", function(e) {
			e.preventDefault();
			e.stopPropagation();
			w._offset( "d", 7 );
			return false;
		})
		.on( o.clickEvent, ".dbSlideWkPrev", function(e) {
			e.preventDefault();
			e.stopPropagation();
			w._offset( "d", -7 );
			return false;
		})
		.on( "swipeleft",  function() { w._offset( "d", 7 ); } )
		.on( "swiperight", function() { w._offset( "d", -7 ); } )
		.on( "mousewheel", function(e,d) {
			e.preventDefault();
			if ( d > 0 ) {
				w._offset( "d", 7 );
			}
			if ( d < 0 ) {
				w._offset( "d", -7 );
			}
		});
};
