/**
 * JTSage-DateBox
 * @fileOverview Responsible for creation / open / close / destroy of widget
 * @author J.T.Sage <jtsage+datebox@gmail.com>
 * @author {@link https://github.com/jtsage/jtsage-datebox/contributors|GitHub Contributors}
 * @license {@link https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt|MIT}
 * @version 5.0.0
 */

/**
 * Create the widget, called automatically on initilization
 *
 */
JTSageDateBox._create = function() {
	// Create the widget, called automatically by widget system
	$( document ).trigger( "dateboxcreate" );

	var w = this, runTmp, ranTmp,
		o = Object.assign(
			this.options,
			this._getLongOptions( this.element ),
			this.element.data( "options" )
		),
		/**
		 * Display elements
		 * @type {Object}
		 * @memberOf JTSageDateBox
		 * @property {object} input jQuery input element
		 * @property {object} wrap JQuery input element parent
		 * @property {object} mainWrap Control HTML wrap
		 * @property {object} intHTML Contol HTML insides
		 */
		d = {
			input    : this.element,
			wrap     : this.element.parent(),
			mainWrap : $( "<div class='dbContainer_" + this.uuid + "'>" ).css( "zIndex", o.zindex ),
			intHTML  : false
		},
		styleTag = "<style>" +
				".dbContainer_" + this.uuid + " { " +
					"touch-action: none; width: " + o.controlWidth + o.controlWidthImp + "}" +
				
				" @media (max-width: " + o.breakpointWidth + ") { " +
				".dbContainer_" + this.uuid + " { " +
					"width: 100% " + o.controlWidthImp + "} } " +

				( ( o.theme_headStyle !== false ) ? o.theme_headStyle : "" ) +
			"</style>",
		evtid = ".datebox" + this.uuid,
		drag = {
			eStart : "touchstart" + evtid + " mousedown" + evtid,
			eMove  : "touchmove"  + evtid + " mousemove" + evtid,
			eEnd   : "touchend"   + evtid + " mouseup"   + evtid,
			eEndA  : [ "mouseup", "touchend", "touchcancel", "touchmove" ]
				.join( evtid + " " ) + evtid,
			move   : false,
			start  : false,
			end    : false,
			pos    : false,
			target : false,
			delta  : false,
			tmp    : false
		};

	$( "head" ).append( $( styleTag ) );

	w.d        = d;
	w.drag     = drag;
	w.icons    = this.icons;

	if ( o.usePlaceholder !== false ) {
		w.d.input.attr( "placeholder", w._grabLabel(
			( typeof o.usePlaceholder === "string" ) ? o.usePlaceholder : ""
		) );
	}

	w.wheelEvent = ( typeof $.event.special.mousewheel !== "undefined" ) ? "mousewheel" : "wheel";

	w.firstOfGrid    = false;
	w.lastOfGrid     = false;
	w.selectedInGrid = false;

	w.cancelClose    = false;
	w.disabled       = false;
	w._date          = window.Date;
	w._enhanceDate();

	/**
	 * @member {string} baseID ID of the datebox Input
	 * @memberOf JTSageDateBox
	 */
	
	w.baseID         = w.d.input.attr( "id" );

	/**
	 * @member {object} initDate JavaScript date object, initialization date
	 * @memberOf JTSageDateBox
	 */

	w.initDate       = new w._date();
	w.initDate.setMilliseconds(0);

	/**
	 * @member {object} theDate JavaScript date object, current date
	 * @memberOf JTSageDateBox
	 */

	w.theDate = ( o.defaultValue ) ?
		w._makeDate() :
		( (w.d.input.val() !== "" ) ?
			w._makeDate( w.d.input.val() ) :
			new w._date() );

	if ( w.d.input.val() === "" ) { w._startOffset( w.theDate ); }

	w.initDone = false;

	if ( o.showInitialValue ) {
		w.d.input.val( w._formatter( w.__fmt(), w.theDate ) );
	}

	w.d.wrap = w.style_inWrap( w.d.input, o.theme_openButton );
	
	if ( o.mode !== false ) {
		if ( o.buttonIcon === false ) {
			o.buttonIcon = ( o.mode.substr( 0, 4 ) === "time" || o.mode.substr( 0 ,3 ) === "dur" ) ?
				o.buttonIconTime :
				o.buttonIconDate;
		}
	}

	if ( o.useButton ) {
		$( w.style_inBtn( o.buttonIcon, w.__( "tooltip" ), o.theme_openButton ) )
			.appendTo( w.d.wrap );

		w.d.wrap.on(o.clickEvent, ".dbOpenButton", function( e ) {
			e.preventDefault();
			if ( o.useFocus ) {
				w.d.input.focus();
			} else {
				if ( !w.disabled ) { w._t( { method : "open" } ); }
			}
		});
	} else {
		w.style_inNoBtn( w.d.wrap );
	}

	if ( o.hideInput ) { w.style_inHide(); }

	o.runOnBlurCallback = w._prepFunc( o.runOnBlurCallback );

	w.d.input
		.on( "focus.datebox", function(){
			if ( w.disabled === false && o.useFocus ) {
				w._t( { method : "open" } );
			}
		})
		.on( "change.datebox", function() {
			if ( o.runOnBlurCallback === false ) {
				// No callback specified
				if ( o.safeEdit === true ) {
					runTmp = w._makeDate( w.d.input.val(), true );
					if ( runTmp[1] === false ){
						// Good date entered, do it.
						w.theDate = runTmp[0];
					} else {
						// Bad date, set to when control was opened.
						// In some cases, this will be today.
						w.theDate = w.originalDate;
						w._t( { method : "doset" } );
					}
				} else {
					w.theDate = w._makeDate( w.d.input.val() );
				}
				
			} else {
				runTmp = w._makeDate( w.d.input.val(), true );
				ranTmp = o.runOnBlurCallback.call( w, {
					origDate : w.originalDate,
					input    : w.d.input.val(),
					oldDate  : w.theDate,
					newDate  : runTmp[0],
					isGood   : !runTmp[1],
					isBad    : runTmp[1]
				} );

				if ( typeof ranTmp !== "object" ) {
					w.theDate = runTmp[0];
				} else {
					w.theDate = ranTmp;
					w._t( { method : "doset" } );
				}
			}
			w.originalDate = w.theDate.copy();
			w.refresh();
		})
		.on( "datebox", w._event );

	if ( o.lockInput ) {
		w.d.input.attr( "readonly", "readonly" );
	}

	// Disable when done if element attribute disabled is true.
	if ( w.d.input.is( ":disabled" ) ) {
		w.disable();
	}

	w.applyMinMax( false, false );

	if ( o.displayMode === "inline" || o.displayMode === "blind" ) {
		w.open();
	}

	//Throw dateboxinit event
	$( document ).trigger( "dateboxaftercreate" );
};

