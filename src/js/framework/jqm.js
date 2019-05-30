/**
 * JTSage-DateBox
 * @fileOverview jQueryMobile Themes and StyleFunctions
 * This file supports: datebox, flipbox, slidebox, calbox.
 * 
 * Note that icons work differently in jQM, they are the built in icon classes, as jQM
 * may run on devices that lack SVG support.
 * 
 * CalBox   : A+
 * DateBox  : A+
 * FlipBox  : A+
 * SlideBox : A+
 * 
 * @author J.T.Sage <jtsage+datebox@gmail.com>
 * @author {@link https://github.com/jtsage/jtsage-datebox/contributors|GitHub Contributors}
 * @license {@link https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt|MIT}
 * @version 5.0.0
 */

mergeOpts({
	theme_clearBtn       : [ "recycle", "a" ],
	theme_closeBtn       : [ "check",   "a" ],
	theme_cancelBtn      : [ "delete",  "a" ],
	theme_tomorrowBtn    : [ "action",  "a" ],
	theme_todayBtn       : [ "action",  "a" ],

	theme_dropdownContainer : "ui-body-a",
	theme_modalContainer    : "ui-body-a",
	theme_inlineContainer   : "ui-body-a",

	theme_headerTheme  : "inherit",
	theme_headerBtn    : [ "delete", "a" ],
	theme_openButton   : false, // UN-USED

	theme_cal_Today       : "b",
	theme_cal_DayHigh     : "b",
	theme_cal_Selected    : "active",
	theme_cal_DateHigh    : "b",
	theme_cal_DateHighAlt : "b",
	theme_cal_DateHighRec : "b",
	theme_cal_Default     : "a",
	theme_cal_OutOfBounds : "a",

	theme_cal_NextBtn : [ "plus",  "a" ],
	theme_cal_PrevBtn : [ "minus", "a" ],

	theme_cal_Pickers  : "a",
	theme_cal_DateList : "a",

	theme_dbox_NextBtn    : [ "plus",  "a" ],
	theme_dbox_PrevBtn    : [ "minus", "a" ],
	theme_dbox_Inputs     : "inherit",

	theme_fbox_Selected   : "a ui-flipswitch-active",
	theme_fbox_Default    : "a",
	theme_fbox_Forbidden  : "a ui-disabled",
	theme_fbox_RollHeight : "135px",

	theme_slide_Today       : "b",
	theme_slide_DayHigh     : "b",
	theme_slide_Selected    : "active",
	theme_slide_DateHigh    : "b",
	theme_slide_DateHighAlt : "b",
	theme_slide_DateHighRec : "b",
	theme_slide_Default     : "a",

	theme_slide_NextBtn     : [ "plus",    "a" ],
	theme_slide_PrevBtn     : [ "minus",   "a" ],
	theme_slide_NextDateBtn : [ "carat-r", "a" ],
	theme_slide_PrevDateBtn : [ "carat-l", "a" ],

	theme_slide_Pickers  : "a",
	theme_slide_DateList : "a",

	theme_backgroundMask : {
		position          : "fixed",
		left              : 0,
		top               : 0,
		right             : 0,
		bottom            : 0,
		backgroundColor   : "rgba(0,0,0,.4)"
	},
	theme_headStyle : " .center { text-align: center !important; } .p0 { padding: 0 !important; }" +
		".m0 { margin: 0 !important; } .w-100 { width: 100% !important; }",
	theme_spanStyle : false,

	buttonIconDate : "calendar",
	buttonIconTime : "clock",

	disabledState    : "ui-disabled",

	clickEvent : "vclick",
	tranDone   : "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
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
		possibleAttach = $( ".ui-page-active" );
		if ( possibleAttach.length === 1 ) { return possibleAttach; }
		
		possibleAttach = w.d.input.closest( "[data-role='page']");
		if ( possibleAttach.length === 1 ) { return possibleAttach; }
		
		return $( "body" );
	}

	// Inline or blind
	if ( possibleAttach.hasClass( "ui-field-contain" ) ) {
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

	retty  = "<a href='#' role='button' class='ui-btn ui-mini ui-btn-" + theme[1] + "";
	retty += ( theme[0] !== false ) ? " ui-icon-" + theme[0] : "";
	retty += ( contents === "" ) ? " ui-corner-all ui-btn-icon-notext" : " ui-btn-icon-left";
	retty += "'>" + contents + "</a>";

	return retty;
};

/*
 * Make a button group
 * 
 * @param  {boolean} collapse Attempt to display buttons on one line
 * @return {object} jQuery object of a button group that buttons can be appended to
 */
JTSageDateBox.style_btnGrp = function ( collapse ) {
	var style = ( collapse ) ?
		"margin: 0 auto;" :
		"margin: 0 .446em";

	return $("<div style='" + style + "' class='ui-controlgroup-controls'>");
};

/*
 * Make a button group, outside wrapper (optional!!)
 * 
 * @param {boolean} collapse Collapse to one line
 * @param {object} inner Inner HTML (jQuery)
 * @return {object} jQuery
 */
JTSageDateBox.style_btnGrpOut = function ( collapse, inner ) {
	var cls = ( collapse === true ) ? "ui-controlgroup-horizontal" : "ui-controlgroup-vertical",
		style = ( collapse === true ) ? "style='text-align:center'" : "";

	inner.find( ".ui-btn" ).last().addClass( "ui-last-child" );
	inner.find( ".ui-btn" ).first().addClass( "ui-first-child" );
	return $("<div " + style + " class='ui-controlgroup " + cls + "'>").append( inner );
},

/*
 * Wrap the original input in a div so we can add a button to it
 * 
 * @param  {object} originalInput Original input element, jQuery object
 * @param  {string} Theme class
 * @return {object} jQuery object now wrapped with some sort of div
 */
JTSageDateBox.style_inWrap = function ( originalInput ) {
	originalInput.parent().enhanceWithin();
	return originalInput.parent().addClass("ui-input-has-clear");
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
	return "<a href='javascript: return false;' " +
			"class='dbOpenButton ui-input-clear ui-btn ui-icon-" + icon +
			" ui-btn-icon-notext ui-corner-all' " +
			"title='" + title + "'>" + title + "</a>";
};

/*
 * When not using the open button, we may need to alter the wrap class differently
 * 
 * @param  {object} originalInputWrap jQuery object
 */
JTSageDateBox.style_inNoBtn = function ( originalInputWrap ) {
	originalInputWrap.parent().removeClass( "ui-has-clear" );
};

/*
 * Hide the input element completely.
 */
JTSageDateBox.style_inHide = function() {
	var w      = this,
		hideMe = w.d.wrap.parent();

	if ( hideMe.hasClass( "ui-field-contain" ) ) {
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
	return "<div class='ui-header ui-bar-" + themeBar + "'>" +
		"<h1 class='ui-title'>" + text + "</h1>" +
		this.style_btn( [
			themeButton[0],
			themeButton[1] + " dbCloser ui-btn-right"
		] ) +
		"</div>";
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
		"<h3 class='center'>" + text + "</h3>" +
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
	var returnVal = $("<div class='ui-header' style='border:0; padding: 0 3px 8px;'>");

	$( this.style_btn( [
		prevBtn[0],
		prevBtn[1] + " ui-btn-left " + prevCtl
	] ) ).appendTo( returnVal );

	$("<h3 class='ui-title' style='margin: 0 15%'>" + txt + "</h3>").appendTo( returnVal );

	$( this.style_btn( [
		nextBtn[0],
		nextBtn[1] + " ui-btn-right " + nextCtl
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
	var i         = 0,
		returnVal = "<div style='padding-bottom: 8px' class='" +
		"ui-controlgroup ui-controlgroup-horizontal ui-corner-all ui-mini'>";

	returnVal += "<div class='ui-controlgroup-controls w-100'>";

	returnVal += "<div class='ui-select' style='width:60%'>";
	returnVal += "<div id='" + monthCtl + "-button' class='ui-btn-" + theme +
		" ui-btn ui-icon-carat-d ui-btn-icon-right ui-corner-all ui-shadow ui-first-child'>";

	for ( i = 0; i < ranges.month.length; i++ ) {
		if ( ranges.month[i][2] === true ) {
			returnVal += "<span>" + ranges.month[i][1] + "</span>";
		}
	}
	returnVal += this._stdSel( ranges.month, monthCtl, "" );
	returnVal += "</div></div>";

	returnVal += "<div class='ui-select' style='width:40%'>";
	returnVal += "<div id='" + yearCtl + "-button' class='ui-btn-" + theme +
		" ui-btn ui-icon-carat-d ui-btn-icon-right ui-corner-all ui-shadow ui-last-child'>";

	for ( i = 0; i < ranges.year.length; i++ ) {
		if ( ranges.year[i][2] === true ) {
			returnVal += "<span>" + ranges.year[i][1] + "</span>";
		}
	}
	returnVal += this._stdSel( ranges.year, yearCtl, "" );
	returnVal += "</div></div>";

	returnVal += "</div></div>";

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

	returnVal += "<div class='ui-select'>";
	returnVal += "<div id='" + ctlCls + "-button' style='margin: 0 .446em 8px;' class='" +
		"ui-mini ui-btn ui-icon-carat-d ui-btn-" + theme + " ui-btn-icon-right ui-corner-all'>";
	
	returnVal += "<span>" + listLabel + "</span>";
	returnVal += this._stdSel( newList, ctlCls, "" );
	returnVal += "</div></div>";

	return $(returnVal);
};


/* CalBox Specific */


/*
 * Create the calbox grid container.  Probably a table
 * 
 * @return {object} jQuery object
 */
JTSageDateBox.style_calGrid = function () {
	return $( "<div><table class='dbCalGrid w-100'></table></div>" );
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
	var styles_TD = "width:" + ( 100 / totalElements ) + "%",
		styles_A  = [
			"padding-right:0",
			"padding-left:0"
		],
		class_A   = [
			"dbEvent",
			"ui-btn",
			"ui-mini",
			"m0",
			"ui-btn-" + data.theme,
			( data.bad ? "ui-disabled" : "" )
		],
		disable   = ( data.bad ? "disabled='disabled'" : "");
	
	return $(
		"<td class='p0 m0' style='" + styles_TD + "'>" +
		"<a style='" + styles_A.join( ";" ) +
			"' class='" + class_A.join( " " ) + "' href='#' " + disable + ">" +
		data.displayText +
		"</a></td>"
	);
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
	var styles = [
		"width:" + ( 100 / totalElements ) + "%",
		( header ) ? "font-weight:bold" : ""
	];

	return $("<td class='p0 m0 center' style='" + styles.join( ";" ) + "'>" + text + "</td>");
};


/* DateBox Specific */

/*
 * Make the datebox mode container.
 *
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_dboxCtr = function () {
	return $( "<table class='w-100'>" );
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
JTSageDateBox.style_dboxCtrl = function ( prevBtn, nextBtn, mainCls, label, inTheme ) {
	var returnVal = "";

	returnVal += "<td class='dbBox" + mainCls + "'>";

	returnVal += "<a href='#' role='button' class='ui-corner-all ui-btn ui-mini ui-btn-";
	returnVal += nextBtn[1] + " ui-icon-" + nextBtn[0] + " ui-btn-icon-top dbBoxNext m0' ";
	returnVal += "style='padding-top:2.1em; border-bottom-left-radius:0;" +
		"border-bottom-right-radius:0;'>";
	returnVal += "</a>";


	if ( label !== null ) {
		returnVal += "<div class='m0 center ui-input-text ui-body-inherit' " +
			"style='height:auto; padding: .3em 0;'>" +
			label + "</div>";
	}

	returnVal += "<div class='m0 ui-input-text ui-mini ui-body-" + inTheme + "'>";
	returnVal += "<input class='p0 center' type='text'></div>";

	
	returnVal += "<a href='#' role='button' class='ui-corner-all ui-btn ui-mini ui-btn-";
	returnVal += prevBtn[1] + " ui-icon-" + prevBtn[0] + " ui-btn-icon-top dbBoxPrev m0' ";
	returnVal += "style='padding-top:2.1em; border-top-left-radius:0;" +
		"border-top-right-radius:0;'>";
	returnVal += "</a>";

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
	return $( "<div><table class='dbSlideGrid w-100'></table></div>" );
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
		cls     = "class='m0 dbEventS w-100 ui-btn ui-mini ui-btn-" +
			data.theme + ( data.bad ? " disabled":"" ) + "'";

	return $("<td class='m-0 p-0 text-center'" + style + ">" +
		"<a style='padding:.7em 0;' href='#' " + cls + " " + disable + ">" +
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
		cls   = "class='m0 ui-corner-all ui-btn ui-mini ui-btn-icon-notext ui-btn-" +
			theme[1] + " " + eventCls + " ui-icon-" + theme[0] + "'";

	return $(
		"<td " + style + ">" +
		"<a href='#' " + cls + "></a></td>"
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
		"<div style='margin: 0 5px 8px; height: " + size + "; overflow: hidden'>"
	);
};

/*
 * Make a container for flipbox labels
 *
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_fboxDurLbls = function ( ) {
	return $( "<div style='margin: 5px;'>" );
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
		"<div class='center' " +
		"style='display:inline-block; width: " + ( 100 / items ) + "%'>" +
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
JTSageDateBox.style_fboxRollCtr = function ( total ) {
	return $( "<div style='float:left; width:" + ( 100 / total ) + "%'>" );
};

/*
 * Make a flipbox roller container (middle) - usually a UL
 *
 * @returns {object} jQuery Object
 */	
JTSageDateBox.style_fboxRollPrt = function () {
	return $( "<ul style='list-style-type: none; display: inline;'>" );
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
		"<li style='height: 30px; line-height: 30px;' class='center ui-body-" +
		cls + "'>" + text + "</li>"
	);
};

/*
 * Make the flipbox lens
 *
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_fboxLens = function () {
	return $(
		"<div style='width: 96%; height: 40px; border: 1px solid #eee; margin: 0 1.5%;' " +
		"class='ui-overlay-shadow'>"
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
		height_Lens       = theLens.outerHeight();
	
	// Lens top:
	// Negative Half the parent height is center.
	// Add Negative half the lens height.
	intended_Top = -1 * ( ( height_Outside / 2 ) + ( height_Lens / 2 ) );
	theLens.css( {
		top          : intended_Top + -3,
		marginBottom : -1 * height_Lens
	} );
	
	w.d.intHTML.find( ".dbRoller" ).each( function() {
		fullRoller    = $(this);
		firstItem     = fullRoller.children().first();

		// No RE-DO's, if it has a style, it's probably right.
		if ( firstItem.css( "marginTop" ) === "0px" ) {
				
			height_Roller = (fullRoller.children().length + 1 ) * firstItem.outerHeight();

			// Negative Half the height of the roller ( gets center to top border of view)
			// Add half of the view container height.
			intended_Top  = ( -1 * ( height_Roller / 2 ) ) + ( height_Outside / 2 );

			if ( o.flipboxLensAdjust !== false ) { intended_Top += o.flipboxLensAdjust; }

			firstItem.css("margin-top", intended_Top);
		}
	});
};


/*
* Object.assign polyfill.  Provided only for jQM, support for other frameworks 
* should be provided via HTML5 is ES5 shims if you are targeting older devices.
*/

/* eslint-disable one-var, no-unused-vars */

if ( typeof Object.assign != "function" ) {
	// Must be writable: true, enumerable: false, configurable: true
	Object.defineProperty( Object, "assign", {
		value : function assign( target, varArgs ) { // .length of function is 2
			"use strict";
			if ( target == null ) { // TypeError if undefined or null
				throw new TypeError( "Cannot convert undefined or null to object" );
			}
		
			var to = Object(target);
		
			for ( var index = 1; index < arguments.length; index++ ) {
				var nextSource = arguments[index];
  
				if ( nextSource != null ) { // Skip over if undefined or null
					for ( var nextKey in nextSource ) {
						// Avoid bugs when hasOwnProperty is shadowed
						if ( Object.prototype.hasOwnProperty.call( nextSource, nextKey ) ) {
							to[nextKey] = nextSource[nextKey];
						}
					}
				}
			}
		
			return to;
		},
		writable : true,
		configurable : true
	});
}

/* eslint-enable one-var, no-unused-vars */
