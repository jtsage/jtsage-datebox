/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notifcation.
 * https://github.com/jtsage/jquery-mobile-datebox
 *
 * Translation by: J.T.Sage <jtsage@gmail.com>
 */

jQuery.extend(jQuery.mobile.datebox.prototype.options, {
	setDateButtonLabel: 'Set Date',
	setTimeButtonLabel: 'Set Time',
	setDurationButtonLabel: 'Set Duration',
	calTodayButtonLabel: 'Jump to Today',
	titleDateDialogLabel: 'Choose Date',
	titleTimeDialogLabel: 'Choose Time',
	daysofWeek: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
	daysofWeekShort: ['Su','Mo','Tu','We','Th','Fr','Sa'],
	monthsOfYear: ['January','February','March','April','May','June','July','August','September','October','Novemeber','December'],
	monthsOfYearShort: ['Jan','Feb','Mar','Arp','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
	durationLabel: ['Days','Hours','Minutes','Seconds'],
	durationDays: ['Day','Days'],
	timeFormat: 12,
	dateFieldOrder: ['m', 'd', 'y'],
	timeFieldOrder: ['h', 'i', 'a'],
	slideFieldOrder: ['y', 'm', 'd'],
	headerFormat: ddd, mmm dd, YYYY,
	isRTL: false
});
