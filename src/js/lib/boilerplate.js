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
		o = $.extend(
			this.options,
			this._getLongOptions( this.element ),
			this.element.data( "options" )
		),
		_sf = this.styleFunctions,
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
			input: this.element,
			wrap: this.element.parent(),
			mainWrap: $( "<div>", { 
				"class": "dbContainer_" + this.uuid
				} ).css( "zIndex", o.zindex ),
			intHTML: false
		},
		styleTag = "<style>" +
				".dbContainer_" + this.uuid + " { width: " + o.controlWidth + "}" +
				
				"@media (max-width: " + o.breakpointWidth + ") { " +
				".dbContainer_" + this.uuid + " { " +
					"width: 95%; margin-left: auto; margin-right: auto; } }" +

				( ( o.theme_headStyle !== false ) ? o.theme_headStyle : "" ) +
			"</style>",
		evtid = ".datebox" + this.uuid,
		touch = ( typeof window.ontouchstart !== "undefined" ),
		drag = {
			eStart : "touchstart" + evtid + " mousedown" + evtid,
			eMove  : "touchmove" + evtid + " mousemove" + evtid,
			eEnd   : "touchend" + evtid + " mouseup" + evtid,
			eEndA  : (true ?
				(["mouseup","touchend","touchcancel","touchmove"].join(evtid+" ") + evtid) :
				"mouseup" + evtid
			),
			move   : false,
			start  : false,
			end    : false,
			pos    : false,
			target : false,
			delta  : false,
			tmp    : false
		};

	$( "head" ).append( $( styleTag ) );

	$.extend(w, {d: d, drag: drag, touch:touch, icons:this.icons});

	if ( o.usePlaceholder !== false ) {
		if ( o.usePlaceholder === true && w._grabLabel() !== "" ) { 
			w.d.input.attr( "placeholder", w._grabLabel());
		}
		if ( typeof o.usePlaceholder === "string" ) {
			w.d.input.attr( "placeholder", o.usePlaceholder );
		}
	}

	w.cancelClose    = false;
	w.calDateVisible = true;
	w.disabled       = false;
	w.runButton      = false;
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

	w.d.wrap = _sf.baseInputWrap.apply( w, [ w.d.input ] );
	
	if ( o.mode !== false ) {
		if ( o.buttonIcon === false ) {
			if ( o.mode.substr( 0, 4 ) === "time" || o.mode.substr( 0 ,3 ) === "dur" ) {
				o.buttonIcon = o.buttonIconTime;
			} else {
				o.buttonIcon = o.buttonIconDate;
			}
		}
	}

	if ( o.useButton ) {
		$( _sf.baseInputButton.apply( w, [ o.buttonIcon, w.__( "tooltip") ] ) )
			.on(o.clickEvent, function( e ) {
				e.preventDefault();
				if ( o.useFocus ) {
					w.d.input.focus();
				} else {
					if ( !w.disabled ) { w._t( { method: "open" } ); }
				}
			})
			.appendTo(w.d.wrap);
	} else {
		_sf.baseInputNoButton(w.d.wrap);
	}

	if ( o.hideInput ) { _sf.hideInput.apply( this ); }

	w.d.input
		.on( "focus.datebox", function(){
			_sf.focusInput(w.d.input);
			if ( w.disabled === false && o.useFocus ) {
				w._t( { method: "open" } );
			}
		})
		.on( "blur.datebox", function() {
			_sf.blurInput(w.d.input);
		})
		.on( "change.datebox", function() {
			/* 
			o.runOnBlur === function ( {oldDate, newDate, wasGoodDate} ) { 
				return {didSomething(bool), newDate};
			}
			*/
			if ( typeof o.runOnBlurCallback === "function" ) {
				runTmp = w._makeDate( w.d.input.val(), true );
				ranTmp = o.runOnBlurCallback.apply( w, [{
					oldDate: w.theDate,
					newDate: runTmp[0],
					wasGoodDate: !runTmp[1],
					wasBadDate: runTmp[1]
				}]);
				if ( typeof ranTmp !== "object" ) { 
					w.theDate = w._makeDate( w.d.input.val() );
					w.refresh();
				} else {
					if ( ranTmp.didSomething === true ) {
						w.d.input.val(ranTmp.newDate);
					}
					w.theDate = w._makeDate( w.d.input.val() );
					w.refresh();
				}
			} else {
				w.theDate = w._makeDate( w.d.input.val() );
				w.refresh();
			}
		})
		.on( "datebox", w._event );

	if ( o.lockInput ) { 
		w.d.input.attr( "readonly", "readonly" ); 
	}

	// Check if mousewheel plugin is loaded
	if ( typeof $.event.special.mousewheel !== "undefined" ) {
		w.wheelExists = true;
	}

	// Disable when done if element attribute disabled is true.
	if ( w.d.input.is( ":disabled" ) ) {
		w.disable();
	}

	w.applyMinMax( false, false );

	if ( o.displayMode === "inline" || o.displayMode === "blind" ) {
		//o.useInline || o.useInlineBlind ) {
		w.open();
	}

	//Throw dateboxinit event
	$( document ).trigger( "dateboxaftercreate" );
};


