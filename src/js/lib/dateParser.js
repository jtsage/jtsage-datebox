/**
 * JTSage-DateBox
 * @fileOverview Parse dates
 * @author J.T.Sage <jtsage+datebox@gmail.com>
 * @author {@link https://github.com/jtsage/jtsage-datebox/contributors|GitHub Contributors}
 * @license {@link https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt|MIT}
 * @version 5.0.0
 *
 */



// Custom Parser Definitions, single String argument provided.
/**
 * Custom date parsers
 *
 * These recive the input value, and should return a date, or whatever the mode is 
 * expecting to be in the usual date object.  It is possible for it to be another type,
 * although most of the build in functions would not be useful on it any longer.
 *
 * Custom parsers need to be named for the mode they run on.
 * 
 * @type {Object}
 * @namespace  JTSageDateBox._parser
 */
JTSageDateBox._parser = {};

/**
 * Sample custom parser prototype
 * 
 * @param  {string} str Input value
 * @return {*} Date object ideally, but whatever the mode file is expecting will work
 * @memberOf JTSageDateBox._parser
 */
JTSageDateBox._parser.default = function ( str ) { return str; };

/**
 * Attempt to parse a date string.  Format is pulled from {@link JTSageDateBox.__fmt}
 * 
 * @param  {string} Date string to parse
 * @param  {boolean} When true, return an array instead with the status of the parse as arr[1]
 * @return {object} JavaScript Date Object
 */
