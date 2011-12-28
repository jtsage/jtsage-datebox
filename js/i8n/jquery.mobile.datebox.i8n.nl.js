/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notifcation.
 * https://github.com/jtsage/jquery-mobile-datebox
 *
 * Translation by: G. Hengeveld <info@ghengeveld.nl>
 */

jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
	'nl': {
		setDateButtonLabel: 'Datum instellen',
		setTimeButtonLabel: 'Tijd instellen',
		setDurationButtonLabel: 'Duur instellen',
		calTodayButtonLabel: 'Spring naar vandaag',
		titleDateDialogLabel: 'Kies datum',
		titleTimeDialogLabel: 'Kies tijd',
		daysOfWeek: ['Zondag','Maandag','Dinsdag','Woensdag','Donderdag','Vrijdag','Zaterdag'],
		daysOfWeekShort: ['Zo','Ma','Di','Wo','Do','Vr','Za'],
		monthsOfYear: ['Januari','Februari','Maart','April','Mei','Juni','Juli','Augustus','September','Oktober','November','December'],
		monthsOfYearShort: ['Jan','Feb','Mrt','Apr','Mei','Jun','Jul','Aug','Sep','Okt','Nov','Dec'],
		durationLabel: ['Dagen','Uren','Minuten','Seconden'],
		durationDays: ['Dag','Dagen'],
		timeFormat: 24,
		dateFieldOrder: ['d', 'm', 'y'],
		timeFieldOrder: ['h', 'i', 'a'],
		slideFieldOrder: ['d', 'm', 'y'],
		headerFormat: 'ddd, mmm dd, YYYY',
		dateFormat: 'DD-MM-YYYY',
		isRTL: false
	}
});
jQuery.extend(jQuery.mobile.datebox.prototype.options, {
	useLang: 'nl'
});
