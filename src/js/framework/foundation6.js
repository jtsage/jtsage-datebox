/**
 * JTSage-DateBox
 * @fileOverview BootStrap v4 Themes and StyleFunctions
 * This file supports: datebox, flipbox, slidebox, calbox.
 *
 * calbox: A+
 * datebox: A+
 * slidebox: A- (not a fan of the tiny button)
 * flipbox: A- (still kinda meh)
 * 
 * @author J.T.Sage <jtsage+datebox@gmail.com>
 * @author {@link https://github.com/jtsage/jtsage-datebox/contributors|GitHub Contributors}
 * @license {@link https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt|MIT}
 * @version 5.0.0
 * @todo  FlipBox Mode
 */

mergeOpts({
	theme_clearBtn    : [ "clear",  "secondary" ],
	theme_closeBtn    : [ "check",  "secondary" ],
	theme_cancelBtn   : [ "cancel", "secondary" ],
	theme_tomorrowBtn : [ "goto",   "secondary" ],
	theme_todayBtn    : [ "goto",   "secondary" ],

	theme_dropdownContainer : "card",
	theme_modalContainer    : "card",
	theme_inlineContainer   : "card",

	theme_headerTheme  : "bg-dark",
	theme_headerBtn    : [ "cancel", false ],
	theme_openButton   : "",

	theme_cal_Today       : "primary",
	theme_cal_DayHigh     : "warning",
	theme_cal_Selected    : "success",
	theme_cal_DateHigh    : "warning",
	theme_cal_DateHighAlt : "alert",
	theme_cal_DateHighRec : "warning",
	theme_cal_Default     : "hollow primary",
	theme_cal_OutOfBounds : "clear secondary",

	theme_cal_NextBtn : [ "next", "hollow secondary" ],
	theme_cal_PrevBtn : [ "prev", "hollow secondary" ],

	theme_cal_Pickers  : false, // UNUSED
	theme_cal_DateList : false, // UNUSED

	theme_dbox_NextBtn    : [ "plus", "hollow seconday" ],
	theme_dbox_PrevBtn    : [ "minus","hollow seconday" ],
	theme_dbox_Inputs     : false, //UNUSED

	theme_fbox_Selected   : "success",
	theme_fbox_Default    : "primary",
	theme_fbox_Forbidden  : "danger",
	theme_fbox_RollHeight : "135px",

	theme_slide_Today       : "primary",
	theme_slide_DayHigh     : "warning",
	theme_slide_Selected    : "success",
	theme_slide_DateHigh    : "warning",
	theme_slide_DateHighAlt : "danger",
	theme_slide_DateHighRec : "warning",
	theme_slide_Default     : "hollow secondary",

	theme_slide_NextBtn     : [ "plus", "clear secondary" ],
	theme_slide_PrevBtn     : [ "minus","clear secondary" ],
	theme_slide_NextDateBtn : [ "next", "clear secondary" ],
	theme_slide_PrevDateBtn : [ "prev", "clear secondary" ],

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
	theme_spanStyle : "card-section",

	controlWidth : "320px",

	buttonIconDate : "calendar",
	buttonIconTime : "clock",

	disabledState  : "disabled",

	clickEvent : "click",
	tranDone   : "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend"
});


/*
 * Find the attacment point for the control
 * 
 * @param {boolean} isInline control is being inlined
 * @returns {object} jQuery attachment point
 */
JTSageDateBox.style_attach = function( isInline ) {
	var w               = this, last, exitLoop = 0,
		possibleAttach  = w.d.wrap,
		hardAttachPoint = $( "body" ).find( "#" + w.baseID + "-dbAttach" );
		

	// If [id]-dbAttach exists, that's the attachment point, always.
	if ( hardAttachPoint.length === 1 ) { return hardAttachPoint; }

	// Not inline, either modal or popup
	if ( !isInline ) {
		return $( "body" );
	}

	// Inline or blind
	last = possibleAttach;
	for (;;) {
		exitLoop++;
		possibleAttach = possibleAttach.parent();
		if ( possibleAttach.is( "form" ) ) { return last; }
		if ( exitLoop > 20 ) { return $( "body" ); }
		last = possibleAttach;
	}
};

/*
 * Make a button
 * 
 * @param  {array} theme Theme class and icon for the button
 * @param  {string} contents Text contents of the button (if any)
 * @return {string} Created button
 */

