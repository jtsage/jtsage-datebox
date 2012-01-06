/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notifcation.
 * https://github.com/jtsage/jquery-mobile-datebox
 *
 * Translation by: Michele Dal Corso <mdalco@gmail.com>
 */

jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
	'it': {
		setDateButtonLabel: 'Conferma data',
		setTimeButtonLabel: 'Conferma orario',
		setDurationButtonLabel: 'Conferma lasso di tempo',
		calTodayButtonLabel: 'Vai ad oggi',
		titleDateDialogLabel: 'Scegli una data',
		titleTimeDialogLabel: 'Scegli un orario',
		daysOfWeek: ['Domenica','Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato'],
		daysOfWeekShort: ['Do','Lu','Ma','Me','Gi','Ve','Sa'],
		monthsOfYear: ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'],
		monthsOfYearShort: ['Gen','Feb','Mar','Apr','Mag','Giu','Lug','Ago','Set','Ott','Nov','Dic'],
		durationLabel: ['Giorni','Ore','Minuti','Secondi'],
		durationDays: ['Giorno','Giorni'],
		timeFormat: 24,
		dateFieldOrder: ['d', 'm', 'y'],
		timeFieldOrder: ['h', 'i', 'a'],
		slideFieldOrder: ['d', 'm', 'y'],
		headerFormat: 'ddd, dd mmm YYYY',
		dateFormat: 'DD-MM-YYYY',
		isRTL: false
	}
});
jQuery.extend(jQuery.mobile.datebox.prototype.options, {
	useLang: 'it'
});
