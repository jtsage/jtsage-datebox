/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notifcation.
 * https://github.com/jtsage/jquery-mobile-datebox
 
 * Translation by: ChiElvis (elvis311@msn.com)
 */
 
jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
	'CHN-S': {
		setDateButtonLabel: '设置日期',
		setTimeButtonLabel: '设置时间',
		setDurationButtonLabel: '设置持续时间',
		calTodayButtonLabel: '选择今天日期',
		titleDateDialogLabel: '选择日期',
		titleTimeDialogLabel: '选择时间',
		daysOfWeek: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
		daysOfWeekShort: ['日','一','二','三','四','五','六'],
		monthsOfYear: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
		monthsOfYearShort: ['一','二','三','四','五','六','七','八','九','十','十一','十二'],
		durationLabel: ['天','小时','分钟','秒'],
		durationDays: ['天','天'],
		timeFormat: 12,
		dateFieldOrder: ['m', 'd', 'y'],
		timeFieldOrder: ['h', 'i', 'a'],
		slideFieldOrder: ['y', 'm', 'd'],
		headerFormat: 'ddd, mmm dd, YYYY',
		dateFormat: 'dd/mm/YYYY',
		isRTL: false
    }
});
jQuery.extend(jQuery.mobile.datebox.prototype.options, {
	useLang: 'CHN-S'
});
