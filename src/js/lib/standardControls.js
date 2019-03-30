/**
 * JTSage-DateBox
 * @fileOverview Standard controls (selects and buttons)
 * @author J.T.Sage <jtsage+datebox@gmail.com>
 * @author {@link https://github.com/jtsage/jtsage-datebox/contributors|GitHub Contributors}
 * @license {@link https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt|MIT}
 * @version 5.0.0
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
			w.styleFunctions.button.apply( w, [
				o.theme_cancelBtnCls,
				o.theme_cancelBtnIcn,
				w.__( "cancelButton" )
			] ) )
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
			w.styleFunctions.button.apply( w, [
				o.theme_clearBtnCls,
				o.theme_clearBtnIcn,
				w.__( "clearButton" )
			] ) )
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
			w.styleFunctions.button.apply( w, [
				o.theme_closeBtnCls,
				o.theme_closeBtnIcn,
				txt
			] ) )
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
			w.styleFunctions.button.apply( w, [
				o.theme_todayBtnCls,
				o.theme_todayBtnIcn,
				w.__( "todayButtonLabel" )
			] ) )
			.on( o.clickEvent, function( e ) {
				e.preventDefault();
				w.theDate = w._pa( [ 0, 0, 0 ], new w._date() );
				w._t( { method : "doset" } );
				if ( o.closeTodayButton === true ) { w._t( { method : "close" } ); }
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
			w.styleFunctions.button.apply( w, [
				o.theme_tomorrowBtnCls,
				o.theme_tomorrowBtnIcn,
				w.__( "tomorrowButtonLabel" )
			] ) )
			.on( o.clickEvent, function( e ) {
				e.preventDefault();
				w.theDate = w._pa( [ 0, 0, 0 ], new w._date() ).adj( 2, 1 );
				w._t( { method : "doset" } );
				if ( o.closeTomorrowButton === true ) { w._t( { method : "close" } ); }
			});
	},
};
