/* jQuery-Mobile-DateBox */

/*! SLIDEBOX Mode */

(function($) {
	$.extend( $.mobile.datebox.prototype.options, {
		themeDatePick: "b",
		themeDate: "a",
		useSetButton: true,
		validHours: false,
		slen: {
			"y": 9, 
			"m": 14, 
			"d": 16, 
			"h": 16, 
			"i": 30
		}
	});
	$.extend( $.mobile.datebox.prototype, {
		_sbox_pos: function () {
			var fixer, ech, top, par, tot,
				w = this;
			
			w.d.intHTML.find( "div.ui-datebox-sliderow-int" ).each(function () {
				ech = $(this);
				par = ech.parent().outerWidth();
				fixer = ech.outerWidth();

				if ( w.__( "isRTL" ) ) { 
					top = ech.find("div").last(); 
				} else {
					top = ech.find("div").first();
				}
				
				tot = ech.find( "div" ).size() * top.outerWidth();
				
				if ( fixer > 0 ) { tot = fixer; }
				
				top.css( "marginLeft", ( tot - par ) / 2 * -1 );
			});
		},
		_sbox_mktxt: {
			y: function(i) {
				return ["slideyear", this.theDate.get(0) + i];
			},
			m: function(i) {
				var testDate = (this.theDate.copy([0],[0,0,1])).adj( 1, i );
				return ["slidemonth", this.__( "monthsOfYearShort" )[testDate.get(1)] ];
			},
			d: function(i) {
				var testDate = this.theDate.copy( [0,0,i] );
				return ["slideday", 
					testDate.get(2) + "<br /><span class='ui-datebox-slidewday'>" +
					this.__( "daysOfWeekShort" )[testDate.getDay()] + "</span>"
				];
			},
			h: function(i) {
				var testDate = this.theDate.copy( [0,0,0,i] );
				return ["slidehour", 
					this.__( "timeFormat" ) === 12 ?
						this._formatter( 
							"%-I<span class='ui-datebox-slidewday'>%p</span>",
							testDate
						) :
						testDate.get(3)
				];
			},
			i: function(i) {
				return [ "slidemins", this._zPad( ( this.theDate.copy( [0,0,0,0,i] )).get(4) ) ];
			}
		}
	});
	$.extend( $.mobile.datebox.prototype._build, {
		"slidebox": function () {
			var i, y, hRow, phRow, currentTerm, currentText,
				w = this,
				o = this.options,
				g = this.drag,
				uid = "ui-datebox-",
				slideBase = $( "<div class='" + uid + "sliderow-int'></div>" ),
				phBase = $( "<div>" ),
				ctrl = $( "<div>", { "class": uid + "slide" } );
			
			if ( typeof w.d.intHTML !== "boolean" ) {
				w.d.intHTML.remove().empty();
			} else {
				w.d.input.on( "datebox", function (e,p) {
					if ( p.method === "postrefresh" ) { w._sbox_pos(); }
				});
			}
			
			w.d.headerText = ( (w._grabLabel() !== false ) ?
				w._grabLabel() : 
				w.__( "titleDateDialogLabel")
			);
			w.d.intHTML = $( "<span class='" + uid + "nopad'>" );
			
			w.fldOrder = w.__( "slideFieldOrder" );
			w._check();
			w._minStepFix();
			
			$("<div class='" + uid + "header'><h4>" +
					w._formatter(w.__( "headerFormat" ), w.theDate) + "</h4></div>")
				.appendTo(w.d.intHTML);
			
			w.d.intHTML.append(ctrl);
			
			for ( y=0; y<w.fldOrder.length; y++ ) {
				currentTerm = w.fldOrder[y];
				
				phRow = phBase
					.clone()
					.addClass( uid + "sliderow" )
					.data( "rowtype", currentTerm);
				
				hRow = slideBase
					.clone()
					.data( "rowtype", currentTerm)
					.appendTo(phRow);
					
				if ( w.__( "isRTL" ) === true ) { hRow.css( "direction", "rtl" ); }
				
				if ( typeof w._sbox_mktxt[currentTerm] === "function" ) {
					for ( i = o.slen[currentTerm] * -1; i < ( o.slen[currentTerm] + 1 ); i++ ) {
						currentText = w._sbox_mktxt[currentTerm].apply(w, [i]);
						
						$( "<div>", { 
							"class": uid + "slidebox " + uid + currentText[0] +
								" ui-btn ui-btn-" + ( ( i === 0 ) ? o.themeDatePick : o.themeDate )
						} )
							.html( currentText[1] )
							.data( "offset", i )
							.appendTo( hRow );
					}
					phRow.appendTo(ctrl);
				}
			}
			
			if ( o.useSetButton || o.useClearButton ) {
				y = $( "<div>", { "class": uid + "controls " + uid + "repad" } );
				
				if ( o.useSetButton ) {
					y.append( w._stdBtn.close.apply( w, [w.__( "setDateButtonLabel" ) ] ) );
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
				w.d.intHTML.on( "mousewheel", ".ui-datebox-sliderow-int", function(e,d) {
					e.preventDefault();
					w._offset(
						$( this ).data( "rowtype" ),
						(( d<0 ) ? -1 : 1 ) * ( $(this).data( "rowtype" )==="i" ? o.minuteStep : 1 )
					);
				});
			}
			
			w.d.intHTML.on( o.clickEvent, ".ui-datebox-sliderow-int>div", function(e) {
				e.preventDefault();
				w._offset(
					$(this).parent().data( "rowtype" ),
					parseInt( $(this).data( "offset" ),10 )
				);
			});
			
			w.d.intHTML.on( g.eStart, ".ui-datebox-sliderow-int", function(e) {
				if ( !g.move ) {
					g.move = true;
					g.target = $(this);
					g.pos = parseInt(g.target.css( "marginLeft" ).replace(/px/i, ""),10);
					g.start = w.touch ? e.originalEvent.changedTouches[0].pageX : e.pageX;
					g.end = false;
					e.stopPropagation();
					e.preventDefault();
				}
			});
		}
	});
	$.extend( $.mobile.datebox.prototype._drag, {
		"slidebox": function() {
			var w = this,
				o = this.options,
				g = this.drag;
			
			$(document).on(g.eMove, function(e) {
				if ( g.move && o.mode === "slidebox") {
					g.end = w.touch ? e.originalEvent.changedTouches[0].pageX : e.pageX;
					g.target.css( "marginLeft", (g.pos + g.end - g.start) + "px" );
					e.preventDefault();
					e.stopPropagation();
					return false;
				}
			});
			
			$(document).on(g.eEnd, function(e) {
				if ( g.move && o.mode === "slidebox" ) {
					g.move = false;
					if ( g.end !== false ) {
						e.preventDefault();
						e.stopPropagation();
						g.tmp = g.target.find( "div" ).first();
						w._offset(
							g.target.data("rowtype"),
							( w.__("isRTL") ? -1 : 1 ) * 
								(parseInt((g.start - g.end) / g.tmp.innerWidth(),10)) *
								(g.target.data( "rowtype") === "i" ? o.minuteStep : 1)
						);
					}
					g.start = false;
					g.end = false;
				}
			});
		}
	});
})( jQuery );
