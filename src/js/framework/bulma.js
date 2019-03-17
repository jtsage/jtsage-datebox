 /**
     * JTSage-DateBox
     * @fileOverview Bulma Themes and StyleFunctions
     * This file supports: datebox, flipbox, slidebox, calbox.
     *
     * This framework requires use of [id]-dbAttach ID's. (hella-nest)
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

	theme_dropdownContainer : "card",
	theme_modalContainer : "card",
	theme_inlineContainer : "card",

	theme_headerTheme : "is-dark",
	theme_headerBtnCls : "is-light",
	theme_headerBtnIcn : "cancel",

	theme_cal_Today       : "outline-info",
	theme_cal_DayHigh     : "outline-warning",
	theme_cal_Selected    : "outline-success",
	theme_cal_DateHigh    : "outline-warning",
	theme_cal_DateHighAlt : "outline-danger",
	theme_cal_DateHighRec : "outline-warning",
	theme_cal_Default     : "outline-primary",
	theme_cal_OutOfBounds : "outline-secondary border-0",

	theme_cal_NextBtnIcn : "next",
	theme_cal_NextBtnCls : "outline-dark",
	theme_cal_PrevBtnIcn : "prev",
	theme_cal_PrevBtnCls : "outline-dark",

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
	theme_spanStyle : false,

	buttonIconDate: "calendar",
	buttonIconTime: "clock",

	disabledState  : "disabled",

	clickEvent: "click",
	tranDone: "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend"
});

JTSageDateBox.baseMode = "bootstrap4";

JTSageDateBox.styleFunctions = {
	/*
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

		retty  = "<a href='#' role='button' class='button " + themeClass + "'>";
		retty += ( icon !== false ) ? "<span>" + this.icons.getIcon(icon) + "</span> " : "";
		retty += contents + "</a>";

		return retty;
	},

	/*
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

	/*
	 * Wrap the original input in a div so we can add a button to it
	 */
	baseInputWrap         : function ( originalInput ) { 
		originalInput.closest( ".field" ).addClass( "has-addons" );
		originalInput.closest( ".control" ).addClass( "is-expanded" );
		return originalInput.closest( ".field" );
	},

	/*
	 * Create the open button that is added to the input
	 */
	baseInputButton       : function ( icon, title ) {
		return "<div class=\"control\"><a class=\"button is-primary\">" +
			this.icons.getIcon( icon ) + "</a></div>";
	},

	/*
	 * When not using the open button, we may need to alter the wrap class differently
	 */
	baseInputNoButton     : function (  ) {
		return true;
	},

	/*
	 * Run when the input is focused
	 */
	focusInput            : function (  ) {
		return true;
	},

	/*
	 * Run when the input is un-focused
	 */
	blurInput             : function (  ) {
		return true;
	},

	/*
	 * Make the header for every mode
	 * 
	 * Close button MUST include the "dbCloser" class.
	 * 
	 * @param  {string} text Text of the header
	 * @param  {string} themeBar Theme class for the header
	 * @param  {string} themeIcon Theme for the close button
	 * @param  {string} icon Icon for the close button ( name or SVG )
	 * @return {string} Rendered HTML
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox
	 */
	widgetHeader          : function ( text, themeBar, themeIcon, icon ) {
		return "" +
			"<div class=\"navbar " + themeBar + "\"><div class=\"navbar-brand\">" +
			"<strong class=\"navbar-item\">" + text + "</strong>" +
			"</div><div class=\"is-active navbar-menu\">" +
			"<div class=\"navbar-end\"><div class=\"navbar-item\">" +
			this.styleFunctions.button.apply( this, [ themeIcon + " dbCloser", icon, "" ] ) +
			"</div></div></div></div>";

		// return "<div class='navbar " + themeBar + "'>" + 
		// 	"<h5 class='text-white'>" + text + "</h5>" + 
		// 	this.styleFunctions.button.apply( this, [ themeIcon + " dbCloser", icon, "" ] ) +
		// 	"</div>";
	},


	/*
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
			"<div class='is-size-5 has-text-centered dbHeader' style='padding: .3em 0'>" +
			text +
			"</div>"
		);
	},

	/*
	 * Make the header for calbox (month, year, prev/next buttons)
	 * 
	 * Previous button MUST have the "dbCalPrev" class
	 * Next button MUST have the "dbCalNext" class
	 * 
	 * @param  {string} txt Text to display
	 * @param  {string} firstBtnIcn Previous button icon (name or SVG)
	 * @param  {string} firstBtnCls Previous button theme class
	 * @param  {string} secondBtnIcn Next button icon (name or SVG)
	 * @param  {string} secondBtnCls Next button theme class
	 * @return {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox
	 */
	calHeader             : function ( txt, firstBtnIcn, firstBtnCls, secondBtnIcn, secondBtnCls ) {
		var returnVal = $("<div class='my-2 text-center d-flex justify-content-between'>");

		$( this.styleFunctions.button.apply( this, [ 
			firstBtnCls + " mx-2 dbCalPrev",
			firstBtnIcn,
			""
		] ) ).appendTo( returnVal );

		$("<h5>" + txt + "</h5>").appendTo( returnVal );

		$( this.styleFunctions.button.apply( this, [
			secondBtnCls + " mx-2 dbCalNext",
			secondBtnIcn,
			""
		] ) ).appendTo( returnVal );

		return returnVal;
	},

	/*
	 * Create the calbox grid container.  Probably a table
	 * 
	 * @return {object} jQuery object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */
	calGrid               : function () {
		return $( "<div class='w-100 p-1'><table class='dbCalGrid w-100'></table></div>" );
	},

	/*
	 * Create a calbox grid row.  Probably a tr
	 * 
	 * this = styleFunctions
	 * 
	 * @return {object} jQuery object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */
	calRow                : function () {
		return $( "<tr>" );
	},

	/*
	 * Create a clickable box for each grid item in calbox.
	 * 
	 * MUST have the "dbEvent" class
	 * 
	 * @param {object} data Date information object
	 * @param {boolean} data.bad True if the date is invalid
	 * @param {boolean} data.good True if the date is valid
	 * @param {string} data.theme Theme class for the button
	 * @param {string} data.displayText Text of the date
	 * @param {object} data.dateObj Date object
	 * 
	 * @param  {number} totalElements Number of elements in the row ( 7 or 8 )
	 * @return {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */
	calButton             : function ( data, totalElements ) {
		var style = ( totalElements !== undefined ?
				" style='width: " + ( 100 / totalElements ) + "%'" :
				""
			),
			disable = ( data.bad ? "disabled='disabled'" : ""),
			cls = "class='dbEvent w-100 btn-sm btn btn-" + 
				data.theme + ( data.bad ? " disabled":"" ) + "'";

		return $("<td class='m-0 p-0 text-center'" + style + ">" +
			"<a href='#' " + cls + " " + disable + ">" + 
			data.displayText + 
			"</a>" + "</td>");
	},

	/*
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
		var style = ( totalElements !== undefined ?
				" style='width: " + ( 100 / totalElements ) + "%'" :
				""
			),
			cls = ( header ) ? " font-weight-bold" : "";

		return $("<td class='m-0 p-0 text-center" + cls + "'" + style + ">" + text + "</td>");
	},

	/*
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
		var returnVal = "";

		returnVal += "<div class='row my-2 mx-1'>";

		returnVal += "<div class='col-sm-8 p-0 m-0'>";
		returnVal += this._stdSel( ranges.month, "dbCalPickMonth", "form-control" );
  		returnVal += "</div>";

		returnVal += "<div class='col-sm-4 p-0 m-0'>";
		returnVal += this._stdSel( ranges.year, "dbCalPickYear", "form-control" );
  		returnVal += "</div>";

		returnVal += "</div>";

		return $(returnVal);
	},

	/*
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
		var returnVal = "";

		list.unshift([false, listLabel, true]);

		returnVal += "<div class='row my-2 mx-1'>";
		returnVal += this._stdSel( list, "dbCalPickList", "form-control" );
		returnVal += "</div>";

		return $(returnVal);
	},

	/*
	 * Make the datebox mode container.
	 *
	 * @returns {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */
	dboxContainer         : function () {
		return $("<div>");
	},

	/*
	 * Make the datebox control row
	 *
	 * @returns {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */
	dboxRow               : function () {
		return $("<div class='d-flex p-1'>");
	},

	/*
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

	/*
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

	/*
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

	/*
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

	/*
	 * Make a flipbox roller container (outermost)
	 *
	 * @returns {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */
	fboxRollerContain     : function () {
		return $( "<div class='flex-fill'>" );
	},

	/*
	 * Make a flipbox roller container (middle) - usually a UL
	 *
	 * @returns {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */	
	fboxRollerParent      : function () {
		return $( "<ul class='list-group'>" );
	},

	/*
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

	/*
	 * Make the flipbox lens
	 *
	 * @returns {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */
	fboxLens              : function () {
		return $( "<div class='p-4 border border-dark shadow mx-1'>" );
	},

	/*
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

	/*
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

	/*
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

	/*
	 * Make the grid container for slidebox (usually a table)
	 *
	 * @returns {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */
	slideGrid               : function () {
		return $( "<div class='w-100 py-1'><table class='dbSlideGrid w-100'></table></div>" );
	},

	/*
	 * Make the grid for for slidebox (usually a TR)
	 *
	 * @returns {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */
	slideRow                : function () {
		return $( "<tr>" );
	},

	/*
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

	/*
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
};
