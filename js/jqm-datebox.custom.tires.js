/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notification.
 * https://github.com/jtsage/jquery-mobile-datebox
 */
/* FLIPBOX Mode */

(function($) {
	$.extend( $.mobile.datebox.prototype.options, {
		themeTireHigh: 'e',
		themeTirePick: 'a',
		themeTire: 'd',
		useSetButton: true,
		tireField: {
			'Tr': [ 15, 16, 17, 18 ],
			'Tw': [ 7, 8, 9, 10 ],
			'TW': [ 2, 3, 4, 5 ]
		},
		tireFieldOrder: ['Tr', 'Tw', 'TW'],
		tireOutput: '%Xrr x %Xww, %XWyrs',
		tireDefault: [17,8,5],
		tireboxlang: {
			// This structure interfaces with __() -> if it exists, strings are looked up here after i8n fails,
			// and before going to 'default' - the name syntax is <mode>lang
			'tireTitleString': 'Tire Radius, Width, and Warrenty',
			'tireYears':'years',
			'tireSet':'Looks Good'
		}
	});
	$.extend( $.mobile.datebox.prototype, {
		'_tireboxDoSet': function () {
			// If this function exists, it overrides the 'doset' method of the 'datebox' event.
			// The name syntax is _<mode>DoSet
			var w = this, o = this.options;
			if ( typeof w.tireChoice === 'undefined' ) { w.tireChoice = this._makeDate(this.d.input.val()); }
			w.d.input.trigger('datebox', {'method':'set', 'value':w._formatter(o.tireOutput,w.tireChoice), 'date':w.tireChoice});
		},
		'_tbox_offset': function (fld, amount) {
			// This is *not* an automatic override, used below specificly.
			var w = this, x,
				o = this.options,
				witch = $.inArray(fld, ['Tr', 'Tw', 'TW']),
				base = o.tireField[fld].slice();
				
			if ( amount > 0 ) {
				for ( x = 0; x < 5; x++ ) {
					$.merge(base, o.tireField[fld]);
				}
			} else {
				base.reverse();
				amount = amount * -1;
				for ( x = 0; x < 5; x++ ) {
					$.merge(base, o.tireField[fld].slice().reverse());
				}
			}
			w.tireChoice[witch] = base[$.inArray(w.tireChoice[witch], base) + amount];
			if ( o.useImmediate ) { w.d.input.trigger('datebox', {'method':'set', 'value':w._formatter(o.tireOutput,w.tireChoice), 'date':w.tireChoice}); }
			w.refresh();
		},
		'_tbox_arr': function (type, choice) {
			var base = this.options.tireField[type], x,
				before = [],
				after = [],
				found = false;
				
			for ( x in base ) {
				if ( found === false && base[x] !== choice ) { 
					before.push(base[x]); 
				} else if ( base[x] === choice ) {
					found = true;
				} else {
					after.push(base[x]);
				}
			}
			
			while ( before.length < 10 ) {
				for ( x = base.length; x > 0; x-- ) {
					before.unshift(base[x-1]);
				}
			}
			while ( before.length > 10 ) {
				before.shift();
			}
			
			while ( after.length < 10 ) {
				for ( x = 0; x < base.length; x++ ) {
					after.push(base[x]);
				}
			}
			after.length = 10;
			
			before.push(choice);
			
			return $.merge($.merge([], before), after);
		},
		'_tbox_pos': function () {
			var w = this,
				ech = null,
				top = null,
				par = this.d.intHTML.find('.ui-datebox-flipcontent').innerHeight(),
				tot = null;
				
			w.d.intHTML.find('.ui-datebox-flipcenter').each(function() {
				ech = $(this);
				top = ech.innerHeight();
				ech.css('top', ((par/2)-(top/2)+4)*-1);
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
	$.extend( $.mobile.datebox.prototype._parser, {
		// If this stucture exists, it is called instead of the usual date input parser.
		// The name of the structure is the same as the mode name - it recieves a string
		// as the input, which is the current value of the input element, pre-sanitized
		'tirebox' : function ( str ) { 
			var o = this.options, i,
				adv = o.tireOutput,
				found = o.tireDefault,
				exp_input = null,
				exp_format = null;
			
			adv = adv.replace(/%(X|0|-)*([a-z])/gi, function(match, pad, oper) {
				switch (oper) {
					case 'r':
					case 'w':
					case 'W': return '(' + match + '|' +'[0-9]+' + ')';
					default: return '.+?';
				}
			});
			
			adv = new RegExp('^' + adv + '$');
			exp_input = adv.exec(str);
			exp_format = adv.exec(o.tireOutput);
			
			if ( exp_input === null || exp_input.length !== exp_format.length ) {
				return o.tireDefault;
			} 
			
			for ( i=0; i<exp_input.length; i++ ) { //0rad 1wid 2yrs
				if ( exp_format[i].match(/^%.*r$/) )         { found[0] = parseInt(exp_input[i],10); }
				if ( exp_format[i].match(/^%.*w$/) )         { found[1] = parseInt(exp_input[i],10); }
				if ( exp_format[i].match(/^%.*W$/) )         { found[2] = parseInt(exp_input[i],10); }
			}
			return found;
		}
	});
	$.extend( $.mobile.datebox.prototype._customformat, {
		// If this stucture exists, the formatter will call it when it encounters a special string
		// %X<whatever> - it recieves the single letter operater, and the current "date" value
		'tirebox' : function ( oper, val ) { 
			switch ( oper ) {
				case 'r': return val[0]; 
				case 'w': return val[1];
				case 'W': return val[2];
			}
		}
	});
	$.extend( $.mobile.datebox.prototype._build, {
		// This builds the actual interface, and is called on *every* refresh. (after each "movement")
		'tirebox': function () {
			var w = this,
				o = this.options, i, y, hRow, tmp, lineArr,
				uid = 'ui-datebox-',
				currentChoice = this._makeDate(this.d.input.val()),
				flipBase = $("<div class='ui-overlay-shadow'><ul></ul></div>"),
				ctrl = $("<div>", {"class":uid+'flipcontent'});
			
			if ( typeof w.tireChoice === 'undefined' ) { w.tireChoice = currentChoice.slice(); }
			
			if ( typeof w.d.intHTML !== 'boolean' ) {
				w.d.intHTML.empty().remove();
			}
			
			w.d.input.on('datebox', function (e,p) {
				if ( p.method === 'postrefresh' ) {
					w._tbox_pos();
				}
			});
			
			w.d.headerText = ((w._grabLabel() !== false)?w._grabLabel():w.__('tireTitleString'));
			w.d.intHTML = $('<span>');
			
			w.fldOrder = o.tireFieldOrder;
			
			$('<div class="'+uid+'header"><table style="width:250px; margin-left:15px; text-align:center"><tr><td>Radius</td><td>Width</td><td>Warrenty</td></tr></table></div>').appendTo(w.d.intHTML).find('td').css('width', '33%');
			
			w.d.intHTML.append(ctrl);
			
			for ( y=0; y<w.fldOrder.length; y++ ) {
				switch (w.fldOrder[y]) {
					case 'Tr':
						lineArr = w._tbox_arr('Tr', w.tireChoice[0]);
						hRow = w._makeEl(flipBase, {'attr': {'field':'Tr','amount':1} });
						for ( i in lineArr ) {
							tmp = (i!=10)?((lineArr[i]===currentChoice[0])?o.themeTireHigh:o.themeTire):o.themeTirePick;
							$('<li>', {'class':'ui-body-'+tmp})
								.html('<span>'+lineArr[i]+'</span>').appendTo(hRow.find('ul'));
							
						} 
						hRow.appendTo(ctrl);
						break;
					case 'Tw':
						lineArr = w._tbox_arr('Tw', w.tireChoice[1]);
						hRow = w._makeEl(flipBase, {'attr': {'field':'Tw','amount':1} });
						for ( i in lineArr ) {
							tmp = (i!=10)?((lineArr[i]===currentChoice[1])?o.themeTireHigh:o.themeTire):o.themeTirePick;
							$('<li>', {'class':'ui-body-'+tmp})
								.html('<span>'+lineArr[i]+'</span>').appendTo(hRow.find('ul'));
							
						} 
						hRow.appendTo(ctrl);
						break;
					case 'TW':
						lineArr = w._tbox_arr('TW', w.tireChoice[2]);
						hRow = w._makeEl(flipBase, {'attr': {'field':'TW','amount':1} });
						for ( i in lineArr ) {
							tmp = (i!=10)?((lineArr[i]===currentChoice[2])?o.themeTireHigh:o.themeTire):o.themeTirePick;
							$('<li>', {'class':'ui-body-'+tmp})
								.html('<span>'+lineArr[i]+' '+w.__('tireYears')+'</span>').appendTo(hRow.find('ul'));
							
						} 
						hRow.appendTo(ctrl);
						break;
					
				}
			}
			
			$("<div>", {"class":uid+'flipcenter ui-overlay-shadow'}).css('pointerEvents', 'none').appendTo(w.d.intHTML);
			
			if ( o.useSetButton ) {
				y = $('<div>', {'class':uid+'controls'});
				
				if ( o.useSetButton ) {
					$('<a href="#">'+w.__('tireSet')+'</a>')
						.appendTo(y).buttonMarkup({theme: o.theme, icon: 'check', iconpos: 'left', corners:true, shadow:true})
						.on(o.clickEvent, function(e) {
							e.preventDefault();
							w.d.input.trigger('datebox', {'method':'set', 'value':w._formatter(o.tireOutput,w.tireChoice), 'date':w.tireChoice});
							w.d.input.trigger('datebox', {'method':'close'});
						});
				}
				y.appendTo(w.d.intHTML);
			}
			
			if ( w.wheelExists ) { // Mousewheel operation, if plugin is loaded
				w.d.intHTML.on('mousewheel', '.ui-overlay-shadow', function(e,d) {
					e.preventDefault();
					w._tbox_offset($(this).jqmData('field'), ((d<0)?1:-1)*$(this).jqmData('amount'));
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
		// This contains the code that the drag and drop (or touch move) code uses
		'tirebox': function() {
			var w = this,
				o = this.options,
				g = this.drag;
			
			$(document).on(g.eMove, function(e) {
				if ( g.move && o.mode === 'tirebox' ) {
					g.end = w.touch ? e.originalEvent.changedTouches[0].pageY : e.pageY;
					g.target.css('marginTop', (g.pos + g.end - g.start) + 'px');
					e.preventDefault();
					e.stopPropagation();
					return false;
				}
			});
			
			$(document).on(g.eEnd, function(e) {
				if ( g.move && o.mode === 'tirebox' ) {
					g.move = false;
					if ( g.end !== false ) {
						e.preventDefault();
						e.stopPropagation();
						g.tmp = g.target.parent().parent();
						w._tbox_offset(g.tmp.jqmData('field'), (parseInt((g.start - g.end) / g.target.innerHeight(),10) * g.tmp.jqmData('amount')));
					}
					g.start = false;
					g.end = false;
				}
			});
		}
	});
})( jQuery );
