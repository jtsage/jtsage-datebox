 /**
     * JTSage-DateBox
     * @fileOverview Fomatic UI Themes and StyleFunctions
     * This file supports: datebox, flipbox, slidebox, calbox.
     * 
     * calbox: A+
     * datebox: A+
     * slidebox: A+
     * flipbox: A+
     * 
     * @author J.T.Sage <jtsage+datebox@gmail.com>
     * @author {@link https://github.com/jtsage/jtsage-datebox/contributors|GitHub Contributors}
     * @license {@link https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt|MIT}
     * @version 5.0.0
     *
     */

mergeOpts({
	theme_clearBtnCls : "outline-secondary",
	theme_clearBtnIcn : "clear",

	theme_closeBtnCls : "outline-secondary",
	theme_closeBtnIcn : "check",

	theme_cancelBtnCls : "outline-secondary",
	theme_cancelBtnIcn : "cancel",

	theme_tomorrowBtnCls : "outline-secondary",
	theme_tomorrowBtnIcn : "goto",

	theme_todayBtnCls : "outline-secondary",
	theme_todayBtnIcn : "goto",

	theme_dropdownContainer : "ui card",
	theme_modalContainer    : "ui card",
	theme_inlineContainer   : "ui card",

	theme_headerTheme  : "inverted borderless",
	theme_headerBtnCls : false, // UN-USED
	theme_headerBtnIcn : "cancel",

	theme_cal_Today       : "info",
	theme_cal_DayHigh     : "outline-warning",
	theme_cal_Selected    : "success",
	theme_cal_DateHigh    : "outline-warning",
	theme_cal_DateHighAlt : "outline-danger",
	theme_cal_DateHighRec : "outline-warning",
	theme_cal_Default     : "outline-primary",
	theme_cal_OutOfBounds : "outline-secondary border-0",

	theme_cal_NextBtnIcn : "next",
	theme_cal_NextBtnCls : "outline-dark",
	theme_cal_PrevBtnIcn : "prev",
	theme_cal_PrevBtnCls : "outline-dark",

	theme_cal_Pickers  : false, // UNUSED
	theme_cal_DateList : false, // UNUSED

	theme_dbox_NextBtnIcn : "plus",
	theme_dbox_NextBtnCls : "outline-dark",
	theme_dbox_PrevBtnIcn : "minus",
	theme_dbox_PrevBtnCls : "outline-dark",
	theme_dbox_Inputs     : false, //UNUSED

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

JTSageDateBox.baseMode = "bootstrap4";

JTSageDateBox.styleFunctions = {
	/**
	 * Make a button
	 * 
	 * @param  {string} themeClass Theme class for the button
	 * @param  {string} icon Icon to use (name or SVG)
	 * @param  {string} contents Text contents of the button (if any)
	 * @return {string} Created button
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox
	 */
	button                : function( themeClass, icon, contents ) {
		var retty;

		retty  = "<a href='#' role='button' class='btn btn-sm btn-" + themeClass + "'>";
		retty += ( icon !== false ) ? "<span>" + this.icons.getIcon(icon) + "</span> " : "";
		retty += contents + "</a>";

		return retty;
	},

	/**
	 * Make a button group
	 * 
	 * @param  {boolean} collapse Attempt to display buttons on one line
	 * @return {object} jQuery object of a button group that buttons can be appended to 
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */
	buttonGroup           : function ( collapse ) {
		var cls = ( collapse === true ) ? "btn-group" : "btn-group-vertical";

		return $("<div class='" + cls + " w-100 p-1'>");
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
		return "<div class='ui menu " + themeBar + "'>" + 
			"<div class='item'>" + text + "</div>" + 
			"<div class='right menu'>" + 
			"<a class='item dbCloser' href='#'>" + this.icons.getIcon( icon ) + "</a>" + 
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
			"<div class='my-2 text-center dbHeader'><h5>" + text + "</h5></div>"
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

	/**
	 * Create a clickable box for each grid item in calbox.
	 * 
	 * MUST have the "dbEvent" class
	 * 
	 * @param {object}  data             Date information object
	 * @param {boolean} data.bad         True if the date is invalid
	 * @param {boolean} data.good        True if the date is valid
	 * @param {string}  data.theme       Theme class for the button
	 * @param {string}  data.displayText Text of the date
	 * @param {object}  data.dateObj     Date object
	 * 
	 * @param  {number} totalElements Number of elements in the row ( 7 or 8 )
	 * @return {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */
	calButton             : function ( data, totalElements ) {
		var styles_TD = [
				"width : " + ( 100 / totalElements ) + "%"
			],
			class_TD = [
				"m-0",
				"p-0",
				"text-center"
			],
			class_A = [
				"dbEvent",
				"w-100",
				"btn-sm",
				"btn",
				"btn-" + data.theme,
				( data.bad ? " disabled":"" )
			],
			disable = ( data.bad ? "disabled='disabled'" : "" );

		return $(
			"<td class='" + class_TD.join( " " ) + "' style='" + styles_TD.join( ";" ) + "'>" +
			"<a href='#' class='" + class_A.join( " " ) + "' " + disable + ">" + 
			data.displayText + 
			"</a>" + "</td>"
		);
	},

	/**
	 * Create a non-button calbox grid box
	 * 
	 * @param  {string} text Text to display
	 * @param  {boolean} header Is this a header (bold?)
	 * @param  {number} totalElements Number of elements in the row ( 7 or 8 )
	 * @return {object} jQuery object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */
	calNonButton          : function ( text, header, totalElements ) {
		var styles_TD =
				"width : " + ( 100 / totalElements ) + "%",
			class_TD = [
				"m-0",
				"p-0",
				"text-center",
				( header ) ? "font-weight-bold" : ""
			];

		return $(
			"<td class='" + class_TD.join( " " ) + "' style='" + styles_TD + "'>" + text + "</td>"
		);
	},

	/**
	 * Create the year and month picker for calbox / slidebox
	 * 
	 * @param  {object} ranges Year and Month arrays
	 * @param {array} ranges.year Containing arrays of [ value, text, selected (boolean) ]
	 * @param {array} ranges.month Containing arrays of [ value, text, selected (boolean) ]
	 * @param {string} monthCtl Control class for month picker
	 * @param {string} yearCtl Control class for year picker
	 * @return {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox
	 */
	genPickers            : function ( ranges, monthCtl, yearCtl ) {
		var returnVal = "";

		returnVal += "<div class='row my-2 mx-1'>";

		returnVal += "<div class='col-8 p-0 m-0'>";
		returnVal += this._stdSel( ranges.month, monthCtl, "form-control" );
  		returnVal += "</div>";

		returnVal += "<div class='col-4 p-0 m-0'>";
		returnVal += this._stdSel( ranges.year, yearCtl, "form-control" );
  		returnVal += "</div>";

		returnVal += "</div>";

		return $(returnVal);
	},

	/**
	 * Create the year and month picker for calbox.
	 * 
	 * Month picker MUST have the "dbCalPickMonth" class
	 * Year picker MUST have the "dbCalPickYear" class 
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
	calPickers            : function ( ranges ) {
		return this.styleFunctions.genPickers.apply( this, [
			ranges,
			"dbCalPickMonth",
			"dbCalPickYear"
		] );
	},

	/**
	 * Make the calbox/slidebox drop down quick pick list.
	 * 
	 * Consider using {@link JTSageDateBox.html#._stdSel__anchor|_stdSel()}
	 *
	 * @param {string} listLabel Label for the list
	 * @param {array} list Containing arrays of [ value, text, selected (boolean) ]
	 * @param {string} ctlCls Control class for select
	 * @return {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox
	 */
	genDateList           : function ( listLabel, list, ctlCls ) {
		var returnVal = "";

		list.unshift([false, listLabel, true]);

		returnVal += "<div class='row my-2 mx-1'>";
		returnVal += this._stdSel( list, ctlCls, "form-control" );
		returnVal += "</div>";

		return $(returnVal);
	},

	/**
	 * Make the calendar drop down quick pick list.
	 * 
	 * Consider using {@link JTSageDateBox.html#._stdSel__anchor|_stdSel()}
	 *
	 * @param {string} listLabel Label for the list
	 * @param {array} list Containing arrays of [ value, text, selected (boolean) ]
	 * @return {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox
	 */
	calDateList           : function ( listLabel, list ) {
		return this.styleFunctions.genDateList.apply( this, [
			listLabel,
			list,
			"dbCalPickList"
		] );
	},

	/**
	 * Make the datebox mode container.
	 *
	 * @returns {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */
	dboxContainer         : function () {
		return $( "<div>" );
	},

	/**
	 * Make the datebox control row
	 *
	 * @returns {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */
	dboxRow               : function () {
		return $( "<div class='d-flex p-1'>" );
	},

	/**
	 * Make a datebox +/-/input control
	 * 
	 * Next button MUST have "dbBoxNext" class
	 * Previous button MUST have "dbBoxPrev" class
	 * Container must have "mainCls"
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
	 * Next button MUST have "dbSlideNext" class
	 *
	 * @param {string} txt Text of header
	 * @param {string} prevIcn Previous button icon ( name or SVG )
	 * @param {string} prevCls Previous button theme class
	 * @param {string} nextIcn Next button icon ( name or SVG )
	 * @param {string} nextCls Nevt button theme class
	 * @returns {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox
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
		return this.styleFunctions.genPickers.apply( this, [
			ranges,
			"dbSlidePickMonth",
			"dbSlidePickYear"
		] );
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
		return this.styleFunctions.genDateList.apply( this, [
			listLabel,
			list,
			"dbSlidePickList"
		] );
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
		var styles_TD = "width: " + ( 100 / 8 ) + "%",
			class_TD = [
				"m-0",
				"p-0",
				"text-center"
			],
			class_A = [
				"dbEventS",
				"w-100",
				"rounded-circle",
				"btn-sm",
				"btn",
				"btn-" + data.theme,
				( data.bad ? "disabled" : "" )
			],
			disable = ( data.bad ? "disabled='disabled'" : "");

		return $(
			"<td class='" + class_TD.join( " " ) + "' style='" + styles_TD + "'>" +
			"<a href='#' class='" + class_A.join( " " ) + "' " + disable + ">" + 
			"<small>" + this.__( "daysOfWeekShort")[data.dateObj.getDay()] + "</small>" +
			"<br>" + data.dateObj.getDate() +  
			"</a></td>");
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
		var styles_TD = "width: " + ( ( 100 / 8 ) / 2 ) + "%",
			class_TD = [
				"m-0",
				"p-0",
				"text-center"
			],
			class_A = [
				"w-100",
				"p-1",
				"rounded-circle",
				"btn-sm",
				"btn",
				"btn-" + theme,
				eventCls
			];

		return $(
			"<td class='" +  class_TD.join( " " ) + "' style='" + styles_TD + "'>" +
			"<a href='#' class='" + class_A.join( " " ) + "'>" + 
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

				firstItem.css("margin-top", intended_Top);
			}
		});
	},

	/** 
	 * Find the attacment point for the control
	 * 
	 * @param {boolean} isInline control is being inlined
	 * @returns {object} jQuery attachment point
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox
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

	/** 
	 * Hide the input element completely.
	 * 
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox
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
