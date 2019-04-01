/**
 * JTSage-DateBox
 * @fileOverview Bulma Themes and StyleFunctions
 * This file supports: datebox, flipbox, slidebox, calbox.
 *
 * This framework requires use of [id]-dbAttach ID's. (hella-nest)
 *
 * CalBox   : A+
 * DateBox  : A+
 * FlipBox  : A- (need multiline buttons.  pending in the project repo)
 * SlideBox : A (could use some borders maybe)
 * 
 * @author J.T.Sage <jtsage+datebox@gmail.com>
 * @author {@link https://github.com/jtsage/jtsage-datebox/contributors|GitHub Contributors}
 * @license {@link https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt|MIT}
 * @version 5.0.0
 */

mergeOpts({
	theme_clearBtn    : [ "clear",  "is-fullwidth is-marginless is-secondary" ],
	theme_closeBtn    : [ "check",  "is-fullwidth is-marginless is-secondary" ],
	theme_cancelBtn   : [ "cancel", "is-fullwidth is-marginless is-secondary" ],
	theme_tomorrowBtn : [ "goto",   "is-fullwidth is-marginless is-secondary" ],
	theme_todayBtn    : [ "goto",   "is-fullwidth is-marginless is-secondary" ],

	theme_dropdownContainer    : "card",
	theme_modalContainer       : "card",
	theme_inlineContainer      : "card",

	theme_headerTheme          : "is-dark",
	theme_headerBtn            : [ "cancel", "is-light" ],
	theme_openButton           : "is-primary",

	theme_cal_Today       : "is-info",
	theme_cal_DayHigh     : "is-warning",
	theme_cal_Selected    : "is-success",
	theme_cal_DateHigh    : "is-warning",
	theme_cal_DateHighAlt : "is-danger",
	theme_cal_DateHighRec : "is-warning",
	theme_cal_Default     : "is-outlined is-primary",
	theme_cal_OutOfBounds : "is-white",

	theme_cal_NextBtn : [ "next", "is-white" ],
	theme_cal_PrevBtn : [ "prev", "is-white" ],

	theme_cal_Pickers  : false, // UNUSED
	theme_cal_DateList : false, // UNUSED

	theme_dbox_NextBtn    : [ "plus",  "is-outlined is-dark" ],
	theme_dbox_PrevBtn    : [ "minus", "is-outlined is-dark" ],
	theme_dbox_Inputs     : false, //UNUSED

	theme_fbox_Selected   : "is-success",
	theme_fbox_Default    : "is-light",
	theme_fbox_Forbidden  : "is-danger",
	theme_fbox_RollHeight : "135px",

	theme_slide_Today       : "is-info",
	theme_slide_DayHigh     : "is-warning",
	theme_slide_Selected    : "is-success",
	theme_slide_DateHigh    : "is-warning",
	theme_slide_DateHighAlt : "is-danger",
	theme_slide_DateHighRec : "is-warning",
	theme_slide_Default     : "is-primary",

	theme_slide_NextBtn     : [ "plus", "is-white" ],
	theme_slide_PrevBtn     : [ "minus", "is-white" ],
	theme_slide_NextDateBtn : [ "next", "is-white" ],
	theme_slide_PrevDateBtn : [ "prev", "is-white" ],

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
	theme_headStyle : " .db-show {padding-bottom: .3em; margin-bottom:.3em}",
	theme_spanStyle : false,

	buttonIconDate : "calendar",
	buttonIconTime : "clock",

	disabledState  : "disabled",

	clickEvent : "click",
	tranDone   : "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
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

JTSageDateBox.style_btn = function( theme, contents ) {
	var retty;

	contents = ( typeof contents === "undefined" ) ? "" : contents;

	retty  = "<a href='#' role='button' class='button " + theme[1] + "'>";
	retty += ( theme[0] !== false ) ? "<span>" + this.icons.getIcon(theme[0]) + "</span> " : "";
	retty += contents + "</a>";

	return retty;
};

/*
 * Make a button group
 * 
 * @param  {boolean} collapse Attempt to display buttons on one line
 * @return {object} jQuery object of a button group that buttons can be appended to
 */
JTSageDateBox.style_btnGrp = function ( /* collapse */ ) {
	return $( "<div class='buttons is-fullwidth' style='padding: .3em;'>" );
};

/*
 * Wrap the original input in a div so we can add a button to it
 * 
 * @param  {object} originalInput Original input element, jQuery object
 * @param  {string} Theme class
 * @return {object} jQuery object now wrapped with some sort of div
 */
JTSageDateBox.style_inWrap = function ( originalInput, /* theme */ ) {
	originalInput.closest( ".field" ).addClass( "has-addons" );
	originalInput.closest( ".control" ).addClass( "is-expanded" );
	return originalInput.closest( ".field" );
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
	return "<div class=\"control\"><a title=\"" + title + "\" class=\"dbOpenButton button " +
		theme + "\">" + this.icons.getIcon( icon ) + "</a></div>";
};

/*
 * When not using the open button, we may need to alter the wrap class differently
 * 
 * @param  {object} originalInputWrap jQuery object
 */
JTSageDateBox.style_inNoBtn = function ( /* originalInputWrap */ ) {
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
	return "" +
		"<div class=\"navbar " + themeBar + "\"><div class=\"navbar-brand\">" +
		"<strong class=\"navbar-item\">" + text + "</strong>" +
		"</div><div class=\"is-active navbar-menu\">" +
		"<div class=\"navbar-end\"><div class=\"navbar-item\">" +
		this.style_btn( [
			themeButton[0],
			themeButton[1] + " dbCloser"
		] ) +
		"</div></div></div></div>";
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
		"<div class='is-size-5 has-text-centered dbHeader' style='padding: .3em 0'>" +
		text +
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
	var returnVal = $("<div class='columns is-mobile is-vcentered' style='padding:.3em'>");

	$("<div class='column is-2'>").append(
		$( this.style_btn( [
			prevBtn[0],
			prevBtn[1] + " is-fullwidth " + prevCtl
		] ) )
	).appendTo( returnVal );

	$("<div class='column'><div class='title is-5 has-text-centered'>" + txt + "</div></div>")
		.appendTo( returnVal );

	$("<div class='column is-2'>").append(
		$( this.style_btn( [
			nextBtn[0],
			nextBtn[1] + " is-fullwidth " + nextCtl
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

	returnVal += "<div class='columns is-mobile is-gapless' style='padding:.3em'>";

	returnVal += "<div class='column is-8'><div class='select is-fullwidth'>";
	returnVal += this._stdSel( ranges.month, monthCtl, "" );
	returnVal += "</div></div>";

	returnVal += "<div class='column is-4'><div class='select is-fullwidth'>";
	returnVal += this._stdSel( ranges.year, yearCtl, "" );
	returnVal += "</div></div>";

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

	returnVal += "<div class='select is-fullwidth' ";
	returnVal += "style='margin:.8em 0; padding:0 .3em;'>";
	returnVal += this._stdSel( newList, ctlCls, "" );
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
	return $(
		"<div style='padding:.3em'><table class='dbCalGrid' style='width:100%'></table></div>"
	);
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
		cls = "class='dbEvent is-fullwidth button " +
			data.theme + ( data.bad ? " disabled":"" ) + "'";

	return $("<td class='has-text-centered'" + style + ">" +
		"<a href='#' style='padding-left:0; padding-right:0;' " + cls + " " + disable + ">" +
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
		cls = ( header ) ? " has-text-weight-bold" : "";

	return $("<td class='has-text-centered" + cls + "'" + style + ">" + text + "</td>");
};


/* DateBox Specific */

/*
 * Make the datebox mode container.
 *
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_dboxCtr = function () {
	return $( "<div>" );
};

/*
 * Make the datebox control row
 *
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_dboxRow = function () {
	return $(
		"<div class='columns is-mobile is-gapless' " +
		"style='padding-left:.3em; padding-right: .3em; margin-bottom: .3em' >"
	);
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
JTSageDateBox.style_dboxCtrl = function ( prevBtn, nextBtn, mainCls, label, /* inTheme */ ) {
	var returnVal = "";

	returnVal += "<div class='column dbBox" + mainCls + "'>";

	returnVal += this.style_btn( [
		nextBtn[0],
		nextBtn[1] + " dbBoxNext is-fullwidth"
	] );

	if ( label !== null ) {
		returnVal += "<div class='w-100 form-control rounded-0 p-0 text-center' " +
			"style='height:auto'>" + label + "</div>";
	}
	returnVal += "<input style='padding-left:0;padding-right:0' type='text' ";
	returnVal += "class='input has-text-centered'>";

	returnVal += this.style_btn( [
		prevBtn[0],
		prevBtn[1] + " dbBoxNext is-fullwidth"
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
	return $( "<div><table class='dbSlideGrid' style='width:100%'></table></div>" );
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
		cls     = "class='dbEventS button is-paddingless is-fullwidth " +
			data.theme + ( data.bad ? " disabled":"" ) + "'";

	return $("" +
		"<td class='has-text-centered'" + style + ">" +
		"<span class='is-size-7'>" + this.__( "daysOfWeekShort")[data.dateObj.getDay()] +
		"</span>" +
		"<a href='#' " + cls + " " + disable + ">" +
		"<span class='is-size-4'>" + data.dateObj.getDate() +
		"</span></a>" + "</td>");
};

/*
 * Create next/prev week buttons for slidebox
 *
 * @param {string} eventCls The event class.  Should be placed on the button
 * @param {string} theme Icon to use for button ( name or SVG ) & theme
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_slideCtrl = function ( eventCls, theme ) {
	var style = " style='vertical-align: middle; width: " + ( ( 100 / 8 ) / 2 ) + "%'",
		cls   = "class='button is-small is-paddingless is-fullwidth " +
			theme[1] + " " + eventCls + "'";

	return $(
		"<td class='has-text-centered'" + style + ">" +
		"<a href='#' " + cls + ">" +
		this.icons.getIcon( theme[0] )  + "</a></td>"
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
		"<div class='columns is-mobile is-gapless' style='margin: 0; padding: 0 3px; height: " +
		size +
		"; overflow: hidden'>"
	);
};

/*
 * Make a container for flipbox labels
 *
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_fboxDurLbls = function ( ) {
	return $(
		"<div class='columns is-mobile is-gapless' style='margin-bottom: 0px;'>"
	);
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
		"<div class='column has-text-centered' style='width: " + ( 100 / items ) + "%'>" +
		text +
		"</div>"
	);
};

/*
 * Make a flipbox roller container (outermost)
 *
 * @param {number} total Number of items
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_fboxRollCtr = function ( /* total */ ) {
	return $( "<div class='column'>" );
};

/*
 * Make a flipbox roller container (middle) - usually a UL
 *
 * @returns {object} jQuery Object
 */	
JTSageDateBox.style_fboxRollPrt = function () {
	return $( "<div>" );
};

/*
 * Make a flipbox element (innermost) - usually a LI
 *
 * @param {string} text
 * @param {string} cls
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_fboxRollCld = function ( text, cls ) {
	return $(
		"<p class='field' style='margin-bottom: 0px'>" +
		"<span style='width: 100%' class='tag is-medium " + cls + "'>" +
		text +
		"</span></p>"
	);
};

/*
 * Make the flipbox lens
 *
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_fboxLens = function () {
	return $(
		"<div class='lensylens' style='height:48px; border:1px solid black; " +
		"box-shadow: 0 .5rem 1rem rgba(0,0,0,.15); margin-left: 1px; margin-right: 1px;' >"
	);
};


/*
 * Position the flip elements.  Overrides the base function if it exists
 */
JTSageDateBox.style_fboxPos = function () {
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
		if ( firstItem.css( "marginTop" ) === "0px" ) {
				
			height_Roller = fullRoller.outerHeight(false);

			// Negative Half the height of the roller ( gets center to top border of view)
			// Add half of the view container height.
			intended_Top  = ( -1 * ( height_Roller / 2 ) ) + ( height_Container / 2 );

			if ( o.flipboxLensAdjust !== false ) { intended_Top += o.flipboxLensAdjust; }

			firstItem.css("margin-top", intended_Top);
		}
	});
};

