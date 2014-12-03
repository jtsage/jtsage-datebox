/* jQuery-Mobile-DateBox */

/*! CALBOX Mode */

(function($) {
	$.extend( $.mobile.datebox.prototype.options, {
		themeDateToday: "b",
		themeDayHigh: "b",
		themeDatePick: "b",
		themeDateHigh: "b",
		themeDateHighAlt: "b",
		themeDateHighRec: "b",
		themeDate: "a",
		
		calNextMonthIcon: "plus",
		calPrevMonthIcon: "minus",
		
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
		
		calYearPickMin: -6,
		calYearPickMax: 6,
		
		useTodayButton: false,
		useTomorrowButton: false,
		useCollapsedBut: false,
		
		highDays: false,
		highDates: false,
		highDatesRec: false,
		highDatesAlt: false,
		enableDates: false,
		calDateList: false,
		calShowDateList: false
	});
	$.extend( $.mobile.datebox.prototype, {
		_cal_gen: function (start,prev,last,other,month) {
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
								row.push(false);
							}
						} else if ( rc > 3 && day > last ) {
							if ( other === true ) {
								row.push([next,month+1]); next++;
							} else {
								row.push(false);
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
		},
		_cal_check : function (checkDates, year, month, date, done) {
			var w = this, i,
				o = this.options,
				maxDate = done.x,
				minDate = done.i,
				thisDate = done.t,
				presetDay = done.p,
				day = new this._date(year,month,date,0,0,0,0).getDay(),
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
			}
			return ret;
		}
	});
	$.extend( $.mobile.datebox.prototype._build, {
		"calbox": function () {
			var tempVal, pickerControl, calContent, genny, weekdayControl, listControl,
				row, col, rows, cols, htmlRow, i, prangeS, prangeL, fmtRet, fmtObj,
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
						o.afterToday || o.beforeToday || o.notToday || 
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

			$("<div class='" + uid + "gridheader'><div class='" + uid + "gridlabel'><h4>" +
				w._formatter( w.__( "calHeaderFormat" ), w.theDate ) +
				"</h4></div></div>")
					.appendTo(w.d.intHTML);
				
			// Previous and next month buttons, define booleans to decide if they should do anything
			$( "<div class='" + uid + "gridplus" + ( w.__( "isRTL" ) ? "-rtl" : "") +
					"'><a href='#'>" + w.__( "nextMonth") + "</a></div>" )
				.prependTo( w.d.intHTML.find( "." + uid + "gridheader" ) )
				.find( "a" )
					.addClass( "ui-btn-inline ui-link ui-btn ui-btn-" + 
						o.themeDate + 
						" ui-icon-" + o.calNextMonthIcon +
						" ui-btn-icon-notext ui-shadow ui-corner-all"
					)
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
			$( "<div class='" + uid + "gridminus" + ( w.__( "isRTL" ) ? "-rtl": "" ) +
					"'><a href='#'>" + w.__( "prevMonth") + "</a></div>" )
				.prependTo( w.d.intHTML.find( "." + uid + "gridheader" ) )
				.find( "a" )
					.addClass( "ui-btn-inline ui-link ui-btn ui-btn-" +
						o.themeDate +
						" ui-icon-" + o.calPrevMonthIcon +
						" ui-btn-icon-notext ui-shadow ui-corner-all"
					)
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
				
			if ( o.calNoHeader ) { 
				if ( o.calUsePickersIcons ) {
					w.d.intHTML.find( "." + uid + "gridlabel" ).hide();
				} else {
					w.d.intHTML.find( "." + uid + "gridheader" ).remove();
				}
			}
			
			w.calNext = true;
			w.calPrev = true;
			
			if ( Math.floor( cTodayDate.comp() / 100 )  === Math.floor( curDate.comp() / 100 ) ) {
				isTrueMonth = true;
			}
			if ( Math.floor( cTodayDate.comp() / 10e3 ) === Math.floor( curDate.comp() / 10e3 ) ) {
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
				tempVal = minDate.getArray();
				if ( curDateArr[0] === tempVal[0] && curDateArr[1] >= tempVal[1] ) {
					w.calNext = false;
				}
			}
			
			if ( o.calUsePickers ) {
				pickerControl = $("<div>");
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
				
				pickerControl.i.controlgroup({ mini: true, type: "horizontal" });
				pickerControl.i.find( "select" ).selectmenu( {
					//mini: true,
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
								fmtObj.ISO = fmtObj.Year + "-" + 
									w._zPad(fmtObj.Month + 1) + "-" + 
									w._zPad(fmtObj.Date);
								fmtObj.Comp = parseInt( fmtObj.ISO.replace( /-/g, "" ), 10 ); 
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
							$("<div>")
								.html( fmtRet.text )
								.addClass( uid + "griddate ui-corner-all ui-btn")
								.addClass( ( curMonth === genny[row][col][1] || checked.force ) ?
									( "ui-btn-" + checked.theme +
										( checked.ok ? "" : " ui-state-disabled" )
									) :
									( uid + "griddate-empty" )
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
								.appendTo( htmlRow );
						}
					}
				}
				if ( o.calControlGroup ) {
					htmlRow.controlgroup({type: "horizontal"});
				}
				if ( row === rows - 1 ) { htmlRow.addClass( uid + "gridrow-last" ); }
				htmlRow.appendTo(calContent);
			}
			if ( o.calShowWeek ) { 
				calContent.find( "." + uid + "griddate" ).addClass( uid + "griddate-week" );
			}
			
			if ( o.calShowDateList && dList !== false ) {
				listControl = $( "<div>" );
				listControl.a = $( "<select name='pickdate'></select>" ).appendTo(listControl);
				
				listControl.a.append("<option value='false' selected='selected'>" +
					w.__( "calDateListLabel" ) + "</option>" );

				for ( i = 0; i < dList.length; i++ ) {
					listControl.a.append( 
						$( "<option value='" + dList[i][0] + "'>" + dList[i][1] + "</option>" )
					);
				}
				
				listControl.a.on( "change", function() {
					tempVal = $( this ).val().split( "-" );
					w.theDate = new w._date(tempVal[0], tempVal[1]-1, tempVal[2], 0,0,0,0);
					w._t( { method: "doset" } );
				});
				
				listControl.find( "select" ).selectmenu( { mini: true, nativeMenu: true } );
				listControl.appendTo( calContent );
			}
			
			if ( o.useTodayButton || o.useTomorrowButton || o.useClearButton ) {
				htmlRow = $("<div>", { "class": uid + "controls" } );
				
				if ( o.useTodayButton ) {
					$( "<a href='#' role='button'>" + w.__( "calTodayButtonLabel" ) + "</a>" )
						.appendTo(htmlRow)
						.addClass( "ui-btn ui-btn-" + o.theme +
							" ui-icon-navigation ui-btn-icon-left ui-shadow ui-corner-all"
						)
						.on(o.clickEvent, function(e) {
							e.preventDefault();
							w.theDate = w._pa([0,0,0], new w._date());
							w.calBackDate = false;
							w._t( { method: "doset" } );
						});
				}
				if ( o.useTomorrowButton ) {
					$( "<a href='#' role='button'>" + w.__( "calTomorrowButtonLabel" ) + "</a>" )
						.appendTo(htmlRow)
						.addClass( "ui-btn ui-btn-" + o.theme + 
							" ui-icon-navigation ui-btn-icon-left ui-shadow ui-corner-all"
						)
						.on(o.clickEvent, function(e) {
							e.preventDefault();
							w.theDate = w._pa([0,0,0], new w._date()).adj( 2, 1 );
							w.calBackDate = false;
							w._t( { method: "doset" } );
						});
				}
				if ( o.useClearButton ) {
					htmlRow.append(w._stdBtn.clear.apply(w));
				}
				if ( o.useCollapsedBut ) {
					htmlRow.controlgroup({ type: "horizontal" });
					htmlRow.addClass( "ui-datebox-collapse" );
				} else {
					htmlRow.controlgroup();
				}
				htmlRow.appendTo( calContent );
			}
			
			w.d.intHTML.on(o.clickEventAlt, "div." + uid + "griddate", function(e) {
				e.preventDefault();
				if ( $( this ).data( "enabled" ) ) {
					w.calBackDate = false;
					w.theDate
						.setD( 2, 1 )
						.setD( 1, $( this ).jqmData( "month" ) )
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
		}
	});
})( jQuery );
