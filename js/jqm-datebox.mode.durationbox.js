/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * https://github.com/jtsage/jquery-mobile-datebox
 */
 /* DurationBox Mode */

(function($) {
	$.extend( $.mobile.datebox.prototype.options, {
		themeButton: 'a',
		themeInput: 'a',
		useSetButton: true,
		repButton: true,
		durationSteppers: {'d': 1, 'h': 1, 'i': 1, 's': 1}
	});
	$.extend( $.mobile.datebox.prototype, {
		_durbox_run: function() {
			var w = this,
				g = this.drag,
				timer = 150;
				
			if ( g.cnt > 10 ) { timer = 100; }
			if ( g.cnt > 30 ) { timer = 50; }
			if ( g.cnt > 60 ) { timer = 20; }
			if ( g.cnt > 120 ) { timer = 10; }
			if ( g.cnt > 240 ) { timer = 3; }
			
			g.cnt++;
			g.didRun = true;
			w._offset(g.target[0], g.target[1], false);
			w._durbox_run_update();
			w.runButton = setTimeout(function() {w._durbox_run();}, timer);
		},
		_durbox_run_update: function () {
			var w = this, i, cDur = [],
				ival = {'d': 60*60*24, 'h': 60*60, 'i': 60};

			i = w.theDate.getEpoch() - w.initDate.getEpoch();
			if ( i<0 ) { i = 0; w.theDate.setTime(w.initDate.getTime()); }
			w.lastDuration = i; // Let the number of seconds be sort of public.
			
			// DAYS 
			cDur[0] = parseInt( i / ival.d,10); i = i % ival.d;
			// HOURS 
			cDur[1] = parseInt( i / ival.h, 10); i = i % ival.h;
			// MINS AND SECS 
			cDur[2] = parseInt( i / ival.i, 10);
			cDur[3] = i % ival.i;

			w.d.divIn.find('input').each(function () {
				switch ( $(this).data('field') ) {
					case 'd':
						$(this).val(cDur[0]); break;
					case 'h':
						$(this).val(cDur[1]); break;
					case 'i':
						$(this).val(cDur[2]); break;
					case 's':
						$(this).val(cDur[3]); break;
				}
			});
		},
		_durbox_valid: function (num) {
			if ( num.toString().search(/^[0-9]+$/) === 0 ) { return parseInt(num,10); }
			return 0;
		},
		_durbox_enter: function () {
			var w = this,
				t = w.initDate.getEpoch();
				
			w.d.intHTML.find('input').each( function() {
				switch ( $(this).data('field') ) {
					case 'd':
						t += (60*60*24) * w._durbox_valid($(this).val()); break;
					case 'h':
						t += (60*60) * w._durbox_valid($(this).val()); break;
					case 'i':
						t += (60) * w._durbox_valid($(this).val()); break;
					case 's':
						t += w._durbox_valid($(this).val()); break;
				}
			});
			w.theDate.setTime( t * 1000 );
			w.refresh();
		}
	});
	$.extend( $.mobile.datebox.prototype._build, {
		'durationbox': function () {
			var i, y, tmp, offAmount,
				w = this,
				g = this.drag,
				o = this.options,
				uid = 'ui-datebox-',
				divBase = $( "<div>" ),
				divPlus = $( "<fieldset>" ),
				divIn = divBase.clone().addClass('ui-datebox-dboxin'),
				divMinus = divPlus.clone(),
				inBase = $("<input type='text'>")
					.addClass( "ui-input-text ui-corner-all ui-shadow-inset ui-body-" + o.themeInput ),
				butBase = $( "<div></div>" ),
				butClass = "ui-btn-inline ui-link ui-btn ui-btn-" + o.themeButton + " ui-btn-icon-notext ui-shadow ui-corner-all";
			
			if ( typeof w.d.intHTML !== "boolean" ) {
				w.d.intHTML.empty().remove();
			}
			
			w.d.headerText = ((w._grabLabel() !== false)?w._grabLabel():w.__('titleTimeDialogLabel'));
			w.d.intHTML = $( "<span>" );
			
			w.fldOrder = w.__('durationOrder');
			
			for(i = 0; i < w.fldOrder.length; i++) {
				tmp = ['a','b','c','d','e','f'][i];
				y = $.inArray(w.fldOrder[i], ['d','h','i','s']);
				offAmount = o.durationSteppers[w.fldOrder[i]];
				
				$('<div>')
					.append( w._makeEl(inBase, {"attr": {
						"field": w.fldOrder[i],
						"amount": offAmount
					} } ) )
					.addClass('ui-block-'+tmp)
					.appendTo(divIn)
					.prepend( "<label>" + w.__('durationLabel')[y] + "</label>");
				w._makeEl( butBase, {"attr": {
						"field": w.fldOrder[i],
						"amount": 1 * offAmount
					} } )
					.addClass( uid + "cbut ui-block-" + tmp + " ui-icon-plus " + butClass)
					.appendTo( divPlus );
				w._makeEl( butBase, {"attr": {
						"field": w.fldOrder[i],
						"amount": -1 * offAmount
					} } )
					.addClass( uid + "cbut ui-block-" + tmp + " ui-icon-minus " + butClass)
					.appendTo( divMinus );
			}

			w.d.divIn = divIn;
			w._durbox_run_update();
			
			divPlus.addClass('ui-grid-'+['a','b','c'][w.fldOrder.length-2]).appendTo(w.d.intHTML);
			divIn.addClass('ui-grid-'+['a','b','c'][w.fldOrder.length-2]).appendTo(w.d.intHTML);
			divMinus.addClass('ui-grid-'+['a','b','c'][w.fldOrder.length-2]).appendTo(w.d.intHTML);
			
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
								date: w.theDate
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
			
			if ( o.repButton === false ) {
				w.d.intHTML.on(o.clickEvent, "."+ uid + "cbut", function(e) {
					divIn.find(':focus').blur();
					e.preventDefault();
					w._dbox_delta = ($(this).data('amount')>1) ? 1 : -1;
					w._offset($(this).data('field'), $(this).data('amount'));
				});
			}
			
			divIn.on('change', 'input', function() { w._durbox_enter($(this)); });
					
			if ( w.wheelExists ) { // Mousewheel operation, if plugin is loaded
				divIn.on('mousewheel', 'input', function(e,d) {
					e.preventDefault();
					w._offset($(this).data('field'), ((d<0)?-1:1)*$(this).data('amount'));
				});
			}
			
			if ( o.repButton === true ) {
				w.d.intHTML.on(g.eStart, "."+ uid + "cbut", function() {
					divIn.find(':focus').blur();
					tmp = [$(this).data('field'), $(this).data('amount')];
					g.move = true;
					g.cnt = 0;
					w._dbox_delta = ($(this).data('amount')>1) ? 1 : -1;
					w._offset(tmp[0], tmp[1], false);
					w._durbox_run_update();
					if ( !w.runButton ) {
						g.target = tmp;
						w.runButton = setTimeout(function() {w._durbox_run();}, 500);
					}
				});
				w.d.intHTML.on(g.eEndA, "."+ uid + "cbut", function(e) {
					if ( g.move ) {
						e.preventDefault();
						clearTimeout(w.runButton);
						w.runButton = false;
						g.move = false;
					}
				});
			}
		}
	});
})( jQuery );