/**
 * Open the DateBox widget
 *
 */
JTSageDateBox.open = function () {
	// PUBLIC function to open the control
	var w             = this,
		o             = this.options,
		_sf           = this.styleFunctions,
		basepop       = {};

	if ( o.useFocus && w.fastReopen === true ) { 
		w.d.input.blur();
		return false;
	}

	w.theDate      = w._makeDate( w.d.input.val() );
	w.originalDate = w.theDate.copy();
	
	if ( w.d.input.val() === "" ) { w._startOffset( w.theDate ); }
	w.d.input.blur();

	if ( typeof w._build[ o.mode ] === "undefined" ) {
		w._build[ "default" ].apply( w, [] );
	} else {
		w._build[ o.mode ].apply( w, [] );
	}
	if ( typeof w._drag[ o.mode ] !== "undefined" ) {
		w._drag[ o.mode ].apply( w, [] );
	}

	w._t( { method: "refresh" } );

	if ( w.__( "useArabicIndic" ) === true ) { w._doIndic(); }

	// Ignore if already open
	if ( w.d.intHTML.is( ":visible" ) ) { return false; }

	w.d.mainWrap.empty();

	if ( o.useHeader ) {
		w.d.mainWrap.append( $( _sf.widgetHeader.apply( w, [
			w.d.headerText,
			o.theme_headerTheme,
			o.theme_headerBtnCls,
			o.theme_headerBtnIcn
		] ) ) )
		.find( ".dbCloser" ).on( o.clickEvent, function( e ) {
			e.preventDefault();
			w._t( { method: "close", closeCancel: true } );
		} );
	}
	
	w.d.mainWrap.append( w.d.intHTML ).css( "zIndex", o.zindex );

	w._t( { method: "postrefresh" } );

	// Perpare open callback, if provided. Additionally, if this
	// returns false then the open/update will stop.
	if ( o.openCallback !== false ) {
		if ( ! $.isFunction( o.openCallback ) ) {
			if ( typeof window[ o.openCallback ] === "function" ) {
				o.openCallback = window[ o.openCallback ];
			}
		}
		basepop.afteropen = function() {
			w._t( { method: "postrefresh" } );
			if ( o.openCallback.apply( w, $.merge([{
						custom: w.customCurrent,
						initDate: w.initDate,
						date: w.theDate,
						duration: w.lastDuration
					}], o.openCallbackArgs ) ) === false ) {

				w._t( {method: "close"} );
			}
		};
	} else {
		basepop.afteropen = function() {
			w._t( { method: "postrefresh" } );
		};
	}

	// Perpare BEFORE open callback, if provided. Additionally, if this
	// returns false then the open/update will stop.
	if ( o.beforeOpenCallback !== false ) {
		if ( ! $.isFunction( o.beforeOpenCallback ) ) {
			if ( typeof window[ o.beforeOpenCallback ] === "function" ) {
				o.beforeOpenCallback = window[ o.beforeOpenCallback ];
			}
		}
		if ( o.beforeOpenCallback.apply( w, $.merge([{
				custom: w.customCurrent,
				initDate: w.initDate,
				date: w.theDate,
				duration: w.lastDuration
			}], o.beforeOpenCallbackArgs ) ) === false ) {
				return false;
		}
	}

	switch ( o.displayMode ) {
		case "inline":
			w.d.mainWrap.insertAfter( _sf.findAttachPoint.apply( w, [ true ] ) );
			w.d.mainWrap.addClass( o.theme_inlineContainer );
			w.d.mainWrap.css( { zIndex: "auto" } );
			switch ( o.displayInlinePosition ) {
				case "right":
					w.d.mainWrap.css( { marginRight: 0, marginLeft: "auto" } );
					break;
				case "left":
					w.d.mainWrap.css( { marginLeft: 0, marginRight: "auto" } );
					break;
				//case "center":
				//case "middle":
				default:
					w.d.mainWrap.css( { marginLeft: "auto", marginRight: "auto" } );
					break;
			}
			w._t( { method: "postrefresh" } );
			break;
		case "blind":
			if ( w.initDone ) {
				w.refresh();
				w.d.mainWrap.slideDown();
			} else {
				w.d.mainWrap.insertAfter( _sf.findAttachPoint.apply( w, [ true ] ) );
				w.d.mainWrap.addClass( o.theme_inlineContainer );
				w.d.mainWrap.css( { zIndex: "auto", display: "none" } );
				switch ( o.displayInlinePosition ) {
					case "right":
						w.d.mainWrap.css( { marginRight: 0, marginLeft: "auto" } );
						break;
					case "left":
						w.d.mainWrap.css( { marginLeft: 0, marginRight: "auto" } );
						break;
					//case "center":
					//case "middle":
					default:
						w.d.mainWrap.css( { marginLeft: "auto", marginRight: "auto" } );
						break;
				}
				w.initDone = true;
			}
			w._t( { method: "postrefresh" } );
			break;
		case "modal":
			w.d.mainWrap
				.show()
				.css( "zIndex", ( o.zindex ) )
				.appendTo( _sf.findAttachPoint.apply( w, [ false ] ) )
				.addClass( o.theme_modalContainer )
				.one( o.tranDone, function() { 
					if ( w.d.mainWrap.is( ":visible" ) ) {
						basepop.afteropen.call();
					} else {
						basepop.afterclose.call();
						w.d.mainWrap.removeClass( "db-show" );
					}
				});

			w.d.backdrop = $("<div class='jtsage-datebox-backdrop-div'></div>")
				.css( o.theme_backgroundMask )
				.css( "zIndex", ( o.zindex - 1 ) )
				.appendTo( _sf.findAttachPoint.apply( w, [ false ] ) )
				.on( o.clickEvent, function (e) {
					e.preventDefault();
					w._t( { method: "close", closeCancel: true } );
				});

			w.d.mainWrap.css(
				w.getModalPosition.apply( this, [ o.displayDropdownPosition ] )
			);
			
			break;
		// case "dropdown":
		default:
			w.d.mainWrap
				.show()
				.addClass( o.theme_dropdownContainer )
				.appendTo( _sf.findAttachPoint.apply( w, [ false ] ) )
				.one( o.tranDone, function() { 
					if ( w.d.mainWrap.is( ":visible" ) ) {
						basepop.afteropen.call();
					} else {
						basepop.afterclose.call();
						w.d.mainWrap.removeClass( "db-show" );
					}
				});

			w.d.backdrop = $("<div class='jtsage-datebox-backdrop-div'></div>")
				.css( o.theme_backgroundMask )
				.css( "zIndex", ( o.zindex - 1 ) )
				.appendTo( "body" )
				.on( o.clickEvent, function (e) {
					e.preventDefault();
					w._t( { method: "close", closeCancel: true } );
				});
			
			w.d.mainWrap.css(
				w.getDropPosition.apply( this, [ o.displayDropdownPosition ] )
			);

			break;
	}
	window.setTimeout(function () {
		w.d.mainWrap.addClass( "db-show" );
	}, 0);
	window.setTimeout(function () { // This is hacky as hell.
		w.d.mainWrap.trigger( "oTransitionEnd" );
	}, 200);
};


