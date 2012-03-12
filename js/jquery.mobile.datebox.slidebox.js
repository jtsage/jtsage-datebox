/* 
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notification.
 * https://github.com/jtsage/jquery-mobile-datebox
 */
/* SLIDEBOX Mode */

(function($) {
	$.extend( $.mobile.datebox.prototype.options, {
		themeDateHigh: 'e',
		themeDatePick: 'a',
		themeDate: 'd',
		useSetButton: true,
		validHours: false,
		slen: {'y': 5, 'm':6, 'd':15, 'h':12, 'i':30}
	});
	$.extend( $.mobile.datebox.prototype, {
		'_sbox_pos': function () {
			var w = this,
				ech = null,
				top = null,
				par = this.d.intHTML.find('.ui-datebox-flipcontent').innerHeight(),
				tot = null;
				
			w.d.intHTML.find('.ui-datebox-flipcenter').each(function() {
				ech = $(this);
				top = ech.outerHeight();
				ech.css('top', ((par/2)-(top/2)+2)*-1);
			});
			w.d.intHTML.find('ul').each(function () {
				ech = $(this);
				par = ech.parent().innerHeight();
				top = ech.find('li').first();
				tot = ech.find('li').size() * top.outerHeight();
				top.css('marginTop', ((tot/2)-(par/2)+(top.outerHeight()/2))*-1);
			});
		}
	});
	$.extend( $.mobile.datebox.prototype._build, {
		'slidebox': function () {
			var w = this,
				o = this.options, i, y, hRow, phRow, tmp, testDate,
				iDate = this._makeDate(this.d.input.val()),
				uid = 'ui-datebox-',
				slideBase = $("<div class='"+uid+"sliderow-int'></div>"),
				phBase = $('<div>'),
				ctrl = $("<div>", {"class":uid+'slide'});
			
			if ( typeof w.d.intHTML !== 'boolean' ) {
				w.d.intHTML.empty();
			}
			
			w.d.input.on('datebox', function (e,p) {
				if ( p.method === 'postrefresh' ) {
					w._sbox_pos();
				}
			});
			
			w.d.headerText = ((w._grabLabel() !== false)?w._grabLabel():w.__('titleDateDialogLabel'));
			w.d.intHTML = $('<span>')
			
			w.fldOrder = w.__('slideFieldOrder');
			w._check();
			
			$('<div class="'+uid+'header"><h4>'+w._formatter(w.__('headerFormat'), w.theDate)+'</h4></div>').appendTo(w.d.intHTML);
			
			w.d.intHTML.append(ctrl);
			
			for ( y=0; y<w.fldOrder.length; y++ ) {
				phRow = phBase.clone().jqmData('rowtype', w.fldOrder[y]);
				hRow = slideBase.clone().jqmData('rowtype', w.fldOrder[y]).appendTo(phRow);
				if ( w.__('isRTL') === true ) { hRow.css('direction', 'rtl'); }
				
				switch (w.fldOrder[y]) {
					case 'y':
						phRow.addClass(uid+'sliderow-ym');
						for ( i=o.slen.y*-1; i<(o.slen.y+1); i++ ) {
							tmp = (i!==0)?((iDate.get(0) === (w.theDate.get(0) + i))?o.themeDateHigh:o.themeDate):o.themeDatePick;
							$('<div>', {'class':uid+'slideyear ui-corner-all ui-btn-up-'+tmp})
								.html(w.theDate.get(0)+i).jqmData('offset', i).jqmData('theme', tmp).appendTo(hRow);
						}
						break;
					case 'm':
						phRow.addClass(uid+'sliderow-ym');
						for ( i=o.slen.m*-1; i<(o.slen.m+1); i++ ) {
							testDate = w.theDate.copy([0],[0,0,1]);
							testDate.adj(1,i);
							tmp = (i!==0)?((iDate.get(1) === testDate.get(1) && iDate.get(0) === testDate.get(0))?o.themeDateHigh:o.themeDate):o.themeDatePick;
							$('<div>', {'class':uid+'slidemonth ui-corner-all ui-btn-up-'+tmp})
								.html(w.__('monthsOfYearShort')[testDate.get(1)]).jqmData('offset', i).jqmData('theme', tmp).appendTo(hRow);
						}
						break;
						
					case 'd':
						phRow.addClass(uid+'sliderow-d');
						for ( i=o.slen.d*-1; i<(o.slen.d+1); i++ ) {
							testDate = w.theDate.copy();
							testDate.adj(2,i);
							tmp = (i!==0)?((iDate.comp() === testDate.comp())?o.themeDateHigh:o.themeDate):o.themeDatePick;
							if ( ( o.blackDates !== false && $.inArray(testDate.iso(), o.blackDates) > -1 ) ||
								( o.blackDays !== false && $.inArray(testDate.getDay(), o.blackDays) > -1 ) ) {
								tmp += ' '+uid+'griddate-disable';
							}
							$('<div>', {'class':uid+'slideday ui-corner-all ui-btn-up-'+tmp})
								.html(testDate.get(2) + '<br /><span class="'+uid+'slidewday">' + w.__('daysOfWeekShort')[testDate.getDay()] + '</span>')
								.jqmData('offset', i).jqmData('theme', tmp).appendTo(hRow);
						}
						break;
					case 'h':
						phRow.addClass(uid+'sliderow-hi');
						for ( i=o.flen.h*-1; i<(o.flen.h+1); i++ ) {
							testDate = w.theDate.copy();
							testDate.adj(3,i);
							tmp = (i!==0)?o.themeDate:o.themeDatePick;
							if ( o.validHours !== false && $.inArray(testDate.get(3), o.validHours) < 0 ) {
								tmp += ' '+uid+'griddate-disable';
							}
							$('<div>', {'class':uid+'slidehour ui-corner-all ui-btn-up-'+tmp})
								.html( w.__('timeFormat') === 12 ? w._formatter('%I<span class="'+uid+'slidewday">%p</span>', testDate) : testDate.get(3) )
								.jqmData('offset', i).jqmData('theme', tmp).appendTo(hRow);
						}
						break;
					case 'i':
						phRow.addClass(uid+'sliderow-hi');
						if ( o.minuteStep > 1 ) { w.theDate.set(4, (w.theDate.get(4) - (w.theDate.get(4) % o.minuteStep))); }
						for ( i=o.flen.i*-1; i<(o.flen.i+1); i++ ) {
							testDate = w.theDate.copy();
							testDate.adj(4,(i*o.minuteStep));
							tmp = (i!==0)?o.themeDate:o.themeDatePick;
							$('<div>', {'class':uid+'slidemins ui-corner-all ui-btn-up-'+tmp})
								.html(w._zPad(testDate.get(4))).jqmData('offset', i).jqmData('theme', tmp).appendTo(hRow);
						}
						break;
				}
				phRow.appendTo(ctrl);
			}
			
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
			
			if ( w.wheelExists ) { // Mousewheel operation, if plugin is loaded
				w.d.intHTML.on('mousewheel', '.ui-overlay-shadow', function(e,d) {
					e.preventDefault();
					w._offset($(this).jqmData('field'), ((d<0)?-1:1)*$(this).jqmData('amount'));
				});
			}
			
			w.d.intHTML.on(w.drag.eStart, 'ul', function(e,f) {
				if ( !w.drag.move ) {
					if ( typeof f !== "undefined" ) { e = f; }
					w.drag.move = true;
					w.drag.target = $(this).find('li').first();
					w.drag.pos = parseInt(w.drag.target.css('marginTop').replace(/px/i, ''),10);
					w.drag.start = w.touch ? e.originalEvent.changedTouches[0].pageY : e.pageY;
					w.drag.end = false;
					e.stopPropagation();
					e.preventDefault();
				}
			});
			
			w.d.intHTML.on(w.drag.eStart, '.'+uid+'flipcenter', function(e) { // Used only on old browsers and IE.
				if ( !w.drag.move ) {
					w.drag.target = w.touch ? e.originalEvent.changedTouches[0].pageX - $(e.currentTarget).offset().left : e.pageX - $(e.currentTarget).offset().left;
					w.drag.tmp = w.d.intHTML.find('.'+uid+'flipcenter').innerWidth() / (( $.inArray('a', w.fldOrder) > -1 && w.__('timeFormat') !== 12 )?w.fldOrder.length-1:w.fldOrder.length);
					$(w.d.intHTML.find('ul').get(parseInt(w.drag.target / w.drag.tmp,10))).trigger(w.drag.eStart,e);
				}
			});
		}
	});
	$.extend( $.mobile.datebox.prototype._drag, {
		'timeflipbox': function() {
			this._drag.flipbox.apply(this);
		},
		'flipbox': function() {
			var w = this,
				o = this.options,
				g = this.drag;
			
			$(document).on(g.eMove, function(e) {
				if ( g.move && ( o.mode === 'flipbox' || o.mode === 'timeflipbox' )) {
					g.end = w.touch ? e.originalEvent.changedTouches[0].pageY : e.pageY;
					g.target.css('marginTop', (g.pos + g.end - g.start) + 'px');
					e.preventDefault();
					e.stopPropagation();
					return false;
				}
			});
			
			$(document).on(g.eEnd, function(e) {
				if ( g.move && (o.mode === 'flipbox' || o.mode === 'timeflipbox' )) {
					g.move = false;
					if ( g.end !== false ) {
						e.preventDefault();
						e.stopPropagation();
						g.tmp = g.target.parent().parent();
						w._offset(g.tmp.jqmData('field'), (parseInt((g.start - g.end) / g.target.innerHeight(),10) * g.tmp.jqmData('amount')));
					}
					g.start = false;
					g.end = false;
				}
			});
		}
	});
})( jQuery );



/*
(function($, undefined ) {
	
	return true;
  $.widget( "mobile.datebox", $.mobile.widget, {
	
	_update: function() {
		// Update the display on date change
		var self = this,
			o = self.options, 
			testDate = null,
			i, gridWeek, gridDay, skipThis, thisRow, y, cTheme, inheritDate, thisPRow, tmpVal, disVal,
			interval = {'d': 60*60*24, 'h': 60*60, 'i': 60, 's':1},
			calmode = {};
			
		// BEGIN:SLIDEBOX /
		if ( o.mode === 'slidebox' ) {
			
			
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
					
				thisPRow.appendTo(self.controlsInput);
			}
		}
		// END:SLIDEBOX /
		
	},
	* 
	* 
	* 
	* 
	* 
	/ drag and drop support, all ending and moving events are defined here, start events are handled in _buildPage or update
			if ( o.swipeEnabled ) {
				$(document).bind(self.MOVE_DRAG, function(e) {
					if ( self.dragMove ) {
						if ( o.mode === 'slidebox' ) {
							self.dragEnd = self.touch ? e.originalEvent.changedTouches[0].pageX : e.pageX;
							self.dragTarget.css('marginLeft', (self.dragPos + self.dragEnd - self.dragStart) + 'px');
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
*/
