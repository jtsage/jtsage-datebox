/* JTSage-DateBox 
 *
 * MODE File
 *
 * Provide the following display modes:
 * * flipbox
 * * timeflipbox
 * * durationflipbox
 *
 * Define the standard options as well
 */

mergeOpts({
	useSetButton      : true,
	useCancelButton   : false,
	useTodayButton    : false,
	useTomorrowButton : false,
	useClearButton    : false,
	useCollapsedBut   : false,
	flipboxLensAdjust : false,

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
	}
});

JTSageDateBox._fbox_pos = function () {
	// Position the lens and the reels on widget open and 
	// when they are changed
	var fullRoller, firstItem, height_Roller, intended_Top,
		w                = this,
		o                = this.options,
		height_Container = w.d.intHTML.find( ".dbRollerC" ).height(),
		height_Outside   = w.d.intHTML.find( ".dbRollerV" ).outerHeight( true ),
		theLens          = w.d.intHTML.find( ".dbLens" ).first(),
		height_Lens      = theLens.outerHeight();

	// Lens top:
	// Negative Half the parent height is center.
	// Add Negative half the lens height.
	intended_Top = -1 * ( ( height_Outside / 2 ) + ( height_Lens / 2 ) );
	theLens.css( { 
		top          : intended_Top,
		marginBottom : -1 * height_Lens
	} );

	w.d.intHTML.find( ".dbRoller" ).each( function() {
		fullRoller    = $(this),
		firstItem     = fullRoller.children().first(),

		height_Roller = fullRoller.height();

		// Negative Half the height of the roller ( gets center to top border of view)
		// Add half of the view container height.
		intended_Top  = ( -1 * ( height_Roller / 2 ) ) + ( height_Container / 2 );

		if ( o.flipboxLensAdjust !== false ) { intended_Top += o.flipboxLensAdjust; }

		firstItem.attr( "style", "margin-top: " + intended_Top + "px !important" );
	});
};

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
		current = w.lastDurationA[ $.inArray( term, ["d","h","i","s"] ) ];
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

JTSageDateBox._fbox_series = function (middle, side, type, neg) {
	// This builds the series that duration uses.
	var nxt, prv,
		o = this.options,
		maxval = ( type === "h" ) ? 24 : 60,
		ret = [ [ middle.toString(), middle ] ];
	 
	for ( var i = 1; i <= side; i++ ) {
		nxt = middle + ( i * o.durationSteppers[type] );
		prv = middle - ( i * o.durationSteppers[type] );
		ret.unshift([nxt.toString(), nxt]);
		if ( prv > -1 ) {
			ret.push([prv.toString(), prv]);
		} else {
			if ( neg ) {
				ret.push([(maxval+prv).toString(),prv]);
			} else {
				ret.push(["",-1]);
			}
		}
	}
	return ret;
};

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
				} else {
					return finder[ safeOffset ];
				}
			} else {
				return w.theDate.copy( [ 0, 0, offset ]).get(2);
			} break;
		case "h" :
			testDate = w.theDate.copy( [ 0, 0, 0, offset ] );
			return ( ( w.__("timeFormat") === 12 ) ? testDate.get12hr() : testDate.get(3) );
		case "i" :
			return w._zPad( ( w.theDate.copy( [ 0, 0, 0, 0, offset ] )).get(4) );
		case "s" :
			return w._zPad( ( w.theDate.copy( [ 0, 0, 0, 0, 0, offset ] )).get(5) );
		case "a" :
			if ( w.theDate.get(3) < 12 ) {
				// It currenly is AM, odd offset would be PM
				return w.__("meridiem")[( offset % 2 === 0 ) ? 1 : 0 ];
			} else {
				// currently PM, odd offset would be AM
				return w.__("meridiem")[( offset % 2 === 0 ) ? 0 : 1 ];
			}
	}
};



// Really, timeflipbox and durationflipbox are just aliases
JTSageDateBox._build.timeflipbox     = function() { this._build.flipbox.apply( this ); };
JTSageDateBox._build.datetimeflipbox = function() { this._build.flipbox.apply( this ); };
JTSageDateBox._build.durationflipbox = function() { this._build.flipbox.apply( this ); };

