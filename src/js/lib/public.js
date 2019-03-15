 /**
     * JTSage-DateBox
     * @fileOverview Public function methods
     * @author J.T.Sage <jtsage+datebox@gmail.com>
     * @author {@link https://github.com/jtsage/jtsage-datebox/contributors|GitHub Contributors}
     * @license {@link https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt|MIT}
     * @version 5.0.0
     *
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
	this._t( { method: "doset" });
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
	w._t( {method: "postrefresh"});
};

/**
 * Apply the HTML min/max attributes
 * 
 * @param  {boolean} refresh Refresh the display when done
 * @param  {boolean} override Allow overriding minDays/maxDays if already set
 */
JTSageDateBox.applyMinMax = function( refresh, override ) {
	// PUBLIC function to apply min/max attributes
	var todayClean, fromEl, fromElDate, daysRaw,
		w = this,
		o = this.options,
		today = new this._date(),
		lod = 24 * 60 * 60 * 1000;

	todayClean = w._pa([0,0,0], today);
	
	if ( typeof refresh === "undefined" ) { refresh = true; }
	if ( typeof override === "undefined" ) { override = true; }

	if ( ( override === true || o.minDays === false ) && 
			( typeof w.d.input.attr( "min" ) !== "undefined" ) ) {

		fromEl =  w.d.input.attr( "min" ).split( "-" );
		fromElDate = new w._date(fromEl[0], fromEl[1]-1, fromEl[2], 0, 0, 0, 0 );
		daysRaw = ( fromElDate.getTime() - todayClean.getTime() ) / lod;
		o.minDays = Math.round( daysRaw * -1 , 10 );
	}
	if ( ( override === true || o.maxDays === false ) && 
			( typeof w.d.input.attr( "max" ) !== "undefined" ) ) {

		fromEl = w.d.input.attr( "max" ).split( "-" );
		fromElDate = new w._date(fromEl[0], fromEl[1]-1, fromEl[2], 0, 0, 0, 0 );
		daysRaw = ( fromElDate.getTime() - todayClean.getTime() ) / lod;
		o.maxDays = Math.round( daysRaw, 10 );
	}

	if ( refresh === true ) { 
		w._t( { method: "refresh" } );
	}
};
