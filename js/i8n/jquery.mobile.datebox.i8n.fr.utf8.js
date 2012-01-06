/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notifcation.
 * https://github.com/jtsage/jquery-mobile-datebox
 *
 * Translation by:Keith Wood (kbwood{at}iinet.com.au),
              Stéphane Nahmani (sholby@sholby.net),
              Stéphane Raimbault <stephane.raimbault@gmail.com>
              google translate for a few things.  please fix.
 */

jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
	'fr': {
		setDateButtonLabel: 'Date Fixée',
		setTimeButtonLabel: "Régler l'heure",
		setDurationButtonLabel: 'Régler la durée',
		calTodayButtonLabel: "Aller à aujourd'hui",
		titleDateDialogLabel: 'Date Fixée',
		titleTimeDialogLabel: "Régler l'heure",
		daysOfWeek: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
		daysOfWeekShort: ['D','L','M','M','J','V','S'],
		monthsOfYear: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
		monthsOfYearShort: ['Janv','Févr','Mars','Avril','Mai','Juin','Juil.','Août','Sept','Oct','Nov','Déc'],
		durationLabel: ['Jours','Heures','Minutes','Secondes'],
		durationDays: ['Jour','Jours'],
		timeFormat: 24,
		dateFieldOrder: ['m', 'd', 'y'],
		timeFieldOrder: ['h', 'i', 'a'],
		slideFieldOrder: ['y', 'm', 'd'],
		headerFormat: 'ddd, mmm dd, YYYY',
		dateFormat: 'dd/mm/YYYY',
		isRTL: false
	}
});
jQuery.extend(jQuery.mobile.datebox.prototype.options, {
	useLang: 'fr'
});
