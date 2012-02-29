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
			themeDialogHeader: 'a',
			
			centerHoriz: false,
			centerVert: false,
			transition: 'pop',
			useAnimation: true,
			
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
			console.log(e);
			console.log(p);
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
					if ( typeof o.defaultPickerValue === "number" && o.defaultPickerValue > 0 ) {
						return new w._date((w.initDate.getEpoch() + parseInt(o.defaultPickerValue,10))*1000);
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
					if ( o.defaultPickerValue !== false ) {
						if ( $.isArray(o.defaultPickerValue) && o.defaultPickerValue.length === 3 ) {
							if ( o.mode === 'timebox' || o.mode === 'timeflipbox' ) {
								return new w._date(found_date[0], found_date[1], found_date[2], o.defaultPickerValue[0], o.defaultPickerValue[1], o.defaultPickerValue[2], 0);
							}
							else {
								return new w._date(o.defaultPickerValue[0], o.defaultPickerValue[1], o.defaultPickerValue[2], 0, 0, 0, 0);
							}
						}
						else if ( typeof o.defaultPickerValue === "number" ) {
							return new w._date(o.defaultPickerValue * 1000);
						}
						else {
							if ( o.mode === 'timebox' || o.mode === 'timeflipbox' ) {
								exp_temp = o.defaultPickerValue.split(':');
								if ( exp_temp.length === 3 ) {
									date = new w._date(found_date[0], found_date[1], found_date[2], parseInt(exp_temp[0],10),parseInt(exp_temp[1],10),parseInt(exp_temp[2],10),0);
								}
							}
							else {
								exp_temp = o.defaultPickerValue.split('-');
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
						return w._makeOrd(date.getDate());
					default:
						return match;
				}
			});
		
			if ( w.__('useArabicIndic') === true ) {
				format = w._digitReplace(format);
			}
		
			return format;
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
				d = {
					input: this.element,
					wrap: this.element.wrap('<div class="ui-input-datebox ui-shadow-inset ui-corner-all ui-body-'+ thisTheme +'"></div>').parent(),
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
			
			if ( o.useButton === true && o.useInline === false ) {
				w.d.open = $('<a href="#" class="ui-input-clear" title="'+this.__('tooltip')+'">'+this.__('tooltip')+'</a>')
					.bind(o.clickEvent, function(e) {
						e.preventDefault();
						if ( !w.disabled ) { w.d.input.trigger('datebox', {'method': 'open'}); w.d.wrap.addClass('ui-focus'); }
						setTimeout( function() { $(e.target).closest('a').removeClass($.mobile.activeBtnClass); }, 300);
					}).appendTo(w.d.wrap).buttonMarkup({icon: 'grid', iconpos: 'notext', corners:true, shadow:true})
					.css({'vertical-align': 'middle', 'display': 'inline-block'});
			}
			
			if( o.enhanceInput === true && navigator.userAgent.match(/Android|iPhone|iPad/i) ){
				w.inputType = 'number';
			} else {
				w.inputType = 'text';
			}
		
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
					w._update();
				})
				.attr("readonly", o.lockInput)
				.bind('datebox', w._event);
			
			// Check if mousewheel plugin is loaded
			if ( typeof $.event.special.mousewheel !== 'undefined' ) { w.wheelExists = true; }
		
			// Disable when done if element attribute disabled is true.
			if ( w.d.input.is(':disabled') ) {
				w.disable();
			}
			
			//Throw dateboxinit event
			$( document ).trigger( "dateboxaftercreate" );
		},
	
	
	_getCoords: function(widget) {
		var self = widget,
			inputOffset   = widget.focusedEl.offset(),
			inputHigh     = widget.focusedEl.outerHeight(),
			inputWidth    = widget.focusedEl.outerWidth(),
			docWinWidth   = $.mobile.activePage.width(),
			docWinHighOff = $(window).scrollTop(),
			docWinHigh    = $(window).height(),
			diaWinWidth   = widget.pickerContent.innerWidth(),
			diaWinHigh    = widget.pickerContent.outerHeight(),
			pageitem      = false,
			minTop        = 0, // Minimum TOP measurment (absolute)
			padTop        = 0, // Padding for TOP measurment (fixed header)
			unPadBottom   = 0, // Padding for BOTTOM measurement (fixed header)
			maxBottom     = $(document).height(), // Max BOTTOM measurement (absolute)
			
			coords        = {
				'high'    : $(window).height(),
				'width'   : $.mobile.activePage.width(),
				'fullTop' : $(window).scrollTop(),
				'fullLeft': $(window).scrollLeft()
			};
			
		if ( widget.options.centerWindow ) { // If it's centered, no need for lots of checks.
			coords.winTop = docWinHighOff + (( docWinHigh / 2 ) - ( diaWinHigh / 2 ) );
			coords.winLeft = (( docWinWidth / 2 ) - ( diaWinWidth / 2 ) );
		} else {
			pageitem = $('.ui-header', $.mobile.activePage);
			if ( pageitem.length > 0 ) {
				if ( pageitem.is('.ui-header-fixed')) {
					padTop = ( pageitem.outerHeight() + 2 );
				} else {
					minTop += ( pageitem.outerHeight() + 2 );
				}
			}
			pageitem = $('.ui-footer', $.mobile.activePage);
			if ( pageitem.length > 0 ) {
				if ( pageitem.is('.ui-footer-fixed')) {
					unPadBottom = ( pageitem.outerHeight() + 2 );
				} else {
					maxBottom -= ( pageitem.outerHeight() + 2 );
				}
			}
			coords.winLeft = (inputOffset.left + ( inputWidth / 2 )) - ( diaWinWidth / 2 );
			
			// Trap for small screens (center horizontally instead)
			if ( docWinWidth < 450 ) {
				coords.winLeft = (( docWinWidth / 2 ) - ( diaWinWidth / 2 ) );
			}
			
			coords.winTop = (inputOffset.top + ( inputHigh / 2)) - ( diaWinHigh / 2 );
			
			// Not beyond bottom of page or on footer (not fixed)
			if ( (coords.winTop + diaWinHigh) > maxBottom ) {
				coords.winTop += ( maxBottom - ( coords.winTop + diaWinHigh ) );
			}
			
			// Not on the footer either (but only if it floats)
			if ( unPadBottom > 0 && (( coords.winTop + diaWinHigh - docWinHighOff ) > (docWinHigh - unPadBottom)) ) {
				coords.winTop = (( docWinHigh - unPadBottom + docWinHighOff - diaWinHigh ));
			}
			// Not on the header (not fixed)
			if ( coords.winTop < minTop ) { coords.winTop = minTop; }
			
			// Not on the floating header either (fixed)
			if ( padTop > 0 && ( coords.winTop < ( docWinHighOff + padTop ) ) )  {
				coords.winTop = docWinHighOff + padTop;
			} else if ( docWinHighOff > minTop && docWinHighOff > coords.winTop ) {
				// This one for non fixed scroll?
				coords.winTop = docWinHighOff + 2;
			}
				
		}
		return coords;
	},
	_fixArray: function(arr) {
		var x = 0,
			self = this,
			exp = new RegExp('^([0-9]+)-([0-9]+)-([0-9]+)$'),
			matches = null;
		
		if ( $.isArray(arr) ) {
			for ( x=0; x<arr.length; x++) {
				matches = [0];
				matches = exp.exec(arr[x]);
				if ( matches.length === 4 ) {
					arr[x] = matches[1] + '-' + self._zPad(parseInt(matches[2],10)) + '-' + self._zPad(parseInt(matches[3],10));
				}
			}
		}
		return arr;
	},
	
	_makeDisplayIndic: function() {
		var self = this,
			o = this.options;
			
		self.pickerContent.find('*').each(function() {
			if ( $(this).children().length < 1 ) {
				$(this).text(self._digitReplace($(this).text()));
			} else if ( $(this).hasClass('ui-datebox-slideday') ) {
				$(this).html(self._digitReplace($(this).html()));
			}
		});
		self.pickerContent.find('input').each(function() {
			$(this).val(self._digitReplace($(this).val()));
		});
	},
	
	_makeOrd: function (num) {
		// Return an ordinal suffix (1st, 2nd, 3rd, etc)
		var ending = num % 10;
		if ( num > 9 && num < 21 ) { return 'th'; }
		if ( ending > 3 ) { return 'th'; }
		return ['th','st','nd','rd'][ending];
	},
	_isInt: function (s) {
		// Bool, return is a number is an integer
		return (s.toString().search(/^[0-9]+$/) === 0);
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
	
	_hoover: function(item) {
		// Hover toggle class, for calendar
		$(item).toggleClass('ui-btn-up-'+$(item).jqmData('theme')+' ui-btn-down-'+$(item).jqmData('theme'));
	},
	_offset: function(mode, amount, update) {
		// Compute a date/time offset.
		//   update = false to prevent controls refresh
		var self = this,
			o = this.options,
			ok = false;
			
		if ( typeof(update) === "undefined" ) { update = true; }
		self.input.trigger('datebox', {'method':'offset', 'type':mode, 'amount':amount});
		switch(mode) {
			case 'y': ok = true; break;
			case 'm':
				if ( o.rolloverMode.m || ( self.theDate.getMonth() + amount < 12 && self.theDate.getMonth() + amount > -1 ) ) {
					ok = true;
				}
				break;
			case 'd':
				if ( o.rolloverMode.d || (
					self.theDate.getDate() + amount > 0 &&
					self.theDate.getDate() + amount < (self._getLastDate(self.theDate) + 1) ) ) {
						ok = true;
				}
				break;
			case 'h':
				if ( o.rolloverMode.h || (
					self.theDate.getHours() + amount > -1 &&
					self.theDate.getHours() + amount < 24 ) ) {
						ok = true;
				}
				break;
			case 'i':
				if ( o.rolloverMode.i || (
					self.theDate.getMinutes() + amount > -1 &&
					self.theDate.getMinutes() + amount < 60 ) ) {
						ok = true;
				}
				break;
			case 's':
				if ( o.rolloverMode.s || (
					self.theDate.getSeconds() + amount > -1 &&
					self.theDate.getSeconds() + amount < 60 ) ) {
						ok = true;
				}
				break;
			case 'a':
				if ( self.pickerMeri.val() === o.meridiemLetters[0] ) { 
					self._offset('h',12,false);
				} else {
					self._offset('h',-12,false);
				}
				break;
		}
		if ( ok === true ) { self.theDate.adjust(mode,amount); }
		if ( update === true ) { self._update(); }
	},
	_updateduration: function() {
		// Update the duration contols when inputs are directly edited.
		var self = this,
			secs = self.initDate.getEpoch();
		
		if ( !self._isInt(self.pickerDay.val())  ) { self.pickerDay.val(0); }
		if ( !self._isInt(self.pickerHour.val()) ) { self.pickerHour.val(0); }
		if ( !self._isInt(self.pickerMins.val()) ) { self.pickerMins.val(0); }
		if ( !self._isInt(self.pickerSecs.val()) ) { self.pickerSecs.val(0); }
		
		secs = secs + (parseInt(self.pickerDay.val(),10) * 60 * 60 * 24);
		secs = secs + (parseInt(self.pickerHour.val(),10) * 60 * 60);
		secs = secs + (parseInt(self.pickerMins.val(),10) * 60);
		secs = secs + (parseInt(self.pickerSecs.val(),10));
		self.theDate.setTime( secs * 1000 );
		self._update();
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
	_orientChange: function(e) {
		var self = e.data.widget,
			o = e.data.widget.options,
			coords = e.data.widget._getCoords(e.data.widget); // Get the coords now, since we need em.
		
		e.stopPropagation();
		if ( ! self.pickerContent.is(':visible') || o.useDialog === true ) { 
			return false;  // Not open, or in a dialog (let jQM do it)
		} else {
			if ( o.fullScreen == true && ( coords.width < 400 || o.fullScreenForce === true ) ) {
				self.pickerContent.css({'top': coords.fullTop, 'left': coords.fullLeft, 'height': coords.high, 'width': coords.width, 'maxWidth': coords.width });
			} else {
				self.pickerContent.css({'top': coords.winTop, 'left': coords.winLeft});
			}
		}
	},
	_update: function() {
		// Update the display on date change
		var self = this,
			o = self.options, 
			testDate = null,
			i, gridWeek, gridDay, skipThis, thisRow, y, cTheme, inheritDate, thisPRow, tmpVal, disVal,
			interval = {'d': 60*60*24, 'h': 60*60, 'i': 60, 's':1},
			calmode = {};
			
		self.input.trigger('datebox', {'method':'refresh'});
		/* BEGIN:DURATIONBOX */
		if ( o.mode === 'durationbox' ) {
			i = self.theDate.getEpoch() - self.initDate.getEpoch();
			if ( i<0 ) { i = 0; self.theDate.setTime(self.initDate.getTime()); }
			o.lastDuration = i; // Let the number of seconds be sort of public.
			
			/* DAYS */
			y = parseInt( i / interval.d,10); 
			i = i - ( y * interval.d ); 
			self.pickerDay.val(y);
			
			/* HOURS */
			y = parseInt( i / interval.h, 10);
			i = i - ( y * interval.h );
			self.pickerHour.val(y);
			
			/* MINS AND SECS */
			y = parseInt( i / interval.i, 10);
			i = i - ( y * interval.i); 
			self.pickerMins.val(y);
			self.pickerSecs.val(parseInt(i,10));
		}
		/* END:DURATIONBOX */
		/* BEGIN:TIMEBOX */
		if ( o.mode === 'timebox' ) {
			if ( o.minuteStep !== 1 ) {
				i = self.theDate.getMinutes() % o.minuteStep;
				if ( i !== 0 ) { self.theDate.adjust('m', -1*i); }
			}
			self.pickerMins.val(self._zPad(self.theDate.getMinutes()));
			if ( o.lang[o.useLang].timeFormat === 12 || o.timeFormatOverride === 12 ) { // Handle meridiems
				if ( self.theDate.getHours() > 11 ) {
					self.pickerMeri.val(o.meridiemLetters[1]);
					if ( self.theDate.getHours() === 12 ) {
						self.pickerHour.val(12);
					} else {
						self.pickerHour.val(self.theDate.getHours() - 12);
					}
				} else {
					self.pickerMeri.val(o.meridiemLetters[0]);
					if ( self.theDate.getHours() === 0 ) {
						self.pickerHour.val(12);
					} else {
						self.pickerHour.val(self.theDate.getHours());
					}
				}
			} else {
				self.pickerHour.val(self.theDate.getHours());
			}
		}
		/* END:TIMEBOX */
		/* BEGIN:FLIPBOX */
		if ( o.mode === 'flipbox' || o.mode === 'timeflipbox' ) {
			self._checkConstraints();
			
			inheritDate = self._makeDate(self.input.val());
			
			self.controlsHeader.empty().html( self._formatHeader(self.theDate) );
			
			for ( y=0; y<o.fieldsOrder.length; y++ ) {
				tmpVal = true;
				switch (o.fieldsOrder[y]) {
					case 'y':
						thisRow = self.pickerYar.find('ul');
						thisRow.empty();
						for ( i=-15; i<16; i++ ) {
							cTheme = ((inheritDate.getFullYear()===(self.theDate.getFullYear() + i))?o.pickPageHighButtonTheme:o.pickPageFlipButtonTheme);
							if ( i === 0 ) { cTheme = o.pickPageButtonTheme; }
							$("<li>", { 'class' : 'ui-body-'+cTheme, 'style':((tmpVal===true)?'margin-top: -453px':'') })
								.html("<span>"+(self.theDate.getFullYear() + i)+"</span>")
								.appendTo(thisRow);
							tmpVal = false;
						}
						break;
					case 'm':
						thisRow = self.pickerMon.find('ul');
						thisRow.empty();
						for ( i=-12; i<13; i++ ) {
							testDate = new Date(self.theDate.getFullYear(), self.theDate.getMonth(), 1);
							testDate.adjust('m',i);
							cTheme = ( inheritDate.getMonth() === testDate.getMonth() && inheritDate.getYear() === testDate.getYear() ) ? o.pickPageHighButtonTheme : o.pickPageFlipButtonTheme;
							if ( i === 0 ) { cTheme = o.pickPageButtonTheme; }
							$("<li>", { 'class' : 'ui-body-'+cTheme, 'style':((tmpVal===true)?'margin-top: -357px':'') })
								.html("<span>"+o.lang[o.useLang].monthsOfYearShort[testDate.getMonth()]+"</span>")
								.appendTo(thisRow);
							tmpVal = false;
						}
						break;
					case 'd':
						thisRow = self.pickerDay.find('ul');
						thisRow.empty();
						for ( i=-15; i<16; i++ ) {
							testDate = self.theDate.copy();
							testDate.adjust('d',i);
							disVal = "";
							if ( ( o.blackDates !== false && $.inArray(testDate.getISO(), o.blackDates) > -1 ) ||
								( o.blackDays !== false && $.inArray(testDate.getDay(), o.blackDays) > -1 ) ) {
								disVal = " ui-datebox-griddate-disable";
							}
							cTheme = ( inheritDate.getDate() === testDate.getDate() && inheritDate.getMonth() === testDate.getMonth() && inheritDate.getYear() === testDate.getYear() ) ? o.pickPageHighButtonTheme : o.pickPageFlipButtonTheme;
							if ( i === 0 ) { cTheme = o.pickPageButtonTheme; }
							$("<li>", { 'class' : 'ui-body-'+cTheme+disVal, 'style':((tmpVal===true)?'margin-top: -453px':'') })
								.html("<span>"+testDate.getDate()+"</span>")
								.appendTo(thisRow);
							tmpVal = false;
						}
						break;
					case 'h':
						thisRow = self.pickerHour.find('ul');
						thisRow.empty();
						for ( i=-12; i<13; i++ ) {
							testDate = self.theDate.copy();
							testDate.adjust('h',i);
							cTheme = ( i === 0 ) ?  o.pickPageButtonTheme : o.pickPageFlipButtonTheme;
							$("<li>", { 'class' : 'ui-body-'+cTheme, 'style':((tmpVal===true)?'margin-top: -357px':'') })
								.html("<span>"+( ( o.lang[o.useLang].timeFormat === 12 || o.timeFormatOverride === 12  ) ? ( ( testDate.getHours() === 0 ) ? '12' : ( ( testDate.getHours() < 12 ) ? testDate.getHours() : ( ( testDate.getHours() === 12 ) ? '12' : (testDate.getHours()-12) ) ) ) : testDate.getHours() )+"</span>")
								.appendTo(thisRow);
							tmpVal = false;
						}
						break;
					case 'i':
						thisRow = self.pickerMins.find('ul');
						thisRow.empty();
						for ( i=-30; i<31; i++ ) {
							if ( o.minuteStep > 1 ) { self.theDate.setMinutes(self.theDate.getMinutes() - (self.theDate.getMinutes() % o.minuteStep)); }
							testDate = self.theDate.copy();
							testDate.adjust('i',(i*o.minuteStep));
							cTheme = ( i === 0 ) ?  o.pickPageButtonTheme : o.pickPageFlipButtonTheme;
							$("<li>", { 'class' : 'ui-body-'+cTheme, 'style':((tmpVal===true)?'margin-top: -933px':'') })
								.html("<span>"+self._zPad(testDate.getMinutes())+"</span>")
								.appendTo(thisRow);
							tmpVal = false; 
						}
						break;
					case 'a':
						thisRow = self.pickerMeri.find('ul');
						thisRow.empty();
						if ( self.theDate.getHours() > 11 ) { 
							tmpVal = '-65';
							cTheme = [o.pickPageFlipButtonTheme, o.pickPageButtonTheme];
						} else {
							tmpVal = '-33';
							cTheme = [o.pickPageButtonTheme, o.pickPageFlipButtonTheme];
						}
						$("<li>").appendTo(thisRow).clone().appendTo(thisRow);
						$("<li>", { 'class' : 'ui-body-'+cTheme[0], 'style':'margin-top: '+tmpVal+'px' })
							.html("<span>"+o.meridiemLetters[0]+"</span>")
							.appendTo(thisRow);
						$("<li>", { 'class' : 'ui-body-'+cTheme[1] })
							.html("<span>"+o.meridiemLetters[1]+"</span>")
							.appendTo(thisRow);
						$("<li>").appendTo(thisRow).clone().appendTo(thisRow);
						break;
				}
			}
		}
		/* END:FLIPBOX */
		/* BEGIN:SLIDEBOX */
		if ( o.mode === 'slidebox' ) {
			self._checkConstraints();
			
			inheritDate = self._makeDate(self.input.val());
			
			self.controlsHeader.empty().html( self._formatHeader(self.theDate) );
			self.controlsInput.empty();
			
			self.controlsInput.delegate('.ui-datebox-sliderow-int>div', o.clickEvent, function(e) {
				e.preventDefault();
				self._offset($(this).parent().jqmData('rowtype'), parseInt($(this).jqmData('offset'),10));
			});
			self.controlsInput.delegate('.ui-datebox-sliderow-int>div', 'vmouseover vmouseout', function() {
				self._hoover(this);
			});
			
			if ( o.wheelExists ) {
				self.controlsInput.delegate('.ui-datebox-sliderow-int', 'mousewheel', function(e,d) {
					e.preventDefault();
					self._offset($(this).jqmData('rowtype'), ((d>0)?1:-1));
				});
			}
			
			if ( o.swipeEnabled ) {
				self.controlsInput.delegate('.ui-datebox-sliderow-int', self.START_DRAG, function(e) {
					if ( !self.dragMove ) {
						self.dragMove = true;
						self.dragTarget = $(this);
						self.dragPos = parseInt(self.dragTarget.css('marginLeft').replace(/px/i, ''),10);
						self.dragStart = self.touch ? e.originalEvent.changedTouches[0].pageX : e.pageX;
						self.dragEnd = false;
						e.stopPropagation();
						e.preventDefault();
					}
				});
			}
			
			for ( y=0; y<o.fieldsOrder.length; y++ ) {
				thisPRow = $("<div>").jqmData('rowtype', o.fieldsOrder[y]);
				thisRow = $("<div>", {'class': 'ui-datebox-sliderow-int'}).jqmData('rowtype',o.fieldsOrder[y]).appendTo(thisPRow);
				
				if ( o.lang[o.useLang].isRTL === true ) { thisRow.css('direction', 'rtl'); }
				
				switch (o.fieldsOrder[y]) {
					case 'y':
						thisPRow.addClass('ui-datebox-sliderow-ym');
						thisRow.css('marginLeft', '-333px');
						for ( i=-5; i<6; i++ ) {
							cTheme = ((inheritDate.getFullYear()===(self.theDate.getFullYear() + i))?o.pickPageHighButtonTheme:o.pickPageSlideButtonTheme);
							if ( i === 0 ) { cTheme = o.pickPageButtonTheme; }
							$("<div>", { 'class' : 'ui-datebox-slideyear ui-corner-all ui-btn-up-'+cTheme })
								.html(self.theDate.getFullYear() + i)
								.jqmData('offset', i)
								.jqmData('theme', cTheme)
								.appendTo(thisRow);
						}
						break;
					case 'm':
						thisPRow.addClass('ui-datebox-sliderow-ym');
						thisRow.css('marginLeft', '-204px');
						for ( i=-6; i<7; i++ ) {
							testDate = new Date(self.theDate.getFullYear(), self.theDate.getMonth(), 1);
							testDate.adjust('m',i);
							cTheme = ( inheritDate.getMonth() === testDate.getMonth() && inheritDate.getYear() === testDate.getYear() ) ? o.pickPageHighButtonTheme : o.pickPageSlideButtonTheme;
							if ( i === 0 ) { cTheme = o.pickPageButtonTheme; }
							$("<div>", { 'class' : 'ui-datebox-slidemonth ui-corner-all ui-btn-up-'+cTheme })
								.jqmData('offset', i)
								.jqmData('theme', cTheme)
								.html(o.lang[o.useLang].monthsOfYearShort[testDate.getMonth()])
								.appendTo(thisRow);
						}
						break;
					case 'd':
						thisPRow.addClass('ui-datebox-sliderow-d');
						thisRow.css('marginLeft', '-386px');
						for ( i=-15; i<16; i++ ) {
							testDate = self.theDate.copy();
							testDate.adjust('d',i);
							disVal = "";
							if ( ( o.blackDates !== false && $.inArray(testDate.getISO(), o.blackDates) > -1 ) ||
								( o.blackDays !== false && $.inArray(testDate.getDay(), o.blackDays) > -1 ) ) {
								disVal = " ui-datebox-griddate-disable";
							}
							cTheme = ( inheritDate.getDate() === testDate.getDate() && inheritDate.getMonth() === testDate.getMonth() && inheritDate.getYear() === testDate.getYear() ) ? o.pickPageHighButtonTheme : o.pickPageSlideButtonTheme;
							if ( i === 0 ) { cTheme = o.pickPageButtonTheme; }
							
							$("<div>", { 'class' : 'ui-datebox-slideday ui-corner-all ui-btn-up-'+cTheme+disVal })
								.jqmData('offset', i)
								.jqmData('theme', cTheme)
								.html(testDate.getDate() + '<br /><span class="ui-datebox-slidewday">' + o.lang[o.useLang].daysOfWeekShort[testDate.getDay()] + '</span>')
								.appendTo(thisRow);
						}
						break;
					case 'h':
						thisPRow.addClass('ui-datebox-sliderow-hi');
						thisRow.css('marginLeft', '-284px');
						for ( i=-12; i<13; i++ ) {
							testDate = self.theDate.copy();
							testDate.adjust('h',i);
							cTheme = ( i === 0 ) ?  o.pickPageButtonTheme : o.pickPageSlideButtonTheme;
							$("<div>", { 'class' : 'ui-datebox-slidehour ui-corner-all ui-btn-up-'+cTheme })
								.jqmData('offset', i)
								.jqmData('theme', cTheme)
								.html(( ( o.lang[o.useLang].timeFormat === 12 || o.timeFormatOverride === 12 ) ? ( ( testDate.getHours() === 0 ) ? '12<span class="ui-datebox-slidewday">AM</span>' : ( ( testDate.getHours() < 12 ) ? testDate.getHours() + '<span class="ui-datebox-slidewday">AM</span>' : ( ( testDate.getHours() === 12 ) ? '12<span class="ui-datebox-slidewday">PM</span>' : (testDate.getHours()-12) + '<span class="ui-datebox-slidewday">PM</span>') ) ) : testDate.getHours() ))
								.appendTo(thisRow);
						}
						break;
					case 'i':
						thisPRow.addClass('ui-datebox-sliderow-hi');
						thisRow.css('marginLeft', '-896px');
						for ( i=-30; i<31; i++ ) {
							testDate = self.theDate.copy();
							testDate.adjust('i',i);
							cTheme = ( i === 0 ) ?  o.pickPageButtonTheme : o.pickPageSlideButtonTheme;
							$("<div>", { 'class' : 'ui-datebox-slidemins ui-corner-all ui-btn-up-'+cTheme })
								.jqmData('offset', i)
								.jqmData('theme', cTheme)
								.html(self._zPad(testDate.getMinutes()))
								.appendTo(thisRow);
						}
						break;
				}
				thisPRow.appendTo(self.controlsInput);
			}
		}
		/* END:SLIDEBOX */
		/* BEGIN:DATEBOX */
		if ( o.mode === 'datebox' ) {
			self._checkConstraints();
			
			self.controlsHeader.empty().html( self._formatHeader(self.theDate) );
			self.pickerMon.val(self.theDate.getMonth() + 1);
			self.pickerDay.val(self.theDate.getDate());
			self.pickerYar.val(self.theDate.getFullYear());
			
			if ( self.dateOK !== true ) {
				self.controlsInput.find('input').addClass('ui-datebox-griddate-disable');
			} else {
				self.controlsInput.find('.ui-datebox-griddate-disable').removeClass('ui-datebox-griddate-disable');
			}
		}
		/* END:DATEBOX */
		/* BEGIN:CALBOX */
		if ( o.mode === 'calbox' ) { // Meat and potatos - make the calendar grid.
			self.controlsInput.empty().html( o.lang[o.useLang].monthsOfYear[self.theDate.getMonth()] + " " + self.theDate.getFullYear() );
			self.controlsPlus.empty();
			
			calmode = {'today': -1, 'highlightDay': -1, 'presetDay': -1, 'nexttoday': 1,
				'thisDate': new Date(), 'maxDate': new Date(), 'minDate': new Date(), 'startDay': false,
				'currentMonth': false, 'weekMode': 0, 'weekDays': null, 'thisTheme': o.pickPageButtonTheme };
			calmode.start = self._getFirstDay(self.theDate);
			calmode.end = self._getLastDate(self.theDate);
			calmode.lastend = self._getLastDateBefore(self.theDate);
			calmode.presetDate = self._makeDate(self.input.val());	
						
			if ( o.calStartDay !== false || typeof o.lang[o.useLang].calStartDay === "number" ) {
				if ( o.calStartDay !== false ) {
					calmode.start = calmode.start - o.calStartDay;
					calmode.startDay = o.calStartDay;
				} else {
					calmode.start = calmode.start - o.lang[o.useLang].calStartDay;
					calmode.startDay = o.lang[o.useLang].calStartDay;
				}
				if ( calmode.start < 0 ) { calmode.start = calmode.start + 7; }
			}
			
			calmode.prevtoday = calmode.lastend - (calmode.start - 1);
			calmode.checkDates = ( o.enableDates === false && ( o.afterToday !== false || o.beforeToday !== false || o.notToday !== false || o.maxDays !== false || o.minDays !== false || o.blackDates !== false || o.blackDays !== false ) );
				
			if ( calmode.thisDate.getMonth() === self.theDate.getMonth() && calmode.thisDate.getFullYear() === self.theDate.getFullYear() ) { calmode.currentMonth = true; calmode.highlightDay = calmode.thisDate.getDate(); } 
			if ( calmode.presetDate.getComp() === self.theDate.getComp() ) { calmode.presetDay = calmode.presetDate.getDate(); }
			
			self.calNoPrev = false; self.calNoNext = false;
			
			if ( o.afterToday === true && 
				( calmode.currentMonth === true || ( calmode.thisDate.getMonth() >= self.theDate.getMonth() && self.theDate.getFullYear() === calmode.thisDate.getFullYear() ) ) ) { 
				self.calNoPrev = true; }
			if ( o.beforeToday === true &&
				( calmode.currentMonth === true || ( calmode.thisDate.getMonth() <= self.theDate.getMonth() && self.theDate.getFullYear() === calmode.thisDate.getFullYear() ) ) ) {
				self.calNoNext = true; }
			
			if ( o.minDays !== false ) {
				calmode.minDate.adjust('d', -1*o.minDays);
				if ( self.theDate.getFullYear() === calmode.minDate.getFullYear() && self.theDate.getMonth() <= calmode.minDate.getMonth() ) { self.calNoPrev = true;}
			}
			if ( o.maxDays !== false ) {
				calmode.maxDate.adjust('d', o.maxDays);
				if ( self.theDate.getFullYear() === calmode.maxDate.getFullYear() && self.theDate.getMonth() >= calmode.maxDate.getMonth() ) { self.calNoNext = true;}
			}
			
			if ( o.calShowDays ) {
				if ( o.lang[o.useLang].daysOfWeekShort.length < 8 ) { o.daysOfWeekShort = o.lang[o.useLang].daysOfWeekShort.concat(o.lang[o.useLang].daysOfWeekShort); }
				calmode.weekDays = $("<div>", {'class':'ui-datebox-gridrow'}).appendTo(self.controlsPlus);
				if ( o.lang[o.useLang].isRTL === true ) { calmode.weekDays.css('direction', 'rtl'); }
				for ( i=0; i<=6;i++ ) {
					$("<div>"+o.lang[o.useLang].daysOfWeekShort[(i+calmode.startDay)%7]+"</div>").addClass('ui-datebox-griddate ui-datebox-griddate-empty ui-datebox-griddate-label').appendTo(calmode.weekDays);
				}
			}
			
			if ( o.fixDateArrays === true ) {
				o.blackDates   = self._fixArray(o.blackDates);
				o.highDates    = self._fixArray(o.highDates);
				o.highDatesAlt = self._fixArray(o.highDatesAlt);
				o.enableDates  = self._fixArray(o.enableDates);
			}
				
			for ( gridWeek=0; gridWeek<=5; gridWeek++ ) {
				if ( gridWeek === 0 || ( gridWeek > 0 && (calmode.today > 0 && calmode.today <= calmode.end) ) ) {
					thisRow = $("<div>", {'class': 'ui-datebox-gridrow'});
					if ( o.lang[o.useLang].isRTL === true ) { thisRow.css('direction', 'rtl'); }
					for ( gridDay=0; gridDay<=6; gridDay++) {
						if ( gridDay === 0 ) { calmode.weekMode = ( calmode.today < 1 ) ? (calmode.prevtoday - calmode.lastend + o.calWeekModeFirstDay) : (calmode.today + o.calWeekModeFirstDay); }
						if ( gridDay === calmode.start && gridWeek === 0 ) { calmode.today = 1; }
						if ( calmode.today > calmode.end ) { calmode.today = -1; }
						if ( calmode.today < 1 ) {
							if ( o.calShowOnlyMonth ) {
								$("<div>", {'class': 'ui-datebox-griddate ui-datebox-griddate-empty'}).appendTo(thisRow);
							} else {
								if ( o.enableDates !== false ) {
									if ( 
										( $.inArray(self.theDate.copymod([0,-1],[0,0,calmode.prevtoday]).getISO(), o.enableDates) > -1 ) ||
										( $.inArray(self.theDate.copymod([0,1],[0,0,calmode.nexttoday]).getISO(), o.enableDates) > -1 ) ) {
											skipThis = false;
									} else { skipThis = true; }
								} else {
									if (
										( o.afterToday !== false && gridWeek === 0 && calmode.thisDate.getMonth() >= self.theDate.getMonth()-1 && self.theDate.getFullYear() === calmode.thisDate.getFullYear() && calmode.thisDate.getDate() > calmode.prevtoday ) ||
										( o.beforeToday !== false && gridWeek !== 0 && calmode.thisDate.getMonth() <= self.theDate.getMonth()+1 && self.theDate.getFullYear() === calmode.thisDate.getFullYear() && calmode.thisDate.getDate() < calmode.nexttoday ) ||
										( o.blackDays !== false && $.inArray(gridDay, o.blackDays) > -1 ) ||
										( o.blackDates !== false && $.inArray(self.theDate.copymod([0,-1],[0,0,calmode.prevtoday]).getISO(), o.blackDates) > -1 ) ||
										( o.blackDates !== false && $.inArray(self.theDate.copymod([0,1],[0,0,calmode.nexttoday]).getISO(), o.blackDates) > -1 ) ) {
											skipThis = true;
									} else { skipThis = false; }
								}
									
								if ( gridWeek === 0 ) {
									$("<div>"+String(calmode.prevtoday)+"</div>")
										.addClass('ui-datebox-griddate ui-datebox-griddate-empty').appendTo(thisRow)
										.jqmData('date', ((o.calWeekMode)?(calmode.weekMode+calmode.lastend):calmode.prevtoday))
										.jqmData('enabled', (!skipThis && !self.calNoPrev))
										.jqmData('month', -1);
									calmode.prevtoday++;
								} else {
									$("<div>"+String(calmode.nexttoday)+"</div>")
										.addClass('ui-datebox-griddate ui-datebox-griddate-empty').appendTo(thisRow)
										.jqmData('date', ((o.calWeekMode)?calmode.weekMode:calmode.nexttoday))
										.jqmData('enabled', (!skipThis && !self.calNoNext))
										.jqmData('month', 1);
									calmode.nexttoday++;
								}
							}
						} else {
							skipThis = false;
							if ( o.enableDates ) {
								if ( $.inArray(self.theDate.copymod([0],[0,0,calmode.today]).getISO(), o.enableDates) < 0 ) {
									skipThis = true;
								}
							}
							if ( calmode.checkDates ) {
								if ( o.afterToday && calmode.thisDate.getComp() > (self.theDate.getComp()+calmode.today-self.theDate.getDate()) ) {
									skipThis = true;
								} 
								if ( !skipThis && o.beforeToday && calmode.thisDate.getComp() < (self.theDate.getComp()+calmode.today-self.theDate.getDate()) ) {
									skipThis = true;
								}
								if ( !skipThis && o.notToday && calmode.today === calmode.highlightDay ) {
									skipThis = true;
								}
								if ( !skipThis && o.maxDays !== false && calmode.maxDate.getComp() < (self.theDate.getComp()+calmode.today-self.theDate.getDate()) ) {
									skipThis = true;
								} 
								if ( !skipThis && o.minDays !== false && calmode.minDate.getComp() > (self.theDate.getComp()+calmode.today-self.theDate.getDate()) ) {
									skipThis = true;
								} 
								if ( !skipThis && ( o.blackDays !== false || o.blackDates !== false ) ) { // Blacklists
									if ( 
										( $.inArray(gridDay, o.blackDays) > -1 ) ||
										( $.inArray(self.theDate.copymod([0],[0,0,calmode.today]).getISO(), o.blackDates) > -1 ) ) { 
											skipThis = true;
									}
								}
							}
							
							if ( o.calHighPicked && calmode.today === calmode.presetDay ) { 
								calmode.thisTheme = o.pickPageHighButtonTheme;
							} else if ( o.calHighToday && calmode.today === calmode.highlightDay ) {
								calmode.thisTheme = o.pickPageTodayButtonTheme;
							} else if ( $.isArray(o.highDatesAlt) && ($.inArray(self.theDate.copymod([0],[0,0,calmode.today]).getISO(), o.highDatesAlt) > -1 ) ) {
								calmode.thisTheme = o.pickPageOAHighButtonTheme;
							} else if ( $.isArray(o.highDates) && ($.inArray(self.theDate.copymod([0],[0,0,calmode.today]).getISO(), o.highDates) > -1 ) ) {
								calmode.thisTheme = o.pickPageOHighButtonTheme;
							} else if ( $.isArray(o.highDays) && $.inArray(gridDay, o.highDays) > -1 ) {
								calmode.thisTheme = o.pickPageODHighButtonTheme;
							} else {
								calmode.thisTheme = o.pickPageButtonTheme;
							}
							
							$("<div>"+String(calmode.today)+"</div>")
								.addClass('ui-datebox-griddate ui-corner-all ui-btn-up-' + calmode.thisTheme + ((skipThis)?' ui-datebox-griddate-disable':''))
								.jqmData('date', ((o.calWeekMode)?calmode.weekMode:calmode.today))
								.jqmData('theme', calmode.thisTheme)
								.jqmData('enabled', !skipThis)
								.jqmData('month', 0)
								.appendTo(thisRow);
							calmode.today++;
						}
					}
				}
				thisRow.appendTo(self.controlsPlus);
			}
			self.controlsPlus.delegate('div.ui-datebox-griddate', o.clickEvent +  ' vmouseover vmouseout', function(e) {
				if ( e.type === o.clickEvent ) {
					e.preventDefault();
					if ( $(this).jqmData('enabled') ) {
						
						if ( $(this).jqmData('month') < 0 ) {
							self.theDate.adjust('m', -1);
							self.theDate.setDate($(this).jqmData('date'));
						} else if ( $(this).jqmData('month') > 0 ) {
							self.theDate.setDate($(this).jqmData('date'));
							if ( !o.calWeekMode ) { self.theDate.adjust('m',1); }
						} else {
							self.theDate.setDate($(this).jqmData('date'));
						}
						self.input.trigger('datebox', {'method':'set', 'value':self._formatDate(self.theDate), 'date':self.theDate});
						self.input.trigger('datebox', {'method':'close'});
					}
				} else {
					if ( $(this).jqmData('enabled') && typeof $(this).jqmData('theme') !== 'undefined' ) {
						if ( o.calWeekMode !== false && o.calWeekModeHighlight === true ) {
							$(this).parent().find('div').each(function() { self._hoover(this); });
						} else { self._hoover(this); }
					}
				}
			});
		}
		/* END:CALBOX */
		
		if ( o.lang[this.options.useLang].useArabicIndic === true ) {
			self._makeDisplayIndic();
		}
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
	
	_buildPage: function () {
		// Build the CONSTANT controls (these never change)
		var self = this,
			o = self.options, 
			pickerContent = $("<div>", { "class": 'ui-datebox-container ui-overlay-shadow ui-corner-all ui-datebox-hidden '+o.transition+' ui-body-'+o.pickPageTheme} ).css('zIndex', o.zindex),
			screen = $("<div>", {'class':'ui-datebox-screen ui-datebox-hidden'+((o.useModal)?' ui-datebox-screen-modal':'')})
				.css({'z-index': o.zindex-1})
				.appendTo(self.thisPage)
				.bind(o.clickEvent, function(event) {
					event.preventDefault();
					self.input.trigger('datebox', {'method':'close'});
				});
		
		if ( o.noAnimation ) { pickerContent.removeClass(o.transition); }
		
		$.extend(self, {
			pickerContent: pickerContent,
			screen: screen
		});
		
		self._buildInternals();
		
		// If useInline mode, drop it into the document, and stop a few events from working (or just hide the trigger)
		if ( o.useInline || o.useInlineBlind ) { 
			self.input.parent().parent().append(self.pickerContent);
			if ( o.useInlineHideInput ) { self.input.parent().hide(); }
			self.input.trigger('change');
			self.pickerContent.removeClass('ui-datebox-hidden');
		} else if ( o.centerWindow && o.useInlineHideInput ) {
			self.input.parent().hide();
		}
		if ( o.useInline ) {
			self.pickerContent.addClass('ui-datebox-inline');
			self.open();
		}
		if ( o.useInlineBlind ) {
			self.pickerContent.addClass('ui-datebox-inlineblind');
			self.pickerContent.hide();
		}
			
	},
	hardreset: function() {
		// Public shortcut to rebuild all internals
		this._buildInternals();
		this.refresh();
		this._buttonsTitle();
	},
	refresh: function() {
		// Pulic shortcut to _update, with an extra hook for inline mode.
		if ( this.options.useInline === true ) {
			this.input.trigger('change');
		}
		this._update();
	},
	open: function() {
		var self = this,
			o = this.options,
			coords = false, // Later, if need be
			transition = o.noAnimation ? 'none' : o.transition,
			callback, activePage;
			
		// Call the open callback if provided. Additionally, if this
		// returns falsy then the open of the dialog will be canceled
		if ( o.openCallback !== false ) {
			if ( ! $.isFunction(this.options.openCallback) ) {
				if ( typeof window[o.openCallback] !== 'undefined' ) {
					o.openCallback = window[o.openCallback];
				} else {
					o.openCallback = new Function(o.openCallback);
				}
			}
			callback = o.openCallback.apply(self, $.merge([self.theDate],o.openCallbackArgs));
			if ( callback == false ) { return false; }
		}
		
		
		self._buttonsTitle();
		
		// Open the controls
		if ( this.options.useInlineBlind ) { this.pickerContent.slideDown(); return false; } // Just slide if blinds mode
		if ( this.options.useInline ) { return true; } // Ignore if inline
		if ( this.pickPage.is(':visible') ) { return false; } // Ignore if already open
		
		this.theDate = this._makeDate(this.input.val());
		this._update();
		this.input.blur(); // Grab latest value of input, in case it changed
		
		// If the window is less than 400px wide, use the jQM dialog method unless otherwise forced
		if ( ( $(document).width() > 400 && !o.useDialogForceTrue ) || o.useDialogForceFalse || o.fullScreen ) {
			coords = this._getCoords(this); // Get the coords now, since we need em.
			o.useDialog = false;
			if ( o.nestedBox === true && o.fullScreen === false ) { 
				activePage = $('.ui-page-active').first(); 
				$(activePage).append(self.pickerContent);
				$(activePage).append(self.screen);
			}
			if ( o.fullScreenAlways === false || coords.width > 399 ) {
				if ( o.useModal === true ) { // If model, fade the background screen
					self.screen.fadeIn('slow');
				} else { // Else just unhide it since it's transparent (with a delay to prevent insta-close)
					setTimeout(function() {self.screen.removeClass('ui-datebox-hidden');}, 500);
				}
			}
			
			if ( o.fullScreenAlways === true || ( o.fullScreen === true && coords.width < 400 ) ) {
				self.pickerContent.addClass('in').css({'position': 'absolute', 'text-align': 'center', 'top': coords.fullTop-5, 'left': coords.fullLeft-5, 'height': coords.high, 'width': coords.width}).removeClass('ui-datebox-hidden');
			} else {
				self.pickerContent.addClass('ui-overlay-shadow in').css({'position': 'absolute', 'top': coords.winTop, 'left': coords.winLeft}).removeClass('ui-datebox-hidden');
				$(document).bind('orientationchange.datebox', {widget:self}, function(e) { self._orientChange(e); });
				if ( o.resizeListener === true ) {
					$(window).bind('resize.datebox', {widget:self}, function (e) { self._orientChange(e); });
				}
			}
		} else {
			// prevent the parent page from being removed from the DOM,
			self.thisPage.unbind( "pagehide.remove" );
			o.useDialog = true;
			self.pickPageContent.append(self.pickerContent);
			self.pickerContent.css({'top': 'auto', 'left': 'auto', 'marginLeft': 'auto', 'marginRight': 'auto'}).removeClass('ui-overlay-shadow ui-datebox-hidden');
			$.mobile.changePage(self.pickPage, {'transition': transition});
		}
	},
	close: function(fromCloseButton) {
		// Close the controls
		var self = this,
			o = this.options,
			callback;

		if ( o.useInlineBlind ) {
			self.pickerContent.slideUp();
			return false; // No More!
		}
		if ( o.useInline ) {
			return true;
		}
		
		// Check options to see if we are closing a dialog, or removing a popup
		if ( o.useDialog ) {
			if (!fromCloseButton) {
				$(self.pickPage).dialog('close');
			}
			if( !self.thisPage.jqmData("page").options.domCache ){
				self.thisPage.bind( "pagehide.remove", function() {
					$(self).remove();
				});
			}
			self.pickerContent.addClass('ui-datebox-hidden').removeAttr('style').css('zIndex', self.options.zindex);
			self.thisPage.append(self.pickerContent);
		} else {
			if ( o.useModal ) {
				self.screen.fadeOut('slow');
			} else {
				self.screen.addClass('ui-datebox-hidden');
			}
			self.pickerContent.addClass('ui-datebox-hidden').removeAttr('style').css('zIndex', self.options.zindex).removeClass('in');
		}
		self.focusedEl.removeClass('ui-focus');
		
		$(document).unbind('orientationchange.datebox');
		if ( o.resizeListener === true ) {
			$(window).unbind('resize.datebox');
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
	disable: function(){
		// Disable the element
		this.element.attr("disabled",true);
		this.element.parent().addClass("ui-disabled");
		this.options.disabled = true;
		this.element.blur();
		this.input.trigger('datebox', {'method':'disable'});
	},
	enable: function(){
		// Enable the element
		this.element.attr("disabled", false);
		this.element.parent().removeClass("ui-disabled");
		this.options.disabled = false;
		this.input.trigger('datebox', {'method':'enable'});
	},
	_setOption: function( key, value ) {
		var noReset = ['minYear','maxYear','afterToday','beforeToday','maxDays','minDays','highDays','highDates','blackDays','blackDates','enableDates'];
		$.Widget.prototype._setOption.apply( this, arguments );
		if ( $.inArray(key, noReset) > -1 ) {
			this.refresh();
		} else {
			this.hardreset();
		}
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
