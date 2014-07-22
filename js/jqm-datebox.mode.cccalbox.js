/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notification.
 * https://github.com/jtsage/jquery-mobile-datebox
 */
/* CCCALBOX Mode */

(function($) {
	$.extend( $.mobile.datebox.prototype.options, {
		themeDate: 'a',
		
		calControlGroup: true,
		calUsePickers: true,
		calNoHeader: false,
		calCCFmt: '%m%y',
		
		calYearPickMin: 'NOW',
		calYearPickMax: 8,
		
	});
	$.extend( $.mobile.datebox.prototype, {
		_cccal_gen: function (year) {
			return [ [1,year], [2,year], [3,year], [4,year], [5,year], [6,year],	
				 [7,year], [8,year], [9,year], [10,year], [11,year], [12,year]]
		}
	});
	$.extend( $.mobile.datebox.prototype._build, {
		'cccalbox': function () {
			var w = this,
				o = this.options, i,
				cal = false,
				uid = 'ui-datebox-',
				temp = false, row = false, col = false, hRow = false, checked = false, prange = {};
				
			if ( typeof w.d.intHTML !== 'boolean' ) {
				w.d.intHTML.remove();
			}
			
			w.d.headerText = ((w._grabLabel() !== false)?w._grabLabel():w.__('titleDateDialogLabel'));
			w.d.intHTML = $('<span>');

			cal = {'thisDate': new w._date()};

			cal.trueMonth = cal.thisDate.getMonth();
			cal.trueYear = cal.thisDate.getFullYear();
			cal.thisMonth = w.theDate.getMonth();
			cal.thisYear = w.theDate.getFullYear();

			$('<div class="'+uid+'gridheader"><div class="'+uid+'gridlabel"><h4>'+w.d.headerText+'</h4></div></div>').appendTo(w.d.intHTML);
				
			cal.picker = $('<div>', {'class': 'ui-datebox-grid','style':'padding-top: 5px; padding-bottom: 5px;'});
				
			cal.picker2 = $('<div><select name="pickyar"></select></div>').appendTo(cal.picker).find('select');
				
			if ( o.calYearPickMin < 1 ) { 
				prange.sm = cal.thisYear + o.calYearPickMin;
			} else if ( o.calYearPickMin < 1800 ) {
				prange.sm = cal.thisYear - o.calYearPickMin;
			} else if ( o.calYearPickMin === "NOW" ) {
				prange.sm = cal.thisDate.getFullYear();
			} else {
				prange.sm = o.calYearPickMin;
			}
				
			if ( o.calYearPickMax < 1800 ) {
				prange.lg = cal.thisYear + o.calYearPickMax;
			} else if ( o.calYearPickMax === "NOW" ) {
				prange.lg = cal.thisDate.getFullYear();
			} else {
				prange.lg = o.calYearPickMax;
			}
			
			for ( i=prange.sm; i<=prange.lg; i++ ) {
				cal.picker2.append($('<option value="'+i+'"'+((cal.thisYear===i)?' selected="selected"':'')+'>'+i+'</option>'));
			}
				
			cal.picker2.on('change', function () {
				w.theDate.setFullYear($(this).val());
				w.refresh();
			});
				
			cal.picker.find('select').selectmenu({mini:true, nativeMenu: true});
			cal.picker.appendTo(w.d.intHTML);
			
			// Previous and next year buttons, define booleans to decide if they should do anything
			$("<div class='"+uid+"gridplus"+(w.__('isRTL')?'-rtl':'')+"'><a href='#'> </a></div>")
				.prependTo(w.d.intHTML.find('.'+uid+'gridheader'))
				.buttonMarkup({theme: o.themeDate, icon: 'arrow-r', inline: true, iconpos: 'notext', corners:true, shadow:true})
				.on(o.clickEventAlt, function(e) {
					e.preventDefault();
					if ( w.calNext ) {
						if ( w.theDate.getDate() > 28 ) { w.theDate.setDate(1); }
						w._offset('y',1);
					}
				});
			$("<div class='"+uid+"gridminus"+(w.__('isRTL')?'-rtl':'')+"'><a href='#'> </a></div>")
				.prependTo(w.d.intHTML.find('.'+uid+'gridheader'))
				.buttonMarkup({theme: o.themeDate, icon: 'arrow-l', inline: true, iconpos: 'notext', corners:true, shadow:true})
				.on(o.clickEventAlt, function(e) {
					e.preventDefault();
					if ( w.calPrev ) {
						if ( w.theDate.getDate() > 28 ) { w.theDate.setDate(1); }
						w._offset('y',-1);
					}
				});
				
			if ( o.calNoHeader === true ) { w.d.intHTML.find('.'+uid+'gridheader').remove(); }
		

			w.calNext = true;
			w.calPrev = true;

			if ( cal.trueYear === cal.thisYear ) { w.calPrev = false; }
			
			
			temp = $('<div class="'+uid+'grid">').appendTo(w.d.intHTML);
			
			cal.gen = w._cccal_gen(cal.thisYear);
			for ( var row=0; row < 2; row++ ) {
				hRow = $('<div>', {'class': uid+'gridrow'});
				for ( var col=0; col < 6; col++ ) {
					idx = col + ( row == 1 ? 6:0 );
					checked = !( cal.trueYear === cal.gen[idx][1] && cal.trueMonth > cal.gen[idx][0] );
					$("<div>"+String(cal.gen[idx][0])+"</div>")
						.addClass(uid+'griddate ui-corner-all ui-btn ui-btn-'+o.themeDate + (checked?'':' '+uid+'griddate-disable'))
						.jqmData('month', cal.gen[idx][0])
						.jqmData('theme', o.themeDate)
						.jqmData('enabled', checked)
						.jqmData('year', cal.gen[idx][1])
						.appendTo(hRow);
				}
				if ( o.calControlGroup === true ) {
					hRow.find('.ui-corner-all').removeClass('ui-corner-all').eq(0).addClass('ui-corner-left').end().last().addClass('ui-corner-right').addClass('ui-controlgroup-last');
				}
				hRow.appendTo(temp);
			}
			
			w.d.intHTML.on(o.clickEventAlt+' vmouseover vmouseout', 'div.'+uid+'griddate', function(e) {
				if ( e.type === o.clickEventAlt ) {
					e.preventDefault();
					if ( $(this).jqmData('enabled') ) {
						w.theDate.setD(2,1).setD(1,$(this).jqmData('month')-1).setD(0,$(this).jqmData('year'));
						w.d.input.trigger('datebox', {'method':'set', 'value':w._formatter(o.calCCFmt,w.theDate), 'date':w.theDate});
						w.d.input.trigger('datebox', {'method':'close'});
					}
				} 
			});
			w.d.intHTML
				.on('swipeleft', function() { if ( w.calNext ) { w._offset('y', 1); } })
				.on('swiperight', function() { if ( w.calPrev ) { w._offset('y', -1); } });
			
			if ( w.wheelExists) { // Mousewheel operations, if plugin is loaded
				w.d.intHTML.on('mousewheel', function(e,d) {
					e.preventDefault();
					if ( d > 0 && w.calNext ) { 
						w.theDate.setD(2,1);
						w._offset('y', 1);
					}
					if ( d < 0 && w.calPrev ) {
						w.theDate.setD(2,1);
						w._offset('y', -1);
					}
				});
			}
		}
	});
})( jQuery );
