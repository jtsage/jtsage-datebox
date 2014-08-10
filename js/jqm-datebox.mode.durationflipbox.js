/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notification.
 * https://github.com/jtsage/jquery-mobile-datebox
 */
 /* DurationFlipBox Mode */

(function($) {
	$.extend( $.mobile.datebox.prototype.options, {
		themeDatePick: "b",
		themeDate: "a",
		useSetButton: true,
		durationSteppers: {
			"d": 1,
			"h": 1,
			"i": 1,
			"s": 1
		}
	});
	$.extend( $.mobile.datebox.prototype, {
		'_durfbox_pos': function () {
				var pos1, ech, top, fixer,
				w = this,
				par = this.d.intHTML.find( ".ui-datebox-flipcontent" ).innerHeight();
				
			w.d.intHTML.find( ".ui-datebox-flipcenter" ).each(function() {
				ech = $( this );
				top = ech.innerHeight();
				ech.css( "top", ( ( par / 2 ) - ( top / 2 ) - 3 ) * -1 );
			});
			w.d.intHTML.find('ul').each(function () {
				ech = $( this );
				par = ech.parent().innerHeight();
				top = ech.find( "li" ).first();
				fixer = ech.find( "li" ).last().offset().top - ech.find( "li" ).first().offset().top;
				pos1 = ( ( ( fixer-par ) / 2 ) + top.outerHeight() ) * -1;
				top.css( "marginTop", pos1 );
			});
		},
		'_durfbox_series': function (middle, side, type) {
			var nxt, prv,
				o = this.options,
				ret = [ [ middle.toString(), middle ] ];
			 
			for ( var i = 1; i <= side; i++ ) {
				nxt = middle + ( i * o.durationSteppers[type] );
				prv = middle - ( i * o.durationSteppers[type] );
				ret.unshift([nxt.toString(), nxt]);
				if ( prv > -1 ) {
					ret.push([prv.toString(), prv]);
				} else {
					ret.push(['',-1]);
				}
			}
			return ret;
		}
	});
	$.extend( $.mobile.datebox.prototype._build, {
		'durationflipbox': function () {
			var  i, y, hRow, hRowIn, tmp, stdPos, curFld,
				w = this,
				o = this.options,
				sel = ["d", "h", "i", "s"],
				gridLab = [0, 0, "a", "b", "c"],
				blockLab = ["a","b","c","d"],
				cDur = [0,0,0,0],
				cDurS = {},
				uid = "ui-datebox-",
				flipBase = $("<div class='ui-overlay-shadow'><ul></ul></div>"),
				ctrl = $("<div>", { "class" : uid + "flipcontent" + " " + uid + "flipcontentd" } ),
				ival = {
					"d": 60*60*24,
					"h": 60*60,
					"i": 60
				};
			
			if ( typeof w.d.intHTML !== "boolean" ) {
				w.d.intHTML.empty().remove();
			}
			
			w.d.input.on( "datebox", function (e,p) {
				if ( p.method === "postrefresh" ) { w._durfbox_pos(); }
			});
			
			w.d.headerText = ( ( w._grabLabel() !== false ) ? 
				w._grabLabel() :
				w.__('titleDateDialogLabel')
			);
			w.d.intHTML = $( "<span>" );

			$(document).one( "popupafteropen", function() { 
				// This fixes bad positioning on initial open - have not found a way around this yet.
				w._fbox_pos(); 
			});

			w.fldOrder = w.__('durationOrder');
			
			tmp = $( "<div class='" + uid + "header ui-grid-" + gridLab[w.fldOrder.length] + "'></div>");
			for ( y = 0; y < w.fldOrder.length; y++ ) {
				$("<div class='ui-block-" + blockLab[ y ] + "'>" + 
						w.__('durationLabel')[ $.inArray( w.fldOrder[y], sel ) ] + 
						"</div>"
					)
					.css( "textAlign", "center")
					.appendTo(tmp);
			}
			tmp.appendTo(w.d.intHTML);
			
			w.d.intHTML.append(ctrl);
			
			i = w.theDate.getEpoch() - w.initDate.getEpoch();
			if ( i < 0 ) { i = 0; w.theDate.setTime(w.initDate.getTime()); }
			w.lastDuration = i; // Let the number of seconds be sort of public.
			
			// SPLIT TIME INTO DAYS, HRS, MIN, SEC
			cDur[0] = parseInt( i / ival.d, 10); i = i % ival.d;
			cDur[1] = parseInt( i / ival.h, 10); i = i % ival.h;
			cDur[2] = parseInt( i / ival.i, 10);
			cDur[3] = i % ival.i;
			
			cDurS.d = w._durfbox_series(cDur[0],16,'d');
			cDurS.h = w._durfbox_series(cDur[1],16,'h');
			cDurS.i = w._durfbox_series(cDur[2],20,'i');
			cDurS.s = w._durfbox_series(cDur[3],20,'s');
			
			for ( y = 0; y < w.fldOrder.length; y++ ) {
				stdPos = w.fldOrder[ y ];
				curFld = cDur[ $.inArray( stdPos, sel ) ];

				hRow = w._makeEl( flipBase, { "attr": { 
					"field": stdPos,
					"amount": o.durationSteppers[ stdPos ]
				} });
				hRowIn = hRow.find( "ul" );

				for ( i in cDurS[ stdPos ] ) {
					tmp = (cDurS[ stdPos ][ i ][ 1 ] !== curFld ) ?
						o.themeDate :
						o.themeDatePick;
					$("<li>", { "class" : "ui-body-" + tmp } )
						.html( "<span>" + cDurS[ stdPos ][ i ][ 0 ] + "</span>" )
						.appendTo( hRowIn );
				}
				hRow.appendTo(ctrl);
			}
			
			$("<div>", { "class": uid + "flipcenter ui-overlay-shadow" } )
				.css( "pointerEvents", "none")
				.appendTo( w.d.intHTML );
			
			if ( o.useSetButton || o.useClearButton ) {
				y = $( "<div>", { "class": uid + "controls" } );
				
				if ( o.useSetButton ) {
					$( "<a href='#' role='button'>" )
						.appendTo(y)
						.text( w.__('setDurationButtonLabel') )
						.addClass( "ui-btn ui-btn-" + o.theme + " ui-icon-check ui-btn-icon-left ui-shadow ui-corner-all" )
						.on(o.clickEventAlt, function(e) {
							e.preventDefault();
							w._t( { 
								method: "set", 
								value: w._formatter(w.__fmt(),w.theDate),
								date: w.theDate,
								duration: i
							} );
							w._t( { method: "close" } );
						});
				}
				if ( o.useClearButton ) {
					$( "<a href='#' role='button'>" + w.__( 'clearButton' ) + "</a>" )
						.appendTo(y)
						.addClass( "ui-btn ui-btn-" + o.theme + " ui-icon-delete ui-btn-icon-left ui-shadow ui-corner-all" )
						.on(o.clickEventAlt, function(e) {
							e.preventDefault();
							w.d.input.val('');
							w._t( { method: "clear" } );
							w._t( { method: "close" } );
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
					w._offset($(this).data('field'), ((d<0)?-1:1)*$(this).data('amount'));
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
		'durationflipbox': function() {
			var w = this,
				o = this.options,
				g = this.drag;
			
			$(document).on(g.eMove, function(e) {
				if ( g.move && o.mode === 'durationflipbox' ) {
					g.end = w.touch ? e.originalEvent.changedTouches[0].pageY : e.pageY;
					g.target.css('marginTop', (g.pos + g.end - g.start) + 'px');
					e.preventDefault();
					e.stopPropagation();
					return false;
				}
			});
			
			$(document).on(g.eEnd, function(e) {
				if ( g.move && o.mode === 'durationflipbox' ) {
					g.move = false;
					if ( g.end !== false ) {
						e.preventDefault();
						e.stopPropagation();
						g.tmp = g.target.parent().parent();
						w._offset(g.tmp.data('field'), (parseInt((g.start - g.end) / g.target.innerHeight(),10) * g.tmp.data('amount') *-1 ));
					}
					g.start = false;
					g.end = false;
				}
			});
		}
	});
})( jQuery );