JTSageDateBox.style_btn = function( theme, contents, styleOverride ) {
	var retty, style = "";

	contents = ( typeof contents === "undefined" ) ? "" : contents;

	if ( typeof styleOverride !== "undefined" && styleOverride !== "") {
		style = "style='" + styleOverride + "'";
	}

	retty  = "<a href='#' role='button' " + style + " class='button small " + theme[1] + "'>";
	retty += ( theme[0] !== false ) ?
		"<span style='display:inline-block;height:16px;line-height:1.5'>" +
			this.icons.getIcon.call( this, theme[0] ) + "</span> " :
		"";
	retty += contents + "</a>";

	return retty;
};

/*
 * Make a button group
 * 
 * @param  {boolean} collapse Attempt to display buttons on one line
 * @return {object} jQuery object of a button group that buttons can be appended to
 */
JTSageDateBox.style_btnGrp = function ( collapse ) {
	var cls = ( collapse === true ) ?
		"button-group small expanded" :
		"button-group stacked small";

	return $("<div class='" + cls + "'>");
};

/*
 * Wrap the original input in a div so we can add a button to it
 * 
 * @param  {object} originalInput Original input element, jQuery object
 * @param  {string} Theme class
 * @return {object} jQuery object now wrapped with some sort of div
 */
JTSageDateBox.style_inWrap = function ( originalInput ) {
	originalInput.addClass("input-group-field");
	return originalInput.wrap("<div class='input-group'>").parent();
};

/*
 * Create the open button that is added to the input
 * 
 * MUST contain dbOpenButton class. (outer)
 * 
 * @param  {string} icon Icon to use (name or SVG)
 * @param  {string} title Hover text for the button
 * @return {string} Rendered HTML of the open button
 */
JTSageDateBox.style_inBtn = function ( icon, title, theme ) {
	return "<div class='input-group-button'>" +
		"<a href='#' style='line-height:2.3' role='button' title='" + title +
		"' class='button " + theme + " dbOpenButton'>" +
		this.icons.getIcon.call( this, icon ) +
		"</a></div>";
};

/*
 * When not using the open button, we may need to alter the wrap class differently
 * 
 * @param  {object} originalInputWrap jQuery object
 */
JTSageDateBox.style_inNoBtn = function ( ) {
	return true;
};

/*
 * Hide the input element completely.
 */
JTSageDateBox.style_inHide = function() {
	var w          = this,
		last       = w.d.wrap,
		exitLoop   = 0,
		hideMe     = w.d.wrap;

	for (;;) {
		exitLoop++;
		hideMe = hideMe.parent();
		if ( hideMe.is( "form" ) ) { last.hide(); return true; }
		if ( exitLoop > 20 ) { w.d.wrap.hide(); return true; }
		last = hideMe;
	}
};

/*
 * Make the header for every mode
 * 
 * Close button MUST include the "dbCloser" class.
 * 
 * @param  {string} text Text of the header
 * @param  {string} themeBar Theme class for the header
 * @param  {string} themeButton Icon & Theme for the close button
 * @return {string} Rendered HTML
 */
JTSageDateBox.style_mainHead = function ( text, themeBar, themeButton ) {
	return "<div class='title-bar'>" +
		"<div class='title-bar-left'>" +
		"<span class='title-bar-title'>" + text + "</span>" +
		"</div><div class='title-bar-right'>" +
		"<button class='dbCloser " + themeButton[1] + "' style='color:white' type='button'>" +
		this.icons.getIcon.call( this, themeButton[0] ) + "</button>" +
		"</div></div>";
},

/*
 * Make an internal header ( datebox & flipbox )
 * 
 * MUST have the "dbHeader" class
 * 
 * @param  {string} text Text to display
 * @return {object} jQuery object
 */
JTSageDateBox.style_subHead =  function ( text ) {
	return $(
		"<div class='text-center dbHeader'>" +
		"<h5>" + text + "</h5>" +
		"</div>"
	);
},

/*
 * Make the header for calbox / slidebox
 * 
 * @param  {string} txt Text to display
 * @param  {string} prevBtn Previous button icon (name or SVG) & class
 * @param  {string} nextBtn Next button icon (name or SVG) & class
 * @param  {string} prevCtl Control class for previous button
 * @param  {string} nextCtl Control class for next button
 * @return {object} jQuery Object
 */
JTSageDateBox.style_pnHead = function ( txt, prevBtn, nextBtn, prevCtl, nextCtl ) {
	var returnVal = $("<div class='grid-x'>");

	$("<div class='cell small-2'>").append(
		$( this.style_btn( [
			prevBtn[0],
			prevBtn[1] + " expanded " + prevCtl
		] ) )
	).appendTo( returnVal );

	$("<div class='cell small-8 text-center'><h5>" + txt + "</h5></div>").appendTo( returnVal );

	$("<div class='cell small-2'>").append(
		$( this.style_btn( [
			nextBtn[0],
			nextBtn[1] + " expanded " + nextCtl
		] ) )
	).appendTo( returnVal );

	return returnVal;
};

