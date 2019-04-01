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
		basepop       = {};

	if ( o.useFocus && w.fastReopen === true ) {
		w.d.input.blur();
		return false;
	}

	w.theDate      = w._makeDate( w.d.input.val() );
	w.originalDate = w.theDate.copy();
	
	if ( w.d.input.val() === "" ) { w._startOffset( w.theDate ); }
	w.d.input.blur();

	if ( typeof w._build[ o.mode ] !== "function" ) {
		w._build[ "default" ].call( w );
	} else {
		w._build[ o.mode ].call( w );
	}
	if ( typeof w._drag[ o.mode ] === "function" ) {
		w._drag[ o.mode ].call( w );
	}

	w._t( { method : "refresh" } );

	if ( w.__( "useArabicIndic" ) === true ) { w._doIndic(); }

	// Ignore if already open
	if ( w.d.intHTML.is( ":visible" ) ) { return false; }

	w.d.mainWrap.empty();

	if ( o.useHeader ) {
		w.d.mainWrap
			.append( $( w.style_mainHead(
				w.d.headerText,
				o.theme_headerTheme,
				o.theme_headerBtn,
			) ) )
			.find( ".dbCloser" ).on( o.clickEvent, function( e ) {
				e.preventDefault();
				w._t( { method : "close", closeCancel : true } );
			} );
	}
	
	w.d.mainWrap.append( w.d.intHTML ).css( "zIndex", o.zindex );

	w._t( { method : "postrefresh" } );

	// Perpare open callback, if provided. Additionally, if this
	// returns false then the open/update will stop.
	o.openCallback = w._prepFunc( o.openCallback );

	if ( o.openCallback !== false ) {
		basepop.afteropen = function() {
			w._t( { method : "postrefresh" } );
			if ( o.openCallback.apply( w, [{
				initDate : w.initDate,
				date     : w.theDate,
				duration : w.lastDuration
			}].concat( o.openCallbackArgs ) ) === false ) {

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
	o.beforeOpenCallback = w._prepFunc( o.beforeOpenCallback );

	if ( o.beforeOpenCallback !== false ) {
		if ( o.beforeOpenCallback.apply(
			w,
			[{
				initDate : w.initDate,
				date     : w.theDate,
				duration : w.lastDuration
			}].concat( o.beforeOpenCallbackArgs ) ) === false
		) {
			return false;
		}
	}

	switch ( o.displayMode ) {
		case "inline" :
		case "blind"  :
			if ( w.initDone ) {
				if ( o.displayMode === "blind" ) {
					w.refresh();
					w.d.mainWrap.slideDown();
				}
			} else {
				w.d.mainWrap
					.insertAfter( w.style_attach( true ) )
					.addClass( o.theme_inlineContainer )
					.css( {
						zIndex      : "auto",
						marginRight : ( o.displayInlinePosition === "right" ) ? 0 : "auto",
						marginLeft  : ( o.displayInlinePosition === "left"  ) ? 0 : "auto",
					} );
				if ( o.displayMode === "blind" ) { w.d.mainWrap.hide(); }
				w.initDone = true;
			}
			w._t( { method : "postrefresh" } );
			break;
		// case "modal"    :
		// case "dropdown" :
		default         :
			w.d.mainWrap
				.show()
				.css( "zIndex", ( o.zindex ) )
				.appendTo( w.style_attach( false ) )
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
				.appendTo(
					( o.displayMode === "modal" ) ?
						w.style_attach( false ) :
						"body"
				)
				.on( o.clickEvent, function (e) {
					e.preventDefault();
					w._t( { method : "close", closeCancel : true } );
				});

			w.d.mainWrap.css(
				( o.displayMode === "modal" ) ?
					w.getModalPosition.call( w ) :
					w.getDropPosition.call( this, o.displayDropdownPosition )
			);
			
			break;
	}

	$( window ).on( "resize" + w.eventNamespace, ( function() {
		var dMode = this.options.displayMode;

		// For dropdown and modal modes , we need to handle resizing.
		if ( dMode === "modal" || dMode === "blind" ) {
			this.d.mainWarp.css(
				( dMode === "modal" ) ?
					this.getModalPosition.call( this ) :
					this.getDropPosition.call( this, this.options.displayDropdownPosition )
			);
		}
	} ).bind(w) );

	window.setTimeout(function () {
		w.d.mainWrap.addClass( "db-show" );
	}, 0);
	window.setTimeout(function () { // This is hacky as hell.
		w.d.mainWrap.trigger( "oTransitionEnd" );
	}, 200);
};

