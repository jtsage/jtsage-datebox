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
		theme: 'c',
		disabled: false,
		pickPageTheme: 'b',
		buttonTheme: 'a',
		pickInputTheme: 'e',
		escapeClose: true,
		clickOutsideClose: true,
		pickPageWidth: '300px',
	},
	_create: function(){

		var self = this,
			o = this.options,
			input = this.element,
			theme = o.theme;
			
		$(this).data('date', new Date());
		$('label[for='+input.attr('id')+']').addClass('ui-input-text');
		
		input.removeClass('ui-corner-all ui-shadow-inset');
		
		var focusedEl = input.wrap('<div class="ui-input-datebox ui-shadow-inset ui-btn-corner-all ui-btn-shadow ui-body-'+ o.theme +'"></div>').parent();
		
		var clearbtn = $('<a href="#" class="ui-input-clear" title="date picker">date picker</a>')
			.click(function( e ){ /* clicked the button! */
				if ( !o.disabled ) {
					self.noClose = true;
					// Disable outside click for half a second on display.
					setTimeout(function() { self.noClose = false; }, 600); 
					inputOffset = focusedEl.offset()
					pickWinHeight = pickPage.outerHeight();
					pickWinWidth = pickPage.innerWidth();
					pickWinTop = inputOffset.top + ( input.outerHeight() / 2 )- ( pickWinHeight / 2);
					
					// If this popup would extend the window, don't - move it up.
					if ( (pickWinHeight + pickWinTop) > $(document).height() ) {
						pickWinTop = $(document).height() - (pickWinHeight + 2);
					}
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
								$(document).unbind('click');
								input.focus();
							}
						});
					}
						
					if ( o.clickOutsideClose ) {
						$(document).bind('click', function() { // Click outside to close.
							if ( ! self.noClose ) {
								pickPage.fadeOut('slow');
								$(document).unbind('click');
								$(document).unbind('keyup');
								input.focus();
							}
						});
						clearbtn.click(function(evt){ evt.stopPropagation(); });
						pickPage.click(function(evt){ evt.stopPropagation(); });
					}
				}

				e.preventDefault();
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
					.page().width(o.pickPageWidth).css('minHeight', '0px'),
					
			pickPageContent = pickPage.find( ".ui-content" ),
			pickPageClose = pickPage.find( ".ui-header a");
			
		pickPageClose.click(function(e) {
			pickPage.fadeOut('slow');
			input.focus();
			if ( o.clickOutsideClose ) { $(document).unbind('click'); }
			if ( o.escapeClose ) { $(document).unbind('keyup'); }
		});
		
		
		var pickPageDate = $("<div class='ui-datebox-date'><h4>"+$(this).data("date").toLocaleDateString()+"</h4></div>").appendTo(pickPageContent);
		
		var pickPagePlus = $("<div class='ui-datebox-controls'></div>").appendTo(pickPageContent);
		
		$("<div title='Next Month'><a href='#'></a></div>")
			.appendTo(pickPagePlus).buttonMarkup({theme: o.buttonTheme, icon: 'plus', iconpos: 'bottom', corners:true, shadow:true})
			.click(function() {
				$(self).data("date").setMonth($(self).data("date").getMonth() + 1);
				updateMe();
			});
		
		$("<div title='Next Day'><a href='#'></a></div>")
			.appendTo(pickPagePlus).buttonMarkup({theme: o.buttonTheme, icon: 'plus', iconpos: 'bottom', corners:true, shadow:true})
			.click(function() {
				$(self).data("date").setDate($(self).data("date").getDate() + 1);
				updateMe();
			});
		
		$("<div title='Next Year'><a href='#'></a></div>")
			.appendTo(pickPagePlus).buttonMarkup({theme: o.buttonTheme, icon: 'plus', iconpos: 'bottom', corners:true, shadow:true})
			.click(function() {
				$(self).data("date").setYear($(self).data("date").getFullYear() + 1);
				updateMe();
			});
			
		var pickPageInput = $("<div></div>").appendTo(pickPageContent);
		
		var pickMonth = 	$("<input type='text' />").appendTo(pickPageInput)
			.keyup(function() {
				if ( $(this).val() != '' && isInt($(this).val()) ) {
					$(self).data("date").setMonth(parseInt($(this).val())-1);
					updateMe();
				}
			}).addClass('ui-input-text ui-corner-all ui-shadow-inset ui-datebox-input ui-body-'+o.pickInputTheme);
			
		var pickDay = 		$("<input type='text' />").appendTo(pickPageInput)
			.keyup(function() {
				if ( $(this).val() != '' && isInt($(this).val()) ) {
					$(self).data("date").setDate(parseInt($(this).val()));
					updateMe();
				}
			}).addClass('ui-input-text ui-corner-all ui-shadow-inset ui-datebox-input ui-body-'+o.pickInputTheme);
			
		var pickYear = 		$("<input type='text' />").appendTo(pickPageInput)
			.keyup(function() {
				if ( $(this).val() != '' && isInt($(this).val()) ) {
					$(self).data("date").setYear(parseInt($(this).val()));
					updateMe();
				}
			}).addClass('ui-input-text ui-corner-all ui-shadow-inset ui-datebox-input ui-body-'+o.pickInputTheme);
		
		var pickPageMinus = $("<div class='ui-datebox-controls'></div>").appendTo(pickPageContent);
		
		$("<div title='Previous Month'><a href='#'></a></div>")
			.appendTo(pickPageMinus).buttonMarkup({theme: o.buttonTheme, icon: 'minus', iconpos: 'top', corners:true, shadow:true})
			.click(function() {
				$(self).data("date").setMonth($(self).data("date").getMonth() - 1);
				updateMe();
			});
		
		$("<div title='Previous Day'><a href='#'></a></div>")
			.appendTo(pickPageMinus).buttonMarkup({theme: o.buttonTheme, icon: 'minus', iconpos: 'top', corners:true, shadow:true})
			.click(function() {
				$(self).data("date").setDate($(self).data("date").getDate() - 1);
				updateMe();
			});
		
		$("<div title='Previous Year'><a href='#'></a></div>")
			.appendTo(pickPageMinus).buttonMarkup({theme: o.buttonTheme, icon: 'minus', iconpos: 'top', corners:true, shadow:true})
			.click(function() {
				$(self).data("date").setYear($(self).data("date").getFullYear() - 1);
				updateMe();
			});
		
		var pickPageSet = $("<div class='ui-datebox-controls'></div>").appendTo(pickPageContent);
		
		$("<a href='#'>Set Date</a>")
			.appendTo(pickPageSet).buttonMarkup({theme: o.pickPageTheme, icon: 'check', iconpos: 'left', corners:true, shadow:true})
			.click(function(e) {
				e.preventDefault();
				input.val($(self).data("date").toLocaleDateString());
				pickPage.fadeOut('fast');
				input.blur();
				if ( o.clickOutsideClose ) { $(document).unbind('click'); }
				if ( o.escapeClose ) { $(document).unbind('keyup'); }
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
})( jQuery );