/*
 * Create the year and month picker for calbox / slidebox
 * 
 * @param {object} ranges Year and Month arrays
 * @param {array} ranges.year Containing arrays of [ value, text, selected (boolean) ]
 * @param {array} ranges.month Containing arrays of [ value, text, selected (boolean) ]
 * @param {string} theme Theme class for controls
 * @param {string} monthCtl Control class for month picker
 * @param {string} yearCtl Control class for year picker
 * @return {object} jQuery Object
 */
JTSageDateBox.style_picker =  function ( ranges, theme, monthCtl, yearCtl ) {
	var returnVal = "";

	returnVal += "<div class='grid-x'>";

	returnVal += "<div class='cell small-8'>";
	returnVal += this._stdSel( ranges.month, monthCtl, "form-control" );
	returnVal += "</div>";

	returnVal += "<div class='cell small-4'>";
	returnVal += this._stdSel( ranges.year, yearCtl, "form-control" );
	returnVal += "</div>";

	returnVal += "</div>";

	return $(returnVal);
};

/*
 * Make the calbox/slidebox drop down quick pick list.
 * 
 * Consider using {@link JTSageDateBox.html#._stdSel__anchor|_stdSel()}
 *
 * @param {string} listLabel Label for the list
 * @param {array} list Containing arrays of [ value, text, selected (boolean) ]
 * @param {string} theme Theme class
 * @param {string} ctlCls Control class for select
 * @return {object} jQuery Object
 */
JTSageDateBox.style_dateList = function ( listLabel, list, theme, ctlCls ) {
	var returnVal = "",
		newList = list.slice();

	newList.unshift([false, listLabel, true]);

	returnVal += "<div>";
	returnVal += this._stdSel( newList, ctlCls, "form-control" );
	returnVal += "</div>";

	return $(returnVal);
};


/* CalBox Specific */


/*
 * Create the calbox grid container.  Probably a table
 * 
 * @return {object} jQuery object
 */
JTSageDateBox.style_calGrid = function () {
	return $( "<div><table class='dbCalGrid' style='width:100%'></table></div>" );
};

/*
 * Create a calbox grid row.  Probably a tr
 * 
 * @return {object} jQuery object
 */
JTSageDateBox.style_calRow = function () {
	return $( "<tr>" );
};

/*
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
 */
JTSageDateBox.style_calBtn =  function ( data, totalElements ) {
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
};

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
JTSageDateBox.style_calTxt = function ( text, header, totalElements ) {
	var style = ( totalElements !== undefined ?
			" style='width: " + ( 100 / totalElements ) + "%'" :
			""
		),
		cls = ( header ) ? " font-weight-bold" : "";

	return $("<td class='text-center" + cls + "'" + style + ">" + text + "</td>");
};


/* DateBox Specific */

/*
 * Make the datebox mode container.
 *
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_dboxCtr = function () {
	return $( "<table>" );
};

/*
 * Make the datebox control row
 *
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_dboxRow = function () {
	return $( "<tr>" );
};

/*
 * Make a datebox +/-/input control
 * 
 * Next button MUST have "dbBoxNext" class
 * Previous button MUST have "dbBoxPrev" class
 * Container must have "mainCls"
 *
 * @param {string} prevBtn Previous button icon (name or SVG) & class
 * @param {string} nextBtn Next button icon (name of SVG) & class
 * @param {string} mainCls Class for the control (input type)
 * @param {string} label Label, if needed
 * @param {string} inTheme Theme for inputs
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_dboxCtrl = function ( prevBtn, nextBtn, mainCls, label ) {
	var returnVal = "";

	returnVal += "<td class='dbBox" + mainCls + "'>";

	returnVal += this.style_btn(
		[
			nextBtn[0],
			nextBtn[1] + " expanded dbBoxNext"
		],
		"",
		"margin-bottom:0"
	);

	if ( label !== null ) {
		returnVal += "<div class='w-100 form-control rounded-0 p-0 text-center' " +
			"style='margin-bottom:0;height:auto'>" + label + "</div>";
	}
	returnVal += "<input type='text' style='margin-bottom:0;padding-left:0;padding-right:0' ";
	returnVal += "class='small text-center'>";

	returnVal += this.style_btn( [
		prevBtn[0],
		prevBtn[1] + " expanded dbBoxNext"
	] );

	returnVal += "</div>";

	return $(returnVal);
};


/* SlideBox Specific */

