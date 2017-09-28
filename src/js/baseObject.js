/* JTSage-DateBox 
 *
 * Basic Options, Base Object definition.
 *
 * Contains the option getters/setters
 * 
 */

var JTSageDateBox = {};

var mergeOpts = function (newOpts) {
	for (var attrname in newOpts) { 
		JTSageDateBox.options[attrname] = newOpts[attrname];
	}
};

JTSageDateBox.initSelector = "input[data-role='datebox']";

JTSageDateBox.options = {
	// All widget options, including some internal runtime details

	// Check Header for Build Date.
	version: "4.2.3",
	// These are never used, just information
	jqmVersion: "1.4.5",
	bootstrapVersion: "3.3.7",
	bootstrap4Version: "4.0.0b",

	jqmuiWidgetVersion: "1.11.4", // Styles do not play nice with 1.12.1

	theme: false,
	themeDefault: "a",
	themeHeader: "a",
	themeSetButton: "a",
	themeCloseButton: false,
	extraInputClass: "",
	mode: false,

	transition: "fade",
	useAnimation: true,
	hideInput: false,
	hideContainer: false,

	lockInput: true,

	zindex: "1100",
	clickEvent: "vclick",
	clickEventAlt: "click",
	useKinetic: true,

	defaultValue: false,
	showInitialValue: false,

	linkedField: false,
	linkedFieldFormat: "%J",

	popupPosition: false,
	popupButtonPosition: "left",
	popupForceX: false,
	popupForceY: false,

	useModal: true,
	useModalTheme: "b",
	useInline: false,
	useInlineBlind: false,
	useHeader: true,
	useImmediate: false,

	useButton: true,
	buttonIcon: false,
	useFocus: false,
	
	useSetButton: true,
	useCancelButton: false,
	useTodayButton: false,
	useTomorrowButton: false,
	useClearButton: false,
	useCollapsedBut: false,
	
	usePlaceholder: false,

	beforeOpenCallback: false,
	beforeOpenCallbackArgs: [],
	openCallback: false,
	openCallbackArgs: [],
	closeCallback: false,
	closeCallbackArgs: [],

	startOffsetYears: false,
	startOffsetMonths: false,
	startOffsetDays: false,
	afterToday: false,
	beforeToday: false,
	notToday: false,
	maxDays: false,
	minDays: false,
	maxYear: false,
	minYear: false,
	blackDates: false,
	blackDatesRec: false,
	blackDays: false,
	whiteDates: true,
	minHour: false,
	maxHour: false,
	minTime: false,
	maxTime: false,
	maxDur: false,
	minDur: false,
	minuteStep: 1,
	minuteStepRound: 0,
	twoDigitYearCutoff: 38,

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
			setDateButtonLabel: "Set Date",
			setTimeButtonLabel: "Set Time",
			setDurationButtonLabel: "Set Duration",
			todayButtonLabel: "Jump to Today",
			tomorrowButtonLabel: "Jump to Tomorrow",
			titleDateDialogLabel: "Set Date",
			titleTimeDialogLabel: "Set Time",
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
			durationLabel: ["Days", "Hours", "Minutes", "Seconds"],
			durationDays: ["Day", "Days"],
			timeFormat: 24,
			headerFormat: "%A, %B %-d, %Y",
			tooltip: "Open Date Picker",
			nextMonth: "Next Month",
			prevMonth: "Previous Month",
			dateFieldOrder: ["m", "d", "y"],
			timeFieldOrder: ["h", "i", "a"],
			slideFieldOrder: ["y", "m", "d"],
			dateFormat: "%Y-%m-%d",
			useArabicIndic: false,
			isRTL: false,
			calStartDay: 0,
			clearButton: "Clear",
			cancelButton: "Cancel",
			durationOrder: ["d", "h", "i", "s"],
			meridiem: ["AM", "PM"],

			// 12HR: "%l:%M %p"
			// 24HR: "%k:%M" 
			timeOutput: "%k:%M", 
			durationFormat: "%Dd %DA, %Dl:%DM:%DS",
			calDateListLabel: "Other Dates",
			calHeaderFormat: "%B %Y"
		}
	}
};
	
JTSageDateBox._getLongOptions = function( element ) {
	// Pull "long" options from the element, i.e.
	// data-datebox-mode="datebox" --> options.mode
	var key, temp,
		returnObj = {},
		prefix = "datebox",
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

JTSageDateBox._setOption = function() {
	$.Widget.prototype._setOption.apply( this, arguments );
	this.refresh();
};

JTSageDateBox.getOption = function( opt ) {
	// Provide a PUBLIC function to get a defined option or i18n member
	var i18nTester = this.__(opt);
	if ( i18nTester !== "Err:NotFound" ) {
		return i18nTester;
	} else {
		return this.options[ opt ];
	}
};
