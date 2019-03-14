/* jshint unused: false */

 /**
     * JTSage-DateBox
     * @fileOverview Base options object and options getters / setters.
     * @author J.T.Sage <jtsage+datebox@gmail.com>
     * @author Other GitHub Contributors
     * @license MIT
     * @version 5.0.0

     */

/**
 * DateBox widget
 * 
 * @kind class
 */
var JTSageDateBox = {};

/**
 * Merge options together. Deliberatly shallow merge.
 *
 * @param {Object} newOpts
 */
var mergeOpts = function (newOpts) {
	for (var attrname in newOpts) { 
		JTSageDateBox.options[attrname] = newOpts[attrname];
	}
};


/**
 * Selector to auto-enhance
 * 
 * @type {string}
 */
JTSageDateBox.initSelector = "input[data-role='datebox']";

/**
 * Widget Options
 * 
 * @type {Object}
 */
JTSageDateBox.options = {
	// All widget options, including some internal runtime details

	// Check Header for Build Date.
	version                 : "5.0.0",
	// These are never used, just information
	bootstrap3Version       : "3.3.7",
	bootstrap4Version       : "4.3.1",

	mode                    : false,

	hideInput               : false,
	hideContainer           : false,

	lockInput               : true,

	controlWidth            : "290px",
	breakpointWidth         : "567px",
	zindex                  : "1100",
	clickEvent              : "click",
	/* dep this!  it's not yet */
	clickEventAlt           : "click",

	useKinetic              : true,

	defaultValue            : false,
	showInitialValue        : false,

	linkedField             : false,
	linkedFieldFormat       : "%J",

	/* One of dropdown, inline, blind, or modal */
	displayMode             : "dropdown",

	/* For dropdown, position string.  See popper.js docs.  *
	*  Typical              : top-end or top-start or top      */
	displayDropdownPosition : "top-end",

	/* For inline display   : left, right, center (defaults center) */
	displayInlinePosition   : "center",

	useHeader               : true,
	useImmediate            : false,

	useButton               : true,
	buttonIcon              : false,
	useFocus                : false,
	
	useSetButton            : true,
	useCancelButton         : false,
	useTodayButton          : false,
	closeTodayButton        : false,
	useTomorrowButton       : false,
	closeTomorrowButton     : false,
	useClearButton          : false,
	useCollapsedBut         : false,
	
	usePlaceholder          : false,

	beforeOpenCallback      : false,
	beforeOpenCallbackArgs  : [],
	openCallback            : false,
	openCallbackArgs        : [],
	closeCallback           : false,
	closeCallbackArgs       : [],
	runOnBlurCallback       : false,

	startOffsetYears        : false,
	startOffsetMonths       : false,
	startOffsetDays         : false,
	afterToday              : false,
	beforeToday             : false,
	notToday                : false,
	maxDays                 : false,
	minDays                 : false,
	maxYear                 : false,
	minYear                 : false,
	blackDates              : false,
	blackDatesRec           : false,
	blackDays               : false,
	whiteDates              : false,
	enableDates             : false,
	validHours              : false,
	minHour                 : false,
	maxHour                 : false,
	minTime                 : false,
	maxTime                 : false,
	maxDur                  : false,
	minDur                  : false,
	minuteStep              : 1,
	minuteStepRound         : 0,
	twoDigitYearCutoff      : 38,

	flipboxLensAdjust       : false,

	rolloverMode: { 
		"m": true,
		"d": true,
		"h": true,
		"i": true,
		"s": true
	},

	useLang: "default",
	lang: {
		"default" : {
			setDateButtonLabel     : "Set Date",
			setTimeButtonLabel     : "Set Time",
			setDurationButtonLabel : "Set Duration",
			todayButtonLabel       : "Jump to Today",
			tomorrowButtonLabel    : "Jump to Tomorrow",
			titleDateDialogLabel   : "Set Date",
			titleTimeDialogLabel   : "Set Time",
			daysOfWeek: [
				"Sunday", "Monday", "Tuesday", 
				"Wednesday", "Thursday", "Friday", 
				"Saturday"
			],
			daysOfWeekShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
			monthsOfYear: [
				"January", "February", "March", "April", "May", "June",
				"July", "August", "September", "October", "November", "December"
			],
			monthsOfYearShort: [
				"Jan", "Feb", "Mar", "Apr", "May", "Jun",
				"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
			],
			durationLabel      : ["Days", "Hours", "Minutes", "Seconds"],
			durationDays       : ["Day", "Days"],
			timeFormat         : 24,
			headerFormat       : "%A, %B %-d, %Y",
			tooltip            : "Open Date Picker",
			nextMonth          : "Next Month",
			prevMonth          : "Previous Month",
			dateFieldOrder     : ["m", "d", "y"],
			timeFieldOrder     : ["h", "i", "a"],
			datetimeFieldOrder : ["y", "m", "d", "h", "i", "s", "a"],
			slideFieldOrder    : ["y", "m", "d"],
			dateFormat         : "%Y-%m-%d",
			datetimeFormat     : "%Y-%m-%dT%k:%M:%S",
			useArabicIndic     : false,
			isRTL              : false,
			calStartDay        : 0,
			clearButton        : "Clear",
			cancelButton       : "Cancel",
			durationOrder      : ["d", "h", "i", "s"],
			meridiem           : ["AM", "PM"],

			// 12HR = "%l:%M %p"
			// 24HR = "%k:%M"
			timeOutput         : "%k:%M",
			durationFormat     : "%Dd %DA, %Dl:%DM:%DS",
			calDateListLabel   : "Other Dates",
			calHeaderFormat    : "%B %Y"
		}
	}
};

