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
	useSetButton: true,
	useCancelButton: false,
	useTodayButton: false,
	useTomorrowButton: false,
	useClearButton: false,
	useCollapsedBut: false,
	
	validHours: false,
	flen: { 
		"y": 15,
		"m": 12,
		"d": 20,
		"h": 12,
		"i": 15,
	},
	durationStep: 1,
	durationSteppers: {
		"d": 1,
		"h": 1,
		"i": 1,
		"s": 1
	}
});


JTSageDateBox._fbox_pos = function () {
	// Position the lens and the reels on widget open and 
	// when they are changed
	var fixer, element, first,
		w = this,
		parentHeight = this.d.intHTML.find( ".ui-datebox-flipcontent" ).innerHeight();
		
	w.d.intHTML.find( ".ui-datebox-flipcenter" ).each(function() {
		element = $( this );
		element.css( "top", ( ( parentHeight / 2 ) - ( element.innerHeight() / 2 ) - 3 ) * -1 );
	});

	w.d.intHTML.find( "ul" ).each(function () {
		element = $( this );
		parentHeight = element.parent().innerHeight();
		first = element.find( "li" ).first();
		fixer = element.find( "li" ).last().offset().top - element.find("li").first().offset().top;
		first.css("marginTop", ( ( ( fixer - parentHeight ) / 2 ) + first.outerHeight() ) * -1 );
	});
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

JTSageDateBox._fbox_mktxt = {
	// Create the year, month, date, hour, and minute reels
	y: function(i) {
		return this.theDate.get(0) + i;
	},
	m: function(i) {
		var testDate = ( this.theDate.copy( [0], [0,0,1] ) ).adj( 1, i );
		return this.__("monthsOfYearShort")[ testDate.get(1) ];
	},
	d: function(i) {
		// Extra logic here is to "repeat" the current month dates if
		// rollover is not allowed.
		var w= this,
			o = this.options;

		if ( o.rolloverMode === false || 
			( typeof o.rolloverMode.d !== "undefined" && o.rolloverMode.d === false )
			) {

			var today = this.theDate.get(2),
				lastDate = 32 - w.theDate.copy([0],[0,0,32,13]).getDate(),
				tempDate = today + i;

			if ( tempDate < 1 ) { 
				return lastDate + tempDate;
			} else {
				if ( tempDate % lastDate > 0 ) {
					return tempDate % lastDate;
				} else { 
					return lastDate;
				}
			}
		} 
		return ( this.theDate.copy([0,0,i]) ).get(2);
	},
	h: function(i) {
		var testDate = this.theDate.copy( [0,0,0,i] );
		return ( ( this.__("timeFormat") === 12 ) ?
			testDate.get12hr() :
			testDate.get(3) );
	},
	i: function(i) {
		return this._zPad( ( this.theDate.copy( [0,0,0,0,i] )).get(4) );
	}
};

// Really, timeflipbox and durationflipbox are just aliases
JTSageDateBox._build.timeflipbox = function() { this._build.flipbox.apply( this ); };
JTSageDateBox._build.durationflipbox = function() { this._build.flipbox.apply( this ); };

JTSageDateBox._build.flipbox = function () {
	var i, y, hRow, tmp, hRowIn, stdPos, controlButtons,
		w = this,
		o = this.options,
		g = this.drag,
		cDurS = {},
		normDurPositions = ["d", "h", "i", "s"],
		dur = ( o.mode === "durationflipbox" ? true : false ),
		uid = "ui-datebox-",
		flipBase = $( "<div class='ui-overlay-shadow'><ul></ul></div>" ),
		ctrl = $( "<div>", { "class": uid+"flipcontent" } ),
		ti = w.theDate.getTime() - w.initDate.getTime(),
		themeType = "" +
			( ( w.baseMode === "jqm" ) ? "ui-body-" : "" ) +
			( ( w.baseMode === "bootstrap" ) ? "bg-" : "" ),
		cDur = w._dur( ti<0 ? 0 : ti ),
		currentTerm, currentText;

	if ( ti < 0 ) {
		w.lastDuration = 0;
		if ( dur ) { w.theDate.setTime( w.initDate.getTime() ); }
	} else {
		if ( dur ) { w.lastDuration = ti / 1000; }
	}

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

	w.fldOrder = ( o.mode === "flipbox" ) ?
		w.__( "dateFieldOrder" ) :
		( dur ) ? 
			w.__("durationOrder") :
			w.__( "timeFieldOrder" );
			
	if ( !dur ) {
		w._check();
		w._minStepFix();
	} else {
		if ( o.minDur !== false &&
				( w.theDate.getEpoch() - w.initDate.getEpoch() ) < o.minDur ) {
			w.theDate = new Date( w.initDate.getTime() + ( o.minDur * 1000 ) );
			w.lastDuration = o.minDur;
			cDur = w._dur( o.minDur * 1000 );
		}
		if ( o.maxDur !== false &&
				( w.theDate.getEpoch() - w.initDate.getEpoch() ) > o.maxDur ) {
			w.theDate = new Date( w.initDate.getTime() + ( o.maxDur * 1000 ) );
			w.lastDuration = o.maxDur;
			cDur = w._dur( o.maxDur * 1000 );
		}
	}

	if ( o.mode === "flipbox" ) { 
		$( w._spf("<div class='{cls}'><h4>{text}</h4></div>", {
			cls: uid + "header",
			text: w._formatter( w.__( "headerFormat" ), w.theDate )
		})).appendTo(w.d.intHTML); 
	}
	
	if ( dur ) {
		w._fixstepper(w.fldOrder);
		
		tmp = $( w._spf("<div class='{cls}'></div>", {
			cls: uid + "header" +
				" ui-grid-" + ["a","b","c","d","e"][w.fldOrder.length - 2] +
				" row"
		}));
		
		for ( y = 0; y < w.fldOrder.length; y++ ) {
			$( w._spf("<div class='{cls}'>{text}</div>", {
				text: w.__( "durationLabel" )[$.inArray( w.fldOrder[y], normDurPositions )],
				cls: uid + "fliplab" +
					" ui-block-" + ["a","b","c","d","e"][y] +
					" col-xs-" + 12/w.fldOrder.length
			})).appendTo(tmp);
		}
		tmp.appendTo(w.d.intHTML);
		
		w.dateOK = true;
		cDurS.d = w._fbox_series(cDur[0],16,"d",false);
		cDurS.h = w._fbox_series(cDur[1],16,"h",(cDur[0]>0));
		cDurS.i = w._fbox_series(cDur[2],20,"i",(cDur[0]>0 || cDur[1]>0));
		cDurS.s = w._fbox_series(cDur[3],20,"s",(cDur[0]>0 || cDur[1]>0 || cDur[2]>0));
		
		ctrl.addClass( uid + "flipcontentd" );
		
		for ( y = 0; y < w.fldOrder.length; y++ ) {
			stdPos = w.fldOrder[ y ];
			currentTerm = cDur[ $.inArray( stdPos, normDurPositions ) ];

			hRow = flipBase.clone().data({
				"field": stdPos,
				"amount": o.durationSteppers[ stdPos ]
			});
			hRowIn = hRow.find( "ul" );

			for ( i in cDurS[ stdPos ] ) {
				$( w._spf( "<li class='{cls}'><span>{text}</span></li>", {
					text: cDurS[ stdPos ][ i ][ 0 ],
					cls: themeType + ((cDurS[ stdPos ][ i ][ 1 ] !== currentTerm ) ?
						o.themeDate :
						o.themeDatePick
					)
				})).appendTo( hRowIn );
			}
			hRow.appendTo(ctrl);
		}
	}

	for ( y=0; ( y < w.fldOrder.length && !dur ); y++ ) {
		currentTerm = w.fldOrder[y];
		
		hRow = flipBase.clone().data({
			"field": currentTerm,
			"amount": (currentTerm === "i") ? o.minuteStep : 1
		});
		hRowIn = hRow.find( "ul" );
				
		
		if ( typeof w._fbox_mktxt[currentTerm] === "function" ) {
			for ( i = -1 * o.flen[currentTerm]; i < ( o.flen[currentTerm] + 1 ); i++ ) {
				$( w._spf( "<li class='{cls}'><span>{text}</span></li>", {
					cls: themeType + (( i !== 0 ) ? o.themeDate : o.themeDatePick),
					text: w._fbox_mktxt[currentTerm].apply(
						w,
						[(currentTerm === "i") ? i * o.minuteStep : i]
					)
				})).appendTo( hRowIn );
			}
			hRow.appendTo( ctrl );
		}
		if ( currentTerm === "a" && w.__("timeFormat") === 12 ) {
			currentText = $("<li class='" + themeType+o.themeDate + "'><span></span></li>");
			
			tmp = (w.theDate.get(3) > 11) ?
				[o.themeDate,o.themeDatePick,2,5] :
				[o.themeDatePick,o.themeDate,2,3];
				
			for ( i = -1 * tmp[2]; i < tmp[3]; i++ ) { 
				if ( i < 0 || i > 1 ) {
					currentText.clone().appendTo( hRowIn );
				} else {
					$( w._spf( "<li class='{cls}'><span>{text}</span></li>", {
						cls: themeType + tmp[i],
						text: w.__( "meridiem" )[i]
					})).appendTo( hRowIn );
				}
			}
			hRow.appendTo( ctrl );
		}
	}
	
	w.d.intHTML.append( ctrl );
	
	$("<div>", { "class": uid + "flipcenter ui-overlay-shadow" } )
		.css( "pointerEvents", "none")
		.appendTo( w.d.intHTML );
	
	if ( o.useSetButton || o.useClearButton  || o.useCancelButton ||
			o.useTodayButton || o.useTomorrowButton ) {
		
		controlButtons = $( "<div>", { "class": uid + "controls" } );
		
		if ( o.useSetButton ) {
			controlButtons.append( w._stdBtn.close.apply(
				w, [ ( o.mode === "flipbox" ) ? 
					w.__("setDateButtonLabel") :
					( dur ) ?
						w.__("setDurationButtonLabel") :
						w.__("setTimeButtonLabel")]
			));
		}
		if ( o.useTodayButton ) {
			controlButtons.append(w._stdBtn.today.apply(w));
		}
		if ( o.useTomorrowButton ) {
			controlButtons.append(w._stdBtn.tomorrow.apply(w));
		}
		if ( o.useClearButton ) {
			controlButtons.append(w._stdBtn.clear.apply(w));
		}
		if (o.useCancelButton) {
		    controlButtons.append(w._stdBtn.cancel.apply(w));
		}

		w._controlGroup( controlButtons ).appendTo( w.d.intHTML );
	}
	
	if ( w.wheelExists ) { // Mousewheel operation, if plugin is loaded
		w.d.intHTML.on( "mousewheel", ".ui-overlay-shadow", function(e,d) {
			e.preventDefault();
			w._offset($(this).data("field"), ((d<0)?-1:1)*$(this).data("amount"));
		});
	}
	
	w.d.intHTML.on(g.eStart, "ul", function(e,f) {
		if ( !g.move ) {
			if ( typeof f !== "undefined" ) { e = f; }
			g.move = true;
			g.target = $(this).find( "li" ).first();
			g.pos = parseInt(g.target.css("marginTop").replace(/px/i, ""),10);
			g.start = ( e.type.substr(0,5) === "touch" ) ? 
				e.originalEvent.changedTouches[0].pageY : 
				e.pageY;
			g.end = false;
			g.direc = ( dur ) ? -1 : 1;
			e.stopPropagation();
			e.preventDefault();
		}
	});
};

JTSageDateBox._drag.timeflipbox = function() { this._drag.flipbox.apply( this ); };
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
			g.target.css("marginTop", (g.pos + g.end - g.start) + "px");
			e.preventDefault();
			e.stopPropagation();
			return false;
		}
	});
	
	$(document).on(g.eEnd, function(e) {
		if ( g.move && o.mode.slice(-7) === "flipbox" ) {
			g.move = false;
			if ( g.end !== false ) {
				e.preventDefault();
				e.stopPropagation();
				g.tmp = g.target.parent().parent();
				w._offset(
					g.tmp.data("field"),
					(parseInt((g.start - g.end) / ( g.target.outerHeight() - 2 ),10)*
						g.tmp.data( "amount" ) * g.direc));
			}
			g.start = false;
			g.end = false;
		}
	});
};
