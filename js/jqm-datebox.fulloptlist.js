/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notification.
 * https://github.com/jtsage/jquery-mobile-datebox
 */
/* CORE Functions */

//Mode List: [dbox,calbox,flipbox,slidebox,timebox,timeflipbox,durationbox] or true
var stuff = { // ['default','desc','type','mode list']
		themes: {
			XXname: 'Theme Options',
			theme: [false, 'Base theme for control', 'Boolean', true],
			themeHeader: ['a', 'Theme for header', 'String', true]
		},
		common: {
			XXname: 'Common Options',
			mode: ['', 'Mode of operations', 'String', true],
			lockInput: [true, 'Lock the Input Element from manual input', 'Boolean', true],
			enhanceInput: [true, 'Enhance Numeric Inputs on Mobile', 'Boolean', [1,0,0,0,1,0,0]],
		},
		display: {
			XXname: 'Display Options',
			centerHoriz: [false, 'Center Horizonitally', 'Boolean', true],
			centerVert: [false, 'Center Verticlly', 'Boolean', true],
			transition: ['pop', 'Transition for display', 'String', true],
			useAnimation: [true, 'Use Animations', 'Boolean', true],
			
			hideInput: [false, 'Hide the Input Element', 'Boolean', true],
			hideFixedToolbars: [false, 'Hide Fixed toolbars on open', 'Boolean', true],
			
			zindex: '500',
			clickEvent: 'vclick',
			resizeListener: true,
			defaultValue: false,
			dialogEnable: false,
			dialogForce: false,
			useModal: false,
			useInline: false,
			useInlineBlind: false,
			useHeader: true,
			useImmediate: false,
			useButton: true,
			useFocus: false,
			useClearButton: false,
			useCollapsedBut: false,
			//rolloverMode: { 'm': true, 'd': true, 'h': true, 'i': true, 's': true },
		},
		callback: {
			openCallback: false,
			//openCallbackArgs: [],
			closeCallback: false,
			//closeCallbackArgs: [],
		},
		limiting: {
			afterToday: false,
			beforeToday: false,
			notToday: false,
			maxDays: false,
			minDays: false,
			maxYear: false,
			minYear: false,
			blackDates: false,
			blackDays: false,
			minHour: false,
			maxHour: false,
			validHours: false,
			minuteStep: 1
		},
		/*i18n: {
			setDateButtonLabel: 'Set Date',
			setTimeButtonLabel: 'Set Time',
			setDurationButtonLabel: 'Set Duration',
			calTodayButtonLabel: 'Jump to Today',
			titleDateDialogLabel: 'Set Date',
			titleTimeDialogLabel: 'Set Time',
			daysOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
			daysOfWeekShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
			monthsOfYear: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			monthsOfYearShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			durationLabel: ['Days', 'Hours', 'Minutes', 'Seconds'],
			durationDays: ['Day', 'Days'],
			timeFormat: 24,
			headerFormat: '%A, %B %-d, %Y',
			tooltip: 'Open Date Picker',
			nextMonth: 'Next Month',
			prevMonth: 'Previous Month',
			dateFieldOrder: ['m', 'd', 'y'],
			timeFieldOrder: ['h', 'i', 'a'],
			slideFieldOrder: ['y', 'm', 'd'],
			dateFormat: '%Y-%m-%d',
			useArabicIndic: false,
			isRTL: false,
			calStartDay: 0,
			clearButton: 'Clear',
			durationOrder: ['d', 'h', 'i', 's'],
			meridiem: ['AM', 'PM'],
			timeOutput: '%k:%M', //{ '12': '%l:%M %p', '24': '%k:%M' },
			durationFormat: '%Dd %DA, %Dl:%DM:%DS'
		}*/
	};

/*
themeDateHigh: 'e',
		themeDatePick: 'a',
		themeDate: 'd',
		useSetButton: true,
		validHours: false,
		slen: {'y': 5, 'm':6, 'd':15, 'h':12, 'i':30}
		
		themeDateHigh: 'e',
		themeDatePick: 'a',
		themeDate: 'b',
		useSetButton: true,
		validHours: false,
		flen: {'y': 15, 'm':12, 'd':15, 'h':12, 'i':15, 'a':3}
		
		themeButton: 'a',
		themeInput: 'e',
		useSetButton: true,
		durationSteppers: {'d': 1, 'h': 1, 'i': 1, 's': 1}
		
		themeButton: 'a',
		themeInput: 'e',
		* 
		useSetButton: true,
		validHours: false
		
		themeDateToday: 'e',
		themeDayHigh: 'e',
		themeDatePick: 'e',
		themeDateHigh: 'e',
		themeDateHighAlt: 'e',
		themeDate: 'a',
		
		calHighToday: true,
		calHighPick: true,
		
		calShowDays: true,
		calOnlyMonth: false,
		calWeekMode: false,
		calWeekModeDay: 1,
		calWeekHigh: false,
		calControlGroup: false,
		
		useTodayButton: false,
		useCollapsedBut: false,
		
		highDays: false,
		highDates: false,
		highDatesAlt: false,
		enableDates: false
*/
