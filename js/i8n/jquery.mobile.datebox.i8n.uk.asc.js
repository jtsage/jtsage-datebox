/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notifcation.
 * https://github.com/jtsage/jquery-mobile-datebox
 *
 * Translation by: Alexander Zolotko <azolotko@gmail.com>
 */

jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
	'uk': {
		setDateButtonLabel: '&#x0412;&#x0441;&#x0442;&#x0430;&#x043D;&#x043E;&#x0432;&#x0438;&#x0442;&#x0438; &#x0414;&#x0430;&#x0442;&#x0443;',
		setTimeButtonLabel: '&#x0412;&#x0441;&#x0442;&#x0430;&#x043D;&#x043E;&#x0432;&#x0438;&#x0442;&#x0438; &#x0427;&#x0430;&#x0441;',
		setDurationButtonLabel: '&#x0412;&#x0441;&#x0442;&#x0430;&#x043D;&#x043E;&#x0432;&#x0438;&#x0442;&#x0438; &#x0422;&#x0440;&#x0438;&#x0432;&#x0430;&#x043B;&#x0456;&#x0441;&#x0442;&#x044C;',
		calTodayButtonLabel: '&#x0421;&#x044C;&#x043E;&#x0433;&#x043E;&#x0434;&#x043D;&#x0456;',
		titleDateDialogLabel: '&#x041E;&#x0431;&#x0435;&#x0440;&#x0456;&#x0442;&#x044C; &#x0414;&#x0430;&#x0442;&#x0443;',
		titleTimeDialogLabel: '&#x041E;&#x0431;&#x0435;&#x0440;&#x0456;&#x0442;&#x044C; &#x0427;&#x0430;&#x0441;',
		daysOfWeek: ['&#x041D;&#x0435;&#x0434;&#x0456;&#x043B;&#x044F;','&#x041F;&#x043E;&#x043D;&#x0435;&#x0434;&#x0456;&#x043B;&#x043E;&#x043A;','&#x0412;&#x0456;&#x0432;&#x0442;&#x043E;&#x0440;&#x043E;&#x043A;','&#x0421;&#x0435;&#x0440;&#x0435;&#x0434;&#x0430;','&#x0427;&#x0435;&#x0442;&#x0432;&#x0435;&#x0440;','&#x041F;\'&#x044F;&#x0442;&#x043D;&#x0438;&#x0446;&#x044F;','&#x0421;&#x0443;&#x0431;&#x043E;&#x0442;&#x0430;'],
		daysOfWeekShort: ['&#x041D;&#x0434;','&#x041F;&#x043D;','&#x0412;&#x0442;','&#x0421;&#x0440;','&#x0427;&#x0442;','&#x041F;&#x0442;','&#x0421;&#x0431;'],
		monthsOfYear: ['&#x0421;&#x0456;&#x0447;&#x0435;&#x043D;&#x044C;','&#x041B;&#x044E;&#x0442;&#x0438;&#x0439;','&#x0411;&#x0435;&#x0440;&#x0435;&#x0437;&#x0435;&#x043D;&#x044C;','&#x041A;&#x0432;&#x0456;&#x0442;&#x0435;&#x043D;&#x044C;','&#x0422;&#x0440;&#x0430;&#x0432;&#x0435;&#x043D;&#x044C;','&#x0427;&#x0435;&#x0440;&#x0432;&#x0435;&#x043D;&#x044C;','&#x041B;&#x0438;&#x043F;&#x0435;&#x043D;&#x044C;','&#x0421;&#x0435;&#x0440;&#x043F;&#x0435;&#x043D;&#x044C;','&#x0412;&#x0435;&#x0440;&#x0435;&#x0441;&#x0435;&#x043D;&#x044C;','&#x0416;&#x043E;&#x0432;&#x0442;&#x0435;&#x043D;&#x044C;','&#x041B;&#x0438;&#x0441;&#x0442;&#x043E;&#x043F;&#x0430;&#x0434;','&#x0413;&#x0440;&#x0443;&#x0434;&#x0435;&#x043D;&#x044C;'],
		monthsOfYearShort: ['&#x0421;&#x0456;&#x0447;','&#x041B;&#x044E;&#x0442;','&#x0411;&#x0435;&#x0440;','&#x041A;&#x0432;&#x0456;','&#x0422;&#x0440;&#x0430;','&#x0427;&#x0435;&#x0440;','&#x041B;&#x0438;&#x043F;','&#x0421;&#x0435;&#x0440;','&#x0412;&#x0435;&#x043F;','&#x0416;&#x043E;&#x0432;','&#x041B;&#x0438;&#x0441;','&#x0413;&#x0440;&#x0443;'],
		durationLabel: ['&#x0414;&#x043D;&#x0456;','&#x0413;&#x043E;&#x0434;&#x0438;&#x043D;&#x0438;','&#x0425;&#x0432;&#x0438;&#x043B;&#x0438;&#x043D;&#x0438;','&#x0421;&#x0435;&#x043A;&#x0443;&#x043D;&#x0434;&#x0438;'],
		durationDays: ['&#x0414;&#x0435;&#x043D;&#x044C;','&#x0414;&#x043D;&#x0456;'],
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
	useLang: 'uk'
});
