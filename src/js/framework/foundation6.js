 /**
     * JTSage-DateBox
     * @fileOverview BootStrap v4 Themes and StyleFunctions
     * This file supports: datebox, flipbox, slidebox, calbox.
     * @author J.T.Sage <jtsage+datebox@gmail.com>
     * @author {@link https://github.com/jtsage/jtsage-datebox/contributors|GitHub Contributors}
     * @license {@link https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt|MIT}
     * @version 5.0.0
     *
     */

mergeOpts({
	theme_clearBtnCls : "secondary",
	theme_clearBtnIcn : "clear",

	theme_closeBtnCls : "secondary",
	theme_closeBtnIcn : "check",

	theme_cancelBtnCls : "secondary",
	theme_cancelBtnIcn : "cancel",

	theme_tomorrowBtnCls : "secondary",
	theme_tomorrowBtnIcn : "goto",

	theme_todayBtnCls : "secondary",
	theme_todayBtnIcn : "goto",

	theme_dropdownContainer : "card",
	theme_modalContainer : "card",
	theme_inlineContainer : "card",

	theme_headerTheme : "bg-dark",
	theme_headerBtnCls : "outline-secondary",
	theme_headerBtnIcn : "cancel",

	theme_cal_Today       : "primary",
	theme_cal_DayHigh     : "warning",
	theme_cal_Selected    : "success",
	theme_cal_DateHigh    : "warning",
	theme_cal_DateHighAlt : "alert",
	theme_cal_DateHighRec : "warning",
	theme_cal_Default     : "hollow primary",
	theme_cal_OutOfBounds : "clear secondary",

	theme_cal_NextBtnIcn : "next",
	theme_cal_NextBtnCls : "hollow secondary",
	theme_cal_PrevBtnIcn : "prev",
	theme_cal_PrevBtnCls : "hollow secondary",

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
		position: "fixed",
		left: 0,
		top: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0,0,0,.4)"
	},
	theme_headStyle : false,
	theme_spanStyle : "card-section",

	controlWidth : "320px",

	buttonIconDate: "calendar",
	buttonIconTime: "clock",

	disabledState  : "disabled",

	clickEvent: "click",
	tranDone: "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend"
});

JTSageDateBox.baseMode = "foundation6";

