/* JTSage-DateBox 
 *
 * jQueryMobile option overrides and 
 * basic input/output functions
 */


mergeOpts({
	themeDateToday: "b",
	themeDayHigh: "b",
	themeDatePick: "b",
	themeDateHigh: "b",
	themeDateHighAlt: "b",
	themeDateHighRec: "b",
	themeDate: "a",
	themeButton: "a",
	themeInput: "",

	themeClearButton: "a",
	themeCancelButton: "a",
	themeCloseButton: "a",
	themeTomorrowButton: "a",
	themeTodayButton: "a",

	buttonIconDate: "calendar",
	buttonIconTime: "clock",
	disabledState: "ui-state-disabled",
	
	calNextMonthIcon: "plus",
	calPrevMonthIcon: "minus",

	btnCls: " ui-corner-all ui-btn ui-btn-",
	icnCls: " ui-btn-icon-notext ui-icon-",

	s: {
		cal: {
			prevMonth : "{text}",
			nextMonth : "{text}",
			botButton : "<a href='#' class='{cls} {icon}' role='button'>{text}</a>",
		}
	},
});

JTSageDateBox.baseMode = "jqm";

JTSageDateBox._stdBtn = {
	cancel: function() {
		var w = this, o = this.options;
		return $("<a href='#' role='button'>" + w.__("cancelButton") + "</a>")
			.addClass(
				"ui-btn ui-btn-" + o.themeCancelButton +
				" ui-icon-delete ui-btn-icon-left ui-shadow ui-corner-all"
			)
			.on(o.clickEventAlt, function (e) {
				e.preventDefault();
				w._t({ method: "close", closeCancel: true });
			});
	},
	clear: function() {
		var w = this, o = this.options;
		return $( "<a href='#' role='button'>" + w.__( "clearButton" ) + "</a>" )
			.addClass( 
				"ui-btn ui-btn-" + o.themeClearButton +
				" ui-icon-delete ui-btn-icon-left ui-shadow ui-corner-all"
			)
			.on(o.clickEventAlt, function(e) {
				e.preventDefault();
				w.d.input.val("");
				w._t( { method: "clear" } );
				w._t( { method: "close", closeCancel: true } );
			});
	},
	close: function(txt, trigger) {
		var w = this, o = this.options;

		if ( typeof trigger === "undefined" ) { trigger = false; }
		
		return $( "<a href='#' role='button'>" + txt + "</a>" )
			.addClass( "ui-btn ui-btn-" + o.themeSetButton + 
				" ui-icon-check ui-btn-icon-left ui-shadow ui-corner-all" +
				( ( w.dateOK === true ) ? "" : " ui-state-disabled" )
			)
			.on(o.clickEventAlt, function(e) {
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
	today: function() {
		var w = this, o = this.options;
		return $( "<a href='#' role='button'>" + w.__("todayButtonLabel") + "</a>" )
			.addClass( "ui-btn ui-btn-" + o.themeTodayButton + 
				" ui-icon-navigation ui-btn-icon-left ui-shadow ui-corner-all"
			)
			.on(o.clickEventAlt, function(e) {
				e.preventDefault();
				w.theDate = w._pa([0,0,0], new w._date());
				w.calBackDate = false;
				w._t( { method: "doset" } );
			});
	},
	tomorrow: function() {
		var w = this, o = this.options;
		return $( "<a href='#' role='button'>" + w.__("tomorrowButtonLabel") + "</a>" )
			.addClass( "ui-btn ui-btn-" + o.themeTomorrowButton + 
				" ui-icon-navigation ui-btn-icon-left ui-shadow ui-corner-all"
			)
			.on(o.clickEventAlt, function(e) {
				e.preventDefault();
				w.theDate = w._pa([0,0,0], new w._date()).adj( 2, 1 );
				w.calBackDate = false;
				w._t( { method: "doset" } );
			});
	},
};

JTSageDateBox._destroy = function() {
	var w = this,
		o = this.options,
		button = this.d.wrap.find( "a" );

	w.d.wrap.removeClass( "ui-input-has-clear" );
	button.remove();

	if ( o.lockInput ) {
		w.d.input.removeAttr( "readonly" );
	}

	w.d.input
		.off( "datebox" )
		.off( "focus.datebox" )
		.off( "blur.datebox" )
		.off( "change.datebox" );

	w.d.mainWrap.popup("destroy");
		
	$( document )
		.off( w.drag.eMove )
		.off( w.drag.eEnd )
		.off( w.drag.eEndA );
};

JTSageDateBox._create = function() {
	// Create the widget, called automatically by widget system
	$( document ).trigger( "dateboxcreate" );

	var w = this,
		o = $.extend(
			this.options,
			this._getLongOptions( this.element ),
			this.element.data( "options" )
		),
		thisTheme = ( ( o.theme === false ) ?
			$.mobile.getInheritedTheme( this.element ) :
			o.theme
		),
		trans = o.useAnimation ? o.transition : "none",
		d = {
			input: this.element,
			wrap: this.element.parent(),
			mainWrap: $( "<div>", { 
				"class": "ui-datebox-container ui-overlay-shadow " + 
					"ui-corner-all ui-datebox-hidden " + trans +
					" ui-body-" + thisTheme
				} ).css( "zIndex", o.zindex ),
			intHTML: false
		},
		evtid = ".datebox" + this.uuid,
		touch = ( typeof window.ontouchstart !== "undefined" ),
		drag = {
			eStart : "touchstart" + evtid + " mousedown" + evtid,
			// (touch ? "touchstart" : "mousedown" ) + evtid,
			eMove  : "touchmove" + evtid + " mousemove" + evtid,
			//(touch ? "touchmove" : "mousemove" ) + evtid,
			eEnd   : "touchend" + evtid + " mouseup" + evtid,
			//(touch ? "touchend" : "mouseup" ) + evtid,
			eEndA  : (true ?
				(["mouseup","touchend","touchcanel","touchmove"].join(evtid+" ") + evtid) :
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

	$.extend(w, {d: d, drag: drag, touch:touch});

	if ( o.usePlaceholder !== false ) {
		if ( o.usePlaceholder === true && w._grabLabel() !== "" ) { 
			w.d.input.attr( "placeholder", w._grabLabel());
		}
		if ( typeof o.usePlaceholder === "string" ) {
			w.d.input.attr( "placeholder", o.usePlaceholder );
		}
	}

	o.theme = thisTheme;

	w.cancelClose = false;
	w.calBackDate = false;
	w.calDateVisible = true;
	w.disabled = false;
	w.runButton = false;
	w._date = window.Date;
	w._enhanceDate();
	w.baseID = w.d.input.attr( "id" );

	w.initDate = new w._date();
	w.initDate.setMilliseconds(0);
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

	if ( o.useButton ) {
		if ( o.mode !== false ) {
			w.d.wrap.addClass( "ui-input-has-clear" );
			if ( o.buttonIcon === false ) {
				if ( o.mode.substr( 0, 4 ) === "time" || o.mode.substr( 0 ,3 ) === "dur" ) {
					o.buttonIcon = o.buttonIconTime;
				} else {
					o.buttonIcon = o.buttonIconDate;
				}
			}
			$( "<a href='#' class='ui-input-clear ui-btn ui-icon-" + 
					o.buttonIcon +
					" ui-btn-icon-notext ui-corner-all'></a>" )
				.attr( "title", w.__( "tooltip" ) )
				.text( w.__( "tooltip" ) )
				.appendTo(w.d.wrap)
				.on(o.clickEvent, function( e ) {
					e.preventDefault();
					if ( o.useFocus ) {
						w.d.input.focus();
					} else {
						if ( !w.disabled ) { w._t( { method: "open" } ); }
					}
				});
		}
	}

	if ( o.hideInput ) { w.d.wrap.hide(); }
	if ( o.hideContainer ) { w.d.wrap.parent().hide(); }

	w.d.input
		.on( "focus.datebox", function(){
			w.d.input.addClass( "ui-focus" );
			if ( w.disabled === false && o.useFocus ) {
				w._t( { method: "open" } );
			}
		})
		.on( "blur.datebox", function() { 
			w.d.input.removeClass( "ui-focus" ); 
		})
		.on( "change.datebox", function() {
			w.theDate = w._makeDate( w.d.input.val() );
			w.refresh();
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

	w.applyMinMax(false, false);

	if ( o.useInline || o.useInlineBlind ) {
		w.open();
	}

	//Throw dateboxinit event
	$( document ).trigger( "dateboxaftercreate" );
};

JTSageDateBox.open = function () {
	// PUBLIC function to open the control
	var w = this,
		o = this.options,
		popopts = {
			transition: (o.useAnimation ? o.transition : "none" )
		},
		basepop = { 
			history: false,
			transition: (o.useAnimation ? o.transition : "none" )
		};

	if ( o.useFocus && w.fastReopen === true ) { 
		w.d.input.blur();
		return false;
	}

	w.theDate = w._makeDate( w.d.input.val() );
	w.calBackDate = false;
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

	if ( ( o.useInline || o.useInlineBlind ) && w.initDone === false ) {
		w.d.mainWrap.append( w.d.intHTML );
		
		if ( o.hideContainer ) {
			if ( o.useHeader ) {
				w.d.mainWrap.prepend( $( "<div class='ui-header ui-bar-" + o.themeHeader +
					"'>" + "<h1 class='ui-title'>" + w.d.headerText + "</h1>" + "</div>" )
				);
			}
			w.d.wrap.parent().after( w.d.mainWrap );
		} else {
			w.d.wrap.parent().append( w.d.mainWrap );
		}
		w.d.mainWrap.removeClass( "ui-datebox-hidden ui-overlay-shadow" );
		if ( o.useInline ) {
			w.d.mainWrap
				.addClass( "ui-datebox-inline" )
				.css( "zIndex", "auto" );
				
			if ( !o.hideInput && !o.hideContainer ) {
				w.d.mainWrap.addClass("ui-datebox-inline-has-input");
			} 
			// This is really hacky.  I hate it, but I don't have a 
			// better idea right now.  Cleans up position on flip variants.
			setTimeout( (function(w) { 
				return function() {
					w._t( { method: "postrefresh" } );
				};
			}(w)), 100);
			return true;
		} else {
			w.d.mainWrap
				.addClass( "ui-datebox-inline ui-datebox-inline-has-input" )
				.css( "zIndex", "auto" );
			w.d.mainWrap.hide();
		}
		w.initDone = false;
		w._t( { method: "postrefresh" } );
	}

	if ( o.useInlineBlind ) {
		if ( w.initDone ) { 
			w.refresh();
			w.d.mainWrap.slideDown();
			w._t( { method: "postrefresh" } );
		} else { 
			w.initDone = true; 
		}
		return true;
	}

	// Ignore if already open
	if ( w.d.intHTML.is( ":visible" ) ) { return false; }

	w.d.mainWrap.empty();

	if ( o.useHeader ) {
		w.d.mainWrap.append( $( "<a href='#'>Close</a>" )
			.addClass( "ui-btn-" + o.popupButtonPosition + " ui-link ui-btn ui-btn-" +
				( ( o.themeCloseButton === false ) ? o.themeHeader : o.themeCloseButton ) +
				" ui-icon-delete " + 
				"ui-btn-icon-notext ui-shadow ui-corner-all"
			)
			.on( o.clickEventAlt, function( e ) {
				e.preventDefault();
				w._t( { method: "close", closeCancel: true } );
			} )
		);
		w.d.mainWrap.append( $( "<div class='ui-header ui-bar-" + o.themeHeader + "'>" + 
			"<h1 class='ui-title'>" + w.d.headerText + "</h1>" +
			"</div>" )
		);
	}
	
	w.d.mainWrap.append( w.d.intHTML ).css( "zIndex", o.zindex );
	w._t( { method: "postrefresh" } );

	if ( o.popupPosition !== false ) {
		popopts.positionTo = o.popupPosition;
	} else {
		if ( typeof w.baseID !== "undefined" ) {
			popopts.positionTo = "#" + w.baseID;
		} else {
			popopts.positionTo = "window";
		}
	}

	if ( o.popupForceX !== false && o.popupForceY !== false ) {
		popopts.x = parseInt(o.popupForceX,10);
		popopts.y = parseInt(o.popupForceY,10);
		popopts.positionTo = "origin";
	}

	if ( o.useModal ) {
		basepop.overlayTheme = o.useModalTheme;
		basepop.dismissible = false;
	}

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
	// Prepare close callback.
	if ( o.closeCallback !== false ) {
		if ( ! $.isFunction( o.closeCallback ) ) {
			if ( typeof window[ o.closeCallback ] === "function" ) {
				o.closeCallback = window[ o.closeCallback ];
			}
		}
		basepop.afterclose = function() {
			o.closeCallback.apply( w, $.merge([{
				custom: w.customCurrent,
				initDate: w.initDate,
				date: w.theDate,
				duration: w.lastDuration,
				cancelClose: w.cancelClose
			}], o.closeCallbackArgs ) );
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

	w.d.mainWrap
		.removeClass( "ui-datebox-hidden" )
		.popup( basepop )
		.popup( "open", popopts );
};

JTSageDateBox.close = function() {
	// Provide a PUBLIC function to close the element.
	var w = this,
		o = this.options;

	w.calBackDate = false;
	
	if ( o.useInlineBlind ) { 
		// Slide up useInlineBlind
		w.d.mainWrap.slideUp();
		return true;
	}
	if ( o.useInline || w.d.intHTML === false ) { 
		// Do nothing for useInline or empty.
		return true;
	}

	// Trigger the popup to close
	w.d.mainWrap.popup( "close" );

	// Unbind all drag handlers.
	$( document )
		.off( w.drag.eMove )
		.off( w.drag.eEnd )
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

JTSageDateBox.disable = function() {
	var w = this;
	// Provide a PUBLIC function to Disable the element
	w.d.input.attr( "disabled", true );
	w.d.wrap.addClass( "ui-state-disabled" ).blur();
	w.disabled = true;
	w.d.mainWrap.addClass( "ui-state-disabled" );
	w._t( { method: "disable"});
};

JTSageDateBox.enable = function() {
	var w = this;
	// Provide a PUBLIC function to Enable the element
	w.d.input.attr( "disabled", false );
	w.d.wrap.removeClass( "ui-state-disabled" );
	w.disabled = false;
	w.d.mainWrap.removeClass( "ui-state-disabled" );
	w._t( { method: "enable" });
};

JTSageDateBox._controlGroup = function(element) {
	var o = this.options;
	
	if ( o.useCollapsedBut ) {
		element.controlgroup({ type: "horizontal" });
		element.addClass("ui-datebox-collapse");
	} else {
		element.controlgroup();
	}
	return element;
};