JTSageDateBox._build.flipbox = function () {
	var thisField, cntlFieldIdx, cntlRow, cntlWrk,
		w           = this,
		o           = this.options,
		g           = this.drag,
		_sf         = this.styleFunctions,
		flipContent = _sf.fboxContainer( o.theme_fbox_RollHeight ).addClass( "dbRollerV "),
		cntlContain = "",
		cntlRoller  = "",
		dur         = ( o.mode === "durationflipbox" ? true : false );


	if ( typeof w.d.intHTML !== "boolean" ) {
		w.d.intHTML.empty().remove();
	} else {
		w.d.input.on( "datebox", function (e,p) {
			if ( p.method === "postrefresh" ) {
				w._fbox_pos();
			}
		});
	}

	w.d.headerText = ( ( w._grabLabel() !== false) ? 
		w._grabLabel() : 
		( (o.mode === "flipbox") ?
			w.__( "titleDateDialogLabel" ) :
			w.__( "titleTimeDialogLabel" ) 
		)
	);
	w.d.intHTML = $( "<span>" );

	$(document).one( "popupafteropen", function() { 
		// This fixes bad positioning on initial open - not found a way around this yet.
		w._fbox_pos(); 
	});

	switch ( o.mode ) {
		case "durationflipbox" :
			w.fldOrder = w.__( "durationOrder" );
			break;
		case "timeflipbox" :
			w.fldOrder = w.__( "timeFieldOrder" );
			break;
		case "datetimeflipbox" :
			w.fldOrder = w.__( "datetimeFieldOrder" );
			break;
		case "flipbox" :
			w.fldOrder = w.__( "dateFieldOrder" );
			break;
	}
			
	if ( !dur ) {
		w._check();
		w._minStepFix();
	} else {
		w.dateOK = true;
		w._getCleanDur();
		w._fixstepper( w.fldOrder );
	}

	if ( o.mode === "flipbox" || o.mode === "datetimeflipbox" ) { 
		_sf.intHeader( w._formatter( w.__( "headerFormat" ), w.theDate ) )
			.appendTo( w.d.intHTML );
	}

	if ( dur ) {
		cntlContain = _sf.fboxDurLabels()
		for ( cntlFieldIdx = 0; cntlFieldIdx < w.fldOrder.length; cntlFieldIdx++ ) {
			thisField = w.fldOrder[ cntlFieldIdx ];
			cntlContain.append( _sf.fboxDurLabel( 
				w.__("durationLabel")[$.inArray( thisField, ["d","h","i","s"] ) ],
				w.fldOrder.length
			) );
		}
		w.d.intHTML.append(cntlContain);
	}

	for ( cntlFieldIdx = 0; cntlFieldIdx < w.fldOrder.length; cntlFieldIdx++ ) {
		thisField = w.fldOrder[ cntlFieldIdx ];

		cntlContain = _sf.fboxRollerContain().addClass( "dbRollerC" );
		cntlRoller  = _sf.fboxRollerParent().addClass( "dbRoller" );

		cntlContain.data({
			field  : thisField,
			amount : ( dur ) ? 
				o.durationSteppers[ thisField ] :
				( ( thisField === "i" ) ? o.minuteStep : 1 )
		});

		for ( cntlRow = -1 * o.flen[thisField]; cntlRow < ( o.flen[thisField] + 1 ); cntlRow++ ) {

			if ( !dur ) {
				cntlRoller.append( _sf.fboxRollerChild( 
					w._fbox_do_roll_math( thisField, cntlRow ),
					( cntlRow === 0 ) ? 
						( ( w.dateOK ) ? o.theme_fbox_Selected : o.theme_fbox_Forbidden ) :
						o.theme_fbox_Default
				) );
			} else {
				cntlRoller.append( _sf.fboxRollerChild(
					w._fbox_do_dur_math( thisField, cntlRow, cntlFieldIdx ),
					( cntlRow === 0 ) ? 
						o.theme_fbox_Selected :
						o.theme_fbox_Default
				) );
			}
		}

		cntlContain.append(cntlRoller);

		flipContent.append(cntlContain);

	}

	w.d.intHTML.append( flipContent );
	
	_sf.fboxLens()
		.addClass( "dbLens" )
		.css( { "pointerEvents" : "none", "position" : "relative" } )
		.appendTo( w.d.intHTML );


	if (
			o.useSetButton      ||
			o.useTodayButton    ||
			o.useTomorrowButton ||
			o.useClearButton    ||
			o.useCancelButton
	) {
		cntlContain = _sf.buttonGroup( o.useCollapsedBut );
		
		if ( o.useSetButton ) {
			switch (o.mode) {
				case "timeflipbox" :
					cntlWrk = w.__( "setTimeButtonLabel" ); break;
				case "durationflipbox" :
					cntlWrk = w.__( "setDurationButtonLabel" ); break;
				case "flipbox":
				case "datetimeflipbox":
					cntlWrk = w.__( "setDateButtonLabel" ); break;
			}
			w.setBut = w._stdBtn.close.apply( w, [ cntlWrk ] );
			w.setBut.appendTo( cntlContain );
		}

		if ( o.useTodayButton ) {
			cntlContain.append( w._stdBtn.today.apply( w ) );
		}
		if ( o.useTomorrowButton ) {
			cntlContain.append( w._stdBtn.tomorrow.apply( w ) );
		}
		if ( o.useClearButton ) {
			cntlContain.append( w._stdBtn.clear.apply( w ) );
		}
		if ( o.useCancelButton ) {
			cntlContain.append( w._stdBtn.cancel.apply( w ) );
		}

		cntlContain.appendTo( w.d.intHTML );
	}

	
	if ( w.wheelExists ) { // Mousewheel operation, if plugin is loaded
		w.d.intHTML.on( "mousewheel", ".ui-overlay-shadow", function(e,d) {
			e.preventDefault();
			w._offset($(this).data("field"), ((d<0)?1:-1)*$(this).data("amount"));
		});
	}
	
	w.d.intHTML.on(g.eStart, ".dbRoller", function(e,f) {
		if ( !g.move ) {
			if ( typeof f !== "undefined" ) { e = f; }
			g.move = true;
			g.target = $(this).children().first();
			g.pos = parseInt( g.target.css( "marginTop" ).replace( /px/i, "" ),10 );
			g.start = ( e.type.substr(0,5) === "touch" ) ? 
				e.originalEvent.changedTouches[0].pageY : 
				e.pageY;
			g.end = false;
			g.direc = ( dur ) ? 1 : -1;
			g.velocity = 0;
			g.time = Date.now();
			e.stopPropagation();
			e.preventDefault();
		}
	});
};

