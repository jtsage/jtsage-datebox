/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notifcation.
 * https://github.com/jtsage/jquery-mobile-datebox
 *
 * Translation by: Giuseppe Petagine giuseppe.petagine@virgilio.it
 */

jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
	'it-IT': {
		setDateButtonLabel: 'Setta Data',
		setTimeButtonLabel: 'Setta Tempo',
		setDurationButtonLabel: 'Setta Durata',
		calTodayButtonLabel: 'Vai ad oggi',
		titleDateDialogLabel: 'Scegli Data',
		titleTimeDialogLabel: 'Scegli Tempo',
		daysOfWeek: ['Domenica','Luned&#236;','Marted&#236;','Mercoled&#236;','Gioved&#236;','Venerd&#236;','Sabato'],
		daysOfWeekShort: ['Do','Lu','Ma','Me','Gi','Ve','Sa'],
		monthsOfYear: ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'],
		monthsOfYearShort: ['Gen','Feb','Mar','Apr','Mag','Giu','Lug','Ago','Set','Ott','Nov','Dic'],
		durationLabel: ['Giorni','Ore','Minuti','Secondi'],
		durationDays: ['Giorno','Giorni'],
		timeFormat: 12,
		dateFieldOrder: ['d', 'm', 'y'],
		timeFieldOrder: ['h', 'i', 'a'],
		slideFieldOrder: ['d', 'm', 'y'],
		headerFormat: 'ddd, mmm dd, YYYY',
		dateFormat: 'dd/mm/YYYY',
		isRTL: false
	}
});
jQuery.extend(jQuery.mobile.datebox.prototype.options, {
	useLang: 'it-IT'
});
