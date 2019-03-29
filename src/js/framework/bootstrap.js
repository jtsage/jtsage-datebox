/**
 * JTSage-DateBox
 * @fileOverview BootStrap v3 Themes and StyleFunctions
 * This file supports: datebox, flipbox, slidebox, calbox.
 * 
 * @author J.T.Sage <jtsage+datebox@gmail.com>
 * @author {@link https://github.com/jtsage/jtsage-datebox/contributors|GitHub Contributors}
 * @license {@link https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt|MIT}
 * @version 5.0.0
 */

mergeOpts({
	theme_clearBtnCls : "default",
	theme_clearBtnIcn : "clear",

	theme_closeBtnCls : "default",
	theme_closeBtnIcn : "check",

	theme_cancelBtnCls : "default",
	theme_cancelBtnIcn : "cancel",

	theme_tomorrowBtnCls : "default",
	theme_tomorrowBtnIcn : "goto",

	theme_todayBtnCls : "default",
	theme_todayBtnIcn : "goto",

	theme_dropdownContainer : "panel panel-default",
	theme_modalContainer    : "panel panel-default",
	theme_inlineContainer   : "panel panel-default",

	theme_headerTheme  : "navbar-default",
	theme_headerBtnCls : "default",
	theme_headerBtnIcn : "cancel",
	theme_openButton   : "", // has-succes, has-warning, has-error

	theme_cal_Today       : "info",
	theme_cal_DayHigh     : "warning",
	theme_cal_Selected    : "success",
	theme_cal_DateHigh    : "warning",
	theme_cal_DateHighAlt : "danger",
	theme_cal_DateHighRec : "warning",
	theme_cal_Default     : "default",
	theme_cal_OutOfBounds : "link",

	theme_cal_NextBtnIcn : "next",
	theme_cal_NextBtnCls : "default",
	theme_cal_PrevBtnIcn : "prev",
	theme_cal_PrevBtnCls : "default",

	theme_cal_Pickers  : false, // UNUSED
	theme_cal_DateList : false, // UNUSED

	theme_dbox_NextBtnIcn : "plus",
	theme_dbox_NextBtnCls : "default",
	theme_dbox_PrevBtnIcn : "minus",
	theme_dbox_PrevBtnCls : "default",
	theme_dbox_Inputs     : false, //UNUSED

	theme_fbox_Selected   : "success",
	theme_fbox_Default    : "light",
	theme_fbox_Forbidden  : "danger",
	theme_fbox_RollHeight : "135px",

	theme_slide_Today       : "info",
	theme_slide_DayHigh     : "warning",
	theme_slide_Selected    : "success",
	theme_slide_DateHigh    : "warning",
	theme_slide_DateHighAlt : "danger",
	theme_slide_DateHighRec : "warning",
	theme_slide_Default     : "default",

	theme_slide_NextBtnIcn     : "plus",
	theme_slide_NextBtnCls     : "default",
	theme_slide_PrevBtnIcn     : "minus",
	theme_slide_PrevBtnCls     : "default",
	theme_slide_NextDateBtnIcn : "next",
	theme_slide_NextDateBtnCls : "default",
	theme_slide_PrevDateBtnIcn : "prev",
	theme_slide_PrevDateBtnCls : "default",

	theme_slide_Pickers  : false, // UNUSED
	theme_slide_DateList : false, // UNUSED

	theme_backgroundMask : {
		position          : "fixed",
		left              : 0,
		top               : 0,
		right             : 0,
		bottom            : 0,
		backgroundColor   : "rgba(0,0,0,.4)"
	},
	theme_headStyle : " .w-100 { width: 100%; }",
	theme_spanStyle : false,

	flipboxLensAdjust : 9,
	buttonIconDate    : "calendar",
	buttonIconTime    : "clock",
	disabledState     : "disabled",

	clickEvent : "click",
	tranDone   : "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend"
});


JTSageDateBox.baseMode = "bootstrap";

