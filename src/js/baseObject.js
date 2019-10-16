/* jshint unused: false */

/**
 * JTSage-DateBox
 * @fileOverview Base options object and options getters / setters.
 * @author J.T.Sage <jtsage+datebox@gmail.com>
 * @author {@link https://github.com/jtsage/jtsage-datebox/contributors|GitHub Contributors}
 * @license {@link https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt|MIT}
 * @version 5.2.0
 */

/**
 * DateBox widget
 * 
 * @kind class
 */
var JTSageDateBox = {},

	/* exported mergeOpts */
	/**
	 * Merge options together. Deliberatly shallow merge.
	 *
	 * @param {Object} newOpts
	 */
	mergeOpts = function (newOpts) {
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

	mode                    : false,

	hideInput               : false,

	lockInput               : true,
	safeEdit                : true,

	controlWidth            : "290px",
	/* Set to "!important" if the framework needs it */
	controlWidthImp         : "",
	breakpointWidth         : "567px",
	zindex                  : "1100",
	clickEvent              : "click",
	disableWheel            : false,

	useKinetic              : true,
	flipSizeOverride        : false,

	defaultValue            : false,
	showInitialValue        : false,

	linkedField             : false,
	linkedFieldFormat       : "%J",

	/* One of dropdown, inline, blind, or modal */
	displayMode             : "dropdown",

	/* For dropdown, position string.  *
	*  Valid : topRight, topMiddle, topLeft
	*          bottomRight, bottomMiddle, bottomLeft
	*          centerRight, centerMiddle, centerLeft
	*/
	displayDropdownPosition : "bottomRight",

	/* For inline display   : left, right, center (defaults center) */
	displayInlinePosition   : "center",

	/* Expects [ top, left ] in px */
	displayForcePosition    : false,

	dismissOutsideClick     : true,
	dismissOnEscape         : false,

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
	
	usePlaceholder           : false,
	headerFollowsPlaceholder : true,
	headerFollowsTitle       : true,
	headerFollowsLabel       : true,

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
	maxDate                 : false,
	minDate                 : false,
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

	rolloverMode : {
		"m"   : true,
		"d"   : true,
		"h"   : true,
		"i"   : true,
		"s"   : true
	},

	useLang : "default",
	lang : {
		"default" : {
			setDateButtonLabel     : "Set Date",
			setTimeButtonLabel     : "Set Time",
			setDurationButtonLabel : "Set Duration",
			todayButtonLabel       : "Jump to Today",
			tomorrowButtonLabel    : "Jump to Tomorrow",
			titleDateDialogLabel   : "Set Date",
			titleTimeDialogLabel   : "Set Time",
			daysOfWeek : [
				"Sunday", "Monday", "Tuesday",
				"Wednesday", "Thursday", "Friday",
				"Saturday"
			],
			daysOfWeekShort : ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
			monthsOfYear : [
				"January", "February", "March", "April", "May", "June",
				"July", "August", "September", "October", "November", "December"
			],
			monthsOfYearShort : [
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

/*jshint -W101,-W108 */
/* eslint-disable quotes,max-len*/
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
		var w    = this,
			icnF = w.options.iconFactory;
		// Empty argument?  Do nothing.
		// If the icon name starts with a tag, it's svg.
		// However, if o.iconFactory is a function, return that instead.

		if ( name === false ) { return false; }

		if ( typeof icnF === "function" ) {
			return icnF.call( w, name );
		}

		if ( name.substr(0,4) === "<svg" ) { return name; }

		if ( typeof w.icons[name] !== "undefined" ) { return w.icons[name]; }

		return w.icons.cancel;
	},
	next     : '<svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M9.8 6L4 11.8l-1.8-1.7L6.6 6 2.2 2 4 .1 9.8 6z" clip-rule="evenodd" fill-rule="evenodd"/></svg>',
	prev     : '<svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M2.2 6L8 .2l1.8 1.7L5.4 6l4.4 4L8 11.9 2.2 6z" clip-rule="evenodd" fill-rule="evenodd"/></svg>',
	plus     : '<svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 5v2h12V5H0z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7 0H5v12h2V0z" fill="currentColor"/></svg>',
	minus    : '<svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M0 5v2h12V5H0z" clip-rule="evenodd" fill-rule="evenodd"/></svg>',
	check    : '<svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M12 2.8l-8 8-4-4 1.5-1.5L4 7.8l6.5-6.5L12 2.6z" clip-rule="evenodd" fill-rule="evenodd"/></svg>',
	cancel   : '<svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M11 2.5L9.4 1 1.1 9.5 2.5 11l8.4-8.4z" clip-rule="evenodd" fill-rule="evenodd"/><path fill="currentColor" d="M2.5 1L1 2.6l8.4 8.4L11 9.5 2.5 1.1z" clip-rule="evenodd" fill-rule="evenodd"/></svg>',
	goto     : '<svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M7 3.3C3.8 3.6.4 5.9.4 11.7c2-4.3 4-5 6.8-5v2.9l4.6-4.7L7.1.3v3z" fill-rule="evenodd"/></svg>',
	clear    : '<svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.8 1H8.1c0-.5-.4-1-.8-1H4.7C4.3 0 4 .6 4 1H2.2c-.4 0-.8.3-.8.8v.8c0 .5.4.8.8.8V11c0 .5.4.9.9.9H9c.4 0 .8-.4.8-.9V3.4c.5 0 .8-.3.8-.8v-.8c0-.5-.3-.9-.8-.9zM9 11H3V3.6H4v6.7h.8V3.5h.9v6.7h.8V3.5h.9v6.7H8V3.5h.8V11zm.8-8.4H2.2v-.8h7.6v.8z" fill="currentColor"/></svg>',
	clock    : '<svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M6.8 6h2.5v1.7H5.9a.8.8 0 0 1-.8-.8V2.6h1.7V6zM6 1.2a4.8 4.8 0 1 1 0 9.6 4.8 4.8 0 0 1 0-9.6zM6 .1a6 6 0 0 0-6 6 6 6 0 0 0 6 6 6 6 0 0 0 6-6 6 6 0 0 0-6-6z" clip-rule="evenodd" fill-rule="evenodd"/></svg>',
	calendar : '<svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M10.5 1h-.8v1.3c0 .2-.2.4-.4.4H7.6a.4.4 0 0 1-.4-.4V1H4.7v1.3c0 .2-.2.4-.4.4H2.6a.4.4 0 0 1-.4-.4V1h-.8c-.5 0-.8.4-.8.8V11c0 .5.4.8.8.8h9.3c.5 0 .8-.4.8-.8V1.8c0-.5-.4-.8-.8-.8zm0 10.1H1.2V3.5h9.3v7.6zM3.7 1.9h-.8V.2h.8v1.7zm5.1 0H8V.2h.8v1.7zM4.5 5.3h-.8v-.8h.8v.8zm1.7 0h-.8v-.8h.8v.8zm1.7 0h-.8v-.8h.8v.8zm1.7 0h-.8v-.8h.8v.8zM2.8 7H2v-.8h.8V7zm1.7 0h-.8v-.8h.8V7zm1.7 0h-.8v-.8h.8V7zm1.7 0h-.8v-.8h.8V7zm1.7 0h-.8v-.8h.8V7zM2.8 8.7H2v-.8h.8v.8zm1.7 0h-.8v-.8h.8v.8zm1.7 0h-.8v-.8h.8v.8zm1.7 0h-.8v-.8h.8v.8zm1.7 0h-.8v-.8h.8v.8zm-6.8 1.7H2v-.8h.8v.8zm1.7 0h-.8v-.8h.8v.8zm1.7 0h-.8v-.8h.8v.8zm1.7 0h-.8v-.8h.8v.8z"/></svg>',
};
/*jshint +W101,+W108 */
/* eslint-enable quotes,max-len */

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
