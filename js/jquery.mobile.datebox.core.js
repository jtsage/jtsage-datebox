/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notification.
 * https://github.com/jtsage/jquery-mobile-datebox
 */
/* CORE Functions */

(function($, undefined ) {
	$.widget( "mobile.datebox", $.mobile.widget, {
		options: {
			// All widget options, including some internal runtime details
			version: '2-1.1.0-2012022800', // jQMMajor.jQMMinor.DBoxMinor-YrMoDaySerial
			theme: false,
			themeDefault: 'c',
			themeHeader: 'a',
			mode: false,
			
			centerHoriz: false,
			centerVert: false,
			transition: 'pop',
			useAnimation: true,
			hideInput: false,
			hideFixedToolbars: false,
			
			lockInput: true,
			enhanceInput: true,
			
			zindex: '500',
			clickEvent: 'vclick',
			resizeListener: true,
			
			overrideHeaderLabel: false,
			overrideTimeOutput: false,
			overrideDateFormat: false,
			overrideFieldsOrder: false,
			overrideDurationFormat: false,
			
			defaultValue: false,
			
			dialogEnable: false,
			dialogForce: false,
			
			useModal: false,
			useInline: false,
			useInlineBlind: false,
			useHeader: true,
			
			useButton: true,
			useFocus: false,
			
			openCallback: false,
			openCallbackArgs: [],
			closeCallback: false,
			closeCallbackArgs: [],
			
			useLang: 'default',
			lang: {
				'default' : {
					setDateButtonLabel: 'Set Date',
					setTimeButtonLabel: 'Set Time',
					setDurationButtonLabel: 'Set Duration',
					calTodayButtonLabel: 'Jump to Today',
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
					durationFormat: 'DD ddd, hh:ii:ss'
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
						case 3: this.setHours(this.getHours() + amount); break;
						case 4: this.setMinutes(this.getMinutes() + amount); break;
						case 5: this.setSeconds(this.getSeconds() + amount); break;
						case 6: this.setMilliseconds(this.getMilliseconds() + amount); break;
					}
					return this;
				},
				set: function(type, amount) {
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
				iso: function() {
					return String(this.getFullYear()) + '-' + (( this.getMonth() < 9 ) ? "0" : "") + String(this.getMonth()+1) + '-' + ((this.getDate() < 10 ) ? "0" : "") + String(this.getDate());
				},
				comp: function () { 
					return parseInt(this.iso().replace(/-/g,''),10); 
				},
				getEpoch: function() { 
					return (this.getTime() - this.getMilliseconds()) / 1000; 
				}
			});
		},
		_event: function(e, p) {
			var w = $(this).data('datebox');
			if ( ! e.isPropagationStopped() ) {
				switch (p.method) {
					case 'close':
						w.close(); break;
					case 'open':
						w.open(); break;
					case 'set':
						$(this).val(payload.value);
						$(this).trigger('change');
						break;
					case 'doset':
						$(this).trigger('datebox', {'method':'set', 'value':w._formatter(w.outputFormat, w.theDate), 'date':w.theDate});
						break;
					case 'dooffset':
						w._offset(p.type, p.amount, true); break;
					case 'dorefresh':
						w.refresh(); break;
					case 'doreset':
						w.hardreset(); break;
					case 'doclear':
						$(this).val(''); break;
				}
			}
		},
		_hoover: function(item) {
			// Hover toggle class, for calendar
			$(item).toggleClass('ui-btn-up-'+$(item).jqmData('theme')+' ui-btn-down-'+$(item).jqmData('theme'));
		},
		_makeOrd: {
			'default': function (num) {
				// Return an ordinal suffix (1st, 2nd, 3rd, etc)
				var ending = num % 10;
				if ( num > 9 && num < 21 ) { return 'th'; }
				if ( ending > 3 ) { return 'th'; }
				return ['th','st','nd','rd'][ending];
			}
		},
		__ : function(val, override) {
			var w = this,
				o = this.options;
			
			if ( typeof override !== 'undefined' ) {
				if ( override !== false ) { return override; }
			}
			if ( typeof o.lang[o.useLang][val] !== 'undefined' ) { 
				return o.lang[o.useLang][val];
			} else {
				return o.lang['default'][val];
			}
		},
		__fmt: function() {
			var w = this,
				o = this.options;
			
			switch ( o.mode ) {
				case 'timebox':
				case 'timeflipbox':
					return w.__('timeOutput', o.overrideTimeOutput);
				case 'durationbox':
					return w.__('durationFormat', o.overrideDurationFormat);
				default:
					return w.__('dateFormat', o.overrideDateFormat);
			}
		},
		_zPad: function(number) {
			return (( number < 10 ) ? '0' + String(number) : String(number));
		},
		_digitReplace: function(oper, direction) {
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
			var w = this,
				o = this.options;
				
			w.d.intHTML.find('*').each(function() {
				if ( $(this).children().length < 1 ) {
					$(this).text(self._digitReplace($(this).text()));
				} else if ( $(this).hasClass('ui-datebox-slideday') ) {
					$(this).html(self._digitReplace($(this).html()));
				}
			});
			w.d.intHTML.find('input').each(function() {
				$(this).val(self._digitReplace($(this).val()));
			});
		},
		_makeDate: function (str) {
			// Date Parser
			str = $.trim(((this.__('useArabicIndic') === true)?this._digitReplace(str, -1):str));
			var w = this,
				o = this.options,
				adv = w.__fmt(),
				exp_input = null,
				exp_format = null,
				exp_temp = null,
				date = new w._date(),
				dur_collapse = [false,false,false],
				found_date = [date.getFullYear(),date.getMonth(),date.getDate(),date.getHours(),date.getMinutes(),date.getSeconds(),0],
				i;
			
			if ( typeof o.mode === 'undefined' ) { return date; }
			
			if ( o.mode === 'durationbox' ) {
				adv = adv.replace(/ddd/g, '.+?');
				adv = adv.replace(/DD|ss|hh|ii/g, '([0-9Dhis]+)');
				adv = new RegExp('^' + adv + '$');
				exp_input = adv.exec(str);
				exp_format = adv.exec(w.__fmt());
				
				if ( exp_input === null || exp_input.length !== exp_format.length ) {
					if ( typeof o.defaultValue === "number" && o.defaultValue > 0 ) {
						return new w._date((w.initDate.getEpoch() + parseInt(o.defaultValue,10))*1000);
					} else {
						return new w._date(w.initDate.getTime());
					}
				} else {
					exp_temp = self.initDate.getEpoch();
					for ( i=0; i<exp_input.length; i++ ) { //0y 1m 2d 3h 4i 5s
						if ( exp_format[i].match(/^DD$/i) )   { exp_temp = exp_temp + (parseInt(exp_input[i],10)*60*60*24); }
						if ( exp_format[i].match(/^hh$/i) )   { exp_temp = exp_temp + (parseInt(exp_input[i],10)*60*60); }
						if ( exp_format[i].match(/^ii$/i) )   { exp_temp = exp_temp + (parseInt(exp_input[i],10)*60); }
						if ( exp_format[i].match(/^ss$/i) )   { exp_temp = exp_temp + (parseInt(exp_input[i],10)); }
					}
					return new w._date((exp_temp*1000));
				}
			} else {
				adv = adv.replace(/%(0|-)*([a-z])/gi, function(match, pad, oper, offset, s) {
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
						case 'd': return '(' + match + '|' + (( pad === '-' ) ? '[0-9]{1,2}' : '[0-9]{2}') + ')';
						case 's': return '(' + match + '|' +'[0-9]+' + ')';
						case 'y': return '(' + match + '|' +'[0-9]{2}' + ')';
						case 'Y': return '(' + match + '|' +'[0-9]{1,4}' + ')';
						default: return '.+?';
					}
				});
				
				adv = new RegExp('^' + adv + '$');
				exp_input = adv.exec(str);
				exp_format = adv.exec(w.__fmt());
				
				if ( exp_input === null || exp_input.length !== exp_format.length ) {
					if ( o.defaultValue !== false ) {
						if ( $.isArray(o.defaultValue) && o.defaultValue.length === 3 ) {
							if ( o.mode === 'timebox' || o.mode === 'timeflipbox' ) {
								return new w._date(found_date[0], found_date[1], found_date[2], o.defaultValue[0], o.defaultValue[1], o.defaultValue[2], 0);
							}
							else {
								return new w._date(o.defaultValue[0], o.defaultValue[1], o.defaultValue[2], 0, 0, 0, 0);
							}
						}
						else if ( typeof o.defaultValue === "number" ) {
							return new w._date(o.defaultValue * 1000);
						}
						else {
							if ( o.mode === 'timebox' || o.mode === 'timeflipbox' ) {
								exp_temp = o.defaultValue.split(':');
								if ( exp_temp.length === 3 ) {
									date = new w._date(found_date[0], found_date[1], found_date[2], parseInt(exp_temp[0],10),parseInt(exp_temp[1],10),parseInt(exp_temp[2],10),0);
								}
							}
							else {
								exp_temp = o.defaultValue.split('-');
								if ( exp_temp.length === 3 ) {
									date = new w._date(parseInt(exp_temp[0],10),parseInt(exp_temp[1],10)-1,parseInt(exp_temp[2],10),0,0,0,0);
									
								}
							}
							if ( isNaN(date.getDate()) ) { date = new w._date(); }
						}
					}
				} else {
					for ( i=0; i<exp_input.length; i++ ) { //0y 1m 2d 3h 4i 5a 6epoch
						if ( exp_format[i] === '%s' )                { found_date[6] = parseInt(exp_input[i],10); }
						if ( exp_format[i].match(/^%.*S$/) )         { found_date[5] = parseInt(exp_input[i],10); }
						if ( exp_format[i].match(/^%.*M$/) )         { found_date[4] = parseInt(exp_input[i],10); }
						if ( exp_format[i].match(/^%.*(H|k|I|l)$/) ) { found_date[3] = parseInt(exp_input[i],10); }
						if ( exp_format[i].match(/^%.*d$/) )         { found_date[2] = parseInt(exp_input[i],10); }
						if ( exp_format[i].match(/^%.*m$/) )         { found_date[1] = parseInt(exp_input[i],10)-1; }
						if ( exp_format[i].match(/^%.*Y$/) )         { found_date[0] = parseInt(exp_input[i],10); }
						if ( exp_format[i].match(/^%.*y$/) ) { 
							if ( o.afterToday === true ) {
								found_date[0] = parseInt('20' + exp_input[i],10);
							} else {
								if ( parseInt(exp_input[i],10) < 38 ) {
									found_date[0] = parseInt('20' + exp_input[i],10);
								} else {
									found_date[0] = parseInt('19' + exp_input[i],10);
								}
							}
						}
						if ( exp_format[i].match(/^%(0|-)*(p|P)$/) ) {
							if ( exp_input[i].toLowerCase() === w.__('meridiem')[0].toLowerCase() && found_date[3] === 12 ) {
								found_date[3] = 0;
							} else if ( exp_input[i].toLowerCase() === w.__('meridiem')[1].toLowerCase() && found_date[3] !== 12 ) {
								found_date[3] = found_date[3] + 12;
							}
						}
						if ( exp_format[i] === '%B' ) {
							exp_temp = $.inArray(exp_input[i], w.__('monthsOfYear'));
							if ( exp_temp > -1 ) { found_date[1] = exp_temp; }
						}
						if ( exp_format[i] === '%b' ) {
							exp_temp = $.inArray(exp_input[i], w.__('monthsOfYearShort'));
							if ( exp_temp > -1 ) { found_date[1] = exp_temp; }
						}
					}
				
					if ( exp_format[0].match(/%s/) ) {
						return new w._date(found_date[6] * 1000);
					}
					else if ( exp_format[0].match(/%(.)*(I|l|H|k|s|M)/) ) { 
						date = new w._date(found_date[0], found_date[1], found_date[2], found_date[3], found_date[4], found_date[5], 0);
					} else {
						date = new w._date(found_date[0], found_date[1], found_date[2], 0, 0, 0, 0); // Normalize time for raw dates
					}
					
					if ( found_date[0] < 100 ) { date.setFullYear(found_date[0]); }
				}
				return date;
			}
		},
		_formatter: function(format, date) {
			var w = this,
				o = this.options;
		
			format = format.replace(/%(0|-)*([a-z])/gi, function(match, pad, oper, offset, s) {
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
					case 'w': // Day of week
						return date.getDay();
					case 'y': // Year (2 digit)
						return date.getFullYear().toString().substr(2,2);
					case 'Y': // Year (4 digit)
						return date.getFullYear();
					case 'o': // Ordinals
						if ( typeof w._makeOrd[o.useLang] !== 'undefined' ) {
							return w._makeOrd[o.useLang](date.getDate());
						} else {
							return w._makeOrd['default'](date.getDate());
						}
					default:
						return match;
				}
			});
		
			if ( w.__('useArabicIndic') === true ) {
				format = w._digitReplace(format);
			}
		
			return format;
		},
		_btwn: function(value, low, high) {
			return ( value > low && value < high );
		},
		_offset: function(mode, amount, update) {
			// Compute a date/time offset.
			//   update = false to prevent controls refresh
			var w = this,
				o = this.options,
				ok = false;
				
			if ( typeof(update) === "undefined" ) { update = true; }
			w.d.input.trigger('datebox', {'method':'offset', 'type':mode, 'amount':amount});
			if ( o.rolloverMode[mode] ) {
				console.log('no rollover');
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
		},
		_create: function() {
			// Create the widget, called automatically by widget system
			$( document ).trigger( "dateboxcreate" );
		
			var w = this,
				o = $.extend(this.options, this.element.jqmData('options')),
				o = ((typeof this.element.jqmData('options') === 'undefined') ? $.extend(o, this._getLongOptions(this.element)) : o),
				thisTheme = ( o.theme === false && typeof($(self).jqmData('theme')) === 'undefined' ) ?
					( ( typeof(this.element.parentsUntil(':jqmData(theme)').parent().jqmData('theme')) === 'undefined' ) ?
						o.themeDefault : this.element.parentsUntil(':jqmData(theme)').parent().jqmData('theme') )
					: o.theme,
				trans = o.useAnimation ? o.transition : 'none';
				d = {
					input: this.element,
					wrap: this.element.wrap('<div class="ui-input-datebox ui-shadow-inset ui-corner-all ui-body-'+ thisTheme +'"></div>').parent(),
					mainWrap: pickerContent = $("<div>", { "class": 'ui-datebox-container ui-overlay-shadow ui-corner-all ui-datebox-hidden '+trans+' ui-body-'+o.theme} ).css('zIndex', o.zindex),
					intHTML: false,
				},
				touch = ( typeof window.ontouchstart !== 'undefined' ),
				drag = {
					eStart : touch ? 'touchstart' : 'mousedown',
					eMove  : touch ? 'touchmove' : 'mousemove',
					eEnd   : touch ? 'touchend' : 'mouseup',
					move   : false,
					start  : false,
					end    : false,
					pos    : false,
					target : false,
					delta  : false
				},
				ns = (typeof $.mobile.ns !== 'undefined')?$.mobile.ns:'';
				
			$.extend(w, {d: d, ns: ns, drag: drag});
			
			o.theme = thisTheme;
			
			w._date = window.Date;
			w._enhanceDate();
			
			w.theDate = new Date();
			w.initDate = w.theDate.copy();
			w.initDone = false;
			
			if ( o.useButton === true && o.useInline === false ) {
				w.d.open = $('<a href="#" class="ui-input-clear" title="'+this.__('tooltip')+'">'+this.__('tooltip')+'</a>')
					.bind(o.clickEvent, function(e) {
						e.preventDefault();
						if ( !w.disabled ) { w.d.input.trigger('datebox', {'method': 'open'}); w.d.wrap.addClass('ui-focus'); }
						setTimeout( function() { $(e.target).closest('a').removeClass($.mobile.activeBtnClass); }, 300);
					}).appendTo(w.d.wrap).buttonMarkup({icon: 'grid', iconpos: 'notext', corners:true, shadow:true})
					.css({'vertical-align': 'middle', 'display': 'inline-block'});
			}
			
			w.d.screen = $("<div>", {'class':'ui-datebox-screen ui-datebox-hidden'+((o.useModal)?' ui-datebox-screen-modal':'')})
				.css({'z-index': o.zindex-1})
				.bind(o.clickEvent, function(e) {
					e.preventDefault();
					w.d.input.trigger('datebox', {'method':'close'});
				});
			
			if ( o.enhanceInput === true && navigator.userAgent.match(/Android|iPhone|iPad/i) ){
				w.inputType = 'number';
			} else {
				w.inputType = 'text';
			}
			
			if ( o.hideInput ) { w.d.wrap.hide(); }
		
			$('label[for=\''+w.d.input.attr('id')+'\']').addClass('ui-input-text').css('verticalAlign', 'middle');

			w.d.wrap.bind(o.clickEvent, function() {
				if ( !w.disabled && ( o.noButtonFocusMode || o.focusMode ) ) { 
					w.d.input.trigger('datebox', {'method': 'open'});
					w.d.wrap.addClass('ui-focus');
					w.d.input.removeClass('ui-focus');
				}
			});
		
			w.d.input
				.removeClass('ui-corner-all ui-shadow-inset')
				.focus(function(){
					if ( w.disabled === false && o.useFocus === true ) {
						w.d.input.trigger('datebox', {'method': 'open'}); w.d.wrap.addClass('ui-focus');
					} 
					w.d.input.removeClass('ui-focus');
				})
				.blur(function(){
					w.d.wrap.removeClass('ui-focus');
					w.d.input.removeClass('ui-focus');
				})
				.change(function() {
					w.theDate = w._makeDate(w.d.input.val());
					w.refresh();
				})
				.attr("readonly", o.lockInput)
				.bind('datebox', w._event);
			
			// Check if mousewheel plugin is loaded
			if ( typeof $.event.special.mousewheel !== 'undefined' ) { w.wheelExists = true; }
		
			// Disable when done if element attribute disabled is true.
			if ( w.d.input.is(':disabled') ) {
				w.disable();
			}
			
			if ( o.useInline === true || o.useInlineBlind ) { w.open(); }
			
			//Throw dateboxinit event
			$( document ).trigger( "dateboxaftercreate" );
		},
		_build: {
			'default': function () {
				this.d.headerText = "Error";
				this.d.intHTML = $("<div class='ui-body-e'>There is no mode by that name loaded / mode not given<br />There is no mode by that name loaded / mode not given</div>");
			}
		},
		_applyCoords: function(e) {
			var w = e.widget,
				o = e.widget.options,
				fixd = {
					h: $.mobile.activePage.find('.ui-header').jqmData('position'),
					f: $.mobile.activePage.find('.ui-footer').jqmData('position'),
					fh: $.mobile.activePage.find('.ui-footer').outerHeight(),
					hh: $.mobile.activePage.find('.ui-header').outerHeight()
				},
				iput = {
					x: w.d.wrap.offset().left + (w.d.wrap.outerWidth() / 2),
					y: w.d.wrap.offset().top + (w.d.wrap.outerHeight() / 2)
				},
				size = {
					w: w.d.mainWrap.outerWidth(),
					h: w.d.mainWrap.outerHeight()
				},
				doc = {
					t: $(window).scrollTop(),
					h: $(window).height(),
					w: $.mobile.activePage.width(),
					ah: $(document).height()
				},
				pos = {
					y: (o.centerVert) ? doc.t + ((doc.h / 2) - (size.h / 2)) : iput.y  - ( size.h / 2 ),
					x: (doc.w < 400 || o.centerHoriz ) ? (doc.w / 2) - (size.w /2) : iput.x  - (size.w / 2)
				};
				
			if ( o.centerVert === false ) {
				if ( o.hideFixedToolbars === true && ( typeof fixd.f !== 'undefined' || typeof fixd.h !== 'undefined' )) {
					console.log('hiding toolbars');
					$.mobile.activePage.find(":jqmData(position='fixed')").fixedtoolbar('hide');
					fixd.f = undefined;
					fixd.h = undefined;
				}
				
				if ( typeof fixd.f !== 'undefined' ) {
					if ( ( pos.y + size.h ) > ( doc.h - fixd.fh - 2 ) ) {
						pos.y = doc.h - fixd.fh - 2 - size.h;
					}
				} else {
					if ( ( pos.y + size.h ) > ( doc.ah - fixd.fh - 2 ) ) {
						pos.y = doc.ah - fixd.fh - 2 - size.h;
					}
					if ( ( doc.h + doc.t ) < ( size.h + pos.y + 2 ) ) {
						pos.y = doc.h + doc.t - size.h - 2;
					}
				}
				
				if ( typeof fixd.h !== 'undefined' ) {
					if ( ( doc.t + fixd.hh + 2 ) > pos.y ) {
						pos.y = doc.t + fixd.hh + 2;
					}
				} else {
					if ( fixd.hh + 2 > pos.y ) {
						pos.y = fixd.hh + 2;
					}
					if ( pos.y < doc.t + 2 ) {
						pos.y = doc.t + 2;
					}
				}
			}
			w.d.mainWrap.css({'position': 'absolute', 'top': pos.y, 'left': pos.x})
		},
		open: function () {
			var w = this,
				o = this.options,
				temp = null,
				trans = o.useAnimation ? o.transition : 'none';
			
			// Call the open callback if provided. Additionally, if this
			// returns false then the open/update will stop.
			if ( o.openCallback !== false ) {
				if ( ! $.isFunction(o.openCallback) ) {
					if ( typeof window[o.openCallback] !== 'undefined' ) {
						o.openCallback = window[o.openCallback];
					} else {
						o.openCallback = new Function(o.openCallback);
					}
				}
				if ( o.openCallback.apply(self, $.merge([self.theDate],o.openCallbackArgs)) === false ) { return false; }
			}
				
			w.theDate = w._makeDate(w.d.input.val());
			w.d.input.blur();
			
			if ( typeof w._build[o.mode] === 'undefined' ) {
				w._build['default'].apply(w,[]);
			} else {
				w._build[o.mode]().apply(w,[]);
			}
			if ( w.__('useArabicIndic') === true ) { w._doIndic(); }
			
			if ( ( o.useInline === true || o.useInlineBlind === true ) && w.initDone === false ) {
				w.d.mainWrap.append(w.d.intHTML);
				w.d.input.parent().parent().append(w.d.mainWrap);
				w.d.mainWrap.removeClass('ui-datebox-hidden');
				if ( o.useInline === true ) {
					w.d.mainWrap.addClass('ui-datebox-inline');
				} else {
					w.d.mainWrap.addClass('ui-datebox-inlineblind');
				}
				w.initDone = true;
			}
				
			if ( o.useInline ) { 
				return true; }
			if ( o.useInlineBlind ) { w.d.mainWrap.slideDown(); }
			if ( w.d.intHTML.is(':visible') ) { return false; console.log('vis');} // Ignore if already open
				
			if ( o.dialogForce || ( o.dialogEnable && window.width() < 400 ) ) {
				console.log('dialog mode');
				w.d.dialogPage = $("<div data-"+w.ns+"role='dialog' class='ui-dialog-datebox' data-"+w.ns+"theme='"+o.theme+"' >" +
					"<div data-"+w.ns+"role='header' data-"+w.ns+"backbtn='false' data-"+w.ns+"theme='"+o.themeHeader+"'>" +
					"<div class='ui-title'>"+w.d.headerText+"</div></div><div data-"+w.ns+"role='content'></div></div>")
					.appendTo( $.mobile.pageContainer )
					.page().css('minHeight', '0px').addClass(trans);
				w.d.dialogPage.find('.ui-header').find('a').unbind('click vclick').bind(o.clickEvent, function(e) { e.preventDefault(); w.d.input.trigger('datebox', {'method':'close'}); });
				w.d.mainWrap.append(w.d.intHTML).css({'marginLeft':'auto', 'marginRight':'auto'}).removeClass('ui-datebox-hidden')
				w.d.dialogPage.find('.ui-content').append(w.d.mainWrap);
				$.mobile.activePage.unbind( "pagehide.remove" );
				$.mobile.changePage(w.d.dialogPage, {'transition': trans});
			} else {
				w.d.dialogPage = false;
				w.d.mainWrap.empty();
				if ( o.useHeader === true ) {
					w.d.headHTML = $('<div class="ui-header ui-bar-'+o.themeHeader+'"></div>');
					$("<a class='ui-btn-left' href='#'>Close</a>").appendTo(w.d.headHTML)
						.buttonMarkup({ theme  : o.themeHeader, icon   : 'delete', iconpos: 'notext', corners: true, shadow : true })
						.bind(o.clickEvent, function(e) { e.preventDefault(); w.d.input.trigger('datebox', {'method':'close'}); });
					$('<h1 class="ui-title">'+w.d.headerText+'</h1>').appendTo(w.d.headHTML);
					w.d.mainWrap.append(w.d.headHTML);
				}
				w.d.mainWrap.append(w.d.intHTML);
				w.d.mainWrap.appendTo($.mobile.activePage);
				w.d.screen.appendTo($.mobile.activePage);
				w._applyCoords({widget:w});
				
				if ( o.useModal === true ) { 
					w.d.screen.fadeIn('slow'); 
				} else {
					setTimeout(function () { w.d.screen.removeClass('ui-datebox-hidden');}, 500);
				}
				
				w.d.mainWrap.addClass('ui-overlay-shadow in').removeClass('ui-datebox-hidden');
				
				$(document).bind('orientationchange.datebox', {widget:w}, function(e) { w._applyCoords(e); });
				if ( o.resizeListener === true ) {
					$(window).bind('resize.datebox', {widget:w}, function (e) { w._applyCoords(e); });
				}
				
				window['w'] = w.d;
			}
		},
		close: function() {
			var w = this,
				o = this.options;
			
			if ( o.useInlineBlind === true ) { w.d.mainWrap.slideUp(); return true;}
			if ( o.useInline === true ) { return true; }

			if ( w.d.dialogPage !== false ) {
				$(w.d.dialogPage).dialog('close');
				
				if ( ! $.mobile.activePage.jqmData('page').options.domCache ) {
					$.mobile.activePage.bind('pagehide.remove', function () { $(this).remove(); });
				}
				
				w.d.intHTML.detach().empty();
				w.d.mainWrap.detach().empty();
				w.d.wrap.removeClass('ui-focus');
				setTimeout(function () { w.d.dialogPage.empty().remove(); }, 1500);
			} else {
				if ( o.useModal ) {
					w.d.screen.fadeOut('slow');
				} else {
					w.d.screen.addClass('ui-datebox-hidden');
				}
				w.d.screen.detach();
				w.d.mainWrap.addClass('ui-datebox-hidden').removeAttr('style').css('zindex', o.zindex).removeClass('in ui-overlay-shadow').empty().detach();
				w.d.intHTML.detach();
				w.d.wrap.removeClass('ui-focus');
				
				$(document).unbind('orientationchange.datebox');
				if ( o.resizeListener === true ) {
					$(window).unbind('resize.datebox');
				}
			}
					
			if ( o.closeCallback !== false ) {
				if ( ! $.isFunction(o.closeCallback) ) {
					if ( typeof window[o.closeCallback] !== 'undefined' ) {
						o.closeCallback = window[o.closeCallback];
					} else {
						o.closeCallback = new Function(o.closeCallback);
					}
				}
				o.closeCallback.apply(self, $.merge([self.theDate], o.closeCallbackArgs));
			}
		},
		refresh: function() {
			if ( typeof this._build[this.options.mode] === 'undefined' ) {
				this._build['default'].apply(w,[]);
			} else {
				this._build[this.options.mode]().apply(this,[]);
			}
			if ( this.__('useArabicIndic') === true ) { this._doIndic(); }
		},
			
	
	
	
	
	
	
	
	
	_formatTime: function(date) {
		// Shortcut to return formatted time, also handles duration
		var self = this,
			dur_collapse = [false,false,false], adv, exp_format, i, j,
			format = this.options.durationFormat,
			dur_comps = [0,0,0,0];
			
		if ( this.options.mode === 'durationbox' ) {
			adv = this.options.durationFormat;
			adv = adv.replace(/ddd/g, '.+?');
			adv = adv.replace(/DD|ss|hh|ii/g, '([0-9Dhis]+)');
			adv = new RegExp('^' + adv + '$');
			exp_format = adv.exec(this.options.durationFormat);
			
			i = self.theDate.getEpoch() - self.initDate.getEpoch(); j = i;
			
			dur_comps[0] = parseInt( i / (60*60*24),10); i = i - (dur_comps[0]*60*60*24); // Days
			dur_comps[1] = parseInt( i / (60*60),10); i = i - (dur_comps[1]*60*60); // Hours
			dur_comps[2] = parseInt( i / (60),10); i = i - (dur_comps[2]*60); // Minutes
			dur_comps[3] = i; // Seconds
			
			if ( ! exp_format[0].match(/DD/) ) { dur_collapse[0] = true; dur_comps[1] = dur_comps[1] + (dur_comps[0]*24);}
			if ( ! exp_format[0].match(/hh/) ) { dur_collapse[1] = true; dur_comps[2] = dur_comps[2] + (dur_comps[1]*60);}
			if ( ! exp_format[0].match(/ii/) ) { dur_collapse[2] = true; dur_comps[3] = dur_comps[3] + (dur_comps[2]*60);}
			
			format = format.replace('DD', dur_comps[0]);
			format = format.replace('ddd', ((dur_comps[0] > 1)?this.options.lang[this.options.useLang].durationDays[1]:this.options.lang[this.options.useLang].durationDays[0]));
			format = format.replace('hh', self._zPad(dur_comps[1]));
			format = format.replace('ii', self._zPad(dur_comps[2]));
			format = format.replace('ss', self._zPad(dur_comps[3]));
			
			if ( this.options.lang[this.options.useLang].useArabicIndic === true ) {
				return this._digitReplace(format);
			} else {
				return format;
			}
		} else {
			return this._formatter(self.options.timeOutput, date);
		}
	},
	
	
	
	_checkConstraints: function() {
		var self = this,
			testDate = null,
			o = this.options;
		
		self.dateOK = true;
		
		if ( o.afterToday !== false ) {
			testDate = new Date();
			if ( self.theDate < testDate ) { self.theDate = testDate; }
		}
		if ( o.beforeToday !== false ) {
			testDate = new Date();
			if ( self.theDate > testDate ) { self.theDate = testDate; }
		}
		if ( o.maxDays !== false ) {
			testDate = new Date();
			testDate.adjust('d', o.maxDays);
			if ( self.theDate > testDate ) { self.theDate = testDate; }
		}
		if ( o.minDays !== false ) {
			testDate = new Date();
			testDate.adjust('d', -1*o.minDays);
			if ( self.theDate < testDate ) { self.theDate = testDate; }
		}
		if ( o.maxYear !== false ) {
			testDate = new Date(o.maxYear, 0, 1);
			testDate.adjust('d', -1);
			if ( self.theDate > testDate ) { self.theDate = testDate; }
		}
		if ( o.minYear !== false ) {
			testDate = new Date(o.minYear, 0, 1);
			if ( self.theDate < testDate ) { self.theDate = testDate; }
		}
		if ( o.blackDates !== false ) {
			if ( $.inArray(self.theDate.getISO(), o.blackDates) > -1 ) { self.dateOK = false; }
		}
		if ( o.blackDays !== false ) {
			if ( $.inArray(self.theDate.getDay(), o.blackDays) > -1 ) { self.dateOK = false; }
		}
		if ( $.inArray(o.mode, ['timebox','durationbox','timeflipbox']) > -1 ) { self.dateOK = true; }
	},
	
	
	
	
	_makeElement: function(source, parts) {
		var self = this,
			part = false,
			retty = false;
		
		retty = source.clone();
		
		if ( typeof parts.attr !== 'undefined' ) {
			for ( part in parts.attr ) {
				if ( parts.attr.hasOwnProperty(part) ) {
					retty.jqmData(part, parts.attr[part]);
				}
			}
		}
		return retty;
	},
	
	
	
		_getLongOptions: function(element) {
			var key, retty = {}, prefix, temp;
			
			if ( $.mobile.ns == "" ) { 
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
		disable: function(){
			// Disable the element
			this.d.input.attr("disabled",true);
			this.d.wrap.addClass("ui-disabled").blur();
			this.disabled = true;
			this.d.input.trigger('datebox', {'method':'disable'});
		},
		enable: function(){
			// Enable the element
			this.d.input.attr("disabled", false);
			this.d.wrap.removeClass("ui-disabled");
			this.disabled = false;
			this.d.input.trigger('datebox', {'method':'enable'});
		},
		_setOption: function( key, value ) {
			$.Widget.prototype._setOption.apply( this, arguments );
			this.refresh();
		}
	});
	  
	// Degrade date inputs to text inputs, suppress standard UI functions.
	$( document ).bind( "pagebeforecreate", function( e ) {
		$( ":jqmData(role='datebox')", e.target ).each(function() {
			$(this).prop('type', 'text');
		});
	});
	// Automatically bind to data-role='datebox' items.
	$( document ).bind( "pagecreate create", function( e ){
		$( document ).trigger( "dateboxbeforecreate" );
		$( ":jqmData(role='datebox')", e.target ).each(function() {
			if ( typeof($(this).data('datebox')) === "undefined" ) {
				$(this).datebox();
			}
		});
	});
})( jQuery );
