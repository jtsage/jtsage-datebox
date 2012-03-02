/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notification.
 * https://github.com/jtsage/jquery-mobile-datebox
 */

(function($) {
	$.extend( $.mobile.datebox.prototype.options, {
		themeButton: 'a',
		themeInput: 'e',
		useSetButton: true
	});
	$.extend( $.mobile.datebox.prototype, {
		_dbox_enter: function (item) {
			var w = this;
			
			if ( item.val() !== '' && item.val().toString().search(/^[0-9]+$/) === 0 ) {
				switch ( item.jqmData('field') ) {
					case 'y':
						w.theDate.setFullYear(parseInt(item.val(),10)); break;
					case 'm':
						w.theDate.setMonth(parseInt(item.val(),10)-1); break;
					case 'd':
						w.theDate.setDate(parseInt(item.val(),10)); break;
					case 'h':
						w.theDate.setHours(parseInt(item.val(),10)); break;
					case 'i':
						w.theDate.setMinutes(parseInt(item.val(),10)); break;
				}
			}
			w.refresh();
		}
	});
	$.extend( $.mobile.datebox.prototype._build, {
		'timebox': function () {
			this._build.datebox.apply(this,[]);
		},
		'datebox': function () {
			var w = this,
				o = this.options, i, y,
				uid = 'ui-datebox-',
				divBase = $("<div>", { "class":uid+'controls' }),
				divPlus = divBase.clone(),
				divIn = divBase.clone(),
				divMinus = divBase.clone(),
				inBase = $("<input type='"+w.inputType+"' />").addClass('ui-input-text ui-corner-all ui-shadow-inset '+uid+'input ui-body-'+o.themeInput),
				inBaseT = inBase.clone().attr('type','text'),
				butBase = $("<div><a href='#'></a></div>"),
				butPTheme = {theme: o.themeButton, icon: 'plus', iconpos: 'bottom', corners:true, shadow:true},
				butMTheme = $.extend({}, butPTheme, {icon: 'minus', iconpos: 'top'});
			
			if ( typeof w.d.intHTML !== 'boolean' ) {
				w.d.intHTML.empty();
			}
			
			w.d.headerText = ((w._grabLabel() !== false)?w._grabLabel():((o.mode==='datebox')?w.__('titleDateDialogLabel'):w.__('titleTimeDialogLabel')));
			w.d.intHTML = $('<span>');
			
			w.fldOrder = ((o.mode==='datebox')?w.__('dateFieldOrder'):w.__('timeFieldOrder'));
			w._check();
			
			if ( o.mode === 'datebox' ) { $('<div class="'+uid+'header"><h4>'+w._formatter(w.__('headerFormat'), w.theDate)+'</h4></div>').appendTo(w.d.intHTML); }
			
			for(i=0; i<=w.fldOrder.length; i++) {
				switch (w.fldOrder[i]) {
					case 'y':
					case 'm':
					case 'd':
					case 'h':
						w._makeEl(inBase, {'attr': {'field':w.fldOrder[i], 'amount':1}}).appendTo(divIn);
						w._makeEl(butBase, {'attr': {'field':w.fldOrder[i], 'amount':1}}).buttonMarkup(butPTheme).appendTo(divPlus);
						w._makeEl(butBase, {'attr': {'field':w.fldOrder[i], 'amount':1}}).buttonMarkup(butMTheme).appendTo(divMinus);
						break;
					case 'a':
						if ( w.__('timeFormat') === 12 ) {
							w._makeEl(inBaseT, {'attr': {'field':w.fldOrder[i], 'amount':1}}).appendTo(divIn);
							w._makeEl(butBase, {'attr': {'field':w.fldOrder[i], 'amount':1}}).buttonMarkup(butPTheme).appendTo(divPlus);
							w._makeEl(butBase, {'attr': {'field':w.fldOrder[i], 'amount':1}}).buttonMarkup(butMTheme).appendTo(divMinus);
						} 
						break;
					case 'D':
						w._makeEl(inBaseT, {'attr': {'field':w.fldOrder[i], 'amount':1}}).appendTo(divIn);
						w._makeEl(butBase, {'attr': {'field':w.fldOrder[i], 'amount':1}}).buttonMarkup(butPTheme).appendTo(divPlus);
						w._makeEl(butBase, {'attr': {'field':w.fldOrder[i], 'amount':1}}).buttonMarkup(butMTheme).appendTo(divMinus);
						break;
					case 'i':
						w._makeEl(inBase, {'attr': {'field':w.fldOrder[i], 'amount':o.minuteStep}}).appendTo(divIn);
						w._makeEl(butBase, {'attr': {'field':w.fldOrder[i], 'amount':o.minuteStep}}).buttonMarkup(butPTheme).appendTo(divPlus);
						w._makeEl(butBase, {'attr': {'field':w.fldOrder[i], 'amount':o.minuteStep}}).buttonMarkup(butMTheme).appendTo(divMinus);
						break;
					
				}
			}
			
			divIn.find('input').each(function () {
				switch ( $(this).jqmData('field') ) {
					case 'y':
						$(this).val(w.theDate.getFullYear()); break;
					case 'm':
						$(this).val(w.theDate.getMonth() + 1); break;
					case 'd':
						$(this).val(w.theDate.getDate()); break;
					case 'h':
						if ( w.__('timeFormat') === 12 ) {
							if ( w.theDate.getHours() > 12 ) {
								$(this).val(w.theDate.getHours()-12); break;
							} else if ( w.theDate.getHours() === 0 ) {
								$(this).val(12); break;
							}
						}		
						$(this).val(w.theDate.getHours()); break;
					case 'i':
						$(this).val(w.theDate.getMinutes()); break;
					case 'D':
						$(this).val(w.__('monthsOfYearShort')[w.theDate.getMonth()]); break;
					case 'a':
						$(this).val((w.theDate.getHours() > 11)?w.__('meridiem')[1]:w.__('meridiem')[0]);
						break;
				}
			});
			
			if ( w.dateOK !== true ) {
				divIn.find('input').addClass(uid+'griddate-disable');
			} else {
				divIn.find('.'+uid+'griddate-disable').removeClass(uid+'griddate-disable');
			}
			
			divPlus.appendTo(w.d.intHTML);
			divIn.appendTo(w.d.intHTML);
			divMinus.appendTo(w.d.intHTML);
			
			
			if ( o.useSetButton || o.useClearButton ) {
				y = $('<div>', {'class':uid+'controls'});
				
				if ( o.useSetButton ) {
					$('<a href="#">'+((o.mode==='datebox')?w.__('setDateButtonLabel'):w.__('setTimeButtonLabel'))+'</a>')
						.appendTo(y).buttonMarkup({theme: o.theme, icon: 'check', iconpos: 'left', corners:true, shadow:true})
						.on(o.clickEvent, function(e) {
							e.preventDefault();
							if ( w.dateOK === true ) {
								w.d.input.trigger('datebox', {'method':'set', 'value':w._formatter(w.__fmt(),w.theDate), 'date':w.theDate});
								w.d.input.trigger('datebox', {'method':'close'});
							}
						});
				}
				if ( o.useClearButton ) {
					$('<a href="#">'+w.__('clearButton')+'</a>')
						.appendTo(y).buttonMarkup({theme: o.theme, icon: 'delete', iconpos: 'left', corners:true, shadow:true})
						.on(o.clickEvent, function(e) {
							e.preventDefault();
							w.d.input.val('');
							w.d.input.trigger('datebox',{'method':'clear'});
							w.d.input.trigger('datebox',{'method':'close'});
						});
				}
				if ( o.useCollapsedBut ) {
					y.addClass('ui-datebox-collapse');
				}
				y.appendTo(w.d.intHTML);
			}
			
			
			divPlus.on(o.clickEvent, 'div', function(e) {
				e.preventDefault();
				w._offset($(this).jqmData('field'), $(this).jqmData('amount'));
			});
			divMinus.on(o.clickEvent, 'div', function(e) {
				e.preventDefault();
				w._offset($(this).jqmData('field'), $(this).jqmData('amount')*-1);
			});
			
			divIn.on('change', 'input', function() { w._dbox_enter($(this)); });
					
			if ( w.wheelExists ) { // Mousewheel operation, if plugin is loaded
				divIn.on('mousewheel', 'input', function(e,d) {
					e.preventDefault();
					w._offset($(this).jqmData('field'), ((d<0)?-1:1)*$(this).jqmData('amount'));
				});
			}
			
			/*if ( o.swipeEnabled ) { // Drag and drop support
				divIn.delegate('input', self.START_DRAG, function(e) {
					if ( !self.dragMove ) {
						self.dragMove = true;
						self.dragTarget = $(this).jqmData('field');
						self.dragPos = 0;
						self.dragStart = self.touch ? e.originalEvent.changedTouches[0].pageY : e.pageY;
						self.dragEnd = false;
						e.stopPropagation();
					}
				});
			}*/
			
		}
	});
})( jQuery );
