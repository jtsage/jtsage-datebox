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

jQuery.extend(jQuery.mobile.datebox.prototype.options, {
	setDateButtonLabel: 'Date Fix&#233;e',
	setTimeButtonLabel: "R&#233;gler l'heure",
	setDurationButtonLabel: 'R&#233;gler la dur&#233;e',
	calTodayButtonLabel: "Aller &#224; aujourd'hui",
	titleDateDialogLabel: 'Date Fix&#233;e',
	titleTimeDialogLabel: "R&#233;gler l'heure",
	daysofWeek: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
	daysofWeekShort: ['D','L','M','M','J','V','S'],
	monthsOfYear: ['Janvier','F&#233;vrier','Mars','Avril','Mai','Juin','Juillet','Ao&#251;t','Septembre','Octobre','Novembre','D&#233;cembre'],
	monthsOfYearShort: ['Janv','F&#233;vr','Mars','Avril','Mai','Juin','Juil.','Ao&#251;t','Sept','Oct','Nov','D&#233;c'],
	durationLabel: ['Jours','Heures','Minutes','Secondes'],
	durationDays: ['Jour','Jours'],
	timeFormat: 24,
	dateFieldOrder: ['m', 'd', 'y'],
	timeFieldOrder: ['h', 'i', 'a'],
	slideFieldOrder: ['y', 'm', 'd'],
	headerFormat: ddd, mmm dd, YYYY,
	isRTL: false
});
