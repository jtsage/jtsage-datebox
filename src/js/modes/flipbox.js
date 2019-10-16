/**
 * JTSage-DateBox
 * @fileOverview Provides the flipbox, timeflipbox, durationflipbox, and datetimeflipbox modes
 * @author J.T.Sage <jtsage+datebox@gmail.com>
 * @author {@link https://github.com/jtsage/jtsage-datebox/contributors|GitHub Contributors}
 * @license {@link https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt|MIT}
 * @version 5.2.0
 */

mergeOpts({
	flen : {
		"y" : 25,
		"m" : 24,
		"d" : 40,
		"h" : 24,
		"i" : 30,
		"s" : 30,
		"a" : 30,
	},
	durationStep     : 1,
	durationSteppers : {
		"d" : 1,
		"h" : 1,
		"i" : 1,
		"s" : 1
	},
	fboxNatural      : "default",
});

/**
 * Get the numbers for duration box, also deal with breaks on 24 hrs, 60 min, 60 sec.
 * 
 * @param  {string} term Field we are working on: d,h,i,s
 * @param  {number} offset Amount +/- from current
 * @param  {number} position Position in the display.
 * @return {string} Text to display
 */
JTSageDateBox._fbox_do_dur_math = function ( term, offset, position ) {
	var current, possibleReturn,
		w          = this,
		multiplier = { d : Number.MAX_SAFE_INTEGER, h : 24, i : 60, s : 60 }[term];

	if ( position === 0 && term !== "d" ) {
		switch ( term ) {
			case "h" :
				current = w.lastDurationA[1] +
					( w.lastDurationA[0] * 24 );
				break;
			case "i" :
				current = w.lastDurationA[2] +
					( w.lastDurationA[1] * 60 ) +
					( w.lastDurationA[0] * 24 * 60 );
				break;
			case "s" :
				current = w.lastDuration;
				break;
		}
	} else {
		current = w.lastDurationA[ ["d","h","i","s"].indexOf( term ) ];
		possibleReturn = current + offset;
	}

	if ( position === 0 ) {
		// First position just counts up indfinatly, and can't go negative.
		return ( possibleReturn < 0 ) ? "&nbsp;" : possibleReturn;
	} else {
		if ( possibleReturn < 0 ) {
			possibleReturn += multiplier;
		}

		while ( possibleReturn > ( multiplier - 1 ) ) {
			possibleReturn -= multiplier;
		}
		return possibleReturn;
	}
};

/**
 * Find the appropriate tern for a flipbox element
 * 
 * @param  {string} term Which element to work on: y,m,d,h,i,s,a
 * @param  {number} offset +/- from the current
 * @return {string} Text to display
 */
JTSageDateBox._fbox_do_roll_math = function ( term, offset ) {
	// Returns an array [ text, value ]
	var i,
		w          = this,
		o          = this.options,
		finder     = [],
		current    = 0,
		total      = 0,
		safeOffset = null,
		testDate;

	switch ( term ) {
		case "y" :
			// No hard math.
			return w.theDate.get(0) + offset;
		case "m" :
			testDate = (w.theDate.copy( false, [0,0,1] )).adj( 1, offset );
			return w.__("monthsOfYearShort")[ testDate.get(1) ];
		case "d" :
			if ( o.rolloverMode.d === false ) {
				total = 32 - w.theDate.copy([0],[0,0,32,13]).getDate();
				current = w.theDate.get(3);

				for ( i = 0; i < total; i++ ) {
					if ( i + current > total ) {
						finder.push( i + current - total);
					} else {
						finder.push( i + current );
					}
				}

				safeOffset = offset % total;

				if ( safeOffset < 0 ) {
					return finder[ finder.length + safeOffset ];
				}
				return finder[ safeOffset ];
			}
			return w.theDate.copy( [ 0, 0, offset ]).get(2);
		case "h" :
			testDate = w.theDate.copy( [ 0, 0, 0, offset ] );
			return ( ( w.__("timeFormat") === 12 ) ? testDate.get12hr() : testDate.get(3) );
		case "i" :
			return w._zPad( ( w.theDate.copy( [ 0, 0, 0, 0, offset * o.minuteStep ] )).get(4) );
		case "s" :
			return w._zPad( ( w.theDate.copy( [ 0, 0, 0, 0, 0, offset ] )).get(5) );
		case "a" :
			if ( w.theDate.get(3) > 11 ) {
				// It currenly is AM, odd offset would be PM
				return w.__("meridiem")[( offset % 2 === 0 ) ? 1 : 0 ];
			} else {
				// currently PM, odd offset would be AM
				return w.__("meridiem")[( offset % 2 === 0 ) ? 0 : 1 ];
			}
	}
};


/**
 * Build the timeflipbox
 *
 * @memberOf JTSageDateBox._build
 * @this JTSageDateBox
 */
JTSageDateBox._build.timeflipbox     = function () { this._build.flipbox.call( this ); };

