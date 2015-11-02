/* JTSage-DateBox 
 *
 * MODE File
 *
 * Provide the following display modes:
 * * calbox
 *
 * Define the standard options as well
 */

mergeOpts({
	calHighToday: true,
	calHighPick: true,
	
	calShowDays: true,
	calOnlyMonth: false,
	calWeekMode: false,
	calWeekModeDay: 1,
	calControlGroup: false,
	calShowWeek: false,
	calUsePickers: false,
	calNoHeader: false,
	calFormatter: false,
	calAlwaysValidateDates: false,
	
	calYearPickMin: -6,
	calYearPickMax: 6,

	calBeforeAppendFunc: function(t) { return t; },
	
	highDays: false,
	highDates: false,
	highDatesRec: false,
	highDatesAlt: false,
	enableDates: false,
	calDateList: false,
	calShowDateList: false
});

JTSageDateBox._cal_gen = function (start,prev,last,other,month) {
	var rc = 0, cc = 0, day = 1, 
		next = 1, cal = [], row = [], stop = false;
		
	for ( rc = 0; rc <= 5; rc++ ) {
		if ( stop === false ) {
			row = [];
			for ( cc = 0; cc <= 6; cc++ ) {
				if ( rc === 0 && cc < start ) {
					if ( other === true ) {
						row.push([prev + (cc - start) + 1,month-1]);
					} else {
						row.push(" ");
					}
				} else if ( rc > 3 && day > last ) {
					if ( other === true ) {
						row.push([next,month+1]); next++;
					} else {
						row.push(" ");
					}
					stop = true;
				} else {
					row.push([day,month]); day++;
					if ( day > last ) { stop = true; }
				}
			}
			cal.push(row);
		}
	}
	return cal;
};

JTSageDateBox._cal_check = function (checkDates, year, month, date, done) {
	var w = this, i,
		o = this.options,
		maxDate = done.x,
		minDate = done.i,
		thisDate = done.t,
		presetDay = done.p,
		day = new this._date(year,month,date,12,0,0,0).getDay(),
		bdRec = o.blackDatesRec,
		hdRec = o.highDatesRec,
		ret = {
			ok: true,
			iso: year + "-" + w._zPad(month+1) + "-" + w._zPad(date),
			theme: o.themeDate,
			force: false,
			recok: true,
			rectheme: false
		};
	
	if ( month === 12 ) { ret.iso = ( year + 1 ) + "-01-" + w._zPad(date); }
	if ( month === -1 ) { ret.iso = ( year - 1 ) + "-12-" + w._zPad(date); }
	
	ret.comp = parseInt( ret.iso.replace( /-/g, "" ), 10 );
	
	if ( bdRec !== false ) {
		for ( i=0; i < bdRec.length; i++ ) {
			if ( 
				( bdRec[i][0] === -1 || bdRec[i][0] === year ) &&
				( bdRec[i][1] === -1 || bdRec[i][1] === month ) &&
				( bdRec[i][2] === -1 || bdRec[i][2] === date )
			) { ret.ok = false; } 
		}
	}
	
	if ( $.isArray( o.enableDates ) && $.inArray( ret.iso, o.enableDates ) < 0 ) {
		ret.ok = false;
	} else if ( checkDates ) {
		if (
			( ret.recok !== true ) ||
			( o.afterToday && thisDate.comp() > ret.comp ) ||
			( o.beforeToday && thisDate.comp() < ret.comp ) ||
			( o.notToday && thisDate.comp() === ret.comp ) ||
			( o.maxDays !== false && maxDate.comp() < ret.comp ) ||
			( o.minDays !== false && minDate.comp() > ret.comp ) ||
			( $.isArray(o.blackDays) && $.inArray(day, o.blackDays) > -1 ) ||
			( $.isArray(o.blackDates) && $.inArray(ret.iso, o.blackDates) > -1 ) 
		) {
			ret.ok = false;
		}
	}

	if ( $.isArray(o.whiteDates) && $.inArray(ret.iso, o.whiteDates) > -1 ) {
		ret.ok = true;
	}

	if ( ret.ok ) {
		if ( hdRec !== false ) {
			for ( i=0; i < hdRec.length; i++ ) {
				if ( 
					( hdRec[i][0] === -1 || hdRec[i][0] === year ) &&
					( hdRec[i][1] === -1 || hdRec[i][1] === month ) &&
					( hdRec[i][2] === -1 || hdRec[i][2] === date )
				) { ret.rectheme = true; } 
			}
		}
		
		if ( o.calHighPick && date === presetDay && 
				( w.d.input.val() !== "" || o.defaultValue !== false )) {
			ret.theme = o.themeDatePick;
		} else if ( o.calHighToday && ret.comp === thisDate.comp() ) {
			ret.theme = o.themeDateToday;
		} else if ( o.calHighPick && w.calDateVisible && w.calBackDate !== false &&
				w.calBackDate.comp() === ret.comp ) {
			ret.theme = o.themeDatePick;
			ret.force = true;
		} else if ( $.isArray(o.highDatesAlt) && 
				($.inArray(ret.iso, o.highDatesAlt) > -1)
			) {
			ret.theme = o.themeDateHighAlt;
		} else if ( $.isArray(o.highDates) && ($.inArray(ret.iso, o.highDates) > -1) ) {
			ret.theme = o.themeDateHigh;
		} else if ( $.isArray(o.highDays) && ($.inArray(day, o.highDays) > -1) ) {
			ret.theme = o.themeDayHigh;
		} else if ( $.isArray(o.highDatesRec) && ret.rectheme === true ) {
			ret.theme = o.themeDateHighRec;
		}
	} else {
		ret.theme = o.disabledState;
	}
	return ret;
};

