/**
 * JTSage-DateBox
 * @fileOverview Provides the datebox, timebox, durationbox, and datetimebox modes
 * @author J.T.Sage <jtsage+datebox@gmail.com>
 * @author {@link https://github.com/jtsage/jtsage-datebox/contributors|GitHub Contributors}
 * @license {@link https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt|MIT}
 * @version 5.0.0
 */

mergeOpts({
	durationStep     : 1,
	durationSteppers : { "d" : 1, "h" : 1, "i" : 1, "s" : 1 }
});

/**
 * Update the input boxes in the control
 * 
 * @param  {boolean} shortRun Use shortrun (skip checking the date and setting the header)
 */
JTSageDateBox._dbox_run_update = function(shortRun) {
	// Update the current view of the datebox.
	//
	// Datebox is different from most modes, it replaints
	// it's screen, it doesn't rebuild & replace it.
	var w   = this,
		o   = this.options,
		dur = ( o.mode === "durationbox" ? true : false );

	if ( dur ) { w._getCleanDur() ; }
		
	if ( shortRun !== true && dur !== true ) {
		w._check();
	
		if ( o.mode === "datebox" || o.mode === "datetimebox" ) {
			w.d.intHTML
				.find( ".dbHeader" )
				.childern()
				.first()
				.text( w._formatter( w.__( "headerFormat" ), w.theDate ) );
		}
		
		if ( o.useSetButton ) {
			if ( w.dateOK === false ) {
				w.setBut.addClass( o.disabledState );
			} else {
				w.setBut.removeClass( o.disabledState );
			}
		}
	}
	
	w.d.intHTML.find( "input" ).each(function () {
		switch ( $(this).data( "field" ) ) {
			case "y":
				$(this).val( w.theDate.get(0) ); break;
			case "m":
				$(this).val( w.theDate.get(1) + 1 ); break;
			case "d":
				$(this).val( ( dur ? w.lastDurationA[0] : w.theDate.get(2) ) );
				break;
			case "h":
				if ( dur ) {
					$(this).val(w.lastDurationA[1]);
				} else {
					if ( w.__("timeFormat") === 12 ) {
						$(this).val( w.theDate.get12hr() );
					} else {
						$(this).val( w.theDate.get(3) );
					}
				}
				break;
			case "i":
				if ( dur ) {
					$(this).val( w.lastDurationA[2] );
				} else {
					$(this).val( w._zPad( w.theDate.get(4) ) );
				}
				break;
			case "M":
				$(this).val( w.__( "monthsOfYearShort" )[w.theDate.get(1)] ); break;
			case "a":
				$(this).val( w.__( "meridiem" )[ (w.theDate.get(3) > 11) ? 1 : 0 ] );
				break;
			case "s":
				if ( dur ) {
					$(this).val( w.lastDurationA[3] );
				} else {
					$(this).val( w._zPad( w.theDate.get(5) ) );
				}
				break;
		}
	});
	if ( w.__( "useArabicIndic" ) === true ) { w._doIndic(); }
};


/**
 * This handles manual input to the input boxes in datebox, timebox,
 * durationbox, and datetimebox.
 * 
 * @param  {object} item jQuery input object
 */
JTSageDateBox._dbox_enter = function (item) {
	var tmp,
		cleanVal = parseInt(item.val(), 10),
		w        = this,
		t        = 0;
	
	if ( item.data( "field" ) === "M" ) {
		tmp = w.__( "monthsOfYearShort" ).indexOf( item.val() );
		if ( tmp > -1 ) { w.theDate.setMonth( tmp ); }
	}
	if ( item.val() !== "" && item.val().toString().search(/^[0-9]+$/) === 0 ) {
		switch ( item.data( "field" ) ) {
			case "y":
				w.theDate.setD( 0, cleanVal); break;
			case "m":
				w.theDate.setD( 1, cleanVal-1); break;
			case "d":
				w.theDate.setD( 2, cleanVal);
				t += (60*60*24) * cleanVal;
				break;
			case "h":
				w.theDate.setD( 3, cleanVal);
				t += (60*60) * cleanVal;
				break;
			case "i":
				w.theDate.setD( 4, cleanVal);
				t += (60) * cleanVal;
				break;
			case "s":
				w.theDate.setD( 5, cleanVal);
				t += cleanVal;
				break;
		}
	}
	if ( this.options.mode === "durationbox" ) {
		w.theDate.setTime( w.initDate.getTime() + ( t * 1000 ) );
	}
	setTimeout(function() { w.refresh(); }, 150);
};

/**
 * Build the timebox
 *
 * @memberOf JTSageDateBox._build
 * @this JTSageDateBox
 */
