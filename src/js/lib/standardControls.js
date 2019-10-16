/**
 * JTSage-DateBox
 * @fileOverview Standard controls (selects and buttons)
 * @author J.T.Sage <jtsage+datebox@gmail.com>
 * @author {@link https://github.com/jtsage/jtsage-datebox/contributors|GitHub Contributors}
 * @license {@link https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt|MIT}
 * @version 5.2.0
 */

/**
 * Create a simple select html element
 *
 * @param {!Array<Array>} data Each inside array is [ value, title, selected(bool) ]
 * @param {string} id HTML ID for the select
 * @param {string} cls Class for the select
 * @returns {String} Completed select element 
 */
JTSageDateBox._stdSel = function( data, id, cls ) {
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
	cancel : function() {
		var w = this,
			o = this.options;

		return $(
			w.style_btn(
				o.theme_cancelBtn,
				w.__( "cancelButton" )
			) )
			.on( o.clickEvent, function ( e ) {
				e.preventDefault();
				w._t({ method : "close", closeCancel : true });
			} );
	},

	/**
	 * Make a clear button
	 * 
	 * @return {Object} JQuery button object, with events attached
	 * @memberOf JTSageDateBox._stdbtn
	 */
	clear : function() {
		var w = this,
			o = this.options;

		return $(
			w.style_btn(
				o.theme_clearBtn,
				w.__( "clearButton" )
			) )
			.on( o.clickEvent, function( e ) {
				e.preventDefault();
				w.d.input.val( "" );
				w._t( { method : "clear" } );
				w._t( { method : "close", closeCancel : true } );
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
	close : function( txt, trigger ) {
		var w = this,
			o = this.options;

		if ( typeof trigger === "undefined" ) { trigger = false; }

		return $(
			w.style_btn(
				o.theme_closeBtn,
				txt
			) )
			.addClass( "" +
				( ( w.dateOK === true ) ? "" : "disabled" )
			)
			.on( o.clickEvent, function( e ) {
				e.preventDefault();

				if ( w.dateOK === true ) {
					if ( trigger === false ) {
						w._t( {
							method : "set",
							value  : w._formatter( w.__fmt(), w.theDate ),
							date   : w.theDate
						} );
					} else {
						w._t( trigger );
					}
					w._t( { method : "close" } );
				}
			});
	},

	/**
	 * Make a today button
	 * 
	 * @return {Object} JQuery button object, with events attached
	 * @memberOf JTSageDateBox._stdbtn
	 */
	today : function() {
		var w = this,
			o = this.options;
		return $(
			w.style_btn(
				o.theme_todayBtn,
				w.__( "todayButtonLabel" )
			) )
			.on( o.clickEvent, function( e ) {
				e.preventDefault();
				w.theDate = w._pa( [ 0, 0, 0 ], new w._date() );
				w._t( { method : "dorefresh" } );
				if ( o.closeTodayButton !== false ) {
					w._t( { method : "doset" } );
					w._t( { method : "close" } );
				}
			});
	},

	/**
	 * Make a tomorrow button
	 * 
	 * @return {Object} JQuery button object, with events attached
	 * @memberOf JTSageDateBox._stdbtn
	 */
	tomorrow : function() {
		var w = this,
			o = this.options;

		return $(
			w.style_btn(
				o.theme_tomorrowBtn,
				w.__( "tomorrowButtonLabel" )
			) )
			.on( o.clickEvent, function( e ) {
				e.preventDefault();
				w.theDate = w._pa( [ 0, 0, 0 ], new w._date() ).adj( 2, 1 );
				w._t( { method : "dorefresh" } );
				if ( o.closeTomorrowButton !== false ) {
					w._t( { method : "doset" } );
					w._t( { method : "close" } );
				}
			});
	},
};

/** 
 * Actually apply the bottom buttons to the control
 * 
 * @param {boolean} useSet Allow the set button to be displayed
 * @return {object} jQuery Object.
 */
JTSageDateBox._doBottomButtons = function ( useSet ) {
	var w   = this,
		o   = this.options,
		ctrlContainer, ctrlWrk;

	if ( ! (
		( o.useSetButton && useSet )  ||
		o.useTodayButton              ||
		o.useTomorrowButton           ||
		o.useClearButton              ||
		o.useCancelButton
	) ) {
		return "";
	}

	ctrlContainer = w.style_btnGrp( o.useCollapsedBut );
	
	if ( o.useSetButton && useSet ) {
		switch (o.mode) {
			case "timebox"         :
			case "timeflipbox"     :
				ctrlWrk = w.__( "setTimeButtonLabel" ); break;
			case "durationbox"     :
			case "duartionflipbox" :
				ctrlWrk = w.__( "setDurationButtonLabel" ); break;
			default  :
				ctrlWrk = w.__( "setDateButtonLabel" ); break;
		}
		w.setBut = w._stdBtn.close.call( w, ctrlWrk );
		w.setBut.appendTo( ctrlContainer );
	}

	if ( o.useTodayButton ) {
		ctrlContainer.append( w._stdBtn.today.call( w ) );
	}
	if ( o.useTomorrowButton ) {
		ctrlContainer.append( w._stdBtn.tomorrow.call( w ) );
	}
	if ( o.useClearButton ) {
		ctrlContainer.append( w._stdBtn.clear.call( w ) );
	}
	if ( o.useCancelButton ) {
		ctrlContainer.append( w._stdBtn.cancel.call( w ) );
	}

	if ( typeof w.style_btnGrpOut === "function" ) {
		// Used if the framework requires an additional wrap to button
		// groups.  Some do, notable jQM.
		ctrlContainer = w.style_btnGrpOut( o.useCollapsedBut, ctrlContainer );
	}
	
	return ctrlContainer;
};
