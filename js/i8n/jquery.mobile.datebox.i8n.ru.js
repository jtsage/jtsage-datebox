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
		setDateButtonLabel: 'Установить Дату',
		setTimeButtonLabel: 'Установить Время',
		setDurationButtonLabel: 'Установить Продолжительность',
		calTodayButtonLabel: 'Сегодня',
		titleDateDialogLabel: 'Выберите Дату',
		titleTimeDialogLabel: 'Выберите Время',
		daysOfWeek: ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
		daysOfWeekShort: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
		monthsOfYear: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
		monthsOfYearShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
		durationLabel: ['Дни','Часы','Минуты','Секунды'],
		durationDays: ['День','Дни'],
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
