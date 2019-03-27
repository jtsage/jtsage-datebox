/**
 * JTSage-DateBox
 * @fileOverview Fomantic UI Themes and StyleFunctions
 * This file supports: datebox, flipbox, slidebox, calbox.
 * 
 * calbox: A+
 * datebox: A+
 * slidebox: A+
 * flipbox: A+
 * 
 * As FomanticUI is a fork of SemanticUI, this very well may work, at least in part
 * with that framework as well.
 * 
 * @author J.T.Sage <jtsage+datebox@gmail.com>
 * @author {@link https://github.com/jtsage/jtsage-datebox/contributors|GitHub Contributors}
 * @license {@link https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt|MIT}
 * @version 5.0.0
 */

mergeOpts({
	theme_clearBtnCls : "yellow",
	theme_clearBtnIcn : "clear",

	theme_closeBtnCls : "positive",
	theme_closeBtnIcn : "check",

	theme_cancelBtnCls : "negative",
	theme_cancelBtnIcn : "cancel",

	theme_tomorrowBtnCls : "grey",
	theme_tomorrowBtnIcn : "goto",

	theme_todayBtnCls : "grey",
	theme_todayBtnIcn : "goto",

	theme_dropdownContainer : "ui card form",
	theme_modalContainer    : "ui card form",
	theme_inlineContainer   : "ui card form",

	theme_headerTheme  : "inverted borderless",
	theme_headerBtnCls : false, // UN-USED
	theme_headerBtnIcn : "cancel",

	theme_cal_Today       : "primary",
	theme_cal_DayHigh     : "yellow",
	theme_cal_Selected    : "positive",
	theme_cal_DateHigh    : "red",
	theme_cal_DateHighAlt : "orange",
	theme_cal_DateHighRec : "olive",
	theme_cal_Default     : "basic secondary",
	theme_cal_OutOfBounds : "grey tertiary",

	theme_cal_NextBtnIcn : "next",
	theme_cal_NextBtnCls : false, // UN-USED
	theme_cal_PrevBtnIcn : "prev",
	theme_cal_PrevBtnCls : false, // UN-USED

	theme_cal_Pickers  : false, // UNUSED
	theme_cal_DateList : false, // UNUSED

	theme_dbox_NextBtnIcn : "plus",
	theme_dbox_NextBtnCls : "primary",
	theme_dbox_PrevBtnIcn : "minus",
	theme_dbox_PrevBtnCls : "primary",
	theme_dbox_Inputs     : false, // UNUSED

	theme_fbox_Selected   : "green",
	theme_fbox_Default    : "basic",
	theme_fbox_Forbidden  : "red",
	theme_fbox_RollHeight : "135px",

	theme_slide_Today       : "primary",
	theme_slide_DayHigh     : "yellow",
	theme_slide_Selected    : "positive",
	theme_slide_DateHigh    : "red",
	theme_slide_DateHighAlt : "orange",
	theme_slide_DateHighRec : "olive",
	theme_slide_Default     : "basic secondary",

	theme_slide_NextBtnIcn     : "plus",
	theme_slide_NextBtnCls     : false, // UN-USED
	theme_slide_PrevBtnIcn     : "minus",
	theme_slide_PrevBtnCls     : false, // UN-USED
	theme_slide_NextDateBtnIcn : "next",
	theme_slide_NextDateBtnCls : "tertiary secondary",
	theme_slide_PrevDateBtnIcn : "prev",
	theme_slide_PrevDateBtnCls : "tertiary secondary",

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
	theme_headStyle : false,
	theme_spanStyle : false,

	buttonIconDate : "calendar",
	buttonIconTime : "clock",

	disabledState  : "disabled",

	clickEvent : "click",
	tranDone   : "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend"
});

JTSageDateBox.baseMode = "fomantic";