JTSageDateBox._makeDate = function ( str, extd ) {
	// Date Parser
	var i,  exp_temp, exp_format, grbg,
		w = this,
		o = this.options,
		defVal = this.options.defaultValue,
		adv = w.__fmt(),
		exp_input = null,
		exp_names = [],
		faildate = false,
		date = new w._date(),
		d = {
			year   : -1,
			mont   : -1,
			date   : -1,
			hour   : -1,
			mins   : -1,
			secs   : -1,
			week   : false,
			wtyp   : 4,
			wday   : false,
			yday   : false,
			meri   : 0
		};

	// Set a default, no extended data
	if ( typeof extd === "undefined" ) { extd = false; }
	
	// Convert indic numers t those we can deal with, also handle empty string.
	str = ( typeof str === "undefined" ) ? "" : (
		( w.__( "useArabicIndic" ) === true ) ?
			w._dRep( str, -1 ) :
			str
	).trim();

	// Do nothing if no mode loaded
	if ( typeof o.mode === "undefined" ) { return date; }

	// Run custom parser instead if it exists
	if ( typeof w._parser[ o.mode ] !== "undefined" ) {
		return w._parser[ o.mode ].call( w,  str );
	}

	// Deal with duration mode.
	if ( o.mode === "durationbox" || o.mode === "durationflipbox" ) {
		adv = adv.replace(/%D([a-z])/gi, function( match, oper ) {
			switch ( oper ) {
				case "d":
				case "l":
				case "M":
				case "S": return "(" + match + "|[0-9]+)";
				default: return ".+?";
			}
		});

		adv = new RegExp( "^" + adv + "$" );
		exp_input = adv.exec(str);
		exp_format = adv.exec(w.__fmt());

		if ( exp_input === null || exp_input.length !== exp_format.length ) {
			if ( typeof defVal === "number" && defVal > 0 ) {
				// defaultValue is an integer
				return new w._date(
					( w.initDate.getEpoch() + parseInt( defVal,10 ) ) * 1000
				);
			}
			// No default, use ZERO.
			return new w._date( w.initDate.getTime() );
		}

		exp_temp = w.initDate.getEpoch();
		for ( i=1; i<exp_input.length; i++ ) {
			grbg = parseInt( exp_input[i], 10);

			if ( exp_format[i].match( /^%Dd$/i ) ) {
				exp_temp = exp_temp + ( grbg * 86400 );
			}
			if ( exp_format[i].match( /^%Dl$/i ) ) {
				exp_temp = exp_temp + ( grbg * 3600 );
			}
			if ( exp_format[i].match( /^%DM$/i ) ) {
				exp_temp = exp_temp + ( grbg * 60 );
			}
			if ( exp_format[i].match( /^%DS$/i ) ) {
				exp_temp = exp_temp + ( grbg );
			}
		}
		return new w._date( exp_temp * 1000 );
	}

	// JSON style dates are simple.  Shortcut them
	if ( adv === "%J" ) {
		date = new w._date(str);
		if ( isNaN(date.getDate()) ) { date = new w._date(); }
		return date;
	}

	// Try to read it back in.  We attempt to use the most granular option where possible
	// as text options particularly can be unreliable.  Some bits, like day name, we can 
	// hopefully just ignore.
	adv = adv.replace( /%(0|-)*([a-z])/gi, function( match, pad, oper ) {
		exp_names.push( oper );
		switch ( oper ) {
			case "p" :
			case "P" :
			case "b" :
			case "B" : return "(" + match + "|.+?)";
			case "H" :
			case "k" :
			case "I" :
			case "l" :
			case "m" :
			case "M" :
			case "S" :
			case "V" :
			case "U" :
			case "u" :
			case "W" :
			case "d" :
				return "(" + match + "|[0-9]{" +
					(( pad === "-" ) ? "1," : "" ) + "2})";
			case "j" : return "(" + match + "|[0-9]{3})";
			case "s" : return "(" + match + "|[0-9]+)";
			case "g" :
			case "y" : return "(" + match + "|[0-9]{2})";
			case "E" :
			case "G" :
			case "Y" : return "(" + match + "|[0-9]{1,4})";
			default  : exp_names.pop(); return ".+?";
		}
	});

	adv = new RegExp( "^" + adv + "$" );
	exp_input = adv.exec(str);
	exp_format = adv.exec(w.__fmt());

	if ( exp_input === null || exp_input.length !== exp_format.length ) {
		if ( str !== "" ) { faildate = true; }
		if ( defVal !== false && defVal !== "" ) {
			switch ( typeof defVal ) {
				case "object":
					if ( typeof defVal.getDay === "function" ) {
						// Default date import.  Need to class it up here for #456
						date = defVal;
					} else {
						if ( defVal.length === 3 ) {
							date =  w._pa(
								defVal,
								( o.mode.substr(0,4) === "time" ? date : false )
							);
						}
					}
					break;
				case "number":
					date =  new w._date( defVal * 1000 ); break;
				case "string":
					if ( defVal.substr(0,1) === "+" ) {
						date = new w._date().adj(5, parseInt(defVal.substr(1),10) );
					} else if ( defVal.substr(0,1) === "-" ) {
						date = new w._date().adj(5, -1 * parseInt(defVal.substr(1),10) );
					} else {
						if ( o.mode.substr(0,4) === "time" ) {
							exp_temp = Object.assign([0,0,0], defVal.split(":",3));
							date = w._pa( exp_temp, date );
						} else {
							exp_temp = Object.assign([0,0,0], defVal.split("-",3));
							exp_temp[1]--;
							date = w._pa( exp_temp, false );
						}
					} break;
			}
		}
		if ( isNaN(date.getDate()) ) { date = new w._date(); }
	} else {
		for ( i=1; i<exp_input.length; i++ ) {
			grbg = parseInt( exp_input[i], 10);
			switch ( exp_names[i-1] ) {
				case "s" : return new w._date( parseInt( exp_input[i], 10 ) * 1000 );
				case "Y" :
				case "G" : d.year = grbg; break;
				case "E" : d.year = grbg - 543; break;
				case "y" :
				case "g" :
					if ( o.afterToday || grbg < o.twoDigitYearCutoff ) {
						d.year = 2000 + grbg;
					} else {
						d.year = 1900 + grbg;
					} break;
				case "m" : d.mont = grbg - 1; break;
				case "d" : d.date = grbg; break;
				case "H" :
				case "k" :
				case "I" :
				case "l" : d.hour = grbg; break;
				case "M" : d.mins = grbg; break;
				case "S" : d.secs = grbg; break;
				case "u" : d.wday = grbg - 1; break;
				case "w" : d.wday = grbg; break;
				case "j" : d.yday = grbg; break;
				case "V" : d.week = grbg; d.wtyp = 4; break;
				case "U" : d.week = grbg; d.wtyp = 0; break;
				case "W" : d.week = grbg; d.wtyp = 1; break;
				case "p" :
				case "P" :
					grbg = new RegExp("^" + exp_input[i] + "$", "i");
					d.meri = ( grbg.test( w.__( "meridiem" )[0] ) ? -1 : 1 );
					break;
				case "b" :
					exp_temp = w.__( "monthsOfYearShort" ).indexOf( exp_input[i] );
					if ( exp_temp > -1 ) { d.mont = exp_temp; }
					break;
				case "B" :
					exp_temp = w.__( "monthsOfYear" ).indexOf( exp_input[i] );
					if ( exp_temp > -1 ) { d.mont = exp_temp; }
					break;
			}
		}
		if ( d.meri !== 0 ) {
			if ( d.meri === -1 && d.hour === 12 ) { d.hour = 0; }
			if ( d.meri === 1 && d.hour !== 12 ) { d.hour = d.hour + 12; }
		}

		date = new w._date(
			w._n( d.year, 0 ),
			w._n( d.mont, 0 ),
			w._n( d.date, 1 ),
			w._n( d.hour, 0 ),
			w._n( d.mins, 0 ),
			w._n( d.secs, 0 ),
			0
		);

		if ( d.year < 100 && d.year !== -1 ) { date.setFullYear(d.year); }

		if ( ( d.mont > -1 && d.date > -1 ) ||
				( d.hour > -1 && d.mins > -1 && d.secs > -1 ) ) {
			if ( extd === true ) { return [date, faildate]; } else { return date; }
		}

		if ( d.week !== false ) {
			date.setDWeek( d.wtyp, d.week );
			if ( d.date > -1 ) { date.setDate( d.date ); }
		}
		if ( d.yday !== false ) {
			date.setD( 1, 0 ).setD( 2, 1 ).adj( 2, ( d.yday - 1 ) );
		}
		if ( d.wday !== false ) {
			date.adj( 2 , ( d.wday - date.getDay() ) );
		}
	}
	if ( extd === true ) {
		return [date, faildate];
	} else {
		return date;
	}
};