/*
 * Make the grid container for slidebox (usually a table)
 *
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_slideGrid = function () {
	return $( "<div><table class='dbSlideGrid'></table></div>" );
};

/*
 * Make the grid for for slidebox (usually a TR)
 *
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_slideRow = function () {
	return $( "<tr>" );
};

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
 */
JTSageDateBox.style_slideBtn = function ( data ) {
	var style   = " style='width: " + ( ( 100 / 8 ) ) + "%'",
		disable = ( data.bad ? "disabled='disabled'" : ""),
		cls     = "class='dbEventS expanded button tiny " +
			data.theme + ( data.bad ? " disabled":"" ) + "'";

	return $("<td class='text-center'" + style + ">" +
		"<a href='#' " + cls + " " + disable + ">" +
		"<small>" + this.__( "daysOfWeekShort")[data.dateObj.getDay()] +
		"</small><br>" + data.dateObj.getDate() +
		"</a>" + "</td>");
};

/*
 * Create next/prev week buttons for slidebox
 *
 * @param {string} eventCls The event class.  Should be placed on the button
 * @param {string} theme Icon to use for button ( name or SVG ) & theme
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_slideCtrl = function ( eventCls, theme ) {
	var style = " style='width: " + ( ( 100 / 8 ) / 2 ) + "%'",
		cls   = "class='button tiny expanded " +
			theme[1] + " " + eventCls + "'";

	return $(
		"<td class='text-center'" + style + ">" +
		"<a href='#' " + cls + ">" +
		this.icons.getIcon.call( theme[0] ) + "</a></td>"
	);
};


/* FlipBox Specific */



/*
 * Make the container for the flipbox
 *
 * @param {number} size Height CSS property
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_fboxCtr = function ( size ) {
	return $(
		"<div style='margin: .5em .3em; height: " + size + "; overflow: hidden'>"
	);
};

/*
 * Make a container for flipbox labels
 *
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_fboxDurLbls = function ( ) {
	return $( "<div style='margin: .3em;'>" );
};

/*
 * Make a flibox label
 *
 * @param {string} text Text of the label
 * @param {number} items Total number of items
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_fboxDurLbl = function ( text, items ) {
	return $(
		"<div style='text-align: center; display:inline-block; width: " +
		( 100 / items ) + "%'>" + text +
		"</div>"
	);
};

/*
 * Make a flipbox roller container (outermost)
 *
 * @param {number} total Number of items
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_fboxRollCtr = function ( total ) {
	return $(
		"<div style='float:left; width:" + ( 100 / total ) + "%'>"
	);
};

/*
 * Make a flipbox roller container (middle) - usually a UL
 *
 * @returns {object} jQuery Object
 */	
JTSageDateBox.style_fboxRollPrt = function () {
	return $( "<ul style='margin:0; padding:0; list-style-type: none; display:inline;'>" );
};

/*
 * Make a flipbox element (innermost) - usually a LI
 *
 * @param {string} text
 * @param {string} cls
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_fboxRollCld = function ( text, cls ) {
	var styles = [
		"display: list-item",
		"border-radius: 0",
		"font-size: .9em",
		"padding: .2em",
		"width: 100%",
		"margin: 0",
		"text-align: center"
	];

	return $(
		"<li style='" + styles.join( ";" ) + "' class='callout " + cls + "'>" +
		text +
		"</li>"
	);
};

/*
 * Make the flipbox lens
 *
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_fboxLens = function () {
	return $(
		"<div class='callout' style='box-shadow: rgba(0, 0, 0, 0.15) 0px 0.5rem 1rem; " +
		"background-color: transparent;'>"
	);
};


/*
 * Position the flip elements.  Overrides the base function if it exists
 */
JTSageDateBox.style_fboxPos = function () {
	var fullRoller, firstItem, height_Roller, intended_Top,
		w                 = this,
		o                 = this.options,
		height_Outside    = w.d.intHTML.find( ".dbRollerV" ).outerHeight(),
		theLens           = w.d.intHTML.find( ".dbLens" ).first(),
		height_Lens       = theLens.outerHeight(),
		single            = w.d.intHTML.find( ".dbRoller" ).first().children().first();

	// Trap for run too early.
	if ( single.height() < 5 ) { return true; }

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
		if ( firstItem.css( "marginTop" ) === "0px" ) {
				
			height_Roller = (fullRoller.children().length - 0.5 ) * firstItem.outerHeight();

			// Negative Half the height of the roller ( gets center to top border of view)
			// Add half of the view container height.
			intended_Top  = ( -1 * ( height_Roller / 2 ) ) + ( height_Outside / 2 );

			if ( o.flipboxLensAdjust !== false ) { intended_Top += o.flipboxLensAdjust; }

			firstItem.css("margin-top", intended_Top);
			
		}
	});
};


