/* jQuery-Mobile-DateBox */

/*! FLIPBOX/TIMEFLIPBOX/DURATIONFLIPBOX Mode */

(function($) {
	$.extend( $.mobile.datebox.prototype.options, {
		themeDatePick: "b",
		themeDate: "a",
		useSetButton: true,
		validHours: false,
		flen: { 
			"y": 15,
			"m": 12,
			"d": 20,
			"h": 12,
			"i": 15,
		},
		durationStep: 1,
		durationSteppers: {
			"d": 1,
			"h": 1,
			"i": 1,
			"s": 1
		}
	});
	$.extend( $.mobile.datebox.prototype, {
		_fbox_pos: function () {
			var pos1, ech, top, fixer,
				w = this,
				par = this.d.intHTML.find( ".ui-datebox-flipcontent" ).innerHeight();
				
			w.d.intHTML.find( ".ui-datebox-flipcenter" ).each(function() {
				ech = $( this );
				top = ech.innerHeight();
				ech.css( "top", ( ( par / 2 ) - ( top / 2 ) - 3 ) * -1 );
			});
			w.d.intHTML.find( "ul" ).each(function () {
				ech = $( this );
				par = ech.parent().innerHeight();
				top = ech.find( "li" ).first();
				fixer = ech.find( "li" ).last().offset().top - ech.find("li").first().offset().top;
				pos1 = ( ( ( fixer-par ) / 2 ) + top.outerHeight() ) * -1;
				top.css( "marginTop", pos1 );
			});
			
		},
		_fbox_fixstep: function( order ) {
			// Turn back off steppers when displaying a less precise 
			// unit in the same control.
			var step = this.options.durationSteppers,
				actual = this.options.durationStep;
			
			if ( $.inArray( "h", order ) > -1 ) {
				step.d = 1;
				step.h = actual;
			}
			if ( $.inArray( "i", order ) > -1 ) {
				step.h = 1;
				step.i = actual;
			}
			if ( $.inArray( "s", order ) > -1 ) {
				step.i = 1;
				step.s = actual;
			}
		},
		_fbox_series: function (middle, side, type, neg) {
			// This builds the series that duration uses.
			var nxt, prv,
				o = this.options,
				maxval = ( type === "h" ) ? 24 : 60,
				ret = [ [ middle.toString(), middle ] ];
			 
			for ( var i = 1; i <= side; i++ ) {
				nxt = middle + ( i * o.durationSteppers[type] );
				prv = middle - ( i * o.durationSteppers[type] );
				ret.unshift([nxt.toString(), nxt]);
				if ( prv > -1 ) {
					ret.push([prv.toString(), prv]);
				} else {
					if ( neg ) {
						ret.push([(maxval+prv).toString(),prv]);
					} else {
						ret.push(["",-1]);
					}
				}
			}
			return ret;
		},
		_fbox_mktxt: {
			y: function(i) {
				return this.theDate.get(0) + i;
			},
			m: function(i) {
				var testDate = ( this.theDate.copy( [0], [0,0,1] ) ).adj( 1, i );
				return this.__("monthsOfYearShort")[ testDate.get(1) ];
			},
			d: function(i) {
				return ( this.theDate.copy([0,0,i]) ).get(2);
			},
			h: function(i) {
				var testDate = this.theDate.copy( [0,0,0,i] );
				return ( ( this.__("timeFormat") === 12 ) ?
					testDate.get12hr() :
					testDate.get(3) );
			},
			i: function(i) {
				return this._zPad( ( this.theDate.copy( [0,0,0,0,i] )).get(4) );
			}
		}
	});
	$.extend( $.mobile.datebox.prototype._build, {
		"timeflipbox": function() {
			this._build.flipbox.apply(this);
		},
		"durationflipbox": function() {
			this._build.flipbox.apply(this);
		},
		"flipbox": function () {
			var i, y, hRow, tmp, hRowIn, stdPos,
				w = this,
				o = this.options,
				g = this.drag,
				cDurS = {},
				normDurPositions = ["d", "h", "i", "s"],
				dur = ( o.mode === "durationflipbox" ? true : false ),
				uid = "ui-datebox-",
				flipBase = $( "<div class='ui-overlay-shadow'><ul></ul></div>" ),
				ctrl = $( "<div>", { "class": uid+"flipcontent" } ),
				ti = w.theDate.getTime() - w.initDate.getTime(),
				cDur = w._dur( ti<0 ? 0 : ti ),
				currentTerm, currentText;

			if ( ti < 0 ) {
				w.lastDuration = 0;
				if ( dur ) { w.theDate.setTime( w.initDate.getTime() ); }
			}

			if ( typeof w.d.intHTML !== "boolean" ) {
				w.d.intHTML.empty().remove();
			} else {
				w.d.input.on( "datebox", function (e,p) {
					if ( p.method === "postrefresh" ) {
						w._fbox_pos();
					}
				});
			}

			w.d.headerText = ( ( w._grabLabel() !== false) ? 
				w._grabLabel() : 
				( (o.mode === "flipbox") ?
					w.__( "titleDateDialogLabel" ) :
					w.__( "titleTimeDialogLabel" ) 
				)
			);
			w.d.intHTML = $( "<span>" );

			$(document).one( "popupafteropen", function() { 
				// This fixes bad positioning on initial open - not found a way around this yet.
				w._fbox_pos(); 
			});

			w.fldOrder = ( o.mode === "flipbox" ) ?
				w.__( "dateFieldOrder" ) :
				( dur ) ? 
					w.__("durationOrder") :
					w.__( "timeFieldOrder" );
					
			if ( !dur ) {
				w._check();
				w._minStepFix();
			} else {
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

			if ( o.mode === "flipbox" ) { 
				$("<div class='" + uid + "header'><h4>" +
						w._formatter(w.__( "headerFormat"), w.theDate) + "</h4></div>")
					.appendTo(w.d.intHTML); 
			}
			
			if ( dur ) {
				w._fbox_fixstep(w.fldOrder);
				
				tmp = $( "<div class='" + uid + "header ui-grid-" +
					w._gridblk.g[w.fldOrder.length] + "'></div>");
				
				for ( y = 0; y < w.fldOrder.length; y++ ) {
					$("<div class='" + uid + "fliplab ui-block-" + w._gridblk.b[ y ] + "'>" + 
							w.__( "durationLabel" )[$.inArray( w.fldOrder[y], normDurPositions )] + 
							"</div>"
						)
						.appendTo(tmp);
				}
				tmp.appendTo(w.d.intHTML);
				
				w.dateOK = true;
				cDurS.d = w._fbox_series(cDur[0],16,"d",false);
				cDurS.h = w._fbox_series(cDur[1],16,"h",(cDur[0]>0));
				cDurS.i = w._fbox_series(cDur[2],20,"i",(cDur[0]>0 || cDur[1]>0));
				cDurS.s = w._fbox_series(cDur[3],20,"s",(cDur[0]>0 || cDur[1]>0 || cDur[2]>0));
				
				ctrl.addClass( uid + "flipcontentd" );
				
				for ( y = 0; y < w.fldOrder.length; y++ ) {
					stdPos = w.fldOrder[ y ];
					currentTerm = cDur[ $.inArray( stdPos, normDurPositions ) ];
	
					hRow = w._makeEl( flipBase, { "attr": { 
						"field": stdPos,
						"amount": o.durationSteppers[ stdPos ]
					} });
					hRowIn = hRow.find( "ul" );
	
					for ( i in cDurS[ stdPos ] ) {
						$("<li><span>" + cDurS[ stdPos ][ i ][ 0 ] + "</span></li>" )
							.addClass("ui-body-" + ((cDurS[ stdPos ][ i ][ 1 ] !== currentTerm ) ?
								o.themeDate :
								o.themeDatePick)
							)
							.appendTo( hRowIn );
					}
					hRow.appendTo(ctrl);
				}
			}

			for ( y=0; ( y < w.fldOrder.length && !dur ); y++ ) {
				currentTerm = w.fldOrder[y];
				
				hRow = w._makeEl( flipBase, { "attr": { 
					"field": currentTerm,
					"amount": (currentTerm === "i") ? o.minuteStep : 1
				} } );
				hRowIn = hRow.find( "ul" );
						
				
				if ( typeof w._fbox_mktxt[currentTerm] === "function" ) {
					for ( i = -1 * o.flen[currentTerm]; i < ( o.flen[currentTerm] + 1 ); i++ ) {
						$("<li class='ui-body-" + 
								(( i !== 0 ) ? o.themeDate : o.themeDatePick) + "'><span>" + 
								w._fbox_mktxt[currentTerm].apply(
									w,
									[(currentTerm === "i") ? i * o.minuteStep : i]
								) + "</span></li>")
							.appendTo( hRowIn );
					}
					hRow.appendTo( ctrl );
				}
				if ( currentTerm === "a" && w.__("timeFormat") === 12 ) {
					currentText = $( "<li class='ui-body-" + o.themeDate + "'><span></span></li>");
					
					tmp = (w.theDate.get(3) > 11) ?
						[o.themeDate,o.themeDatePick,2,5] :
						[o.themeDatePick,o.themeDate,2,3];
						
					for ( i = -1 * tmp[2]; i < tmp[3]; i++ ) { 
						if ( i < 0 || i > 1 ) {
							currentText.clone().appendTo( hRowIn );
						} else {
							$("<li>", { "class" : "ui-body-" + tmp[i] } )
								.html( "<span>" + w.__( "meridiem" )[i] + "</span>" )
								.appendTo( hRowIn );
						}
					}
					hRow.appendTo( ctrl );
				}
			}
			
			w.d.intHTML.append( ctrl );
			
			$("<div>", { "class": uid + "flipcenter ui-overlay-shadow" } )
				.css( "pointerEvents", "none")
				.appendTo( w.d.intHTML );
			
			if ( o.useSetButton || o.useClearButton ) {
				y = $( "<div>", { "class": uid + "controls" } );
				
				if ( o.useSetButton ) {
					y.append( w._stdBtn.close.apply(
						w, [ ( o.mode === "flipbox" ) ? 
							w.__("setDateButtonLabel") :
							( dur ) ?
								w.__("setDurationButtonLabel") :
								w.__("setTimeButtonLabel")]
					));
				}
					
				if ( o.useClearButton ) {
					y.append(w._stdBtn.clear.apply(w));
				}
				if ( o.useCollapsedBut ) {
					y.controlgroup({ type: "horizontal" });
					y.addClass( "ui-datebox-collapse" );
				} else {
					y.controlgroup();
				}
				y.appendTo(w.d.intHTML);
			}
			
			if ( w.wheelExists ) { // Mousewheel operation, if plugin is loaded
				w.d.intHTML.on( "mousewheel", ".ui-overlay-shadow", function(e,d) {
					e.preventDefault();
					w._offset($(this).data("field"), ((d<0)?-1:1)*$(this).data("amount"));
				});
			}
			
			w.d.intHTML.on(g.eStart, "ul", function(e,f) {
				if ( !g.move ) {
					if ( typeof f !== "undefined" ) { e = f; }
					g.move = true;
					g.target = $(this).find( "li" ).first();
					g.pos = parseInt(g.target.css("marginTop").replace(/px/i, ""),10);
					g.start = w.touch ? e.originalEvent.changedTouches[0].pageY : e.pageY;
					g.end = false;
					g.direc = ( dur ) ? -1 : 1;
					e.stopPropagation();
					e.preventDefault();
				}
			});
		}
	});
	$.extend( $.mobile.datebox.prototype._drag, {
		"timeflipbox": function() {
			this._drag.flipbox.apply(this);
		},
		"durationflipbox": function() {
			this._drag.flipbox.apply(this);
		},
		"flipbox": function() {
			var w = this,
				o = this.options,
				g = this.drag;
			
			$(document).on(g.eMove, function(e) {
				if ( g.move && o.mode.slice(-7) === "flipbox" ) {
					g.end = w.touch ? e.originalEvent.changedTouches[0].pageY : e.pageY;
					g.target.css("marginTop", (g.pos + g.end - g.start) + "px");
					e.preventDefault();
					e.stopPropagation();
					return false;
				}
			});
			
			$(document).on(g.eEnd, function(e) {
				if ( g.move && o.mode.slice(-7) === "flipbox" ) {
					g.move = false;
					if ( g.end !== false ) {
						e.preventDefault();
						e.stopPropagation();
						g.tmp = g.target.parent().parent();
						w._offset(
							g.tmp.data("field"),
							(parseInt((g.start - g.end) / ( g.target.outerHeight() - 2 ),10)*
								g.tmp.data( "amount" ) * g.direc));
					}
					g.start = false;
					g.end = false;
				}
			});
		}
	});
})( jQuery );
