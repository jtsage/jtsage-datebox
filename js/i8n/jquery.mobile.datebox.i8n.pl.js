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
		setDateButtonLabel: 'Ustaw dat&#281;',
		setTimeButtonLabel: 'Ustaw godzin&#281;',
		setDurationButtonLabel: 'Ustaw okres',
		calTodayButtonLabel: 'Dzisiaj',
		titleDateDialogLabel: 'Ustaw dat&#281;',
		titleTimeDialogLabel: 'Ustaw godzin&#281;',
		daysOfWeek: ['Niedziela','Poniedzia&#322;ek','Wtorek','&#346;roda','Czwartek','Pi&#261;tek','Sobota'],
		daysOfWeekShort: ['Nd','Pn','Wt','&#346;r','Cz','Pt','Sb'],
		monthsOfYear: ['Stycze&#324;','Luty','Marzec','Kwiecie&#324;','Maj','Czerwiec','Lipiec','Sierpie&#324;','Wrzesie&#324;','Pa&#378;dziernik','Listopad','Grudzie&#324;'],
		monthsOfYearShort: ['Sty','Lut','Mar','Kwi','Maj','Cze','Lip','Sie','Wrz','Pa&#378;','Lis','gru'],
		durationLabel: ['Dni','Godziny','Minuty','Sekundy'],
		durationDays: ['Dzie&#324;','Dni'],
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
