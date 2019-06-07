/**
 * JTSage-DateBox
 * @fileOverview No Framework Themes and StyleFunctions
 * This file supports: datebox, flipbox, slidebox, calbox.
 * 
 * Pretty much just an empty file.
 * 
 * @author J.T.Sage <jtsage+datebox@gmail.com>
 * @author {@link https://github.com/jtsage/jtsage-datebox/contributors|GitHub Contributors}
 * @license {@link https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt|MIT}
 * @version 5.1.3
 */

mergeOpts({

	theme_clearBtn    : [ "clear",  "" ],
	theme_closeBtn    : [ "check",  "" ],
	theme_cancelBtn   : [ "cancel", "" ],
	theme_tomorrowBtn : [ "goto",   "" ],
	theme_todayBtn    : [ "goto",   "" ],

	theme_dropdownContainer : "",
	theme_modalContainer    : "",
	theme_inlineContainer   : "",

	theme_headerTheme  : "",
	theme_headerBtn    : [ "cancel", "" ],
	theme_openButton   : "", // has-succes, has-warning, has-error

	theme_cal_Today       : "",
	theme_cal_DayHigh     : "",
	theme_cal_Selected    : "",
	theme_cal_DateHigh    : "",
	theme_cal_DateHighAlt : "",
	theme_cal_DateHighRec : "",
	theme_cal_Default     : "",
	theme_cal_OutOfBounds : "",

	theme_cal_NextBtn : [ "next", "" ],
	theme_cal_PrevBtn : [ "prev", "" ],

	theme_cal_Pickers  : "",
	theme_cal_DateList : "",

	theme_dbox_NextBtn : [ "plus",  "" ],
	theme_dbox_PrevBtn : [ "minus", "" ],
	theme_dbox_Inputs  : "",

	theme_fbox_Selected   : "",
	theme_fbox_Default    : "",
	theme_fbox_Forbidden  : "",
	theme_fbox_RollHeight : "135px",

	theme_slide_Today       : "",
	theme_slide_DayHigh     : "",
	theme_slide_Selected    : "",
	theme_slide_DateHigh    : "",
	theme_slide_DateHighAlt : "",
	theme_slide_DateHighRec : "",
	theme_slide_Default     : "",

	theme_slide_NextBtn     : [ "plus",  "" ],
	theme_slide_PrevBtn     : [ "minus", "" ],
	theme_slide_NextDateBtn : [ "next",  "" ],
	theme_slide_PrevDateBtn : [ "prev",  "" ],

	theme_slide_Pickers  : "",
	theme_slide_DateList : "",

	theme_backgroundMask : {
		position          : "fixed",
		left              : 0,
		top               : 0,
		right             : 0,
		bottom            : 0,
		backgroundColor   : "rgba(0,0,0,.4)"
	},
	theme_headStyle : "",
	theme_spanStyle : false,

	flipboxLensAdjust : 9,
	buttonIconDate    : "calendar",
	buttonIconTime    : "clock",
	disabledState     : "disabled",

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

	retty  = "<a href='#' role='button' class='" + theme[1] + "'>";
	retty += ( theme[0] !== false ) ?
		"<span style='top: 3px; display: inline-block; position: relative;'>" +
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
		"" :
		"";

	return $(
		"<div style='padding: 5px;' class='" +  cls + "'>"
	);
};

/*
 * Wrap the original input in a div so we can add a button to it
 * 
 * @param  {object} originalInput Original input element, jQuery object
 * @return {object} jQuery object now wrapped with some sort of div
 */
JTSageDateBox.style_inWrap = function ( originalInput, theme ) {
	originalInput.css( { "display" : "inline" } );
	return originalInput.wrap("<div style='display:inline-block' class='" + theme + "'>").parent();
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
JTSageDateBox.style_inBtn = function ( icon, title ) {
	return "<div style='display:inline' class='dbOpenButton' title='" + title + "'>" +
		"<span>" + this.icons.getIcon.call( this, icon ) + "</span>" +
		"</div>";
};

/*
 * When not using the open button, we may need to alter the wrap class differently
 * 
 * @param  {object} originalInputWrap jQuery object
 */
/* eslint-disable no-unused-vars */
JTSageDateBox.style_inNoBtn = function ( originalInputWrap ) {
	return true;
};
/* eslint-enable no-unused-vars */

/*
 * Hide the input element completely.
 */
JTSageDateBox.style_inHide = function() {
	var w      = this,
		hideMe = w.d.wrap.parent();

	if ( hideMe.hasClass("form-group") ) {
		hideMe.hide();
	} else {
		w.d.wrap.hide();
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
	return "<div class='" + themeBar + "'>" +
		text +
		"<a href='#' class='dbCloser'><span>" + this.icons.getIcon.call( this, themeButton[0]) +
		"</span></a></div>";
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
		"<div class='dbHeader'>" +
		"<h4>" + text + "</h4>" +
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
	var returnVal = $("<div>");

	$( this.style_btn( [
		prevBtn[0],
		prevBtn[1] + " " + prevCtl
	] ) ).appendTo( returnVal );

	$("<h4 style='display:inline'>" + txt + "</h4>")
		.appendTo( returnVal );

	$( this.style_btn( [
		nextBtn[0],
		nextBtn[1] + " " + nextCtl
	] ) ).appendTo( returnVal );

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

	returnVal += "<div>";

	returnVal += "<div style='padding:0; margin:0; display:inline;'>";
	returnVal += this._stdSel( ranges.month, monthCtl, theme );
	returnVal += "</div>";

	returnVal += "<div style='padding:0; margin:0; display:inline;'>";
	returnVal += this._stdSel( ranges.year, yearCtl, theme );
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
	returnVal += this._stdSel( newList, ctlCls, theme );
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
		"<div>" +
		"<table class='dbCalGrid'>" +
		"</table></div>"
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
		cls = "class='dbEvent " +
			data.theme + ( data.bad ? " disabled":"" ) + "'";

	return $("<td " + style + ">" +
		"<a href='#' " + cls + " " + disable + ">" +
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
	);

	return $("<td " + style + ">" + text + "</td>");
};


/* DateBox Specific */

/*
 * Make the datebox mode container.
 *
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_dboxCtr = function () {
	return $("<table style='width:100%'>");
};

/*
 * Make the datebox control row
 *
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_dboxRow = function () {
	return $("<tr>");
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

	returnVal += "<td><div class='dbBox" + mainCls + "'>";

	returnVal += this.style_btn( [
		nextBtn[0],
		nextBtn[1] + " dbBoxNext"
	] );
	
	if ( label !== null ) {
		returnVal += "<div class='' " +
			"style='height:auto'>" + label + "</div>";
	}
	returnVal += "<input type='text' ";
	returnVal += "class='' ";
	returnVal += "style='width:100%'>";
	
	returnVal += this.style_btn( [
		prevBtn[0],
		prevBtn[1] + " dbBoxPrev"
	] );

	returnVal += "</div></td>";

	return $(returnVal);
};


/* SlideBox Specific */

/*
 * Make the grid container for slidebox (usually a table)
 *
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_slideGrid = function () {
	return $(
		"<div>" +
		"<table style='width:100%' class='dbSlideGrid'>" +
		"</table></div>"
	);
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
		cls     = "class='dbEventS " +
			data.theme + ( data.bad ? " disabled":"" ) + "'";

	return $("<td " + style + ">" +
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
		cls   = "class='" +
			theme[1] + " " + eventCls + "'";


	return $(
		"<td" + style + ">" +
		"<a href='#' " +
		cls + ">" + this.icons.getIcon.call( this, theme[0] ) + "</a></td>"
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
		"<div style='height: " +
		size +
		"; overflow: hidden; padding: 5px;'>"
	);
};

/*
 * Make a container for flipbox labels
 *
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_fboxDurLbls = function ( ) {
	return $(
		"<div style='padding: 0 5px;'>"
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
		"<div style='display: inline-block; width: " +
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
JTSageDateBox.style_fboxRollCtr = function ( items ) {
	return $( "<div style='float: left; width: " + ( 100 / items ) + "%'>" );
};

/*
 * Make a flipbox roller container (middle) - usually a UL
 *
 * @returns {object} jQuery Object
 */	
JTSageDateBox.style_fboxRollPrt = function () {
	return $( "<ul>" );
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
		"<li class='" + cls + "'" +
		" style='padding: 10px 0;'>" +
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
		"<div style='margin: 0px 2px; box-shadow: 0 .5rem 1rem rgba(0,0,0,.15); " +
		"border: 1px solid black; height: 35px;'>"
	);
};


/*
 * Position the flip elements.  Overrides the base function if it exists
 */
JTSageDateBox.style_fboxPos = function () {
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
};


