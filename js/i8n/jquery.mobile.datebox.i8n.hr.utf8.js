/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notifcation.
 * https://github.com/jtsage/jquery-mobile-datebox
 *
 * Translation by: Marko <ma3ko0@gmail.com>
 */

jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
	'hr': {
		setDateButtonLabel: 'Postavi Datum',
		setTimeButtonLabel: 'Postavi Vrijeme',
		setDurationButtonLabel: 'Postavi Trajanje',
		calTodayButtonLabel: 'Današnji Datum',
		titleDateDialogLabel: 'Odaberi Datum',
		titleTimeDialogLabel: 'Odaberi Vrijeme',
		daysOfWeek: ['Nedjelja','Ponedjeljak','Utorak','Srijeda','Četvrtak','Petak','Subota'],
		daysOfWeekShort: ['Ne','Po','Ut','Sr','Če','Pe','Su'],
		monthsOfYear: ['Siječanj','Veljača','Ožujak','Travanj','Svibanj','Lipanj','Srpanj','Kolovoz','Rujan','Listopad','Studeni','Prosinac'],
		monthsOfYearShort: ['Sij','Vel','Ožu','Tra','Svi','Lip','Srp','Kol','Ruj','Lis','Stu','Pro'],
		durationLabel: ['Dani','Sati','Minute','Sekunde'],
		durationDays: ['Dan','Dani'],
		timeFormat: 12,
		dateFieldOrder: ['d', 'm', 'y'],
		timeFieldOrder: ['h', 'i', 'a'],
		slideFieldOrder: ['y', 'm', 'd'],
		headerFormat: 'ddd, mmm dd, YYYY',
		dateFormat: 'dd.mm.YYYY',
		useArabicIndic: false,
		isRTL: false
	}
});

jQuery.extend(jQuery.mobile.datebox.prototype.options, {
	useLang: 'hr'
});
