/* JTSage-DateBox 
 * v5.0.0
 *
 * Event Handler
 *
 * Contains the master event handler for the widget,
 * along with the stubs of attach / build events.
 */

JTSageDateBox._event = function(e, p) {
	var tmp,
		w = $( this ).data( "jtsage-datebox" ),
		o = $( this ).data( "jtsage-datebox" ).options;


	if ( ! e.isPropagationStopped() ) {
		switch (p.method) {
			case "close":
				if ( typeof p.closeCancel === "undefined" ) { 
					p.closeCancel = false;
				}
				w.cancelClose = p.closeCancel;
				w.close();
				break;
			case "open":
				w.open(); break;
			case "set":
				if ( typeof p.value === "object" ) {
					w.theDate = p.value;
					w._t( { method: "doset" } );
				} else {
					$( this ).val( p.value );
					if ( o.linkedField !== false ) {
						$( o.linkedField )
							.val( w.callFormat( o.linkedFieldFormat, w.theDate, false ) );
					}
					$( this ).trigger( "change" );
				}
				break;
			case "doset":
				tmp = "_" + w.options.mode + "DoSet";
				if ( $.isFunction( w[ tmp ] ) ) {
					w[ tmp ].apply( w, [] );
				} else {
					w._t( { 
						method: "set",
						value: w._formatter( w.__fmt(), w.theDate ),
						date: w.theDate
					} );
				}
				break;
			case "dooffset":
				if ( p.type ) { 
					w._offset( p.type, p.amount, true );
				} 
				break;
			case "dorefresh":
				w.refresh();
				break;
			case "doclear":
				$( this ).val( "" ).trigger( "change" );
				break;
			case "clear":
				$( this ).trigger( "change" );
				break;
		}
	}
};

JTSageDateBox._build = {};

JTSageDateBox._build.default = function () {
	this.d.headerText = "Error";
	if ( this.d.intHTML !== false ) {
		this.d.intHTML.remove().empty();
	}
	this.d.intHTML = $("<div class='ui-body-b'><h2 style='text-align:center'" + 
		" class='bg-danger'>Unknown Mode</h2></div>" );
};

JTSageDateBox._drag = {};

JTSageDateBox._drag.default = function () { return false; };
