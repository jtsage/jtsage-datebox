/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notifcation.
 * https://github.com/jtsage/jquery-mobile-datebox
 *
 * Translation by: unknown contibutor, google translate - please fix.
 */

jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
	'de': {
		setDateButtonLabel: 'Eingestellte Datum',
		setTimeButtonLabel: 'Eingestellten Zeit',
		setDurationButtonLabel: 'Eingestellte Dauer',
		calTodayButtonLabel: 'Zum aktuellen Datum',
		titleDateDialogLabel: 'Eingestellte Datum',
		titleTimeDialogLabel: 'Eingestellten Zeit',
		daysOfWeek: ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'],
		daysOfWeekShort: ['So','Mo','Di','Mi','Do','Fr','Sa'],
		monthsOfYear: ['Januar','Februar','Marz','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
		monthsOfYearShort: ['Jan','Feb','Mar','Apr','Mai','Jun','Jul','Aug','Sep','Oct','Nov','Dez'],
		durationLabel: ['Tage', 'Stunden', 'Minuten', 'Sekunden'],
		durationDays: ['Tag', 'Tage'],
		timeFormat: 24,
		dateFieldOrder: ['d', 'm', 'y'],
		timeFieldOrder: ['h', 'i', 'a'],
		slideFieldOrder: ['y', 'm', 'd'],
		headerFormat: 'ddd, mmm dd, YYYY',
		isRTL: false
	}
});
jQuery.extend(jQuery.mobile.datebox.prototype.options, {
	useLang: 'de'
});
