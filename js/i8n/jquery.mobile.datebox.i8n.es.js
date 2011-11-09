/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notifcation.
 * https://github.com/jtsage/jquery-mobile-datebox
 
 * Translation by: Vester (xvester@gmail.com) [the correct parts] and 
 * J.T.Sage [the parts that clearly came from google translate]
 * 
 * Inicialización en español para la extensión 'UI date picker' para jQuery. *
 * Traducido por Vester (xvester@gmail.com). *
 */
 
jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
	'es': {
		setDateButtonLabel: 'Establecer la fecha',
		setTimeButtonLabel: 'Establecer el tiempo',
		setDurationButtonLabel: 'establecer la duraci&#243;n',
		calTodayButtonLabel: 'El d&#237;a de hoy',
		titleDateDialogLabel: 'Establecer la fecha',
		titleTimeDialogLabel: 'Establecer el tiempo',
		daysOfWeek: ['Domingo','Lunes','Martes','Mi&#xE9;rcoles','Jueves','Viernes','S&#xE1;bado'],
		daysOfWeekShort: ['Do','Lu','Ma','Mi','Ju','Vi','S&#xE1;'],
		monthsOfYear: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
		monthsOfYearShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
		durationLabel: ['D&#237;a', 'Horas', 'Minutos', 'Segundo'],
		durationDays: ['D&#237;a', 'D&#237;a'],
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
	useLang: 'es'
});
