 /**
     * JTSage-DateBox
     * @fileOverview BootStrap v4 Themes and StyleFunctions
     * This file supports: datebox, flipbox, slidebox, calbox.
	 * 
	 * Note that icons work differently in jQM, they are the built in icon classes, as jQM
	 * may run on devices that lack SVG support.
	 * 
     * @author J.T.Sage <jtsage+datebox@gmail.com>
     * @author {@link https://github.com/jtsage/jtsage-datebox/contributors|GitHub Contributors}
     * @license {@link https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt|MIT}
     * @version 5.0.0
     *
     */

mergeOpts({
	theme_clearBtnCls : "a",
	theme_clearBtnIcn : "recycle",

	theme_closeBtnCls : "a",
	theme_closeBtnIcn : "check",

	theme_cancelBtnCls : "a",
	theme_cancelBtnIcn : "delete",

	theme_tomorrowBtnCls : "a",
	theme_tomorrowBtnIcn : "action",

	theme_todayBtnCls : "a",
	theme_todayBtnIcn : "action",

	theme_dropdownContainer : "ui-body-a",
	theme_modalContainer    : "ui-body-a",
	theme_inlineContainer   : "ui-body-a",

	theme_headerTheme  : "inherit",
	theme_headerBtnCls : "a",
	theme_headerBtnIcn : "delete",

	theme_cal_Today       : "b",
	theme_cal_DayHigh     : "b",
	theme_cal_Selected    : "active",
	theme_cal_DateHigh    : "b",
	theme_cal_DateHighAlt : "b",
	theme_cal_DateHighRec : "b",
	theme_cal_Default     : "a",
	theme_cal_OutOfBounds : "a",

	theme_cal_NextBtnIcn : "plus",
	theme_cal_NextBtnCls : "a",
	theme_cal_PrevBtnIcn : "minus",
	theme_cal_PrevBtnCls : "a",

	theme_dbox_NextBtnIcn : "plus",
	theme_dbox_NextBtnCls : "outline-dark",
	theme_dbox_PrevBtnIcn : "minus",
	theme_dbox_PrevBtnCls : "outline-dark",

	theme_fbox_Selected   : "success",
	theme_fbox_Default    : "light",
	theme_fbox_Forbidden  : "danger",
	theme_fbox_RollHeight : "135px",

	theme_slide_Today       : "outline-info",
	theme_slide_DayHigh     : "outline-warning",
	theme_slide_Selected    : "outline-success",
	theme_slide_DateHigh    : "outline-warning",
	theme_slide_DateHighAlt : "outline-danger",
	theme_slide_DateHighRec : "outline-warning",
	theme_slide_Default     : "outline-primary",

	theme_slide_NextBtnIcn     : "plus",
	theme_slide_NextBtnCls     : "outline-dark border-0",
	theme_slide_PrevBtnIcn     : "minus",
	theme_slide_PrevBtnCls     : "outline-dark border-0",
	theme_slide_NextDateBtnIcn : "next",
	theme_slide_NextDateBtnCls : "outline-dark border-0",
	theme_slide_PrevDateBtnIcn : "prev",
	theme_slide_PrevDateBtnCls : "outline-dark border-0",

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

JTSageDateBox.baseMode = "bootstrap4";

JTSageDateBox.styleFunctions = {
	/*
     * Make a button
     */
	button                : function( themeClass, icon, contents ) {
		var retty;

		retty  = "<a href='#' role='button' class='ui-btn ui-mini ui-btn-" + themeClass + "";
		retty += ( icon !== false ) ? " ui-icon-" + icon : "";
		retty += ( contents === "" ) ? " ui-corner-all ui-btn-icon-notext" : " ui-btn-icon-left";
		retty += "'>" + contents + "</a>";

		return retty;
	},

	/*
	 * Make a button group
	 */
	buttonGroup           : function ( ) {
		var style = "style='margin: 0 .446em'";

		return $("<div " + style + " class='ui-controlgroup-controls'>");
	},

	buttonGroupOutside    : function ( collapse, inner ) {
		// DOES NOT WORK YET.
		var cls = ( collapse === true ) ? "ui-controlgroup-horizontal" : "ui-controlgroup-vertical";

		inner.find( ".ui-btn" ).last().addClass( "ui-last-child" );
		return $("<div class='ui-controlgroup " + cls + "'>").append( inner );
	},

	/**
	 * Wrap the original input in a div so we can add a button to it
	 * 
	 * @param  {object} originalInput Original input element, jQuery object
	 * @return {object} jQuery object now wrapped with some sort of div
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox
	 */
	baseInputWrap         : function ( originalInput ) { 
		/* Set up a wrap around the input for styling, and return it */
		return originalInput.wrap("<div class='input-group'>").parent();
	},

	/**
	 * Create the open button that is added to the input
	 * 
	 * MUST contain dbOpenButton class. (outer)
	 * 
	 * @param  {string} icon Icon to use (name or SVG)
	 * @param  {string} title Hover text for the button
	 * @return {string} Rendered HTML of the open button
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox
	 */
	baseInputButton       : function ( icon, title ) {
		return "<div class='dbOpenButton input-group-append' title='" + title + "'>" +
			"<div class='input-group-text'>" + 
			"<span>" + this.icons.getIcon( icon ) + "</span>" + 
			"</div></div>";
	},

	/**
	 * When not using the open button, we may need to alter the wrap class differently
	 * 
	 * @param  {object} originalInputWrap jQuery object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */
	baseInputNoButton     : function ( originalInputWrap ) {
		originalInputWrap.addClass( "w-100" );
	},

	/**
	 * Run when the input is focused
	 * 
	 * @param  {object} originalInput jQuery object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */
	focusInput            : function ( originalInput ) {
		originalInput.addClass( "ui-focus" );
	},

	/**
	 * Run when the input is un-focused
	 * 
	 * this = styleFunctions
	 * 
	 * @param  {object} originalInput jQuery object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */
	blurInput             : function ( originalInput ) {
		originalInput.removeClass( "ui-focus" );
	},

	/*
	 * Make the header for every mode
	 */
	widgetHeader          : function ( text, themeBar, themeIcon, icon ) {
		return "<div class='ui-header ui-bar-" + themeBar + "'>" + 
			"<h1 class='ui-title'>" + text + "</h5>" + 
			this.styleFunctions.button.apply(
				this,
				[ themeIcon + " dbCloser ui-btn-right", icon, "" ]
			) +
			"</div>";
	},

	/**
	 * Make an internal header ( datebox & flipbox )
	 * 
	 * MUST have the "dbHeader" class
	 * 
	 * @param  {string} text Text to display
	 * @return {object} jQuery object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */
	intHeader             : function ( text ) {
		return $(
			"<div class='dbHeader'>" +
			"<h3 style='text-align:center'>" + text + "</h3>" +
			"</div>"
		);
	},

	/*
	 * Make the header for something (month, year, prev/next buttons)
	 */
	genHeader             : function ( txt, icn1, cls1, icn2, cls2, ctl1, ctl2 ) {
		var returnVal = $("<div class='ui-header' style='border:0; padding: 0 3px 8px;'>");

		$( this.styleFunctions.button.apply( this, [ 
			cls1 + " ui-btn-left " + ctl1,
			icn1,
			""
		] ) ).appendTo( returnVal );

		$("<h1 class='ui-title' style='margin: 0 15%'>" + txt + "</h1>").appendTo( returnVal );

		$( this.styleFunctions.button.apply( this, [
			cls2 + " ui-btn-right " + ctl2,
			icn2,
			""
		] ) ).appendTo( returnVal );

		return returnVal;
	},

	/*
	 * Make the header for calbox (month, year, prev/next buttons)
	 */
	calHeader             : function ( txt, firstBtnIcn, firstBtnCls, secondBtnIcn, secondBtnCls ) {
		return this.styleFunctions.genHeader.apply( this, [
			txt,
			firstBtnIcn,
			firstBtnCls,
			secondBtnIcn,
			secondBtnCls,
			"dbCalPrev",
			"dbCalNext"
		] );
	},

	/*
	 * Create the calbox grid container.  Probably a table
	 */
	calGrid               : function () {
		return $(
            "<div><table class='dbCalGrid' style='width: 100%'></table></div>"
        );
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
				"padding:0",
				"margin:0",
				"width:" + ( 100 / totalElements ) + "%"
			],
			styles_A  = [
				"margin:0",
				"padding-right:0",
				"padding-left:0"
			],
			class_A   = [
				"dbEvent",
				"ui-btn",
				"ui-mini",
				"ui-btn-" + data.theme,
				( data.bad ? "ui-disabled" : "" )
			],
			disable   = ( data.bad ? "disabled='disabled'" : "");
		
		return $( 
			"<td style='" + styles_TD.join( ";" ) + "'>" +
			"<a style='" + styles_A.join( ";" ) +
				"' class='" + class_A.join( " " ) + "' href='#' " + disable + ">" +
			data.displayText +
			"</a></td>"
		);
	},

	/*
	 * Create a non-button calbox grid box
	 */
	calNonButton          : function ( text, header, totalElements ) {
		var styles = [
				"text-align:center",
				"padding:0",
				"margin:0",
				"width:" + ( 100 / totalElements ) + "%",
				( header ) ? "font-weight:bold" : ""
			];

		return $("<td style='" + styles.join( ";" ) + "'>" + text + "</td>");
	},

	/* Generic pickers */
	genPickers            : function ( ranges, ctlMonth, ctlYear ) {
		var returnVal = "<div style='padding-bottom: 8px' class='" +
			"ui-controlgroup ui-controlgroup-horizontal ui-corner-all ui-mini'>";

		returnVal += "<div class='ui-controlgroup-controls' style='width:100%'>";

		returnVal += "<div class='ui-select' style='width:60%'>";
		returnVal += "<div id='" + ctlMonth + "-button' " + 
			"class='ui-btn ui-icon-carat-d ui-btn-icon-right ui-corner-all ui-shadow'>";
		$.each( ranges.month, function(idx, value) {
			if ( value[2] === true ) {
				returnVal += "<span>" + value[1] + "</span>";
			}
		});
		returnVal += this._stdSel( ranges.month, ctlMonth, "" );
		returnVal += "</div></div>";

		returnVal += "<div class='ui-select' style='width:40%'>";
		returnVal += "<div id='" + ctlYear + "-button' class='" +
			"ui-btn ui-icon-carat-d ui-btn-icon-right ui-corner-all ui-shadow ui-last-child'>";
		$.each( ranges.year, function(idx, value) {
			if ( value[2] === true ) {
				returnVal += "<span>" + value[1] + "</span>";
			}
		});
		returnVal += this._stdSel( ranges.year, ctlYear, "" );
		returnVal += "</div></div>";

		returnVal += "</div></div>";

		return $(returnVal);
	},

	/*
	 * Create the year and month picker for calbox.
	 */
	calPickers            : function ( ranges ) {
		return this.styleFunctions.genPickers.apply(
			this,
			[ ranges, "dbCalPickMonth", "dbCalPickYear" ]
		);
	},

	/*
	 * Make the calendar drop down quick pick list.
	 */
	genDateList           : function ( listLabel, list, ctl ) {
		var returnVal = "";

		list.unshift([false, listLabel, true]);

		returnVal += "<div class='ui-select'>";
		returnVal += "<div id='" + ctl + "-button' style='margin: 0 .446em 8px;' class='" +
			"ui-mini ui-btn ui-icon-carat-d ui-btn-icon-right ui-corner-all'>";
		
		returnVal += "<span>" + listLabel + "</span>";
		returnVal += this._stdSel( list, ctl, "" );
		returnVal += "</div></div>";

		return $(returnVal);
	},

	calDateList           : function ( listLabel, list ) {
		return this.styleFunctions.genDateList.apply(
			this,
			[ listLabel, list, "dbCalPickList" ]
		);
	},

	/*
	 * Make the datebox mode container.
	 */
	dboxContainer         : function () {
		return $("<table style='width:100%'>");
	},

	/*
	 * Make the datebox control row
	 */
	dboxRow               : function () {
		return $("<tr>");
	},

	/*
	 * Make a datebox +/-/input control
	 */
	dboxControl           : function ( prevIcn, prevCls, nextIcn, nextCls, mainCls, label ) {
		var returnVal = "";

		returnVal += "<td class='dbBox" + mainCls + "'>";

		returnVal += "<a href='#' role='button' class='ui-corner-all ui-btn ui-mini ui-btn-";
		returnVal += nextCls + " ui-icon-" + nextIcn + " ui-btn-icon-top dbBoxNext' ";
		returnVal += "style='margin:0; padding-top:2.1em; border-bottom-left-radius:0;" +
			"border-bottom-right-radius:0;'>";
		returnVal += "</a>";


		if ( label !== null ) {
			returnVal += "<div class='ui-input-text ui-body-inherit' " +
				"style='height:auto; margin:0; padding: .3em 0; text-align:center'>" +
				label + "</div>";
		}

		returnVal += "<div style='margin:0' " +
			"class='ui-input-text ui-mini ui-body-inherit'>";
		returnVal += "<input style='padding:0;text-align:center' type='text'></div>";

		
		returnVal += "<a href='#' role='button' class='ui-corner-all ui-btn ui-mini ui-btn-";
		returnVal += prevCls + " ui-icon-" + prevIcn + " ui-btn-icon-top dbBoxPrev' ";
		returnVal += "style='margin:0; padding-top:2.1em; border-top-left-radius:0;" +
			"border-top-right-radius:0;'>";
		returnVal += "</a>";

		returnVal += "</div>";

		return $(returnVal);
	},

	/**
	 * Make the container for the flipbox
	 *
	 * @param {number} size Height CSS property
	 * @returns {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */
	fboxContainer         : function ( size ) {
		return $(
			"<div class='d-flex border-top border-bottom m-2' style='height: " + 
			size + 
			"; overflow: hidden'>"
		);
	},

	/**
	 * Make a container for flipbox labels
	 *
	 * @returns {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */
	fboxDurLabels         : function ( ) {
		return $(
			"<div class='d-flex mx-2 mt-2' style='margin-bottom: -8px;'>"
		);
	},

	/**
	 * Make a flibox label
	 *
	 * @param {string} text Text of the label
	 * @param {number} items Total number of items
	 * @returns {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */
	fboxDurLabel          : function ( text, items ) {
		return $( 
			"<div class='text-center' style='width: " + ( 100 / items ) + "%'>" + 
			text + 
			"</div>"
		);
	},

	/**
	 * Make a flipbox roller container (outermost)
	 *
	 * @returns {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */
	fboxRollerContain     : function () {
		return $( "<div class='flex-fill'>" );
	},

	/**
	 * Make a flipbox roller container (middle) - usually a UL
	 *
	 * @returns {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */	
	fboxRollerParent      : function () {
		return $( "<ul class='list-group'>" );
	},

	/**
	 * Make a flipbox element (innermost) - usually a LI
	 *
	 * @param {string} text
	 * @param {string} cls
	 * @returns {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */
	fboxRollerChild       : function ( text, cls ) {
		return $( 
			"<li class='list-group-item p-1 text-center list-group-item-" + cls + "'>" + 
			text + 
			"</li>"
		);
	},

	/**
	 * Make the flipbox lens
	 *
	 * @returns {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */
	fboxLens              : function () {
		return $( "<div class='p-4 border border-dark shadow mx-1'>" );
	},

	/**
	 * Make the header for slidebox
	 * 
	 * Previous button MUST have "dbSlidePrev" class
	 * Next button MUST have "sbSlideNext" class
	 *
	 * @param {string} txt Text of header
	 * @param {string} prevBtnIcn Previous button icon ( name or SVG )
	 * @param {string} prevBtnCls Previous button theme class
	 * @param {string} nextBtnIcn Next button icon ( name or SVG )
	 * @param {string} nextBtnCls Nevt button theme class
	 * @returns {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox
	 */
	slideHeader           : function ( txt, prevBtnIcn, prevBtnCls, nextBtnIcn, nextBtnCls ) {
		var returnVal = $("<div class='my-2 text-center d-flex justify-content-between'>");

		$( this.styleFunctions.button.apply( this, [
			prevBtnCls + " mx-2 dbSlidePrev",
			prevBtnIcn,
			""
		] ) ).appendTo( returnVal );

		$("<h5>" + txt + "</h5>").appendTo( returnVal );

		$( this.styleFunctions.button.apply( this, [ 
			nextBtnCls + " mx-2 dbSlideNext",
			nextBtnIcn,
			""
		] ) ).appendTo( returnVal );

		return returnVal;
	},

	/**
	 * Create the year and month picker for slide.
	 * 
	 * Month picker MUST have the "dbSlidePickMonth" class
	 * Year picker MUST have the "dbSlidePickYear" class 
	 *
	 * Consider using {@link JTSageDateBox.html#._stdSel__anchor|_stdSel()}.
	 * 
	 * @param  {object} ranges Year and Month arrays
	 * @param {array} ranges.year Containing arrays of [ value, text, selected (boolean) ]
	 * @param {array} ranges.month Containing arrays of [ value, text, selected (boolean) ]
	 * @return {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox
	 */
	slidePickers            : function ( ranges ) {
		var returnVal = "";

		returnVal += "<div class='row my-2 mx-1'>";

		returnVal += "<div class='col-sm-8 p-0 m-0'>";
		returnVal += this._stdSel( ranges.month, "dbSlidePickMonth", "form-control" );
  		returnVal += "</div>";

		returnVal += "<div class='col-sm-4 p-0 m-0'>";
		returnVal += this._stdSel( ranges.year, "dbSlidePickYear", "form-control" );
  		returnVal += "</div>";

		returnVal += "</div>";

		return $(returnVal);
	},

	/**
	 * Make the slidebox drop down quick pick list.
	 * 
	 * Consider using {@link JTSageDateBox.html#._stdSel__anchor|_stdSel()}
	 *
	 * @param {string} listLabel Label for the list
	 * @param {array} list Containing arrays of [ value, text, selected (boolean) ]
	 * @return {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox
	 */
	slideDateList           : function ( listLabel, list ) {
		var returnVal = "";

		list.unshift([false, listLabel, true]);

		returnVal += "<div class='row my-2 mx-1'>";
		returnVal += this._stdSel( list, "dbSlidePickList", "form-control" );
		returnVal += "</div>";

		return $(returnVal);
	},

	/**
	 * Make the grid container for slidebox (usually a table)
	 *
	 * @returns {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */
	slideGrid               : function () {
		return $( "<div class='w-100 py-1'><table class='dbSlideGrid w-100'></table></div>" );
	},

	/**
	 * Make the grid for for slidebox (usually a TR)
	 *
	 * @returns {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */
	slideRow                : function () {
		return $( "<tr>" );
	},

	/**
	 * Create a clickable box for each grid date in slidebox.
	 * 
	 * MUST have the "dbEventS" class
	 * 
	 * @param {object} data Date information object
	 * @param {boolean} data.bad True if the date is invalid
	 * @param {boolean} data.good True if the date is valid
	 * @param {string} data.theme Theme class for the button
	 * @param {object} data.dateObj Date object
	 * 
	 * @return {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */
	slideDateButton         : function ( data ) {
		var style   = " style='width: " + ( ( 100 / 8 ) ) + "%'",
			disable = ( data.bad ? "disabled='disabled'" : ""),
			cls     = "class='dbEventS w-100 rounded-circle btn-sm btn btn-" +
				data.theme + ( data.bad ? " disabled":"" ) + "'";

		return $("<td class='m-0 p-0 text-center'" + style + ">" +
			"<a href='#' " + cls + " " + disable + ">" + 
			"<small>" + this.__( "daysOfWeekShort")[data.dateObj.getDay()] +
			"</small><br>" + data.dateObj.getDate() +  
			"</a>" + "</td>");
	},

	/**
	 * Create next/prev week buttons for slidebox
	 *
	 * @param {string} eventCls The event class.  Should be placed on the button
	 * @param {string} icon Icon to use for button ( name or SVG )
	 * @param {string} theme Theme class for button
	 * @returns {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox
	 */
	slideMoveButton         : function ( eventCls, icon, theme ) {
		var style = " style='width: " + ( ( 100 / 8 ) / 2 ) + "%'",
			cls   = "class='w-100 p-1 rounded-circle btn-sm btn btn-" +
				theme + " " + eventCls + "'";

		return $(
			"<td class='m-0 p-0 text-center'" + style + ">" +
			"<a href='#' " + cls + ">" + 
			this.icons.getIcon( icon )  + "</a></td>"
		);
	},

	/**
	 * Position the flip elements.  Overrides the base function if it exists
	 * 
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox
	 */
	flipPosition            : function () {
		var fullRoller, firstItem, height_Roller, intended_Top,
			w                 = this,
			o                 = this.options,
			height_Container  = w.d.intHTML.find( ".dbRollerC" ).height(),
			height_Outside    = w.d.intHTML.find( ".dbRollerV" ).outerHeight( true ),
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

			// No RE-DO's, if it has a style, it's probably right.
			if ( typeof firstItem.attr( "style" ) === "undefined" ) {
					
				height_Roller = fullRoller.outerHeight(false);

				// Negative Half the height of the roller ( gets center to top border of view)
				// Add half of the view container height.
				intended_Top  = ( -1 * ( height_Roller / 2 ) ) + ( height_Container / 2 );

				if ( o.flipboxLensAdjust !== false ) { intended_Top += o.flipboxLensAdjust; }

				firstItem.attr( "style", "margin-top: " + intended_Top + "px !important" );
			}
		});
	}
};
