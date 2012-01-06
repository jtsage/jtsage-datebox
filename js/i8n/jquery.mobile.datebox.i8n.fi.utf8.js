/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notifcation.
 * https://github.com/jtsage/jquery-mobile-datebox
 *
 * Finnish localisation for JQM DateBox plugin *
 * Written by: Ville Salonen (ville.salonen@iki.fi)
 */

jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
	'fi': {
		setDateButtonLabel: 'Valitse päivä',
		setTimeButtonLabel: 'Valitse aika',
		setDurationButtonLabel: 'Valitse kesto',
		calTodayButtonLabel: 'Tänään',
		titleDateDialogLabel: 'Valitse päivä',
		titleTimeDialogLabel: 'Valitse aika',
		daysOfWeek: ['Sunnuntai','Maanantai','Tiistai','Keskiviikko','Torstai','Perjantai','Lauantai'],
		daysOfWeekShort: ['Su','Ma','Ti','Ke','To','Pe','La'],
		monthsOfYear: ['Tammikuu','Helmikuu','Maaliskuu','Huhtikuu','Toukokuu','Kesäkuu','Heinäkuu','Elokuu','Syyskuu','Lokakuu','Marraskuu','Joulukuu'],
		monthsOfYearShort: ['Tammi','Helmi','Maali','Huhti','Touko','Kesä','Heinä','Elo','Syys','Loka','Marras','Joulu'],
		durationLabel: ['Päivää','Tuntia','Minuuttia','Sekuntia'],
		durationDays: ['Päivä','Päivää'],
		timeFormat: 24,
		dateFieldOrder: ['d', 'm', 'y'],
		timeFieldOrder: ['h', 'i', 'a'],
		slideFieldOrder: ['d', 'm', 'y'],
		headerFormat: 'ddd DD.MM.YYYY',
		dateFormat: 'DD.MM.YYYY',
		isRTL: false
	}
});
jQuery.extend(jQuery.mobile.datebox.prototype.options, {
	useLang: 'fi'
});