JTSageDateBox._cal_prev_next = function (container) {
	var w = this,
		o = this.options,
		uid = "ui-datebox-";

	// Previous and next month buttons, define booleans to decide if they should do anything
	$( w._spf("<div class='{class}'><a href='#'>{name}</a></div>", {
			"class": uid + "gridplus" + ( w.__( "isRTL" ) ? "-rtl" : ""),
			name : w._spf( o.s.cal.nextMonth, {
				text: w.__( "nextMonth" ),
				icon: o.calNextMonthIcon
			})
		}))
		.prependTo( container )
		.find( "a" )
			.addClass( function () {
				switch ( w.baseMode ) {
					case "jqm":
						return o.btnCls + o.themeDate + o.icnCls + o.calNextMonthIcon;
					case "bootstrap":
						return o.btnCls + o.themeDate + 
							" pull-" + ( w.__( "isRTL" ) ? "left" : "right" );
					default:
						return null;
				}
			})
			.on(o.clickEventAlt, function(e) {
				e.preventDefault();
				if ( w.calNext ) {
					if ( w.calBackDate === false ) { 
						w.calBackDate = new Date(w.theDate.getTime());
					}
					if ( w.theDate.getDate() > 28 ) { w.theDate.setDate(1); }
					w._offset( "m", 1 );
				}
		});

	$( w._spf("<div class='{class}'><a href='#'>{name}</a></div>", {
			"class": uid + "gridminus" + ( w.__( "isRTL" ) ? "-rtl" : ""),
			name : w._spf( o.s.cal.prevMonth, {
				text: w.__( "prevMonth" ),
				icon: o.calPrevMonthIcon
			})
		}))
		.prependTo( container )
		.find( "a" )
			.addClass( function () {
				switch ( w.baseMode ) {
					case "jqm":
						return o.btnCls + o.themeDate + o.icnCls + o.calPrevMonthIcon;
					case "bootstrap":
						return o.btnCls + o.themeDate + 
							" pull-" + ( w.__( "isRTL" ) ? "right" : "left" );
					default:
						return null;
				}
			})
			.on(o.clickEventAlt, function(e) {
				e.preventDefault();
				if ( w.calPrev ) {
					if ( w.calBackDate === false ) { 
						w.calBackDate = new Date(w.theDate.getTime());
					}
					if ( w.theDate.getDate() > 28 ) { 
						w.theDate.setDate(1);
					}
					w._offset( "m", -1 );
				}
			});			
};

