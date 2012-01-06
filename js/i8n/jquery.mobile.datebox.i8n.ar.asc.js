/*
* Arabic Translation
* jQuery Mobile Framework : plugin to provide a date and time picker.
* Copyright (c) JTSage
* CC 3.0 Attribution.  May be relicensed without permission/notification.
* https://github.com/jtsage/jquery-mobile-datebox
*/

jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
    'ar': {
	setDateButtonLabel: '&#x062A;&#x0639;&#x064A;&#x064A;&#x0646; &#x062A;&#x0627;&#x0631;&#x064A;&#x062E;',
	setTimeButtonLabel: '&#x0636;&#x0628;&#x0637; &#x0627;&#x0644;&#x0648;&#x0642;&#x062A;',
	setDurationButtonLabel: '&#x062A;&#x0639;&#x064A;&#x064A;&#x0646; &#x0627;&#x0644;&#x0645;&#x062F;&#x0629;',
	calTodayButtonLabel: '&#x0627;&#x0644;&#x0642;&#x0641;&#x0632; &#x0625;&#x0644;&#x0649; &#x0627;&#x0644;&#x064A;&#x0648;&#x0645;',
	titleDateDialogLabel: '&#x062A;&#x0639;&#x064A;&#x064A;&#x0646; &#x062A;&#x0627;&#x0631;&#x064A;&#x062E;',
	titleTimeDialogLabel: '&#x0636;&#x0628;&#x0637; &#x0627;&#x0644;&#x0648;&#x0642;&#x062A;',
	daysOfWeek: ['&#x0627;&#x0644;&#x0623;&#x062D;&#x062F;', '&#x0627;&#x0644;&#x0627;&#x062B;&#x0646;&#x064A;&#x0646;', '&#x0627;&#x0644;&#x062B;&#x0644;&#x0627;&#x062B;&#x0627;&#x0621;', '&#x0627;&#x0644;&#x0627;&#x0631;&#x0628;&#x0639;&#x0627;&#x0621;', '&#x0627;&#x0644;&#x062E;&#x0645;&#x064A;&#x0633;', '&#x0627;&#x0644;&#x062C;&#x0645;&#x0639;&#x0629;', '&#x0627;&#x0644;&#x0633;&#x0628;&#x062A;'],
	daysOfWeekShort: ['&#x0627;&#x0644;&#x0623;&#x062D;&#x062F;', '&#x0627;&#x0644;&#x0627;&#x062B;&#x0646;&#x064A;&#x0646;', '&#x0627;&#x0644;&#x062B;&#x0644;&#x0627;&#x062B;&#x0627;&#x0621;', '&#x0627;&#x0644;&#x0627;&#x0631;&#x0628;&#x0639;&#x0627;&#x0621;', '&#x0627;&#x0644;&#x062E;&#x0645;&#x064A;&#x0633;', '&#x0627;&#x0644;&#x062C;&#x0645;&#x0639;&#x0629;', '&#x0627;&#x0644;&#x0633;&#x0628;&#x062A;'],
	monthsOfYear: ['&#x064A;&#x0646;&#x0627;&#x064A;&#x0631;', '&#x0641;&#x0628;&#x0631;&#x0627;&#x064A;&#x0631;', '&#x0645;&#x0627;&#x0631;&#x0633;', '&#x0625;&#x0628;&#x0631;&#x064A;&#x0644;', '&#x0645;&#x0627;&#x064A;&#x0648;', '&#x064A;&#x0648;&#x0646;&#x064A;&#x0629;', '&#x064A;&#x0648;&#x0644;&#x064A;&#x0629;', '&#x0623;&#x063A;&#x0633;&#x0637;&#x0633;', '&#x0633;&#x0628;&#x062A;&#x0645;&#x0628;&#x0631;', '&#x0623;&#x0643;&#x062A;&#x0648;&#x0628;&#x0631;', '&#x0646;&#x0648;&#x0641;&#x0645;&#x0628;&#x0631;', '&#x062F;&#x064A;&#x0633;&#x0645;&#x0628;&#x0631;'],
	monthsOfYearShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
	durationLabel: ['&#x064A;&#x0648;&#x0645;' , '&#x0633;&#x0627;&#x0639;&#x0629;' , '&#x062F;&#x0642;&#x064A;&#x0642;&#x0629;' , '&#x062B;&#x0627;&#x0646;&#x064A;&#x0629;'],
	durationDays: ['&#x064A;&#x0648;&#x0645;', '&#x0623;&#x064A;&#x0627;&#x0645;'],
	timeFormat: 24,
	headerFormat: 'ddd, mmm dd, YYYY',
	dateFieldOrder: ['d', 'm', 'y'],
	timeFieldOrder: ['h', 'i', 'a'],
	slideFieldOrder: ['y', 'm', 'd'],
	dateFormat: 'DD/MM/YYYY',
	useArabicIndic: true,
	isRTL: true
    }
});
jQuery.extend(jQuery.mobile.datebox.prototype.options, {
    useLang: 'ar'
});
