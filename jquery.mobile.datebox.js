/*
 * jQuery Mobile Framework : plugin to provide an android-like datepicker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notifcation.
 * 
 * Suggested use:  (input elements of type="text" & data-type="datebox")
 * 
 * $( document ).bind( "mobileinit", function(){
			$.mobile.page.prototype.options.degradeInputs.date = true;
		});
 * $(document).ready(function() {
			$('input[data-type="datebox"]').datebox();
		});
 */
(function($, undefined ) {
$.widget( "mobile.datebox", $.mobile.widget, {
	options: {
		theme: null,
		disabled: false,
		pickPageTheme: 'b',
		buttonTheme: 'a',
		escapeClose: true,
		clickOutsideClose: true,
	},
	_create: function(){

		var self = this,
			o = this.options,
			input = this.element,
			theme = o.theme;
			
		themeclass = " ui-body-" + theme;
		$('label[for='+input.attr('id')+']').addClass('ui-input-text');
		input.addClass('ui-datebox-baseinput ui-body-'+ o.theme);
		
		var focusedEl = input;

		if( input.is('[data-type="datebox"]') ){
			
			$(this).data('date', new Date());
			
			focusedEl = input.wrap('<div class="ui-input-search ui-input-datebox ui-shadow-inset ui-btn-corner-all ui-btn-shadow'+ themeclass +'"></div>').parent();
			input.removeClass('ui-corner-all ui-shadow-inset ' + themeclass)
			
			var clearbtn = $('<a href="#" class="ui-input-clear" title="date picker">date picker</a>')
				.tap(function( e ){ /* clicked the button! */
					inputOffset = focusedEl.offset()
					pickWinHeight = pickPage.outerHeight();
					pickWinWidth = pickPage.innerWidth();
					pickWinTop = inputOffset.top + ( input.outerHeight() / 2 )- ( pickWinHeight / 2);
					if ( pickWinTop < 45 ) { // Fix for popup ending up under header
						pickWinTop = 45;
					}
					pickWinLeft = inputOffset.left + ( focusedEl.outerWidth() / 2) - ( pickWinWidth / 2);
					pickPage.css('position', 'absolute').css('top', pickWinTop).css('left', pickWinLeft).fadeIn('slow');
					input.trigger('change');
					
					if ( o.escapeClose ) {
						$(document).keyup(function(e) { // Close on ESC key.
							if ( e.keyCode == 27 ) {
								pickPage.fadeOut('slow');
								$(document).unbind('keyup');
								input.focus();
							}
						});
					}
						
					if ( o.clickOutsideClose ) {
						$(document).bind('click', function() { // Click outside to close.
							pickPage.fadeOut('slow');
							$(document).unbind('click');
							input.focus();
						});
						clearbtn.click(function(evt){ evt.stopPropagation(); });
						pickPage.click(function(evt){ evt.stopPropagation(); });
					}

					e.preventDefault();
				})
				.appendTo(focusedEl)
				.buttonMarkup({icon: 'grid', iconpos: 'notext', corners:true, shadow:true});

			focusedEl.parent().tap(function() {
				input.focus();
			});
			input
				.focus(function(){
					focusedEl.addClass('ui-focus');
					input.removeClass('ui-focus');
				})
				.blur(function(){
					focusedEl.removeClass('ui-focus');
					input.removeClass('ui-focus');
				})
				.change(function() {
					if ( input.val() != '' ) {
						$(self).data("date", new Date(input.val()));
					} else {
						$(self).data("date", new Date());
					}
					updateMe();
				});
				
				
			function updateMe() {
				pickPageDate.find('h4').html($(self).data("date").toLocaleDateString());
				pickMonth.val($(self).data("date").getMonth() + 1);
				pickDay.val($(self).data("date").getDate());
				pickYear.val($(self).data("date").getFullYear());
			};
			
			function isInt(s) {
				return (s.toString().search(/^[0-9]+$/) == 0);
			}

			var pickPage = $("<div data-role='page' data-theme='" + o.pickPageTheme + "' class='ui-datebox-container'>" +
							"<div data-role='header' data-backbtn='false' data-theme='a'>" +
								"<a href=\"#\" data-icon='delete' data-iconpos='notext'>Cancel</a> <div class='ui-title'>Choose Date</div>"+
							"</div>"+
							"<div data-role='content'></div>"+
						"</div>")
						.appendTo( $.mobile.pageContainer )
						.page(),
						
				pickPageContent = pickPage.find( ".ui-content" ),
				pickPageClose = pickPage.find( ".ui-header a");
				
			pickPageClose.click(function(e) {
				pickPage.fadeOut('slow');
				input.focus();
				if ( o.clickOutsideClose ) { $(document).unbind('click'); }
				if ( o.escapeClose ) { $(document).unbind('keyup'); }
			});
			
			pickPage.width('300px');
			
			var pickPageDate = $("<div class='ui-datebox-date'><h4>"+$(this).data("date").toLocaleDateString()+"</h4></div>").appendTo(pickPageContent);
			
			var pickPagePlus = $("<div class='ui-datebox-controls'></div>").appendTo(pickPageContent);
			
			$("<div class='ui-datebox-button' title='Next Month'><a href='#'></a></div>")
				.appendTo(pickPagePlus).buttonMarkup({theme: o.buttonTheme, icon: 'plus', iconpos: 'bottom', corners:true, shadow:true})
				.tap(function() {
					$(self).data("date").setMonth($(self).data("date").getMonth() + 1);
					updateMe();
				});
			
			$("<div class='ui-datebox-button' title='Next Day'><a href='#'></a></div>")
				.appendTo(pickPagePlus).buttonMarkup({theme: o.buttonTheme, icon: 'plus', iconpos: 'bottom', corners:true, shadow:true})
				.tap(function() {
					$(self).data("date").setDate($(self).data("date").getDate() + 1);
					updateMe();
				});
			
			$("<div class='ui-datebox-button' title='Next Year'><a href='#'></a></div>")
				.appendTo(pickPagePlus).buttonMarkup({theme: o.buttonTheme, icon: 'plus', iconpos: 'bottom', corners:true, shadow:true})
				.tap(function() {
					$(self).data("date").setYear($(self).data("date").getFullYear() + 1);
					updateMe();
				});
				
			var pickPageInput = $("<div class='ui-datebox-input'></div>").appendTo(pickPageContent);
			
			var pickMonth = 	$("<input type='text' />").appendTo(pickPageInput)
				.keyup(function() {
					if ( $(this).val() != '' && isInt($(this).val()) ) {
						$(self).data("date").setMonth(parseInt($(this).val())-1);
						updateMe();
					}
				});
				
			var pickDay = 		$("<input type='text' />").appendTo(pickPageInput)
				.keyup(function() {
					if ( $(this).val() != '' && isInt($(this).val()) ) {
						$(self).data("date").setDate(parseInt($(this).val()));
						updateMe();
					}
				});
				
			var pickYear = 		$("<input type='text' />").appendTo(pickPageInput)
				.keyup(function() {
					if ( $(this).val() != '' && isInt($(this).val()) ) {
						$(self).data("date").setYear(parseInt($(this).val()));
						updateMe();
					}
				});
			
			var pickPageMinus = $("<div class='ui-datebox-controls'></div>").appendTo(pickPageContent);
			
			$("<div class='ui-datebox-button' title='Previous Month'><a href='#'></a></div>")
				.appendTo(pickPageMinus).buttonMarkup({theme: o.buttonTheme, icon: 'minus', iconpos: 'top', corners:true, shadow:true})
				.tap(function() {
					$(self).data("date").setMonth($(self).data("date").getMonth() - 1);
					updateMe();
				});
			
			$("<div class='ui-datebox-button' title='Previous Day'><a href='#'></a></div>")
				.appendTo(pickPageMinus).buttonMarkup({theme: o.buttonTheme, icon: 'minus', iconpos: 'top', corners:true, shadow:true})
				.tap(function() {
					$(self).data("date").setDate($(self).data("date").getDate() - 1);
					updateMe();
				});
			
			$("<div class='ui-datebox-button' title='Previous Year'><a href='#'></a></div>")
				.appendTo(pickPageMinus).buttonMarkup({theme: o.buttonTheme, icon: 'minus', iconpos: 'top', corners:true, shadow:true})
				.tap(function() {
					$(self).data("date").setYear($(self).data("date").getFullYear() - 1);
					updateMe();
				});
			
			var pickPageSet = $("<div class='ui-datebox-controls'></div>").appendTo(pickPageContent);
			
			$("<a href='#'>Set Date</a>")
				.appendTo(pickPageSet).buttonMarkup({theme: o.pickPageTheme, icon: 'check', iconpos: 'left', corners:true, shadow:true})
				.tap(function() {
					input.val($(self).data("date").toLocaleDateString());
					pickPage.fadeOut('fast');
					input.blur();
					if ( o.clickOutsideClose ) { $(document).unbind('click'); }
					if ( o.escapeClose ) { $(document).unbind('keyup'); }
				});
					
			pickPage.css('minHeight', '0px');
			
		}
	},
	    
	disable: function(){
		( this.element.attr("disabled",true).is('[data-type="datebox"]') ? this.element.parent() : this.element ).addClass("ui-disabled");
	},
	
	enable: function(){
		( this.element.attr("disabled", false).is('[data-type="datebox"]') ? this.element.parent() : this.element ).removeClass("ui-disabled");
	}

	
	});
})( jQuery );