/**
 * Build the datetimeflipbox
 *
 * @memberOf JTSageDateBox._build
 * @this JTSageDateBox
 */
JTSageDateBox._build.datetimeflipbox = function () { this._build.flipbox.call( this ); };

/**
 * Build the durationflipbox
 *
 * @memberOf JTSageDateBox._build
 * @this JTSageDateBox
 */
JTSageDateBox._build.durationflipbox = function () { this._build.flipbox.call( this ); };

/**
 * Build the flipbox
 *
 * @memberOf JTSageDateBox._build
 * @this JTSageDateBox
 */
JTSageDateBox._build.flipbox         = function () {
	var thisField, cntlFieldIdx, cntlRow,
		w           = this,
		o           = this.options,
		g           = this.drag,
		flipContent = w.style_fboxCtr( o.theme_fbox_RollHeight ).addClass( "dbRollerV "),
		cntlContain = "",
		cntlRoller  = "",
		dur         = ( o.mode === "durationflipbox" ? true : false );


	// Empty internal HTML if needed.  Otherwise refresh position?
	if ( typeof w.d.intHTML !== "boolean" ) {
		w.d.intHTML.empty().remove();
	} else {
		w.d.input.on( "datebox", function (e,p) {
			if ( p.method === "postrefresh" ) {
				w.style_fboxPos();
			}
		});
	}

	// Get apprpriate header text
	w.d.headerText = w._grabLabel (
		( o.mode === "datebox" || o.mode === "datetimebox" ) ?
			w.__( "titleDateDialogLabel" ) :
			w.__( "titleTimeDialogLabel" )
	);
	
	w.d.intHTML = $( "<span>" );

	w.d.intHTML.addClass( o.theme_spanStyle );

	// Choose the correct field order for the mode
	w.fldOrder = w._getFldOrder( o.mode );
	
	// If not in duration mode, check the date and reset the minute stepper
	// If in duration mode, fix the duration stepper
	if ( !dur ) {
		w._check();
		w._minStepFix();
	} else {
		w.dateOK = true;
		w._getCleanDur();
		w._fixstepper( w.fldOrder );
	}

	o.fboxNatural = ( o.fboxNatural === "default" ) ?
		( ( dur ) ? true : false ) :
		o.fboxNatural;
	

	// Create a header for flipbox and datetimeflipbox modes
	if ( o.mode === "flipbox" || o.mode === "datetimeflipbox" ) {
		w.style_subHead( w._formatter( w.__( "headerFormat" ), w.theDate ) )
			.appendTo( w.d.intHTML );
	}

	// For duration mode, create labels
	if ( dur ) {
		cntlContain = w.style_fboxDurLbls();
		for ( cntlFieldIdx = 0; cntlFieldIdx < w.fldOrder.length; cntlFieldIdx++ ) {
			thisField = w.fldOrder[ cntlFieldIdx ];
			cntlContain.append( w.style_fboxDurLbl(
				w.__( "durationLabel" )[ ["d","h","i","s"].indexOf( thisField ) ],
				w.fldOrder.length
			) );
		}
		if ( ( w.__( "isRTL" ) === true ) ) {
			cntlContain.css({ direction : "rtl" });
		}
		w.d.intHTML.append( cntlContain );
	}

	// Build the control
	for ( cntlFieldIdx = 0; cntlFieldIdx < w.fldOrder.length; cntlFieldIdx++ ) {
		thisField = w.fldOrder[ cntlFieldIdx ];

		cntlContain = w.style_fboxRollCtr( w.fldOrder.length ).addClass( "dbRollerC" );
		cntlRoller  = w.style_fboxRollPrt().addClass( "dbRoller" );

		cntlContain.data({
			field  : thisField,
			amount : ( dur ) ?
				o.durationSteppers[ thisField ] :
				( ( thisField === "i" ) ? o.minuteStep : 1 )
		});

		for ( cntlRow = -1 * o.flen[thisField]; cntlRow < ( o.flen[thisField] + 1 ); cntlRow++ ) {

			if ( !dur ) {
				cntlRoller.append( w.style_fboxRollCld(
					w._fbox_do_roll_math( thisField, cntlRow ),
					( cntlRow === 0 ) ?
						( ( w.dateOK ) ? o.theme_fbox_Selected : o.theme_fbox_Forbidden ) :
						o.theme_fbox_Default
				) );
			} else {
				cntlRoller.append( w.style_fboxRollCld(
					w._fbox_do_dur_math( thisField, cntlRow, cntlFieldIdx ),
					( cntlRow === 0 ) ?
						o.theme_fbox_Selected :
						o.theme_fbox_Default
				) );
			}
		}
		if ( o.fboxNatural ) {
			cntlRoller.children().each( function( i, item ) {
				cntlRoller.prepend( item );
			} );
		}

		cntlContain.append( cntlRoller );

		if ( w.__( "isRTL" ) === true ) {
			flipContent.prepend( cntlContain );
		} else {
			flipContent.append( cntlContain );
		}

	}


	w.d.intHTML.append( flipContent );
	
	// Add the lens
	w.style_fboxLens()
		.addClass( "dbLens" )
		.css( { "pointerEvents" : "none", "position" : "relative" } )
		.appendTo( w.d.intHTML );


	// Do bottom buttons
	w.d.intHTML.append( w._doBottomButtons.call( w, true ) );

	// Attach events

	w.d.intHTML
		.on(g.eStart, ".dbRoller", function(e,f) {
			if ( !g.move ) {
				if ( typeof f !== "undefined" ) { e = f; }
				g.move = true;
				g.target = $(this).children().first();
				g.pos = parseInt( g.target.css( "marginTop" ).replace( /px/i, "" ),10 );
				g.start = ( e.type.substr(0,5) === "touch" ) ?
					e.originalEvent.changedTouches[0].pageY :
					e.pageY;
				g.end = false;
				g.direc = o.fboxNatural ? -1 : 1; //( dur ) ? 1 : -1;
				g.velocity = 0;
				g.time = Date.now();
				e.stopPropagation();
				e.preventDefault();
			}
		});
};

