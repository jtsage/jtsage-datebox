/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notification.
 * https://github.com/jtsage/jquery-mobile-datebox
 */
/* Options Documentation */


var stuff = { // name: ['default','desc','type','mode list']
	common: {
		XXname: 'Common Options',
		mode: ['', 'Mode of operations', 'String', true],
		lockInput: [true, 'Lock the Input Element from manual input', 'Boolean', true],
		enhanceInput: [true, 'Enhance Numeric Inputs on Mobile', 'Boolean', [1,0,0,0,1,0,0]],
		defaultValue: [false, 'Default value for the date - e.g. [2001,1,1] or 13:42', 'Array/String', true]
	},
	display: {
		XXname: 'Display Options',
		centerHoriz: [false, 'Center Horizonitally', 'Boolean', true],
		centerVert: [false, 'Center Verticlly', 'Boolean', true],
		transition: ['pop', 'Transition for display', 'String', true],
		useAnimation: [true, 'Use Animations', 'Boolean', true],
		hideInput: [false, 'Hide the Input Element', 'Boolean', true],
		hideFixedToolbars: [false, 'Hide Fixed toolbars on open', 'Boolean', true],
		zindex: [500, 'Z-Index of controls', 'Integer', true],
		clickEvent: ['vclick', 'Listener event for all buttons in control', 'String', true],
		resizeListener: [true, 'Re-Position the control on window resize', 'Boolean', true],
		dialogEnable: [false, 'Enable the jQM Dialog mode', 'Boolean', true],
		dialogForce: [false, 'Force use of the jQM Dialog mode', 'Boolean', true],
		useModal: [false, 'Use faded modal background for control', 'Boolean', true],
		useInline: [false, 'Show control inline in the page (always visible)', 'Boolean', true],
		useInlineBlind: [false, 'Show the control inline in the page when clicked (rolldown)', 'Boolean', true],
		useButton: [true, 'Show a button in the Input Element to open the control', 'Boolean', true],
		useFocus: [false, 'Open the control when the Input Element is focused', 'Boolean', true],
		usePlaceholder: [false, 'Attempt to auto fill the placeholder text (or use the supplied custom text)', 'Boolean', true],
		useNewStyle: [false, 'Use the new input display style (cleaner, less inconsistency)', 'Boolean', true],
		useAltIcon: [false, 'When using useNewStyle, use a light icon rather than a dark one', 'Boolean', true],
		overrideStyleClass: [false, 'When using useNewStyle, add a custom icon class', 'String', true]
	},
	control: {
		XXname: 'Control Options',
		useHeader: [true, 'Use a toolbar header for the control', 'Boolean', true],
		useImmediate: [false, 'Update the Input Element on every control change', 'Boolean', true],
		useClearButton: [false, 'Show a button to clear the Input Element in the control', 'Boolean', true],
		useSetButton: [true, 'Show button to set the date', 'Boolean', [1,0,1,1,1,1,1]],
		useTodayButton: [false, 'Show button to jump to today', 'Boolean', [0,1,0,0,0,0,0]],
		useCollapsedBut: [false, 'When 2 buttons would show, collapse them into a single line', 'Boolean', true],
		rolloverMode: ["{ 'm': true, 'd': true, 'h': true, 'i': true, 's': true }", 'Allow rollover of each date element', 'Object', [1,0,1,1,1,1,0]],
		slen: ["{'y': 5, 'm':6, 'd':15, 'h':12, 'i':30}", 'Length of sliders (1/2 of slider)', 'Object', [0,0,0,1,0,0,0]],
		flen: ["{'y': 15, 'm':12, 'd':15, 'h':12, 'i':15, 'a':3}", 'Height of rollers (1/2 of roller)', 'Object', [0,0,1,0,0,1,0]],
		calShowDays: [true, 'Show Day Labels in calendar', 'Boolean', [0,1,0,0,0,0,0]],
		calShowWeek: [false, 'Show ISO Week number in calendar', 'Boolean', [0,1,0,0,0,0,0]],
		calOnlyMonth: [false, 'Do not show next/previous months in calendar', 'Boolean', [0,1,0,0,0,0,0]],
		calWeekMode: [false, 'Select by single week day in calendar', 'Boolean', [0,1,0,0,0,0,0]],
		calWeekModeDay: [1, 'Weekday to select when in calWeekMode', 'Integer', [0,1,0,0,0,0,0]]
	},
	callback: {
		XXname: 'Callback options',
		openCallback: [false, 'Callback function to run on control open', 'Function', true],
		openCallbackArgs: ["[]", 'Extra arguments to pass to open callback. Note that "this" refers to the widget', 'Array', true],
		closeCallback: [false, 'Callback function to run on control close', 'Function', true],
		closeCallbackArgs: ["[]", 'Extra arguments to pass to close callback.  Note that "this" refers to the widget and arguments[0] is the date that was just set', 'Array', true]
	},
	limiting: {
		XXname: 'Date Limiting Options',
		afterToday: [false, 'Limit all dates selected to *after* today\'s date', 'Boolean', [1,1,1,1,0,0,0]],
		beforeToday: [false, 'Limit all dates selected to *before* today\'s date', 'Boolean', [1,1,1,1,0,0,0]],
		notToday: [false, 'Limit all dates selected to *not* today\'s date', 'Boolean', [1,1,1,1,0,0,0]],
		maxDays: [false, 'Limit all dates selected to before today + ## days', 'Integer', [1,1,1,1,0,0,0]],
		minDays: [false, 'Limit all dates selected to after today - ## days', 'Integer', [1,1,1,1,0,0,0]],
		maxYear: [false, 'Limit all dates selected to before this year', 'Integer', [1,1,1,1,0,0,0]],
		minYear: [false, 'Limit all dates selected to after this year', 'Integer', [1,1,1,1,0,0,0]],
		blackDates: [false, 'Do not allow these ISO dates to be selected (array of dates)', 'Array', [1,1,1,1,0,0,0]],
		blackDays: [false, 'Do not allow these days to be selected (array of day indexes)', 'Array', [1,1,1,1,0,0,0]],
		enableDates: [false, 'Allow *only* these ISO dates to be sleected (array of dates)', 'Array', [0,1,0,0,0,0,0]],
		minHour: [false, 'Limit times to hours *after* this hour', 'Integer', [0,0,0,0,1,1,0]],
		maxHour: [false, 'Limit times to hours *before* this hour', 'Integer', [0,0,0,0,1,1,0]],
		validHours: [false, 'Limit times to *only* these hours (array of hours)', 'Array', [0,0,0,0,1,1,0]],
		minuteStep: [1, 'Stepper for minutes', 'Integer', [0,0,0,1,1,1,0]],
		minuteStepRound: [0, 'Direction to round :: -1 = Down, 1 = Up, 0 = "Standard Rounding"', 'Integer', [0,0,0,1,1,1,0]],
		highDays: [false, 'Highlight these days (array of day indexes)', 'Array', [0,1,0,0,0,0,0]],
		highDates: [false, 'Highlight these ISO dates (array of dates)', 'Array', [0,1,0,0,0,0,0]],
		highDatesAlt: [false, 'Highlight these ISO dates (array of dates) (alternate)', 'Array', [0,1,0,0,0,0,0]],
		durationSteppers: ["{'d': 1, 'h': 1, 'i': 1, 's': 1}", 'Steppers for the duration elements', 'Object', [0,0,0,0,0,0,1]]
	},
	themes: {
		XXname: 'Theme Options - Shared',
		theme: [false, 'Base theme for control', 'Boolean', true],
		themeHeader: ['a', 'Theme for header', 'String', true],
	},
	themesf: {
		XXname: 'Theme Options - FlipBox / TimeFlipBox',	
		themeDateHigh: ['e', 'Theme swatch for today\'s date', 'String', [0,0,1,0,0,1,0]],
		themeDatePick: ['a', 'Theme swatch for choosen (centered) date', 'String', [0,0,1,0,0,1,0]],
		themeDate: ['d', 'Theme swatch for other dates', 'String', [0,0,1,0,0,1,0]],
	},
	themess: {
		XXname: 'Theme Options - SlideBox',
		themeDateHigh: ['e', 'Theme swatch for today\'s date', 'String', [0,0,0,1,0,0,0]],
		themeDatePick: ['a', 'Theme swatch for choosen (centered) date', 'String', [0,0,0,1,0,0,0]],
		themeDate: ['d', 'Theme swatch for other dates', 'String', [0,0,0,1,0,0,0]],
	},
	themesd: {
		XXname: 'Theme Options - DateBox/TimeBox/DurationBox',
		themeButton: ['a', 'Theme swatch for +/- Buttons', 'String', [1,0,0,0,1,0,1]],
		themeInput: ['e', 'Theme swatch for input elements', 'String', [1,0,0,0,1,0,1]],
	},
	themesc: {
		XXname: 'Theme Options - CalBox',
		themeDateToday: ['a', 'Theme swatch for today\'s date', 'String', [0,1,0,0,0,0,0]],
		themeDayHigh: ['e', 'Theme swatch for highDays', 'String', [0,1,0,0,0,0,0]],
		themeDatePick: ['a', 'Theme swatch for choosen date', 'String', [0,1,0,0,0,0,0]],
		themeDateHigh: ['e', 'Theme swatch for highDates', 'String', [0,1,0,0,0,0,0]],
		themeDateHighAlt: ['e', 'Theme swatch for highDatesAlt', 'String', [0,1,0,0,0,0,0]],
		themeDate: ['d', 'Theme swatch for other dates (inherited)', 'String', [0,1,0,0,0,0,0]],
		calUsePickers: [false, 'Use Month/Year Pickers', 'Boolean', [0,1,0,0,0,0,0]],
		calNoHeader: [false, 'Suppress Standard Header', 'Boolean', [0,1,0,0,0,0,0]],
		calHighToday: [true, 'Highlight today\'s date', 'Boolean', [0,1,0,0,0,0,0]],
		calHighPick: [true, 'Highlight choosen date', 'Boolean', [0,1,0,0,0,0,0]],
		calWeekHigh: [false, 'Highlight full week on mouseover', 'Boolean', [0,1,0,0,0,0,0]],
		calControlGroup: [false, 'Use control group buttons in calendar', 'Boolean', [0,1,0,0,0,0,0]]
	},
	custom: {
		XXname: 'Custom Modes',
		customData: ['N/A', 'Data structure for custom modes', 'Array', false],
		themeOptPick: ['a', 'Theme for highlighted option (customflip)', 'String', false],
		themeOpt: ['d', 'Theme for other options (customflip)', 'String', false],
		overrideCustomSet: ['Looks Good', 'Set button for custom modes (i18n aware)', 'String', false],
		customDefault: ['[0,0,0]', 'Array of default indexs for custom modes', 'Array', false]
	},
	i18n: { //Mode List: [dbox,calbox,flipbox,slidebox,timebox,timeflipbox,durationbox] or true
		XXname: 'Internationalization / Localization',
		'NOTE:: To override, use overrideNameOfOption - e.g. overrideTimeFormat': true,
		setDateButtonLabel: ['Set Date', 'Set Date Button Label', 'String', [1,1,1,1,0,0,0]],
		setTimeButtonLabel: ['Set Time', 'Set Time Button Label', 'String', [0,0,0,0,1,1,0]],
		setDurationButtonLabel: ['Set Duration', 'Set Duration Button Label', 'String', [0,0,0,0,0,0,1]],
		calTodayButtonLabel: ['Jump to Today', 'Jump to today button Label', 'String', [0,1,0,0,0,0,0]],
		titleDateDialogLabel: ['Set Date', 'Date modes fallback header label', 'String', [1,1,1,1,0,0,0]],
		titleTimeDialogLabel: ['Set Time', 'Time modes fallback header label', 'String', [0,0,0,0,1,1,1]],
		daysOfWeek: ["['Sunday' ... 'Saturday']", 'Days of the week', 'Array', true],
		daysOfWeekShort: ["['Su' ... 'Sa']", 'Abbreviated days of the week', 'Array', true],
		monthsOfYear: ["['January' ... 'December']", 'Months of the year', 'Array', true],
		monthsOfYearShort: ["['Jan' ... 'Dec']", 'Abbreviated months of the year', 'Array', true],
		durationLabel: ["['Days', 'Hours', 'Minutes', 'Seconds']", 'Labels for duration elements', 'Array', [0,0,0,0,0,0,1]],
		durationDays: ["['Day', 'Days']", 'Name of day/days for duration', 'Array', [0,0,0,0,0,0,1]],
		timeFormat: [24, 'Format for clock', 'Integer', [0,0,0,0,1,1,0]],
		headerFormat: ['%A, %B %-d, %Y', 'Format for header if used', 'String', true],
		tooltip: ['Open Date Picker', 'Mouseover tooltip for open button', 'String', true],
		nextMonth: ['Next Month', 'Mouseover tooltip for next month button', 'String', [0,1,0,0,0,0,0]],
		prevMonth: ['Previous Month', 'Mouseover tooltip for prev month button', 'String', [0,1,0,0,0,0,0]],
		dateFieldOrder: ["['m', 'd', 'y']", 'Field order for date entry', 'Array', [1,0,1,0,0,0,0]],
		timeFieldOrder: ["['h', 'i', 'a']", 'Field order for time entry', 'Array', [0,0,0,0,1,1,0]],
		slideFieldOrder: ["['y', 'm', 'd']", 'Field order for slide mode', 'Array', [0,0,0,1,0,0,0]],
		dateFormat: ['%Y-%m-%d', 'Format for returned date', 'Array', [1,1,1,1,0,0,0]],
		useArabicIndic: [false, 'Use Arabic/Indic numerals', 'Boolean', true],
		isRTL: [false, 'Language runs Right-to-Left', 'Boolean', true],
		calStartDay: [0, 'Day of week to start calendar on', 'Integer', [0,1,0,0,0,0,0]],
		clearButton: ['Clear', 'Clear Input Element button label', 'String', true],
		durationOrder: ["['d', 'h', 'i', 's']", 'Field order for duration entry', 'Array', [0,0,0,0,0,0,1]],
		meridiem: ["['AM', 'PM']", 'Name of meridiems, if used', 'Array', true],
		timeOutput: ['%k:%M', 'Format for returned time', 'String', [0,0,0,0,1,1,0]],
		durationFormat: ['%Dd %DA, %Dl:%DM:%DS', 'Format for returned duration', 'String', [0,0,0,0,0,0,1]]
	}
};