JTSageDateBox.styleFunctions = {
	/*
	 * Make a button
	 */
	button                : function( themeClass, icon, contents ) {
		var retty;

		retty  = "<a href='#' role='button' class='button small " + themeClass + "'>";
		retty += ( icon !== false ) ? 
			"<span style='display:inline-block;height:16px;line-height:1.5'>" + 
				this.icons.getIcon(icon) + "</span> " :
			"";
		retty += contents + "</a>";

		return retty;
	},

	/*
	 * Make a button group
	 */
	buttonGroup           : function ( collapse ) {
		var cls = ( collapse === true ) ? 
			"button-group small expanded" :
			"button-group stacked small";

		return $("<div class='" + cls + "'>");
	},

	/*
	 * Wrap the original input in a div so we can add a button to it
	 */
	baseInputWrap         : function ( originalInput ) { 
		originalInput.addClass("input-group-field");
		return originalInput.wrap("<div class='input-group'>").parent();
	},

	/*
	 * Create the open button that is added to the input
	 */
	baseInputButton       : function ( icon, title ) {
		return "<span class='input-group-label dbOpenButton'>" + 
			this.icons.getIcon( icon ) +
			"</span>";
	},

	/*
	 * When not using the open button, we may need to alter the wrap class differently
	 * 
	 * @param  {object} originalInputWrap jQuery object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */
	baseInputNoButton     : function ( originalInputWrap ) {
		return true;
		//originalInputWrap.addClass( "w-100" );
	},

	/*
	 * Run when the input is focused
	 */
	focusInput            : function ( originalInput ) {
		return true;
	},

	/*
	 * Run when the input is un-focused
	 */
	blurInput             : function ( originalInput ) {
		return true;
	},

	/*
	 * Make the header for every mode
	 */
	widgetHeader          : function ( text, themeBar, themeIcon, icon ) {
		return "<div class='title-bar'>" + 
			"<div class='title-bar-left'>" +
			"<span class='title-bar-title'>" + text + "</span>" + 
			"</div><div class='title-bar-right'>" +
			"<button class='dbCloser " + themeIcon + "' style='color:white' type='button'>" + 
			this.icons.getIcon(icon) + "</button>" +
			"</div></div>";
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
			"<div class='my-2 text-center dbHeader'>" +
			"<h5>" + text + "</h5>" +
			"</div>"
		);
	},

	/*
	 * Make the header for calbox (month, year, prev/next buttons)
	 */
	calHeader             : function ( txt, firstBtnIcn, firstBtnCls, secondBtnIcn, secondBtnCls ) {
		var returnVal = $("<div class='grid-x'>");

		$("<div class='cell small-2'>").append(
			$( this.styleFunctions.button.apply( this, [ 
				firstBtnCls + " expanded dbCalPrev",
				firstBtnIcn,
				""
			] ) )
		).appendTo( returnVal );

		$("<div class='cell small-8 text-center'><h5>" + txt + "</h5></div>").appendTo( returnVal );

		$("<div class='cell small-2'>").append(
			$( this.styleFunctions.button.apply( this, [
				secondBtnCls + " expanded dbCalNext",
				secondBtnIcn,
				""
			] ) )
		).appendTo( returnVal );

		return returnVal;
	},

	/*
	 * Create the calbox grid container.  Probably a table
	 */
	calGrid               : function () {
		return $( "<div><table class='dbCalGrid' style='width:100%'></table></div>" );
	},

	/**
	 * Create a calbox grid row.  Probably a tr
	 */
	calRow                : function () {
		return $( "<tr>" );
	},

	/*
	 * Create a clickable box for each grid item in calbox.
	 */
	calButton             : function ( data, totalElements ) {
		var style = ( totalElements !== undefined ?
				" style='width: " + ( 100 / totalElements ) + "%'" :
				""
			),
			disable = ( data.bad ? "disabled='disabled'" : ""),
			cls = "class='dbEvent button expanded " + 
				(( totalElements > 7 ) ? "tiny " : "small ") +
				data.theme + ( data.bad ? " disabled":"" ) + "'";

		return $("<td class='text-center'" + style + ">" +
			"<a style='margin-bottom:0;' href='#' " + cls + " " + disable + ">" + 
			data.displayText + 
			"</a>" + "</td>");
	},

	/*
	 * Create a non-button calbox grid box
	 */
	calNonButton          : function ( text, header, totalElements ) {
		var style = ( totalElements !== undefined ?
				" style='width: " + ( 100 / totalElements ) + "%'" :
				""
			),
			cls = ( header ) ? " font-weight-bold" : "";

		return $("<td class='text-center" + cls + "'" + style + ">" + text + "</td>");
	},

	/*
	 * The year and month picker for calbox.
	 */
	calPickers            : function ( ranges ) {
		var returnVal = "";

		returnVal += "<div class='grid-x'>";

		returnVal += "<div class='cell small-8'>";
		returnVal += this._stdSel( ranges.month, "dbCalPickMonth", "form-control" );
  		returnVal += "</div>";

		returnVal += "<div class='cell small-4'>";
		returnVal += this._stdSel( ranges.year, "dbCalPickYear", "form-control" );
  		returnVal += "</div>";

		returnVal += "</div>";

		return $(returnVal);
	},

	/*
	 * Make the calendar drop down quick pick list.
	 */
	calDateList           : function ( listLabel, list ) {
		var returnVal = "";

		list.unshift([false, listLabel, true]);

		returnVal += "<div>";
		returnVal += this._stdSel( list, "dbCalPickList", "form-control" );
		returnVal += "</div>";

		return $(returnVal);
	},

	/**
	 * Make the datebox mode container.
	 *
	 * @returns {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */
	dboxContainer         : function () {
		return $("<div>");
	},

	/**
	 * Make the datebox control row
	 *
	 * @returns {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */
	dboxRow               : function () {
		return $("<div class='d-flex p-1'>");
	},

	/**
	 * Make a datebox +/-/input control
	 * 
	 * Next button MUST have "dbBoxNext" class
	 * Previous button MUST have "dbBoxPrev" class
	 *
	 * @param {string} prevIcn Previous button icon (name or SVG)
	 * @param {string} prevCls Previous button theme class
	 * @param {string} nextIcn Next button icon (name of SVG)
	 * @param {string} nextCls Next button theme class
	 * @param {string} mainCls Class for the control (input type)
	 * @param {string} label Label, if needed
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox
	 * @returns {object} jQuery Object
	 */
	dboxControl           : function ( prevIcn, prevCls, nextIcn, nextCls, mainCls, label ) {
		var returnVal = "";

		returnVal += "<div class='btn-group-vertical flex-fill dbBox" + mainCls + "'>";

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
		returnVal += "class='form-control form-control-sm text-center px-0 rounded-0'>";

		returnVal += this.styleFunctions.button.apply( this, [
			prevCls + " dbBoxPrev" ,
			prevIcn,
			""
		] );

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
			"<td class='m-0 p-1 text-center'" + style + ">" +
			"<a href='#' " + cls + ">" + 
			this.icons.getIcon( icon )  + "</a></td>"
		);
	},
};
