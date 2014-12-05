/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notification.
 * https://github.com/jtsage/jquery-mobile-datebox
 */

(function($) {
	$.extend( $.mobile.datebox.prototype.options, {
		themeButton: "a",
		themeInput: "a",
		useSetButton: true,
		customData: [ ],
		customDefault: [0,0,0],
		customFormat: false,
		customeHead: false,
		customboxlang: {
			// This structure interfaces with __() -> if it exists, strings are looked up here 
			// after i8n fails, and before going to 'default' - the name syntax is <mode>lang
			"customSet": "Looks Good",
		}
		
	});
	$.extend( $.mobile.datebox.prototype, {
		_cbox_offset: function ( fld, amount ) {
			// This is *not* an automatic override, used below specificly.
			var w = this, tmp,
				o = this.options;
				
			tmp = ( w.customCurrent[ fld ] + amount ) % o.customData[ fld ].data.length;
			if ( tmp < 0 ) { tmp = o.customData[ fld ].data.length + tmp; }
			
			w.customCurrent[fld] = tmp;
			if ( o.useImmediate ) { 
				w._t( {
					method: "set",
					value: w._formatter( o.customFormat, w.customCurrent ),
					custom: w.customCurrent
				} );
			}
			w.refresh();
		}
	});
	$.extend( $.mobile.datebox.prototype._parser, {
		// If this stucture exists, it is called instead of the usual date input parser.
		// The name of the structure is the same as the mode name - it recieves a string
		// as the input, which is the current value of the input element, pre-sanitized
		"custombox" : function ( str ) { 
			return ( str.length < 1 || ! str.match( /,/ ) ) ? 
				this.options.customDefault :
				str.split( "," );
		}
	});
	$.extend( $.mobile.datebox.prototype._customformat, {
		// If this stucture exists, the formatter will call it when it encounters a special string
		// %X<whatever> - it recieves the single letter operater, and the current "date" value
		"custombox" : function ( oper, val, o ) { 
			var per = parseInt(oper), tmp;

			if ( typeof( per ) === "number" && !isNaN( per ) ) {
				return val[ oper - 1 ];
			} else {
				tmp = $.inArray( oper, [ "a", "b", "c", "d", "e", "f"] );
				return o.customData[ tmp ].data[ val[ tmp ] ];
			}
		}
	});
	$.extend( $.mobile.datebox.prototype._build, {
		"custombox": function () {
			var w = this,
				o = this.options, i, y, tmp,
				cnt = -2,
				uid = "ui-datebox-",
				divBase = $( "<div>" ),
				divPlus = $( "<fieldset>" ),
				divIn = divBase.clone(),
				divMinus = divPlus.clone(),
				customCurrent = this._makeDate( this.d.input.val() ),
				inDiv = $( "<div>" )
					.addClass( "ui-input-text ui-corner-all ui-shadow-inset " +
						"ui-body-" + o.themeInput )
					.css( { 
						padding: ".4em",
						margin: ".5em 0",
						textAlign: "center"
					} ),
				butBase = $( "<div>" ),
				butClass = "ui-btn-inline ui-link ui-btn ui-btn-" + o.themeButton +
					" ui-btn-icon-notext ui-shadow ui-corner-all";
			
			if ( typeof w.customCurrent === "undefined" ) { w.customCurrent = customCurrent; }
			
			if ( o.customFormat === false ) {
				tmp = [];
				for ( i = 0; i < o.customData.length; i++ ) {
					tmp.push( "%X" + ( i + 1 ) );
				} 
				o.customFormat = tmp.join( "," );
			}
			
			if ( typeof w.d.intHTML !== "boolean" ) {
				w.d.intHTML.empty().remove();
			}
			
			w.d.headerText = ((o.customHead !== false ) ? 
				o.customHead :
				( ( w._grabLabel() !== false ) ? w._grabLabel() : "" ) );
				
			w.d.intHTML = $( "<span>" );
			w.dateOK = true;
			
			for( i = 0; i < o.customData.length; i++ ) {
				tmp = w._gridblk.b[ i ];
				
				$( "<div>" )
					.append( inDiv
						.clone()
						.html( o.customData[ i ].data[ w.customCurrent[ i ] ] )
					)
					.addClass( "ui-block-" + tmp )
					.appendTo( divIn );
				
				w._makeEl( butBase, { "attr": { field: i, amount: 1 } } )
					.addClass( uid + "cbut ui-block-" + tmp + " ui-icon-plus " + butClass )
					.appendTo( divPlus );
					
				w._makeEl( butBase, { "attr": { field: i, amount: -1 } } )
					.addClass( uid + "cbut ui-block-" + tmp + " ui-icon-minus " + butClass )
					.appendTo(divMinus);
				cnt++;
			}
			
			divPlus.addClass( "ui-grid-" + w._gridblk.b[ cnt ] ).appendTo( w.d.intHTML );
			divIn.addClass( "ui-datebox-dboxin ui-grid-" + w._gridblk.b[ cnt ] )
				.appendTo( w.d.intHTML );
			divMinus.addClass("ui-grid-" + w._gridblk.b[ cnt ] ).appendTo(w.d.intHTML);
			
			if ( o.useSetButton || o.useClearButton ) {
				y = $( "<div>", { "class": uid + "controls" } );
				
				if ( o.useSetButton ) {
					y.append(
						$( "<a href='#' role='button'>" + w.__( "customSet" ) + "</a>" )
							.addClass( "ui-btn ui-btn-" + o.themeSetButton + 
								" ui-icon-check ui-btn-icon-left ui-shadow ui-corner-all"
							)
							.on(o.clickEventAlt, function(e) {
								e.preventDefault();
								w._t( { 
									method: "set", 
									value: w._formatter( o.customFormat, w.customCurrent ),
									date: w.customCurrent
								} );
								w._t( { method: "close" } );
							})
					);
				}
				if ( o.useClearButton ) {
					y.append( w._stdBtn.clear.apply( w ) );
				}
				if ( o.useCollapsedBut ) {
					y.controlgroup( { type: "horizontal" } );
					y.addClass( "ui-datebox-collapse" );
				}
				y.appendTo( w.d.intHTML );
			}
			
			divIn.on( "change", "input", function() { w.refresh(); } );
			
			w.d.intHTML.on( o.clickEvent, "." + uid + "cbut", function(e) {
				e.preventDefault();
				w._cbox_offset( $(this).data( "field" ), $(this).data( "amount" ) );
			});			
		}
	});
})( jQuery );