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
		setDateButtonLabel: 'Встановити Дату',
		setTimeButtonLabel: 'Встановити Час',
		setDurationButtonLabel: 'Встановити Тривалість',
		calTodayButtonLabel: 'Сьогодні',
		titleDateDialogLabel: 'Оберіть Дату',
		titleTimeDialogLabel: 'Оберіть Час',
		daysOfWeek: ['Неділя','Понеділок','Вівторок','Середа','Четвер','П\'ятниця','Субота'],
		daysOfWeekShort: ['Нд','Пн','Вт','Ср','Чт','Пт','Сб'],
		monthsOfYear: ['Січень','Лютий','Березень','Квітень','Травень','Червень','Липень','Серпень','Вересень','Жовтень','Листопад','Грудень'],
		monthsOfYearShort: ['Січ','Лют','Бер','Кві','Тра','Чер','Лип','Сер','Веп','Жов','Лис','Гру'],
		durationLabel: ['Дні','Години','Хвилини','Секунди'],
		durationDays: ['День','Дні'],
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