JTSageDateBox._build.timebox     = function () { this._build.datebox.call( this ); };

/**
 * Build the datetimebox
 *
 * @memberOf JTSageDateBox._build
 * @this JTSageDateBox
 */
JTSageDateBox._build.datetimebox = function () { this._build.datebox.call( this ); };

/**
 * Build the durationbox
 *
 * @memberOf JTSageDateBox._build
 * @this JTSageDateBox
 */
JTSageDateBox._build.durationbox = function () { this._build.datebox.apply( this, [] ); };

/**
 * Build the datebox
 *
 * @memberOf JTSageDateBox._build
 * @this JTSageDateBox
 */
JTSageDateBox._build.datebox = function () {
	var offAmount, i, ctrlWrk, ctrlRow,
		w             = this,
		o             = this.options,
		ctrlContainer = w.style_dboxCtr(),
		dur           = ( o.mode === "durationbox" ? true : false ),
		defDurOrder   = ["d","h","i","s"];
	
	// If the internal HTML is set, clear it
	if ( typeof w.d.intHTML !== "boolean" ) {
		w.d.intHTML.empty().remove();
	}
	
	// Select appropriate header text
	w.d.headerText = w._grabLabel (
		( o.mode === "datebox" || o.mode === "datetimebox" ) ?
			w.__( "titleDateDialogLabel" ) :
			w.__( "titleTimeDialogLabel" )
	);

	w.d.intHTML = $( "<span>" );

	w.d.intHTML.addClass( o.theme_spanStyle );
	
	// Select field order based on mode
	w.fldOrder = w._getFldOrder( o.mode );

	// If not in duration mode, check the date and reset the minute stepper
	// If in duration mode, fix the duration stepper
	if ( !dur ) {
		w._check();
		w._minStepFix();
	} else {
		w.dateOK = true;
		w._fixstepper( w.fldOrder );
	}
	
	// Create a header for datebox and datetimebox modes
	if ( o.mode === "datebox" || o.mode === "datetimebox" ) {
		w.style_subHead( w._formatter( w.__( "headerFormat" ), w.theDate ) )
			.appendTo( w.d.intHTML );
	}
	
	ctrlRow = w.style_dboxRow();

	// Build the controls
	for ( i = 0; i < w.fldOrder.length; i++ ) {
		
		if ( w.fldOrder[i] === "a" && w.__( "timeFormat" ) !== 12 ) { continue; }

		if ( dur ) {
			offAmount = o.durationSteppers[w.fldOrder[i]];
		} else {
			offAmount = ( w.fldOrder[i] === "i" ) ? o.minuteStep: 1;
		}

		ctrlWrk = w.style_dboxCtrl(
			o.theme_dbox_PrevBtn,
			o.theme_dbox_NextBtn,
			w.fldOrder[i],
			( dur ) ? w.__( "durationLabel" )[ defDurOrder.indexOf( w.fldOrder[i] ) ] : null,
			o.theme_dbox_Inputs
		);
		ctrlWrk.find( "input" ).data({
			field  : w.fldOrder[i],
			amount : offAmount
		});
		ctrlWrk.find( ".dbBoxNext" ).data({
			field  : w.fldOrder[i],
			amount : offAmount
		});
		ctrlWrk.find( ".dbBoxPrev" ).data({
			field  : w.fldOrder[i],
			amount : offAmount * -1
		});

		ctrlRow.append( ctrlWrk );
	}

	ctrlContainer.append( ctrlRow );
	ctrlContainer.appendTo( w.d.intHTML );

	// Populate the input boxes
	w._dbox_run_update( true );

	// Do bottom buttons
	w.d.intHTML.append( w._doBottomButtons.call( w, true ) );

	// Set up events
	w.d.intHTML
		.on( "change",   "input", function()  { w._dbox_enter( $( this ) ); })
		.on( "keypress", "input", function(e) {
			if ( e.which === 13 && w.dateOK === true ) {
				w._dbox_enter( $( this ) );
				w._t( {
					method : "set",
					value  : w._formatter(w.__fmt(),w.theDate),
					date   : w.theDate
				} );
				w._t( { method : "close" } );
			}
		})
		.on( "mousewheel", "input", function( e, d ) {
			e.preventDefault();
			w._offset(
				$( this ).data( "field" ),
				( ( d < 0 ) ? -1 : 1 ) * $( this ).data( "amount" )
			);
		})
		.on( o.clickEvent, ".dbBoxPrev, .dbBoxNext", function(e) {
			w.d.intHTML.find( ":focus" ).blur();
			e.preventDefault();
			w._offset(
				$( this ).data( "field" ),
				$( this ).data( "amount" )
			);
		});
};