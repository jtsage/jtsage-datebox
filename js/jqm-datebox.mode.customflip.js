/* jQuery-Mobile-DateBox */

/*! CUSTOMFLIP Mode */

(function($) {
	$.extend( $.mobile.datebox.prototype.options, {
		themeOptPick: "b",
		themeOpt: "a",
		useSetButton: true,
		customData: [ ],
		customDefault: [0,0,0],
		customDataLen: 25,
		customFormat: false,
		customHead: false,
		customfliplang: {
			// This structure interfaces with __() -> if it exists, strings are 
			// looked up here after i8n fails, and before going to 'default' - 
			// the name syntax is <mode>lang
			"customSet": "Looks Good"
		}
	});
	$.extend( $.mobile.datebox.prototype, {
		"_customflipDoSet": function () {
			// If this function exists, it overrides the "doset" method of the "datebox" event.
			// The name syntax is _<mode>DoSet
			var w = this, o = this.options;
			if ( typeof w.customCurrent === "undefined" ) {
				w.customCurrent = this._makeDate(this.d.input.val());
			}
			w._t( { 
				method: "set",
				value: w._formatter( o.customFormat, w.customCurrent ),
				custom: w.customCurrent
			});
		},
		"_cubox_offset": function (fld, amount) {
			// This is *not* an automatic override, used below specificly.
			var w = this, tmp,
				o = this.options;
				
			tmp = (w.customCurrent[fld] + amount) % o.customData[fld].data.length;
			if ( tmp < 0 ) { tmp = o.customData[fld].data.length + tmp; }
			
			w.customCurrent[fld] = tmp;
			
			if ( o.useImmediate ) { 
				w._t( { 
					method: "set",
					value: w._formatter( o.customFormat, w.customCurrent ),
					custom: w.customCurrent
				});
			}
			w.refresh();
		},
		"_cubox_arr": function (data, choice) {
			var base = data, x,
				len = this.options.customDataLen,
				before = data.slice(0,choice),
				after = data.slice(choice+1);
			
			while ( before.length < len ) {
				for ( x = base.length; x > 0; x-- ) {
					before.unshift(base[x-1]);
				}
			}
			while ( before.length > len ) {
				before.shift();
			}
			
			while ( after.length < len ) {
				for ( x = 0; x < base.length; x++ ) {
					after.push(base[x]);
				}
			}
			after.length = len;
			
			before.push(data[choice]);
			
			return $.merge($.merge([], before), after);
		},
		"_cubox_range": function(i) {
				return i?this._cubox_range(i-1).concat(i):[];
		},
		"_cubox_pos": function () {
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
		}
	});
	$.extend( $.mobile.datebox.prototype._parser, {
		// If this stucture exists, it is called instead of the usual date input parser.
		// The name of the structure is the same as the mode name - it recieves a string
		// as the input, which is the current value of the input element, pre-sanitized
		"customflip" : function ( str ) { 
			var o = this.options,
				adv = o.customFormat,
				exp_input, exp_format, tmp, tmp2, retty_val=[0,0,0,0,0,0];

			if ( typeof(adv) !== "string" ) { adv = ""; }

			adv = adv.replace(/%X([0-5a-f])/gi, function(match, oper) {
				switch (oper) {
					case "a":
					case "b":
					case "c":
					case "d":
					case "e":
					case "f":
						return "(" + match + "|" + ".+?" + ")";
					case "0":
					case "1":
					case "2":
					case "3":
					case "4":
					case "5":
						return "(" + match + "|" + "[0-9]+" + ")";
					default:
						return ".+?";
				}
			});

			adv = new RegExp("^" + adv + "$");
			exp_input = adv.exec(str);
			exp_format = adv.exec(o.customFormat);

			if ( exp_input !== null ) {
				for ( var x = 1; x<exp_input.length; x++ ) {
					tmp = exp_format[x].charAt(2);
					if ( isNaN(parseInt(tmp)) ) {
						tmp2 = $.inArray(tmp, ["a","b","c","d","e","f"]);
						retty_val[tmp2] = $.inArray(exp_input[x], o.customData[tmp2].data);
					} else {
						retty_val[parseInt(tmp)-1] = parseInt(exp_input[x]);
					}
				}
			}

			return ( str.length < 1 || retty_val.length < 1 ) ? o.customDefault : retty_val;

		}
	});
	$.extend( $.mobile.datebox.prototype._customformat, {
		// If this stucture exists, the formatter will call it when it encounters a special string
		// %X<whatever> - it recieves the single letter operater, and the current "date" value
		"customflip" : function ( oper, val, o ) {
			var per = parseInt(oper), tmp;

			if ( typeof(per) === "number" && !isNaN(per) ) {
				return val[oper-1];
			} else {
				tmp = $.inArray(oper, ["a","b","c","d","e","f"]);
				return o.customData[tmp].data[val[tmp]];
			}
		}
	});
	$.extend( $.mobile.datebox.prototype._build, {
		// This builds the actual interface, and is called on *every* refresh. (flip triggers)
		"customflip": function () {
			var i, y, hRow, hRowIn, tmp, lineArr,
				w = this,
				o = this.options,
				uid = "ui-datebox-",
				customCurrent = this._makeDate(this.d.input.val()),
				flipBase = $("<div class='ui-overlay-shadow'><ul></ul></div>"),
				ctrl = $("<div>", {"class": uid + "flipcontent" });
			
			if ( typeof w.customCurrent === "undefined" ) { w.customCurrent = customCurrent; }
			
			if ( typeof o.customData === "string" && typeof window[o.customData] !== "undefined" ) {
				// Allow the passing of a global variable name from data-options or 
				// data-datebox-custom-data. The other option was to eval() the data, but that
				// is an ugly, ugly road to walk down.
				o.customData = window[o.customData];
			}

			if ( o.customFormat === false ) {
				tmp = [];
				for ( i = 0; i<o.customData.length; i++ ) {
					tmp.push("%X"+(i+1));
				} 
				o.customFormat = tmp.join(",");
			}
				
			if ( typeof w.d.intHTML !== "boolean" ) {
				w.d.intHTML.empty().remove();
			} else {
				w.d.input.on("datebox", function (e,p) {
					if ( p.method === "postrefresh" ) {
						w._cubox_pos();
					}
				});
			}

			w.d.headerText = ((o.customHead !== false ) ? 
				o.customHead :
				((w._grabLabel() !== false) ? w._grabLabel() : ""));
			w.d.intHTML = $("<span>");

			$(document).one( "popupafteropen", function() { 
				// This fixes bad positioning on initial open - not found a way around this yet.
				w._cubox_pos(); 
			});

			w.fldOrder = w._cubox_range(o.customData.length);

			tmp = $("<div class='" + uid + "header'>");
			if ( o.customData.length > 1 ) { 
				tmp.addClass("ui-grid-" + [0,0,"a","b","c"][o.customData.length] );
			}
			for ( y=0; y<o.customData.length; y++ ) {
				$( "<div>" )
					.addClass( ( o.customData.length > 1 ) ?
						"ui-block-" + ["a","b","c","d"][y] :
						""
					)
					.text( o.customData[ y ].name )
					.css( "textAlign", "center")
					.appendTo( tmp );
			}
			tmp.appendTo(w.d.intHTML);
			
			w.d.intHTML.append(ctrl);
			
			for ( y = 0; y < o.customData.length; y++ ) {
				lineArr = w._cubox_arr( o.customData[ y ].data, w.customCurrent[ y ] );
				hRow = w._makeEl( flipBase, { "attr": {
					"field": y,
					"amount": 1
				} });
				hRowIn = hRow.find( "ul" );
				if ( o.customData.length === 1 ) { hRow.css( "width", "90%" ); }
				for ( i=0; i < lineArr.length; i++ ) {
					tmp = ( i !== o.customDataLen ) ? o.themeOpt : o.themeOptPick;
					console.log(i + " " + o.customDataLen);
					console.log(typeof i + " " + typeof o.customDataLen);
					$( "<li>", { "class": "ui-body-" + tmp } )
						.html( "<span>" + lineArr[i] + "</span>" )
						.appendTo( hRowIn );
					} 
					hRow.appendTo(ctrl);
			}
			
			$("<div>", { "class": uid + "flipcenter ui-overlay-shadow" } )
				.css( "pointerEvents", "none")
				.appendTo( w.d.intHTML );

			if ( o.useSetButton ) {
				y = $( "<div>", { "class": uid + "controls" } );
				
				if ( o.useSetButton ) {
					$( "<a href='#' role='button'>" )
						.appendTo(y)
						.text( w.__("customSet") )
						.addClass( "ui-btn ui-btn-" + o.theme +
							" ui-icon-check ui-btn-icon-left ui-shadow ui-corner-all" )
						.on(o.clickEventAlt, function(e) {
							e.preventDefault();
							w._t( { 
								method: "set", 
								value: w._formatter( o.customFormat, w.customCurrent ),
								custom: w.customCurrent,
							} );
							w._t( { method: "close" } );
						});
				}
				y.appendTo(w.d.intHTML);
			}
			
			if ( w.wheelExists ) { // Mousewheel operation, if plugin is loaded
				w.d.intHTML.on("mousewheel", ".ui-overlay-shadow", function(e,d) {
					e.preventDefault();
					w._cubox_offset($(this).data("field"), ((d<0)?1:-1)*$(this).data("amount"));
				});
			}
			
			w.d.intHTML.on(w.drag.eStart, "ul", function(e,f) {
				if ( !w.drag.move ) {
					if ( typeof f !== "undefined" ) { e = f; }
					w.drag.move = true;
					w.drag.target = $(this).find("li").first();
					w.drag.pos = parseInt(w.drag.target.css("marginTop").replace(/px/i, ""),10);
					w.drag.start = w.touch ? e.originalEvent.changedTouches[0].pageY : e.pageY;
					w.drag.end = false;
					e.stopPropagation();
					e.preventDefault();
				}
			});
		}
	});
	$.extend( $.mobile.datebox.prototype._drag, {
		// This contains the code that the drag and drop (or touch move) code uses
		"customflip": function() {
			var w = this,
				o = this.options,
				g = this.drag;
			
			$(document).on(g.eMove, function(e) {
				if ( g.move && o.mode === "customflip" ) {
					g.end = w.touch ? e.originalEvent.changedTouches[0].pageY : e.pageY;
					g.target.css("marginTop", (g.pos + g.end - g.start) + "px");
					e.preventDefault();
					e.stopPropagation();
					return false;
				}
			});
			
			$(document).on(g.eEnd, function(e) {
				if ( g.move && o.mode === "customflip" ) {
					g.move = false;
					if ( g.end !== false ) {
						e.preventDefault();
						e.stopPropagation();
						g.tmp = g.target.parent().parent();
						w._cubox_offset(
							g.tmp.data("field"),
							(parseInt((g.start - g.end) / g.target.innerHeight(),10) *
								g.tmp.data("amount")));
					}
					g.start = false;
					g.end = false;
				}
			});
		}
	});
})( jQuery );
