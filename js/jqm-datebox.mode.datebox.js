/* jQuery-Mobile-DateBox */

/*! DATEBOX/TIMEBOX/DURATIONBOX modes */

(function($) {
	$.extend( $.mobile.datebox.prototype.options, {
		themeButton: "a",
		themeInput: "a",
		useSetButton: true,
		validHours: false,
		repButton: true,
		durationStep: 1,
		durationSteppers: {"d": 1, "h": 1, "i": 1, "s": 1}
		
	});
	$.extend( $.mobile.datebox.prototype, {
		_dbox_run: function() {
			var w = this,
				g = this.drag,
				timer = 150;
				
			if ( g.cnt > 10 ) { timer = 100; }
			if ( g.cnt > 30 ) { timer = 50; }
			if ( g.cnt > 60 ) { timer = 20; }
			if ( g.cnt > 120 ) { timer = 10; }
			if ( g.cnt > 240 ) { timer = 3; }
			
			g.didRun = true;
			g.cnt++;
			
			w._offset( g.target[0], g.target[1], false );
			w._dbox_run_update();
			w.runButton = setTimeout(function() {w._dbox_run();}, timer);
		},
		_dbox_fixstep: function( order ) {
			// Turn back off steppers when displaying a less precise 
			// unit in the same control.
			var step = this.options.durationSteppers,
				actual = this.options.durationStep;
			
			if ( $.inArray( "s", order ) > -1 ) {
				step.i = 1;
				step.s = actual;
			}
			if ( $.inArray( "i", order ) > -1 ) {
				step.h = 1;
				step.s = actual;
			}
			if ( $.inArray( "h", order ) > -1 ) {
				step.d = 1;
				step.s = actual;
			}
		},
		_dbox_run_update: function(shortRun) {
			var w = this,
				o = this.options,
				i = w.theDate.getTime() - w.initDate.getTime(),
				dur = ( o.mode === "durationbox" ? true : false ),
				cDur = w._dur( i<0 ? 0 : i );

			if ( i < 0 ) {
				w.lastDuration = 0;
				if ( dur ) { w.theDate.setTime( w.initDate.getTime() ); }
			}
			
			if ( dur ) {
				if ( o.minDur !== false &&
						( w.theDate.getEpoch() - w.initDate.getEpoch() ) < o.minDur ) {
					w.theDate = new Date( w.initDate.getTime() + ( o.minDur * 1000 ) );
					w.lastDuration = o.minDur;
					cDur = w._dur( o.minDur * 1000 );
				}
				if ( o.maxDur !== false &&
						( w.theDate.getEpoch() - w.initDate.getEpoch() ) > o.maxDur ) {
					w.theDate = new Date( w.initDate.getTime() + ( o.maxDur * 1000 ) );
					w.lastDuration = o.maxDur;
					cDur = w._dur( o.maxDur * 1000 );
				}
			}
				
			if ( shortRun !== true && dur !== true ) {
				w._check();
			
				if ( o.mode === "datebox" ) {
					w.d.intHTML
						.find( ".ui-datebox-header" )
							.find( "h4" )
								.text( w._formatter( w.__( "headerFormat" ), w.theDate ) );
				}
				
				if ( o.useSetButton ) {
					if ( w.dateOK === false ) { 
						w.setBut.addClass( "ui-state-disabled" );
					} else {
						w.setBut.removeClass( "ui-state-disabled" );
					}
				}
			}
			
			w.d.divIn.find( "input" ).each(function () {
				switch ( $(this).data( "field" ) ) {
					case "y":
						$(this).val(w.theDate.get(0)); break;
					case "m":
						$(this).val(w.theDate.get(1) + 1); break;
					case "d":
						$(this).val( ( dur ? cDur[0] : w.theDate.get(2) ) );
						break;
					case "h":
						if ( dur ) {
							$(this).val(cDur[1]);
						} else {
							if ( w.__("timeFormat") === 12 ) {
								$(this).val(w.theDate.get12hr());
							} else {
								$(this).val(w.theDate.get(3)); 
							}
						}
						break;
					case "i":
						if ( dur ) {
							$(this).val(cDur[2]);
						} else {
							$(this).val(w._zPad(w.theDate.get(4)));
						} 
						break;
					case "M":
						$(this).val(w.__("monthsOfYearShort")[w.theDate.get(1)]); break;
					case "a":
						$(this).val(w.__( "meridiem" )[ (w.theDate.get(3) > 11) ? 1 : 0 ] );
						break;
					case "s":
						$(this).val(cDur[3]); break;
				}
			});
			if ( w.__( "useArabicIndic" ) === true ) { w._doIndic(); }
		},
		_dbox_vhour: function (delta) {
			var w = this,
				o = this.options, tmp, 
				closeya = [25,0],
				closenay = [25,0];
				
			if ( o.validHours === false ) { return true; }
			if ( $.inArray(w.theDate.getHours(), o.validHours) > -1 ) { return true; }
			
			tmp = w.theDate.getHours();
			$.each(o.validHours, function(){
				if ( ((tmp < this)?1:-1) === delta ) {
					if ( closeya[0] > Math.abs(this-tmp) ) {
						closeya = [Math.abs(this-tmp),parseInt(this,10)];
					}
				} else {
					if ( closenay[0] > Math.abs(this-tmp) ) {
						closenay = [Math.abs(this-tmp),parseInt(this,10)];
					}
				}
			});
			if ( closeya[1] !== 0 ) { w.theDate.setHours(closeya[1]); }
			else { w.theDate.setHours(closenay[1]); }
		},
		_dbox_enter: function (item) {
			var tmp,
				w = this, 
				t = 0;
			
			if ( item.data( "field" ) === "M" ) {
				tmp = $.inArray( item.val(), w.__("monthsOfYearShort") );
				if ( tmp > -1 ) { w.theDate.setMonth( tmp ); }
			}
			
			if ( item.val() !== "" && item.val().toString().search(/^[0-9]+$/) === 0 ) {
				switch ( item.data( "field" ) ) {
					case "y":
						w.theDate.setD( 0, parseInt(item.val(),10)); break;
					case "m":
						w.theDate.setD( 1, parseInt(item.val(),10)-1); break;
					case "d":
						w.theDate.setD( 2, parseInt(item.val(),10));
						t += (60*60*24) * parseInt(item.val(),10);
						break;
					case "h":
						w.theDate.setD( 3, parseInt(item.val(),10));
						t += (60*60) * parseInt(item.val(),10);
						break;
					case "i":
						w.theDate.setD( 4, parseInt(item.val(),10));
						t += (60) * parseInt(item.val(),10);
						break;
					case "s":
						t += parseInt(item.val(),10); break;
				}
			}
			if ( this.options.mode === "durationbox" ) { 
				w.theDate.setTime( w.initDate.getTime() + ( t * 1000 ) );
			}
			w.refresh();
		}
	});
	$.extend( $.mobile.datebox.prototype._build, {
		"timebox": function () {
			this._build.datebox.apply(this,[]);
		},
		"durationbox": function () {
			this._build.datebox.apply(this,[]);
		},
		"datebox": function () {
			var offAmount, i, y, tmp, 
				w = this,
				g = this.drag,
				o = this.options, 
				dur = ( o.mode === "durationbox" ? true : false ),
				cnt = -2,
				defDurOrder = ["d","h","i","s"],
				uid = "ui-datebox-",
				divBase = $( "<div>" ),
				divPlus = $( "<fieldset>" ),
				divIn = divBase.clone(),
				divMinus = divPlus.clone(),
				divLab = divBase.clone(),
				inBase = $("<div><input type='text'></div>")
					.addClass( "ui-input-text ui-body-" + o.themeInput+ 
						" ui-corner-all ui-mini ui-shadow-inset"),
				butBase = $( "<div></div>" ),
				butClass = "ui-btn-inline ui-link ui-btn ui-btn-" + o.themeButton +
					" ui-btn-icon-notext ui-shadow ui-corner-all";
			
			if ( typeof w.d.intHTML !== "boolean" ) {
				w.d.intHTML.empty().remove();
			}
			
			w.d.headerText = ( ( w._grabLabel() !== false ) ?
				w._grabLabel() : 
				( ( o.mode === "datebox" ) ? 
					w.__("titleDateDialogLabel") :
					w.__("titleTimeDialogLabel")
				)
			);
			w.d.intHTML = $( "<span>" );
			
			w.fldOrder = ( ( o.mode === "datebox" ) ?
				w.__("dateFieldOrder") :
				( ( dur ) ? w.__("durationOrder") : w.__("timeFieldOrder") )
			);

			if ( !dur ) {
				w._check();
				w._minStepFix();
				w._dbox_vhour(typeof w._dbox_delta !== "undefined" ? w._dbox_delta : 1 );
			} else {
				w.dateOK = true;
				w._dbox_fixstep(w.fldOrder);
			}
			
			if ( o.mode === "datebox" ) { 
				$( "<div class='" + uid + "header'><h4>" +
						w._formatter( w.__("headerFormat"), w.theDate ) + "</h4></div>")
					.appendTo(w.d.intHTML); 
			}
			
			for(i = 0; i < w.fldOrder.length; i++) {
				tmp = w._gridblk.b[i];
				if ( dur ) {
					offAmount = o.durationSteppers[w.fldOrder[i]];
				} else {
					if ( w.fldOrder[i] === "i" ) { 
						offAmount = o.minuteStep; 
					} else { 
						offAmount = 1;
					}
				}
				if ( w.fldOrder[i] !== "a" || w.__("timeFormat") === 12 ) {					
					$("<div>")
						.append( (dur) ?
							"<label>" + 
							w.__( "durationLabel" )[ $.inArray( w.fldOrder[i], defDurOrder ) ] +
							"</label>" : 
							"" )
						.addClass("ui-block-"+tmp)
						.appendTo(divLab);
					$("<div>")
						.append( w._makeEl(inBase, {"attr": {
							"field": w.fldOrder[i],
							"amount": offAmount
						} } ) )
						.addClass("ui-block-"+tmp)
						.appendTo(divIn)
						.find( "input" ).data({
							"field": w.fldOrder[i],
							"amount": offAmount
						});
					w._makeEl( butBase, {"attr": {
							"field": w.fldOrder[i],
							"amount": offAmount 
						} } )
						.addClass( uid + "cbut ui-block-" + tmp + " ui-icon-plus " + butClass)
						.appendTo( divPlus )
						.prepend( (dur) ? "<label>" + w.__("durationLabel")[i] + "</label>" : "" );
					w._makeEl( butBase, {"attr": {
							"field": w.fldOrder[i],
							"amount": offAmount  * -1
						} } )
						.addClass( uid + "cbut ui-block-" + tmp + " ui-icon-minus " + butClass)
						.appendTo( divMinus );
					cnt++;
				}
			}
			
			if ( dur ) {
				divLab
					.addClass("ui-datebox-dboxlab ui-grid-"+w._gridblk.b[cnt])
					.appendTo(w.d.intHTML);
			}
			
			divPlus
				.addClass("ui-grid-"+w._gridblk.b[cnt])
				.appendTo(w.d.intHTML);
				
			divIn
				.addClass("ui-datebox-dboxin ui-grid-"+w._gridblk.b[cnt])
				.appendTo(w.d.intHTML);
				
			divMinus
				.addClass("ui-grid-"+w._gridblk.b[cnt])
				.appendTo(w.d.intHTML);
			
			w.d.divIn = divIn;
			w._dbox_run_update(true);
			
			if ( w.dateOK !== true ) {
				divIn.find( "input" ).addClass( "ui-state-disable" );
			} else {
				divIn.find( ".ui-state-disable" ).removeClass( "ui-state-disable" );
			}
			
			if ( o.useSetButton || o.useClearButton ) {
				y = $( "<div>", { "class": uid + "controls" } );
				
				if ( o.useSetButton ) {
					w.setBut = w._stdBtn.close.apply(
						w, [(o.mode==="datebox") ? 
							w.__("setDateButtonLabel") :
							( dur ) ?
								w.__("setDurationButtonLabel") :
								w.__("setTimeButtonLabel")]
					);
					w.setBut.appendTo(y);
				}
				if ( o.useClearButton ) {
					y.append(w._stdBtn.clear.apply(w));
				}
				if ( o.useCollapsedBut ) {
					y.controlgroup({ type: "horizontal" });
					y.addClass("ui-datebox-collapse");
				} else {
					y.controlgroup();
				}
				y.appendTo(w.d.intHTML);
			}
			
			if ( ! o.repButton ) {
				w.d.intHTML.on(o.clickEvent, "."+ uid + "cbut", function(e) {
					divIn.find(":focus").blur();
					e.preventDefault();
					w._dbox_delta = ($(this).data("amount")>1) ? 1 : -1;
					w._offset($(this).data("field"), $(this).data("amount"));
				});
			}
			
			divIn.on("change", "input", function() { w._dbox_enter($(this)); });
					
			if ( w.wheelExists ) { // Mousewheel operation, if plugin is loaded
				divIn.on("mousewheel", "input", function(e,d) {
					e.preventDefault();
					w._dbox_delta = d<0?-1:1;
					w._offset($(this).data("field"), ((d<0)?-1:1)*$(this).data("amount"));
				});
			}
			
			if ( o.repButton ) {
				w.d.intHTML.on(g.eStart, "."+ uid + "cbut", function() {
					divIn.find(":focus").blur();
					tmp = [$(this).data("field"), $(this).data("amount")];
					g.move = true;
					g.cnt = 0;
					w._dbox_delta = ($(this).data("amount")>1) ? 1 : -1;
					w._offset(tmp[0], tmp[1], false);
					w._dbox_run_update();
					if ( !w.runButton ) {
						g.target = tmp;
						w.runButton = setTimeout(function() {w._dbox_run();}, 500);
					}
				});
				w.d.intHTML.on(g.eEndA, "." + uid + "cbut", function(e) {
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
