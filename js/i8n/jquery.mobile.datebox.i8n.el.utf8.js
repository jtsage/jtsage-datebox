/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notifcation.
 * https://github.com/jtsage/jquery-mobile-datebox
 *
 * Translation by: Giannis Kosmas <kosmasgiannis@gmail.com>
 */

jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
	'el': {
		setDateButtonLabel: 'Καθορισμός Ημερομηνίας',
		setTimeButtonLabel: 'Καθορισμός Ώρας',
		setDurationButtonLabel: 'Καθορισμός Διάρκειας',
		calTodayButtonLabel: 'Μετάβαση στη σημερινή',
		titleDateDialogLabel: 'Καθορισμός Ημερομηνίας',
		titleTimeDialogLabel: 'Καθορισμός Ώρας',
		daysOfWeek: ['Κυριακή','Δευτέρα','Τρίτη','Τετάρτη','Πέμπτη','Παρασκευή','Σάββατο'],
		daysOfWeekShort: ['Κυ','Δε','Τρ','Τε','Πε','Πα','Σα'],
		monthsOfYear: ['Ιανουάριος','Φεβρουάριος','Μάρτιος','Απρίλιος','Μάιος','Ιούνιος','Ιούλιος','Αύγουστος','Σεπτέμβριος','Οκτώβριος','Νοέμβριος','Δεκέμβριος'],
		monthsOfYearShort: ['Ιαν','Φεβ','Μαρ','Απρ','Μάι','Ιούν','Ιούλ','Αύγ','Σεπ','Οκτ','Νοέ','Δεκ'],
		durationLabel: ['Ημέρες','Ώρες','Λεπτά','Δευτερόλεπτα'],
		durationDays: ['Ημέρα','Ημέρες'],
		timeFormat: 24,
		dateFieldOrder: ['d', 'm', 'y'],
		timeFieldOrder: ['h', 'i', 'a'],
		slideFieldOrder: ['y', 'm', 'd'],
		headerFormat: 'ddd, mmm dd, YYYY',
		dateFormat: 'dd/mm/YYYY',
		isRTL: false
	}
});
jQuery.extend(jQuery.mobile.datebox.prototype.options, {
	useLang: 'el'
});
