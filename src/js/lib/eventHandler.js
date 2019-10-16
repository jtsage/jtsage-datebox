/**
 * JTSage-DateBox
 * @fileOverview Contains event handler logic, stubs of attach and build methods
 * @author J.T.Sage <jtsage+datebox@gmail.com>
 * @author {@link https://github.com/jtsage/jtsage-datebox/contributors|GitHub Contributors}
 * @license {@link https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt|MIT}
 * @version 5.2.0
 */

/**
 * Handle events of the "datebox" type.
 *
 * Valid events:
 *  - close : Close the control
 *  - open : Open the control
 *  - set : Change the date (p.value == date Object or date String)
 *  - doset : Populate the date
 *  - dooffset : Offset the date (p.value == amount, p.type == field)
 *  - dorefresh : Refresh the display
 *  - doclear : Clear the input
 *  - clear : Re-read the input?
 *  
 * @param  {object} e jQuery event
 * @param  {object} p DateBox event
 * @param {boolean} p.closeCancel No idea what this does.
 * @param {string} p.method Event method to run
 * @param {*} p.value Can be a date object, date string, or amount to offset date
 * @param {string} p.type Field to offset
 */
JTSageDateBox._event = function(e, p) {
	var tmp, i,
		w = $( this ).data( "jtsage-datebox" ),
		o = $( this ).data( "jtsage-datebox" ).options;


	if ( ! e.isPropagationStopped() ) {
		switch (p.method) {
			case "close" :
				if ( typeof p.closeCancel === "undefined" ) {
					p.closeCancel = false;
				}
				w.cancelClose = p.closeCancel;
				w.close();
				break;
			case "open"  :
				w.open(); break;
			case "set"   :
				if ( typeof p.value === "object" ) {
					w.theDate = p.value;
					w._t( { method : "doset" } );
				} else {
					if ( o.displayMode === "inline" || o.displayMode === "blind" ) {
						w.originalDate = w.theDate;
					}
					$( this ).val( p.value );
					if ( o.linkedField !== false ) {
						if ( typeof o.linkedField === "string" ) {
							$( o.linkedField )
								.val( w.callFormat( o.linkedFieldFormat, w.theDate, false ) );
						} else {
							for ( i = 0; i < o.linkedField.length; i++ ) {
								$( o.linkedField[i].id ).val(
									w.callFormat( o.linkedField[i].format, w.theDate, false )
								);
							}
						}
					}
					w.skipChange = true;
					$( this ).trigger( "change" );
				}
				break;
			case "doset" :
				tmp = "_" + w.options.mode + "DoSet";
				if ( typeof w[ tmp ] === "function" ) {
					w[ tmp ].call( w );
				} else {
					w._t( {
						method : "set",
						value  : w._formatter( w.__fmt(), w.theDate ),
						date   : w.theDate
					} );
				}
				break;
			case "dooffset" :
				if ( p.type ) {
					w._offset( p.type, p.amount, true );
				}
				break;
			case "dorefresh" :
				w.refresh();
				break;
			case "doclear" :
				$( this ).val( "" ).trigger( "change" );
				break;
			case "clear" :
				$( this ).trigger( "change" );
				break;
		}
	}
};

/**
 * Build the controls per mode
 * 
 * @type {Object}
 * @namespace JTSageDateBox._build
 * @memberOf JTSageDateBox
 */
JTSageDateBox._build = {};

/**
 * Default build command, shows "no mode selected" error message
 *
 * @memberOf JTSageDateBox._build
 * @this JTSageDateBox
 */
JTSageDateBox._build.default = function () {
	this.d.headerText = "Error";
	if ( this.d.intHTML !== false ) {
		this.d.intHTML.remove().empty();
	}
	this.d.intHTML = $(
		"<div style='width:100%'><h2 style='text-align:center;color:red;'>Unknown Mode</h2></div>"
	);
};

/**
 * Attach drag events, if needed
 * 
 * @type {Object}
 * @namespace JTSageDateBox._drag
 */
JTSageDateBox._drag = {};

/**
 * Default drag events - do nothing
 *
 * @memberOf JTSageDateBox._drag
 * @this JTSageDateBox
 */
JTSageDateBox._drag.default = function () { return false; };
