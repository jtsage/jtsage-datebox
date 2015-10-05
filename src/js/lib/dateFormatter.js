/* JTSage-DateBox 
 *
 * Date Formatter
 *
 * Contains the RegExp to write the date to 
 * the input element.
 */

/* Custom ordinals possible.
 * 
 * function name should be the same as the i18n language
 * code, falls back to "default" when not found
 */

JTSageDateBox._ord = {};
JTSageDateBox._ord.default = function (num) {
	// Return an ordinal suffix (1st, 2nd, 3rd, etc)
	var ending = num % 10;
	if ( ( num > 9 && num < 21 ) || ending > 3 ) { return "th"; }
	return [ "th", "st", "nd", "rd" ][ ending ];
};

/* Custom formatter design
 *
 * function name should match mode display name
 *
 * Arguments are OPER, DATE, and OPTIONS
 *
 * OPER: /%(D|X|0|-)*([1-9a-zA-Z])/g, function(match, pad, oper)
 * DATE: second argument provided to the formatter
 * OPTIONS: full, current options list for widget
 */
JTSageDateBox._customformat = {};
JTSageDateBox._customformat.default = function() { return false; };

JTSageDateBox._formatter = function(format, date, allowArIn) {
	var w = this,
		o = this.options, tmp,
		dur = 0;

		if ( typeof(allowArIn) === "undefined" ) { allowArIn = true; }

		if ( o.mode.substr( 0, 4 ) === "dura" ) {
			dur = w._dur(this.theDate.getTime() - this.initDate.getTime());

			if ( ! format.match( /%Dd/ ) ) { dur[1] += (dur[0]*24);}
			if ( ! format.match( /%Dl/ ) ) { dur[2] += (dur[1]*60);}
			if ( ! format.match( /%DM/ ) ) { dur[3] += (dur[2]*60);}
		}

	format = format.replace(/%(D|X|0|-)*([1-9a-zA-Z])/g, function(match, pad, oper) {
		if ( pad === "X" ) {
			if ( typeof w._customformat[o.mode] !== "undefined" ) { 
				return w._customformat[o.mode](oper, date, o);
			}
			return match;
		}
		if ( pad === "D" ) {
			switch ( oper ) {
				case "d": return dur[0];
				case "l": return w._zPad(dur[1]);
				case "M": return w._zPad(dur[2]);
				case "S": return w._zPad(dur[3]);
				case "A": return w.__( "durationDays" )[ (( dur[0] === 1 ) ? 0 : 1 ) ];
				default: return match;
			}
		}
		switch ( oper ) {
			case "a": // Short Day
				return w.__( "daysOfWeekShort" )[ date.getDay() ];
			case "A": // Full Day of week
				return w.__( "daysOfWeek" )[ date.getDay() ];
			case "b": // Short month
				return w.__( "monthsOfYearShort" )[ date.getMonth() ];
			case "B": // Full month
				return w.__( "monthsOfYear" )[ date.getMonth() ];
			case "C": // Century
				return parseInt(date.getFullYear() / 100);
			case "d": // Day of month
				return w._zPad( date.getDate(), pad );
			case "H": // Hour (01..23)
			case "k":
				return w._zPad( date.getHours(), pad );
			case "I": // Hour (01..12)
			case "l":
				return w._zPad( date.get12hr(), pad );
			case "m": // Month
				return w._zPad( date.getMonth()+1, pad );
			case "M": // Minutes
				return w._zPad( date.getMinutes(), pad );
			case "p": // AM/PM (ucase)
			case "P": // AM/PM (lcase)
				tmp = w.__( "meridiem" )[ ( ( date.get(3) < 12 ) ? 0 : 1 ) ].toUpperCase();
				return ( oper === "P" ? tmp.toLowerCase() : tmp );
			case "s": // Unix Seconds
				return date.getEpoch();
			case "S": // Seconds
				return w._zPad( date.getSeconds(), pad );
			case "u": // Day of week (1-7)
				return w._zPad( date.getDay() + 1, pad );
			case "w": // Day of week
				return date.getDay();
			case "y": // Year (2 digit)
				return w._zPad(date.getFullYear() % 100);
			case "Y": // Year (4 digit)
				return date.getFullYear();
			case "E": // BE (Buddist Era, 4 Digit)
				return date.getFullYear() + 543;
			case "V":
				return w._zPad( date.getDWeek(4), pad );
			case "U":
				return w._zPad( date.getDWeek(0), pad );
			case "W":
				return w._zPad( date.getDWeek(1), pad );
			case "o": // Ordinals
				if ( typeof w._ord[o.useLang] !== "undefined" ) {
					return w._ord[ o.useLang ]( date.getDate() );
				}
				return w._ord[ "default" ](date.getDate());
			case "j":
				tmp = new Date(date.getFullYear(),0,1);
				tmp = "000" + String(Math.ceil((date - tmp) / 86400000)+1);
				return tmp.slice(-3);
			case "J":
				return date.toJSON();
			case "G":
				tmp = date.getFullYear();
				if ( date.getDWeek(4) === 1 && date.getMonth() > 0 ) {
					return tmp + 1;
				}
				if ( date.getDWeek(4) > 51 && date.getMonth() < 11 ) {
					return tmp - 1;
				}
				return tmp;
			case "g":
				tmp = date.getFullYear % 100;
				if ( date.getDWeek(4) === 1 && date.getMonth() > 0 ) {
					++tmp;
				}
				if ( date.getDWeek(4) > 51 && date.getMonth() < 11 ) {
					--tmp;
				}
				return w._zpad(tmp);
			default:
				return match;
		}
	});

	if ( w.__( "useArabicIndic" ) === true && allowArIn === true ) {
		format = w._dRep(format);
	}

	return format;
};