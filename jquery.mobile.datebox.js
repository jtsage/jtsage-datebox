/*
 * jQuery Mobile Framework : plugin to provide an android-like datepicker.
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
		noAnimation: false,
		
		disabled: false,
		zindex: '500',
		
		setDateButtonLabel: 'Set date',
		setTimeButtonLabel: 'Set time',
		titleDateDialogLabel: 'Set Date',
		titleTimeDialogLabel: 'Set Time',
		titleDialogLabel: false,
		meridiemLetters: ['AM', 'PM'],
		daysOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		daysOfWeekShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
		monthsOfYear: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novemeber', 'December'],
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
		
		fieldsOrder: ['m', 'd', 'y'],
		headerFormat: 'ddd, mmm dd, YYYY',
		dateFormat: 'YYYY-MM-DD',
		minuteStep: 1,
		defaultDate: false,
		minYear: false,
		maxYear: false,
		afterToday: false,
		maxDays: false,
		minDays: false,
		blackDays: false,
		blackDates: false,
		disabledDayColor: '#888',
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
	_formatHeader: function(date) {
		var header = this.options.headerFormat,
			padMonth = (( date.getMonth() < 9 ) ? "0" : "") + ( date.getMonth() + 1 ),
			padDay = (( date.getDate() < 10 ) ? "0" : "") + date.getDate();
	  
		header = header.replace('YYYY', date.getFullYear());
		header = header.replace('mmm',  this.options.monthsOfYear[date.getMonth()] );
		header = header.replace('MM',   padMonth);
		header = header.replace('mm',   date.getMonth() + 1);
		header = header.replace('ddd',  this.options.daysOfWeek[date.getDay()] );
		header = header.replace('DD',   padDay);
		header = header.replace('dd',   date.getDate());
	
		return header;
	},
	_formatDate: function(date) {
		var dateStr = this.options.dateFormat,
			padMonth = (( date.getMonth() < 9 ) ? "0" : "") + ( date.getMonth() + 1 ),
			padDay = (( date.getDate() < 10 ) ? "0" : "") + date.getDate();
			
		dateStr = dateStr.replace('YYYY', date.getFullYear());
		dateStr = dateStr.replace('MM', padMonth);
		dateStr = dateStr.replace('mm', (date.getMonth() + 1));
		dateStr = dateStr.replace('DD', padDay);
		dateStr = dateStr.replace('dd', date.getDate());
		
		return dateStr;
	},
	_formatTime: function(date) {
		var hours = 0,
			meri = '',
			padMin = (( date.getMinutes() < 10 ) ? "0" : "") + ( date.getMinutes() );
			
		if ( this.options.timeFormat == 12 ) {
			if ( date.getHours() > 11 ) {
				meri = 1;
				if ( date.getHours() < 22 ) { 
					hours = '0' + ( date.getHours() - 12 ); 
				} else {
					hours = '' + ( date.getHours() - 12 );
				}
			} else {
				meri = 0;
				if ( date.getHours() > 9 ) {
					hours = '' + date.getHours();
				} else {
					if ( date.getHours() == 0 ) {
						hours = '' + 12;
					} else {
						hours = '0' + date.getHours();
					}
				}
			}
			if ( date.getHours() == 12 ) { meri = 1; hours = '12'; }
			return hours + ":" + padMin + ' ' + this.options.meridiemLetters[meri];
		} else {
			return (( date.getHours() < 9 ) ? "0" : "") + date.getHours() + ":" + padMin;
		}
	},
	_makeDate: function (str) {
		str = $.trim(str);
		var o = this.options,
			self = this,
			seperator = o.dateFormat.replace(/[myd ]/gi, "").substr(0,1),
			parts = o.dateFormat.split(seperator),
			data = str.split(seperator),
			date = new Date();
			
		if ( o.mode == 'timebox' ) {
			
			if ( str == '' ) { // EMPTY FIELD
				return date;
			}
			
			if ( o.timeFormat == 12 ) {
				var timeRegex = /^([012]?[0-9]):([0-5][0-9])\s*(am?|pm?)?$/i,
					match = timeRegex.exec(str);
					
				if(match === null) { //use current time if no match
					return date;
				}
				if(match[1] <= 12 && match[3] && match[3].toLowerCase().charAt(0) == 'p') { //ignore pm if hour >12
					match[1] = parseInt(match[1],10) + 12;
				}
				if(match[1] == 12 && match[3] && match[3].toLowerCase().charAt(0) == 'a') { //12am is the 0 hour
					match[1] = 0;
				}
			} else {
				var timeRegex = /^([012]?[0-9]):([0-5][0-9])$/i,
					match = timeRegex.exec(str);
					
				if(match === null) { //use current time if no match
					return date;
				}
			}
			
			if(match[1] > 24) { //use current time if hour out of range
				return date;
			}
			
			date.setMinutes(match[2]);
			date.setHours(match[1]);
			
			return date;
		} else {
			if ( parts.length != data.length ) { // Unrecognized string in input
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
				if ( parts.length < 3 ) { d_day = 1; } //Probably a CC Expiration Field 
				for ( i=0; i<parts.length; i++ ) {
					if ( parts[i].match(/d/i) ) { d_day = data[i]; }
					if ( parts[i].match(/m/i) ) { d_mon = data[i]; }
					if ( parts[i].match(/y/i) ) { d_yar = data[i]; }
				}
				date = new Date(d_yar, d_mon-1, d_day);
				if ( ! date.getDate() ) {
					return new Date();
				} else {
					return date;
				}
			}
		}
	},
	refresh: function() {
		this._update();
	},
	_update: function() {
		var self = this,
			o = self.options;
			
		if ( o.mode == 'timebox' ) {
			self.pickerMins.val(self.theDate.getMinutes());
			if ( o.timeFormat == 12 ) {
				if ( self.theDate.getHours() > 11 ) {
					self.pickerMeri.val(o.meridiemLetters[1]);
					if ( self.theDate.getHours() == 12 ) {
						self.pickerHour.val(12);
					} else {
						self.pickerHour.val(self.theDate.getHours() - 12);
					}
				} else {
					self.pickerMeri.val(o.meridiemLetters[0]);
					if ( self.theDate.getHours() == 0 ) {
						self.pickerHour.val(12);
					} else {
						self.pickerHour.val(self.theDate.getHours());
					}
				}
			} else {
				self.pickerHour.val(self.theDate.getHours());
			}
		}
		if ( o.mode == 'datebox' ) {
			if ( o.afterToday ) {
				var today = new Date();
				if ( self.theDate < today ) { self.theDate = today; }
			}
			if ( o.maxDays !== false ) {
				var maxday = new Date();
				maxday.setDate(maxday.getDate() + o.maxDays);
				if ( self.theDate > maxday ) { self.theDate = maxday; }
			}
			if ( o.minDays !== false ) {
				var minday = new Date();
				minday.setDate(minday.getDate() - o.minDays);
				if ( self.theDate < minday ) { self.theDate = minday; }
			}
			self.pickerHeader.html( self._formatHeader(self.theDate) );
			self.pickerMon.val(self.theDate.getMonth() + 1);
			self.pickerDay.val(self.theDate.getDate());
			self.pickerYar.val(self.theDate.getFullYear());
		}
		if ( o.mode == 'calbox' ) { // Meat and potatos - make the calendar grid.
			self.pickerDate.text(
				o.monthsOfYear[self.theDate.getMonth()] + " " 
				+ self.theDate.getFullYear()
			);
			self.pickerGrid.html('');
			
			var start = self._getFirstDay(self.theDate),
				end = self._getLastDate(self.theDate),
				lastend = self._getLastDateBefore(self.theDate),
				today = -1,
				thisDate = new Date(),
				presetDate = self._makeDate(self.input.val()),
				highlightDay = -1,
				presetDay = -1,
				prevtoday = lastend - (start - 1),
				nexttoday = 1,
				currentMonth = false,
				maxDate = new Date(),
				minDate = new Date(),
				skipPrev = false,
				skipNext = false,
				curBlackYear = false,
				curBlackMonth = false;
				
			if ( thisDate.getMonth() === self.theDate.getMonth() && thisDate.getFullYear() === self.theDate.getFullYear() ) { currentMonth = true; highlightDay = thisDate.getDate(); } 
			if ( presetDate.getMonth() === self.theDate.getMonth() && presetDate.getFullYear() === self.theDate.getFullYear() ) { presetDay = presetDate.getDate(); } 

			if ( o.blackDates !== false ) { // DATES Blacklist
				if ( ! ( $.isArray(o.blackDates) && ( o.blackDates['y'+self.theDate.getFullYear()] == undefined ) ) ) {
					curBlackYear = o.blackDates['y'+self.theDate.getFullYear()];
					if ( ! ( curBlackYear['m'+(self.theDate.getMonth()+1)] == undefined ) ) {
						curBlackMonth = curBlackYear['m'+(self.theDate.getMonth()+1)];
					}
				}
			}
			
			self.calNoPrev = false;
			self.calNoNext = false;
			
			if ( o.afterToday && currentMonth ) { skipPrev = true; self.calNoPrev = true; }
			if ( thisDate.getMonth() > self.theDate.getMonth() && self.theDate.getFullYear() == thisDate.getFullYear() && o.afterToday ) { skipPrev = true; self.calNoPrev = true; }
			if ( o.minDays !== false ) {
				minDate.setDate(minDate.getDate() - o.minDays);
				if ( self.theDate.getFullYear() == minDate.getFullYear() && self.theDate.getMonth() <= minDate.getMonth() ) { skipPrev = true; self.calNoPrev = true;}
			}
			if ( o.maxDays !== false ) {
				maxDate.setDate(maxDate.getDate() + o.maxDays);
				if ( self.theDate.getFullYear() == maxDate.getFullYear() && self.theDate.getMonth() >= maxDate.getMonth() ) { skipNext = true; self.calNoNext = true;}
			}
			
			if ( o.calShowDays ) {
				var weekDays = $("<div>", {'class':'ui-datebox-gridrow'}).appendTo(self.pickerGrid);
				for ( i = 0; i<=6;i++ ) {
					$("<div>"+o.daysOfWeekShort[i]+"</div>").addClass('ui-datebox-griddate ui-datebox-griddate-empty ui-datebox-griddate-label').appendTo(weekDays);
				}
			}
			
			for ( i=0;i<=5;i++ ) {
				if ( i === 0 || ( i > 0 && (today > 0 && today <= end) ) ) {
					var thisRow = $("<div>", {'class': 'ui-datebox-gridrow'}).appendTo(self.pickerGrid);
					for ( j=0;j<=6;j++) {
						if ( j === start && i === 0 ) { today = 1; }
						if ( today > end ) { today = -1; }
						if ( today < 1 ) {
							if ( o.calShowOnlyMonth ) {
								$("<div>", {'class': 'ui-datebox-griddate ui-datebox-griddate-empty'}).appendTo(thisRow);
							} else {
								if ( i === 0 ) {
									$("<div>"+prevtoday+"</div>")
										.addClass('ui-datebox-griddate ui-datebox-griddate-empty').appendTo(thisRow)
										.attr('data-date', prevtoday)
										.click(function(e) {
											e.preventDefault();
											if ( !skipPrev ) {
												self.theDate.setMonth(self.theDate.getMonth() - 1);
												self.theDate.setDate($(this).attr('data-date'));
												self.input.val(self._formatDate(self.theDate));
												self.close();
												self.input.trigger('change');
											}
										});
									prevtoday++;
								} else {
									$("<div>"+nexttoday+"</div>")
										.addClass('ui-datebox-griddate ui-datebox-griddate-empty').appendTo(thisRow)
										.attr('data-date', nexttoday)
										.click(function(e) {
											e.preventDefault();
											if ( !skipNext ) {
												self.theDate.setDate($(this).attr('data-date'));
												self.theDate.setMonth(self.theDate.getMonth() + 1);
												self.input.val(self._formatDate(self.theDate));
												self.close();
												self.input.trigger('change');
											}
										});
									nexttoday++;
								}
							}
						} else {
							var boxxy = $("<div>"+today+"</div>")
								.addClass('ui-datebox-griddate ui-corner-all')
								.attr('data-date', today)
								.appendTo(thisRow);
							if ( !o.afterToday && !o.maxDays && !o.minDays && !o.blackDates && !o.blackDays ) {
								boxxy.click(function(e) {
									e.preventDefault();
									self.theDate.setDate($(this).attr('data-date'));
									self.input.val(self._formatDate(self.theDate));
									self.close();
									self.input.trigger('change');
								});
							} else {

								var skipit = false;
								if ( o.afterToday ) {
									if ( 
										( self.theDate.getFullYear() == thisDate.getFullYear() && self.theDate.getMonth() == thisDate.getMonth() && today < thisDate.getDate() ) ||
										( self.theDate.getFullYear() < thisDate.getFullYear() ) ) {
											skipit = true;
									}
								} 
								if ( !skipit && o.maxDays !== false ) {
									if (
										( self.theDate.getFullYear() > maxDate.getFullYear() ) ||
										( self.theDate.getFullYear() == maxDate.getFullYear() && self.theDate.getMonth() > maxDate.getMonth() ) ||
										( self.theDate.getFullYear() == maxDate.getFullYear() && self.theDate.getMonth() == maxDate.getMonth() && today > maxDate.getDate() ) ) {
											skipit = true;
									}
								} 
								if ( !skipit && o.minDays !== false ) {
									if (
										( self.theDate.getFullYear() < minDate.getFullYear() ) ||
										( self.theDate.getFullYear() == minDate.getFullYear() && self.theDate.getMonth() < minDate.getMonth() ) ||
										( self.theDate.getFullYear() == minDate.getFullYear() && self.theDate.getMonth() == minDate.getMonth() && today < minDate.getDate() ) ) {
											skipit = true;
									}
								} 
								if ( !skipit && o.blackDays !== false ) { // Individual DAY Blacklist
									if ( $.inArray(j, o.blackDays) > -1 ) {
										skipit = true;
									}
								}
								if ( !skipit && o.blackDates !== false ) { // DATES Blacklist
									if ( curBlackMonth != false ) {
										if ( $.inArray(today, curBlackMonth) > -1 ) {
											skipit = true;
										}
									} else if ( $.isArray(o.blackDates) ) {
										var tester = self.theDate.getFullYear() + '-';
										if ( self.theDate.getMonth() < 9 ) { tester = tester + "0"; }
										tester = tester + (self.theDate.getMonth()+1) + '-';
										if ( today < 10 ) { tester = tester + "0"; }
										tester = tester + today;
										if ( $.inArray(tester, o.blackDates) > -1 ) {
											skipit = true;
										}
									}
								}
								

								if ( ! ( skipit ) ) {
									boxxy.click(function(e) {
										e.preventDefault();
										self.theDate.setDate($(this).attr('data-date'));
										self.input.val(self._formatDate(self.theDate));
										self.close();
										self.input.trigger('change');
									});
								} else {
									boxxy.css('color', o.disabledDayColor);
								}
							}
							if ( today === highlightDay || today === presetDay ) {
								boxxy.addClass('ui-btn-up-'+o.pickPageHighButtonTheme)
									.hover(
										function() { $(this).addClass('ui-btn-down-'+o.pickPageHighButtonTheme).removeClass('ui-btn-up-'+o.pickPageHighButtonTheme); },
										function() { $(this).addClass('ui-btn-up-'+o.pickPageHighButtonTheme).removeClass('ui-btn-down-'+o.pickPageHighButtonTheme); }
									);
							} else {
								boxxy.addClass('ui-btn-up-'+o.pickPageButtonTheme)
									.hover(
										function() { $(this).addClass('ui-btn-down-'+o.pickPageButtonTheme).removeClass('ui-btn-up-'+o.pickPageButtonTheme); },
										function() { $(this).addClass('ui-btn-up-'+o.pickPageButtonTheme).removeClass('ui-btn-down-'+o.pickPageButtonTheme); }
									);
							}
							
							today++;
						}
					}
				}
			}
		}
	},
	_isInt: function (s) {
			return (s.toString().search(/^[0-9]+$/) === 0);
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
			windowWidth = $(document).width();

		if ( o.useInline ) { return false; }
					
		if ( (pickWinHeight + pickWinTop) > $(document).height() ) {
			pickWinTop = $(document).height() - (pickWinHeight + 2);
		}
		if ( pickWinTop < 45 ) { // Fix for popup ending up under header
			pickWinTop = 45;
		}
		
		if ( ( windowWidth > 400 && !o.useDialogForceTrue ) || o.useDialogForceFalse ) {
			self.options.useDialog = false;
			if ( o.useModal ) {
				self.screen.fadeIn('slow');
			} else {
				self.screen.removeClass('ui-datebox-hidden');
			}
			self.pickerContent.addClass('ui-overlay-shadow in').css({'position': 'absolute', 'top': pickWinTop, 'left': pickWinLeft}).removeClass('ui-datebox-hidden');
		} else {
			self.options.useDialog = true;
			self.pickPageContent.append(self.pickerContent);
			self.pickerContent.css({'top': 'auto', 'left': 'auto', 'marginLeft': 'auto', 'marginRight': 'auto'}).removeClass('ui-overlay-shadow ui-datebox-hidden');
			$.mobile.changePage(self.pickPage, 'pop', false, true);
		}
	},
	close: function() {
		var self = this;

		if ( self.options.useInline ) {
				return true;
		}

		if ( self.options.useDialog ) {
			$(self.pickPage).dialog('close');
			//$.mobile.changePage([self.pickPage,self.thisPage], 'pop', true, false);
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
	},
	_create: function(){

		var self = this,
			o = $.extend(this.options, this.element.data('options')),
			input = this.element,
			focusedEl = input.wrap('<div class="ui-input-datebox ui-shadow-inset ui-corner-all ui-body-'+ o.theme +'"></div>').parent(),
			theDate = new Date();
		
		$('label[for='+input.attr('id')+']').addClass('ui-input-text').css('verticalAlign', 'middle');
		
		input.removeClass('ui-corner-all ui-shadow-inset');
		
		var openbutton = $('<a href="#" class="ui-input-clear" title="date picker">date picker</a>')
			.click(function (e) {
				e.preventDefault();
				if ( !o.disabled ) {
					self.open();					
				}
				setTimeout(function(){
					$(e.target).closest("a").removeClass($.mobile.activeBtnClass);
				}, 300);
			})
			.appendTo(focusedEl).buttonMarkup({icon: 'grid', iconpos: 'notext', corners:true, shadow:true})
			.css({'vertical-align': 'middle', 'float': 'right'});
			
		if ( o.noButtonFocusMode || o.useInline ) { openbutton.hide(); }
		
		focusedEl.tap(function() {
			if ( !o.disabled ) {
				focusedEl.addClass('ui-focus');
			}	
			//input.focus();
			if ( !o.disabled && o.noButtonFocusMode ) { self.open(); }
		});
		input
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
		
		var dialogTitle = this.options.titleDialogLabel;
		if ( dialogTitle === false ) {
			if ( this.options.mode == 'timebox' ) {
				var dialogTitle = this.options.titleTimeDialogLabel;
			} else {
				var dialogTitle = this.options.titleDateDialogLabel;
			}
		}
		
		var thisPage = input.closest('.ui-page'),
			pickPage = $("<div data-role='dialog' class='ui-dialog-datebox' data-theme='" + o.pickPageTheme + "' >" +
						"<div data-role='header' data-backbtn='false' data-theme='a'>" +
							"<div class='ui-title'>" + dialogTitle + "</div>"+
						"</div>"+
						"<div data-role='content'></div>"+
					"</div>")
					.appendTo( $.mobile.pageContainer )
					.page().css('minHeight', '0px').css('zIndex', o.zindex).addClass('pop'),
			pickPageContent = pickPage.find( ".ui-content" ),
			pickPageClose = pickPage.find( ".ui-header a").click(function(e) {
				e.preventDefault();
				e.stopImmediatePropagation();
				self.close();
			});

		$.extend(self, {
			pickPage: pickPage,
			thisPage: thisPage,
			pickPageClose: pickPageClose,
			pickPageContent: pickPageContent,
			input: input,
			theDate: theDate,
			focusedEl: focusedEl
		});
		
		self._buildPage();
		
		if ( input.is(':disabled') ) {
			self.disable();
		}
	},
	_incrementField: function(event, fieldOrder) {
		if (this.options.mode == 'timebox' ) {
			if ( fieldOrder == 0 ) { this.theDate.setHours(this.theDate.getHours() + 1); }
			if ( fieldOrder == 1 ) {
				var newMin = this.theDate.getMinutes();
				var rem = newMin % this.options.minuteStep;
				if(rem == 0) {
					newMin = newMin + this.options.minuteStep;
				} else {
					newMin = newMin + (this.options.minuteStep-rem);
				}
				this.theDate.setMinutes(newMin);
			}
			if ( fieldOrder == 2 ) { 
				if ( this.options.timeFormat == 12 ) {
					if ( this.pickerMeri.val() == this.options.meridiemLetters[0] ) { 
						this.pickerMeri.val(this.options.meridiemLetters[1]);
						this.theDate.setHours(this.theDate.getHours() + 12);
					} else {
						this.pickerMeri.val(this.options.meridiemLetters[0]);
						this.theDate.setHours(this.theDate.getHours() - 12);
					}
				}
			}
		} else {
			if (this.options.fieldsOrder[fieldOrder] == 'y') { 
				if ( this.options.maxYear !== false ) { 
					if ( this.theDate.getFullYear() + 1 <= this.options.maxYear ) {
						this.theDate.setYear(this.theDate.getFullYear() + 1); 
					}
				} else {
					this.theDate.setYear(this.theDate.getFullYear() + 1); 
				}
			}
			if (this.options.fieldsOrder[fieldOrder] == 'm') { this.theDate.setMonth(this.theDate.getMonth() + 1); }
			if (this.options.fieldsOrder[fieldOrder] == 'd') { this.theDate.setDate(this.theDate.getDate() + 1); }
		}
	
		this._update();
	},
	_decrementField: function(event, fieldOrder) {
		if (this.options.mode == 'timebox' ) {
			if ( fieldOrder == 0 ) { this.theDate.setHours(this.theDate.getHours() - 1); }
			if ( fieldOrder == 1 ) {
				var newMin = this.theDate.getMinutes();
				var rem = newMin % this.options.minuteStep;
				if(rem == 0) {
					newMin = newMin - this.options.minuteStep;
				} else {
					newMin = newMin - rem;
				}
				this.theDate.setMinutes(newMin);
			}
		} else {
			if (this.options.fieldsOrder[fieldOrder] == 'y') {
				if ( this.options.minYear !== false ) { 
					if ( this.theDate.getFullYear() - 1 >= this.options.minYear ) {
						this.theDate.setYear(this.theDate.getFullYear() - 1); 
					}
				} else {
					this.theDate.setYear(this.theDate.getFullYear() - 1); 
				}
			}
			if (this.options.fieldsOrder[fieldOrder] == 'm') { this.theDate.setMonth(this.theDate.getMonth() - 1); }
			if (this.options.fieldsOrder[fieldOrder] == 'd') { this.theDate.setDate(this.theDate.getDate() - 1); }
		}
		this._update();
	},
	_buildPage: function () {
		var self = this,
			o = self.options,
			pickerContent = $("<div>", { "class": 'ui-datebox-container ui-overlay-shadow ui-corner-all ui-datebox-hidden pop ui-body-'+o.pickPageTheme} ).css('zIndex', o.zindex);
		
		if ( o.noAnimation ) { 
			pickerContent.removeClass('pop');
		}
		
		if ( o.mode == 'timebox' ) {
			var pickerPlus = $("<div>", { "class":'ui-datebox-controls' }).appendTo(pickerContent),
				pickerInput = $("<div>", { "class":'ui-datebox-controls' }).appendTo(pickerContent),
				pickerMinus = $("<div>", { "class":'ui-datebox-controls' }).appendTo(pickerContent),
				pickerSet = $("<div>", { "class":'ui-datebox-controls'}).appendTo(pickerContent),
				
				pickerHour = $("<input type='text' />")
				.keyup(function() {
					if ( $(this).val() !== '' && self._isInt($(this).val()) ) {
						newHour = parseInt($(this).val(),10);
						if ( newHour == 12 ) {
							if ( o.timeFormat == 12 && pickerMeri.val() == o.meridiemLetters[0] ) { newHour = 0; }
						}
						self.theDate.setHours(newHour);
						self._update();
					}
				}).addClass('ui-input-text ui-corner-all ui-shadow-inset ui-datebox-input ui-body-'+o.pickPageInputTheme),
				
				pickerMins = $("<input type='text' />")
				.keyup(function() {
					if ( $(this).val() !== '' && self._isInt($(this).val()) ) {
						self.theDate.setMinutes(parseInt($(this).val(),10));
						self._update();
					}
				}).addClass('ui-input-text ui-corner-all ui-shadow-inset ui-datebox-input ui-body-'+o.pickPageInputTheme),
				
				pickerMeri = $("<input type='text' />")
				.keyup(function() {
					if ( $(this).val() !== '' ) {
						self._update();
					}
				}).addClass('ui-input-text ui-corner-all ui-shadow-inset ui-datebox-input ui-body-'+o.pickPageInputTheme);
			
			pickerHour.appendTo(pickerInput);
			pickerMins.appendTo(pickerInput);
			if ( o.timeFormat == 12 ) { pickerMeri.appendTo(pickerInput); }
			
			$("<a href='#'>" + o.setTimeButtonLabel + "</a>")
				.appendTo(pickerSet).buttonMarkup({theme: o.pickPageTheme, icon: 'check', iconpos: 'left', corners:true, shadow:true})
				.click(function(e) {
					e.preventDefault();
					self.input.val(self._formatTime(self.theDate));
					self.close();
					self.input.trigger('change');
				});
			
			$("<div><a href='#'></a></div>")
				.appendTo(pickerPlus).buttonMarkup({theme: o.pickPageButtonTheme, icon: 'plus', iconpos: 'bottom', corners:true, shadow:true})
				.click(function(e) {
					e.preventDefault();
					self._incrementField(e, 0);
				})
				.clone(false).appendTo(pickerPlus)
				.click(function(e) {
					e.preventDefault();
					self._incrementField(e, 1);
				});
			
			$("<div><a href='#'></a></div>")
				.appendTo(pickerMinus).buttonMarkup({theme: o.pickPageButtonTheme, icon: 'minus', iconpos: 'top', corners:true, shadow:true})
				.click(function(e) {
					e.preventDefault();
					self._decrementField(e, 0);
				})
				.clone(false).appendTo(pickerMinus)
				.click(function(e) {
					e.preventDefault();
					self._decrementField(e, 1);
				});
				
			if ( o.timeFormat == 12 ) { 
				$("<div><a href='#'></a></div>")	
					.appendTo(pickerPlus).buttonMarkup({theme: o.pickPageButtonTheme, icon: 'plus', iconpos: 'bottom', corners:true, shadow:true})
					.click(function(e) {
						e.preventDefault();
						self._incrementField(e, 2);
					});
				$("<div><a href='#'></a></div>")
					.appendTo(pickerMinus).buttonMarkup({theme: o.pickPageButtonTheme, icon: 'minus', iconpos: 'top', corners:true, shadow:true})
					.click(function(e) {
						e.preventDefault();
						self._incrementField(e, 2);
					});
			}
				
			
			$.extend(self, {
				pickerHeader: pickerHeader,
				pickerHour: pickerHour,
				pickerMins: pickerMins,
				pickerMeri: pickerMeri,
			});
			
			pickerContent.appendTo(self.thisPage);
				
		}
		
		if ( o.mode == 'datebox' ) {
			var pickerHeader = $("<div class='ui-datebox-header'><h4>Unitialized</h4></div>").appendTo(pickerContent).find("h4"),
				pickerPlus = $("<div>", { "class":'ui-datebox-controls' }).appendTo(pickerContent),
				pickerInput = $("<div>", { "class":'ui-datebox-controls' }).appendTo(pickerContent),
				pickerMinus = $("<div>", { "class":'ui-datebox-controls' }).appendTo(pickerContent),
				pickerSet = $("<div>", { "class":'ui-datebox-controls'}).appendTo(pickerContent),
				
				pickerMon = $("<input type='text' />")
				.keyup(function() {
					if ( $(this).val() !== '' && self._isInt($(this).val()) ) {
						self.theDate.setMonth(parseInt($(this).val(),10)-1);
						self._update();
					}
				}).addClass('ui-input-text ui-corner-all ui-shadow-inset ui-datebox-input ui-body-'+o.pickPageInputTheme),
				
				pickerDay = $("<input type='text' />")
				.keyup(function() {
					if ( $(this).val() !== '' && self._isInt($(this).val()) ) {
						self.theDate.setDate(parseInt($(this).val(),10));
						self._update();
					}
				}).addClass('ui-input-text ui-corner-all ui-shadow-inset ui-datebox-input ui-body-'+o.pickPageInputTheme),
				
				pickerYar = $("<input type='text' />")
				.keyup(function() {
					if ( $(this).val() !== '' && self._isInt($(this).val()) ) {
						self.theDate.setYear(parseInt($(this).val(),10));
						self._update();
					}
				}).addClass('ui-input-text ui-corner-all ui-shadow-inset ui-datebox-input ui-body-'+o.pickPageInputTheme);
		
				for(i=0; i<=self.options.fieldsOrder.length; i++) {
					if (self.options.fieldsOrder[i] == 'y') { pickerYar.appendTo(pickerInput); }
					if (self.options.fieldsOrder[i] == 'm') { pickerMon.appendTo(pickerInput); }
					if (self.options.fieldsOrder[i] == 'd') { pickerDay.appendTo(pickerInput); }
				}
		
			$("<a href='#'>" + o.setDateButtonLabel + "</a>")
				.appendTo(pickerSet).buttonMarkup({theme: o.pickPageTheme, icon: 'check', iconpos: 'left', corners:true, shadow:true})
				.click(function(e) {
					e.preventDefault();
					self.input.val(self._formatDate(self.theDate));
					self.close();
					self.input.trigger('change');
				});
			
			for(var x=0; x<self.options.fieldsOrder.length; x++) {
				$("<div><a href='#'></a></div>")
					.appendTo(pickerPlus).buttonMarkup({theme: o.pickPageButtonTheme, icon: 'plus', iconpos: 'bottom', corners:true, shadow:true})
					.attr('data-field', x)
					.click(function(e) {
						e.preventDefault();
						self._incrementField(e, $(this).attr('data-field'));
				});
				$("<div><a href='#'></a></div>")
					.appendTo(pickerMinus).buttonMarkup({theme: o.pickPageButtonTheme, icon: 'minus', iconpos: 'top', corners:true, shadow:true})
					.attr('data-field', x)
					.click(function(e) {
						e.preventDefault();
						self._decrementField(e, $(this).attr('data-field'));
				});
			}
				
			$.extend(self, {
				pickerHeader: pickerHeader,
				pickerDay: pickerDay,
				pickerMon: pickerMon,
				pickerYar: pickerYar,
			});
			
			pickerContent.appendTo(self.thisPage);
		}
		if ( o.mode == 'calbox' ) {
			var pickerHeader = $("<div>", {"class": 'ui-datebox-gridheader'}).appendTo(pickerContent),
				pickerGrid = $("<div>", {"class": 'ui-datebox-grid'}).appendTo(pickerContent),
				calNoNext = false,
				calNoPrev = false,
				pickerNextMon = $("<div class='ui-datebox-gridminus'><a href='#'>Prev Month</a></div>")
					.appendTo(pickerHeader).buttonMarkup({theme: o.pickPageButtonTheme, icon: 'minus', inline: true, iconpos: 'notext', corners:true, shadow:true})
					.click( function(e) {
						e.preventDefault();
						if ( ! self.calNoPrev ) {
							if ( self.theDate.getDate() > 28 ) { self.theDate.setDate(1); }
							self.theDate.setMonth(self.theDate.getMonth() - 1);
						}
						self._update();
					}),
				pickerLastMon = $("<div class='ui-datebox-gridplus'><a href='#'>Next Month</a></div>")
					.appendTo(pickerHeader).buttonMarkup({theme: o.pickPageButtonTheme, icon: 'plus', inline: true, iconpos: 'notext', corners:true, shadow:true})
					.click( function(e) {
						e.preventDefault();
						if ( ! self.calNoNext ) {
							if ( self.theDate.getDate() > 28 ) { self.theDate.setDate(1); }
							self.theDate.setMonth(self.theDate.getMonth() + 1);
						}
						self._update();
					}),
				pickerDate = $("<div class='ui-datebox-gridlabel'><h4>Uninitialized</h4></div>").appendTo(pickerHeader).find('h4');
					
			$.extend(self, {
				pickerDate: pickerDate,
				pickerGrid: pickerGrid,
				calNoNext: calNoNext,
				calNoPrev: calNoPrev
			});
			
			pickerContent.appendTo(self.thisPage);
		}
		
		var screen = $("<div>", {'class':'ui-datebox-screen ui-datebox-hidden'})
			.css({'z-index': o.zindex-1})
			.appendTo(self.thisPage)
			.bind("click", function(event){
				self.close();
				event.preventDefault();
			});
			
		if ( o.useModal ) {
			screen.addClass('ui-datebox-screen-modal');
		}

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
	
	/* Next is for compat with old CalendarBox */
	$( 'input[data-role="calendarbox"]', this ).each(function() {
		$(this).datebox({'mode': 'calbox'});
	});

  });
	
	
})( jQuery );
