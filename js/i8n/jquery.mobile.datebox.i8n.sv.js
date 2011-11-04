/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notifcation.
 * https://github.com/jtsage/jquery-mobile-datebox
 *
 * Swedish localisation for JQM DateBox plugin *
 * Written by: Henrik Ekselius (henrik@xelius.net)
 */
 
jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
	'sv': {
		setDateButtonLabel: 'V&#228;lj datum',
		setTimeButtonLabel: 'V&#228;lj tid',
		setDurationButtonLabel: 'V&#228;lj varaktighet',
		calTodayButtonLabel: 'G&#229; till idag',
		titleDateDialogLabel: 'V&#228;lj datum',
		titleTimeDialogLabel: 'V&#228;lj tid',
		daysOfWeek: ['S&#246;ndag','M&#229;ndag','Tisdag','Onsdag','Torsdag','Fredag','L&#246;rdag'],
		daysOfWeekShort: ['S&#246;','M&#229;','Ti','On','To','Fr','L&#246;'],
		monthsOfYear: ['Januari','Februari','Mars','April','Maj','Juni','July','Augusti','September','Oktober','November','December'],
		monthsOfYearShort: ['Jan','Feb','Mar','Apr','Maj','Jun','Jul','Aug','Sep','Okt','Nov','Dec'],
		durationLabel: ['Dagar','Timmar','Minuter','Sekunder'],
		durationDays: ['Dag','Dagar'],
		timeFormat: 24,
		dateFieldOrder: ['y', 'm', 'd'],
		timeFieldOrder: ['h', 'i', 'a'],
		slideFieldOrder: ['y', 'm', 'd'],
		headerFormat: 'ddd, dd mmm, YYYY',
		isRTL: false
	}
});
jQuery.extend(jQuery.mobile.datebox.prototype.options, {
	useLang: 'sv'
});