/**
 * Close the DateBox widget
 *
 */
JTSageDateBox.close = function() {
	// Provide a PUBLIC function to close the element.
	var w = this,
		o = this.options,
		basepop = {};

	// Trigger the popup to close
	// // Prepare close callback.
	if ( o.closeCallback !== false ) {
		if ( ! $.isFunction( o.closeCallback ) ) {
			if ( typeof window[ o.closeCallback ] === "function" ) {
				o.closeCallback = window[ o.closeCallback ];
			}
		}
		basepop.afterclose = function() {
			o.closeCallback.apply( w, $.merge([{
				custom      : w.customCurrent,
				initDate    : w.initDate,
				date        : w.theDate,
				duration    : w.lastDuration,
				cancelClose : w.cancelClose
			}], o.closeCallbackArgs ) );
		};
	} else {
		basepop.afterclose = function() {
			return true;
		};
	}
	
	switch ( o.displayMode ) {
		case "inline" :
			// Do Nothing.
			basepop.afterclose.call();
			return true;
		case "blind" :
			w.d.mainWrap.slideUp();
			basepop.afterclose.call();
			return true;
		//case "modal" :
		//case "dropdown":
		default :
			$( ".jtsage-datebox-backdrop-div" ).remove();
			w.d.mainWrap.removeClass( "db-show" );
			basepop.afterclose.call();
			w.d.mainWrap.hide();
			w.d.mainWrap.detach();
			break;
	}

	// Unbind all drag handlers.
	$( document )
		.off( w.drag.eMove )
		.off( w.drag.eEnd  )
		.off( w.drag.eEndA );

	if ( o.useFocus ) {
		w.fastReopen = true;
		setTimeout( (function( t ) { 
			return function () { 
				t.fastReopen = false; 
			};
		}( w )), 300 );
	}
};