JTSageDateBox.styleFunctions = {
	/*
	 * Make a button
	 */
	button                : function( themeClass, icon, contents ) {
		var retty;

		retty  = "<a href='#' role='button' class='ui button fluid " + themeClass + "'>";
		retty += ( icon !== false ) ? "<span>" + this.icons.getIcon(icon) + "</span> " : "";
		retty += contents + "</a>";

		return retty;
	},

	/*
	 * Make a button group ( collapse unsupported )
	 */
	buttonGroup           : function ( ) {
		return $("<div style='padding:.3em'>");
	},

	/*
	 * Wrap the original input in a div so we can add a button to it
	 */
	baseInputWrap         : function ( originalInput ) {
		return originalInput.wrap("<div class='ui right action input'>").parent();
	},

	/*
	 * Create the open button that is added to the input
	 */
	baseInputButton       : function ( icon, title ) {
		return "<div class='ui button dbOpenButton' title='" + title + "'>" +
			this.icons.getIcon( icon ) + "</div>";
	},

	/*
	 * When not using the open button, we may need to alter the wrap class differently
	 */
	baseInputNoButton     : function ( ) {
		return true;
	},

	/*
	 * Run when the input is focused
	 */
	focusInput            : function ( ) {
		return true;
	},

	/*
	 * Run when the input is un-focused
	 */
	blurInput             : function ( ) {
		return true;
	},

	/*
	 * Make the header for every mode
	 */
	widgetHeader          : function ( text, themeBar, themeIcon, icon ) {
		return "<div class='ui menu " + themeBar + "'>" +
			"<div class='item'>" + text + "</div>" +
			"<div class='right menu'>" +
			"<a class='item dbCloser' href='#'>" + this.icons.getIcon( icon ) + "</a>" +
			"</div></div>";
	},

	/*
	 * Make an internal header ( datebox & flipbox )
	 */
	intHeader             : function ( text ) {
		return $(
			"<div style='text-align:center' class='dbHeader'><h3>" + text + "</h3></div>"
		);
	},

	/*
	 * Make the header for calbox / slidebox (generic)
	 */
	genHeader             : function ( txt, prevIcn, prevCls, nextIcn, nextCls, prevCtl, nextCtl ) {
		var returnVal = $("<div class='ui three item menu secondary'>");

		$( this.styleFunctions.button.apply( this, [
			prevCls + " item " + prevCtl,
			prevIcn,
			""
		] ) ).appendTo( returnVal );

		$("<div class='item'>" + txt + "</div>").appendTo( returnVal );

		$( this.styleFunctions.button.apply( this, [
			nextCls + " item " + nextCtl,
			nextIcn,
			""
		] ) ).appendTo( returnVal );

		return returnVal;
	},

	/*
	 * Make the header for calbox (month, year, prev/next buttons)
	 */
	calHeader             : function ( txt, prevIcn, prevCls, nextIcn, nextCls ) {
		// Actually use a general header, works for both calbox and slidebox.
		return this.styleFunctions.genHeader.apply( this, [
			txt,
			prevIcn,
			prevCls,
			nextIcn,
			nextCls,
			"dbCalPrev",
			"dbCalNext"
		] );
	},

	/*
	 * Create the calbox grid container.  Probably a table
	 */
	calGrid               : function () {
		return $( "<div><table style='width:100%' class='dbCalGrid'></table></div>" );
	},

	/*
	 * Create a calbox grid row.  Probably a tr
	 */
	calRow                : function () {
		return $( "<tr>" );
	},

	/*
	 * Create a clickable box for each grid item in calbox.
	 */
	calButton             : function ( data, totalElements ) {
		var styles_TD = [
				"width : " + ( 100 / totalElements ) + "%"
			],
			styles_A = [
				"margin: 0",
				"padding-right: 0",
				"padding-left: 0"
			],
			class_A = [
				"dbEvent",
				"ui",
				"button",
				"tiny",
				"fluid",
				data.theme,
				( data.bad ? " disabled":"" )
			],
			disable = ( data.bad ? "disabled='disabled'" : "" );

		return $(
			"<td style='" + styles_TD.join( ";" ) + "'>" +
			"<a href='#' style='" + styles_A.join( ";" ) +
				"' class='" + class_A.join( " " ) + "' " + disable + ">" +
			data.displayText +
			"</a>" + "</td>"
		);
	},

	/*
	 * Create a non-button calbox grid box
	 */
	calNonButton          : function ( text, header, totalElements ) {
		var styles_TD =
				"width : " + ( 100 / totalElements ) + "%; " +
				"text-align : center; " +
				(( header ) ? "font-weight: bold" : "");

		return $(
			"<td style='" + styles_TD + "'>" + text + "</td>"
		);
	},

	/*
	 * Create the year and month picker for calbox / slidebox
	 */
	genPickers            : function ( ranges, monthCtl, yearCtl ) {
		var returnVal = "";

		returnVal += "<div class='ui grid celled'><div class='row'>";

		returnVal += "<div class='nine wide column'>";
		returnVal += this._stdSel( ranges.month, monthCtl, "form-control" );
		returnVal += "</div>";

		returnVal += "<div class='seven wide column'>";
		returnVal += this._stdSel( ranges.year, yearCtl, "form-control" );
		returnVal += "</div>";

		returnVal += "</div></div>";

		return $(returnVal);
	},

	/*
	 * Create the year and month picker for calbox.
	 */
	calPickers            : function ( ranges ) {
		return this.styleFunctions.genPickers.apply( this, [
			ranges,
			"dbCalPickMonth",
			"dbCalPickYear"
		] );
	},

	/*
	 * Make the calbox/slidebox drop down quick pick list.
	 */
	genDateList           : function ( listLabel, list, ctlCls ) {
		var returnVal = "",
			newList = list.slice();


		newList.unshift([false, listLabel, true]);

		returnVal += "<div class='ui grid celled'><div class='row'>";
		returnVal += "<div class='sixteen wide column'>";
		returnVal += this._stdSel( newList, ctlCls, "form-control" );
		returnVal += "</div></div></div>";

		return $(returnVal);
	},

	/*
	 * Make the calendar drop down quick pick list.
	 */
	calDateList           : function ( listLabel, list ) {
		return this.styleFunctions.genDateList.apply( this, [
			listLabel,
			list,
			"dbCalPickList"
		] );
	},

	/*
	 * Make the datebox mode container.
	 */
	dboxContainer         : function () {
		return $( "<div>" );
	},

	/*
	 * Make the datebox control row
	 */
	dboxRow               : function () {
		return $( "<div style='margin: .3em .3em' class='ui equal width grid'>" );
	},

	/*
	 * Make a datebox +/-/input control
	 */
	dboxControl           : function ( prevIcn, prevCls, nextIcn, nextCls, mainCls, label ) {
		var returnVal = "";

		returnVal += "<div style='margin:0;padding:0;' class='column dbBox" + mainCls + "'>";

		returnVal += this.styleFunctions.button.apply( this, [
			nextCls + " top attached dbBoxNext" ,
			nextIcn,
			""
		] );

		if ( label !== null ) {
			returnVal += "<div class='ui fluid label' " +
				"style='border-radius:0; text-align:center; margin:0'>" + label + "</div>";
		}
		returnVal += "<input type='text' ";
		returnVal += "style='border-radius:0;text-align:center;padding-right:0;padding-left:0;'>";

		returnVal += this.styleFunctions.button.apply( this, [
			prevCls + " bottom attached dbBoxPrev" ,
			prevIcn,
			""
		] );

		returnVal += "</div>";
		returnVal = $(returnVal);

		returnVal.find(".dbBoxNext,.dbBoxPrev").css({
			"padding-right" : 0,
			"padding-left"  : 0
		});

		return returnVal;
	},

	/*
	 * Make the container for the flipbox
	 */
	fboxContainer         : function ( size ) {
		return $(
			"<div style='height: " +
			size +
			"; overflow: hidden; margin: .3em .3em 0'>"
		);
	},

	/*
	 * Make a container for flipbox labels
	 */
	fboxDurLabels         : function ( ) {
		return $(
			"<div style='margin: .3em;'>"
		);
	},

	/*
	 * Make a flibox label
	 */
	fboxDurLabel          : function ( text, items ) {
		return $(
			"<div style='text-align: center; display:inline-block; width: " +
			( 100 / items ) + "%'>" + text +
			"</div>"
		);
	},

	/*
	 * Make a flipbox roller container (outermost)
	 */
	fboxRollerContain     : function ( totalElements ) {
		return $( "<div style='float:left; width:" + ( 100 / totalElements ) + "%'>" );
	},

	/*
	 * Make a flipbox roller container (middle) - usually a UL
	 */	
	fboxRollerParent      : function () {
		return $( "<ul style='margin:0; padding:0; list-style-type: none; display:inline;'>" );
	},

	/*
	 * Make a flipbox element (innermost) - usually a LI
	 */
	fboxRollerChild       : function ( text, cls ) {
		var styles = [
			"margin-left:0",
			"margin-right:0",
			"padding-left:0",
			"padding-right:0",
			"text-align:center",
			"display:block"
		];

		return $(
			"<li class='ui label fluid large " + cls + "' " +
			"style='" + styles.join( ";" ) + "'>" +
			text +
			"</li>"
		);
	},

	/*
	 * Make the flipbox lens
	 */
	fboxLens              : function () {
		return $(
			"<div class='label big ui fluid basic primary' style='" +
				"box-shadow: rgba(0, 0, 0, 0.15) 0px 0.5rem 1rem; margin: 0; display:block;" +
				"background-color: transparent;'>&nbsp;</div>"
		);
	},

	/*
	 * Make the header for slidebox
	 */
	slideHeader           : function ( txt, prevIcn, prevCls, nextIcn, nextCls ) {
		return this.styleFunctions.genHeader.apply( this, [
			txt,
			prevIcn,
			prevCls,
			nextIcn,
			nextCls,
			"dbSlidePrev",
			"dbSlideNext"
		] );
	},

	/*
	 * Create the year and month picker for slide.
	 */
	slidePickers            : function ( ranges ) {
		return this.styleFunctions.genPickers.apply( this, [
			ranges,
			"dbSlidePickMonth",
			"dbSlidePickYear"
		] );
	},

	/*
	 * Make the slidebox drop down quick pick list.
	 */
	slideDateList           : function ( listLabel, list ) {
		return this.styleFunctions.genDateList.apply( this, [
			listLabel,
			list,
			"dbSlidePickList"
		] );
	},

	/*
	 * Make the grid container for slidebox (usually a table)
	 */
	slideGrid               : function () {
		return $( "<div><table class='dbSlideGrid' style='width:100%'></table></div>" );
	},

	/*
	 * Make the grid for for slidebox (usually a TR)
	 */
	slideRow                : function () {
		return $( "<tr>" );
	},

	/*
	 * Create a clickable box for each grid date in slidebox.
	 */
	slideDateButton         : function ( data ) {
		var styles_TD = "width: " + ( 100 / 8 ) + "%",
			styles_A = [
				"padding-left: 0",
				"padding-right: 0",
			],
			class_A = [
				"dbEventS",
				"ui",
				"button",
				"fluid",
				"tiny",
				data.theme,
				( data.bad ? "disabled" : "" )
			],
			disable = ( data.bad ? "disabled='disabled'" : "");

		return $(
			"<td style='" + styles_TD + "'>" +
			"<a href='#' style='" + styles_A.join( ";" ) +
				"' class='" + class_A.join( " " ) + "' " + disable + ">" +
			"<small>" + this.__( "daysOfWeekShort")[data.dateObj.getDay()] + "</small>" +
			"<br>" + data.dateObj.getDate() +
			"</a></td>");
	},

	/*
	 * Create next/prev week buttons for slidebox
	 */
	slideMoveButton         : function ( eventCls, icon, theme ) {
		var styles_TD = "width: " + ( ( 100 / 8 ) / 2 ) + "%",
			styles_A = [
				"padding-left: 0",
				"padding-right: 0"
			],
			class_A = [
				"ui",
				"fluid",
				"button",
				"mini",
				"button",
				theme,
				eventCls
			];

		return $(
			"<td style='" + styles_TD + "'>" +
			"<a href='#' style='" + styles_A.join( ";" ) +
				"'class='" + class_A.join( " " ) + "'>" +
			this.icons.getIcon( icon )  + "</a></td>"
		);
	},

	/*
	 * Position the flip elements.  Overrides the base function if it exists
	 */
	flipPosition            : function () {
		var fullRoller, firstItem, height_Roller, intended_Top,
			w                 = this,
			o                 = this.options,
			height_Outside    = w.d.intHTML.find( ".dbRollerV" ).outerHeight(),
			theLens           = w.d.intHTML.find( ".dbLens" ).first(),
			height_Lens       = theLens.outerHeight(true),
			single            = w.d.intHTML.find( ".dbRoller" ).first().children().first();

		// Trap for run too early.
		if ( single.height() < 5 ) { return true; }

		// Lens top:
		// Negative Half the parent height is center.
		// Add Negative half the lens height.
		intended_Top = -1 * ( ( height_Outside / 2 ) + ( height_Lens / 2 ) );
		theLens.css( {
			top          : intended_Top + 7,
			marginBottom : -1 * height_Lens
		} );
		
		w.d.intHTML.find( ".dbRoller" ).each( function() {
			fullRoller    = $(this);
			firstItem     = fullRoller.children().first();

			// No RE-DO's, if it has a style, it's probably right.
			if ( firstItem.css( "marginTop" ) === "0px" ) {
					
				height_Roller = (fullRoller.children().length - 0.5 ) * firstItem.outerHeight();

				// Negative Half the height of the roller ( gets center to top border of view)
				// Add half of the view container height.
				intended_Top  = ( -1 * ( height_Roller / 2 ) ) + ( height_Outside / 2 );

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
		if ( possibleAttach.hasClass( "field" ) ) {
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

		if ( hideMe.hasClass("field") ) {
			hideMe.hide();
		} else {
			w.d.wrap.hide();
		}
	}
};
