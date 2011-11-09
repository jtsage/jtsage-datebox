/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notifcation.
 * https://github.com/jtsage/jquery-mobile-datebox
 *
 * Translation by: moon dial
 */

jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
	'jp': {
		setDateButtonLabel: '&#26085;&#20184;&#12434;&#35373;&#23450;', /* '日付を設定' */
		setTimeButtonLabel: '&#26178;&#21051;&#12434;&#35373;&#23450;', /* '時刻を設定' */
		setDurationButtonLabel: '&#26399;&#38291;&#12434;&#35373;&#23450;', /* '期間を設定' */
		calTodayButtonLabel: '&#20170;&#26085;&#12408;&#12472;&#12515;&#12531;&#12503;', /* '今日へジャンプ' */
		titleDateDialogLabel: '&#26085;&#20184;&#12434;&#36984;&#25246;', /* '日付を選択' */
		titleTimeDialogLabel: '&#26178;&#21051;&#12434;&#36984;&#25246;', /* '時刻を選択' */
		
		/* daysOfWeek: ['日曜','月曜','火曜','水曜','木曜','金曜','土曜'], */
		daysOfWeek: ['&#26085;&#26332;','&#26376;&#26332;','&#28779;&#26332;','&#27700;&#26332;','&#26408;&#26332;','&#37329;&#26332;','&#22303;&#26332;'],
		/*
		 * The following is as long as the day of the week names can become: 3 two-byte chars
		 * daysOfWeek: ['日曜日','月曜日','火曜日','水曜日','木曜日','金曜日','土曜日'],
		 * daysOfWeek: ['&#26085;&#26332;&#26085;','&#26376;&#26332;&#26085;','&#28779;&#26332;&#26085;','&#27700;&#26332;&#26085;','&#26408;&#26332;&#26085;','&#37329;&#26332;&#26085;','&#22303;&#26332;&#26085;'],
		 */
		/* daysOfWeekShort: ['日','月','火','水','木','金','土'], */
		daysOfWeekShort: ['&#26085;','&#26376;','&#28779;','&#27700;','&#26408;','&#37329;','&#22303;'],
		/* monthsOfYear: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'], */
		monthsOfYear: ['1&#26376;','2&#26376;','3&#26376;','4&#26376;','5&#26376;','6&#26376;','7&#26376;','8&#26376;','9&#26376;','10&#26376;','11&#26376;','12&#26376;'],
		/* monthsOfYearShort: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'], */
		monthsOfYearShort: ['1&#26376;','2&#26376;','3&#26376;','4&#26376;','5&#26376;','6&#26376;','7&#26376;','8&#26376;','9&#26376;','10&#26376;','11&#26376;','12&#26376;'],
		durationLabel: ['&#26085;','&#26178;&#38291;','&#20998;','&#31186;'], /* ['日','時間','分','秒'] */
		durationDays: ['&#26085;','&#26085;'], /* ['日','日'] */
		timeFormat: 24,
		dateFieldOrder: ['m', 'd', 'y'],
		timeFieldOrder: ['h', 'i', 'a'],
		slideFieldOrder: ['y', 'm', 'd'],
		headerFormat: 'ddd, mmm dd, YYYY',
		dateFormat: 'YYYY/mm/dd',
		isRTL: false
	}
});
jQuery.extend(jQuery.mobile.datebox.prototype.options, {
    useLang: 'jp'
});