/**
 * Destroy the DateBox widget and data
 *
 */
JTSageDateBox._destroy = function() {
	var w      = this,
		o      = this.options,
		button = w.d.wrap.find( "bdOpenButton" );

	if ( o.useButton === true ) {
		button.remove();
		w.d.input.unwrap();	
	}

	if ( o.lockInput ) {
		w.d.input.removeAttr( "readonly" );
	}

	w.d.input
		.off( "datebox" )
		.off( "focus.datebox" )
		.off( "blur.datebox" )
		.off( "change.datebox" );
		
	$( document )
		.off( w.drag.eMove )
		.off( w.drag.eStart )
		.off( w.drag.eEnd )
		.off( w.drag.eEndA );
};

/**
 * Create a simple select html element
 *
 * @param {!Array<Array>} data Each inside array is [ value, title, selected(bool) ]
 * @param {string} id HTML ID for the select
 * @param {string} cls Class for the select
 * @returns {String} Completed select element 
 */
JTSageDateBox._stdSel = function(data, id, cls) {
	var i, returnVal = "<select class='" + cls + "' id='" + id + "'>";

	for ( i = 0; i < data.length; i++ ) {
		returnVal += "<option value='" + data[i][0] + "'" + 
			( data[i][2] === true ? " selected='selected'" : "" ) + ">" +
			data[i][1] + "</option>";
	}
	returnVal += "</select>";

	return returnVal;
};

/**
 * Create standard buttons
 *
 * @type Object
 * @memberof JTSageDateBox
 * @namespace JTSageDateBox._stdbtn
 */
