/*
 * jQuery Mobile Framework : plugin to provide an android-like datepicker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notifcation.
 * 
 */
(function($, undefined ) {
  $.widget( "mobile.datebox", $.mobile.widget, {
	options: {
		theme: 'c',
		pickPageTheme: 'b',
		pickPageInputTheme: 'e',
		pickPageButtonTheme: 'a',
		pickPageHighButtonTheme: 'e',
		
		disabled: false,
		zindex: '500',
		
		daysOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		daysOfWeekShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
		monthsOfYear: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novemeber', 'December'],
		
		mode: 'datebox',
		calShowDays: true,
		useDialogForceTrue: false,
		useDialogForceFalse: false,
		useDialog: false,
		
		dateFormat: 'YYYY-MM-DD'
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
	_update: function() {
		var self = this,
			o = self.options;
			
		if ( o.mode == 'datebox' ) {
			self.pickerHeader.html(
				o.daysOfWeek[self.theDate.getDay()] + ", " +
				o.monthsOfYear[self.theDate.getMonth()] + " " +
				self.theDate.getDate() + ", " +
				self.theDate.getFullYear()
			);
			self.pickerMon.val(self.theDate.getMonth() + 1);
			self.pickerDay.val(self.theDate.getDate());
			self.pickerYar.val(self.theDate.getFullYear());
		}
	},
	_isInt: function (s) {
			return (s.toString().search(/^[0-9]+$/) === 0);
	},
	open: function() {
		var self = this,
			o = this.options,
			inputOffset = self.focusedEl.offset(),
			pickWinHeight = self.pickerContent.outerHeight(),
			pickWinWidth = self.pickerContent.innerWidth(),
			pickWinTop = inputOffset.top + ( self.focusedEl.outerHeight() / 2 )- ( pickWinHeight / 2),
			pickWinLeft = inputOffset.left + ( self.focusedEl.outerWidth() / 2) - ( pickWinWidth / 2);
			windowWidth = $(document).width();
					
		if ( (pickWinHeight + pickWinTop) > $(document).height() ) {
			pickWinTop = $(document).height() - (pickWinHeight + 2);
		}
		if ( pickWinTop < 45 ) { // Fix for popup ending up under header
			pickWinTop = 45;
		}
		
		if ( ( windowWidth > 400 && !o.useDialogForceTrue ) || o.useDialogForceFalse ) {
			self.options.useDialog = false;
			self.screen.removeClass('ui-datebox-hidden');
			self.input.trigger('change').blur();
			self.pickerContent.css({'position': 'absolute', 'top': pickWinTop, 'left': pickWinLeft}).addClass('in').removeClass('ui-datebox-hidden');
		} else {
			self.options.useDialog = true;
			self.input.trigger('change').blur();
			self.pickPageContent.append(self.pickerContent);
			self.pickerContent.css({'top': 'auto', 'left': 'auto', 'marginLeft': 'auto', 'marginRight': 'auto'});
			self.pickerContent.removeClass('ui-datebox-hidden');
			$.mobile.changePage(self.pickPage, 'pop', false, false);
		}
	},
	close: function() {
		var self = this;
		
		if ( self.options.useDialog ) {
			$.mobile.changePage([self.pickPage,self.thisPage], 'pop', true, false);
		} else {
			self.screen.addClass('ui-datebox-hidden');
			self.pickerContent.addClass('ui-datebox-hidden').removeClass('in');
			self.thisPage.append(self.pickerContent);
		}
	},
	_create: function(){

		var self = this,
			o = $.extend(this.options, this.element.data('options')),
			input = this.element,
			focusedEl = input.wrap('<div class="ui-input-datebox ui-shadow-inset ui-corner-all ui-body-'+ o.theme +'"></div>').parent(),
			theDate = new Date();
		
		$('label[for='+input.attr('id')+']').addClass('ui-input-text').css('verticalAlign', 'middle');
		
		input.removeClass('ui-corner-all ui-shadow-inset');
		
		$('<a href="#" class="ui-input-clear" title="date picker">date picker</a>')
			.click(function (e) {
				e.preventDefault();
				if ( !o.disabled ) {
					self.open();					
				}
			})
			.appendTo(focusedEl).buttonMarkup({icon: 'grid', iconpos: 'notext', corners:true, shadow:true})
			.css({'vertical-align': 'middle', 'float': 'right'});
		
		focusedEl.parent().tap(function() {
			input.focus();
		});
		input
			.focus(function(){
				if ( ! o.disabled ) {
					focusedEl.addClass('ui-focus');
				}
				input.removeClass('ui-focus');
			})
			.blur(function(){
				focusedEl.removeClass('ui-focus');
				input.removeClass('ui-focus');
			})
			.change(function() {
				if ( input.val() !== '' ) {
					self.theDate = new Date(input.val());
					if ( ! self.theDate.getDate() ) {
						self.theDate = new Date();
					}
				} else {
					self.theDate = new Date();
				}
				self._update();
			});
			
		var thisPage = input.closest('.ui-page'),
			pickPage = $("<div data-role='dialog' data-theme='" + o.pickPageTheme + "' >" +
						"<div data-role='header' data-backbtn='false' data-theme='a'>" +
							"<div class='ui-title'>Choose Date</div>"+
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
			screen: screen,
			input: input,
			theDate: theDate,
			focusedEl: focusedEl
		});
		
		self._buildPage();
		
		if ( input.is(':disabled') ) {
			self.disable();
		}
	},
	_buildPage: function () {
		var self = this,
			o = self.options,
			pickerContent = $("<div>", { "class": 'ui-datebox-container ui-overlay-shadow ui-corner-all ui-datebox-hidden pop ui-body-'+o.pickPageTheme} ).css('zIndex', o.zindex);
		
		if ( o.mode == 'datebox' ) {
			var pickerHeader = $("<div class='ui-datebox-header'><h4>Unitialized</h4></div>").appendTo(pickerContent).find("h4"),
				pickerPlus = $("<div>", { "class":'ui-datebox-controls' }).appendTo(pickerContent),
				pickerInput = $("<div>", { "class":'ui-datebox-controls' }).appendTo(pickerContent),
				pickerMinus = $("<div>", { "class":'ui-datebox-controls' }).appendTo(pickerContent),
				pickerSet = $("<div>", { "class":'ui-datebox-controls'}).appendTo(pickerContent),
				
				pickerMon = $("<input type='text' />").appendTo(pickerInput)
				.keyup(function() {
					if ( $(this).val() !== '' && self._isInt($(this).val()) ) {
						self.theDate.setMonth(parseInt($(this).val(),10)-1);
						self._update();
					}
				}).addClass('ui-input-text ui-corner-all ui-shadow-inset ui-datebox-input ui-body-'+o.pickPageInputTheme),
				pickerDay = $("<input type='text' />").appendTo(pickerInput)
				.keyup(function() {
					if ( $(this).val() !== '' && isInt($(this).val()) ) {
						self.theDate.setDate(parseInt($(this).val(),10));
						self._update();
					}
				}).addClass('ui-input-text ui-corner-all ui-shadow-inset ui-datebox-input ui-body-'+o.pickPageInputTheme),
				pickerYar = $("<input type='text' />").appendTo(pickerInput)
				.keyup(function() {
					if ( $(this).val() !== '' && isInt($(this).val()) ) {
						self.theDate.setYear(parseInt($(this).val(),10));
						self._update();
					}
				}).addClass('ui-input-text ui-corner-all ui-shadow-inset ui-datebox-input ui-body-'+o.pickPageInputTheme);
		
			$("<a href='#'>Set Date</a>")
				.appendTo(pickerSet).buttonMarkup({theme: o.pickPageTheme, icon: 'check', iconpos: 'left', corners:true, shadow:true})
				.click(function(e) {
					e.preventDefault();
					self.input.val(self._formatDate(self.theDate));
					self.close();
				});
			
			$("<div><a href='#'></a></div>")
				.appendTo(pickerPlus).buttonMarkup({theme: o.pickPageButtonTheme, icon: 'plus', iconpos: 'bottom', corners:true, shadow:true})
				.click(function(e) {
					e.preventDefault();
					self.theDate.setMonth(self.theDate.getMonth() + 1);
					self._update();
				})
				.clone(false).appendTo(pickerPlus)
				.click(function(e) {
					e.preventDefault();
					self.theDate.setDate(self.theDate.getDate() + 1);
					self._update();
				})
				.clone(false).appendTo(pickerPlus)
				.click(function(e) {
					e.preventDefault();
					self.theDate.setYear(self.theDate.getFullYear() + 1);
					self._update();
				});
			
			$("<div><a href='#'></a></div>")
				.appendTo(pickerMinus).buttonMarkup({theme: o.pickPageButtonTheme, icon: 'minus', iconpos: 'top', corners:true, shadow:true})
				.click(function(e) {
					e.preventDefault();
					self.theDate.setMonth(self.theDate.getMonth() - 1);
					self._update();
				})
				.clone(false).appendTo(pickerMinus)
				.click(function(e) {
					e.preventDefault();
					self.theDate.setDate(self.theDate.getDate() - 1);
					self._update();
				})
				.clone(false).appendTo(pickerMinus)
				.click(function(e) {
					e.preventDefault();
					self.theDate.setYear(self.theDate.getFullYear() - 1);
					self._update();
				});
				
			$.extend(self, {
				pickerHeader: pickerHeader,
				pickerDay: pickerDay,
				pickerMon: pickerMon,
				pickerYar: pickerYar,
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
			
		$.extend(self, {
			pickerContent: pickerContent,
			screen: screen
		});
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
