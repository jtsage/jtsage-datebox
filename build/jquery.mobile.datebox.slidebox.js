/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notifcation.
 * https://github.com/jtsage/jquery-mobile-datebox
 */
(function($, undefined ) {
  $.widget( "mobile.datebox", $.mobile.widget, {
	options: {
		theme: 'c',
		pickPageTheme: 'b',
		pickPageInputTheme: 'e',
		pickPageButtonTheme: 'a',
		pickPageHighButtonTheme: 'e',
		pickPageTodayButtonTheme: 'e',
		pickPageSlideButtonTheme: 'd',
		noAnimation: false,
		
		disabled: false,
		wheelExists: false,
		swipeEnabled: true,
		zindex: '500',
		
		setDateButtonLabel: 'Set Date',
		setTimeButtonLabel: 'Set Time',
		setDurationButtonLabel: 'Set Duration',
		titleDateDialogLabel: 'Set Date',
		titleTimeDialogLabel: 'Set Time',
		titleDialogLabel: false,
		meridiemLetters: ['AM', 'PM'],
		daysOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		daysOfWeekShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
		monthsOfYear: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novemeber', 'December'],
		monthsOfYearShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		durationLabel: ['Days', 'Hours', 'Minutes', 'Seconds'],
		durationDays: ['Day', 'Days'],
		timeFormat: 24,
		
		mode: 'datebox',
		calShowDays: true,
		calShowOnlyMonth: false,
		useDialogForceTrue: false,
		useDialogForceFalse: false,
		useDialog: false,
		useModal: false,
		useInline: false,
		noButtonFocusMode: false,
		noButton: false,
		closeCallback: false,
		
		fieldsOrder: ['m', 'd', 'y'],
		headerFormat: 'ddd, mmm dd, YYYY',
		dateFormat: 'YYYY-MM-DD',
		minuteStep: 1,
		calWeekMode: false,
		calWeekModeFirstDay: 1,
		calWeekModeHighlight: true,
		calStartDay: 0,
		defaultDate: false,
		minYear: false,
		maxYear: false,
		afterToday: false,
		maxDays: false,
		minDays: false,
		blackDays: false,
		blackDates: false,
		durationNoDays: false,
		durationShort: true,
		durationSteppers: {'d': 1, 'h': 1, 'i': 1, 's': 1},
		disabledDayColor: '#888'
	},
	_zeroPad: function(number) {
		return ( ( number < 10 ) ? "0" : "" ) + String(number);
	},
	_isInt: function (s) {
			return (s.toString().search(/^[0-9]+$/) === 0);
	},
	_dstAdjust: function(date) {
		if (!date) { return null; }
		date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
		return date;
	},
	_getFirstDay: function(date) {
		return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
	},
	_getLastDate: function(date) {
		return 32 - this._dstAdjust(new Date(date.getFullYear(), date.getMonth(), 32)).getDate();
	},
	_getLastDateBefore: function(date) {
		return 32 - this._dstAdjust(new Date(date.getFullYear(), date.getMonth()-1, 32)).getDate();
	},
	_formatter: function(format, date) {
		format = format.replace('YYYY', date.getFullYear());
		format = format.replace('mmm',  this.options.monthsOfYear[date.getMonth()] );
		format = format.replace('MM',   this._zeroPad(date.getMonth() + 1));
		format = format.replace('mm',   date.getMonth() + 1);
		format = format.replace('ddd',  this.options.daysOfWeek[date.getDay()] );
		format = format.replace('DD',   this._zeroPad(date.getDate()));
		format = format.replace('dd',   date.getDate());
		return format;
	},
	_formatHeader: function(date) {
		return this._formatter(this.options.headerFormat, date);
	},
	_formatDate: function(date) {
		return this._formatter(this.options.dateFormat, date);
	},
	_isoDate: function(y,m,d) {
		return String(y) + '-' + (( m < 10 ) ? "0" : "") + String(m) + '-' + ((d < 10 ) ? "0" : "") + String(d);
	},
	_formatTime: function(date) {
		var self = this,
			hours = '0', h,
			i, y, days = '',
			meri = 0;
			
		if ( this.options.mode === 'durationbox' ) {
			i = ((self.theDate.getTime() - self.theDate.getMilliseconds()) / 1000) - ((self.initDate.getTime() - self.initDate.getMilliseconds()) / 1000);
			y = parseInt( i / (60*60*24),10); // Days
			if ( !self.options.durationNoDays ) {
				days = (y===0) ? '' : String(y) + ' ' + ((y>1) ? this.options.durationDays[1]:this.options.durationDays[0]) + ', ';
				i = i-(y*60*60*24);
			}
			h = parseInt( i / (60*60), 10); i = i-(h*60*60); // Hours
			y = parseInt( i / (60), 10); i = i-(y*60); // Mins
			if ( self.options.durationShort ) {
				return days + ((h>0||days!=='')?self._zeroPad(h) + ':':'') + ((y>0||h>0||days!=='')?self._zeroPad(y) + ':':'') + ((y>0||h>0||days!=='')?self._zeroPad(parseInt(i, 10)):String(i));
			} else {
				return days + self._zeroPad(h) + ':' + self._zeroPad(y) + ':' + self._zeroPad(parseInt(i, 10));
			}
		}
		if ( this.options.timeFormat === 12 ) {
			if ( date.getHours() > 11 ) {
				meri = 1;
				hours = self._zeroPad(date.getHours() - 12);
				if ( hours === '00' ) { hours = '12'; }
			} else {
				meri = 0;
				hours = self._zeroPad(date.getHours());
				if ( hours === '00' ) { hours = '12'; }
			}
			return hours + ":" + self._zeroPad(date.getMinutes()) + ' ' + this.options.meridiemLetters[meri];
		} else {
			return self._zeroPad(date.getHours()) + ":" + self._zeroPad(date.getMinutes());
		}
	},
	_makeDate: function (str) {
		str = $.trim(str);
		var o = this.options,
			self = this,
			seperator = o.dateFormat.replace(/[myd ]/gi, "").substr(0,1),
			parts = o.dateFormat.split(seperator),
			data = str.split(seperator),
			date = new Date(),
			d_day = 1,
			d_mon = 0,
			d_yar = 2000,
			seconds = 0,
			timeRegex = { '12': /^([012]?[0-9]):([0-5][0-9])\s*(am?|pm?)?$/i, '24': /^([012]?[0-9]):([0-5][0-9])$/i },
			durationRegex = /^(?:([0-9]+) .+, )?(?:([0-9]+):)?(?:([0-9]+):)?([0-9]+)$/i,
			match = null,
			i;
		
		if ( o.mode === 'durationbox' ) {
			match = durationRegex.exec(str);
			if ( match === null ) {
				return new Date(self.initDate.getTime());
			} else {
				seconds = ((self.initDate.getTime() - self.initDate.getMilliseconds()) / 1000) + parseInt(match[4],10);
				if ( typeof match[3] !== 'undefined' ) { seconds = seconds + (parseInt(match[3],10)*60); }
				if ( typeof match[2] !== 'undefined' ) { 
					if ( typeof match[3] === 'undefined' ) {
						seconds = seconds + (parseInt(match[2],10)*60); 
					} else {
						seconds = seconds + (parseInt(match[2],10)*60*60); 
					}
				}
				if ( typeof match[1] !== 'undefined' ) { seconds = seconds + (parseInt(match[1],10)*60*60*24); }
				seconds = seconds * 1000;
				return new Date(seconds);
			}
		}
		if ( o.mode === 'timebox' ) {
			
			if ( o.timeFormat === 12 ) {
				match = timeRegex[o.timeFormat].exec(str);
				
				if( match === null || match.length < 3 ) { 
					return new Date();
				} else if ( match[1] < 12 && match[3].toLowerCase().charAt(0) === 'p' ) {  
					match[1] = parseInt(match[1],10) + 12;
				} else if ( match[1] === 12 ) {
					if ( match[3].toLowerCase().charAt(0) === 'a' ) { match[1] = 0; }
					else { match[1] = 12; }
				} else {
					match[1] = parseInt(match[1],10);
				}
			} else {
				match = timeRegex[o.timeFormat].exec(str);
				
				if( match === null || match.length < 2 || match[1] > 24 ) { 
					return new Date();
				}
			}
			
			date.setMinutes(match[2]);
			date.setHours(match[1]);
			
			return date;
		} else {
			if ( parts.length !== data.length ) { // Unrecognized string in input
				if ( o.defaultDate !== false ) {
					date = new Date(o.defaultDate);
					if ( ! date.getDate() ) {
						return new Date();
					} else {
						return date;
					}
				} else {
					return new Date();
				}
			} else { // Good string in input
				for ( i=0; i<parts.length; i++ ) {
					if ( parts[i].match(/d/i) ) { d_day = data[i]; }
					if ( parts[i].match(/m/i) ) { d_mon = data[i]; }
					if ( parts[i].match(/y/i) ) { d_yar = data[i]; }
				}
				date = new Date(d_yar, d_mon-1, d_day,0,0,0,0);
				if ( ! date.getDate() ) {
					return new Date();
				} else {
					return date;
				}
			}
		}
	},
	_checker: function(date) {
		return parseInt(String(date.getFullYear()) + this._zeroPad(date.getMonth()+1) + this._zeroPad(date.getDate()),10);
	},
	_hoover: function(item) {
		$(item).toggleClass('ui-btn-up-'+$(item).attr('data-theme')+' ui-btn-down-'+$(item).attr('data-theme'));
	},
	_offset: function(mode, amount, update) {
		var self = this,
			o = this.options;
			
		if ( typeof(update) === "undefined" ) { update = true; }
		switch(mode) {
			case 'y':
				self.theDate.setYear(self.theDate.getFullYear() + amount);
				break;
			case 'm':
				self.theDate.setMonth(self.theDate.getMonth() + amount);
				break;
			case 'd':
				self.theDate.setDate(self.theDate.getDate() + amount);
				break;
			case 'h':
				self.theDate.setHours(self.theDate.getHours() + amount);
				break;
			case 'i':
				self.theDate.setMinutes(self.theDate.getMinutes() + amount);
				break;
			case 's':
				self.theDate.setSeconds(self.theDate.getSeconds() + amount);
				break;
			case 'a':
				if ( self.pickerMeri.val() === o.meridiemLetters[0] ) { 
					self._offset('h',12,false);
				} else {
					self._offset('h',-12,false);
				}
				break;
		}
		if ( update === true ) { self._update(); }
	},
	_update: function() {
		var self = this,
			o = self.options, 
			testDate = null,
			i, gridWeek, gridDay, skipThis, thisRow, y, cTheme, inheritDate,
			calmode = {};
			
		/* CLIP:DURATIONBOX */
		/* CLIP:TIMEBOX */
		/* BEGIN:SLIDEBOX */
		if ( o.mode === 'slidebox' ) {
			if ( o.afterToday !== false ) {
				testDate = new Date();
				if ( self.theDate < testDate ) { self.theDate = testDate; }
			}
			if ( o.maxDays !== false ) {
				testDate = new Date();
				testDate.setDate(testDate.getDate() + o.maxDays);
				if ( self.theDate > testDate ) { self.theDate = testDate; }
			}
			if ( o.minDays !== false ) {
				testDate = new Date();
				testDate.setDate(testDate.getDate() - o.minDays);
				if ( self.theDate < testDate ) { self.theDate = testDate; }
			}
			if ( o.maxYear !== false ) {
				testDate = new Date(o.maxYear, 0, 1);
				testDate.setDate(testDate.getDate() - 1);
				if ( self.theDate > testDate ) { self.theDate = testDate; }
			}
			if ( o.minYear !== false ) {
				testDate = new Date(o.minYear, 0, 1);
				if ( self.theDate < testDate ) { self.theDate = testDate; }
			}
			
			inheritDate = self._makeDate(self.input.val());
			
			self.controlsHeader.html( self._formatHeader(self.theDate) );
			self.controlsInput.html('');
			
			for ( y=0; y<3; y++ ) {
				thisRow = $("<div>", {'class': 'ui-datebox-sliderow', 'data-rowtype': y});
				if ( o.wheelExists ) {
					thisRow.bind('mousewheel', function(e,d) {
						e.preventDefault();
						self._offset(['y','m','d'][$(this).attr('data-rowtype')], ((d>0)?1:-1));
					});
				}
				if ( o.swipeEnabled ) {
					thisRow
						.bind('swipeleft', function() { self._offset(['y','m','d'][$(this).attr('data-rowtype')], [3,5,7][$(this).attr('data-rowtype')]);  })
						.bind('swiperight', function() { self._offset(['y','m','d'][$(this).attr('data-rowtype')], -1*[3,5,7][$(this).attr('data-rowtype')]); });
				}
				switch (y) {
					case 0:
						for ( i=-1; i<2; i++ ) {
							cTheme = ((inheritDate.getFullYear()===(self.theDate.getFullYear() + i))?o.pickPageHighButtonTheme:o.pickPageSlideButtonTheme);
							if ( i === 0 ) { cTheme = o.pickPageButtonTheme; }
							$("<div>", { 'class' : 'ui-datebox-slideyear ui-corner-all ui-btn-up-'+cTheme })
								.text(self.theDate.getFullYear() + i)
								.attr('data-offset', i)
								.attr('data-theme', cTheme)
								.bind('vmouseover vmouseout', function() { self._hoover(this); })
								.bind('vclick', function(e) { e.preventDefault(); self._offset('y', parseInt($(this).attr('data-offset'),10)); })
								.appendTo(thisRow);
						}
						break;
					case 1:
						for ( i=-2; i<3; i++ ) {
							testDate = new Date(self.theDate.getFullYear(), self.theDate.getMonth(), self.theDate.getDate());
							testDate.setMonth(testDate.getMonth()+i);
							cTheme = ( inheritDate.getMonth() === testDate.getMonth() && inheritDate.getYear() === testDate.getYear() ) ? o.pickPageHighButtonTheme : o.pickPageSlideButtonTheme;
							if ( i === 0 ) { cTheme = o.pickPageButtonTheme; }
							$("<div>", { 'class' : 'ui-datebox-slidemonth ui-corner-all ui-btn-up-'+cTheme })
								.attr('data-offset',i)
								.attr('data-theme', cTheme)
								.text(o.monthsOfYearShort[testDate.getMonth()])
								.bind('vmouseover vmouseout', function() { self._hoover(this); })
								.bind('vclick', function(e) { e.preventDefault(); self._offset('m', parseInt($(this).attr('data-offset'),10)); })
								.appendTo(thisRow);
						}
						break;
					case 2:
						$("<div>", {'class' : 'ui-datebox-slidearrow ui-corner-all ui-btn-up-'+o.pickPageButtonTheme})
							.attr('data-theme', o.pickPageButtonTheme)
							.text('<')
							.bind('vmouseover vmouseout', function() { self._hoover(this); })
							.bind('vclick', function(e) { e.preventDefault(); self._offset('d', -7); })
							.appendTo(thisRow);
						for ( i=-3; i<4; i++ ) {
							testDate = new Date(self.theDate.getFullYear(), self.theDate.getMonth(), self.theDate.getDate());
							testDate.setDate(testDate.getDate()+i);
							cTheme = ( inheritDate.getDate() === testDate.getDate() && inheritDate.getMonth() === testDate.getMonth() && inheritDate.getYear() === testDate.getYear() ) ? o.pickPageHighButtonTheme : o.pickPageSlideButtonTheme;
							if ( i === 0 ) { cTheme = o.pickPageButtonTheme; }
							
							$("<div>", { 'class' : 'ui-datebox-slideday ui-corner-all ui-btn-up-'+cTheme })
								.attr('data-offset', i)
								.attr('data-theme', cTheme)
								.html(testDate.getDate() + '<br /><span class="ui-datebox-slidewday">' + o.daysOfWeekShort[testDate.getDay()] + '</span>')
								.bind('vmouseover vmouseout', function() { self._hoover(this); })
								.bind('vclick', function(e) { e.preventDefault(); self._offset('d', parseInt($(this).attr('data-offset'),10)); })
								.appendTo(thisRow);
						}
						$("<div>", {'class' : 'ui-datebox-slidearrow ui-corner-all ui-btn-up-'+o.pickPageButtonTheme})
							.attr('data-theme', o.pickPageButtonTheme)
							.text('>')
							.bind('vmouseover vmouseout', function() { self._hoover(this); })
							.bind('vclick', function(e) { e.preventDefault(); self._offset('d', 7); })
							.appendTo(thisRow);
						break;
				}
				thisRow.appendTo(self.controlsInput);
			}
		}
		/* END:SLIDEBOX */
		/* CLIP:DATEBOX */
		/* CLIP:CALBOX */
	},
	_create: function() {
		var self = this,
			o = $.extend(this.options, this.element.data('options')),
			input = this.element,
			focusedEl = input.wrap('<div class="ui-input-datebox ui-shadow-inset ui-corner-all ui-body-'+ o.theme +'"></div>').parent(),
			theDate = new Date(),
			initDate = new Date(theDate.getTime()),
			dialogTitle = ((o.titleDialogLabel === false)?((o.mode==='timebox')?o.titleTimeDialogLabel:o.titleDateDialogLabel):o.titleDialogLabel),
			openbutton = $('<a href="#" class="ui-input-clear" title="date picker">date picker</a>')
				.bind('vclick', function (e) {
					e.preventDefault();
					if ( !o.disabled ) { self.open(); }
					setTimeout( function() { $(e.target).closest("a").removeClass($.mobile.activeBtnClass); }, 300);
				})
				.appendTo(focusedEl).buttonMarkup({icon: 'grid', iconpos: 'notext', corners:true, shadow:true})
				.css({'vertical-align': 'middle', 'float': 'right'}),
			thisPage = input.closest('.ui-page'),
			pickPage = $("<div data-role='dialog' class='ui-dialog-datebox' data-theme='" + o.pickPageTheme + "' >" +
						"<div data-role='header' data-backbtn='false' data-theme='a'>" +
							"<div class='ui-title'>" + dialogTitle + "</div>"+
						"</div>"+
						"<div data-role='content'></div>"+
					"</div>")
					.appendTo( $.mobile.pageContainer )
					.page().css('minHeight', '0px').css('zIndex', o.zindex).addClass('pop'),
			pickPageContent = pickPage.find( ".ui-content" );
			
		$('label[for='+input.attr('id')+']').addClass('ui-input-text').css('verticalAlign', 'middle');
		
		o.mode = 'slidebox'
			
		if ( o.noButtonFocusMode || o.useInline || o.noButton ) { openbutton.hide(); }
		
		focusedEl.tap(function() {
			if ( !o.disabled && o.noButtonFocusMode ) { self.open(); }
		});
		
		input
			.removeClass('ui-corner-all ui-shadow-inset')
			.focus(function(){
				if ( ! o.disabled ) {
					focusedEl.addClass('ui-focus');
					if ( o.noButtonFocusMode ) { focusedEl.addClass('ui-focus'); self.open(); }
				}
				input.removeClass('ui-focus');
			})
			.blur(function(){
				focusedEl.removeClass('ui-focus');
				input.removeClass('ui-focus');
			})
			.change(function() {
				self.theDate = self._makeDate(self.input.val());
				self._update();
			});
		
		pickPage.find( ".ui-header a").bind('vclick', function(e) {
			e.preventDefault();
			e.stopImmediatePropagation();
			self.close();
		});

		$.extend(self, {
			pickPage: pickPage,
			thisPage: thisPage,
			pickPageContent: pickPageContent,
			input: input,
			theDate: theDate,
			initDate: initDate,
			focusedEl: focusedEl
		});
		
		if ( typeof $.event.special.mousewheel !== 'undefined' ) { o.wheelExists = true; }
		
		self._buildPage();
		
		if ( input.is(':disabled') ) {
			self.disable();
		}
	},
	_buildPage: function () {
		var self = this,
			o = self.options, x, newHour,
			linkdiv =$("<div><a href='#'></a></div>"),
			pickerContent = $("<div>", { "class": 'ui-datebox-container ui-overlay-shadow ui-corner-all ui-datebox-hidden pop ui-body-'+o.pickPageTheme} ).css('zIndex', o.zindex),
			templInput = $("<input type='text' />").addClass('ui-input-text ui-corner-all ui-shadow-inset ui-datebox-input ui-body-'+o.pickPageInputTheme),
			templControls = $("<div>", { "class":'ui-datebox-controls' }),
			controlsPlus, controlsInput, controlsMinus, controlsSet, controlsHeader,
			pickerHour, pickerMins, pickerMeri, pickerMon, pickerDay, pickerYar, pickerSecs,
			calNoNext = false,
			calNoPrev = false,
			screen = $("<div>", {'class':'ui-datebox-screen ui-datebox-hidden'+((o.useModal)?' ui-datebox-screen-modal':'')})
				.css({'z-index': o.zindex-1})
				.appendTo(self.thisPage)
				.bind("vclick", function(event) {
					self.close();
					event.preventDefault();
				});
		
		if ( o.noAnimation ) { pickerContent.removeClass('pop');	}
		
		/* CLIP:DURATIONBOX */
		/* CLIP:TIMEBOX */
		/* CLIP:DATEBOX */
		/* CLIP:CALBOX */
		/* BEGIN:SLIDEBOX */
		if ( o.mode === 'slidebox' ) {
			controlsHeader = $("<div class='ui-datebox-header'><h4>Unitialized</h4></div>").appendTo(pickerContent).find("h4");
			controlsInput = $('<div>').addClass('ui-datebox-slide').appendTo(pickerContent);
			controlsSet = $("<div>", { "class":'ui-datebox-controls'}).appendTo(pickerContent);
				
			$("<a href='#'>" + o.setDateButtonLabel + "</a>")
				.appendTo(controlsSet).buttonMarkup({theme: o.pickPageTheme, icon: 'check', iconpos: 'left', corners:true, shadow:true})
				.bind('vclick', function(e) {
					e.preventDefault();
					self.input.val(self._formatDate(self.theDate)).trigger('change');
					self.close();
				});
				
			$.extend(self, {
				controlsHeader: controlsHeader,
				controlsInput: controlsInput
			});
			
			pickerContent.appendTo(self.thisPage);
		}
		/* END:SLIDEBOX */

		$.extend(self, {
			pickerContent: pickerContent,
			screen: screen
		});
		
		if ( o.useInline ) { 
			self.input.parent().parent().append(self.pickerContent);
			if ( o.useInlineHideInput ) { self.input.parent().hide(); }
			self.input.trigger('change');
			self.pickerContent.removeClass('ui-datebox-hidden');
		}
			
	},
	refresh: function() {
		if ( this.options.useInline === true ) {
			this.input.trigger('change');
		}
		this._update();
	},
	open: function() {
		this.input.trigger('change').blur();
		
		var self = this,
			o = this.options,
			inputOffset = self.focusedEl.offset(),
			pickWinHeight = self.pickerContent.outerHeight(),
			pickWinWidth = self.pickerContent.innerWidth(),
			pickWinTop = inputOffset.top + ( self.focusedEl.outerHeight() / 2 )- ( pickWinHeight / 2),
			pickWinLeft = inputOffset.left + ( self.focusedEl.outerWidth() / 2) - ( pickWinWidth / 2);

		if ( o.useInline ) { return false; }
					
		if ( (pickWinHeight + pickWinTop) > $(document).height() ) {
			pickWinTop = $(document).height() - (pickWinHeight + 2);
		}
		if ( pickWinTop < 45 ) { pickWinTop = 45; }
		
		if ( ( $(document).width() > 400 && !o.useDialogForceTrue ) || o.useDialogForceFalse ) {
			o.useDialog = false;
			if ( o.useModal ) {
				self.screen.fadeIn('slow');
			} else {
				self.screen.removeClass('ui-datebox-hidden');
			}
			self.pickerContent.addClass('ui-overlay-shadow in').css({'position': 'absolute', 'top': pickWinTop, 'left': pickWinLeft}).removeClass('ui-datebox-hidden');
		} else {
			o.useDialog = true;
			self.pickPageContent.append(self.pickerContent);
			self.pickerContent.css({'top': 'auto', 'left': 'auto', 'marginLeft': 'auto', 'marginRight': 'auto'}).removeClass('ui-overlay-shadow ui-datebox-hidden');
			$.mobile.changePage(self.pickPage, 'pop', false, true);
		}
	},
	close: function() {
		var self = this,
			callback;

		if ( self.options.useInline ) {
			return true;
		}

		if ( self.options.useDialog ) {
			$(self.pickPage).dialog('close');
			self.pickerContent.addClass('ui-datebox-hidden').removeAttr('style').css('zIndex', self.options.zindex);
			self.thisPage.append(self.pickerContent);
		} else {
			if ( self.options.useModal ) {
				self.screen.fadeOut('slow');
			} else {
				self.screen.addClass('ui-datebox-hidden');
			}
			self.pickerContent.addClass('ui-datebox-hidden').removeAttr('style').css('zIndex', self.options.zindex).removeClass('in');
		}
		self.focusedEl.removeClass('ui-focus');
		
		if ( self.options.closeCallback !== false ) { callback = new Function(self.options.closeCallback); callback(); }
	},
	disable: function(){
		this.element.attr("disabled",true);
		this.element.parent().addClass("ui-disabled");
		this.options.disabled = true;
		this.element.blur();
	},
	enable: function(){
		this.element.attr("disabled", false);
		this.element.parent().removeClass("ui-disabled");
		this.options.disabled = false;
	}
	
  });
	
  $( ".ui-page" ).live( "pagecreate", function() { 
	$( 'input[data-role="datebox"]', this ).each(function() {
		$(this).datebox();
	});

  });
	
})( jQuery );
