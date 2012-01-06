/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notifcation.
 * https://github.com/jtsage/jquery-mobile-datebox
 *
 * Translation by: Zbigniew Motyka <zbigniew@motyka.net.pl>
 */

jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
	'pl': {
		setDateButtonLabel: 'Ustaw datę',
		setTimeButtonLabel: 'Ustaw godzinę',
		setDurationButtonLabel: 'Ustaw okres',
		calTodayButtonLabel: 'Dzisiaj',
		titleDateDialogLabel: 'Ustaw datę',
		titleTimeDialogLabel: 'Ustaw godzinę',
		daysOfWeek: ['Niedziela','Poniedziałek','Wtorek','Środa','Czwartek','Piątek','Sobota'],
		daysOfWeekShort: ['Nd','Pn','Wt','Śr','Cz','Pt','Sb'],
		monthsOfYear: ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'],
		monthsOfYearShort: ['Sty','Lut','Mar','Kwi','Maj','Cze','Lip','Sie','Wrz','Paź','Lis','gru'],
		durationLabel: ['Dni','Godziny','Minuty','Sekundy'],
		durationDays: ['Dzień','Dni'],
		timeFormat: 24,
		dateFieldOrder: ['d', 'm', 'y'],
		timeFieldOrder: ['h', 'i', 'a'],
		slideFieldOrder: ['d', 'm', 'y'],
		headerFormat: 'ddd, mmm dd, YYYY',
		dateFormat: 'YYYY-MM-DD',
		isRTL: false
	}
});
jQuery.extend(jQuery.mobile.datebox.prototype.options, {
	useLang: 'pl' });