JTSageDateBox.styleFunctions = {
	button                : function( themeClass, iconClass, contents ) {
		var retty;

		retty  = "<a href='#' role='button' class='btn btn-sm btn-" + themeClass + "'>";
		retty += ( iconClass !== false ) ?
			"<span style='top: 3px; display: inline-block; position: relative;'>" +
			this.icons.getIcon(iconClass) + "</span> " :
			"";
		retty += contents + "</a>";
		return retty;
	},
	buttonGroup           : function ( collapse) {
		var cls = ( collapse === true ) ?
			"btn-group btn-group-justified" :
			"btn-group btn-group-vertical";

		return $(
			"<div style='padding: 5px;' class='w-100 " +  cls + "'>"
		);
	},
	baseInputWrap         : function ( originalInput, buttonTheme ) {
		/* Set up a wrap around the input for styling, and return it */
		return originalInput.wrap("<div class='input-group " + buttonTheme + "'>").parent();
	},
	baseInputButton       : function ( iconClass, title ) {
		return "<div class='input-group-addon' title='" + title + "'>" +
			"<span>" + this.icons.getIcon(iconClass) + "</span>" +
			"</div>";
	},
	baseInputButtonFinder : function ( originalInputWrap ) {
		return originalInputWrap.find(".input-group-addon");
	},
	baseInputNoButton     : function ( originalInputWrap ) {
		originalInputWrap.css( "width", "100%" );
	},
	focusInput            : function ( ) {
		return true;
	},
	blurInput             : function ( ) {
		return true;
	},
	widgetHeader          : function ( text, themeBar, themeIcon, iconClass ) {
		return "<div class='navbar " + themeBar + "'><div class='navbar-header'>" +
			"<span class='navbar-brand'>" + text + "</span>" +
			"</div>" + "<ul class='nav navbar-nav navbar-right'>" +
			"<li><a href='#' class='dbCloser'><span>" + this.icons.getIcon(iconClass) +
			"</span>&nbsp;&nbsp;</a></li></ul></div>";
	},
	intHeader             : function ( text ) {
		return $(
			"<div class='text-center dbHeader'>" +
			"<h4>" + text + "</h4>" +
			"</div>"
		);
	},
	
	genHeader             : function ( txt, prevIcn, prevCls, nextIcn, nextCls, prevCtl, nextCtl ) {
		var returnVal = $("<div style='padding-bottom: 5px;'>");


		$( this.styleFunctions.button.apply(this, [
			prevCls + " pull-left " + prevCtl,
			prevIcn,
			""
		] ) ).appendTo( returnVal );

		$( this.styleFunctions.button.apply( this, [
			nextCls + " pull-right " + nextCtl,
			nextIcn,
			""
		] ) ).appendTo( returnVal );

		$("<h4 class='text-center' style='line-height: 1.5'>" + txt + "</h4>")
			.appendTo( returnVal );

		return returnVal;
	},
	calHeader             : function ( txt, prevIcn, prevCls, nextIcn, nextCls ) {
		return this.styleFunctions.genHeader.apply( this, [
			txt,
			prevIcn,
			prevCls,
			nextIcn,
			nextCls,
			"dbCalPrev",
			"dbCalNext"
		]);
	},
	calGrid               : function () {
		return $(
			"<div style='padding:5px; clear:both'>" +
			"<table class='dbCalGrid w-100'>" +
			"</table></div>"
		);
	},
	calRow                : function () {
		return $( "<tr>" );
	},
	calButton             : function ( data, totalElements ) {
		var style = ( totalElements !== undefined ?
				" style='width: " + ( 100 / totalElements ) + "%'" :
				""
			),
			disable = ( data.bad ? "disabled='disabled'" : ""),
			cls = "class='w-100 dbEvent btn-sm btn btn-" +
				data.theme + ( data.bad ? " disabled":"" ) + "'";

		return $("<td class='text-center'" + style + ">" +
			"<a href='#' " + cls + " " + disable + ">" +
			data.displayText +
			"</a>" + "</td>");
	},
	calNonButton          : function ( text, header, totalElements ) {
		var style = ( totalElements !== undefined ?
				" style='width: " + ( 100 / totalElements ) + "%'" :
				""
			),
			cls = ( header ) ? " font-weight-bold" : "";

		return $("<td class='text-center" + cls + "'" + style + ">" + text + "</td>");
	},
	genPickers            : function ( ranges, ctlMonth, ctlYear ) {
		var returnVal = "";

		returnVal += "<div style='padding:5px;'>";

		returnVal += "<div class='col-sm-8' style='padding:0; margin:0'>";
		returnVal += this._stdSel( ranges.month, ctlMonth, "form-control" );
		returnVal += "</div>";

		returnVal += "<div class='col-sm-4' style='padding:0; margin:0'>";
		returnVal += this._stdSel( ranges.year, ctlYear, "form-control" );
		returnVal += "</div>";

		returnVal += "</div>";

		return $(returnVal);
	},
	calPickers            : function ( ranges ) {
		return this.styleFunctions.genPickers.apply( this, [
			ranges,
			"dbCalPickMonth",
			"dbCalPickYear"
		]);
	},
	genDateList           : function ( listLabel, list, ctl ) {
		var returnVal = "",
			newList = list.slice();


		newList.unshift([false, listLabel, true]);

		returnVal += "<div style='padding:5px'>";
		returnVal += this._stdSel( newList, ctl, "form-control" );
		returnVal += "</div>";

		return $(returnVal);
	},
	calDateList           : function ( listLabel, list ) {
		return this.styleFunctions.genDateList.apply( this, [
			listLabel,
			list,
			"dbCalPickList"
		]);
	},
	dboxContainer         : function () {
		return $("<table style='margin: 5px;'>");
	},
	dboxRow               : function () {
		return $("<tr>");
	},
	dboxControl           : function ( prevIcn, prevCls, nextIcn, nextCls, mainCls, label ) {
		var returnVal = "";

		returnVal += "<td><div class='btn-group-vertical dbBox" + mainCls + "'>";

		returnVal += this.styleFunctions.button.apply( this, [
			nextCls + " dbBoxNext" ,
			nextIcn,
			""
		] );
		
		if ( label !== null ) {
			returnVal += "<div class='w-100 form-control rounded-0 p-0 text-center' " +
				"style='height:auto'>" + label + "</div>";
		}
		returnVal += "<input type='text' ";
		returnVal += "class='form-control input-sm text-center' ";
		returnVal += "style='border-radius: 0; padding: 5px 0;'>";
		
		returnVal += this.styleFunctions.button.apply( this, [
			prevCls + " dbBoxPrev" ,
			prevIcn,
			""
		] );

		returnVal += "</div></td>";

		return $(returnVal);
	},
	fboxContainer         : function ( size ) {
		return $(
			"<div style='height: " +
			size +
			"; overflow: hidden; padding: 5px;'>"
		);
	},
	fboxDurLabels         : function ( ) {
		return $(
			"<div style='padding: 0 5px;'>"
		);
	},
	fboxDurLabel          : function ( text, items ) {
		return $(
			"<div class='text-center' style='display: inline-block; width: " +
			( 100 / items ) + "%'>" + text +
			"</div>"
		);
	},
	fboxRollerContain     : function ( items ) {

		return $( "<div style='float: left; width: " + ( 100 / items ) + "%'>" );
	},
	fboxRollerParent      : function () {
		return $( "<ul class='list-group'>" );
	},
	fboxRollerChild       : function ( text, cls ) {
		return $(
			"<li class='list-group-item text-center list-group-item-" + cls + "'" +
			" style='padding: 10px 0;'>" +
			text +
			"</li>"
		);
	},
	fboxLens              : function () {
		return $(
			"<div style='margin: 0px 2px; box-shadow: 0 .5rem 1rem rgba(0,0,0,.15); " +
			"border: 1px solid black; height: 50px;'>"
		);
	},
	slideHeader           : function ( txt, prevIcn, prevCls, nextIcn, nextCls ) {
		return this.styleFunctions.genHeader.apply( this, [
			txt,
			prevIcn,
			prevCls,
			nextIcn,
			nextCls,
			"dbSlidePrev",
			"dbSlideNext"
		]);
	},
	slidePickers            : function ( ranges ) {
		return this.styleFunctions.genPickers.apply( this, [
			ranges,
			"dbSlidePickMonth",
			"dbSlidePickYear"
		]);
	},
	slideDateList           : function ( listLabel, list ) {
		return this.styleFunctions.genDateList.apply( this, [
			listLabel,
			list,
			"dbSlidePickList"
		]);
	},
	slideGrid               : function () {
		return $(
			"<div style='padding: 5px 0; clear: both;'>" +
			"<table class='dbSlideGrid w-100'>" +
			"</table></div>"
		);
	},
	slideRow                : function () {
		return $( "<tr>" );
	},
	slideDateButton         : function ( data ) {
		var style   = " style='width: " + ( ( 100 / 8 ) ) + "%'",
			disable = ( data.bad ? "disabled='disabled'" : ""),
			cls = "class='w-100 dbEventS btn-sm btn btn-" +
				data.theme + ( data.bad ? " disabled":"" ) + "'";

		return $("<td class='text-center'" + style + ">" +
			"<a href='#' style='border-radius: 50%;' " + cls + " " + disable + ">" +
			"<small>" + this.__( "daysOfWeekShort")[data.dateObj.getDay()] +
			"</small><br>" + data.dateObj.getDate() +
			"</a>" + "</td>");

	},
	slideMoveButton         : function ( eventCls, icon, theme ) {
		var style = " style='width: " + ( ( 100 / 8 ) / 2 ) + "%'",
			cls   = "class='w-100 btn-sm btn btn-" +
				theme + " " + eventCls + "'";

		return $(
			"<td class='m-0 p-1 text-center'" + style + ">" +
			"<a href='#' style='border-radius: 50%; padding:2px; margin:0;' " +
			cls + ">" + this.icons.getIcon(icon) + "</a></td>"
		);

	},
	flipPosition           : function () {
		var fullRoller, firstItem, height_Roller, intended_Top,
			w                 = this,
			o                 = this.options,
			height_Outside    = w.d.intHTML.find( ".dbRollerV" ).outerHeight( true ),
			height_Container  = w.d.intHTML.find( ".dbRollerV" ).height(),
			theLens           = w.d.intHTML.find( ".dbLens" ).first(),
			height_Lens       = theLens.outerHeight();

		// Trap for run too early.
		if ( height_Container < 1 ) { return true; }

		// Lens top:
		// Negative Half the parent height is center.
		// Add Negative half the lens height.
		intended_Top = -1 * ( ( height_Outside / 2 ) + ( height_Lens / 2 ) );
		theLens.css( {
			top          : intended_Top,
			marginBottom : -1 * height_Lens
		} );

		w.d.intHTML.find( ".dbRoller" ).each( function() {
			fullRoller    = $(this);
			firstItem     = fullRoller.children().first();
			height_Roller = fullRoller.outerHeight(true);

			if ( firstItem.css( "marginTop" ) === "0px" ) {
				// Negative Half the height of the roller ( gets center to top border of view)
				// Add half of the view container height.
				intended_Top  = ( -1 * ( height_Roller / 2 ) ) + ( height_Container / 2 );

				if ( o.flipboxLensAdjust !== false ) { intended_Top += o.flipboxLensAdjust; }

				firstItem.css("margin-top", intended_Top);
			}
		});
	},

	/*
	 * Find the attacment point for the control
	 */
	findAttachPoint : function( isInline ) {
		var w               = this,
			possibleAttach  = w.d.wrap.parent(),
			hardAttachPoint = $( "body" ).find( "#" + w.baseID + "-dbAttach" );
			

		// If [id]-dbAttach exists, that's the attachment point, always.
		if ( hardAttachPoint.length === 1 ) { return hardAttachPoint; }

		// Not inline, either modal or popup
		if ( !isInline ) {
			return $( "body" );
		}

		// Inline or blind
		if ( possibleAttach.hasClass( "form-group" ) ) {
			return possibleAttach;
		} else {
			return w.d.wrap;
		}
	},

	/*
	 * Hide the input element completely.
	 */
	hideInput : function() {
		var w = this,
			hideMe = w.d.wrap.parent();

		if ( hideMe.hasClass("form-group") ) {
			hideMe.hide();
		} else {
			w.d.wrap.hide();
		}
	}
};


