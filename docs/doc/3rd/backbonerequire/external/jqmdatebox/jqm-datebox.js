/*
 * jQuery-Mobile-DateBox 
 * Date: Thu Aug 14 2014 23:35:08 UTC
 * http://dev.jtsage.com/jQM-DateBox/
 * https://github.com/jtsage/jquery-mobile-datebox
 *
 * Copyright 2010, 2014 JTSage. and other contributors
 * Released under the MIT license.
 * https://github.com/jtsage/jquery-mobile-datebox/blob/master/LICENSE.txt
 *
 */
/* CORE Functions */

(function( $, undefined ) {

	$.widget( "mobile.datebox", {
		options: {
			// All widget options, including some internal runtime details

			// 3-jQueryMobileVersion
			// Check Header for Build Date.
			version: "3-1.5.0-pre", 

			theme: false,
			themeDefault: "a",
			themeHeader: "a",
			mode: false,

			transition: "fade",
			useAnimation: true,
			hideInput: false,
			hideContainer: false,
			hideFixedToolbars: false,

			lockInput: true,

			zindex: "1100",
			clickEvent: "vclick",
			clickEventAlt: "click",

			defaultValue: false,
			showInitialValue: false,

			popupPosition: false,
			popupForceX: false,
			popupForceY: false,

			useModal: true,
			useModalTheme: "b",
			useInline: false,
			useInlineBlind: false,
			useHeader: true,
			useImmediate: false,

			useButton: true,
			buttonIcon: false,
			buttonIconDate: "calendar",
			buttonIconTime: "clock",
			useFocus: false,
			useClearButton: false,
			useCollapsedBut: false,
			usePlaceholder: false,

			openCallback: false,
			openCallbackArgs: [],
			closeCallback: false,
			closeCallbackArgs: [],

			startOffsetYears: false,
			startOffsetMonths: false,
			startOffsetDays: false,
			afterToday: false,
			beforeToday: false,
			notToday: false,
			maxDays: false,
			minDays: false,
			maxYear: false,
			minYear: false,
			blackDates: false,
			blackDatesRec: false,
			blackDays: false,
			whiteDates: true,
			minHour: false,
			maxHour: false,
			minuteStep: 1,
			minuteStepRound: 0,

			rolloverMode: { 
				"m": true,
				"d": true,
				"h": true,
				"i": true,
				"s": true
			},

			useLang: "default",
			lang: {
				"default" : {
					setDateButtonLabel: "Set Date",
					setTimeButtonLabel: "Set Time",
					setDurationButtonLabel: "Set Duration",
					calTodayButtonLabel: "Jump to Today",
					calTomorrowButtonLabel: "Jump to Tomorrow",
					titleDateDialogLabel: "Set Date",
					titleTimeDialogLabel: "Set Time",
					daysOfWeek: [
						"Sunday", "Monday", "Tuesday", 
						"Wednesday", "Thursday", "Friday", 
						"Saturday"
					],
					daysOfWeekShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
					monthsOfYear: [
						"January", "February", "March", "April", "May", "June",
						"July", "August", "September", "October", "November", "December"
					],
					monthsOfYearShort: [
						"Jan", "Feb", "Mar", "Apr", "May", "Jun",
						"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
					],
					durationLabel: ["Days", "Hours", "Minutes", "Seconds"],
					durationDays: ["Day", "Days"],
					timeFormat: 24,
					headerFormat: "%A, %B %-d, %Y",
					tooltip: "Open Date Picker",
					nextMonth: "Next Month",
					prevMonth: "Previous Month",
					dateFieldOrder: ["m", "d", "y"],
					timeFieldOrder: ["h", "i", "a"],
					slideFieldOrder: ["y", "m", "d"],
					dateFormat: "%Y-%m-%d",
					useArabicIndic: false,
					isRTL: false,
					calStartDay: 0,
					clearButton: "Clear",
					durationOrder: ["d", "h", "i", "s"],
					meridiem: ["AM", "PM"],

					// 12HR: "%l:%M %p"
					// 24HR: "%k:%M" 
					timeOutput: "%k:%M", 
					durationFormat: "%Dd %DA, %Dl:%DM:%DS",
					calDateListLabel: "Other Dates",
					calHeaderFormat: "%B %Y"
				}
			}
		},
		_enhanceDate: function() {
			$.extend(this._date.prototype, {
				copy: function( adjust, override ) {
					// Get a modified copy of the date.
					// First array - Offset the new date by #  
					//    (position determines date part)
					// Second array - If non-zero, force the new date by # 
					//    (position determines date part)
					
					adjust = $.extend( [0,0,0,0,0,0,0], adjust );
					override = $.extend( [0,0,0,0,0,0,0], override );
					return new Date(
						((override[0] > 0 ) ? override[0] : this.get(0) + adjust[0]),
						((override[1] > 0 ) ? override[1] : this.get(1) + adjust[1]),
						((override[2] > 0 ) ? override[2] : this.get(2) + adjust[2]),
						((override[3] > 0 ) ? override[3] : this.get(3) + adjust[3]),
						((override[4] > 0 ) ? override[4] : this.get(4) + adjust[4]),
						((override[5] > 0 ) ? override[5] : this.get(5) + adjust[5]),
						((override[6] > 0 ) ? override[5] : this.get(6) + adjust[6]));
				},
				adj: function (type, amount) {
					// Adjust the date.  Yes, this is chainable 
					if ( typeof amount !== "number" || typeof type !== "number" ) {
						throw new Error( "Invalid Arguments" );
					}
					switch ( type ) {
						case 0: this.setD( 0, this.get(0) + amount ); break;
						case 1: this.setD( 1, this.get(1) + amount ); break;
						case 2: this.setD( 2, this.get(2) + amount ); break;
						case 3: amount *= 60;
							/* falls through */
						case 4: amount *= 60;
							/* falls through */
						case 5: amount *= 1000;
							/* falls through */
						case 6: this.setTime( this.getTime() + amount ); break;
					}
					return this;
				},
				setD: function(type, amount) {
					// A chainable version of setWhatever() 
					switch ( type ) {
						case 0: this.setFullYear(amount); break;
						case 1: this.setMonth(amount); break;
						case 2: this.setDate(amount); break;
						case 3: this.setHours(amount); break;
						case 4: this.setMinutes(amount); break;
						case 5: this.setSeconds(amount); break;
						case 6: this.setMilliseconds(amount); break;
					}
					return this;
				},
				get: function(type) {
					// Chainable version of get. Also shorter.
					switch ( type ) {
						case 0: return this.getFullYear();
						case 1: return this.getMonth();
						case 2: return this.getDate();
						case 3: return this.getHours();
						case 4: return this.getMinutes();
						case 5: return this.getSeconds();
						case 6: return this.getMilliseconds();
					}
					return false;
				},
				get12hr: function() {
					if ( this.get(3) === 0 ) { return 12; }
					if ( this.get(3) < 13 ) { return this.get(3); }
					return this.get(3) - 12;
				},
				iso: function() {
					var arr = [0,0,0], i = 0;
					for ( i=0; i < 3; i++ ) {
						arr[ i ] = this.get( i );
						if ( i === 1 ) { arr[ i ]++; }
						if ( arr[i] < 10 ) { arr[ i ] = "0" + String( arr[ i ] ); }
					}
					return arr.join( "-" );
				},
				comp: function () {
					return parseInt( this.iso().replace( /-/g, "" ), 10 );
				},
				getEpoch: function() {
					return Math.floor( this.getTime() / 1000);
				},
				getArray: function() {
					var arr = [0,0,0,0,0,0], i = 0;
					for ( i = 0; i < 6; i++ ) {
						arr[i] = this.get(i);
					}
					return arr;
				},
				setFirstDay: function (day) {
					// Grabs first valid (day) of current month
					this.setD( 2, 1 ).adj( 2, ( day - this.getDay() ) );
					if ( this.get( 2 ) > 10 ) { this.adj( 2, 7 ); }
					return this;
				},
				setDWeek: function (type,num) {
					if ( type === 4 ) {
						return this.setD(1,0).setD(2,1).setFirstDay(4).adj(2,-3).adj(2,(num-1)*7);
					}
					return this.setD(1,0).setD(2,1).setFirstDay(type).adj(2,(num-1)*7);
				},
				getDWeek: function (type) {
					var t1, t2;

					switch ( type ) {
						case 0:
							t1 = this.copy([0,-1*this.getMonth()]).setFirstDay(0);
							return Math.floor(
								( this.getTime() - ( t1.getTime() + (
									( this.getTimezoneOffset() - t1.getTimezoneOffset() ) * 60000
								))) / 6048e5 ) + 1;
						case 1:
							t1 = this.copy([0,-1*this.getMonth()]).setFirstDay(1);
							return Math.floor(
								( this.getTime() - ( t1.getTime() + (
									( this.getTimezoneOffset() - t1.getTimezoneOffset() ) * 60000
								))) / 6048e5 ) + 1;
						case 4:
							// this line is some bullshit.  but it does work.
							// (trap for dec 29, 30, or 31st being in the new year's week - these
							// are the only 3 that can possibly fall like this)
							if ( this.getMonth() === 11 && this.getDate() > 28 ) { return 1; }

							t1 = this.copy([0,-1*this.getMonth()],true).setFirstDay(4).adj(2,-3);
							t2 = Math.floor(
								( this.getTime() - ( t1.getTime() + (
									( this.getTimezoneOffset() - t1.getTimezoneOffset() ) * 60000
								))) / 6048e5 ) + 1;

							if ( t2 < 1 ) {
								t1 = this.copy([-1,-1*this.getMonth()]).setFirstDay(4).adj(2,-3);
								return Math.floor((this.getTime() - t1.getTime()) / 6048e5) + 1;
							}
							return t2;
						default:
							return 0;
					}
				}
			});
		},
		_event: function(e, p) {
			var tmp,
				w = $( this ).data( "mobile-datebox" );
			if ( ! e.isPropagationStopped() ) {
				switch (p.method) {
					case "close":
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
		},
		_ord: {
			"default": function (num) {
				// Return an ordinal suffix (1st, 2nd, 3rd, etc)
				var ending = num % 10;
				if ( ( num > 9 && num < 21 ) || ending > 3 ) { return "th"; }
				return [ "th", "st", "nd", "rd" ][ ending ];
			}
		},
		__ : function(val) {
			var o = this.options,
				lang = o.lang[o.useLang],
				mode = o[ o.mode + "lang"],
				oride = "override" + val.charAt(0).toUpperCase() + val.slice(1);

			if ( typeof o[ oride ] !== "undefined" ) {
				return o[ oride ]; 
			}
			if ( typeof lang[ val ] !== "undefined" ) {
				return lang[ val ];
			}
			if ( ( typeof mode !== "undefined" ) && ( typeof mode[ val ] !== "undefined" ) ) { 
				return mode[ val ]; 
			}
			return o.lang[ "default" ][ val ];
		},
		__fmt: function() {
			var w = this,
				o = this.options;

			if ( typeof w.fmtOver !== "undefined" && w.fmtOver !== false ) {
				return w.fmtOver;
			}
			
			switch ( o.mode ) {
				case "timebox":
				case "timeflipbox":
					return w.__( "timeOutput" );
				case "durationbox":
				case "durationflipbox":
					return w.__( "durationFormat" );
				default:
					return w.__( "dateFormat" );
			}
		},
		_zPad: function(number) {
			// Zero pad a number.
			return ( number < 10 ? "0" : "" ) + String( number );
		},
		_dRep: function( oper, direction ) {
			// Digit replacement Indic/Arabic
			var ch, i, 
				start = 48,
				end = 57,
				adder = 1584,
				newd = "";

			if ( direction === -1 ) {
				start += adder;
				end += adder;
				adder = -1584;
			}
			for ( i = 0; i < oper.length; i++ ) {
				ch = oper.charCodeAt( i );
				if ( ch >= start && ch <= end ) {
					newd = newd + String.fromCharCode( ch+adder );
				} else {
					newd = newd + String.fromCharCode( ch );
				}
			}
			return newd;
		},
		_doIndic: function() {
			var w = this;

			w.d.intHTML.find( "*" ).each( function() {
				if ( $( this ).children().length < 1 ) {
					$( this ).text( w._dRep( $( this ).text() ) );
				} else if ( $( this ).hasClass( "ui-datebox-slideday" ) ) {
					$( this ).html( w._dRep( $( this ).html() ) );
				}
			});
			w.d.intHTML.find( "input" ).each(function() {
				$( this ).val( w._dRep( $( this ).val() ) );
			});
		},
		_parser: {
			// Custom Parser Definitions.
			"default": function () { return false; } // Arguments is STR
		},
		_n: function ( val, def ) {
			// Don't allow negative values, use a default instead
			return ( val < 0 ) ? def : val;
		},
		_pa: function (arr,date) {
			// "Clean" a date for use.
			if ( typeof date === "boolean" ) { 
				return new this._date( arr[0], arr[1], arr[2], 0, 0, 0, 0 );
			}
			return new this._date( 
				date.get(0),
				date.get(1),
				date.get(2),
				arr[0],
				arr[1],
				arr[2],
				0
			);
		},
		_makeDate: function ( str ) {
			// Date Parser
			var i,  exp_temp, exp_format, grbg,
				w = this,
				o = this.options,
				defVal = this.options.defaultValue,
				adv = w.__fmt(),
				exp_input = null,
				exp_names = [],
				date = new w._date(),
				d = { 
					year: -1,
					mont: -1,
					date: -1,
					hour: -1,
					mins: -1,
					secs: -1,
					week: false,
					wtyp: 4,
					wday: false,
					yday: false,
					meri: 0
				};
				
			str = $.trim( ( ( w.__( "useArabicIndic" ) === true ) ? 
					w._dRep( str, -1 ) : 
					str 
				) );

			if ( typeof o.mode === "undefined" ) { return date; }
			if ( typeof w._parser[ o.mode ] !== "undefined" ) { 
				return w._parser[ o.mode ].apply( w, [ str ] ); 
			}

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

			adv = adv.replace( /%(0|-)*([a-z])/gi, function( match, pad, oper ) {
				exp_names.push( oper );
				switch ( oper ) {
					case "p":
					case "P":
					case "b":
					case "B": return "(" + match + "|.+?)";
					case "H":
					case "k":
					case "I":
					case "l":
					case "m":
					case "M":
					case "S":
					case "V":
					case "U":
					case "u":
					case "W":
					case "d": 
						return "(" + match + "|[0-9]{" + 
							(( pad === "-" ) ? "1," : "" ) + "2})";
					case "j": return "(" + match + "|[0-9]{3})";
					case "s": return "(" + match + "|[0-9]+)";
					case "g":
					case "y": return "(" + match + "|[0-9]{2})";
					case "E":
					case "G":
					case "Y": return "(" + match + "|[0-9]{1,4})";
					default: exp_names.pop(); return ".+?";
				}
			});

			adv = new RegExp( "^" + adv + "$" );
			exp_input = adv.exec(str);
			exp_format = adv.exec(w.__fmt());

			if ( exp_input === null || exp_input.length !== exp_format.length ) {
				if ( defVal !== false ) {
					switch ( typeof defVal ) {
						case "object":
							if ( $.isFunction( defVal.getDay ) ) {
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
							if ( o.mode.substr(0,4) === "time" ) {
								exp_temp = $.extend(
										[0,0,0],
										defVal.split( ":" )
									).slice( 0, 3 );
								date = w._pa( exp_temp, date ); 
							} else {
								exp_temp = $.extend( 
										[0,0,0],
										defVal.split( "-" )
									).slice( 0, 3 );
								exp_temp[1]--;
								date = w._pa( exp_temp, false ); 
							} break;
					}
				}
				if ( isNaN(date.getDate()) ) { date = new w._date(); }
			} else {
				for ( i=1; i<exp_input.length; i++ ) {
					grbg = parseInt( exp_input[i], 10);
					switch ( exp_names[i-1] ) {
						case "s": return new w._date( parseInt( exp_input[i], 10 ) * 1000 );
						case "Y":
						case "G": d.year = grbg; break;
						case "E": d.year = grbg - 543; break;
						case "y":
						case "g":
							if ( o.afterToday === true || grbg < 38 ) {
								d.year = 2000 + grbg;
							} else {
								d.year = 1900 + grbg;
							} break;
						case "m": d.mont = grbg - 1; break;
						case "d": d.date = grbg; break;
						case "H":
						case "k":
						case "I":
						case "l": d.hour = grbg; break;
						case "M": d.mins = grbg; break;
						case "S": d.secs = grbg; break;
						case "u": d.wday = grbg - 1; break;
						case "w": d.wday = grbg; break;
						case "j": d.yday = grbg; break;
						case "V": d.week = grbg; d.wtyp = 4; break;
						case "U": d.week = grbg; d.wtyp = 0; break;
						case "W": d.week = grbg; d.wtyp = 1; break;
						case "p":
						case "P": 
							grbg = new RegExp("^" + exp_input[i] + "$", "i");
							d.meri = ( grbg.test( w.__( "meridiem" )[0] ) ? -1 : 1 );
							break;
						case "b":
							exp_temp = $.inArray( exp_input[i], w.__( "monthsOfYearShort" ) );
							if ( exp_temp > -1 ) { d.mont = exp_temp; }
							break;
						case "B":
							exp_temp = $.inArray( exp_input[i], w.__( "monthsOfYear" ) );
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
					return date;
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
			return date;
		},
		_customformat: {
			"default": function() { return false; } // Arguments are OPER, DATE
		},
		_formatter: function(format, date) {
			var w = this,
				o = this.options, tmp,
				dur = {
					part: [0,0,0,0], tp: 0
				};

				if ( o.mode.substr( 0, 4 ) === "dura" ) {
					dur.tp = this.theDate.getEpoch() - this.initDate.getEpoch();

					// Days
					dur.part[0] = parseInt( dur.tp / (60*60*24),10); 
					dur.tp -= (dur.part[0]*60*60*24); 

					// Hours
					dur.part[1] = parseInt( dur.tp / (60*60),10);
					dur.tp -= (dur.part[1]*60*60);

					// Minutes
					dur.part[2] = parseInt( dur.tp / (60),10);
					dur.tp -= (dur.part[2]*60);

					// Seconds
					dur.part[3] = dur.tp;

					if ( ! format.match( /%Dd/ ) ) { dur.part[1] += (dur.part[0]*24);}
					if ( ! format.match( /%Dl/ ) ) { dur.part[2] += (dur.part[1]*60);}
					if ( ! format.match( /%DM/ ) ) { dur.part[3] += (dur.part[2]*60);}
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
						case "d": return dur.part[0];
						case "l": return w._zPad(dur.part[1]);
						case "M": return w._zPad(dur.part[2]);
						case "S": return w._zPad(dur.part[3]);
						case "A": return w.__( "durationDays" )[ (( dur.part[0] > 1 ) ? 1 : 0 ) ];
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
						return date.getFullYear().toString().substr(0,2);
					case "d": // Day of month
						return (( pad === "-" ) ? 
							date.getDate() :
							w._zPad( date.getDate()
						));
					case "H": // Hour (01..23)
					case "k":
						return (( pad === "-" ) ? 
							date.getHours() :
							w._zPad( date.getHours()
						));
					case "I": // Hour (01..12)
					case "l":
						return (( pad === "-" ) ? 
							date.get12hr() :
							w._zPad( date.get12hr()
						));
					case "m": // Month
						return (( pad === "-" ) ?
							date.getMonth()+1 :
							w._zPad( date.getMonth()+1
						));
					case "M": // Minutes
						return (( pad === "-" ) ?
							date.getMinutes() :
							w._zPad( date.getMinutes()
						));
					case "p": // AM/PM (ucase)
						return w.__( "meridiem" )[ ( ( date.get(3) < 12 ) ? 0 : 1 ) ].toUpperCase();
					case "P": // AM/PM (lcase)
						return w.__( "meridiem" )[ ( ( date.get(3) < 12 ) ? 0 : 1 ) ].toLowerCase();
					case "s": // Unix Seconds
						return date.getEpoch();
					case "S": // Seconds
						return (( pad === "-" ) ?
							date.getSeconds() :
							w._zPad( date.getSeconds()
						));
					case "u": // Day of week (1-7)
						return (( pad === "-" ) ?
							date.getDay() + 1 :
							w._zPad( date.getDay() + 1
						));
					case "w": // Day of week
						return date.getDay();
					case "y": // Year (2 digit)
						return date.getFullYear().toString().substr(2,2);
					case "Y": // Year (4 digit)
						return date.getFullYear();
					case "E": // BE (Buddist Era, 4 Digit)
						return date.getFullYear() + 543;
					case "V":
						return (( pad === "-" ) ?
							date.getDWeek(4) :
							w._zPad( date.getDWeek(4)
						));
					case "U":
						return (( pad === "-" ) ?
							date.getDWeek(0) :
							w._zPad( date.getDWeek(0)
						));
					case "W":
						return (( pad === "-" ) ?
							date.getDWeek(1) :
							w._zPad( date.getDWeek(1)
						));
					case "o": // Ordinals
						if ( typeof w._ord[o.useLang] !== "undefined" ) {
							return w._ord[ o.useLang ]( date.getDate() );
						}
						return w._ord[ "default" ](date.getDate());
					case "j":
						tmp = new Date(date.getFullYear(),0,1);
						tmp = Math.ceil((date - tmp) / 86400000)+1;
						return (( tmp < 100 ) ? (( tmp < 10 ) ? "00" : "0" ) : "" ) + String(tmp);
					case "G":
						if ( date.getDWeek(4) === 1 && date.getMonth() > 0 ) {
							return date.getFullYear() + 1;
						}
						if ( date.getDWeek(4) > 51 && date.getMonth() < 11 ) {
							return date.getFullYear() - 1;
						}
						return date.getFullYear();
					case "g":
						if ( date.getDWeek(4) === 1 && date.getMonth() > 0 ) {
							return parseInt(date.getFullYear().toString().substr(2,2),10) + 1;
						}
						if ( date.getDWeek(4) > 51 && date.getMonth() < 11 ) {
							return parseInt(date.getFullYear().toString().substr(2,2),10) - 1;
						}
						return date.getFullYear().toString().substr(2,2);
					default:
						return match;
				}
			});

			if ( w.__( "useArabicIndic" ) === true ) {
				format = w._dRep(format);
			}

			return format;
		},
		_btwn: function(value, low, high) {
			return ( value > low && value < high );
		},
		_minStepFix: function() {
			// Round "extra" minutes when using a stepper.
			var newMinute = this.theDate.get(4), 
				mstep = this.options.minuteStep,
				roundDirection = this.options.minStepRound,
				remainder = newMinute % mstep;

			if ( mstep > 1 && remainder > 0 ) {
				if ( roundDirection < 0 ) {
					newMinute = newMinute - remainder;
				} else if ( roundDirection > 0 ) {
					newMinute = newMinute + ( mstep - remainder );
				} else {
					if ( newMinute % mstep < mstep / 2 ) {
						newMinute = newMinute - remainder;
					} else {
						newMinute = newMinute + ( mstep - remainder );
					}
				}
			this.theDate.setMinutes(newMinute);
			}
		},
		_offset: function(mode, amount, update) {
			// Compute a date/time offset.
			//   update = false to prevent controls refresh
			var w = this,
				o = this.options,
				now = this.theDate,
				ok = false;

			mode = ( mode || "" ).toLowerCase();

			if ( typeof update === "undefined" ) { update = true; }

			if ( mode !== "a" && 
					( typeof o.rolloverMode[mode] === "undefined" || o.rolloverMode[mode] === true )
				) {
				ok = $.inArray(mode, [ "y", "m", "d", "h", "i", "s" ]);
			} else {
				switch(mode) {
					case "y": ok = 0; break;
					case "m":
						if ( w._btwn( now.get(1) + amount, -1, 12 ) ) { ok = 1; }
						break;
					case "d":
						if ( w._btwn( 
								now.get(2) + amount, 
								0, 
								( 32 - now.copy( [0], [0,0,32,13] ).get(3) + 1 ) 
							)) { ok = 2; }
						break;
					case "h":
						if ( w._btwn( now.get(3) + amount, -1, 24 ) ) { ok = 3; }
						break;
					case "i":
						if ( w._btwn( now.get(4) + amount, -1, 60 ) ) { ok = 4; }
						break;
					case "s":
						if ( w._btwn( now.get(5) + amount, -1, 60 ) ) { ok = 5; }
						break;
					case "a":
						w._offset( "h", ( ( amount > 0 ) ? 1 : -1 ) * 12, false );
						break;
				}
			}
			if ( ok !== false ) { w.theDate.adj( ok, amount ); }
			if ( update === true ) { w.refresh(); }
			if ( o.useImmediate ) { w._t( { method: "doset" } ); }

			w._t( {
				method: "offset",
				type: mode,
				amount: amount,
				newDate: w.theDate
			} );
		},
		_startOffset: function(date) {
			var o = this.options;

			if ( o.startOffsetYears !== false ) {
				date.adj( 0, o.startOffsetYears );
			}
			if ( o.startOffsetMonths !== false ) {
				date.adj( 1, o.startOffsetMonths );
			}
			if ( o.startOffsetDays !== false ) {
				date.adj( 2, o.startOffsetDays );
			}
			return date;
		},
		_destroy: function() {
			var w = this,
				o = this.options,
				button = this.d.wrap.find( "a" );

			w.d.wrap.removeClass( "ui-input-has-clear" );
			button.remove();

			if ( o.lockInput === true ) {
				w.d.input.removeAttr( "readonly" );
			}

			w.d.input
				.off( "datebox" )
				.off( "focus.datebox" )
				.off( "blur.datebox" )
				.off( "change.datebox" );
		},
		_create: function() {
			// Create the widget, called automatically by widget system
			$( document ).trigger( "dateboxcreate" );

			var w = this,
				o = $.extend(
					this.options,
					this._getLongOptions( this.element ),
					this.element.data( "options" )
				),
				thisTheme = ( ( o.theme === false ) ?
					$.mobile.getInheritedTheme( this.element ) :
					o.theme
				),
				trans = o.useAnimation ? o.transition : "none",
				d = {
					input: this.element,
					wrap: this.element.parent(),
					mainWrap: $( "<div>", { 
						"class": "ui-datebox-container ui-overlay-shadow " + 
							"ui-corner-all ui-datebox-hidden " + trans +
							" ui-body-" + thisTheme
						} ).css( "zIndex", o.zindex ),
					intHTML: false
				},
				touch = ( typeof window.ontouchstart !== "undefined" ),
				drag = {
					eStart : (touch ? "touchstart" : "mousedown" )+".datebox",
					eMove  : (touch ? "touchmove" : "mousemove" )+".datebox",
					eEnd   : (touch ? "touchend" : "mouseup" )+".datebox",
					eEndA  : (touch ?
						"mouseup.datebox touchend.datebox touchcancel.datebox touchmove.datebox" :
						"mouseup.datebox"
					),
					move   : false,
					start  : false,
					end    : false,
					pos    : false,
					target : false,
					delta  : false,
					tmp    : false
				};

			$.extend(w, {d: d, drag: drag, touch:touch});

			if ( o.usePlaceholder !== false ) {
				if ( o.usePlaceholder === true && w._grabLabel() !== "" ) { 
					w.d.input.attr( "placeholder", w._grabLabel());
				}
				if ( typeof o.usePlaceholder === "string" ) {
					w.d.input.attr( "placeholder", o.usePlaceholder );
				}
			}

			o.theme = thisTheme;

			w.disabled = false;
			w.runButton = false;
			w._date = window.Date;
			w._enhanceDate();
			w.baseID = w.d.input.attr( "id" );

			w.initDate = new w._date();
			w.theDate = ( o.defaultValue ) ?
				w._makeDate() :
				( (w.d.input.val() !== "" ) ?
					w._makeDate( w.d.input.val() ) :
					new w._date() );

			if ( w.d.input.val() === "" ) { w._startOffset( w.theDate ); }

			w.initDone = false;

			if ( o.showInitialValue === true ) {
				w.d.input.val( w._formatter( w.__fmt(), w.theDate ) );
			}

			if ( o.useButton === true ) {
				if ( o.mode !== false ) {
					w.d.wrap.addClass( "ui-input-has-clear" );
					if ( o.buttonIcon === false ) {
						if ( o.mode.substr( 0, 4 ) === "time" || o.mode.substr( 0 ,3 ) === "dur" ) {
							o.buttonIcon = o.buttonIconTime;
						} else {
							o.buttonIcon = o.buttonIconDate;
						}
					}
					$( "<a href='#' class='ui-input-clear ui-btn ui-icon-" + 
							o.buttonIcon +
							" ui-btn-icon-notext ui-corner-all'></a>" )
						.attr( "title", w.__( "tooltip" ) )
						.text( w.__( "tooltip" ) )
						.appendTo(w.d.wrap)
						.on(o.clickEvent, function( e ) {
							e.preventDefault();
							if ( o.useFocus === true ) {
								w.d.input.focus();
							} else {
								if ( !w.disabled ) { w._t( { method: "open" } ); }
							}
						});
				}
			}

			if ( o.hideInput === true ) { w.d.wrap.hide(); }
			if ( o.hideContainer === true ) { w.d.wrap.parent().hide(); }

			w.d.input
				.on( "focus.datebox", function(){
					w.d.input.addClass( "ui-focus" );
					if ( w.disabled === false && o.useFocus === true ) {
						w._t( { method: "open" } );
					}
				})
				.on( "blur.datebox", function() { 
					w.d.input.removeClass( "ui-focus" ); 
				})
				.on( "change.datebox", function() {
					w.theDate = w._makeDate( w.d.input.val() );
					w.refresh();
				})
				.on( "datebox", w._event );

			if ( o.lockInput === true ) { 
				w.d.input.attr( "readonly", "readonly" ); 
			}

			// Check if mousewheel plugin is loaded
			if ( typeof $.event.special.mousewheel !== "undefined" ) {
				w.wheelExists = true;
			}

			// Disable when done if element attribute disabled is true.
			if ( w.d.input.is( ":disabled" ) ) {
				w.disable();
			}

			w.applyMinMax(false, false);

			if ( o.useInline === true || o.useInlineBlind === true ) {
				w.open();
			}

			//Throw dateboxinit event
			$( document ).trigger( "dateboxaftercreate" );
		},
		applyMinMax: function( refresh, override ) {
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
				o.minDays = parseInt( daysRaw * -1 , 10 ) + 1;
			}
			if ( ( override === true || o.maxDays === false ) && 
					( typeof w.d.input.attr( "max" ) !== "undefined" ) ) {

				fromEl = w.d.input.attr( "max" ).split( "-" );
				fromElDate = new w._date(fromEl[0], fromEl[1]-1, fromEl[2], 0, 0, 0, 0 );
				daysRaw = ( fromElDate.getTime() - todayClean.getTime() ) / lod;
				o.maxDays = parseInt( daysRaw, 10 ) - 1;
			}

			if ( refresh === true ) { 
				w._t( { method: "refresh" } );
			}
		},
		_build: {
			"default": function () {
				this.d.headerText = "Error";
				this.d.intHTML = $("<div class='ui-body-b'><h2 style='text-align:center'>" + 
					"Unknown Mode</h2></div>" );
			}
		},
		_drag: {
			"default": function () { return false; }
		},
		open: function () {
			// PUBLIC function to open the control
			var w = this,
				o = this.options,
				popopts = {
					transition: (o.useAnimation ? o.transition : "none" )
				},
				basepop = { 
					history: false,
					transition: (o.useAnimation ? o.transition : "none" )
				};

			if ( o.useFocus === true && w.fastReopen === true ) { 
				w.d.input.blur();
				return false;
			}

			w.theDate = w._makeDate( w.d.input.val() );
			if ( w.d.input.val() === "" ) { w._startOffset( w.theDate ); }
			w.d.input.blur();

			if ( typeof w._build[ o.mode ] === "undefined" ) {
				w._build[ "default" ].apply( w, [] );
			} else {
				w._build[ o.mode ].apply( w, [] );
			}
			if ( typeof w._drag[ o.mode ] !== "undefined" ) {
				w._drag[ o.mode ].apply( w, [] );
			}

			w._t( { method: "refresh" } );

			if ( w.__( "useArabicIndic" ) === true ) { w._doIndic(); }

			if ( ( o.useInline === true || o.useInlineBlind === true ) && w.initDone === false ) {
				w.d.mainWrap.append( w.d.intHTML );
				w.d.input.parent().parent().append( w.d.mainWrap );
				w.d.mainWrap.removeClass( "ui-datebox-hidden" );
				if ( o.useInline === true ) {
					if ( o.hideInput === true ) {
						w.d.mainWrap.addClass( "ui-datebox-inline" );
					} else {
						w.d.mainWrap.addClass( "ui-datebox-inlineblind" );
					}
					// This is really hacky.  I hate it, but I don't have a 
					// better idea right now.  Cleans up position on flip variants.
					setTimeout( (function(w) { 
						return function() {
							w._t( { method: "postrefresh" } );
						};
					}(w)), 100);
					return true;
				} else {
					w.d.mainWrap.addClass( "ui-datebox-inlineblind" );
					w.d.mainWrap.hide();
				}
				w.initDone = false;
				w._t( { method: "postrefresh" } );
			}

			if ( o.useInlineBlind ) {
				if ( w.initDone ) { 
					w.refresh();
					w.d.mainWrap.slideDown();
					w._t( { method: "postrefresh" } );
				} else { 
					w.initDone = true; 
				}
				return true;
			}

			// Ignore if already open
			if ( w.d.intHTML.is( ":visible" ) ) { return false; }

			w.d.mainWrap.empty();

			if ( o.useHeader === true ) {
				w.d.mainWrap.append( $( "<a href='#'>Close</a>" )
					.addClass( "ui-btn-left ui-link ui-btn ui-btn-a ui-icon-delete " + 
						"ui-btn-icon-notext ui-shadow ui-corner-all"
					)
					.on( o.clickEventAlt, function( e ) {
						e.preventDefault();
						w._t( { method: "close" } );
					} )
				);
				w.d.mainWrap.append( $( "<div class='ui-header ui-bar-" + o.themeHeader + "'>" + 
					"<h1 class='ui-title'>" + w.d.headerText + "</h1>" +
					"</div>" )
				);
			}
			
			w.d.mainWrap.append( w.d.intHTML ).css( "zIndex", o.zindex );
			w._t( { method: "postrefresh" } );

			if ( o.popupPosition !== false ) {
				popopts.positionTo = o.popupPosition;
			} else {
				if ( typeof w.baseID !== "undefined" ) {
					popopts.positionTo = "#" + w.baseID;
				} else {
					popopts.positionTo = "window";
				}
			}

			if ( o.popupForceX !== false && o.popupForceY !== false ) {
				popopts.x = parseInt(o.popupForceX,10);
				popopts.y = parseInt(o.popupForceY,10);
				popopts.positionTo = "origin";
			}

			if ( o.useModal === true ) {
				basepop.overlayTheme = o.useModalTheme;
				basepop.dismissible = false;
			}

			// Perpare open callback, if provided. Additionally, if this
			// returns false then the open/update will stop.
			if ( o.openCallback !== false ) {
				if ( ! $.isFunction( o.openCallback ) ) {
					if ( typeof window[ o.openCallback ] === "function" ) {
						o.openCallback = window[ o.openCallback ];
					}
				}
				basepop.afteropen = function() {
					if ( o.openCallback.apply( w, $.merge([{
								custom: w.customCurrent,
								initDate: w.initDate,
								date: w.theDate,
								duration: w.lastDuration
							}], o.openCallbackArgs ) ) === false ) {

						w._t( {method: "close"} );
					}
				};
			}
			// Prepare close callback.
			if ( o.closeCallback !== false ) {
				if ( ! $.isFunction( o.closeCallback ) ) {
					if ( typeof window[ o.closeCallback ] === "function" ) {
						o.closeCallback = window[ o.closeCallback ];
					}
				}
				basepop.afterclose = function() {
					o.closeCallback.apply( w, $.merge([{
						custom: w.customCurrent,
						initDate: w.initDate,
						date: w.theDate,
						duration: w.lastDuration
					}], o.closeCallbackArgs ) );
				};
			}

			w.d.mainWrap
				.removeClass( "ui-datebox-hidden" )
				.popup( basepop )
				.popup( "open", popopts );

			w.refresh();
		},
		close: function() {
			// Provide a PUBLIC function to close the element.
			var w = this,
				o = this.options;

			if ( o.useInlineBlind === true ) { 
				// Slide up useInlineBlind
				w.d.mainWrap.slideUp();
				return true;
			}
			if ( o.useInline === true || w.d.intHTML === false ) { 
				// Do nothing for useInline or empty.
				return true;
			}

			// Trigger the popup to close
			w.d.mainWrap.popup( "close" );

			// Unbind all drag handlers.
			$( document ).off( w.drag.eMove );
			$( document ).off( w.drag.eEnd );
			$( document ).off( w.drag.eEndA );

			if ( o.useFocus ) {
				w.fastReopen = true;
				setTimeout( (function( t ) { 
					return function () { 
						t.fastReopen = false; 
					};
				}( w )), 300 );
			}
		},
		refresh: function() {
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
		},
		_check: function() {
			// Check to see if a date is valid.
			var td, year, month, date, i,
				w = this,
				o = this.options,
				now = this.theDate;

			w.dateOK = true;
			if ( typeof o.mode === "undefined") { return true; }

			if ( o.afterToday !== false ) {
				td = new w._date();
				if ( now < td ) { now = td; }
			}
			if ( o.beforeToday !== false ) {
				td = new w._date();
				if ( now > td ) { now = td; }
			}
			if ( o.maxDays !== false ) {
				td = new w._date();
				td.adj( 2, o.maxDays );
				if ( now > td ) { now = td; }
			}
			if ( o.minDays !== false ) {
				td = new w._date();
				td.adj( 2, -1 * o.minDays );
				if ( now < td ) { now = td; }
			}
			if ( o.minHour !== false ) {
				if ( now.get(3) < o.minHour ) {
					now.setD( 3, o.minHour );
				}
			}
			if ( o.maxHour !== false ) {
				if ( now.get(3) > o.maxHour ) {
					now.setD( 3, o.maxHour );
				}
			}
			if ( o.maxYear !== false ) {
				td = new w._date( o.maxYear, 11, 31 );
				if ( now > td ) { now = td; }
			}
			if ( o.minYear !== false ) {
				td = new w._date( o.minYear, 0, 1 );
				if ( now < td ) { now = td; }
			}

			if ( o.mode.substr(0,4) === "time" || o.mode.substr(0,3) === "dur" ) {
				if ( o.mode === "timeflipbox" && o.validHours !== false ) {
					if ( $.inArray( now.get(3), o.validHours ) < 0 ) { w.dateOK = false; }
				}
			} else {
				if ( o.blackDatesRec !== false ) {
					year = now.get(0);
					month = now.get(1);
					date = now.get(2);

					for ( i=0; i<o.blackDatesRec.length; i++ ) {
						if (
							( o.blackDatesRec[i][0] === -1 || o.blackDatesRec[i][0] === year ) &&
							( o.blackDatesRec[i][1] === -1 || o.blackDatesRec[i][1] === month ) &&
							( o.blackDatesRec[i][2] === -1 || o.blackDatesRec[i][2] === date )
						) { w.dateOK = false; }
					}
				}
				if ( o.blackDates !== false ) {
					if ( $.inArray( now.iso(), o.blackDates ) > -1 ) { 
						w.dateOK = false; 
					}
				}
				if ( o.blackDays !== false ) {
					if ( $.inArray( now.getDay(), o.blackDays ) > -1 ) { 
						w.dateOK = false; 
					}
				}
				if ( o.whiteDates !== false ) {
					if ( $.inArray( now.iso(), o.whiteDates ) > -1 ) { 
						w.dateOK = true; 
					}
				}
			}
			w.theDate = now;
		},
		_grabLabel: function() {
			// Get the most reasonable label for this datebox.
			// In order of preference - placeholder, title, label for=
			var inputPlaceholder, inputTitle,
				w = this,
				o = this.options;

			if ( typeof o.overrideDialogLabel === "undefined" ) {
				inputPlaceholder = w.d.input.attr( "placeholder" );
				inputTitle = w.d.input.attr( "title" );
				
				if ( typeof inputPlaceholder !== "undefined" ) {
					return inputPlaceholder;
				}
				if ( typeof inputTitle !== "undefined" ) {
					return inputTitle;
				}
				return $(document).find( "label[for='" + w.d.input.attr( "id" ) + "']" ).text();
			}
			return o.overrideDialogLabel;
		},
		_makeEl: function( source, parts ) {
			// Populate a source element with data parts.
			var part = false,
				retty = false;

			retty = source.clone();

			if ( typeof parts.attr !== "undefined" ) {
				for ( part in parts.attr ) {
					if ( parts.attr.hasOwnProperty(part) ) {
						retty.data(part, parts.attr[part]);
					}
				}
			}
			return retty;
		},
		_getLongOptions: function( element ) {
			// Pull "long" options from the element, i.e.
			// data-datebox-mode="datebox" --> options.mode
			var key, temp,
				returnObj = {},
				prefix = "datebox",
				prefixLength = 7;

			for ( key in element.data() ) {
				if ( key.substr( 0, prefixLength ) === prefix && key.length > prefixLength ) {
					temp = key.substr( prefixLength );
					temp = temp.charAt( 0 ).toLowerCase() + temp.slice( 1 );
					if ( temp !== "options" ) {
						returnObj[ temp ] = element.data( key );
					}
				}
			}
			return returnObj;
		},
		disable: function() {
			var w = this;
			// Provide a PUBLIC function to Disable the element
			w.d.input.attr( "disabled", true );
			w.d.wrap.addClass( "ui-state-disabled" ).blur();
			w.disabled = true;
			w.d.mainWrap.addClass( "ui-state-disabled" );
			w._t( { method: "disable"});
		},
		enable: function() {
			var w = this;
			// Provide a PUBLIC function to Enable the element
			w.d.input.attr( "disabled", false );
			w.d.wrap.removeClass( "ui-state-disabled" );
			w.disabled = false;
			w.d.mainWrap.removeClass( "ui-state-disabled" );
			w._t( { method: "enable" });
		},
		_setOption: function() {
			$.Widget.prototype._setOption.apply( this, arguments );
			this.refresh();
		},
		getTheDate: function() {
			// Provide a PUBLIC function to get the current date.
			return this.theDate;
		},
		getLastDur: function() {
			// Provide a PUBLIC function to get the last entered duration
			return this.lastDuration;
		},
		setTheDate: function( newDate ) {
			// Provide a PUBLIC function to set the date
			// ACCEPTS: Date Object or String in proper output format
			if ( typeof( newDate ) === "object" ) {
				this.theDate = newDate;
			} else {
				this.theDate = this._makeDate( newDate );
			}
			this.refresh();
			this._t( { method: "doset" });
		},
		parseDate: function( format, strdate ) {
			// Provide a PUBLIC function to parse a date
			var retty,
				w = this;
				
			w.fmtOver = format;
			retty = w._makeDate( strdate );
			w.fmtOver = false;
			return retty;
		},
		callFormat: function( format, date ) {
			// Provide a PUBLIC function to get a formatted date
			return this._formatter( format, date );
		},
		getOption: function( opt ) {
			// Provide a PUBLIC function to get a defined option or i18n member
			var i18nTester = this.__(opt);
			if ( typeof i18nTester !== "undefined" ) {
				return i18nTester;
			} else {
				return this.options[ opt ];
			}
		},
		_t: function ( obj ) {
			this.d.input.trigger( "datebox", obj );
		}
	});

	// Degrade date inputs to text inputs, suppress standard UI functions.
	$( document ).on( "pagebeforecreate", function( e ) {
		$( "[data-role='datebox']", e.target ).each(function() {
			$(this).prop( "type", "text" );
		});
	});
	// Automatically bind to data-role='datebox' items.
	$( document ).on( "pagecreate create", function( e ){
		$( document ).trigger( "dateboxbeforecreate" );
		$( "[data-role='datebox']", e.target ).each(function() {
			if ( typeof $(this).data( "mobile-datebox" ) === "undefined" ) {
				$(this).datebox();
			}
		});
	});

})( jQuery );

/*! CALBOX Mode */

(function($) {
	$.extend( $.mobile.datebox.prototype.options, {
		themeDateToday: "b",
		themeDayHigh: "b",
		themeDatePick: "b",
		themeDateHigh: "b",
		themeDateHighAlt: "b",
		themeDateHighRec: "b",
		themeDate: "a",
		
		calHighToday: true,
		calHighPick: true,
		
		calShowDays: true,
		calOnlyMonth: false,
		calWeekMode: false,
		calWeekModeDay: 1,
		calControlGroup: false,
		calShowWeek: false,
		calUsePickers: false,
		calNoHeader: false,
		
		calYearPickMin: -6,
		calYearPickMax: 6,
		
		useTodayButton: false,
		useTomorrowButton: false,
		useCollapsedBut: false,
		
		highDays: false,
		highDates: false,
		highDatesRec: false,
		highDatesAlt: false,
		enableDates: false,
		calDateList: false,
		calShowDateList: false
	});
	$.extend( $.mobile.datebox.prototype, {
		_cal_gen: function (start,prev,last,other,month) {
			var rc = 0, cc = 0, day = 1, 
				next = 1, cal = [], row = [], stop = false;
				
			for ( rc = 0; rc <= 5; rc++ ) {
				if ( stop === false ) {
					row = [];
					for ( cc = 0; cc <= 6; cc++ ) {
						if ( rc === 0 && cc < start ) {
							if ( other === true ) {
								row.push([prev + (cc - start) + 1,month-1]);
							} else {
								row.push(false);
							}
						} else if ( rc > 3 && day > last ) {
							if ( other === true ) {
								row.push([next,month+1]); next++;
							} else {
								row.push(false);
							}
							stop = true;
						} else {
							row.push([day,month]); day++;
							if ( day > last ) { stop = true; }
						}
					}
					cal.push(row);
				}
			}
			return cal;
		},
		_cal_check : function (checkDates, year, month, date, done) {
			var w = this, i,
				o = this.options,
				maxDate = done.x,
				minDate = done.i,
				thisDate = done.t,
				presetDay = done.p,
				day = new this._date(year,month,date,0,0,0,0).getDay(),
				bdRec = o.blackDatesRec,
				hdRec = o.highDatesRec,
				ret = {
					ok: true,
					iso: year + "-" + w._zPad(month+1) + "-" + w._zPad(date),
					theme: o.themeDate,
					recok: true,
					rectheme: false
				};
				
			ret.comp = parseInt( ret.iso.replace( /-/g, "" ), 10 );
			
			if ( bdRec !== false ) {
				for ( i=0; i < bdRec.length; i++ ) {
					if ( 
						( bdRec[i][0] === -1 || bdRec[i][0] === year ) &&
						( bdRec[i][1] === -1 || bdRec[i][1] === month ) &&
						( bdRec[i][2] === -1 || bdRec[i][2] === date )
					) { ret.ok = false; } 
				}
			}
			
			if ( $.isArray( o.enableDates ) && $.inArray( ret.iso, o.enableDates ) < 0 ) {
				ret.ok = false;
			} else if ( checkDates ) {
				if (
					( ret.recok !== true ) ||
					( o.afterToday === true && thisDate.comp() > ret.comp ) ||
					( o.beforeToday === true && thisDate.comp() < ret.comp ) ||
					( o.notToday === true && thisDate.comp() === ret.comp ) ||
					( o.maxDays !== false && maxDate.comp() < ret.comp ) ||
					( o.minDays !== false && minDate.comp() > ret.comp ) ||
					( $.isArray(o.blackDays) && $.inArray(day, o.blackDays) > -1 ) ||
					( $.isArray(o.blackDates) && $.inArray(ret.iso, o.blackDates) > -1 ) 
				) {
					ret.ok = false;
				}
			}

			if ( $.isArray(o.whiteDates) && $.inArray(ret.iso, o.whiteDates) > -1 ) {
				ret.ok = true;
			}

			if ( ret.ok ) {
				if ( hdRec !== false ) {
					for ( i=0; i < hdRec.length; i++ ) {
						if ( 
							( hdRec[i][0] === -1 || hdRec[i][0] === year ) &&
							( hdRec[i][1] === -1 || hdRec[i][1] === month ) &&
							( hdRec[i][2] === -1 || hdRec[i][2] === date )
						) { ret.rectheme = true; } 
					}
				}
				
				if ( o.calHighPick && date === presetDay && 
						( w.d.input.val() !== "" || o.defaultValue !== false )) {
					ret.theme = o.themeDatePick;
				} else if ( o.calHighToday && ret.comp === thisDate.comp() ) {
					ret.theme = o.themeDateToday;
				} else if ( $.isArray(o.highDatesAlt) && 
						($.inArray(ret.iso, o.highDatesAlt) > -1)
					) {
					ret.theme = o.themeDateHighAlt;
				} else if ( $.isArray(o.highDates) && ($.inArray(ret.iso, o.highDates) > -1) ) {
					ret.theme = o.themeDateHigh;
				} else if ( $.isArray(o.highDays) && ($.inArray(day, o.highDays) > -1) ) {
					ret.theme = o.themeDayHigh;
				} else if ( $.isArray(o.highDatesRec) && ret.rectheme === true ) {
					ret.theme = o.themeDateHighRec;
				}
			}
			return ret;
		}
	});
	$.extend( $.mobile.datebox.prototype._build, {
		"calbox": function () {
			var tempVal, pickerControl, calContent, genny, weekdayControl, listControl,
				row, col, rows, cols, htmlRow, i, prangeS, prangeL,
				w = this,
				o = this.options,
				dList = o.calDateList,
				uid = "ui-datebox-",
				curDate = w.theDate,
				checked = false,
				checkDatesObj = {},
				minDate = w.initDate.copy(),
				maxDate = w.initDate.copy(),
				cStartDay = (curDate.copy([0],[0,0,1]).getDay() - w.__( "calStartDay" ) + 7) % 7,
				curMonth = curDate.get(1),
				curYear = curDate.get(0),
				curDateArr = curDate.getArray(),
				presetDate = ( w.d.input.val() === "" ) ?
					w._startOffset( w._makeDate( w.d.input.val() ) ) :
					w._makeDate( w.d.input.val() ),
				presetDay = -1,
				cTodayDate = new w._date(),
				cTodayDateArr = cTodayDate.getArray(),
				weekNum = curDate
					.copy( [0], [0,0,1] )
					.adj( 2, ( -1 * cStartDay ) +( w.__( "calStartDay" ) === 0 ? 1 : 0 ) )
					.getDWeek(4),
				weekModeSel = 0,
				isTrueMonth = false,
				isTrueYear = false,
				cMonthEnd = 32 - w.theDate.copy([0],[0,0,32,13]).getDate(),
				cPrevMonthEnd = 32 - w.theDate.copy([0,-1],[0,0,32,13]).getDate(),
				checkDates = ( 
						o.afterToday || o.beforeToday || o.notToday || 
						o.maxDays || o.minDays || o.blackDays || o.blackDates 
					) ?
					true :
					false;
				
			
				
			if ( typeof w.d.intHTML !== "boolean" ) { 
				w.d.intHTML.remove(); 
				w.d.intHTML = null;
			}
			
			w.d.headerText = ( ( w._grabLabel() !== false ) ? 
				w._grabLabel() :
				w.__( "titleDateDialogLabel" )
			);
			w.d.intHTML = $( "<span>" );

			$("<div class='" + uid + "gridheader'><div class='" + uid + "gridlabel'><h4>" +
				w._formatter( w.__( "calHeaderFormat" ), w.theDate ) +
				"</h4></div></div>")
					.appendTo(w.d.intHTML);
				
			// Previous and next month buttons, define booleans to decide if they should do anything
			$( "<div class='" + uid + "gridplus" + ( w.__( "isRTL" ) ? "-rtl" : "") +
					"'><a href='#'>" + w.__( "nextMonth") + "</a></div>" )
				.prependTo( w.d.intHTML.find( "." + uid + "gridheader" ) )
				.find( "a" )
					.addClass( "ui-btn-inline ui-link ui-btn ui-btn-" + 
						o.themeDate + 
						" ui-icon-arrow-r ui-btn-icon-notext ui-shadow ui-corner-all"
					)
					.on(o.clickEventAlt, function(e) {
						e.preventDefault();
						if ( w.calNext ) {
							if ( w.theDate.getDate() > 28 ) { w.theDate.setDate(1); }
							w._offset( "m", 1 );
						}
				});
			$( "<div class='" + uid + "gridminus" + ( w.__( "isRTL" ) ? "-rtl": "" ) +
					"'><a href='#'>" + w.__( "prevMonth") + "</a></div>" )
				.prependTo( w.d.intHTML.find( "." + uid + "gridheader" ) )
				.find( "a" )
					.addClass( "ui-btn-inline ui-link ui-btn ui-btn-" +
						o.themeDate +
						" ui-icon-arrow-l ui-btn-icon-notext ui-shadow ui-corner-all"
					)
					.on(o.clickEventAlt, function(e) {
						e.preventDefault();
						if ( w.calPrev ) {
							if ( w.theDate.getDate() > 28 ) { 
								w.theDate.setDate(1);
							}
							w._offset( "m", -1 );
						}
					});
				
			if ( o.calNoHeader === true ) { 
				w.d.intHTML.find( "." + uid + "gridheader" ).remove();
			}
			
			w.calNext = true;
			w.calPrev = true;
			
			if ( Math.floor( cTodayDate.comp() / 100 )  === Math.floor( curDate.comp() / 100 ) ) {
				isTrueMonth = true;
			}
			if ( Math.floor( cTodayDate.comp() / 10e3 ) === Math.floor( curDate.comp() / 10e3 ) ) {
				isTrueYear = true;	
			}
			if ( presetDate.comp() === curDate.comp() ) { presetDay = presetDate.get(2); }
			
			if ( o.afterToday === true &&
					( isTrueMonth || ( isTrueYear && cTodayDateArr[1] >= curDateArr[1] ) ) ) {
				w.calPrev = false; }
			if ( o.beforeToday === true &&
					( isTrueMonth || ( isTrueYear && cTodayDateArr[1] <= curDateArr[1] ) ) ) {
				w.calNext = false; }
			
			if ( o.minDays !== false ) {
				minDate.adj( 2, o.minDays * -1 );
				tempVal = minDate.getArray();
				if ( curDateArr[0] === tempVal[0] && curDateArr[1] <= tempVal[1] ) {
					w.calPrev = false;
				}
			}
			if ( o.maxDays !== false ) {
				maxDate.adj( 2, o.maxDays );
				tempVal = minDate.getArray();
				if ( curDateArr[0] === tempVal[0] && curDateArr[1] >= tempVal[1] ) {
					w.calNext = false;
				}
			}
			
			if ( o.calUsePickers === true ) {
				pickerControl = $("<div>", {
					"class": "ui-grid-a ui-datebox-grid",
					style: "padding-top: 5px; padding-bottom: 5px;"
				});
				
				pickerControl.a = $( "<div class='ui-block-a'><select></select></div>" )
					.appendTo( pickerControl )
					.find( "select");
				pickerControl.b = $("<div class='ui-block-b'><select></select></div>")
					.appendTo( pickerControl )
					.find( "select");
				
				for ( i=0; i<=11; i++ ) {
					pickerControl.a.append(
						$( "<option value='" + i + "'" + 
							( ( curMonth === i ) ?
								" selected='selected'" :
								""
							) + ">" + w.__( "monthsOfYear" )[ i ] + "</option>"
						)
					);
				}
				
				if ( o.calYearPickMin < 1 ) { 
					prangeS = curYear + o.calYearPickMin;
				} else if ( o.calYearPickMin < 1800 ) {
					prangeS = curYear - o.calYearPickMin;
				} else if ( o.calYearPickMin === "NOW" ) {
					prangeS = cTodayDateArr[0];
				} else {
					prangeS = o.calYearPickMin;
				}
				
				if ( o.calYearPickMax < 1800 ) {
					prangeL = curYear + o.calYearPickMax;
				} else if ( o.calYearPickMax === "NOW" ) {
					prangeL = cTodayDateArr[0];
				} else {
					prangeL = o.calYearPickMax;
				}
				for ( i = prangeS; i <= prangeL; i++ ) {
					pickerControl.b.append(
						$( "<option value='" + i + "'" + 
							( ( curYear===i ) ? " selected='selected'" : "" ) +
							 ">" + i + "</option>"
						)
					);
				}
				
				pickerControl.a.on( "change", function () {
					w.theDate.setD( 1, $( this ).val() );
					if ( w.theDate.get(1) !== parseInt( $( this ).val(), 10 ) ) {
						w.theDate.setD( 2, 0 );
					}
					w.refresh();
				});
				pickerControl.b.on( "change", function () {
					w.theDate.setD( 0, $( this ).val() );
					if (w.theDate.get(1) !== parseInt( pickerControl.a.val(), 10)) {
						w.theDate.setD( 2, 0 );
					}
					w.refresh();
				});
				
				pickerControl.find( "select" ).selectmenu( {
					mini: true,
					nativeMenu: true
				} );
				pickerControl.appendTo( w.d.intHTML );
			}
			
			calContent = $("<div class='" + uid + "grid'>" ).appendTo( w.d.intHTML );
			
			if ( o.calShowDays ) {
				w._cal_days = w.__( "daysOfWeekShort").concat( w.__( "daysOfWeekShort" ) );
				weekdayControl = $( "<div>", { "class": uid + "gridrow" } ).appendTo( calContent );

				if ( w.__( "isRTL" ) === true ) { 
					weekdayControl.css( "direction", "rtl" );
				}
				if ( o.calShowWeek ) { 
					$("<div>")
						.addClass( uid + "griddate " + uid + "griddate-label" )
						.appendTo( weekdayControl );
				}
				for ( i=0; i<=6;i++ ) {
					$( "<div>" )
						.text( w._cal_days[ ( i + w.__( "calStartDay") ) % 7 ] )
						.addClass( uid + "griddate " + uid + "griddate-label" )
						.appendTo( weekdayControl );
				}
			}

			checkDatesObj = { i: minDate, x: maxDate, t: cTodayDate, p: presetDay };
			genny = w._cal_gen(
				cStartDay,
				cPrevMonthEnd,
				cMonthEnd,
				!o.calOnlyMonth,
				curDate.get(1)
			);

			for ( row = 0, rows = genny.length; row < rows; row++ ) {
				htmlRow = $("<div>", { "class": uid + "gridrow" } );
				if ( w.__( "isRTL" ) ) { htmlRow.css( "direction", "rtl" ); }
				if ( o.calShowWeek ) {
						$("<div>", { "class": uid + "griddate " + uid + "griddate-empty" } )
							.text( "W" + weekNum )
							.appendTo( htmlRow );
						weekNum++;
						if ( weekNum > 52 && typeof(genny[ row + 1 ]) !== "undefined" ) { 
							weekNum = new w._date(
								curDateArr[0],
								curDateArr[1],
								( w.__( "calStartDay" )===0 ) ? 
									genny[ row + 1 ][ 1 ][ 0 ] :
									genny[ row + 1 ][ 0 ][ 0 ],
								0, 0, 0, 0
							).getDWeek( 4 ); }
					}
				for ( col=0, cols = genny[row].length; col < cols; col++ ) {
					if ( o.calWeekMode ) { 
						weekModeSel = genny[row][o.calWeekModeDay][0]; 
					}
					if ( typeof genny[row][col] === "boolean" ) {
						$("<div>", { 
							"class": uid + "griddate " + uid + "griddate-empty"
						} ).appendTo( htmlRow );
					} else {
						checked = w._cal_check(
							checkDates,
							curDateArr[0],
							genny[row][col][1],
							genny[row][col][0],
							checkDatesObj
						);
						if ( genny[row][col][0]) {
							$("<div>")
								.text( String( genny[row][col][0] ) )
								.addClass( curMonth === genny[row][col][1] ?
									( uid + "griddate ui-corner-all ui-btn ui-btn-" +
										checked.theme +
										( checked.ok ? "" : " ui-state-disabled" )
									) :
									( uid + "griddate " + uid + "griddate-empty" )
								)
								.css(( curMonth !== genny[row][col][1] && !o.calOnlyMonth ) ?
									{ cursor: "pointer" } :
									{}
								)
								.data( "date", 
									( ( o.calWeekMode ) ?
										weekModeSel :
										genny[row][col][0] )
								)
								.data( "enabled", checked.ok)
								.data( "month",
									genny[ row ][ ( ( o.calWeekMode ) ?
											o.calWeekModeDay :
											col
										) ][1]
								)
								.appendTo( htmlRow );
						}
					}
				}
				if ( o.calControlGroup === true ) {
					htmlRow
						.find( ".ui-corner-all" )
						.removeClass( "ui-corner-all" )
						.eq(0)
							.addClass("ui-corner-left")
							.end()
						.last()
							.addClass( "ui-corner-right" )
							.addClass( "ui-controlgroup-last" );
				}
				htmlRow.appendTo(calContent);
			}
			if ( o.calShowWeek ) { 
				calContent.find( "." + uid + "griddate" ).addClass( uid + "griddate-week" );
			}
			
			if ( o.calShowDateList === true && dList !== false ) {
				listControl = $( "<div>" );
				listControl.a = $( "<select name='pickdate'></select>" ).appendTo(listControl);
				
				listControl.a.append("<option value='false' selected='selected'>" +
					w.__( "calDateListLabel" ) + "</option>" );

				for ( i = 0; i < dList.length; i++ ) {
					listControl.a.append( 
						$( "<option value='" + dList[i][0] + "'>" + dList[i][1] + "</option>" )
					);
				}
				
				listControl.a.on( "change", function() {
					tempVal = $( this ).val().split( "-" );
					w.theDate = new w._date(tempVal[0], tempVal[1]-1, tempVal[2], 0,0,0,0);
					w._t( { method: "doset" } );
				});
				
				listControl.find( "select" ).selectmenu( { mini: true, nativeMenu: true } );
				listControl.appendTo( calContent );
			}
			
			if ( o.useTodayButton || o.useTomorrowButton || o.useClearButton ) {
				htmlRow = $("<div>", { "class": uid + "controls" } );
				
				if ( o.useTodayButton ) {
					$( "<a href='#' role='button'>" + w.__( "calTodayButtonLabel" ) + "</a>" )
						.appendTo(htmlRow)
						.addClass( "ui-btn ui-btn-" + o.theme +
							" ui-icon-navigation ui-btn-icon-left ui-shadow ui-corner-all"
						)
						.on(o.clickEvent, function(e) {
							e.preventDefault();
							w.theDate = w._pa([0,0,0], new w._date());
							w._t( { method: "doset" } );
						});
				}
				if ( o.useTomorrowButton ) {
					$( "<a href='#' role='button'>" + w.__( "calTomorrowButtonLabel" ) + "</a>" )
						.appendTo(htmlRow)
						.addClass( "ui-btn ui-btn-" + o.theme + 
							" ui-icon-navigation ui-btn-icon-left ui-shadow ui-corner-all"
						)
						.on(o.clickEvent, function(e) {
							e.preventDefault();
							w.theDate = w._pa([0,0,0], new w._date()).adj( 2, 1 );
							w._t( { method: "doset" } );
						});
				}
				if ( o.useClearButton ) {
					$( "<a href='#' role='button'>" + w.__( "clearButton" ) + "</a>" )
						.appendTo(htmlRow)
						.addClass( "ui-btn ui-btn-" + o.theme +
							" ui-icon-delete ui-btn-icon-left ui-shadow ui-corner-all"
						)
						.on(o.clickEventAlt, function(e) {
							e.preventDefault();
							w.d.input.val( "" );
							w._t( { method: "clear" } );
							w._t( { method: "close" } );
						});
				}
				if ( o.useCollapsedBut ) {
					htmlRow.addClass( "ui-datebox-collapse" );
				}
				htmlRow.appendTo( calContent );
			}
			
			w.d.intHTML.on(o.clickEventAlt, "div." + uid + "griddate", function(e) {
				e.preventDefault();
				if ( $( this ).data( "enabled" ) ) {
					w.theDate
						.setD( 2, 1 )
						.setD( 1, $( this ).jqmData( "month" ) )
						.setD( 2, $( this ).data( "date" ) );
					w._t( {
						method: "set",
						value: w._formatter( w.__fmt(),w.theDate ),
						date: w.theDate
					} );
					w._t( { method: "close" } );
				}
			});
			w.d.intHTML
				.on( "swipeleft", function() { if ( w.calNext ) { w._offset( "m", 1 ); } } )
				.on( "swiperight", function() { if ( w.calPrev ) { w._offset( "m", -1 ); } } );
			
			if ( w.wheelExists ) { // Mousewheel operations, if plugin is loaded
				w.d.intHTML.on( "mousewheel", function(e,d) {
					e.preventDefault();
					if ( d > 0 && w.calNext ) { 
						w.theDate.setD( 2, 1 );
						w._offset( "m", 1 );
					}
					if ( d < 0 && w.calPrev ) {
						w.theDate.setD( 2, 1 );
						w._offset( "m", -1 );
					}
				});
			}
		}
	});
})( jQuery );

/*! CUSTOMFLIP Mode */

(function($) {
	$.extend( $.mobile.datebox.prototype.options, {
		themeOptPick: "b",
		themeOpt: "a",
		useSetButton: true,
		customData: [ ],
		customDefault: [0,0,0],
		customDataLen: 25,
		customFormat: false,
		customHead: false,
		customfliplang: {
			// This structure interfaces with __() -> if it exists, strings are 
			// looked up here after i8n fails, and before going to 'default' - 
			// the name syntax is <mode>lang
			"customSet": "Looks Good"
		}
	});
	$.extend( $.mobile.datebox.prototype, {
		"_customflipDoSet": function () {
			// If this function exists, it overrides the "doset" method of the "datebox" event.
			// The name syntax is _<mode>DoSet
			var w = this, o = this.options;
			if ( typeof w.customCurrent === "undefined" ) {
				w.customCurrent = this._makeDate(this.d.input.val());
			}
			w._t( { 
				method: "set",
				value: w._formatter( o.customFormat, w.customCurrent ),
				custom: w.customCurrent
			});
		},
		"_cubox_offset": function (fld, amount) {
			// This is *not* an automatic override, used below specificly.
			var w = this, tmp,
				o = this.options;
				
			tmp = (w.customCurrent[fld] + amount) % o.customData[fld].data.length;
			if ( tmp < 0 ) { tmp = o.customData[fld].data.length + tmp; }
			
			w.customCurrent[fld] = tmp;
			
			if ( o.useImmediate ) { 
				w._t( { 
					method: "set",
					value: w._formatter( o.customFormat, w.customCurrent ),
					custom: w.customCurrent
				});
			}
			w.refresh();
		},
		"_cubox_arr": function (data, choice) {
			var base = data, x,
				len = this.options.customDataLen,
				before = data.slice(0,choice),
				after = data.slice(choice+1);
			
			while ( before.length < len ) {
				for ( x = base.length; x > 0; x-- ) {
					before.unshift(base[x-1]);
				}
			}
			while ( before.length > len ) {
				before.shift();
			}
			
			while ( after.length < len ) {
				for ( x = 0; x < base.length; x++ ) {
					after.push(base[x]);
				}
			}
			after.length = len;
			
			before.push(data[choice]);
			
			return $.merge($.merge([], before), after);
		},
		"_cubox_range": function(i) {
				return i?this._cubox_range(i-1).concat(i):[];
		},
		"_cubox_pos": function () {
			var pos1, ech, top, fixer,
				w = this,
				par = this.d.intHTML.find( ".ui-datebox-flipcontent" ).innerHeight();
				
			w.d.intHTML.find( ".ui-datebox-flipcenter" ).each(function() {
				ech = $( this );
				top = ech.innerHeight();
				ech.css( "top", ( ( par / 2 ) - ( top / 2 ) - 3 ) * -1 );
			});
			w.d.intHTML.find( "ul" ).each(function () {
				ech = $( this );
				par = ech.parent().innerHeight();
				top = ech.find( "li" ).first();
				fixer = ech.find( "li" ).last().offset().top - ech.find("li").first().offset().top;
				pos1 = ( ( ( fixer-par ) / 2 ) + top.outerHeight() ) * -1;
				top.css( "marginTop", pos1 );
			});
		}
	});
	$.extend( $.mobile.datebox.prototype._parser, {
		// If this stucture exists, it is called instead of the usual date input parser.
		// The name of the structure is the same as the mode name - it recieves a string
		// as the input, which is the current value of the input element, pre-sanitized
		"customflip" : function ( str ) { 
			var o = this.options,
				adv = o.customFormat,
				exp_input, exp_format, tmp, tmp2, retty_val=[0,0,0,0,0,0];

			if ( typeof(adv) !== "string" ) { adv = ""; }

			adv = adv.replace(/%X([0-5a-f])/gi, function(match, oper) {
				switch (oper) {
					case "a":
					case "b":
					case "c":
					case "d":
					case "e":
					case "f":
						return "(" + match + "|" + ".+?" + ")";
					case "0":
					case "1":
					case "2":
					case "3":
					case "4":
					case "5":
						return "(" + match + "|" + "[0-9]+" + ")";
					default:
						return ".+?";
				}
			});

			adv = new RegExp("^" + adv + "$");
			exp_input = adv.exec(str);
			exp_format = adv.exec(o.customFormat);

			if ( exp_input !== null ) {
				for ( var x = 1; x<exp_input.length; x++ ) {
					tmp = exp_format[x].charAt(2);
					if ( isNaN(parseInt(tmp)) ) {
						tmp2 = $.inArray(tmp, ["a","b","c","d","e","f"]);
						retty_val[tmp2] = $.inArray(exp_input[x], o.customData[tmp2].data);
					} else {
						retty_val[parseInt(tmp)-1] = parseInt(exp_input[x]);
					}
				}
			}

			return ( str.length < 1 || retty_val.length < 1 ) ? o.customDefault : retty_val;

		}
	});
	$.extend( $.mobile.datebox.prototype._customformat, {
		// If this stucture exists, the formatter will call it when it encounters a special string
		// %X<whatever> - it recieves the single letter operater, and the current "date" value
		"customflip" : function ( oper, val, o ) {
			var per = parseInt(oper), tmp;

			if ( typeof(per) === "number" && !isNaN(per) ) {
				return val[oper-1];
			} else {
				tmp = $.inArray(oper, ["a","b","c","d","e","f"]);
				return o.customData[tmp].data[val[tmp]];
			}
		}
	});
	$.extend( $.mobile.datebox.prototype._build, {
		// This builds the actual interface, and is called on *every* refresh. (flip triggers)
		"customflip": function () {
			var i, y, hRow, hRowIn, tmp, lineArr,
				w = this,
				o = this.options,
				uid = "ui-datebox-",
				customCurrent = this._makeDate(this.d.input.val()),
				flipBase = $("<div class='ui-overlay-shadow'><ul></ul></div>"),
				ctrl = $("<div>", {"class": uid + "flipcontent" });
			
			if ( typeof w.customCurrent === "undefined" ) { w.customCurrent = customCurrent; }
			
			if ( typeof o.customData === "string" && typeof window[o.customData] !== "undefined" ) {
				// Allow the passing of a global variable name from data-options or 
				// data-datebox-custom-data. The other option was to eval() the data, but that
				// is an ugly, ugly road to walk down.
				o.customData = window[o.customData];
			}

			if ( o.customFormat === false ) {
				tmp = [];
				for ( i = 0; i<o.customData.length; i++ ) {
					tmp.push("%X"+(i+1));
				} 
				o.customFormat = tmp.join(",");
			}
				
			if ( typeof w.d.intHTML !== "boolean" ) {
				w.d.intHTML.empty().remove();
			} else {
				w.d.input.on("datebox", function (e,p) {
					if ( p.method === "postrefresh" ) {
						w._cubox_pos();
					}
				});
			}

			w.d.headerText = ((o.customHead !== false ) ? 
				o.customHead :
				((w._grabLabel() !== false) ? w._grabLabel() : ""));
			w.d.intHTML = $("<span>");

			$(document).one( "popupafteropen", function() { 
				// This fixes bad positioning on initial open - not found a way around this yet.
				w._fbox_pos(); 
			});

			w.fldOrder = w._cubox_range(o.customData.length);

			tmp = $("<div class='" + uid + "header'>");
			if ( o.customData.length > 1 ) { 
				tmp.addClass("ui-grid-" + [0,0,"a","b","c"][o.customData.length] );
			}
			for ( y=0; y<o.customData.length; y++ ) {
				$( "<div>" )
					.addClass( ( o.customData.length > 1 ) ?
						"ui-block-" + ["a","b","c","d"][y] :
						""
					)
					.text( o.customData[ y ].name )
					.css( "textAlign", "center")
					.appendTo( tmp );
			}
			tmp.appendTo(w.d.intHTML);
			
			w.d.intHTML.append(ctrl);
			
			for ( y = 0; y < o.customData.length; y++ ) {
				lineArr = w._cubox_arr( o.customData[ y ].data, w.customCurrent[ y ] );
				hRow = w._makeEl( flipBase, { "attr": {
					"field": y,
					"amount": 1
				} });
				hRowIn = hRow.find( "ul" );
				if ( o.customData.length === 1 ) { hRow.css( "width", "90%" ); }
				for ( i=0; i < lineArr.length; i++ ) {
					tmp = ( i !== o.customDataLen ) ? o.themeOpt : o.themeOptPick;
					console.log(i + " " + o.customDataLen);
					console.log(typeof i + " " + typeof o.customDataLen);
					$( "<li>", { "class": "ui-body-" + tmp } )
						.html( "<span>" + lineArr[i] + "</span>" )
						.appendTo( hRowIn );
					} 
					hRow.appendTo(ctrl);
			}
			
			$("<div>", { "class": uid + "flipcenter ui-overlay-shadow" } )
				.css( "pointerEvents", "none")
				.appendTo( w.d.intHTML );

			if ( o.useSetButton ) {
				y = $( "<div>", { "class": uid + "controls" } );
				
				if ( o.useSetButton ) {
					$( "<a href='#' role='button'>" )
						.appendTo(y)
						.text( w.__("customSet") )
						.addClass( "ui-btn ui-btn-" + o.theme +
							" ui-icon-check ui-btn-icon-left ui-shadow ui-corner-all" )
						.on(o.clickEventAlt, function(e) {
							e.preventDefault();
							w._t( { 
								method: "set", 
								value: w._formatter( o.customFormat, w.customCurrent ),
								custom: w.customCurrent,
							} );
							w._t( { method: "close" } );
						});
				}
				y.appendTo(w.d.intHTML);
			}
			
			if ( w.wheelExists ) { // Mousewheel operation, if plugin is loaded
				w.d.intHTML.on("mousewheel", ".ui-overlay-shadow", function(e,d) {
					e.preventDefault();
					w._cubox_offset($(this).data("field"), ((d<0)?1:-1)*$(this).data("amount"));
				});
			}
			
			w.d.intHTML.on(w.drag.eStart, "ul", function(e,f) {
				if ( !w.drag.move ) {
					if ( typeof f !== "undefined" ) { e = f; }
					w.drag.move = true;
					w.drag.target = $(this).find("li").first();
					w.drag.pos = parseInt(w.drag.target.css("marginTop").replace(/px/i, ""),10);
					w.drag.start = w.touch ? e.originalEvent.changedTouches[0].pageY : e.pageY;
					w.drag.end = false;
					e.stopPropagation();
					e.preventDefault();
				}
			});
		}
	});
	$.extend( $.mobile.datebox.prototype._drag, {
		// This contains the code that the drag and drop (or touch move) code uses
		"customflip": function() {
			var w = this,
				o = this.options,
				g = this.drag;
			
			$(document).on(g.eMove, function(e) {
				if ( g.move && o.mode === "customflip" ) {
					g.end = w.touch ? e.originalEvent.changedTouches[0].pageY : e.pageY;
					g.target.css("marginTop", (g.pos + g.end - g.start) + "px");
					e.preventDefault();
					e.stopPropagation();
					return false;
				}
			});
			
			$(document).on(g.eEnd, function(e) {
				if ( g.move && o.mode === "customflip" ) {
					g.move = false;
					if ( g.end !== false ) {
						e.preventDefault();
						e.stopPropagation();
						g.tmp = g.target.parent().parent();
						w._cubox_offset(
							g.tmp.data("field"),
							(parseInt((g.start - g.end) / g.target.innerHeight(),10) *
								g.tmp.data("amount")));
					}
					g.start = false;
					g.end = false;
				}
			});
		}
	});
})( jQuery );

/*! DATEBOX mode */

(function($) {
	$.extend( $.mobile.datebox.prototype.options, {
		themeButton: "a",
		themeInput: "a",
		useSetButton: true,
		validHours: false,
		repButton: true
		
	});
	$.extend( $.mobile.datebox.prototype, {
		_dbox_run: function() {
			var w = this,
				g = this.drag,
				timer = 150;
				
			if ( g.cnt > 10 ) { timer = 100; }
			if ( g.cnt > 30 ) { timer = 50; }
			if ( g.cnt > 60 ) { timer = 20; }
			
			g.didRun = true;
			g.cnt++;
			
			w._offset( g.target[0], g.target[1], false );
			w._dbox_run_update();
			w.runButton = setTimeout(function() {w._dbox_run();}, timer);
		},
		_dbox_run_update: function(shortRun) {
			var w = this,
				o = this.options;
				
			if ( shortRun !== true ) {
				w._check();
			
				if ( o.mode === "datebox" ) {
					w.d.intHTML
						.find( ".ui-datebox-header" )
							.find( "h4" )
								.text( w._formatter( w.__( "headerFormat" ), w.theDate ) );
				}
				
				if ( o.useSetButton ) {
					if ( w.dateOK === false ) { 
						w.setBut.addClass( "ui-state-disabled" );
					} else {
						w.setBut.removeClass( "ui-state-disabled" );
					}
				}
			}
			
			w.d.divIn.find( "input" ).each(function () {
				switch ( $(this).data( "field" ) ) {
					case "y":
						$(this).val(w.theDate.get(0)); break;
					case "m":
						$(this).val(w.theDate.get(1) + 1); break;
					case "d":
						$(this).val(w.theDate.get(2)); break;
					case "h":
						if ( w.__("timeFormat") === 12 ) {
							$(this).val(w.theDate.get12hr());
						} else {
							$(this).val(w.theDate.get(3)); 
						} 
						break;
					case "i":
						$(this).val(w._zPad(w.theDate.get(4))); break;
					case "M":
						$(this).val(w.__("monthsOfYearShort")[w.theDate.get(1)]); break;
					case "a":
						$(this).val(w.__( "meridiem" )[ (w.theDate.get(3) > 11) ? 1 : 0 ] );
						break;
				}
			});
		},
		_dbox_vhour: function (delta) {
			var w = this,
				o = this.options, tmp, 
				closeya = [25,0],
				closenay = [25,0];
				
			if ( o.validHours === false ) { return true; }
			if ( $.inArray(w.theDate.getHours(), o.validHours) > -1 ) { return true; }
			
			tmp = w.theDate.getHours();
			$.each(o.validHours, function(){
				if ( ((tmp < this)?1:-1) === delta ) {
					if ( closeya[0] > Math.abs(this-tmp) ) {
						closeya = [Math.abs(this-tmp),parseInt(this,10)];
					}
				} else {
					if ( closenay[0] > Math.abs(this-tmp) ) {
						closenay = [Math.abs(this-tmp),parseInt(this,10)];
					}
				}
			});
			if ( closeya[1] !== 0 ) { w.theDate.setHours(closeya[1]); }
			else { w.theDate.setHours(closenay[1]); }
		},
		_dbox_enter: function (item) {
			var tmp,
				w = this;
			
			if ( item.data( "field" ) === "M" ) {
				tmp = $.inArray( item.val(), w.__("monthsOfYearShort") );
				if ( tmp > -1 ) { w.theDate.setMonth( tmp ); }
			}
			
			if ( item.val() !== "" && item.val().toString().search(/^[0-9]+$/) === 0 ) {
				switch ( item.data( "field" ) ) {
					case "y":
						w.theDate.setD( 0, parseInt(item.val(),10)); break;
					case "m":
						w.theDate.setD( 1, parseInt(item.val(),10)-1); break;
					case "d":
						w.theDate.setD( 2, parseInt(item.val(),10)); break;
					case "h":
						w.theDate.setD( 3, parseInt(item.val(),10)); break;
					case "i":
						w.theDate.setD( 4, parseInt(item.val(),10)); break;
				}
			}
			w.refresh();
		}
	});
	$.extend( $.mobile.datebox.prototype._build, {
		"timebox": function () {
			this._build.datebox.apply(this,[]);
		},
		"datebox": function () {
			var offAmount, i, y, tmp, 
				w = this,
				g = this.drag,
				o = this.options, 
				cnt = -2, 
				uid = "ui-datebox-",
				divBase = $( "<div>" ),
				divPlus = $( "<fieldset>" ),
				divIn = divBase.clone(),
				divMinus = divPlus.clone(),
				inBase = $("<input type='text'>")
					.addClass( "ui-input-text ui-corner-all ui-shadow-inset ui-body-"+o.themeInput),
				butBase = $( "<div></div>" ),
				butClass = "ui-btn-inline ui-link ui-btn ui-btn-" + o.themeButton +
					" ui-btn-icon-notext ui-shadow ui-corner-all";
			
			if ( typeof w.d.intHTML !== "boolean" ) {
				w.d.intHTML.empty().remove();
			}
			
			w.d.headerText = ( ( w._grabLabel() !== false ) ?
				w._grabLabel() : 
				( ( o.mode === "datebox" ) ? 
					w.__("titleDateDialogLabel") :
					w.__("titleTimeDialogLabel")
				)
			);
			w.d.intHTML = $( "<span>" );
			
			w.fldOrder = ( ( o.mode === "datebox" ) ?
				w.__("dateFieldOrder") :
				w.__("timeFieldOrder") );
			w._check();
			w._minStepFix();
			w._dbox_vhour(typeof w._dbox_delta !== "undefined" ? w._dbox_delta : 1 );
			
			if ( o.mode === "datebox" ) { 
				$( "<div class='" + uid + "header'><h4>" +
						w._formatter( w.__("headerFormat"), w.theDate ) + "</h4></div>")
					.appendTo(w.d.intHTML); 
			}
			
			for(i = 0; i < w.fldOrder.length; i++) {
				tmp = ["a","b","c","d","e","f"][i];
				if ( w.fldOrder[i] === "i" ) { 
					offAmount = o.minuteStep; 
				} else { 
					offAmount = 1;
				}
				if ( w.fldOrder[i] !== "a" || w.__("timeFormat") === 12 ) {
					$("<div>")
						.append( w._makeEl(inBase, {"attr": {
							"field": w.fldOrder[i],
							"amount": offAmount
						} } ) )
						.addClass("ui-block-"+tmp)
						.appendTo(divIn);
					w._makeEl( butBase, {"attr": {
							"field": w.fldOrder[i],
							"amount": offAmount 
						} } )
						.addClass( uid + "cbut ui-block-" + tmp + " ui-icon-plus " + butClass)
						.appendTo( divPlus );
					w._makeEl( butBase, {"attr": {
							"field": w.fldOrder[i],
							"amount": offAmount  * -1
						} } )
						.addClass( uid + "cbut ui-block-" + tmp + " ui-icon-minus " + butClass)
						.appendTo( divMinus );
					cnt++;
				}
			}
			
			divPlus
				.addClass("ui-grid-"+["a","b","c","d","e"][cnt])
				.appendTo(w.d.intHTML);
				
			divIn
				.addClass("ui-datebox-dboxin")
				.addClass("ui-grid-"+["a","b","c","d","e"][cnt])
				.appendTo(w.d.intHTML);
				
			divMinus
				.addClass("ui-grid-"+["a","b","c","d","e"][cnt])
				.appendTo(w.d.intHTML);
			
			w.d.divIn = divIn;
			w._dbox_run_update(true);
			
			if ( w.dateOK !== true ) {
				divIn.find( "input" ).addClass( "ui-state-disable" );
			} else {
				divIn.find( ".ui-state-disable" ).removeClass( "ui-state-disable" );
			}
			
			if ( o.useSetButton || o.useClearButton ) {
				y = $( "<div>", { "class": uid + "controls" } );
				
				if ( o.useSetButton ) {
					w.setBut = $( "<a href='#' role='button'>" )
						.appendTo(y)
						.text((o.mode==="datebox") ? 
							w.__("setDateButtonLabel") :
							w.__("setTimeButtonLabel"))
						.addClass( "ui-btn ui-btn-" + o.theme +
							" ui-icon-check ui-btn-icon-left ui-shadow ui-corner-all" )
						.on(o.clickEventAlt, function(e) {
							e.preventDefault();
							if ( w.dateOK === true ) {
								w._t( { 
									method: "set", 
									value: w._formatter(w.__fmt(),w.theDate),
									date: w.theDate
								} );
								w._t( { method: "close" } );
							}
							
						});
				}
				if ( o.useClearButton ) {
					$( "<a href='#' role='button'>" + w.__( "clearButton" ) + "</a>" )
						.appendTo(y)
						.addClass( "ui-btn ui-btn-" + o.theme +
							" ui-icon-delete ui-btn-icon-left ui-shadow ui-corner-all" )
						.on(o.clickEventAlt, function(e) {
							e.preventDefault();
							w.d.input.val("");
							w._t( { method: "clear" } );
							w._t( { method: "close" } );
						});
				}
				if ( o.useCollapsedBut ) {
					y.addClass("ui-datebox-collapse");
				}
				y.appendTo(w.d.intHTML);
			}
			
			if ( o.repButton === false ) {
				w.d.intHTML.on(o.clickEvent, "."+ uid + "cbut", function(e) {
					divIn.find(":focus").blur();
					e.preventDefault();
					w._dbox_delta = ($(this).data("amount")>1) ? 1 : -1;
					w._offset($(this).data("field"), $(this).data("amount"));
				});
			}
			
			divIn.on("change", "input", function() { w._dbox_enter($(this)); });
					
			if ( w.wheelExists ) { // Mousewheel operation, if plugin is loaded
				divIn.on("mousewheel", "input", function(e,d) {
					e.preventDefault();
					w._dbox_delta = d<0?-1:1;
					w._offset($(this).data("field"), ((d<0)?-1:1)*$(this).data("amount"));
				});
			}
			
			if ( o.repButton === true ) {
				w.d.intHTML.on(g.eStart, "."+ uid + "cbut", function() {
					divIn.find(":focus").blur();
					tmp = [$(this).data("field"), $(this).data("amount")];
					g.move = true;
					g.cnt = 0;
					w._dbox_delta = ($(this).data("amount")>1) ? 1 : -1;
					w._offset(tmp[0], tmp[1], false);
					w._dbox_run_update();
					if ( !w.runButton ) {
						g.target = tmp;
						w.runButton = setTimeout(function() {w._dbox_run();}, 500);
					}
				});
				w.d.intHTML.on(g.eEndA, "." + uid + "cbut", function(e) {
					if ( g.move ) {
						e.preventDefault();
						clearTimeout(w.runButton);
						w.runButton = false;
						g.move = false;
					}
				});
			}
		}
	});
})( jQuery );

/*! DurationBox Mode */

(function($) {
	$.extend( $.mobile.datebox.prototype.options, {
		themeButton: "a",
		themeInput: "a",
		useSetButton: true,
		repButton: true,
		durationSteppers: {"d": 1, "h": 1, "i": 1, "s": 1}
	});
	$.extend( $.mobile.datebox.prototype, {
		_durbox_run: function() {
			var w = this,
				g = this.drag,
				timer = 150;
				
			if ( g.cnt > 10 ) { timer = 100; }
			if ( g.cnt > 30 ) { timer = 50; }
			if ( g.cnt > 60 ) { timer = 20; }
			if ( g.cnt > 120 ) { timer = 10; }
			if ( g.cnt > 240 ) { timer = 3; }
			
			g.cnt++;
			g.didRun = true;
			w._offset(g.target[0], g.target[1], false);
			w._durbox_run_update();
			w.runButton = setTimeout(function() {w._durbox_run();}, timer);
		},
		_durbox_run_update: function () {
			var w = this, i, cDur = [],
				ival = {"d": 60*60*24, "h": 60*60, "i": 60};

			i = w.theDate.getEpoch() - w.initDate.getEpoch();
			if ( i<0 ) { i = 0; w.theDate.setTime(w.initDate.getTime()); }
			w.lastDuration = i; // Let the number of seconds be sort of public.
			
			// DAYS 
			cDur[0] = parseInt( i / ival.d,10); i = i % ival.d;
			// HOURS 
			cDur[1] = parseInt( i / ival.h, 10); i = i % ival.h;
			// MINS AND SECS 
			cDur[2] = parseInt( i / ival.i, 10);
			cDur[3] = i % ival.i;

			w.d.divIn.find("input").each(function () {
				switch ( $(this).data("field") ) {
					case "d":
						$(this).val(cDur[0]); break;
					case "h":
						$(this).val(cDur[1]); break;
					case "i":
						$(this).val(cDur[2]); break;
					case "s":
						$(this).val(cDur[3]); break;
				}
			});
		},
		_durbox_valid: function (num) {
			if ( num.toString().search(/^[0-9]+$/) === 0 ) { return parseInt(num,10); }
			return 0;
		},
		_durbox_enter: function () {
			var w = this,
				t = w.initDate.getEpoch();
				
			w.d.intHTML.find("input").each( function() {
				switch ( $(this).data("field") ) {
					case "d":
						t += (60*60*24) * w._durbox_valid($(this).val()); break;
					case "h":
						t += (60*60) * w._durbox_valid($(this).val()); break;
					case "i":
						t += (60) * w._durbox_valid($(this).val()); break;
					case "s":
						t += w._durbox_valid($(this).val()); break;
				}
			});
			w.theDate.setTime( t * 1000 );
			w.refresh();
		}
	});
	$.extend( $.mobile.datebox.prototype._build, {
		"durationbox": function () {
			var i, y, tmp, offAmount,
				w = this,
				g = this.drag,
				o = this.options,
				uid = "ui-datebox-",
				divBase = $( "<div>" ),
				divPlus = $( "<fieldset>" ),
				divIn = divBase.clone().addClass("ui-datebox-dboxin"),
				divMinus = divPlus.clone(),
				inBase = $("<input type='text'>")
					.addClass( "ui-input-text ui-corner-all ui-shadow-inset ui-body-"+o.themeInput),
				butBase = $( "<div></div>" ),
				butClass = "ui-btn-inline ui-link ui-btn ui-btn-" + o.themeButton +
					" ui-btn-icon-notext ui-shadow ui-corner-all";
			
			if ( typeof w.d.intHTML !== "boolean" ) {
				w.d.intHTML.empty().remove();
			}
			
			w.d.headerText = ((w._grabLabel() !== false) ?
				w._grabLabel() :
				w.__("titleTimeDialogLabel"));
			w.d.intHTML = $( "<span>" );
			
			w.fldOrder = w.__("durationOrder");
			
			for(i = 0; i < w.fldOrder.length; i++) {
				tmp = ["a","b","c","d","e","f"][i];
				y = $.inArray(w.fldOrder[i], ["d","h","i","s"]);
				offAmount = o.durationSteppers[w.fldOrder[i]];
				
				$("<div>")
					.append( w._makeEl(inBase, {"attr": {
						"field": w.fldOrder[i],
						"amount": offAmount
					} } ) )
					.addClass("ui-block-"+tmp)
					.appendTo(divIn)
					.prepend( "<label>" + w.__("durationLabel")[y] + "</label>");
				w._makeEl( butBase, {"attr": {
						"field": w.fldOrder[i],
						"amount": 1 * offAmount
					} } )
					.addClass( uid + "cbut ui-block-" + tmp + " ui-icon-plus " + butClass)
					.appendTo( divPlus );
				w._makeEl( butBase, {"attr": {
						"field": w.fldOrder[i],
						"amount": -1 * offAmount
					} } )
					.addClass( uid + "cbut ui-block-" + tmp + " ui-icon-minus " + butClass)
					.appendTo( divMinus );
			}

			w.d.divIn = divIn;
			w._durbox_run_update();
			
			divPlus.addClass("ui-grid-"+["a","b","c"][w.fldOrder.length-2]).appendTo(w.d.intHTML);
			divIn.addClass("ui-grid-"+["a","b","c"][w.fldOrder.length-2]).appendTo(w.d.intHTML);
			divMinus.addClass("ui-grid-"+["a","b","c"][w.fldOrder.length-2]).appendTo(w.d.intHTML);
			
			if ( o.useSetButton || o.useClearButton ) {
				y = $( "<div>", { "class": uid + "controls" } );
				
				if ( o.useSetButton ) {
					$( "<a href='#' role='button'>" )
						.appendTo(y)
						.text( w.__("setDurationButtonLabel") )
						.addClass( "ui-btn ui-btn-" + o.theme +
							" ui-icon-check ui-btn-icon-left ui-shadow ui-corner-all" )
						.on(o.clickEventAlt, function(e) {
							e.preventDefault();
							w._t( { 
								method: "set", 
								value: w._formatter(w.__fmt(),w.theDate),
								date: w.theDate
							} );
							w._t( { method: "close" } );
						});
				}
				if ( o.useClearButton ) {
					$( "<a href='#' role='button'>" + w.__( "clearButton" ) + "</a>" )
						.appendTo(y)
						.addClass( "ui-btn ui-btn-" + o.theme +
							" ui-icon-delete ui-btn-icon-left ui-shadow ui-corner-all" )
						.on(o.clickEventAlt, function(e) {
							e.preventDefault();
							w.d.input.val("");
							w._t( { method: "clear" } );
							w._t( { method: "close" } );
						});
				}
				
				if ( o.useCollapsedBut ) {
					y.addClass("ui-datebox-collapse");
				}
				y.appendTo(w.d.intHTML);
			}
			
			if ( o.repButton === false ) {
				w.d.intHTML.on(o.clickEvent, "."+ uid + "cbut", function(e) {
					divIn.find(":focus").blur();
					e.preventDefault();
					w._dbox_delta = ($(this).data("amount")>1) ? 1 : -1;
					w._offset($(this).data("field"), $(this).data("amount"));
				});
			}
			
			divIn.on("change", "input", function() { w._durbox_enter($(this)); });
					
			if ( w.wheelExists ) { // Mousewheel operation, if plugin is loaded
				divIn.on("mousewheel", "input", function(e,d) {
					e.preventDefault();
					w._offset($(this).data("field"), ((d<0)?-1:1)*$(this).data("amount"));
				});
			}
			
			if ( o.repButton === true ) {
				w.d.intHTML.on(g.eStart, "."+ uid + "cbut", function() {
					divIn.find(":focus").blur();
					tmp = [$(this).data("field"), $(this).data("amount")];
					g.move = true;
					g.cnt = 0;
					w._dbox_delta = ($(this).data("amount")>1) ? 1 : -1;
					w._offset(tmp[0], tmp[1], false);
					w._durbox_run_update();
					if ( !w.runButton ) {
						g.target = tmp;
						w.runButton = setTimeout(function() {w._durbox_run();}, 500);
					}
				});
				w.d.intHTML.on(g.eEndA, "."+ uid + "cbut", function(e) {
					if ( g.move ) {
						e.preventDefault();
						clearTimeout(w.runButton);
						w.runButton = false;
						g.move = false;
					}
				});
			}
		}
	});
})( jQuery );

/*! DurationFlipBox Mode */

(function($) {
	$.extend( $.mobile.datebox.prototype.options, {
		themeDatePick: "b",
		themeDate: "a",
		useSetButton: true,
		durationSteppers: {
			"d": 1,
			"h": 1,
			"i": 1,
			"s": 1
		}
	});
	$.extend( $.mobile.datebox.prototype, {
		"_durfbox_pos": function () {
				var pos1, ech, top, fixer,
				w = this,
				par = this.d.intHTML.find( ".ui-datebox-flipcontent" ).innerHeight();
				
			w.d.intHTML.find( ".ui-datebox-flipcenter" ).each(function() {
				ech = $( this );
				top = ech.innerHeight();
				ech.css( "top", ( ( par / 2 ) - ( top / 2 ) - 3 ) * -1 );
			});
			w.d.intHTML.find("ul").each(function () {
				ech = $( this );
				par = ech.parent().innerHeight();
				top = ech.find( "li" ).first();
				fixer = ech.find( "li" ).last().offset().top - ech.find("li").first().offset().top;
				pos1 = ( ( ( fixer-par ) / 2 ) + top.outerHeight() ) * -1;
				top.css( "marginTop", pos1 );
			});
		},
		"_durfbox_series": function (middle, side, type) {
			var nxt, prv,
				o = this.options,
				ret = [ [ middle.toString(), middle ] ];
			 
			for ( var i = 1; i <= side; i++ ) {
				nxt = middle + ( i * o.durationSteppers[type] );
				prv = middle - ( i * o.durationSteppers[type] );
				ret.unshift([nxt.toString(), nxt]);
				if ( prv > -1 ) {
					ret.push([prv.toString(), prv]);
				} else {
					ret.push(["",-1]);
				}
			}
			return ret;
		}
	});
	$.extend( $.mobile.datebox.prototype._build, {
		"durationflipbox": function () {
			var  i, y, hRow, hRowIn, tmp, stdPos, curFld,
				w = this,
				o = this.options,
				sel = ["d", "h", "i", "s"],
				gridLab = [0, 0, "a", "b", "c"],
				blockLab = ["a","b","c","d"],
				cDur = [0,0,0,0],
				cDurS = {},
				uid = "ui-datebox-",
				flipBase = $("<div class='ui-overlay-shadow'><ul></ul></div>"),
				ctrl = $("<div>", { "class" : uid + "flipcontent" + " " + uid + "flipcontentd" } ),
				ival = {
					"d": 60*60*24,
					"h": 60*60,
					"i": 60
				};
			
			if ( typeof w.d.intHTML !== "boolean" ) {
				w.d.intHTML.empty().remove();
			}
			
			w.d.input.on( "datebox", function (e,p) {
				if ( p.method === "postrefresh" ) { w._durfbox_pos(); }
			});
			
			w.d.headerText = ( ( w._grabLabel() !== false ) ? 
				w._grabLabel() :
				w.__("titleDateDialogLabel")
			);
			w.d.intHTML = $( "<span>" );

			$(document).one( "popupafteropen", function() { 
				// This fixes bad positioning on initial open - not found a way around this yet.
				w._fbox_pos(); 
			});

			w.fldOrder = w.__( "durationOrder" );
			
			tmp = $( "<div class='" + uid + "header ui-grid-" +
				gridLab[w.fldOrder.length] + "'></div>");
				
			for ( y = 0; y < w.fldOrder.length; y++ ) {
				$("<div class='ui-block-" + blockLab[ y ] + "'>" + 
						w.__( "durationLabel" )[ $.inArray( w.fldOrder[y], sel ) ] + 
						"</div>"
					)
					.css( "textAlign", "center")
					.appendTo(tmp);
			}
			tmp.appendTo(w.d.intHTML);
			
			w.d.intHTML.append(ctrl);
			
			i = w.theDate.getEpoch() - w.initDate.getEpoch();
			if ( i < 0 ) { i = 0; w.theDate.setTime(w.initDate.getTime()); }
			w.lastDuration = i; // Let the number of seconds be sort of public.
			
			// SPLIT TIME INTO DAYS, HRS, MIN, SEC
			cDur[0] = parseInt( i / ival.d, 10); i = i % ival.d;
			cDur[1] = parseInt( i / ival.h, 10); i = i % ival.h;
			cDur[2] = parseInt( i / ival.i, 10);
			cDur[3] = i % ival.i;
			
			cDurS.d = w._durfbox_series(cDur[0],16,"d");
			cDurS.h = w._durfbox_series(cDur[1],16,"h");
			cDurS.i = w._durfbox_series(cDur[2],20,"i");
			cDurS.s = w._durfbox_series(cDur[3],20,"s");
			
			for ( y = 0; y < w.fldOrder.length; y++ ) {
				stdPos = w.fldOrder[ y ];
				curFld = cDur[ $.inArray( stdPos, sel ) ];

				hRow = w._makeEl( flipBase, { "attr": { 
					"field": stdPos,
					"amount": o.durationSteppers[ stdPos ]
				} });
				hRowIn = hRow.find( "ul" );

				for ( i in cDurS[ stdPos ] ) {
					tmp = (cDurS[ stdPos ][ i ][ 1 ] !== curFld ) ?
						o.themeDate :
						o.themeDatePick;
					$("<li>", { "class" : "ui-body-" + tmp } )
						.html( "<span>" + cDurS[ stdPos ][ i ][ 0 ] + "</span>" )
						.appendTo( hRowIn );
				}
				hRow.appendTo(ctrl);
			}
			
			$("<div>", { "class": uid + "flipcenter ui-overlay-shadow" } )
				.css( "pointerEvents", "none")
				.appendTo( w.d.intHTML );
			
			if ( o.useSetButton || o.useClearButton ) {
				y = $( "<div>", { "class": uid + "controls" } );
				
				if ( o.useSetButton ) {
					$( "<a href='#' role='button'>" )
						.appendTo(y)
						.text( w.__( "setDurationButtonLabel") )
						.addClass( "ui-btn ui-btn-" + o.theme +
							" ui-icon-check ui-btn-icon-left ui-shadow ui-corner-all" )
						.on(o.clickEventAlt, function(e) {
							e.preventDefault();
							w._t( { 
								method: "set", 
								value: w._formatter(w.__fmt(),w.theDate),
								date: w.theDate,
								duration: i
							} );
							w._t( { method: "close" } );
						});
				}
				if ( o.useClearButton ) {
					$( "<a href='#' role='button'>" + w.__( "clearButton" ) + "</a>" )
						.appendTo(y)
						.addClass( "ui-btn ui-btn-" + o.theme +
							" ui-icon-delete ui-btn-icon-left ui-shadow ui-corner-all" )
						.on(o.clickEventAlt, function(e) {
							e.preventDefault();
							w.d.input.val("");
							w._t( { method: "clear" } );
							w._t( { method: "close" } );
						});
				}
				if ( o.useCollapsedBut ) {
					y.addClass( "ui-datebox-collapse" );
				}
				y.appendTo(w.d.intHTML);
			}
			
			if ( w.wheelExists ) { // Mousewheel operation, if plugin is loaded
				w.d.intHTML.on( "mousewheel", ".ui-overlay-shadow", function(e,d) {
					e.preventDefault();
					w._offset($(this).data("field"), ((d<0)?-1:1)*$(this).data("amount"));
				});
			}
			
			w.d.intHTML.on(w.drag.eStart, "ul", function(e,f) {
				if ( !w.drag.move ) {
					if ( typeof f !== "undefined" ) { e = f; }
					w.drag.move = true;
					w.drag.target = $(this).find("li").first();
					w.drag.pos = parseInt(w.drag.target.css("marginTop").replace(/px/i, ""),10);
					w.drag.start = w.touch ? e.originalEvent.changedTouches[0].pageY : e.pageY;
					w.drag.end = false;
					e.stopPropagation();
					e.preventDefault();
				}
			});
		}
	});
	$.extend( $.mobile.datebox.prototype._drag, {
		"durationflipbox": function() {
			var w = this,
				o = this.options,
				g = this.drag;
			
			$(document).on(g.eMove, function(e) {
				if ( g.move && o.mode === "durationflipbox" ) {
					g.end = w.touch ? e.originalEvent.changedTouches[0].pageY : e.pageY;
					g.target.css( "marginTop", (g.pos + g.end - g.start) + "px");
					e.preventDefault();
					e.stopPropagation();
					return false;
				}
			});
			
			$(document).on(g.eEnd, function(e) {
				if ( g.move && o.mode === "durationflipbox" ) {
					g.move = false;
					if ( g.end !== false ) {
						e.preventDefault();
						e.stopPropagation();
						g.tmp = g.target.parent().parent();
						w._offset(
							g.tmp.data( "field"),
							(parseInt((g.start - g.end) / g.target.innerHeight(),10) *
								g.tmp.data( "amount" ) *-1 ));
					}
					g.start = false;
					g.end = false;
				}
			});
		}
	});
})( jQuery );

/*! FLIPBOX Mode */

(function($) {
	$.extend( $.mobile.datebox.prototype.options, {
		themeDateHigh: "b",
		themeDatePick: "b",
		themeDate: "a",
		useSetButton: true,
		validHours: false,
		flen: { 
			"y": 15,
			"m": 12,
			"d": 20,
			"h": 12,
			"i": 15,
			"a": 3
		}
	});
	$.extend( $.mobile.datebox.prototype, {
		"_fbox_pos": function () {
			var pos1, ech, top, fixer,
				w = this,
				par = this.d.intHTML.find( ".ui-datebox-flipcontent" ).innerHeight();
				
			w.d.intHTML.find( ".ui-datebox-flipcenter" ).each(function() {
				ech = $( this );
				top = ech.innerHeight();
				ech.css( "top", ( ( par / 2 ) - ( top / 2 ) - 3 ) * -1 );
			});
			w.d.intHTML.find( "ul" ).each(function () {
				ech = $( this );
				par = ech.parent().innerHeight();
				top = ech.find( "li" ).first();
				fixer = ech.find( "li" ).last().offset().top - ech.find("li").first().offset().top;
				pos1 = ( ( ( fixer-par ) / 2 ) + top.outerHeight() ) * -1;
				top.css( "marginTop", pos1 );
			});
			
		}
	});
	$.extend( $.mobile.datebox.prototype._build, {
		"timeflipbox": function() {
			this._build.flipbox.apply(this);
		},
		"flipbox": function () {
			var i, y, hRow, tmp, testDate, hRowIn,
				w = this,
				o = this.options, 
				iDate = (w.d.input.val() === "") ?
					w._startOffset(w._makeDate(w.d.input.val())) :
					w._makeDate(w.d.input.val()),
				uid = "ui-datebox-",
				flipBase = $( "<div class='ui-overlay-shadow'><ul></ul></div>" ),
				ctrl = $( "<div>", { "class": uid+"flipcontent" } );

			if ( typeof w.d.intHTML !== "boolean" ) {
				w.d.intHTML.empty().remove();
			} else {
				w.d.input.on( "datebox", function (e,p) {
					if ( p.method === "postrefresh" ) {
						w._fbox_pos();
					}
				});
			}

			w.d.headerText = ( ( w._grabLabel() !== false) ? 
				w._grabLabel() : 
				( (o.mode === "flipbox") ?
					w.__( "titleDateDialogLabel" ) :
					w.__( "titleTimeDialogLabel" ) 
				)
			);
			w.d.intHTML = $( "<span>" );

			$(document).one( "popupafteropen", function() { 
				// This fixes bad positioning on initial open - not found a way around this yet.
				w._fbox_pos(); 
			});

			w.fldOrder = ( o.mode === "flipbox" ) ?
				w.__( "dateFieldOrder" ) :
				w.__( "timeFieldOrder" );
			w._check();
			w._minStepFix();

			if ( o.mode === "flipbox" ) { 
				$("<div class='" + uid + "header'><h4>" +
						w._formatter(w.__( "headerFormat"), w.theDate) + "</h4></div>")
					.appendTo(w.d.intHTML); 
			}

			for ( y=0; y<w.fldOrder.length; y++ ) {
				hRow = w._makeEl( flipBase, { "attr": { 
					"field": w.fldOrder[y],
					"amount": 1
				} } );
				hRowIn = hRow.find( "ul" );
						
				switch (w.fldOrder[y]) {
					case "y":
						for ( i = o.flen.y * -1; i < ( o.flen.y + 1 ); i++ ) {
							tmp = ( i !== 0 ) ?
								( ( iDate.get(0) === ( w.theDate.get(0) + i ) ) ?
									o.themeDateHigh :
									o.themeDate
								) :
								o.themeDatePick;
							$( "<li>", { "class": "ui-body-" + tmp } )
								.html( "<span>" + ( w.theDate.get(0) + i ) + "</span>" )
								.appendTo( hRowIn );
						}
						break;
					case "m":
						for ( i = o.flen.m * -1; i < ( o.flen.m + 1 ); i++ ) {
							testDate = w.theDate.copy( [0], [0,0,1] );
							testDate.adj( 1, i );
							tmp = ( i !== 0 ) ?
								( ( iDate.get(1) === testDate.get(1) &&
										iDate.get(0) === testDate.get(0) ) ? 
									o.themeDateHigh : 
									o.themeDate
								) :
								o.themeDatePick;
							$("<li>", { "class" : "ui-body-" + tmp } )
								.html( "<span>" + w.__("monthsOfYearShort")[ testDate.getMonth() ] +
									"</span>" )
								.appendTo( hRowIn );
						}
						break;
					case "d":
						for ( i = o.flen.d * -1; i < ( o.flen.d + 1 ); i++ ) {
							testDate = w.theDate.copy();
							testDate.adj( 2, i );
							tmp = ( i !== 0 ) ?
								( ( iDate.comp() === testDate.comp() ) ?
									o.themeDateHigh :
									o.themeDate
								) :
								o.themeDatePick;
							if ( ( $.inArray(testDate.iso(), o.blackDates) > -1 ||
									$.inArray(testDate.getDay(), o.blackDays) > -1 ) &&
									( $.inArray(testDate.iso(), o.whiteDates) < 0 ) ) { 
								tmp += " ui-state-disabled"; }
							
							$("<li>", { "class" : "ui-body-" + tmp } )
								.html( "<span>" + testDate.getDate() + "</span>" )
								.appendTo( hRowIn );
						}
						break;
					case "h":
						for ( i = o.flen.h * -1; i < ( o.flen.h + 1 ); i++ ) {
							testDate = w.theDate.copy();
							testDate.adj( 3, i );
							tmp = ( i !== 0 ) ?
								o.themeDate :
								o.themeDatePick;
							if ( o.validHours !== false &&
									$.inArray(testDate.get(3), o.validHours) < 0 ) {
								tmp += " " + uid + "griddate-disable";
							}
							$("<li>", { "class" : "ui-body-" + tmp } )
								.html( "<span>" + ( ( w.__("timeFormat") === 12 ) ?
									testDate.get12hr() :
									testDate.get(3) ) + "</span>"
								)
								.appendTo( hRowIn );
						}
						break;
					case "i":
						hRow.data( "amount", o.minuteStep );
						for ( i = o.flen.i * -1; i < ( o.flen.i + 1 ); i++ ) {
							testDate = w.theDate.copy();
							testDate.adj( 4, ( i * o.minuteStep ) );
							tmp = ( i !== 0 ) ?
								o.themeDate :
								o.themeDatePick;
							$("<li>", { "class" : "ui-body-" + tmp } )
								.html( "<span>" + w._zPad( testDate.get( 4 ) ) + "</span>" )
								.appendTo( hRowIn );
						}
						break;
					case "a":
						if ( w.__( "timeFormat" ) !== 12 ) { hRow = false; break; }
						
						testDate = $( "<li class='ui-body-" + o.themeDate + "'><span></span></li>");
						
						for ( i = 0; i < o.flen.a; i++ ) { testDate.clone().appendTo( hRowIn ); }
						if ( w.theDate.get(3) < 12 ) { testDate.clone().appendTo( hRowIn ); }
						
						tmp = (w.theDate.get(3) > 11) ?
							[o.themeDate,o.themeDatePick] :
							[o.themeDatePick,o.themeDate];
						
						$("<li>", { "class" : "ui-body-" + tmp[0] } )
							.html( "<span>" + w.__( "meridiem" )[0] + "</span>" )
							.appendTo( hRowIn );
						$("<li>", { "class" : "ui-body-" + tmp[1] } )
							.html( "<span>" + w.__( "meridiem" )[1] + "</span>" )
							.appendTo( hRowIn );
						
						if ( w.theDate.get(3) > 11 ) { testDate.clone().appendTo( hRowIn ); }
						for ( i = 0; i < o.flen.a; i++ ) { testDate.clone().appendTo( hRowIn ); }
						
						break;
					default:
						hRow = false; break;
				}
				if ( hRow !== false ) { hRow.appendTo( ctrl ); }
			}
			
			w.d.intHTML.append( ctrl );
			
			$("<div>", { "class": uid + "flipcenter ui-overlay-shadow" } )
				.css( "pointerEvents", "none")
				.appendTo( w.d.intHTML );
			
			if ( o.useSetButton || o.useClearButton ) {
				y = $( "<div>", { "class": uid + "controls" } );
				
				if ( o.useSetButton ) {
					$( "<a href='#' role='button'>" )
						.appendTo(y)
						.text(( o.mode === "flipbox") ?
							w.__( "setDateButtonLabel") :
							w.__( "setTimeButtonLabel")
						)
						.addClass( "ui-btn ui-btn-" + o.theme + 
							" ui-icon-check ui-btn-icon-left ui-shadow ui-corner-all" )
						.on(o.clickEventAlt, function(e) {
							e.preventDefault();
							if ( w.dateOK === true ) {
								w._t( { 
									method: "set", 
									value: w._formatter(w.__fmt(),w.theDate),
									date: w.theDate
								} );
								w._t( { method: "close" } );
							}
							
						});
				}
					
				if ( o.useClearButton ) {
					$( "<a href='#' role='button'>" + w.__( "clearButton" ) + "</a>" )
						.appendTo(y)
						.addClass( "ui-btn ui-btn-" + o.theme +
							" ui-icon-delete ui-btn-icon-left ui-shadow ui-corner-all" )
						.on(o.clickEventAlt, function(e) {
							e.preventDefault();
							w.d.input.val( "" ); 
							w._t( { method: "clear" } );
							w._t( { method: "close" } );
						});
				}
				if ( o.useCollapsedBut ) {
					y.addClass( "ui-datebox-collapse" );
				}
				y.appendTo(w.d.intHTML);
			}
			
			if ( w.wheelExists ) { // Mousewheel operation, if plugin is loaded
				w.d.intHTML.on( "mousewheel", ".ui-overlay-shadow", function(e,d) {
					e.preventDefault();
					w._offset($(this).data("field"), ((d<0)?-1:1)*$(this).data("amount"));
				});
			}
			
			w.d.intHTML.on(w.drag.eStart, "ul", function(e,f) {
				if ( !w.drag.move ) {
					if ( typeof f !== "undefined" ) { e = f; }
					w.drag.move = true;
					w.drag.target = $(this).find( "li" ).first();
					w.drag.pos = parseInt(w.drag.target.css("marginTop").replace(/px/i, ""),10);
					w.drag.start = w.touch ? e.originalEvent.changedTouches[0].pageY : e.pageY;
					w.drag.end = false;
					e.stopPropagation();
					e.preventDefault();
				}
			});
			
			// Used only on old browsers and IE.
			w.d.intHTML.on(w.drag.eStart, "." + uid + "flipcenter", function(e) { 
				if ( !w.drag.move ) {
					w.drag.target = w.touch ? 
						e.originalEvent.changedTouches[0].pageX - $(e.currentTarget).offset().left :
						e.pageX - $(e.currentTarget).offset().left;
						
					w.drag.tmp = w.d.intHTML.find("." + uid + "flipcenter").innerWidth() / 
						(( $.inArray("a", w.fldOrder) > -1 && w.__("timeFormat") !== 12 ) ?
							w.fldOrder.length-1 :
							w.fldOrder.length
						);
						
					$(w.d.intHTML.find("ul").get(parseInt(w.drag.target / w.drag.tmp,10)))
						.trigger(w.drag.eStart,e);
				}
			});
		}
	});
	$.extend( $.mobile.datebox.prototype._drag, {
		"timeflipbox": function() {
			this._drag.flipbox.apply(this);
		},
		"flipbox": function() {
			var w = this,
				o = this.options,
				g = this.drag;
			
			$(document).on(g.eMove, function(e) {
				if ( g.move && ( o.mode === "flipbox" || o.mode === "timeflipbox" )) {
					g.end = w.touch ? e.originalEvent.changedTouches[0].pageY : e.pageY;
					g.target.css("marginTop", (g.pos + g.end - g.start) + "px");
					e.preventDefault();
					e.stopPropagation();
					return false;
				}
			});
			
			$(document).on(g.eEnd, function(e) {
				if ( g.move && (o.mode === "flipbox" || o.mode === "timeflipbox" )) {
					g.move = false;
					if ( g.end !== false ) {
						e.preventDefault();
						e.stopPropagation();
						g.tmp = g.target.parent().parent();
						w._offset(
							g.tmp.data("field"),
							(parseInt((g.start - g.end) / g.target.innerHeight(),10) *
								g.tmp.data( "amount" )));
					}
					g.start = false;
					g.end = false;
				}
			});
		}
	});
})( jQuery );

/*! SLIDEBOX Mode */

(function($) {
	$.extend( $.mobile.datebox.prototype.options, {
		themeDateHigh: "b",
		themeDatePick: "b",
		themeDate: "a",
		useSetButton: true,
		validHours: false,
		slen: {
			"y": 5, 
			"m": 6, 
			"d": 15, 
			"h": 12, 
			"i":30
		}
	});
	$.extend( $.mobile.datebox.prototype, {
		"_sbox_pos": function () {
			var fixer, ech, top, par, tot,
				w = this;
			
			w.d.intHTML.find( "div.ui-datebox-sliderow-int" ).each(function () {
				ech = $(this);
				par = ech.parent().outerWidth();
				
				if ( w.__( "isRTL" ) ) { 
					top = ech.find("div").last(); 
				} else {
					top = ech.find("div").first();
				}
				
				tot = ech.find( "div" ).size() * top.outerWidth();
				
				fixer = ech.outerWidth();
				
				if ( fixer > 0 ) { tot = fixer; }
				
				top.css( "marginLeft", ( tot - par ) / 2 * -1 );
			});
		}
	});
	$.extend( $.mobile.datebox.prototype._build, {
		"slidebox": function () {
			var i, y, hRow, phRow, tmp, testDate,
				w = this,
				o = this.options,
				g = this.drag,
				iDate = (w.d.input.val() === "") ?
					w._startOffset( w._makeDate( w.d.input.val() ) ) :
					w._makeDate(w.d.input.val()
				),
				uid = "ui-datebox-",
				slideBase = $( "<div class='"+uid+"sliderow-int'></div>" ),
				phBase = $( "<div>" ),
				ctrl = $( "<div>", { "class": uid + "slide" } );
			
			if ( typeof w.d.intHTML !== "boolean" ) {
				w.d.intHTML.remove().empty();
			} else {
				w.d.input.on( "datebox", function (e,p) {
					if ( p.method === "postrefresh" ) { w._sbox_pos(); }
				});
			}
			
			w.d.headerText = ( (w._grabLabel() !== false ) ?
				w._grabLabel() : 
				w.__( "titleDateDialogLabel")
			);
			w.d.intHTML = $( "<span class='" + uid + "nopad'>" );
			
			w.fldOrder = w.__( "slideFieldOrder" );
			w._check();
			w._minStepFix();
			
			$("<div class='" + uid + "header'><h4>" +
					w._formatter(w.__( "headerFormat" ), w.theDate) + "</h4></div>")
				.appendTo(w.d.intHTML);
			
			w.d.intHTML.append(ctrl);
			
			for ( y=0; y<w.fldOrder.length; y++ ) {
				phRow = phBase
					.clone()
					.data( "rowtype", w.fldOrder[y]);
				
				hRow = slideBase
					.clone()
					.data( "rowtype", w.fldOrder[y])
					.appendTo(phRow);
					
				if ( w.__( "isRTL" ) === true ) { hRow.css( "direction", "rtl" ); }
				
				switch (w.fldOrder[y]) {
					case "y":
						phRow.addClass( uid + "sliderow " + uid + "sliderow-ym" );
						for ( i = o.slen.y * -1; i < ( o.slen.y + 1 ); i++ ) {
							tmp = ( i !== 0 ) ?
								( ( iDate.get(0) === (w.theDate.get(0) + i) ) ?
									o.themeDateHigh :
									o.themeDate
								) :
								o.themeDatePick;
							$( "<div>", { 
									"class": uid + "slidebox " + uid +
										"slideyear ui-btn ui-btn-" + tmp
								} )
								.text( w.theDate.get(0)+i )
								.data( "offset", i )
								.appendTo( hRow );
						}
						break;
					case "m":
						phRow.addClass( uid + "sliderow " + uid + "sliderow-ym" );
						for ( i = o.slen.m * -1; i < ( o.slen.m + 1 ); i++ ) {
							testDate = w.theDate.copy([0],[0,0,1]);
							testDate.adj( 1, i );
							tmp = ( i !== 0 ) ?
								( ( iDate.get(1) === testDate.get(1) &&
										iDate.get(0) === testDate.get(0) ) ?
									o.themeDateHigh :
									o.themeDate
								) :
								o.themeDatePick;
							$( "<div>", { 
									"class": uid + "slidebox " + uid +
										"slidemonth ui-btn ui-btn-" + tmp }
								)
								.text( String(w.__( "monthsOfYearShort" )[testDate.get(1)]) )
								.data( "offset", i )
								.appendTo( hRow );
						}
						break;
						
					case "d":
						phRow.addClass( uid + "sliderow " + uid + "sliderow-d" );
						for ( i = o.slen.d * -1; i < ( o.slen.d + 1 ); i++ ) {
							testDate = w.theDate.copy();
							testDate.adj( 2, i );
							tmp = ( i !== 0 ) ?
								( ( iDate.comp() === testDate.comp() ) ?
									o.themeDateHigh :
									o.themeDate
								) :
								o.themeDatePick;
							if ( ( $.inArray(testDate.iso(), o.blackDates) > -1 ||
									$.inArray(testDate.getDay(), o.blackDays) > -1 ) &&
									( $.inArray(testDate.iso(), o.whiteDates) < 0 ) ) { 
								tmp += " ui-state-disabled"; }
							
							$( "<div>", { 
									"class": uid + "slidebox " + uid +
										"slideday ui-btn ui-btn-" + tmp }
								)
								.html( 
									testDate.get(2) + "<br /><span class='" + uid + "slidewday'>" +
									w.__( "daysOfWeekShort" )[testDate.getDay()] + "</span>"
								)
								.data( "offset", i )
								.appendTo( hRow );
						}
						break;
					case "h":
						phRow.addClass( uid + "sliderow " + uid + "sliderow-hi" );
						for ( i = o.slen.h * -1; i < ( o.slen.h + 1 ); i++ ) {
							testDate = w.theDate.copy();
							testDate.adj( 3, i );
							tmp = ( i !== 0 ) ?
								o.themeDate :
								o.themeDatePick;
							if ( o.validHours !== false &&
									$.inArray( testDate.get(3), o.validHours ) < 0
								) {
								tmp += " ui-state-disabled";
							}
							$( "<div>", { 
									"class": uid + "slidebox " + uid +
										"slidehour ui-btn ui-btn-" + tmp }
								)
								.html( w.__( "timeFormat" ) === 12 ?
									w._formatter(
										"%-I<span class='" + uid + "slidewday'>%p</span>",
										testDate
									) :
									testDate.get(3)
								)
								.data( "offset", i )
								.appendTo( hRow );
						}
						break;
					case "i":
						phRow.addClass( uid + "sliderow " + uid + "sliderow-hi" );
						for ( i = o.slen.i * -1; i < ( o.slen.i + 1 ); i++ ) {
							testDate = w.theDate.copy();
							testDate.adj( 4, ( i * o.minuteStep ) );
							tmp = ( i !== 0 ) ?
								o.themeDate :
								o.themeDatePick;
							$( "<div>", {
									"class": uid + "slidebox " + uid +
									"slidemins ui-btn ui-btn-" + tmp }
								)
								.text( w._zPad( testDate.get(4) ) )
								.data( "offset", i * o.minuteStep )
								.appendTo( hRow );
						}
						break;
				}
				phRow.appendTo(ctrl);
			}
			
			if ( o.useSetButton || o.useClearButton ) {
				y = $( "<div>", { "class": uid + "controls " + uid + "repad" } );
				
				if ( o.useSetButton ) {
					$( "<a href='#' role='button'>" )
						.appendTo(y)
						.text(w.__( "setDateButtonLabel" ))
						.addClass(
							"ui-btn ui-btn-" + o.theme + 
							" ui-icon-check ui-btn-icon-left ui-shadow ui-corner-all"
						)
						.on(o.clickEventAlt, function(e) {
							e.preventDefault();
							if ( w.dateOK === true ) {
								w._t( { 
									method: "set", 
									value: w._formatter(w.__fmt(),w.theDate),
									date: w.theDate
								} );
								w._t( { method: "close" } );
							}
							
						});
				}
				if ( o.useClearButton ) {
					$( "<a href='#' role='button'>" + w.__( "clearButton" ) + "</a>" )
						.appendTo(y)
						.addClass( 
							"ui-btn ui-btn-" + o.theme +
							" ui-icon-delete ui-btn-icon-left ui-shadow ui-corner-all"
						)
						.on(o.clickEventAlt, function(e) {
							e.preventDefault();
							w.d.input.val("");
							w._t( { method: "clear" } );
							w._t( { method: "close" } );
						});
				}
				if ( o.useCollapsedBut ) {
					y.addClass( "ui-datebox-collapse" );
				}
				y.appendTo(w.d.intHTML);
			}
			
			if ( w.wheelExists ) { // Mousewheel operation, if plugin is loaded
				w.d.intHTML.on( "mousewheel", ".ui-datebox-sliderow-int", function(e,d) {
					e.preventDefault();
					w._offset(
						$( this ).data( "rowtype" ),
						(( d<0 ) ? -1 : 1 ) * ( $(this).data( "rowtype" )==="i" ? o.minuteStep : 1 )
					);
				});
			}
			
			w.d.intHTML.on( o.clickEvent, ".ui-datebox-sliderow-int>div", function(e) {
				e.preventDefault();
				w._offset(
					$(this).parent().data( "rowtype" ),
					parseInt( $(this).data( "offset" ),10 )
				);
			});
			
			w.d.intHTML.on( g.eStart, ".ui-datebox-sliderow-int", function(e) {
				if ( !g.move ) {
					g.move = true;
					g.target = $(this);
					g.pos = parseInt(g.target.css( "marginLeft" ).replace(/px/i, ""),10);
					g.start = w.touch ? e.originalEvent.changedTouches[0].pageX : e.pageX;
					g.end = false;
					e.stopPropagation();
					e.preventDefault();
				}
			});
		}
	});
	$.extend( $.mobile.datebox.prototype._drag, {
		"slidebox": function() {
			var w = this,
				o = this.options,
				g = this.drag;
			
			$(document).on(g.eMove, function(e) {
				if ( g.move && o.mode === "slidebox") {
					g.end = w.touch ? e.originalEvent.changedTouches[0].pageX : e.pageX;
					g.target.css( "marginLeft", (g.pos + g.end - g.start) + "px" );
					e.preventDefault();
					e.stopPropagation();
					return false;
				}
			});
			
			$(document).on(g.eEnd, function(e) {
				if ( g.move && o.mode === "slidebox" ) {
					g.move = false;
					if ( g.end !== false ) {
						e.preventDefault();
						e.stopPropagation();
						g.tmp = g.target.find( "div" ).first();
						w._offset(
							g.target.data("rowtype"),
							( w.__("isRTL") ? -1 : 1 ) * 
								(parseInt((g.start - g.end) / g.tmp.innerWidth(),10)) *
								(g.target.data( "rowtype") === "i" ? o.minuteStep : 1)
						);
					}
					g.start = false;
					g.end = false;
				}
			});
		}
	});
})( jQuery );
