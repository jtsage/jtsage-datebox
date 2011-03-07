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
		disabled: false,
		pickPageTheme: 'b',
		buttonTheme: 'a',
		pickInputTheme: 'e',
		pickPageWidth: '300px',
		zindex: '500',
		daysOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		monthsOfYear: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novemeber', 'December'],
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
	_create: function(){

		var self = this,
			o = $.extend(this.options, this.element.data('options')),
			input = this.element;
			
		//console.log(this.element.data('options'));
		$(this).data('date', new Date());
		$('label[for='+input.attr('id')+']').addClass('ui-input-text').css('verticalAlign', 'middle');
		
		input.removeClass('ui-corner-all ui-shadow-inset');
		
		var focusedEl = input.wrap('<div class="ui-input-datebox ui-shadow-inset ui-corner-all ui-body-'+ o.theme +'"></div>').parent();
		
		var clearbtn = $('<a href="#" class="ui-input-clear" title="date picker">date picker</a>')
			.click(function( e ){ /* clicked the button! */
				if ( !o.disabled ) {
					e.preventDefault();
					e.stopPropagation();
					screen.show();
					input.trigger('change').blur();
					var inputOffset = focusedEl.offset();
					var pickWinHeight = pickPage.outerHeight();
					var pickWinWidth = pickPage.innerWidth();
					var pickWinTop = inputOffset.top + ( input.outerHeight() / 2 )- ( pickWinHeight / 2);
					
					// If this popup would extend the window, don't - move it up.
					if ( (pickWinHeight + pickWinTop) > $(document).height() ) {
						pickWinTop = $(document).height() - (pickWinHeight + 2);
					}
					if ( pickWinTop < 45 ) { // Fix for popup ending up under header
						pickWinTop = 45;
					}
					var pickWinLeft = inputOffset.left + ( focusedEl.outerWidth() / 2) - ( pickWinWidth / 2);
					pickPage.css('position', 'absolute').css('top', pickWinTop).css('left', pickWinLeft).addClass('in').show(); //fadeIn('slow');

				}				
			})
			.appendTo(focusedEl)
			.buttonMarkup({icon: 'grid', iconpos: 'notext', corners:true, shadow:true})
			.css('vertical-align', 'middle')
			.css('float', 'right');

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
					$(self).data("date", new Date(input.val()));
					if ( ! $(self).data("date").getDate() ) {
						$(self).data("date", new Date());
					}
				} else {
					$(self).data("date", new Date());
				}
				updateMe();
			});
			
			
		function updateMe() {
			pickPageDate.html(
				o.daysOfWeek[$(self).data("date").getDay()] + ", " +
				o.monthsOfYear[$(self).data("date").getMonth()] + " " +
				$(self).data("date").getDate() + ", " +
				$(self).data("date").getFullYear()
			);
			pickMonth.val($(self).data("date").getMonth() + 1);
			pickDay.val($(self).data("date").getDate());
			pickYear.val($(self).data("date").getFullYear());
		}
		
		function isInt(s) {
			return (s.toString().search(/^[0-9]+$/) === 0);
		}
		
		var thisPage = input.closest('.ui-page'),
			screen = $("<div></div>")
				.css({'position': 'absolute', 'top': '0px', 'left': '0px', 'display': 'none', 'width' : '100%', 'height': '100%', 'z-index': o.zindex-1})
				.appendTo(thisPage)
				.bind("click", function(event){
					pickPage.removeClass('in').hide();
					screen.hide();
					event.preventDefault();
				});
					
		var pickPage = $("<div data-role='page' data-theme='" + o.pickPageTheme + "' class='ui-datebox-container'>" +
						"<div data-role='header' data-backbtn='false' data-theme='a'>" +
							"<a href=\"#\" data-icon='delete' data-iconpos='notext'>Cancel</a> <div class='ui-title'>Choose Date</div>"+
						"</div>"+
						"<div data-role='content'></div>"+
					"</div>")
					.appendTo( $.mobile.pageContainer )
					.page().width(o.pickPageWidth).css('minHeight', '0px').css('zIndex', o.zindex).addClass('pop');
					
		var pickPageContent = pickPage.find( ".ui-content" );

		pickPage.find( ".ui-header a").click(function(e) {
			e.preventDefault();
			pickPage.removeClass('in').hide();
			screen.hide();
		});
		
		pickPage.blur(function() {
			console.log('called');
		});
		
		var pickPageDate = $("<div class='ui-datebox-date'><h4>Unitialized</h4></div>").appendTo(pickPageContent).find("h4");
		
		var pickPagePlus = $("<div class='ui-datebox-controls'></div>").appendTo(pickPageContent);
		
		$("<div><a href='#'></a></div>")
			.appendTo(pickPagePlus).buttonMarkup({theme: o.buttonTheme, icon: 'plus', iconpos: 'bottom', corners:true, shadow:true})
			.click(function(e) {
				e.preventDefault();
				$(self).data("date").setMonth($(self).data("date").getMonth() + 1);
				updateMe();
			})
			.clone(false).appendTo(pickPagePlus)
			.click(function(e) {
				e.preventDefault();
				$(self).data("date").setDate($(self).data("date").getDate() + 1);
				updateMe();
			})
			.clone(false).appendTo(pickPagePlus)
			.click(function(e) {
				e.preventDefault();
				$(self).data("date").setYear($(self).data("date").getFullYear() + 1);
				updateMe();
			});
			
		var pickPageInput = $("<div></div>").appendTo(pickPageContent);
		
		var pickMonth = $("<input type='text' />").appendTo(pickPageInput)
			.keyup(function() {
				if ( $(this).val() !== '' && isInt($(this).val()) ) {
					$(self).data("date").setMonth(parseInt($(this).val(),10)-1);
					updateMe();
				}
			}).addClass('ui-input-text ui-corner-all ui-shadow-inset ui-datebox-input ui-body-'+o.pickInputTheme);
			
		var pickDay = $("<input type='text' />").appendTo(pickPageInput)
			.keyup(function() {
				if ( $(this).val() !== '' && isInt($(this).val()) ) {
					$(self).data("date").setDate(parseInt($(this).val(),10));
					updateMe();
				}
			}).addClass('ui-input-text ui-corner-all ui-shadow-inset ui-datebox-input ui-body-'+o.pickInputTheme);
			
		var pickYear = $("<input type='text' />").appendTo(pickPageInput)
			.keyup(function() {
				if ( $(this).val() !== '' && isInt($(this).val()) ) {
					$(self).data("date").setYear(parseInt($(this).val(),10));
					updateMe();
				}
			}).addClass('ui-input-text ui-corner-all ui-shadow-inset ui-datebox-input ui-body-'+o.pickInputTheme);
		
		var pickPageMinus = $("<div class='ui-datebox-controls'></div>").appendTo(pickPageContent);
		
		$("<div><a href='#'></a></div>")
			.appendTo(pickPageMinus).buttonMarkup({theme: o.buttonTheme, icon: 'minus', iconpos: 'top', corners:true, shadow:true})
			.click(function(e) {
				e.preventDefault();
				$(self).data("date").setMonth($(self).data("date").getMonth() - 1);
				updateMe();
			})
			.clone(false).appendTo(pickPageMinus)
			.click(function(e) {
				e.preventDefault();
				$(self).data("date").setDate($(self).data("date").getDate() - 1);
				updateMe();
			})
			.clone(false).appendTo(pickPageMinus)
			.click(function(e) {
				e.preventDefault();
				$(self).data("date").setYear($(self).data("date").getFullYear() - 1);
				updateMe();
			});
			
		var pickPageSet = $("<div class='ui-datebox-controls'></div>").appendTo(pickPageContent);
		
		$("<a href='#'>Set Date</a>")
			.appendTo(pickPageSet).buttonMarkup({theme: o.pickPageTheme, icon: 'check', iconpos: 'left', corners:true, shadow:true})
			.click(function(e) {
				e.preventDefault();
				screen.hide();
				input.val(self._formatDate($(self).data("date")));
				pickPage.removeClass('in').hide();
				input.blur();
			});
			
		if ( input.is(':disabled') ) {
			this.disable();
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
  });
	
	
})( jQuery );
