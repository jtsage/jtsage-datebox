/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notification.
 * https://github.com/jtsage/jquery-mobile-datebox
 */

(function($, undefined ) {
	$.extend( $.mobile.datebox.prototype.options, {
		themeDateHigh: 'e',
		themeDatePick: 'a',
		themeDate: 'b',
		
		calHighToday: true,
		calHighPick: true,
		
		calShowDays: true,
		calOnlyMonth: false,
		calWeekMode: false,
		calWeekModeDay: 1,
		calWeekHigh: false,
		calControlGroup: false,
		
		useTodayButton: false,
		useCollapsedBut: false,
		
		highDays: false,
		highDates: false,
		highDatesAlt: false,
		enableDates: false
	});
	$.widget( "mobile.datebox", $.mobile.widget, {
		
		_update: function() {
			// Update the display on date change
			var self = this,
				o = self.options, 
				testDate = null,
				i, gridWeek, gridDay, skipThis, thisRow, y, cTheme, inheritDate, thisPRow, tmpVal, disVal,
				interval = {'d': 60*60*24, 'h': 60*60, 'i': 60, 's':1},
				calmode = {};
				
			self.input.trigger('datebox', {'method':'refresh'});
			
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
			
			if ( o.lang[this.options.useLang].useArabicIndic === true ) {
				self._makeDisplayIndic();
			}
		},
		
		_create: function() {
			// Create the widget, called automatically by widget system
			
			// Trigger dateboxcreate
			$( document ).trigger( "dateboxcreate" );
			
			var self = this,
				o = $.extend(this.options, this.element.jqmData('options')),
				o = ((typeof this.element.jqmData('options') === 'undefined') ? $.extend(o, this._getLongOptions(this.element)) : o);
				input = this.element,
				thisTheme = ( o.theme === false && typeof($(self).jqmData('theme')) === 'undefined' ) ?
					( ( typeof(input.parentsUntil(':jqmData(theme)').parent().jqmData('theme')) === 'undefined' ) ?
						o.defaultTheme : input.parentsUntil(':jqmData(theme)').parent().jqmData('theme') )
					: o.theme,
				focusedEl = input.wrap('<div class="ui-input-datebox ui-shadow-inset ui-corner-all ui-body-'+ thisTheme +'"></div>').parent(),
				theDate = new Date(), // Internal date object, used for all operations
				initDate = new Date(theDate.getTime()), // Initilization time - used for duration
				
				// This is the button that is added to the original input
				openbutton = $('<a href="#" class="ui-input-clear" title="'+((typeof o.lang[o.useLang].tooltip !== 'undefined')?o.lang[o.useLang].tooltip:o.lang.en.tooltip)+'">'+((typeof o.lang[o.useLang].tooltip !== 'undefined')?o.lang[o.useLang].tooltip:o.lang.en.tooltip)+'</a>')
					.bind(o.clickEvent, function (e) {
						e.preventDefault();
						if ( !o.disabled ) { self.input.trigger('datebox', {'method': 'open'}); self.focusedEl.addClass('ui-focus'); }
						setTimeout( function() { $(e.target).closest("a").removeClass($.mobile.activeBtnClass); }, 300);
					})
					.appendTo(focusedEl).buttonMarkup({icon: 'grid', iconpos: 'notext', corners:true, shadow:true})
					.css({'vertical-align': 'middle', 'display': 'inline-block'}),
				thisPage = input.closest('.ui-page'),
				ns = (typeof $.mobile.ns !== 'undefined')?$.mobile.ns:'',
				pickPage = $("<div data-"+ns+"role='dialog' class='ui-dialog-datebox' data-"+ns+"theme='" + ((o.forceInheritTheme === false ) ? o.pickPageTheme : thisTheme ) + "' >" +
							"<div data-"+ns+"role='header' data-"+ns+"backbtn='false' data-"+ns+"theme='a'>" +
								"<div class='ui-title'>PlaceHolder</div>"+
							"</div>"+
							"<div data-"+ns+"role='content'></div>"+
						"</div>")
						.appendTo( $.mobile.pageContainer )
						.page().css('minHeight', '0px').css('zIndex', o.zindex).addClass(o.transition),
				pickPageTitle = pickPage.find('.ui-title'),
				pickPageContent = pickPage.find( ".ui-content" ),
				touch = ( typeof window.ontouchstart !== 'undefined' ),
				START_EVENT = touch ? 'touchstart' : 'mousedown',
				MOVE_EVENT = touch ? 'touchmove' : 'mousemove',
				END_EVENT = touch ? 'touchend' : 'mouseup',
				dragMove = false,
				dragStart = false,
				dragEnd = false,
				dragPos = false,
				dragTarget = false,
				dragThisDelta = 0;
			
			o.theme = thisTheme;
			
			$.extend(self, {
				input: input,
				focusedEl: focusedEl });
			
			if ( o.forceInheritTheme ) {
				o.pickPageTheme = thisTheme;
				o.pickPageInputTheme = thisTheme;
				o.pickPageButtonTheme = thisTheme;
			}
			
			if ( o.defaultPickerValue===false && o.defaultDate!==false ) {
				o.defaultPickerValue = o.defaultDate;
			}
			
			if ( o.numberInputEnhance === true ) {
				if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) ){
					o.internalInputType = 'number';
				}
			}
			
			$('label[for=\''+input.attr('id')+'\']').addClass('ui-input-text').css('verticalAlign', 'middle');
	
			/* BUILD:MODE */
			
			if ( o.mode === "timeflipbox" ) { // No header in time flipbox.
				o.lang[o.useLang].headerFormat = ' ';
			}
			
			// For focus mode, disable button, and bind click of input element and it's parent	
			if ( o.noButtonFocusMode || o.useInline || o.noButton ) { openbutton.hide(); }
			
			self.focusedEl.bind(o.clickEvent, function() {
				if ( !o.disabled && ( o.noButtonFocusMode || o.focusMode ) ) { 
					self.input.trigger('datebox', {'method': 'open'});
					self.focusedEl.addClass('ui-focus');
					self.input.removeClass('ui-focus');
				}
			});
			
			
			self.input
				.removeClass('ui-corner-all ui-shadow-inset')
				.focus(function(){
					if ( ! o.disabled ) {
						self.focusedEl.addClass('ui-focus');
					}
					self.input.removeClass('ui-focus');
				})
				.blur(function(){
					self.focusedEl.removeClass('ui-focus');
					self.input.removeClass('ui-focus');
				})
				.change(function() {
					self.theDate = self._makeDate(self.input.val());
					self._update();
				});
				
			// Bind the master handler.
			self.input.bind('datebox', self._dateboxHandler);
			
			// Bind the close button on the DIALOG mode. (after unbinding the default)
			pickPage.find( ".ui-header a").unbind('click vclick').bind(o.clickEvent, function(e) {
				e.preventDefault();
				e.stopImmediatePropagation();
				self.input.trigger('datebox', {'method':'close', 'fromCloseButton':false});
			});
	
			$.extend(self, {
				pickPage: pickPage,
				thisPage: thisPage,
				pickPageContent: pickPageContent,
				pickPageTitle: pickPageTitle,
				theDate: theDate,
				initDate: initDate,
				touch: touch,
				START_DRAG: START_EVENT,
				MOVE_DRAG: MOVE_EVENT,
				END_DRAG: END_EVENT,
				dragMove: dragMove,
				dragStart: dragStart,
				dragEnd: dragEnd,
				dragPos: dragPos
			});
			
			// Check if mousewheel plugin is loaded
			if ( typeof $.event.special.mousewheel !== 'undefined' ) { o.wheelExists = true; }
			
			self._buildPage();
			
			// drag and drop support, all ending and moving events are defined here, start events are handled in _buildPage or update
			if ( o.swipeEnabled ) {
				$(document).bind(self.MOVE_DRAG, function(e) {
					if ( self.dragMove ) {
						if ( o.mode === 'slidebox' ) {
							self.dragEnd = self.touch ? e.originalEvent.changedTouches[0].pageX : e.pageX;
							self.dragTarget.css('marginLeft', (self.dragPos + self.dragEnd - self.dragStart) + 'px');
							e.preventDefault();
							e.stopPropagation();
							return false;
						} else if ( o.mode === 'flipbox' || o.mode === 'timeflipbox' ) {
							self.dragEnd = self.touch ? e.originalEvent.changedTouches[0].pageY : e.pageY;
							self.dragTarget.css('marginTop', (self.dragPos + self.dragEnd - self.dragStart) + 'px');
							e.preventDefault();
							e.stopPropagation();
							return false;
						} else if ( o.mode === 'durationbox' || o.mode === 'timebox' || o.mode === 'datebox' ) {
							self.dragEnd = self.touch ? e.originalEvent.changedTouches[0].pageY : e.pageY;
							if ( (self.dragEnd - self.dragStart) % 2 === 0 ) {
								dragThisDelta = (self.dragEnd - self.dragStart) / -2;
								if ( dragThisDelta < self.dragPos ) {
									self._offset(self.dragTarget, -1*(self.dragTarget==='i'?o.minuteStep:1));
								} else if ( dragThisDelta > self.dragPos ) {
									self._offset(self.dragTarget, (self.dragTarget==='i'?o.minuteStep:1));
								} 
								self.dragPos = dragThisDelta;
							}
							e.preventDefault();
							e.stopPropagation();
							return false;
						}
					} 
				});
				$(document).bind(self.END_DRAG, function(e) {
					if ( self.dragMove ) {
						self.dragMove = false;
						if ( o.mode === 'slidebox' ) {
							if ( self.dragEnd !== false && Math.abs(self.dragStart - self.dragEnd) > 25 ) {
								e.preventDefault();
								e.stopPropagation();
								switch(self.dragTarget.parent().jqmData('rowtype')) {
									case 'y':
										self._offset('y', parseInt(( self.dragStart - self.dragEnd ) / 84, 10));
										break;
									case 'm':
										self._offset('m', parseInt(( self.dragStart - self.dragEnd ) / 51, 10));
										break;
									case 'd':
										self._offset('d', parseInt(( self.dragStart - self.dragEnd ) / 32, 10));
										break;
									case 'h':
										self._offset('h', parseInt(( self.dragStart - self.dragEnd ) / 32, 10));
										break;
									case 'i':
										self._offset('i', parseInt(( self.dragStart - self.dragEnd ) / 32, 10));
										break;
								}
							}
						} else if ( o.mode === 'flipbox' || o.mode === 'timeflipbox' ) {
							if ( self.dragEnd !== false ) {
								e.preventDefault();
								e.stopPropagation();
								var fld = self.dragTarget.parent().parent().jqmData('field'),
									amount = parseInt(( self.dragStart - self.dragEnd ) / 30,10);
								self._offset(fld, amount * ( (fld === "i") ? o.minuteStep : 1 ));
							}
						}
						self.dragStart = false;
						self.dragEnd = false;
					}
				});
			}
			
			// Disable when done if element attribute disabled is true.
			if ( self.input.is(':disabled') ) {
				self.disable();
			}
			// Turn input readonly if requested (on by default)
			if ( o.disableManualInput === true ) {
				self.input.attr("readonly", true);
			}
			
			//Throw dateboxinit event
			$( document ).trigger( "dateboxaftercreate" );
		},
		_buildInternals: function () {
			// Build the POSSIBLY VARIABLE controls (these might change)
			var self = this,
				o = self.options, x, y, newHour, fld,
				linkdiv =$("<div><a href='#'></a></div>"),
				pickerContent = $("<div>", { "class": 'ui-datebox-container ui-overlay-shadow ui-corner-all ui-datebox-hidden pop ui-body-'+o.pickPageTheme} ).css('zIndex', o.zindex),
				templInput = $("<input type='"+o.internalInputType+"' />").addClass('ui-input-text ui-corner-all ui-shadow-inset ui-datebox-input ui-body-'+o.pickPageInputTheme),
				templInputT = $("<input type='text' />").addClass('ui-input-text ui-corner-all ui-shadow-inset ui-datebox-input ui-body-'+o.pickPageInputTheme),
				templControls = $("<div>", { "class":'ui-datebox-controls' }),
				templFlip = $("<div class='ui-overlay-shadow'><ul></ul></div>"),
				controlsPlus, controlsInput, controlsMinus, controlsSet, controlsHeader,
				pickerHour, pickerMins, pickerMeri, pickerMon, pickerDay, pickerYar, pickerSecs;
				
			self.calNoNext = false;
			self.calNoPrev = false;
			self.setButton = false;
			self.clearButton = false;
			self.dateOK = true;
			
			if ( o.fieldsOrderOverride === false ) {
				switch (o.mode) {
					case 'timebox':
					case 'timeflipbox':
						o.fieldsOrder = o.lang[o.useLang].timeFieldOrder; 
						break;
					case 'slidebox':
						o.fieldsOrder = o.lang[o.useLang].slideFieldOrder; 
						break;
					default:
						o.fieldsOrder = o.lang[o.useLang].dateFieldOrder; 
				}
			} else {
				o.fieldsOrder = o.fieldsOrderOverride;
			}
			
			/* Do the Date / Time Format */
			if ( o.timeOutputOverride !== false  ) {
				o.timeOutput = o.timeOutputOverride;
			} else if ( o.timeFormatOverride === false ) {
				o.timeOutput = o.timeFormats[o.lang[o.useLang].timeFormat];
			} else {
				o.timeOutput = o.timeFormats[o.timeFormatOverride];
			}
			
			if ( o.dateFormat !== false ) {
				o.dateOutput = o.dateFormat;
			} else {
				if ( typeof o.lang[o.useLang].dateFormat !== 'undefined' ) {
					o.dateOutput = o.lang[o.useLang].dateFormat;
				} else {
					o.dateOutput = o.defaultDateFormat;
				}
			}
			
			self.pickerContent.empty();
				
			
			/* BEGIN:FLIPBOX */
			if ( o.mode === 'flipbox' || o.mode === 'timeflipbox' ) {
				controlsHeader = $("<div class='ui-datebox-header'><h4>Unitialized</h4></div>").appendTo(self.pickerContent).find("h4");
				controlsInput = $("<div>", {"class":'ui-datebox-flipcontent'}).appendTo(self.pickerContent);
				controlsPlus = $("<div>", {"class":'ui-datebox-flipcenter ui-overlay-shadow'}).css('pointerEvents', 'none').appendTo(self.pickerContent);
				controlsSet = templControls.clone().appendTo(self.pickerContent);
				
				pickerDay = self._makeElement(templFlip, {'attr': {'field':'d','amount':1} });
				pickerMon = self._makeElement(templFlip, {'attr': {'field':'m','amount':1} });
				pickerYar = self._makeElement(templFlip, {'attr': {'field':'y','amount':1} });
				pickerHour = self._makeElement(templFlip, {'attr': {'field':'h','amount':1} });
				pickerMins = self._makeElement(templFlip, {'attr': {'field':'i','amount':o.minuteStep} });
				pickerMeri = self._makeElement(templFlip, {'attr': {'field':'a','amount':1} });
				
				if ( o.wheelExists ) { // Mousewheel operation, if the plugin is loaded.
					controlsInput.delegate('div', 'mousewheel', function(e,d) {
						e.preventDefault();
						self._offset($(this).jqmData('field'), ((d<0)?-1:1)*$(this).jqmData('amount'));
					});
				}
				
				for(x=0; x<=o.fieldsOrder.length; x++) { // Use fieldsOrder to decide which to show.
					if (o.fieldsOrder[x] === 'y') { pickerYar.appendTo(controlsInput); }
					if (o.fieldsOrder[x] === 'm') { pickerMon.appendTo(controlsInput); }
					if (o.fieldsOrder[x] === 'd') { pickerDay.appendTo(controlsInput); }
					if (o.fieldsOrder[x] === 'h') { pickerHour.appendTo(controlsInput); }
					if (o.fieldsOrder[x] === 'i') { pickerMins.appendTo(controlsInput); }
					if (o.fieldsOrder[x] === 'a' && ( o.lang[o.useLang].timeFormat === 12 || o.timeFormatOverride === 12 ) ) { pickerMeri.appendTo(controlsInput); }
				}
				
				if ( o.swipeEnabled ) { // Drag and drop support
					controlsInput.delegate('ul', self.START_DRAG, function(e,f) {
						if ( !self.dragMove ) {
							if ( typeof f !== "undefined" ) { e = f; }
							self.dragMove = true;
							self.dragTarget = $(this).find('li').first();
							self.dragPos = parseInt(self.dragTarget.css('marginTop').replace(/px/i, ''),10);
							self.dragStart = self.touch ? e.originalEvent.changedTouches[0].pageY : e.pageY;
							self.dragEnd = false;
							e.stopPropagation();
							e.preventDefault();
						}
					});
					controlsPlus.bind(self.START_DRAG, function(e) { // ONLY USED ON OLD BROWSERS & IE
						if ( !self.dragMove ) {
							self.dragTarget = self.touch ? e.originalEvent.changedTouches[0].pageX - $(e.currentTarget).offset().left : e.pageX - $(e.currentTarget).offset().left;
							if ( o.fieldsOrder.length === 3 ) {
								$(self.controlsInput.find('ul').get(parseInt(self.dragTarget / 87, 10))).trigger(self.START_DRAG, e);
							} else if ( o.fieldsOrder.length === 2 ) {
								$(self.controlsInput.find('ul').get(parseInt(self.dragTarget / 130, 10))).trigger(self.START_DRAG, e);
							}
						}
					});
				}
				
				if ( o.noSetButton === false ) { // Set button at bottom
					self.setButton = $("<a href='#'>PlaceHolder</a>")
						.appendTo(controlsSet).buttonMarkup({theme: o.pickPageTheme, icon: 'check', iconpos: 'left', corners:true, shadow:true})
						.bind(o.clickEvent, function(e) {
							e.preventDefault();
							if ( self.dateOK === true ) {
								if ( o.mode === 'timeflipbox' ) { self.input.trigger('datebox', {'method':'set', 'value':self._formatTime(self.theDate), 'date':self.theDate}); }
								else { self.input.trigger('datebox', {'method':'set', 'value':self._formatDate(self.theDate), 'date':self.theDate}); }
								self.input.trigger('datebox', {'method':'close'});
							}
						});
				}
				
				$.extend(self, {
					controlsHeader: controlsHeader,
					controlsInput: controlsInput,
					pickerDay: pickerDay,
					pickerMon: pickerMon,
					pickerYar: pickerYar,
					pickerHour: pickerHour,
					pickerMins: pickerMins,
					pickerMeri: pickerMeri
				});
				
				self.pickerContent.appendTo(self.thisPage);
				
			}
			/* END:FLIPBOX */
			
			
			if ( o.useClearButton === true ) { // Clear button at very bottom
				self.clearButton = $("<a href='#'>PlaceHolder</a>")
					.appendTo(controlsSet).buttonMarkup({theme: o.pickPageTheme, icon: 'delete', iconpos: 'left', corners:true, shadow:true})
					.bind(o.clickEvent, function(e) {
						e.preventDefault();
						self.input.val('');
						self.input.trigger('datebox', {'method':'clear'});
						self.input.trigger('datebox', {'method':'close'});
					});
			}
			if ( o.collapseButtons && ( self.clearButton !== false && self.setButton !== false ) ) {
				controlsSet.addClass('ui-datebox-collapse');
			}
				
		},
	
	
  });
	  
  
	
})( jQuery );
