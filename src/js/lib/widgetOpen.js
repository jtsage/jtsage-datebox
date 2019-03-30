/**
 * JTSage-DateBox
 * @fileOverview Responsible for creation / open / close / destroy of widget
 * @author J.T.Sage <jtsage+datebox@gmail.com>
 * @author {@link https://github.com/jtsage/jtsage-datebox/contributors|GitHub Contributors}
 * @license {@link https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt|MIT}
 * @version 5.0.0
 */

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
		w._build[ "default" ].call( w );
	} else {
		w._build[ o.mode ].call( w );
	}
	if ( typeof w._drag[ o.mode ] !== "undefined" ) {
		w._drag[ o.mode ].call( w );
	}

	w._t( { method : "refresh" } );

	if ( w.__( "useArabicIndic" ) === true ) { w._doIndic(); }

	// Ignore if already open
	if ( w.d.intHTML.is( ":visible" ) ) { return false; }

	w.d.mainWrap.empty();

	if ( o.useHeader ) {
		w.d.mainWrap
			.append( $( _sf.widgetHeader.apply( w, [
				w.d.headerText,
				o.theme_headerTheme,
				o.theme_headerBtnCls,
				o.theme_headerBtnIcn
			] ) ) )
			.find( ".dbCloser" ).on( o.clickEvent, function( e ) {
				e.preventDefault();
				w._t( { method : "close", closeCancel : true } );
			} );
	}
	
	w.d.mainWrap.append( w.d.intHTML ).css( "zIndex", o.zindex );

	w._t( { method : "postrefresh" } );

	// Perpare open callback, if provided. Additionally, if this
	// returns false then the open/update will stop.
	if ( o.openCallback !== false ) {
		if ( ! $.isFunction( o.openCallback ) ) {
			if ( typeof window[ o.openCallback ] === "function" ) {
				o.openCallback = window[ o.openCallback ];
			}
		}
		basepop.afteropen = function() {
			w._t( { method : "postrefresh" } );
			if ( o.openCallback.apply( w, $.merge([{
				custom   : w.customCurrent,
				initDate : w.initDate,
				date     : w.theDate,
				duration : w.lastDuration
			}], o.openCallbackArgs ) ) === false ) {

				w._t( {method : "close"} );
			}
		};
	} else {
		basepop.afteropen = function() {
			w._t( { method : "postrefresh" } );
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
		if ( o.beforeOpenCallback.apply(
			w,
			$.merge([{
				custom   : w.customCurrent,
				initDate : w.initDate,
				date     : w.theDate,
				duration : w.lastDuration
			}],
			o.beforeOpenCallbackArgs ) ) === false
		) {
			return false;
		}
	}

	switch ( o.displayMode ) {
		case "inline":
			if ( w.initDone ) { break; }
			w.d.mainWrap.insertAfter( _sf.findAttachPoint.call( w, true ) );
			w.d.mainWrap.addClass( o.theme_inlineContainer );
			w.d.mainWrap.css( { zIndex : "auto" } );
			switch ( o.displayInlinePosition ) {
				case "right":
					w.d.mainWrap.css( { marginRight : 0, marginLeft : "auto" } );
					break;
				case "left":
					w.d.mainWrap.css( { marginLeft : 0, marginRight : "auto" } );
					break;
				//case "center":
				//case "middle":
				default:
					w.d.mainWrap.css( { marginLeft : "auto", marginRight : "auto" } );
					break;
			}
			w._t( { method : "postrefresh" } );
			w.initDone = true;
			break;
		case "blind":
			if ( w.initDone ) {
				w.refresh();
				w.d.mainWrap.slideDown();
			} else {
				w.d.mainWrap.insertAfter( _sf.findAttachPoint.call( w, true ) );
				w.d.mainWrap.addClass( o.theme_inlineContainer );
				w.d.mainWrap.css( { zIndex : "auto", display : "none" } );
				switch ( o.displayInlinePosition ) {
					case "right":
						w.d.mainWrap.css( { marginRight : 0, marginLeft : "auto" } );
						break;
					case "left":
						w.d.mainWrap.css( { marginLeft : 0, marginRight : "auto" } );
						break;
					//case "center":
					//case "middle":
					default:
						w.d.mainWrap.css( { marginLeft : "auto", marginRight : "auto" } );
						break;
				}
				w.initDone = true;
			}
			w._t( { method : "postrefresh" } );
			break;
		case "modal":
			w.d.mainWrap
				.show()
				.css( "zIndex", ( o.zindex ) )
				.appendTo( _sf.findAttachPoint.call( w, false ) )
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
				.appendTo( _sf.findAttachPoint.call( w, false ) )
				.on( o.clickEvent, function (e) {
					e.preventDefault();
					w._t( { method : "close", closeCancel : true } );
				});

			w.d.mainWrap.css(
				w.getModalPosition.call( w )
			);
			
			break;
		// case "dropdown":
		default:
			w.d.mainWrap
				.show()
				.addClass( o.theme_dropdownContainer )
				.appendTo( _sf.findAttachPoint.call( w, false ) )
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
					w._t( { method : "close", closeCancel : true } );
				});
			
			w.d.mainWrap.css(
				w.getDropPosition.call( this, o.displayDropdownPosition )
			);

			break;
	}

	$( window ).on( "resize" + w.eventNamespace, $.proxy( function() {
		// For dropdown and modal modes , we need to handle resizing.
		switch ( this.options.displayMode ) {
			case "inline":
			case "blind":
				// Do Nothing
				break;
			case "modal" :
				this.d.mainWrap.css(
					this.getModalPosition.call( this )
				);
				break;
			//case "dropdown" : // Note: dropdown is a true default, hence the drop-through
			default :
				this.d.mainWrap.css(
					this.getDropPosition.call( this, this.options.displayDropdownPosition )
				);
				break;
		}
	}, w ) );

	window.setTimeout(function () {
		w.d.mainWrap.addClass( "db-show" );
	}, 0);
	window.setTimeout(function () { // This is hacky as hell.
		w.d.mainWrap.trigger( "oTransitionEnd" );
	}, 200);
};