/**
 * Widget Icons
 * 
 * @type {Object}
 * @property {string} next Next Chevron
 * @property {string} prev Previous Chevron
 * @property {string} plus Plus Sign
 * @property {string} minus Minus Sign
 * @property {string} check Check Mark
 * @property {string} cancel X Mark, Cancel, Close
 * @property {string} goto Goto symbol
 * @property {string} clear Trash Can
 * @property {string} clock Clock
 * @property {string} calendar Calendar
 */
/*jshint -W101 */
// Line width check disabled for these only, or it's a mess.
JTSageDateBox.icons = {
	getIcon  : function ( name ) {
		// If the icon name starts with a tag, it's svg.

		if ( name === false ) { return false; }

		if ( name.substr(0,4) === "<svg" ) { return name; }

		if ( typeof this[name] !== "undefined" ) { return this[name]; }

		return this.cancel;
	},
	next     : "<svg width=\"7\" height=\"10\" viewBox=\"0 0 7 10\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6.5 5L1.5 10L0 8.5L3.75 5L0 1.5L1.5 0L6.5 5Z\" fill=\"currentColor\"/></svg>",
	prev     : "<svg width=\"8\" height=\"16\" viewBox=\"0 0 8 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M5.5 3L7 4.5L3.25 8L7 11.5L5.5 13L0.5 8L5.5 3Z\" fill=\"currentColor\"/></svg>",
	plus     : "<svg width=\"12\" height=\"16\" viewBox=\"0 0 12 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12 9H7V14H5V9H0V7H5V2H7V7H12V9Z\" fill=\"currentColor\"/></svg>",
	minus    : "<svg width=\"8\" height=\"16\" viewBox=\"0 0 8 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M0 7V9H8V7H0Z\" fill=\"currentColor\"/></svg>",
	check    : "<svg width=\"12\" height=\"10\" viewBox=\"0 0 12 10\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12 2L4 10L0 6L1.5 4.5L4 7L10.5 0.5L12 2Z\" fill=\"currentColor\"/></svg>",
	cancel   : "<svg width=\"12\" height=\"16\" viewBox=\"0 0 12 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7.48 7.99999L11.23 11.75L9.75 13.23L6 9.47999L2.25 13.23L0.770004 11.75L4.52 7.99999L0.770004 4.24999L2.25 2.76999L6 6.51999L9.75 2.76999L11.23 4.24999L7.48 7.99999Z\" fill=\"currentColor\"/></svg>",
	goto     : "<svg width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" d=\"M6 3.5C9.92 3.94 14 6.625 14 13.5C11.688 8.438 9.25 7.5 6 7.5V11L0.5 5.5L6 0V3.5Z\" fill=\"currentColor\" transformclip-rule=\"evenodd\" transform=\"scale(-1, 1) translate(-14, 0)\"></path></svg>",
	clear    : "<svg width=\"11\" height=\"14\" viewBox=\"0 0 11 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M10 1H8C8 0.45 7.55 0 7 0H4C3.45 0 3 0.45 3 1H1C0.45 1 0 1.45 0 2V3C0 3.55 0.45 4 1 4V13C1 13.55 1.45 14 2 14H9C9.55 14 10 13.55 10 13V4C10.55 4 11 3.55 11 3V2C11 1.45 10.55 1 10 1ZM9 13H2V4H3V12H4V4H5V12H6V4H7V12H8V4H9V13ZM10 3H1V2H10V3Z\" fill=\"currentColor\"/></svg>",
	clock    : "<svg width=\"14\" height=\"16\" viewBox=\"0 0 14 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M8 8H11V10H7C6.45 10 6 9.55 6 9V4H8V8ZM6.99999 2.3C10.14 2.3 12.7 4.86 12.7 8C12.7 11.14 10.14 13.7 6.99999 13.7C3.85999 13.7 1.29999 11.14 1.29999 8C1.29999 4.86 3.85999 2.3 6.99999 2.3ZM7 1C3.14 1 0 4.14 0 8C0 11.86 3.14 15 7 15C10.86 15 14 11.86 14 8C14 4.14 10.86 1 7 1V1Z\" fill=\"currentColor\"/></svg>",
	calendar : "<svg width=\"14\" height=\"16\" viewBox=\"0 0 14 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13 2H12V3.5C12 3.78 11.78 4 11.5 4H9.5C9.22 4 9 3.78 9 3.5V2H6V3.5C6 3.78 5.78 4 5.5 4H3.5C3.22 4 3 3.78 3 3.5V2H2C1.45 2 1 2.45 1 3V14C1 14.55 1.45 15 2 15H13C13.55 15 14 14.55 14 14V3C14 2.45 13.55 2 13 2ZM13 14H2V5H13V14ZM5 3H4V1H5V3ZM11 3H10V1H11V3ZM6 7H5V6H6V7ZM8 7H7V6H8V7ZM10 7H9V6H10V7ZM12 7H11V6H12V7ZM4 9H3V8H4V9ZM6 9H5V8H6V9ZM8 9H7V8H8V9ZM10 9H9V8H10V9ZM12 9H11V8H12V9ZM4 11H3V10H4V11ZM6 11H5V10H6V11ZM8 11H7V10H8V11ZM10 11H9V10H10V11ZM12 11H11V10H12V11ZM4 13H3V12H4V13ZM6 13H5V12H6V13ZM8 13H7V12H8V13ZM10 13H9V12H10V13Z\" fill=\"currentColor\"/></svg>",
};
/*jshint +W101 */