JTSageDateBox._stdBtn = {

	/**
	 * Make a cancel button.
	 *
	 * @returns {Object} JQuery button object, with events attached
	 * @memberof JTSageDateBox._stdbtn
	 */
	cancel: function() {
		var w = this, o = this.options;
		return $( w.styleFunctions.button.apply( w, [
				o.theme_cancelBtnCls,
				o.theme_cancelBtnIcn,
				w.__("cancelButton")
			] ) )
			.on(o.clickEvent, function (e) {
				e.preventDefault();
				w._t({ method: "close", closeCancel: true });
			});
	},

	/**
	 * Make a clear button
	 * 
	 * @return {Object} JQuery button object, with events attached
	 * @memberOf JTSageDateBox._stdbtn
	 */
	clear: function() {
		var w = this, o = this.options;
		return $( w.styleFunctions.button.apply( w, [
				o.theme_clearBtnCls,
				o.theme_clearBtnIcn,
				w.__("clearButton")
			] ) )
			.on(o.clickEvent, function(e) {
				e.preventDefault();
				w.d.input.val("");
				w._t( { method: "clear" } );
				w._t( { method: "close", closeCancel: true } );
			});
	},

	/**
	 * Make a close button
	 * 
	 * @param  {string} txt Button text, if any
	 * @param  {boolean|string} trigger If trigger is false, run set, otherwise run named trigger 
	 * @return {Object} JQuery button object, with events attached
	 * @memberOf JTSageDateBox._stdbtn
	 */
	close: function(txt, trigger) {
		var w = this, o = this.options;

		if ( typeof trigger === "undefined" ) { trigger = false; }

		return $( w.styleFunctions.button.apply( this, [ 
				o.theme_closeBtnCls,
				o.theme_closeBtnIcn,
				txt
			] ) ) 
			.addClass( "" +
				( ( w.dateOK === true ) ? "" : "disabled")
			)
			.on(o.clickEvent, function(e) {
				e.preventDefault();

				if ( w.dateOK === true ) {
					if ( trigger === false ) {
						w._t( {
							method: "set", 
							value: w._formatter(w.__fmt(),w.theDate),
							date: w.theDate
						} );
					} else {
						w._t( trigger );
					}
					w._t( { method: "close" } );
				}
				
			});
	},

	/**
	 * Make a today button
	 * 
	 * @return {Object} JQuery button object, with events attached
	 * @memberOf JTSageDateBox._stdbtn
	 */
	today: function() {
		var w = this, o = this.options;
		return $( w.styleFunctions.button.apply( w, [
				o.theme_todayBtnCls,
				o.theme_todayBtnIcn,
				w.__("todayButtonLabel")
			] ) )
			.on(o.clickEvent, function(e) {
				e.preventDefault();
				w.theDate = w._pa([0,0,0], new w._date());
				w._t( { method: "doset" } );
				if ( o.closeTodayButton === true ) { w._t( { method: "close" } ); }
			});
	},

	/**
	 * Make a tomorrow button
	 * 
	 * @return {Object} JQuery button object, with events attached
	 * @memberOf JTSageDateBox._stdbtn
	 */
	tomorrow: function() {
		var w = this, o = this.options;
		return $( w.styleFunctions.button.apply( w, [
				o.theme_tomorrowBtnCls,
				o.theme_tomorrowBtnIcn,
				w.__("tomorrowButtonLabel") 
			] ) )
			.on(o.clickEvent, function(e) {
				e.preventDefault();
				w.theDate = w._pa([0,0,0], new w._date()).adj( 2, 1 );
				w._t( { method: "doset" } );
				if ( o.closeTomorrowButton === true ) { w._t( { method: "close" } ); }
			});
	},
};

/**
 * Disable the control
 */
JTSageDateBox.disable = function() {
	var w = this;
	// Provide a PUBLIC function to Disable the element
	w.d.input.attr( "disabled", true );
	w.disabled = true;
	w._t( { method: "disable" } );
};

/**
 * Enable the control
 */
JTSageDateBox.enable = function() {
	var w = this;
	// Provide a PUBLIC function to Enable the element
	w.d.input.attr( "disabled", false );
	w.disabled = false;
	w._t( { method: "enable" } );
};