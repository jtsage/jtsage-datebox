/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notification.
 * https://github.com/jtsage/jquery-mobile-datebox
 */
/* CORE Functions */

(function($) {
	$.widget( "mobile.datebox", $.mobile.widget, {
		options: {
			// All widget options, including some internal runtime details
			version: '2-1.4.3-2014080201-next', // jQMMajor.jQMMinor.DBoxMinor-YrMoDaySerial
			mobVer: parseInt($.mobile.version.replace(/\./g,'')),
			theme: false,
			themeDefault: 'a',
			themeHeader: 'a',
			mode: false,

			transition: 'pop',
			useAnimation: true,
			hideInput: false,
			hideContainer: false,
			hideFixedToolbars: false,

			lockInput: true,
			enhanceInput: true,

			zindex: '1100',
			clickEvent: 'vclick',
			clickEventAlt: 'click',

			defaultValue: false,
			showInitialValue: false,

			popupPosition: false,
			popupForceX: false,
			popupForceY: false,

			useModal: true,
			useModalTheme: 'b',
			useInline: false,
			useInlineBlind: false,
			useHeader: true,
			useImmediate: false,

			useButton: true,
			buttonIcon: 'calendar',
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

			rolloverMode: { 'm': true, 'd': true, 'h': true, 'i': true, 's': true },

			useLang: 'default',
			lang: {
				'default' : {
					setDateButtonLabel: 'Set Date',
					setTimeButtonLabel: 'Set Time',
					setDurationButtonLabel: 'Set Duration',
					calTodayButtonLabel: 'Jump to Today',
					calTomorrowButtonLabel: 'Jump to Tomorrow',
					titleDateDialogLabel: 'Set Date',
					titleTimeDialogLabel: 'Set Time',
					daysOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
					daysOfWeekShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
					monthsOfYear: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
					monthsOfYearShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
					durationLabel: ['Days', 'Hours', 'Minutes', 'Seconds'],
					durationDays: ['Day', 'Days'],
					timeFormat: 24,
					headerFormat: '%A, %B %-d, %Y',
					tooltip: 'Open Date Picker',
					nextMonth: 'Next Month',
					prevMonth: 'Previous Month',
					dateFieldOrder: ['m', 'd', 'y'],
					timeFieldOrder: ['h', 'i', 'a'],
					slideFieldOrder: ['y', 'm', 'd'],
					dateFormat: '%Y-%m-%d',
					useArabicIndic: false,
					isRTL: false,
					calStartDay: 0,
					clearButton: 'Clear',
					durationOrder: ['d', 'h', 'i', 's'],
					meridiem: ['AM', 'PM'],
					timeOutput: '%k:%M', //{ '12': '%l:%M %p', '24': '%k:%M' },
					durationFormat: '%Dd %DA, %Dl:%DM:%DS',
					calDateListLabel: 'Other Dates',
					calHeaderFormat: '%B %Y'
				}
			}
		},
		_enhanceDate: function() {
			$.extend(this._date.prototype, {
				copy: function(adjust, override) {
					/* Get a modified copy of the date.
					 * First array - Offset the new date by #  (position determines date part)
					 * Second array - If non-zero, force the new date by # (position determines date part)
					 */
					if ( typeof adjust === 'undefined' ) { adjust = [0,0,0,0,0,0,0]; }
					if ( typeof override === 'undefined' ) { override = [0,0,0,0,0,0,0]; }
					while ( adjust.length < 7 ) { adjust.push(0); }
					while ( override.length < 7 ) { override.push(0); }
					return new Date(
						((override[0] > 0 ) ? override[0] : this.getFullYear() + adjust[0]),
						((override[1] > 0 ) ? override[1] : this.getMonth() + adjust[1]),
						((override[2] > 0 ) ? override[2] : this.getDate() + adjust[2]),
						((override[3] > 0 ) ? override[3] : this.getHours() + adjust[3]),
						((override[4] > 0 ) ? override[4] : this.getMinutes() + adjust[4]),
						((override[5] > 0 ) ? override[5] : this.getSeconds() + adjust[5]),
						((override[6] > 0 ) ? override[5] : this.getMilliseconds() + adjust[6]));
				},
				adj: function (type, amount) {
					/* Adjust the date.  Yes, this is chainable */
					if ( typeof amount !== 'number' ) {
						throw new Error("Adjustment value not specified");
					}
					if ( typeof type !== 'number' ) {
						throw new Error("Adjustment type not specified");
					}
					switch ( type ) {
						case 0: this.setFullYear(this.getFullYear() + amount); break;
						case 1: this.setMonth(this.getMonth() + amount); break;
						case 2: this.setDate(this.getDate() + amount); break;
						case 3: amount *= 60;
						case 4: amount *= 60;
						case 5: amount *= 1000;
						case 6: this.setTime(this.getTime() + amount); break;
					}
					return this;
				},
				setD: function(type, amount) {
					/* A chainable version of setWhatever() */
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
					switch ( type ) {
						case 0: return this.getFullYear();
						case 1: return this.getMonth();
						case 2: return this.getDate();
						case 3: return this.getHours();
						case 4: return this.getMinutes();
						case 5: return this.getSeconds();
					}
					return false;
				},
				iso: function() {
					return String(this.getFullYear()) + '-' + (( this.getMonth() < 9 ) ? "0" : "") + String(this.getMonth()+1) + '-' + ((this.getDate() < 10 ) ? "0" : "") + String(this.getDate());
				},
				comp: function () {
					return parseInt(this.iso().replace(/-/g,''),10);
				},
				getEpoch: function() {
					return (this.getTime() - this.getMilliseconds()) / 1000;
				},
				getArray: function() {
					return [this.getFullYear(), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds()];
				},
				setFirstDay: function (day) {
					this.setD(2,1).adj(2, (day - this.getDay()));
					if ( this.get(2) > 10 ) { this.adj(2,7); }
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
							return Math.floor((this.getTime() - ( t1.getTime() + (( this.getTimezoneOffset() - t1.getTimezoneOffset()) * 60000))) / 6048e5) + 1;
							//return Math.floor((this.getTime() - t1.getTime()) / 6048e5) + 1;
						case 1:
							t1 = this.copy([0,-1*this.getMonth()]).setFirstDay(1);
							return Math.floor((this.getTime() - ( t1.getTime() + (( this.getTimezoneOffset() - t1.getTimezoneOffset()) * 60000))) / 6048e5) + 1;
							//return Math.floor((this.getTime() - t1.getTime()) / 6048e5) + 1;
						case 4:
							// this line is some bullshit.  but it does work.
							// (trap for dec 29, 30, or 31st being in the new year's week - these are the
							//  only 3 that can possibly fall like this)
							if ( this.getMonth() === 11 && this.getDate() > 28 ) { return 1; }

							t1 = this.copy([0,-1*this.getMonth()],true).setFirstDay(4).adj(2,-3);
							t2 = Math.floor((this.getTime() - ( t1.getTime() + (( this.getTimezoneOffset() - t1.getTimezoneOffset()) * 60000))) / 6048e5) + 1;

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
			var w = $(this).data('mobile-datebox');
			if ( ! e.isPropagationStopped() ) {
				switch (p.method) {
					case 'close':
						w.close();
						break;
					case 'open':
						w.open(); break;
					case 'set':
						$(this).val(p.value);
						$(this).trigger('change');
						break;
					case 'doset':
						if ( $.isFunction(w['_'+w.options.mode+'DoSet']) ) {
							w['_'+w.options.mode+'DoSet'].apply(w,[]);
						} else {
							$(this).trigger('datebox', {'method':'set', 'value':w._formatter(w.__fmt(), w.theDate), 'date':w.theDate});
						}
						break;
					case 'dooffset':
						if (p.type) { w._offset(p.type, p.amount, true); } break;
					case 'dorefresh':
						w.refresh(); break;
					case 'doreset':
						w.hardreset(); break;
					case 'doclear':
						$(this).val('').trigger('change'); break;
					case 'clear':
						$(this).trigger('change');
				}
			}
		},
		_ord: {
			'default': function (num) {
				// Return an ordinal suffix (1st, 2nd, 3rd, etc)
				var ending = num % 10;
				if ( num > 9 && num < 21 ) { return 'th'; }
				if ( ending > 3 ) { return 'th'; }
				return ['th','st','nd','rd'][ending];
			}
		},
		__ : function(val) {
			var o = this.options,
				oride = 'override' + val.charAt(0).toUpperCase() + val.slice(1);

			if ( typeof o[oride] !== 'undefined' ) { return o[oride]; }
			if ( typeof o.lang[o.useLang][val] !== 'undefined' ) { return o.lang[o.useLang][val]; }
			if ( typeof o[o.mode+'lang'] !== 'undefined' && typeof o[o.mode+'lang'][val] !== 'undefined' ) { return o[o.mode+'lang'][val]; }
			return o.lang['default'][val];
		},
		__fmt: function() {
			var w = this,
				o = this.options;

			switch ( o.mode ) {
				case 'timebox':
				case 'timeflipbox':
					return w.__('timeOutput');
				case 'durationbox':
				case 'durationflipbox':
					return w.__('durationFormat');
				default:
					return w.__('dateFormat');
			}
		},
		_zPad: function(number) {
			return (( number < 10 ) ? '0' + String(number) : String(number));
		},
		_dRep: function(oper, direction) {
			var start = 48,
				end = 57,
				adder = 1584,
				i = null,
				ch = null,
				newd = '';

			if ( direction === -1 ) {
				start += adder;
				end += adder;
				adder = -1584;
			}

			for ( i=0; i<oper.length; i++ ) {
				ch = oper.charCodeAt(i);
				if ( ch >= start && ch <= end ) {
					newd = newd + String.fromCharCode(ch+adder);
				} else {
					newd = newd + String.fromCharCode(ch);
				}
			}

			return newd;
		},
		_doIndic: function() {
			var w = this;

			w.d.intHTML.find('*').each(function() {
				if ( $(this).children().length < 1 ) {
					$(this).text(w._dRep($(this).text()));
				} else if ( $(this).hasClass('ui-datebox-slideday') ) {
					$(this).html(w._dRep($(this).html()));
				}
			});
			w.d.intHTML.find('input').each(function() {
				$(this).val(w._dRep($(this).val()));
			});
		},
		_parser: {
			'default': function (str) { return false; }
		},
		_n: function (val,def) {
			return ( val < 0 ) ? def : val;
		},
		_pa: function (arr,date) {
			if ( typeof date === 'boolean' ) { return new this._date(arr[0],arr[1],arr[2],0,0,0,0); }
			return new this._date(date.getFullYear(), date.getMonth(), date.getDate(), arr[0], arr[1], arr[2], 0);
		},
		_makeDate: function (str) {
			// Date Parser
			str = $.trim(((this.__('useArabicIndic') === true)?this._dRep(str, -1):str));
			var w = this,
				o = this.options,
				adv = w.__fmt(),
				exp_input = null,
				exp_names = [],
				exp_format = null,
				exp_temp = null,
				date = new w._date(),
				d = { year: -1, mont: -1, date: -1, hour: -1, mins: -1, secs: -1, week: false, wtyp: 4, wday: false, yday: false, meri: 0 },
				i;

			if ( typeof o.mode === 'undefined' ) { return date; }
			if ( typeof w._parser[o.mode] !== 'undefined' ) { return w._parser[o.mode].apply(w,[str]); }

			if ( o.mode === 'durationbox' || o.mode === 'durationflipbox' ) {
				adv = adv.replace(/%D([a-z])/gi, function(match, oper) {
					switch (oper) {
						case 'd':
						case 'l':
						case 'M':
						case 'S': return '(' + match + '|' +'[0-9]+' + ')';
						default: return '.+?';
					}
				});

				adv = new RegExp('^' + adv + '$');
				exp_input = adv.exec(str);
				exp_format = adv.exec(w.__fmt());

				if ( exp_input === null || exp_input.length !== exp_format.length ) {
					if ( typeof o.defaultValue === "number" && o.defaultValue > 0 ) {
						return new w._date((w.initDate.getEpoch() + parseInt(o.defaultValue,10))*1000);
					}
					return new w._date(w.initDate.getTime());
				}

				exp_temp = w.initDate.getEpoch();
				for ( i=1; i<exp_input.length; i++ ) { //0y 1m 2d 3h 4i 5s
					if ( exp_format[i].match(/^%Dd$/i) )   { exp_temp = exp_temp + (parseInt(exp_input[i],10)*60*60*24); }
					if ( exp_format[i].match(/^%Dl$/i) )   { exp_temp = exp_temp + (parseInt(exp_input[i],10)*60*60); }
					if ( exp_format[i].match(/^%DM$/i) )   { exp_temp = exp_temp + (parseInt(exp_input[i],10)*60); }
					if ( exp_format[i].match(/^%DS$/i) )   { exp_temp = exp_temp + (parseInt(exp_input[i],10)); }
				}
				return new w._date((exp_temp*1000));
			}

			adv = adv.replace(/%(0|-)*([a-z])/gi, function(match, pad, oper) {
				exp_names.push(oper);
				switch (oper) {
					case 'p':
					case 'P':
					case 'b':
					case 'B': return '(' + match + '|' +'.+?' + ')';
					case 'H':
					case 'k':
					case 'I':
					case 'l':
					case 'm':
					case 'M':
					case 'S':
					case 'V':
					case 'U':
					case 'u':
					case 'W':
					case 'd': return '(' + match + '|' + (( pad === '-' ) ? '[0-9]{1,2}' : '[0-9]{2}') + ')';
					case 'j': return '(' + match + '|' + '[0-9]{3}' + ')';
					case 's': return '(' + match + '|' + '[0-9]+' + ')';
					case 'g':
					case 'y': return '(' + match + '|' + '[0-9]{2}' + ')';
					case 'E':
					case 'G':
					case 'Y': return '(' + match + '|' + '[0-9]{1,4}' + ')';
					default: exp_names.pop(); return '.+?';
				}
			});

			adv = new RegExp('^' + adv + '$');
			exp_input = adv.exec(str);
			exp_format = adv.exec(w.__fmt());

			if ( exp_input === null || exp_input.length !== exp_format.length ) {
				if ( o.defaultValue !== false ) {
					switch ( typeof o.defaultValue ) {
						case 'object':
							if ( o.defaultValue.length === 3 ) {
								date =  w._pa(o.defaultValue,((o.mode === 'timebox' || o.mode === 'timeflipbox') ? date : false));
							} break;
						case 'number':
							date =  new w._date(o.defaultValue * 1000); break;
						case 'string':
							if ( o.mode === 'timebox' || o.mode === 'timeflipbox' ) {
								exp_temp = o.defaultValue.split(':');
								if ( exp_temp.length === 3 ) { date = w._pa([exp_temp[0],exp_temp[1],exp_temp[2]], date); }
								else if ( exp_temp.length === 2 ) { date = w._pa([exp_temp[0],exp_temp[1],0], date); }
							} else {
								exp_temp = o.defaultValue.split('-');
								if ( exp_temp.length === 3 ) { date = w._pa([exp_temp[0],exp_temp[1]-1,exp_temp[2]], false); }
							} break;
					}
				}
				if ( isNaN(date.getDate()) ) { date = new w._date(); }
			} else {
				for ( i=1; i<exp_input.length; i++ ) {
					switch ( exp_names[i-1] ) {
						case 's': return new w._date(parseInt(exp_input[i],10) * 1000);
						case 'Y':
						case 'G': d.year = parseInt(exp_input[i],10); break;
						case 'E': d.year = parseInt(exp_input[i],10) - 543; break;
						case 'y':
						case 'g':
							if ( o.afterToday === true || parseInt(exp_input[i],10) < 38 ) {
								d.year = parseInt('20' + exp_input[i],10);
							} else {
								d.year = parseInt('19' + exp_input[i],10);
							} break;
						case 'm': d.mont = parseInt(exp_input[i],10)-1; break;
						case 'd': d.date = parseInt(exp_input[i],10); break;
						case 'H':
						case 'k':
						case 'I':
						case 'l': d.hour = parseInt(exp_input[i],10); break;
						case 'M': d.mins = parseInt(exp_input[i],10); break;
						case 'S': d.secs = parseInt(exp_input[i],10); break;
						case 'u': d.wday = parseInt(exp_input[i],10)-1; break;
						case 'w': d.wday = parseInt(exp_input[i],10); break;
						case 'j': d.yday = parseInt(exp_input[i],10); break;
						case 'V': d.week = parseInt(exp_input[i],10); d.wtyp = 4; break;
						case 'U': d.week = parseInt(exp_input[i],10); d.wtyp = 0; break;
						case 'W': d.week = parseInt(exp_input[i],10); d.wtyp = 1; break;
						case 'p':
						case 'P': d.meri = (( exp_input[i].toLowerCase() === w.__('meridiem')[0].toLowerCase() )? -1:1); break;
						case 'b':
							exp_temp = $.inArray(exp_input[i], w.__('monthsOfYearShort'));
							if ( exp_temp > -1 ) { d.mont = exp_temp; }
							break;
						case 'B':
							exp_temp = $.inArray(exp_input[i], w.__('monthsOfYear'));
							if ( exp_temp > -1 ) { d.mont = exp_temp; }
							break;
					}
				}
				if ( d.meri !== 0 ) {
					if ( d.meri === -1 && d.hour === 12 ) { d.hour = 0; }
					if ( d.meri === 1 && d.hour !== 12 ) { d.hour = d.hour + 12; }
				}

				date = new w._date(w._n(d.year,0),w._n(d.mont,0),w._n(d.date,1),w._n(d.hour,0),w._n(d.mins,0),w._n(d.secs,0),0);

				if ( d.year < 100 && d.year !== -1 ) { date.setFullYear(d.year); }

				if ( ( d.mont > -1 && d.date > -1 ) || ( d.hour > -1 && d.mins > -1 && d.secs > -1 ) ) { return date; }

				if ( d.week !== false ) {
					date.setDWeek(d.wtyp, d.week);
					if ( d.date > -1 ) { date.setDate(d.date); }
				}
				if ( d.yday !== false ) { date.setD(1,0).setD(2,1).adj(2,(d.yday-1)); }
				if ( d.wday !== false ) { date.adj(2,(d.wday - date.getDay())); }
			}
			return date;
		},
		_customformat: {
			'default': function(oper, date) { return false; }
		},
		_formatter: function(format, date) {
			var w = this,
				o = this.options, tmp,
				dur = {
					part: [0,0,0,0], tp: 0
				};

				if ( o.mode === 'durationbox' || o.mode === 'durationflipbox' ) {
					dur.tp = this.theDate.getEpoch() - this.initDate.getEpoch();
					dur.part[0] = parseInt( dur.tp / (60*60*24),10); dur.tp -=(dur.part[0]*60*60*24); // Days
					dur.part[1] = parseInt( dur.tp / (60*60),10); dur.tp -= (dur.part[1]*60*60); // Hours
					dur.part[2] = parseInt( dur.tp / (60),10); dur.tp -= (dur.part[2]*60); // Minutes
					dur.part[3] = dur.tp; // Seconds

					if ( ! format.match(/%Dd/) ) { dur.part[1] += (dur.part[0]*24);}
					if ( ! format.match(/%Dl/) ) { dur.part[2] += (dur.part[1]*60);}
					if ( ! format.match(/%DM/) ) { dur.part[3] += (dur.part[2]*60);}
				}

			format = format.replace(/%(D|X|0|-)*([1-9a-zA-Z])/g, function(match, pad, oper) {
				if ( pad === 'X' ) {
					if ( typeof w._customformat[o.mode] !== 'undefined' ) { return w._customformat[o.mode](oper, date, o); }
					return match;
				}
				if ( pad === 'D' ) {
					switch ( oper ) {
						case 'd': return dur.part[0];
						case 'l': return w._zPad(dur.part[1]);
						case 'M': return w._zPad(dur.part[2]);
						case 'S': return w._zPad(dur.part[3]);
						case 'A': return ((dur.part[0] > 1)?w.__('durationDays')[1]:w.__('durationDays')[0]);
						default: return match;
					}
				}
				switch ( oper ) {
					case '%': // Literal %
						return '%';
					case 'a': // Short Day
						return w.__('daysOfWeekShort')[date.getDay()];
					case 'A': // Full Day of week
						return w.__('daysOfWeek')[date.getDay()];
					case 'b': // Short month
						return w.__('monthsOfYearShort')[date.getMonth()];
					case 'B': // Full month
						return w.__('monthsOfYear')[date.getMonth()];
					case 'C': // Century
						return date.getFullYear().toString().substr(0,2);
					case 'd': // Day of month
						return (( pad === '-' ) ? date.getDate() : w._zPad(date.getDate()));
					case 'H': // Hour (01..23)
					case 'k':
						return (( pad === '-' ) ? date.getHours() : w._zPad(date.getHours()));
					case 'I': // Hour (01..12)
					case 'l':
						return (( pad === '-' ) ? ((date.getHours() === 0 || date.getHours() === 12)?12:((date.getHours()<12)?date.getHours():(date.getHours()-12))) : w._zPad(((date.getHours() === 0 || date.getHours() === 12)?12:((date.getHours()<12)?date.getHours():date.getHours()-12))));
					case 'm': // Month
						return (( pad === '-' ) ? date.getMonth()+1 : w._zPad(date.getMonth()+1));
					case 'M': // Minutes
						return (( pad === '-' ) ? date.getMinutes() : w._zPad(date.getMinutes()));
					case 'p': // AM/PM (ucase)
						return ((date.getHours() < 12)?w.__('meridiem')[0].toUpperCase():w.__('meridiem')[1].toUpperCase());
					case 'P': // AM/PM (lcase)
						return ((date.getHours() < 12)?w.__('meridiem')[0].toLowerCase():w.__('meridiem')[1].toLowerCase());
					case 's': // Unix Seconds
						return date.getEpoch();
					case 'S': // Seconds
						return (( pad === '-' ) ? date.getSeconds() : w._zPad(date.getSeconds()));
					case 'u': // Day of week (1-7)
						return (( pad === '-' ) ? date.getDay() + 1 : w._zPad(date.getDay() + 1));
					case 'w': // Day of week
						return date.getDay();
					case 'y': // Year (2 digit)
						return date.getFullYear().toString().substr(2,2);
					case 'Y': // Year (4 digit)
						return date.getFullYear();
					case 'E': // BE (Buddist Era, 4 Digit)
						return date.getFullYear() + 543;
					case 'V':
						return (( pad === '-' ) ? date.getDWeek(4) : w._zPad(date.getDWeek(4)));
					case 'U':
						return (( pad === '-' ) ? date.getDWeek(0) : w._zPad(date.getDWeek(0)));
					case 'W':
						return (( pad === '-' ) ? date.getDWeek(1) : w._zPad(date.getDWeek(1)));
					case 'o': // Ordinals
						if ( typeof w._ord[o.useLang] !== 'undefined' ) { return w._ord[o.useLang](date.getDate()); }
						return w._ord['default'](date.getDate());
					case 'j':
						tmp = new Date(date.getFullYear(),0,1);
						tmp = Math.ceil((date - tmp) / 86400000)+1;
						return (( tmp < 100 ) ? (( tmp < 10 )? '00' : '0') : '' ) + String(tmp);
					case 'G':
						if ( date.getDWeek(4) === 1 && date.getMonth() > 0 ) { return date.getFullYear() + 1; }
						if ( date.getDWeek(4) > 51 && date.getMonth() < 11 ) { return date.getFullYear() - 1; }
						return date.getFullYear();
					case 'g':
						if ( date.getDWeek(4) === 1 && date.getMonth() > 0 ) { return parseInt(date.getFullYear().toString().substr(2,2),10) + 1; }
						if ( date.getDWeek(4) > 51 && date.getMonth() < 11 ) { return parseInt(date.getFullYear().toString().substr(2,2),10) - 1; }
						return date.getFullYear().toString().substr(2,2);
					default:
						return match;
				}
			});

			if ( w.__('useArabicIndic') === true ) {
				format = w._dRep(format);
			}

			return format;
		},
		_btwn: function(value, low, high) {
			return ( value > low && value < high );
		},
		_minStepFix: function() {
			var tempMin = this.theDate.get(4), tmp,
				w = this,
				o = this.options;

			if ( o.minuteStep > 1 && tempMin % o.minuteStep > 0 ) {
				if ( o.minuteStepRound < 0 ) {
					tempMin = tempMin - (tempMin % o.minuteStep);
				} else if ( o.minStepRound > 0 ) {
					tempMin = tempMin + ( o.minuteStep - ( tempMin % o.minuteStep ) );
				} else {
					if ( tempMin % o.minuteStep < o.minuteStep / 2 ) {
						tempMin = tempMin - (tempMin % o.minuteStep);
					} else {
						tempMin = tempMin + ( o.minuteStep - ( tempMin % o.minuteStep ) );
					}
				}
			w.theDate.setMinutes(tempMin);
			}
		},
		_offset: function(mode, amount, update) {
			// Compute a date/time offset.
			//   update = false to prevent controls refresh
			var w = this,
				o = this.options,
				ok = false;

			mode = (mode || "").toLowerCase();

			if ( typeof(update) === "undefined" ) { update = true; }

			if ( mode !== 'a' && ( typeof o.rolloverMode[mode] === 'undefined' || o.rolloverMode[mode] === true )) {
				ok = $.inArray(mode, ['y','m','d','h','i','s']);
			} else {
				switch(mode) {
					case 'y': ok = 0; break;
					case 'm':
						if ( w._btwn(w.theDate.getMonth()+amount,-1,12) ) { ok = 1; }
						break;
					case 'd':
						if ( w._btwn(w.theDate.getDate() + amount,0,(32 - w.theDate.copy([0],[0,0,32,13]).getDate() + 1) )) { ok = 2; }
						break;
					case 'h':
						if ( w._btwn(w.theDate.getHours() + amount,-1,24) ) { ok = 3; }
						break;
					case 'i':
						if ( w._btwn(w.theDate.getMinutes() + amount,-1,60) ) { ok = 4; }
						break;
					case 's':
						if ( w._btwn(w.theDate.getSeconds() + amount,-1,60) ) { ok = 5; }
						break;
					case 'a':
						w._offset('h',((amount>0)?1:-1)*12,false);
						break;
				}
			}
			if ( ok !== false ) { w.theDate.adj(ok,amount); }
			if ( update === true ) { w.refresh(); }
			if ( o.useImmediate ) { w.d.input.trigger('datebox', {'method':'doset'}); }

			w.d.input.trigger('datebox', {'method':'offset', 'type':mode, 'amount':amount, 'newDate':w.theDate});
		},
		_startOffset: function(date) {
			var o = this.options;

			if ( o.startOffsetYears !== false ) {
				date.adj(0, o.startOffsetYears);
			}
			if ( o.startOffsetMonths !== false ) {
				date.adj(1, o.startOffsetMonths);
			}
			if ( o.startOffsetDays !== false ) {
				date.adj(2, o.startOffsetDays);
			}
			return date;
		},
		_create: function() {
			// Create the widget, called automatically by widget system
			$( document ).trigger( "dateboxcreate" );

			var w = this,
				o = $.extend(this.options,
					(typeof this.element.data('options') !== 'undefined')
						? this.element.data('options')
						: this._getLongOptions(this.element) ),
				thisTheme = ( o.theme === false && typeof($(this).data('theme')) === 'undefined' ) ?
					( ( typeof(this.element.parentsUntil('[data-theme]').parent().data('theme')) === 'undefined' )
						? o.themeDefault
						: this.element.parentsUntil('[data-theme]').parent().data('theme') )
					: o.theme,
				trans = o.useAnimation ? o.transition : 'none',
				d = {
					input: this.element,
					wrap: this.element.parent(),
					mainWrap: $("<div>", { "class": 'ui-datebox-container ui-overlay-shadow ui-corner-all ui-datebox-hidden '+trans+' ui-body-'+thisTheme} ).css('zIndex', o.zindex),
					intHTML: false
				},
				touch = ( typeof window.ontouchstart !== 'undefined' ),
				drag = {
					eStart : (touch ? 'touchstart' : 'mousedown')+'.datebox',
					eMove  : (touch ? 'touchmove' : 'mousemove')+'.datebox',
					eEnd   : (touch ? 'touchend' : 'mouseup')+'.datebox',
					eEndA  : (touch ? 'mouseup.datebox touchend.datebox touchcancel.datebox touchmove.datebox' : 'mouseup.datebox'),
					move   : false,
					start  : false,
					end    : false,
					pos    : false,
					target : false,
					delta  : false,
					tmp    : false
				},
				calc = { },
				ns = (typeof $.mobile.ns !== 'undefined')?$.mobile.ns:'';

			$.extend(w, {d: d, ns: ns, drag: drag, touch:touch});

			if ( o.usePlaceholder !== false ) {
				if ( o.usePlaceholder === true && w._grabLabel() !== false ) { w.d.input.attr('placeholder', w._grabLabel()); }
				if ( typeof o.usePlaceholder === 'string' ) { w.d.input.attr('placeholder', o.usePlaceholder); }
			}

			o.theme = thisTheme;

			w.clearFunc = false;
			w.disabled = false;
			w.runButton = false;
			w._date = window.Date;
			w._enhanceDate();
			w.baseID = w.d.input.attr('id');

			w.initDate = new w._date();
			w.theDate = (o.defaultValue) ? w._makeDate(o.defaultValue) : ( (w.d.input.val() !== "") ? w._makeDate(w.d.input.val()) : new w._date() );
			w.initDone = false;

			if ( o.showInitialValue === true ) {
				w.d.input.val(w._formatter(w.__fmt(), w.theDate));
			}

			if ( o.useButton === true ) {
				w.d.wrap.addClass( "ui-input-has-clear" );
				$( "<a href='#' class='ui-input-clear ui-btn ui-icon-"+o.buttonIcon+" ui-btn-icon-notext ui-corner-all'></a>" )
					.attr( "title", this.__('tooltip') )
					.text( this.__('tooltip') )
					.appendTo(w.d.wrap)
					.on(o.clickEvent, function(e) {
						e.preventDefault();
						if ( o.useFocus === true ) {
							w.d.input.focus();
						} else {
							if ( !w.disabled ) { w.d.input.trigger('datebox', {'method': 'open'}); }
						}
					});
			}


			if ( o.enhanceInput === true && navigator.userAgent.match(/Android/i) ){
				w.inputType = 'number';
			} else {
				w.inputType = 'text';
			}

			if ( o.hideInput === true ) { w.d.wrap.hide(); }
			if ( o.hideContainer === true ) { w.d.wrap.parent().hide(); }

			w.d.input
				.focus(function(){
					w.d.input.addClass('ui-focus');
					if ( w.disabled === false && o.useFocus === true ) {
						w.d.input.trigger('datebox', {'method': 'open'});
					}
				})
				.blur(function() { w.d.input.removeClass('ui-focus'); })
				.change(function() {
					w.theDate = w._makeDate(w.d.input.val());
					w.refresh();
				})
				.on('datebox', w._event);

			if ( o.lockInput === true ) { w.d.input.attr("readonly", "readonly"); }

			// Check if mousewheel plugin is loaded
			if ( typeof $.event.special.mousewheel !== 'undefined' ) { w.wheelExists = true; }

			// Disable when done if element attribute disabled is true.
			if ( w.d.input.is(':disabled') ) {
				w.disable();
			}

			if ( o.useInline === true || o.useInlineBlind ) { w.open(); }

			w.applyMinMax(false, false);

			//Throw dateboxinit event
			$( document ).trigger( "dateboxaftercreate" );
		},
		applyMinMax: function(refresh, override) {
			var w = this,
					o = this.options,
					calc = {};

			if ( typeof refresh === 'undefined' ) { refresh = false; }
			if ( typeof override === 'undefined' ) { override = true; }

			if ( ( override === true || o.minDays === false ) && typeof(w.d.input.attr('min')) !== 'undefined' ) {
				calc.today  = new w._date();
				calc.lod    = 24 * 60 * 60 * 1000;
				calc.todayc = new w._date(calc.today.getFullYear(), calc.today.getMonth(), calc.today.getDate(), 0,0,0,0);
				calc.fromel = w.d.input.attr('min').split('-');
				calc.compdt  = new w._date(calc.fromel[0],calc.fromel[1]-1,calc.fromel[2],0,0,0,0);
				o.minDays = parseInt((((calc.compdt.getTime() - calc.todayc.getTime()) / calc.lod))*-1,10);
			}
			if ( ( override === true || o.maxDays === false ) && typeof(w.d.input.attr('max')) !== 'undefined' ) {
				calc.today  = new w._date();
				calc.lod    = 24 * 60 * 60 * 1000;
				calc.todayc = new w._date(calc.today.getFullYear(), calc.today.getMonth(), calc.today.getDate(), 0,0,0,0);
				calc.fromel = w.d.input.attr('max').split('-');
				calc.compdt  = new w._date(calc.fromel[0],calc.fromel[1]-1,calc.fromel[2],0,0,0,0);
				o.maxDays = parseInt((((calc.compdt.getTime() - calc.todayc.getTime()) / calc.lod)),10);
			}

			if ( refresh === true ) { w.refresh(); }
		},
		_build: {
			'default': function () {
				this.d.headerText = "Error";
				this.d.intHTML = $("<div class='ui-body-b'><h2 style='text-align:center'>There is no mode by that name loaded / mode not given</h2></div>");
			}
		},
		_drag: {
			'default': function () { return false; }
		},
		open: function () {
			var w = this,
				o = this.options,
				popopts = {},
				basepop = {'history':false},
				qns = 'data-'+this.ns,
				trans = o.useAnimation ? o.transition : 'none';

			if ( o.useFocus === true && w.fastReopen === true ) { w.d.input.blur(); return false; }
			if ( w.clearFunc !== false ) {
				clearTimeout(w.clearFunc); w.clearFunc = false;
			}

			w.theDate = w._makeDate(w.d.input.val());
			if ( w.d.input.val() === "" ) { w._startOffset(w.theDate); }
			w.d.input.blur();

			if ( typeof w._build[o.mode] === 'undefined' ) {
				w._build['default'].apply(w,[]);
			} else {
				w._build[o.mode].apply(w,[]);
			}
			if ( typeof w._drag[o.mode] !== 'undefined' ) {
				w._drag[o.mode].apply(w, []);
			}

			w.d.input.trigger('datebox', {'method':'refresh'});

			if ( w.__('useArabicIndic') === true ) { w._doIndic(); }

			if ( ( o.useInline === true || o.useInlineBlind === true ) && w.initDone === false ) {
				w.d.mainWrap.append(w.d.intHTML);
				if ( o.useInline === true && o.hideInput === true ) {
					w.d.input.parent().parent().parent().append(w.d.mainWrap);
				} else {
					w.d.input.parent().parent().append(w.d.mainWrap);
				}
				w.d.mainWrap.removeClass('ui-datebox-hidden');
				if ( o.useInline === true ) {
					if ( o.hideInput === true ) {
						w.d.mainWrap.addClass('ui-datebox-inline');
					} else {
						w.d.mainWrap.addClass('ui-datebox-inlineblind');
					}
				} else {
					w.d.mainWrap.addClass('ui-datebox-inlineblind');
					w.d.mainWrap.hide();
				}
				w.initDone = false;
				w.d.input.trigger('datebox',{'method':'postrefresh'});
			}

			if ( o.useInline ) { return true; }
			if ( o.useInlineBlind ) {
				if ( w.initDone ) { w.refresh(); w.d.mainWrap.slideDown();  }
				else { w.initDone = true; }
				return true;
			}

			if ( w.d.intHTML.is(':visible') ) { return false; } // Ignore if already open

			w.d.mainWrap.empty();
			if ( o.useHeader === true ) {
				w.d.headHTML = $('<div class="ui-header ui-bar-'+o.themeHeader+'"></div>');
				$("<a class='ui-btn-left' href='#'>Close</a>").appendTo(w.d.headHTML)
					.buttonMarkup({ theme  : o.themeHeader, icon   : 'delete', iconpos: 'notext', corners: true, shadow : true })
					.on(o.clickEventAlt, function(e) { e.preventDefault(); w.d.input.trigger('datebox', {'method':'close'}); });
				$('<h1 class="ui-title">'+w.d.headerText+'</h1>').appendTo(w.d.headHTML);
				w.d.mainWrap.append(w.d.headHTML);
			}
			w.d.mainWrap.append(w.d.intHTML).css('zIndex', o.zindex);
			w.d.input.trigger('datebox',{'method':'postrefresh'});

			if ( o.useAnimation === true ) {
				popopts.transition = o.transition;
			} else {
				popopts.transition = "none";
			}

			if ( o.popupPosition !== false ) {
				popopts.positionTo = o.popupPosition;
			} else {
				if ( typeof w.baseID !== undefined ) {
					popopts.positionTo = '#' + w.baseID;
				} else {
					popopts.positionTo = 'window';
				}
			}

			if ( o.popupForceX !== false && o.popupForceY !== false ) {
				popopts.x = parseInt(o.popupForceX,10);
				popopts.y = parseInt(o.popupForceY,10);
				popopts.positionTo = 'origin';
			}

			if ( o.useModal === true ) {
				basepop.overlayTheme = o.useModalTheme;
				basepop.dismissible = false;
				}

			// Perpare open callback, if provided. Additionally, if this
			// returns false then the open/update will stop.
			if ( o.openCallback !== false ) {
				if ( ! $.isFunction(o.openCallback) ) {
					if ( typeof window[o.openCallback] !== 'undefined' ) {
						o.openCallback = window[o.openCallback];
					} else {
						o.openCallback = new Function(o.openCallback);
					}
				}
				basepop.afteropen = function() {
					if ( o.openCallback.apply(w, $.merge([w.theDate],o.openCallbackArgs)) === false ) {
						w.d.input.trigger('datebox', {'method':'close'});
					}
				};
			}
			// Prepare close callback.
			if ( o.closeCallback !== false ) {
				if ( ! $.isFunction(o.closeCallback) ) {
					if ( typeof window[o.closeCallback] !== 'undefined' ) {
						o.closeCallback = window[o.closeCallback];
					} else {
						o.closeCallback = new Function(o.closeCallback);
					}
				}
				basepop.afterclose = function() {
					o.closeCallback.apply(w, $.merge([w.theDate], o.closeCallbackArgs));
				};
			}

			w.d.mainWrap.removeClass('ui-datebox-hidden').popup(basepop).popup("open", popopts);
			w.refresh();
		},
		close: function() {
			var w = this,
				o = this.options;

			if ( o.useInlineBlind === true ) { w.d.mainWrap.slideUp(); return true;}
			if ( o.useInline === true || w.d.intHTML === false ) { return true; }

			w.d.mainWrap.popup('close');

			$(document).off(w.drag.eMove);
			$(document).off(w.drag.eEnd);
			$(document).off(w.drag.eEndA);

			if ( o.useFocus ) {
				w.fastReopen = true;
				setTimeout(function(t) { return function () { t.fastReopen = false; };}(w), 300);
			}

		},
		refresh: function() {
			if ( typeof this._build[this.options.mode] === 'undefined' ) {
				this._build['default'].apply(this,[]);
			} else {
				this._build[this.options.mode].apply(this,[]);
			}
			if ( this.__('useArabicIndic') === true ) { this._doIndic(); }
			this.d.mainWrap.append(this.d.intHTML);
			this.d.input.trigger('datebox',{'method':'postrefresh'});
		},
		_check: function() {
			var w = this,
				td = null,
				o = this.options;

			w.dateOK = true;

			if ( o.afterToday !== false ) {
				td = new w._date();
				if ( w.theDate < td ) { w.theDate = td; }
			}
			if ( o.beforeToday !== false ) {
				td = new w._date();
				if ( w.theDate > td ) { w.theDate = td; }
			}
			if ( o.maxDays !== false ) {
				td = new w._date();
				td.adj(2, o.maxDays);
				if ( w.theDate > td ) { w.theDate = td; }
			}
			if ( o.minDays !== false ) {
				td = new w._date();
				td.adj(2, -1*o.minDays);
				if ( w.theDate < td ) { w.theDate = td; }
			}
			if ( o.minHour !== false ) {
				if ( w.theDate.getHours() < o.minHour ) {
					w.theDate.setHours(o.minHour);
				}
			}
			if ( o.maxHour !== false ) {
				if ( w.theDate.getHours() > o.maxHour ) {
					w.theDate.setHours(o.maxHour);
				}
			}
			if ( o.maxYear !== false ) {
				td = new w._date(o.maxYear, 0, 1);
				td.adj(2, -1);
				if ( w.theDate > td ) { w.theDate = td; }
			}
			if ( o.minYear !== false ) {
				td = new w._date(o.minYear, 0, 1);
				if ( w.theDate < td ) { w.theDate = td; }
			}

			if ( $.inArray(o.mode, ['timebox','durationbox','durationflipbox','timeflipbox']) > -1 ) {
				if ( o.mode === 'timeflipbox' && o.validHours !== false ) {
					if ( $.inArray(w.theDate.getHours(), o.validHours) < 0 ) { w.dateOK = false; }
				}
			} else {
				if ( o.blackDatesRec !== false ) {
					for ( i=0; i<o.blackDatesRec.length; i++ ) {
						if (
							( o.blackDatesRec[i][0] === -1 || o.blackDatesRec[i][0] === year ) &&
							( o.blackDatesRec[i][1] === -1 || o.blackDatesRec[i][1] === month ) &&
							( o.blackDatesRec[i][2] === -1 || o.blackDatesRec[i][2] === date )
						) { w.dateOK = false; }
					}
				}
				if ( o.blackDates !== false ) {
					if ( $.inArray(w.theDate.iso(), o.blackDates) > -1 ) { w.dateOK = false; }
				}
				if ( o.blackDays !== false ) {
					if ( $.inArray(w.theDate.getDay(), o.blackDays) > -1 ) { w.dateOK = false; }
				}
				if ( o.whiteDates !== false ) {
					if ( $.inArray(w.theDate.iso(), o.whiteDates) > -1 ) { w.dateOK = true; }
				}
			}
		},
		_grabLabel: function() {
			var w = this,
				o = this.options,
				par = {'oldd': false, 'newd': false};

			if ( typeof o.overrideDialogLabel === 'undefined' ) {
				if ( typeof w.d.input.attr('placeholder') !== 'undefined' ) { return w.d.input.attr('placeholder'); }
				if ( typeof w.d.input.attr('title') !== 'undefined' ) { return w.d.input.attr('title'); }
				par.newd = w.d.wrap.parent().parent().find('label[for=\''+w.d.input.attr('id')+'\']').text();
				par.oldd = w.d.wrap.parent().find('label[for=\''+w.d.input.attr('id')+'\']').text();
				if ( par.oldd !== '' && par.oldd !== false ) { return par.oldd; }
				if ( par.newd !== '' && par.newd !== false ) { return par.newd; }
				return false;
			}
			return o.overrideDialogLabel;
		},
		_makeEl: function(source, parts) {
			var part = false,
				retty = false;

			retty = source.clone();

			if ( typeof parts.attr !== 'undefined' ) {
				for ( part in parts.attr ) {
					if ( parts.attr.hasOwnProperty(part) ) {
						retty.data(part, parts.attr[part]);
					}
				}
			}
			return retty;
		},
		_getLongOptions: function(element) {
			var key, retty = {}, prefix, temp;

			if ( $.mobile.ns === "" ) {
				prefix = "datebox";
			} else {
				prefix = $.mobile.ns.substr(0, $.mobile.ns.length - 1) + 'Datebox';
			}

			for ( key in element.data() ) {
				if ( key.substr(0, prefix.length) === prefix && key.length > prefix.length ) {
					temp = key.substr(prefix.length);
					temp = temp.charAt(0).toLowerCase() + temp.slice(1);
					retty[temp] = element.data(key);
				}
			}
			return retty;
		},
		disable: function() {
			// Provide a PUBLIC function to Disable the element
			this.d.input.attr( "disabled", true );
			this.d.wrap.addClass( "ui-state-disabled" ).blur();
			this.disabled = true;
			this.d.input.trigger( "datebox", { method: "disable"});
		},
		enable: function() {
			// Provide a PUBLIC function to Enable the element
			this.d.input.attr( "disabled", false );
			this.d.wrap.removeClass( "ui-state-disabled" );
			this.disabled = false;
			this.d.input.trigger( "datebox", { method: "enable"});
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
			this.d.input.trigger("datebox", { method: "doset" });
		},
		callFormat: function( format, date ) {
			// Provide a PUBLIC function to get a formatted date
			return this._formatter( format, date );
		},
		getOption: function( opt ) {
			// Provide a PUBLIC function to get a defined option or i18n member
			var i18nTester = this.__(opt);
			if ( typeof( i18nTester ) !== "undefined" ) {
				return i18nTester;
			} else {
				return this.options[ opt ];
			}
		}
	});

	// Degrade date inputs to text inputs, suppress standard UI functions.
	$( document ).on( "pagebeforecreate", function( e ) {
		$( "[data-role='datebox']", e.target ).each(function() {
			$(this).prop('type', 'text');
		});
	});
	// Automatically bind to data-role='datebox' items.
	$( document ).on( "pagecreate create", function( e ){
		$( document ).trigger( "dateboxbeforecreate" );
		$( "[data-role='datebox']", e.target ).each(function() {
			if ( typeof $(this).data('mobile-datebox') === "undefined" ) {
				$(this).datebox();
			}
		});
	});
})( jQuery );
