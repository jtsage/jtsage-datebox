/*
* Arabic Translation
* jQuery Mobile Framework : plugin to provide a date and time picker.
* Copyright (c) JTSage
* CC 3.0 Attribution.  May be relicensed without permission/notification.
* https://github.com/jtsage/jquery-mobile-datebox
*/

jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
    'ar': {
	setDateButtonLabel: 'تعيين تاريخ',
	setTimeButtonLabel: 'ضبط الوقت',
	setDurationButtonLabel: 'تعيين المدة',
	calTodayButtonLabel: 'القفز إلى اليوم',
	titleDateDialogLabel: 'تعيين تاريخ',
	titleTimeDialogLabel: 'ضبط الوقت',
	daysOfWeek: ['الأحد', 'الاثنين', 'الثلاثاء', 'الاربعاء', 'الخميس', 'الجمعة', 'السبت'],
	daysOfWeekShort: ['الأحد', 'الاثنين', 'الثلاثاء', 'الاربعاء', 'الخميس', 'الجمعة', 'السبت'],
	monthsOfYear: ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونية', 'يولية', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
	monthsOfYearShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
	durationLabel: ['يوم' , 'ساعة' , 'دقيقة' , 'ثانية'],
	durationDays: ['يوم', 'أيام'],
	timeFormat: 24,
	headerFormat: 'ddd, mmm dd, YYYY',
	dateFieldOrder: ['d', 'm', 'y'],
	timeFieldOrder: ['h', 'i', 'a'],
	slideFieldOrder: ['y', 'm', 'd'],
	dateFormat: 'DD/MM/YYYY',
	useArabicIndic: true,
	calStartDay: 0,
	isRTL: true
    }
});
jQuery.extend(jQuery.mobile.datebox.prototype.options, {
    useLang: 'ar'
});
