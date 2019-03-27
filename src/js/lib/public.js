/**
 * JTSage-DateBox
 * @fileOverview Public function methods
 * @author J.T.Sage <jtsage+datebox@gmail.com>
 * @author {@link https://github.com/jtsage/jtsage-datebox/contributors|GitHub Contributors}
 * @license {@link https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt|MIT}
 * @version 5.0.0
 */


/**
 * Get the current date
 * 
 * @return {object} Current Date, JavaScript date object
 */
JTSageDateBox.getTheDate = function() {
	return this.theDate;
};

/**
 * Get the currently selected date
 * 
 * @return {object} Current Date, JavaScript date object
 */
JTSageDateBox.getSelectedDate = function() {
	return this.originalDate;
};

/**
 * Get the current duration
 * 
 * @return {number} Current duration
 */
JTSageDateBox.getLastDur = function() {
	return this.lastDuration;
};

/** 
 * Ask if the currently selected date is visible in the display
 * 
 * @return {boolean} True on date is visible
 */
JTSageDateBox.dateVisible = function() {
	return this.calDateVisible;
};

/**
 * Set the date.
 *
 * When passing strings, date must be formatted exactly how DateBox would do it.
 * 
 * @param {string|object} newDate JavaScript date or string in proper format
 */
JTSageDateBox.setTheDate = function( newDate ) {
	if ( typeof( newDate ) === "object" ) {
		this.theDate = newDate;
	} else {
		this.theDate = this._makeDate( newDate );
	}
	this.refresh();
	this._t( { method : "doset" });
};

/**
 * Parse an arbitrary date with an arbitrary format
 * 
 * @param  {string} format Format to parse
 * @param  {string} strdate String to parse
 * @return {object} JavaScript date
 */
JTSageDateBox.parseDate = function( format, strdate ) {
	// Provide a PUBLIC function to parse a date
	var retty,
		w = this;
		
	w.fmtOver = format;
	retty = w._makeDate( strdate );
	w.fmtOver = false;
	return retty;
};

/** 
 * Parse a string ISO date
 * 
 * @param {string} strdate ISO string to parse (YYYY-MM-DD)
 * @return {object} JavaScript date
 */
JTSageDateBox.parseISO = function( strDate ) {
	return this.parseDate( "%Y-%m-%d", strDate );
};

/**
 * Format a date via {@link JTSageDateBox._makeDate}
 * 
 * @param  {string} format Format string to use
 * @param  {object} date Date to format
 * @param  {boolean} allowArIn Allow indic number translation, default true
 * @return {string} Formatted date
 */
JTSageDateBox.callFormat = function( format, date, allowArIn ) {
	if ( typeof(allowArIn) === "undefined" ) { allowArIn = false; }
	return this._formatter( format, date, allowArIn );
};

/**
 * Refresh the display
 */
JTSageDateBox.refresh = function() {
	var w = this,
		o = this.options;
	
	if ( typeof w._build[ o.mode ] === "undefined" ) {
		w._build[ "default" ].apply( w, [] );
	} else {
		w._build[ o.mode ].apply( w, [] );
	}
	if ( w.__( "useArabicIndic" ) === true ) {
		w._doIndic();
	}
	w.d.mainWrap.append( w.d.intHTML );
	w._t( { method : "postrefresh" } );
};

/**
 * Apply the HTML min/max attributes (minDate / maxDate)
 * 
 * @param  {boolean} refresh Refresh the display when done
 * @param  {boolean} override Allow overriding minDate/maxDate if already set
 */
JTSageDateBox.applyMinMax = function( refresh, override ) {
	var valueFromAttr,
		w             = this,
		o             = this.options,
		ISOPattern    = RegExp(/\d\d\d\d-\d\d-\d\d/);

	if ( typeof refresh === "undefined"  ) { refresh = true; }
	if ( typeof override === "undefined" ) { override = true; }

	if ( override === true || o.minDate === false ) {
		valueFromAttr = w.d.input.attr( "min" );
		if ( ISOPattern.test( valueFromAttr ) ) {
			o.minDate = valueFromAttr;
		}
	}
	if ( override === true || o.maxDate === false ) {
		valueFromAttr = w.d.input.attr( "max" );
		if ( ISOPattern.test( valueFromAttr ) ) {
			o.maxDate = valueFromAttr;
		}
	}

	if ( refresh === true ) {
		w._t( { method : "refresh" } );
	}
};