JTSageDateBox._drag.timeflipbox     = function() { this._drag.flipbox.apply( this ); };
JTSageDateBox._drag.datetimeflipbox = function() { this._drag.flipbox.apply( this ); };
JTSageDateBox._drag.durationflipbox = function() { this._drag.flipbox.apply( this ); };

JTSageDateBox._drag.flipbox = function() {
	var w = this,
		o = this.options,
		g = this.drag;
	
	$(document).on(g.eMove, function(e) {
		if ( g.move && o.mode.slice(-7) === "flipbox" ) {
			g.end = ( e.type.substr(0,5) === "touch" ) ? 
				e.originalEvent.changedTouches[0].pageY : 
				e.pageY;

			g.target.attr("style", "margin-top: " + (g.pos + g.end - g.start) + "px !important" );

			g.elapsed = Date.now()-g.time;
			g.velocity = 0.8 * ( 100 * (g.end - g.start) / ( 1 + g.elapsed ) ) + 0.2 * g.velocity;

			e.preventDefault();
			e.stopPropagation();
			return false;
		}
	});
	
	$(document).on(g.eEnd, function(e) {
		var eachItem, delta, currentPosition, goodPosition, totalMove, numberFull, goodGuess;
		if ( g.move && o.mode.slice(-7) === "flipbox" ) {
			if ( ( g.velocity < 15 && g.velocity > -15 ) || !o.useKinetic )  {
				g.move = false;
				if ( g.end !== false ) {
					e.preventDefault();
					e.stopPropagation();
					g.tmp = g.target.closest( ".dbRollerC" );
					w._offset(
						g.tmp.data("field"),
						( parseInt( ( g.start - g.end ) / ( g.target.outerHeight() - 2 ), 10 ) *
							g.tmp.data( "amount" ) * g.direc ) );
				}
				g.start = false;
				g.end = false;
			} else {
				g.move = false;
				g.start = false;
				g.end = false;
				g.tmp = g.target.closest( ".dbRollerC" );

				eachItem = g.target.outerHeight();

				delta = ( -( g.velocity * 0.8 ) * Math.exp( -g.elapsed / 325 ) * 8 ) * -1;

				currentPosition = parseInt( g.target.css("marginTop").replace(/px/i, ""), 10 );
				goodPosition = parseInt( currentPosition + delta, 10 );

				totalMove = g.pos - goodPosition; 
				numberFull = Math.round(totalMove / ( eachItem ));
				goodGuess = numberFull * g.tmp.data( "amount" ) * g.direc;
				
				g.target.animate(
					{
						marginTop: goodPosition
					}, 
					parseInt(10000/g.velocity) + 1000,
					function() {
						w._offset( g.tmp.data("field"), goodGuess);
					}
				);

				e.preventDefault();
				e.stopPropagation();
			}
		}
	});
};
