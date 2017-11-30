/* JTSage-DateBox 
 *
 * Public Facing Functions
 *
 * Contains functions that are meant to be called
 * by other developers outside of the widget
 */

JTSageDateBox.getTheDate = function() {
	// Provide a PUBLIC function to get the current date.
	if ( this.calBackDate !== false ) { return this.calBackDate; }
	return this.theDate;
};

JTSageDateBox.getLastDur = function() {
	// Provide a PUBLIC function to get the last entered duration
	return this.lastDuration;
};

JTSageDateBox.dateVisible = function() {
	// Provide a PUBLIC function to see if selected calendar date is visible
	return this.calDateVisible;
};

JTSageDateBox.setTheDate = function( newDate ) {
	// Provide a PUBLIC function to set the date
	// ACCEPTS: Date Object or String in proper output format
	if ( typeof( newDate ) === "object" ) {
		this.theDate = newDate;
	} else {
		this.theDate = this._makeDate( newDate );
	}
	this.calBackDate = false;
	this.refresh();
	this._t( { method: "doset" });
};

JTSageDateBox.parseDate = function( format, strdate ) {
	// Provide a PUBLIC function to parse a date
	var retty,
		w = this;
		
	w.fmtOver = format;
	retty = w._makeDate( strdate );
	w.fmtOver = false;
	return retty;
};

JTSageDateBox.callFormat = function( format, date, allowArIn ) {
	// Provide a PUBLIC function to get a formatted date
	if ( typeof(allowArIn) === "undefined" ) { allowArIn = false; }
	return this._formatter( format, date, allowArIn );
};

JTSageDateBox.refresh = function() {
	// Provide a PUBLIC function to Refresh the element
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
		o.minDays = parseInt( daysRaw * -1 , 10 );
	}
	if ( ( override === true || o.maxDays === false ) && 
			( typeof w.d.input.attr( "max" ) !== "undefined" ) ) {

		fromEl = w.d.input.attr( "max" ).split( "-" );
		fromElDate = new w._date(fromEl[0], fromEl[1]-1, fromEl[2], 0, 0, 0, 0 );
		daysRaw = ( fromElDate.getTime() - todayClean.getTime() ) / lod;
		o.maxDays = parseInt( daysRaw, 10 );
	}

	if ( refresh === true ) { 
		w._t( { method: "refresh" } );
	}
};