JTSageDateBox._cal_pickers = function (curMonth, curYear, cTodayDateArr) {
	// Build the top month and year pickers, if used
	var prangeS, prangeL, i,
		w = this,
		o = this.options,
		uid = "ui-datebox-",
		pickerControl = $("<div>").addClass("ui-datebox-cal-pickers");

	if ( o.calNoHeader && o.calUsePickersIcons ) {
		pickerControl.addClass( "ui-datebox-pickicon" );
	}
	
	pickerControl.i = $("<fieldset>").appendTo(pickerControl);
	
	pickerControl.a = $( "<select>" )
		.appendTo( pickerControl.i );
	pickerControl.b = $( "<select>" )
		.appendTo( pickerControl.i );
	
	for ( i=0; i<=11; i++ ) {
		pickerControl.a.append(
			$( "<option value='" + i + "'" + 
				( ( curMonth === i ) ?
					" selected='selected'" :
					""
				) + ">" + w.__( "monthsOfYear" )[ i ] + "</option>"
			)
		);
	}
	
	if ( o.calYearPickMin < 1 ) { 
		prangeS = curYear + o.calYearPickMin;
	} else if ( o.calYearPickMin < 1800 ) {
		prangeS = curYear - o.calYearPickMin;
	} else if ( o.calYearPickMin === "NOW" ) {
		prangeS = cTodayDateArr[0];
	} else {
		prangeS = o.calYearPickMin;
	}
	
	if ( o.calYearPickMax < 1800 ) {
		prangeL = curYear + o.calYearPickMax;
	} else if ( o.calYearPickMax === "NOW" ) {
		prangeL = cTodayDateArr[0];
	} else {
		prangeL = o.calYearPickMax;
	}
	for ( i = prangeS; i <= prangeL; i++ ) {
		pickerControl.b.append(
			$( "<option value='" + i + "'" + 
				( ( curYear===i ) ? " selected='selected'" : "" ) +
				 ">" + i + "</option>"
			)
		);
	}

	pickerControl.a.on( "change", function () {
		if ( w.calBackDate === false ) { 
			w.calBackDate = new Date(w.theDate.getTime());
		}
		w.theDate.setD( 1, $( this ).val() );
		if ( w.theDate.get(1) !== parseInt( $( this ).val(), 10 ) ) {
			w.theDate.setD( 2, 0 );
		}
		if ( w.calBackDate !== false ) {
			w._t( {
				method: "displayChange",
				selectedDate: w.calBackDate,
				shownDate: w.theDate,
				thisChange: "p",
				thisChangeAmount: null
			});
		}
		w.refresh();
	});
	pickerControl.b.on( "change", function () {
		if ( w.calBackDate === false ) { 
			w.calBackDate = new Date(w.theDate.getTime());
		}
		w.theDate.setD( 0, $( this ).val() );
		if (w.theDate.get(1) !== parseInt( pickerControl.a.val(), 10)) {
			w.theDate.setD( 2, 0 );
		}
		if ( w.calBackDate !== false ) {
			w._t( {
				method: "displayChange",
				selectedDate: w.calBackDate,
				shownDate: w.theDate,
				thisChange: "p",
				thisChangeAmount: null
			});
		}
		w.refresh();
	});
	switch ( w.baseMode ) {
		case "bootstrap":
		case "jqueryui":
			pickerControl.i.find("select")
				.addClass("form-control input-sm")
				.css({"marginTop": "3px", "float": "left"})
				.first().css({ width: "60%" })
				.end().last().css({ width: "40%" });
			if ( o.calNoHeader && o.calUsePickersIcons ) {
				w.d.intHTML.find( "." + uid + "gridheader" ).append(pickerControl);
			} else {
				pickerControl.appendTo( w.d.intHTML );
			}
			break;
		case "jqm":
			pickerControl.i.controlgroup({ mini: true, type: "horizontal" });
			pickerControl.i.find( "select" ).selectmenu( {
				nativeMenu: true
			} );
			pickerControl.i.find( ".ui-controlgroup-controls" ).css({
				marginRight: "auto",
				marginLeft: "auto",
				width: "100%",
				display: "table",
			});
			pickerControl.i.find( ".ui-select" )
				.first().css({ width: "60%" })
				.end().last().css({ width: "40%" });
			if ( o.calNoHeader && o.calUsePickersIcons ) { 
				pickerControl.i.css({ padding: "0 10px 5px 10px" });
			}
			pickerControl.appendTo( w.d.intHTML );
			break;
	}
};

