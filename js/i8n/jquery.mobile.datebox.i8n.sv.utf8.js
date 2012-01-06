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
		setDateButtonLabel: 'Välj datum',
		setTimeButtonLabel: 'Välj tid',
		setDurationButtonLabel: 'Välj varaktighet',
		calTodayButtonLabel: 'Gå till idag',
		titleDateDialogLabel: 'Välj datum',
		titleTimeDialogLabel: 'Välj tid',
		daysOfWeek: ['Söndag','Måndag','Tisdag','Onsdag','Torsdag','Fredag','Lördag'],
		daysOfWeekShort: ['Sö','Må','Ti','On','To','Fr','Lö'],
		monthsOfYear: ['Januari','Februari','Mars','April','Maj','Juni','July','Augusti','September','Oktober','November','December'],
		monthsOfYearShort: ['Jan','Feb','Mar','Apr','Maj','Jun','Jul','Aug','Sep','Okt','Nov','Dec'],
		durationLabel: ['Dagar','Timmar','Minuter','Sekunder'],
		durationDays: ['Dag','Dagar'],
		timeFormat: 24,
		dateFieldOrder: ['y', 'm', 'd'],
		timeFieldOrder: ['h', 'i', 'a'],
		slideFieldOrder: ['y', 'm', 'd'],
		headerFormat: 'ddd, dd mmm, YYYY',
		dateFormat: 'YYYY-MM-DD',
		isRTL: false
	}
});
jQuery.extend(jQuery.mobile.datebox.prototype.options, {
	useLang: 'sv'
});
