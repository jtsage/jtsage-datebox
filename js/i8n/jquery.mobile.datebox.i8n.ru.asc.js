/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notifcation.
 * https://github.com/jtsage/jquery-mobile-datebox
 *
 * Translation by: Alexander Zolotko <azolotko@gmail.com>
 */

jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
	'ru': {
		setDateButtonLabel: '&#x0423;&#x0441;&#x0442;&#x0430;&#x043D;&#x043E;&#x0432;&#x0438;&#x0442;&#x044C; &#x0414;&#x0430;&#x0442;&#x0443;',
		setTimeButtonLabel: '&#x0423;&#x0441;&#x0442;&#x0430;&#x043D;&#x043E;&#x0432;&#x0438;&#x0442;&#x044C; &#x0412;&#x0440;&#x0435;&#x043C;&#x044F;',
		setDurationButtonLabel: '&#x0423;&#x0441;&#x0442;&#x0430;&#x043D;&#x043E;&#x0432;&#x0438;&#x0442;&#x044C; &#x041F;&#x0440;&#x043E;&#x0434;&#x043E;&#x043B;&#x0436;&#x0438;&#x0442;&#x0435;&#x043B;&#x044C;&#x043D;&#x043E;&#x0441;&#x0442;&#x044C;',
		calTodayButtonLabel: '&#x0421;&#x0435;&#x0433;&#x043E;&#x0434;&#x043D;&#x044F;',
		titleDateDialogLabel: '&#x0412;&#x044B;&#x0431;&#x0435;&#x0440;&#x0438;&#x0442;&#x0435; &#x0414;&#x0430;&#x0442;&#x0443;',
		titleTimeDialogLabel: '&#x0412;&#x044B;&#x0431;&#x0435;&#x0440;&#x0438;&#x0442;&#x0435; &#x0412;&#x0440;&#x0435;&#x043C;&#x044F;',
		daysOfWeek: ['&#x0412;&#x043E;&#x0441;&#x043A;&#x0440;&#x0435;&#x0441;&#x0435;&#x043D;&#x044C;&#x0435;','&#x041F;&#x043E;&#x043D;&#x0435;&#x0434;&#x0435;&#x043B;&#x044C;&#x043D;&#x0438;&#x043A;','&#x0412;&#x0442;&#x043E;&#x0440;&#x043D;&#x0438;&#x043A;','&#x0421;&#x0440;&#x0435;&#x0434;&#x0430;','&#x0427;&#x0435;&#x0442;&#x0432;&#x0435;&#x0440;&#x0433;','&#x041F;&#x044F;&#x0442;&#x043D;&#x0438;&#x0446;&#x0430;','&#x0421;&#x0443;&#x0431;&#x0431;&#x043E;&#x0442;&#x0430;'],
		daysOfWeekShort: ['&#x0412;&#x0441;','&#x041F;&#x043D;','&#x0412;&#x0442;','&#x0421;&#x0440;','&#x0427;&#x0442;','&#x041F;&#x0442;','&#x0421;&#x0431;'],
		monthsOfYear: ['&#x042F;&#x043D;&#x0432;&#x0430;&#x0440;&#x044C;','&#x0424;&#x0435;&#x0432;&#x0440;&#x0430;&#x043B;&#x044C;','&#x041C;&#x0430;&#x0440;&#x0442;','&#x0410;&#x043F;&#x0440;&#x0435;&#x043B;&#x044C;','&#x041C;&#x0430;&#x0439;','&#x0418;&#x044E;&#x043D;&#x044C;','&#x0418;&#x044E;&#x043B;&#x044C;','&#x0410;&#x0432;&#x0433;&#x0443;&#x0441;&#x0442;','&#x0421;&#x0435;&#x043D;&#x0442;&#x044F;&#x0431;&#x0440;&#x044C;','&#x041E;&#x043A;&#x0442;&#x044F;&#x0431;&#x0440;&#x044C;','&#x041D;&#x043E;&#x044F;&#x0431;&#x0440;&#x044C;','&#x0414;&#x0435;&#x043A;&#x0430;&#x0431;&#x0440;&#x044C;'],
		monthsOfYearShort: ['&#x042F;&#x043D;&#x0432;','&#x0424;&#x0435;&#x0432;','&#x041C;&#x0430;&#x0440;','&#x0410;&#x043F;&#x0440;','&#x041C;&#x0430;&#x0439;','&#x0418;&#x044E;&#x043D;','&#x0418;&#x044E;&#x043B;','&#x0410;&#x0432;&#x0433;','&#x0421;&#x0435;&#x043D;','&#x041E;&#x043A;&#x0442;','&#x041D;&#x043E;&#x044F;','&#x0414;&#x0435;&#x043A;'],
		durationLabel: ['&#x0414;&#x043D;&#x0438;','&#x0427;&#x0430;&#x0441;&#x044B;','&#x041C;&#x0438;&#x043D;&#x0443;&#x0442;&#x044B;','&#x0421;&#x0435;&#x043A;&#x0443;&#x043D;&#x0434;&#x044B;'],
		durationDays: ['&#x0414;&#x0435;&#x043D;&#x044C;','&#x0414;&#x043D;&#x0438;'],
		timeFormat: 24,
		dateFieldOrder: ['d', 'm', 'y'],
		timeFieldOrder: ['h', 'i', 'a'],
		slideFieldOrder: ['d', 'm', 'y'],
		headerFormat: 'ddd, mmm dd, YYYY',
		dateFormat: 'DD.MM.YYYY',
		isRTL: false
	}
});
jQuery.extend(jQuery.mobile.datebox.prototype.options, {
	useLang: 'ru'
});
