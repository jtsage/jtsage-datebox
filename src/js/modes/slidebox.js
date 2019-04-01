/**
 * JTSage-DateBox
 * @fileOverview Provides the slidebox mode
 * @author J.T.Sage <jtsage+datebox@gmail.com>
 * @author {@link https://github.com/jtsage/jtsage-datebox/contributors|GitHub Contributors}
 * @license {@link https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt|MIT}
 * @version 5.0.0
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

/**
 * @typedef {Object} _slide_ThemeDate_Return
 * @property {string} theme Theme class to use
 */

/**
 * Apply theme information for a date
 * 
 * @param  {object} javascript Date Object
 * @return {_slide_ThemeDate_Return} Theme information
 */
JTSageDateBox._slide_ThemeDate = function( testDate ) {
	var w = this,
		o = this.options,
		itt, done = false,
		returnObject = {
			theme : o.theme_slide_Default
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
		if ( w._ThemeDateCK[ dateThemes[ itt ][0] ].call( w, testDate ) ) {
			returnObject.theme = o[ dateThemes[ itt ][1] ];
			done = true;
		}
	}

	return returnObject;
};

/**
 * Build the slidebox
 *
 * @memberOf JTSageDateBox._build
 * @this JTSageDateBox
 */
JTSageDateBox._build.slidebox = function () {
	var w                 = this,
		o                 = this.options,
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

	// slide dates are always ok, handle disabled set logic elsewhere
	w.dateOK = true;
	
	w.d.headerText = w._grabLabel( w.__( "titleDateDialogLabel" ) );

	w.d.intHTML = $( "<span>" );

	w.d.intHTML.addClass( o.theme_spanStyle );

	// Internal header (not the widget master header, a header for the calendar)
	//
	// Expects a ".dbSlideNext" and ".dbSlidePrev" for prev/next button events.
	if ( o.slideNoHeader === false ) {
		w.style_pnHead(
			w._formatter( w.__( "calHeaderFormat"), w.theDate ),
			o.theme_slide_PrevBtn,
			o.theme_slide_NextBtn,
			"dbSlidePrev",
			"dbSlideNext"
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
		w.style_picker(
			w._pickRanges(
				date_displayMonth,
				date_displayYear,
				date_realToday.get(0),
				o.slideYearPickRelative
			),
			o.theme_slide_Pickers,
			"dbSlidePickMonth",
			"dbSlidePickYear"
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
	calContent = $( w.style_slideGrid() ).appendTo( w.d.intHTML ).find( ".dbSlideGrid" ).first();

	calCntlRow = w.style_slideRow();

	calCntlRow.append( w.style_slideCtrl(
		"dbSlideWkPrev",
		o.theme_slide_PrevDateBtn,
	) );

	for ( cntlCol = -3; cntlCol <= 3; cntlCol++ ) {

		cntlObj = Object.assign(
			w._newDateChecker( date_working ),
			w._slide_ThemeDate( date_working )
		);

		cntlObj.htmlObj = w.style_slideBtn( cntlObj );

		// Add data object to event object
		cntlObj.eventObj = cntlObj.htmlObj.find( ".dbEventS" ).first();
		cntlObj.eventObj.data( cntlObj );

		calCntlRow.append( cntlObj.htmlObj );

		date_working.adj( 2, 1 );

	}

	calCntlRow.append( w.style_slideCtrl(
		"dbSlideWkNext",
		o.theme_slide_NextDateBtn,
	) );
	
	// Deal with RTL languages (flex is easiest)
	if ( w.__( "isRTL" ) === true ) {
		calCntlRow.css( { display : "flex", flexDirection : "row-reverse" } );
	}

	// Add row to grid.
	calCntlRow.appendTo( calContent );


	// Quick Date Picker if turned on.
	if ( o.slideShowDateList === true && o.slideDateList !== false ) {
		w.style_dateList(
			w.__( "calDateListLabel" ),
			o.slideDateList,
			o.theme_slide_DateList,
			"dbSlidePickList"
		).appendTo(w.d.intHTML);
		w.d.intHTML.on( "change", "#dbSlidePickList", function() {
			var iPut = $( this ).val().split( "-" );
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
		.on( o.clickEvent, ".dbEventS", function(e) {
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