/**
 * Build timeflipbox drag events
 *
 * @memberOf JTSageDateBox._drag
 * @this JTSageDateBox
 */
JTSageDateBox._drag.timeflipbox     = function () { this._drag.flipbox.call( this ); };

/**
 * Build datetimeflipbox drag events
 *
 * @memberOf JTSageDateBox._drag
 * @this JTSageDateBox
 */
JTSageDateBox._drag.datetimeflipbox = function () { this._drag.flipbox.call( this ); };

/**
 * Build durationflipbox drag events
 *
 * @memberOf JTSageDateBox._drag
 * @this JTSageDateBox
 */
JTSageDateBox._drag.durationflipbox = function () { this._drag.flipbox.call( this ); };

/**
 * Build flipbox drag events
 *
 * @memberOf JTSageDateBox._drag
 * @this JTSageDateBox
 * @todo Rebuild this method.  It works, but I've no idea how anymore
 */
JTSageDateBox._drag.flipbox          = function () {
	var w = this,
		o = this.options,
		g = this.drag;
	
	$( document ).on( g.eMove, function(e) {
		if ( g.move && o.mode.slice(-7) === "flipbox" ) {
			g.end = ( e.type.substr(0,5) === "touch" ) ?
				e.originalEvent.changedTouches[0].pageY :
				e.pageY;

			g.target.css("margin-top", (g.pos + g.end - g.start) );

			g.elapsed  = Date.now()-g.time;
			g.velocity = 0.8 * ( 100 * (g.end - g.start) / ( 1 + g.elapsed ) ) + 0.2 * g.velocity;

			e.preventDefault();
			e.stopPropagation();
			return false;
		}
	});
	
	$( document ).on( g.eEnd, function(e) {
		var eachItem, delta, currentPosition, goodPosition, totalMove, numberFull, goodGuess;
		if ( g.move && o.mode.slice(-7) === "flipbox" ) {
			if ( ( g.velocity < 15 && g.velocity > -15 ) || !o.useKinetic )  {
				g.move = false;
				if ( g.end !== false ) {
					e.preventDefault();
					e.stopPropagation();
					g.tmp = g.target.closest( ".dbRollerC" );

					eachItem = ( o.flipSizeOverride !== false ) ?
						o.flipSizeOverride :
						g.target[0].getBoundingClientRect().height;
					
					w._offset(
						g.tmp.data("field"),
						( parseInt( ( g.start - g.end ) / ( eachItem ), 10 ) *
							g.tmp.data( "amount" ) * g.direc ) );
				}
				g.start = false;
				g.end   = false;
			} else {
				g.move  = false;
				g.start = false;
				g.end   = false;
				g.tmp   = g.target.closest( ".dbRollerC" );

				eachItem = ( o.flipSizeOverride !== false ) ?
					o.flipSizeOverride :
					g.target[0].getBoundingClientRect().height;

				delta = ( -( g.velocity * 0.8 ) * Math.exp( -g.elapsed / 325 ) * 8 ) * -1;

				currentPosition = parseInt( g.target.css( "marginTop" ).replace( /px/i, "" ), 10 );
				goodPosition    = parseInt( currentPosition + delta, 10 );

				totalMove  = g.pos - goodPosition;
				numberFull = Math.round(totalMove / ( eachItem ));
				goodGuess  = numberFull * g.tmp.data( "amount" ) * g.direc;
				
				g.target.animate(
					{
						marginTop : goodPosition
					},
					parseInt(10000/g.velocity) + 1000,
					function() {
						w._offset( g.tmp.data("field"), goodGuess );
					}
				);

				e.preventDefault();
				e.stopPropagation();
			}
		}
	});
};