/** 
 * Functions that control the actual style of datebox elements
 * 
 * @type {Object}
*/
JTSageDateBox.styleFunctions = {};
	
/**
 * Get the "long" version of the options from the input
 *
 * @param {Object} element - jQuery object, original input element
 * @returns {Object} Found elements, shallow object
 */
JTSageDateBox._getLongOptions = function( element ) {
	// Pull "long" options from the element, i.e.
	// data-datebox-mode="datebox" --> options.mode
	var key, temp,
		returnObj    = {},
		prefix       = "datebox",
		prefixLength = 7;

	for ( key in element.data() ) {
		if ( key.substr( 0, prefixLength ) === prefix && key.length > prefixLength ) {
			temp = key.substr( prefixLength );
			temp = temp.charAt( 0 ).toLowerCase() + temp.slice( 1 );
			if ( temp !== "options" ) {
				returnObj[ temp ] = element.data( key );
			}
		}
	}
	return returnObj;
};

/**
 * Set an option, then refresh display
 *
 * @param {string} Option Name
 * @param {string} Option Value
 */
JTSageDateBox._setOption = function() {
	$.Widget.prototype._setOption.apply( this, arguments );
	this.refresh();
};

/**
 * Get the value of an option, auto-search the i18n values (first)
 *
 * @param {string} opt - Option name
 * @returns {string} Option value
 */
JTSageDateBox.getOption = function( opt ) {
	// Provide a PUBLIC function to get a defined option or i18n member
	var i18nTester = this.__(opt);
	if ( i18nTester !== "Err:NotFound" ) {
		return i18nTester;
	} else {
		return this.options[ opt ];
	}
};
