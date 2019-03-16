/* jshint unused: false */

 /**
     * JTSage-DateBox
     * @fileOverview Base options object and options getters / setters.
     * @author J.T.Sage <jtsage+datebox@gmail.com>
     * @author {@link https://github.com/jtsage/jtsage-datebox/contributors|GitHub Contributors}
     * @license {@link https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt|MIT}
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
	bootstrap3Version       : "3.4.1",
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

/*jshint -W101 */
// Line width check disabled for these only, or it's a mess.
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
 * @property {function} getIcon Retrieve an icon by name (override with SVG)
 */
JTSageDateBox.icons = {
	getIcon  : function ( name ) {
		// If the icon name starts with a tag, it's svg.

		if ( name === false ) { return false; }

		if ( name.substr(0,4) === "<svg" ) { return name; }

		if ( typeof this[name] !== "undefined" ) { return this[name]; }

		return this.cancel;
	},
	next     : "<svg width=\"12\" height=\"12\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"><path id=\"svg_1\" fill=\"currentColor\" d=\"m9.78,6l-5.8,5.8l-1.74,-1.74l4.36,-4.07l-4.36,-4.07l1.74,-1.74l5.8,5.8z\" clip-rule=\"evenodd\" fill-rule=\"evenodd\"/></svg>",
	prev     : "<svg width=\"12\" height=\"12\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"><path id=\"svg_1\" transform=\"rotate(180 6,6)\" fill=\"currentColor\" d=\"m9.78,6l-5.8,5.8l-1.74,-1.74l4.36,-4.07l-4.36,-4.07l1.74,-1.74l5.8,5.8z\" clip-rule=\"evenodd\" fill-rule=\"evenodd\"/></svg>",
	plus     : "<svg width=\"12\" height=\"12\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"><path id=\"svg_1\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"m0,5l0,2l12,0l0,-2l-12,0z\" fill=\"currentColor\"/><path transform=\"rotate(90 6,6) \" id=\"svg_2\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"m0,5l0,2l12,0l0,-2l-12,0z\" fill=\"currentColor\"/></svg>",
	minus    : "<svg width=\"12\" height=\"12\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"><path fill=\"currentColor\" d=\"m0,5l0,2l12,0l0,-2l-12,0z\" clip-rule=\"evenodd\" fill-rule=\"evenodd\" id=\"svg_1\"/></svg>",
	check    : "<svg width=\"12\" height=\"12\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"><path id=\"svg_1\" fill=\"currentColor\" d=\"m12,2.75l-8,8l-4,-4l1.5,-1.5l2.5,2.5l6.5,-6.5l1.5,1.5z\" clip-rule=\"evenodd\" fill-rule=\"evenodd\"/></svg>",
	cancel   : "<svg width=\"12\" height=\"12\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"><path transform=\"rotate(135 6,6) \" fill=\"currentColor\" d=\"m0,5l0,2l12,0l0,-2l-12,0z\" clip-rule=\"evenodd\" fill-rule=\"evenodd\" id=\"svg_1\"/><path fill=\"currentColor\" d=\"m0,5l0,2l12,0l0,-2l-12,0z\" clip-rule=\"evenodd\" fill-rule=\"evenodd\" id=\"svg_2\" transform=\"rotate(45 6,6) \"/></svg>",
	goto     : "<svg width=\"12\" height=\"12\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"><path id=\"svg_1\" fill=\"currentColor\" d=\"m7.06,3.26c-3.31,0.37 -6.75,2.64 -6.75,8.44c1.95,-4.27 4.01,-5.07 6.75,-5.07l0,2.95l4.64,-4.64l-4.64,-4.64l0,2.95z\" fill-rule=\"evenodd\"/></svg>",
	clear    : "<svg width=\"12\" height=\"12\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"m9.8,0.93l-1.69,0c0,-0.46 -0.38,-0.84 -0.84,-0.84l-2.53,0c-0.46,0 -0.84,0.38 -0.84,0.84l-1.69,0c-0.46,0 -0.84,0.38 -0.84,0.84l0,0.84c0,0.46 0.38,0.84 0.84,0.84l0,7.6c0,0.46 0.38,0.84 0.84,0.84l5.91,0c0.46,0 0.84,-0.38 0.84,-0.84l0,-7.6c0.46,0 0.84,-0.38 0.84,-0.84l0,-0.84c0,-0.46 -0.38,-0.84 -0.84,-0.84zm-0.84,10.14l-5.9,0l0,-7.6l0.84,0l0,6.76l0.84,0l0,-6.76l0.84,0l0,6.76l0.84,0l0,-6.76l0.84,0l0,6.76l0.84,0l0,-6.76l0.84,0l0,7.6zm0.84,-8.45l-7.6,0l0,-0.84l7.6,0l0,0.84z\" fill=\"currentColor\" id=\"svg_1\"/></svg>",
	clock    : "<svg width=\"12\" height=\"12\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"><path id=\"svg_1\" fill=\"currentColor\" d=\"m6.85,6l2.55,0l0,1.70l-3.4,0c-0.47,0 -0.85,-0.38 -0.85,-0.85l0,-4.26l1.7,0l0,3.4zm-0.85,-4.85c2.67,0 4.85,2.18 4.85,4.85c0,2.67 -2.18,4.85 -4.85,4.85c-2.67,0 -4.85,-2.18 -4.85,-4.85c0,-2.67 2.18,-4.85 4.85,-4.85zm0,-1.1c-3.29,0 -6,2.67 -6,6c0,3.29 2.67,6 6,6c3.29,0 6,-2.67 6,-6c0,-3.29 -2.67,-6 -6,-6l0,0z\" clip-rule=\"evenodd\" fill-rule=\"evenodd\"/></svg>",
	calendar : "<svg width=\"12\" height=\"12\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"><path id=\"svg_1\" fill=\"currentColor\" d=\"m10.62,0.96l-0.84,0l0,1.26c0,0.24 -0.18,0.42 -0.42,0.42l-1.68,0c-0.24,0 -0.42,-0.18 -0.42,-0.42l0,-1.26l-2.52,0l0,1.26c0,0.24 -0.18,0.42 -0.42,0.42l-1.68,0c-0.24,0 -0.42,-0.18 -0.42,-0.42l0,-1.26l-0.84,0c-0.46,0 -0.84,0.38 -0.84,0.84l0,9.24c0,0.46 0.38,0.84 0.84,0.84l9.24,0c0.46,0 0.84,-0.38 0.84,-0.84l0,-9.24c0,-0.46 -0.38,-0.84 -0.84,-0.84zm0,10.08l-9.24,0l0,-7.56l9.24,0l0,7.56zm-6.72,-9.24l-0.84,0l0,-1.68l0.84,0l0,1.68zm5.04,0l-0.84,0l0,-1.68l0.84,0l0,1.68zm-4.2,3.36l-0.84,0l0,-0.84l0.84,0l0,0.84zm1.68,0l-0.84,0l0,-0.84l0.84,0l0,0.84zm1.68,0l-0.84,0l0,-0.84l0.84,0l0,0.84zm1.68,0l-0.84,0l0,-0.84l0.84,0l0,0.84zm-6.72,1.68l-0.84,0l0,-0.84l0.84,0l0,0.84zm1.68,0l-0.84,0l0,-0.84l0.84,0l0,0.84zm1.68,0l-0.84,0l0,-0.84l0.84,0l0,0.84zm1.68,0l-0.84,0l0,-0.84l0.84,0l0,0.84zm1.68,0l-0.84,0l0,-0.84l0.84,0l0,0.84zm-6.72,1.68l-0.84,0l0,-0.84l0.84,0l0,0.84zm1.68,0l-0.84,0l0,-0.84l0.84,0l0,0.84zm1.68,0l-0.84,0l0,-0.84l0.84,0l0,0.84zm1.68,0l-0.84,0l0,-0.84l0.84,0l0,0.84zm1.68,0l-0.84,0l0,-0.84l0.84,0l0,0.84zm-6.72,1.68l-0.84,0l0,-0.84l0.84,0l0,0.84zm1.68,0l-0.84,0l0,-0.84l0.84,0l0,0.84zm1.68,0l-0.84,0l0,-0.84l0.84,0l0,0.84zm1.68,0l-0.84,0l0,-0.84l0.84,0l0,0.84z\" clip-rule=\"evenodd\" fill-rule=\"evenodd\"/></svg>",
};
/*jshint +W101 */

/**
 * Create actual HTML controls per framework
 *
 * @type Object
 * @memberof JTSageDateBox
 * @namespace JTSageDateBox.styleFunctions
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