JTSageDateBox._cal_date_list = function ( calContent ) {
	// Build the bottom quick date list, if used
	var i, tempVal,
		w = this,
		o = this.options,
		listControl = $( "<div>" ).addClass( "ui-datebox-pickcontrol" );

	listControl.a = $( "<select name='pickdate'></select>" ).appendTo(listControl);
	
	listControl.a.append("<option value='false' selected='selected'>" +
		w.__( "calDateListLabel" ) + "</option>" );

	for ( i = 0; i < o.calDateList.length; i++ ) {
		listControl.a.append( 
			$( w._spf( "<option value='{0}'>{1}</option>", o.calDateList[i] ))
		);
	}
	
	listControl.a.on( "change", function() {
		tempVal = $( this ).val().split( "-" );
		w.theDate = new w._date(tempVal[0], tempVal[1]-1, tempVal[2], 0,0,0,0);
		w._t( { method: "doset" } );
	});
	
	switch ( w.baseMode ) {
		case "jqm":
			listControl.find( "select" ).selectmenu( { mini: true, nativeMenu: true } );
			break;
		case "bootstrap":
			listControl.find("select").addClass("form-control input-sm");
			break;
	}
	
	listControl.appendTo( calContent );
};

JTSageDateBox._build.calbox = function () {
	var tempVal, calContent, genny, weekdayControl,
		row, col, rows, cols, htmlRow, i, fmtRet, fmtObj,
		absStartDO, absEndDO,
		w = this,
		o = this.options,
		dList = o.calDateList,
		uid = "ui-datebox-",
		curDate = ( ( w.calBackDate !== false && 
			w.theDate.get(0) === w.calBackDate.get(0) && 
			w.theDate.get(1) === w.calBackDate.get(1) ) ? 
				new w._date(w.calBackDate.getTime()) :
				w.theDate ),
		checked = false,
		checkDatesObj = {},
		minDate = w.initDate.copy(),
		maxDate = w.initDate.copy(),
		cStartDay = (curDate.copy([0],[0,0,1]).getDay() - w.__( "calStartDay" ) + 7) % 7,
		curMonth = curDate.get(1),
		curYear = curDate.get(0),
		curDateArr = curDate.getArray(),
		presetDate = ( w.d.input.val() === "" ) ?
			w._startOffset( w._makeDate( w.d.input.val() ) ) :
			w._makeDate( w.d.input.val() ),
		presetDay = -1,
		cTodayDate = new w._date(),
		cTodayDateArr = cTodayDate.getArray(),
		weekNum = curDate
			.copy( [0], [0,0,1] )
			.adj( 2, ( -1 * cStartDay ) +( w.__( "calStartDay" ) === 0 ? 1 : 0 ) )
			.getDWeek(4),
		weekModeSel = 0,
		isTrueMonth = false,
		isTrueYear = false,
		cMonthEnd = 32 - w.theDate.copy([0],[0,0,32,13]).getDate(),
		cPrevMonthEnd = 32 - w.theDate.copy([0,-1],[0,0,32,13]).getDate(),
		checkDates = ( 
				o.afterToday || o.beforeToday || o.notToday || o.calAlwaysValidateDates || 
				o.maxDays || o.minDays || o.blackDays || o.blackDates 
			) ?
			true :
			false;

	if ( w.calBackDate !== false ) {
		if ( w.theDate.get(0) === w.calBackDate.get(0) && 
			w.theDate.get(1) === w.calBackDate.get(1) ) {
				w.theDate = new w._date(w.calBackDate.getTime());
				w.calBackDate = false;
		}
	}
		
	if ( typeof w.d.intHTML !== "boolean" ) { 
		w.d.intHTML.remove(); 
		w.d.intHTML = null;
	}
	
	w.d.headerText = ( ( w._grabLabel() !== false ) ? 
		w._grabLabel() :
		w.__( "titleDateDialogLabel" )
	);
	w.d.intHTML = $( "<span>" );

	$( w._spf("<div class='{cl1}'><div class='{cl2}'><h4>{content}</h4></div></div>", {
		"cl1": uid + "gridheader",
		"cl2": uid + "gridlabel",
		"content" : w._formatter( w.__( "calHeaderFormat" ), w.theDate )
	})).appendTo(w.d.intHTML);
		
	w._cal_prev_next( w.d.intHTML.find( "." + uid + "gridheader" ) );

	if ( o.calNoHeader ) { 
		if ( o.calUsePickersIcons ) {
			w.d.intHTML.find( "." + uid + "gridlabel" ).hide();
			w.d.intHTML.find( "." + uid + "gridplus" )
				.find(".ui-btn-inline")
				.addClass(uid + "nomargbtn");
			w.d.intHTML.find( "." + uid + "gridminus" )
				.find(".ui-btn-inline")
				.addClass(uid + "nomargbtn");
		} else {
			w.d.intHTML.find( "." + uid + "gridheader" ).remove();
		}
	}
	
	w.calNext = true;
	w.calPrev = true;
	
	if ( Math.floor( cTodayDate.comp() / 100 )  === Math.floor( curDate.comp() / 100 ) ) {
		// The month displayed is current to the selected date
		isTrueMonth = true;
	}
	if ( Math.floor( cTodayDate.comp() / 10e3 ) === Math.floor( curDate.comp() / 10e3 ) ) {
		// The year displayed is current to the selected date
		isTrueYear = true;	
	}
	if ( presetDate.comp() === curDate.comp() ) { presetDay = presetDate.get(2); }
	
	if ( o.afterToday &&
			( isTrueMonth || ( isTrueYear && cTodayDateArr[1] >= curDateArr[1] ) ) ) {
		w.calPrev = false; }
	if ( o.beforeToday &&
			( isTrueMonth || ( isTrueYear && cTodayDateArr[1] <= curDateArr[1] ) ) ) {
		w.calNext = false; }
	
	if ( o.minDays !== false ) {
		minDate.adj( 2, o.minDays * -1 );
		tempVal = minDate.getArray();
		if ( curDateArr[0] === tempVal[0] && curDateArr[1] <= tempVal[1] ) {
			w.calPrev = false;
		}
	}
	if ( o.maxDays !== false ) {
		maxDate.adj( 2, o.maxDays );
		tempVal = maxDate.getArray();
		if ( curDateArr[0] === tempVal[0] && curDateArr[1] >= tempVal[1] ) {
			w.calNext = false;
		}
	}
	
	if ( o.calUsePickers ) {
		w._cal_pickers( curMonth, curYear, cTodayDateArr );				
	}
	
	calContent = $("<div class='" + uid + "grid'>" ).appendTo( w.d.intHTML );
	
	if ( o.calShowDays ) {
		w._cal_days = w.__( "daysOfWeekShort").concat( w.__( "daysOfWeekShort" ) );
		weekdayControl = $( "<div>", { "class": uid + "gridrow" } ).appendTo( calContent );

		if ( o.calControlGroup ) { weekdayControl.addClass( uid + "gridrow-last" ); }
		if ( w.__( "isRTL" ) === true ) { 
			weekdayControl.css( "direction", "rtl" );
		}
		if ( o.calShowWeek ) { 
			$("<div>")
				.addClass( uid + "griddate " + uid + "griddate-label" )
				.appendTo( weekdayControl );
		}
		for ( i=0; i<=6;i++ ) {
			$( "<div>" )
				.text( w._cal_days[ ( i + w.__( "calStartDay") ) % 7 ] )
				.addClass( uid + "griddate " + uid + "griddate-label" )
				.appendTo( weekdayControl );
		}
	}

	checkDatesObj = { i: minDate, x: maxDate, t: cTodayDate, p: presetDay };
	genny = w._cal_gen(
		cStartDay,
		cPrevMonthEnd,
		cMonthEnd,
		!o.calOnlyMonth,
		curDate.get(1)
	);
	
	if ( ! $.isFunction( o.calFormatter ) && 
		o.calFormatter !== false &&
		$.isFunction( window[ o.calFormatter ] ) ) {
			o.calFormatter = window[ o.calFormatter ];
	}

	if ( ! $.isFunction( o.calBeforeAppendFunc ) && 
		o.calBeforeAppendFunc !== false &&
		$.isFunction( window[ o.calBeforeAppendFunc ] ) ) {
			o.calBeforeAppendFunc = window[ o.calBeforeAppendFunc ];
	}
	
	absStartDO = new Date(
		w.theDate.get(0),
		genny[0][0][1],
		genny[0][0][0],
		0, 0, 0, 0 );
	absEndDO = new Date(
		w.theDate.get(0),
		genny[genny.length-1][6][1],
		genny[genny.length-1][6][0],
		0, 0, 0, 0 );
		
	if ( w.calBackDate === false ) {
		w.calDateVisible = true;
	} else {
		if ( o.calOnlyMonth ) {
			w.calDateVisible = false; 
		} else {
			if ( w.calBackDate.comp() < absStartDO.comp() || 
					w.calBackDate.comp() > absEndDO.comp() ) {
				w.calDateVisible = false;
			} else {
				w.calDateVisible = true;
			}
		}
	}	
	
	for ( row = 0, rows = genny.length; row < rows; row++ ) {
		htmlRow = $("<div>", { "class": uid + "gridrow" } );
		if ( w.__( "isRTL" ) ) { htmlRow.css( "direction", "rtl" ); }
		if ( o.calShowWeek ) {
				$("<div>", { "class": uid + "griddate " + uid + "griddate-empty" } )
					.text( "W" + weekNum )
					.addClass( ( ( w.baseMode === "bootstrap" ) ? "pull-left" : "" ) )
					.css( (o.calControlGroup ? {"float": "left"} : {}) )
					.appendTo( htmlRow );
				weekNum++;
				if ( weekNum > 52 && typeof(genny[ row + 1 ]) !== "undefined" ) { 
					weekNum = new w._date(
						curDateArr[0],
						curDateArr[1],
						( w.__( "calStartDay" )===0 ) ? 
							genny[ row + 1 ][ 1 ][ 0 ] :
							genny[ row + 1 ][ 0 ][ 0 ],
						0, 0, 0, 0
					).getDWeek( 4 ); }
			}
		for ( col=0, cols = genny[row].length; col < cols; col++ ) {
			if ( o.calWeekMode ) { 
				weekModeSel = genny[row][o.calWeekModeDay][0]; 
			}
			if ( typeof genny[row][col] === "boolean" ) {
				$("<div>", { 
					"class": uid + "griddate " + uid + "griddate-empty"
				} ).appendTo( htmlRow );
			} else {
				checked = w._cal_check(
					checkDates,
					curDateArr[0],
					genny[row][col][1],
					genny[row][col][0],
					checkDatesObj
				);
				if ( genny[row][col][0]) {
					if ( ! $.isFunction(o.calFormatter) ) {
						fmtRet = { text: genny[row][col][0], "class": "" };
					} else {
						fmtObj = {
							"Year": ( ( genny[row][col][1] > 11 ) ? curYear + 1 : 
								( genny[row][col][1] < 0 ) ? curYear - 1 : curYear ),
							"Month" : ( ( genny[row][col][1] === 12 ) ? 0 : 
								( genny[row][col][1] === -1 ) ? 11 : genny[row][col][1] ),
							"Date" : genny[row][col][0]
						};
						fmtObj.Arr = [
							fmtObj.Year,
							w._zPad(fmtObj.Month + 1),
							w._zPad(fmtObj.Date)
						];
						fmtObj.ISO = fmtObj.Arr.join( "-" );
						fmtObj.Comp = fmtObj.Arr.join( "" );
						fmtObj.dateVisible = w.calDateVisible;
						tempVal = o.calFormatter(fmtObj);
						if ( typeof tempVal !== "object" ) {
							fmtRet = { text: tempVal, "class": "" };
						} else {
							fmtRet = {
								"text": tempVal.text,
								"class": tempVal["class"]
							};
						}
					}
					o.calBeforeAppendFunc(
						$("<div>")
							.html( fmtRet.text )
							.addClass( uid + "griddate")
							.addClass( "" +
								( ( curMonth === genny[row][col][1] || checked.force ) ?
									( o.btnCls + checked.theme ) :
									( uid + "griddate-empty" +
										( ( w.baseMode === "bootstrap" ) ?
											o.btnCls + "default" : "" 
										) +
										( ( o.calOnlyMonth === true ) ?
											" " + o.disabledState : ""
										)
									)
								)
							)
							.addClass( fmtRet["class"] )
							.css(( curMonth !== genny[row][col][1] && !o.calOnlyMonth ) ?
								{ cursor: "pointer" } :
								{}
							)
							.data( "date", 
								( ( o.calWeekMode ) ?
									weekModeSel :
									genny[row][col][0] )
							)
							.data( "enabled", checked.ok)
							.data( "month",
								genny[ row ][ ( ( o.calWeekMode ) ?
										o.calWeekModeDay :
										col
									) ][1]
							)
						).appendTo( htmlRow );
				}
			}
		}

		switch ( w.baseMode ) {
			case "jqm":
				if ( o.calControlGroup ) {
					htmlRow.find("." + uid + "griddate-empty" )
						.addClass( "ui-btn" );

					if ( o.calOnlyMonth ) {
						htmlRow.find( "." + uid + "griddate-empty" )
						.addClass( "ui-state-disabled" );
					}

					htmlRow.controlgroup({type: "horizontal"});
				}
				break;
			case "bootstrap":
				htmlRow.addClass("btn-group"); break;
			case "jqueryui":
				htmlRow.find( "." + uid + "griddate" )
					.removeClass("ui-corner-all")
					.not( "." + uid + "griddate-empty" )
					.first().addClass( "ui-corner-left" )
					.end().last().addClass( "ui-corner-right" );
				break;
		}

		if ( row === rows - 1 ) { htmlRow.addClass( uid + "gridrow-last" ); }
		htmlRow.appendTo(calContent);
	}
	if ( o.calShowWeek ) { 
		calContent.find( "." + uid + "griddate" ).addClass( uid + "griddate-week" );
	}
	
	if ( o.calShowDateList && dList !== false ) {
		w._cal_date_list( calContent );
	}
	
	if ( o.useTodayButton || o.useTomorrowButton || o.useClearButton || o.useCancelButton ){
		htmlRow = $("<div>", { "class": uid + "controls" } );
		
		if ( o.useTodayButton ) {
			htmlRow.append(w._stdBtn.today.apply(w));
		}
		if ( o.useTomorrowButton ) {
			htmlRow.append(w._stdBtn.tomorrow.apply(w));
		}
		if ( o.useClearButton ) {
			htmlRow.append(w._stdBtn.clear.apply(w));
		}
		if ( o.useCancelButton ) {
			htmlRow.append(w._stdBtn.cancel.apply(w));
		}

		w._controlGroup( htmlRow ).appendTo( calContent );
	}
	
	w.d.intHTML.on(o.clickEventAlt, "div." + uid + "griddate", function(e) {
		e.preventDefault();
		if ( $( this ).data( "enabled" ) ) {
			w.calBackDate = false;
			w.theDate
				.setD( 2, 1 )
				.setD( 1, $( this ).data( "month" ) )
				.setD( 2, $( this ).data( "date" ) );
			w._t( {
				method: "set",
				value: w._formatter( w.__fmt(),w.theDate ),
				date: w.theDate
			} );
			w._t( { method: "close" } );
		}
	});
	w.d.intHTML
		.on( "swipeleft", function() { 
			if ( w.calNext ) { 
				if ( w.calBackDate === false ) { 
					w.calBackDate = new Date(w.theDate.getTime());
				} 
				w._offset( "m", 1 );
			} 
		} )
		.on( "swiperight", function() {
			if ( w.calPrev ) {
				if ( w.calBackDate === false ) { 
					w.calBackDate = new Date(w.theDate.getTime());
				} 
				w._offset( "m", -1 ); 
			}
		} );
	
	if ( w.wheelExists ) { // Mousewheel operations, if plugin is loaded
		w.d.intHTML.on( "mousewheel", function(e,d) {
			e.preventDefault();
			if ( d > 0 && w.calNext ) {
				if ( w.calBackDate === false ) { 
					w.calBackDate = new Date(w.theDate.getTime());
				} 
				w.theDate.setD( 2, 1 );
				w._offset( "m", 1 );
			}
			if ( d < 0 && w.calPrev ) {
				if ( w.calBackDate === false ) { 
					w.calBackDate = new Date(w.theDate.getTime());
				}
				w.theDate.setD( 2, 1 );
				w._offset( "m", -1 );
			}
		});
	}
};
