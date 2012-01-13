/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notifcation.
 * https://github.com/jtsage/jquery-mobile-datebox
 *
 * Translation by: Rafael Carballo Cerqueira
 */
jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
    'es-ES': {
        setDateButtonLabel: 'Guardar Fecha',
        setTimeButtonLabel: 'Guardar Hora',
        setDurationButtonLabel: 'Guardar Duracion',
        calTodayButtonLabel: 'Hoy',
        titleDateDialogLabel: 'Elegir Fecha',
        titleTimeDialogLabel: 'Elegor Hora',
        daysOfWeek: ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'],
        daysOfWeekShort: ['Su','Mo','Tu','We','Th','Fr','Sa'],
        monthsOfYear: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviemebre','Diciembre'],
        monthsOfYearShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        durationLabel: ['Dias','Horas','Minutos','Segundos'],
        durationDays: ['Dia','Dias'],
        timeFormat: 12,
        dateFieldOrder: ['d', 'm', 'y'],
        timeFieldOrder: ['h', 'i', 'a'],
        slideFieldOrder: ['y', 'm', 'd'],
        headerFormat: 'ddd, dd mmm , YYYY',
		dateFormat: 'dd/mm/YYYY',
		useArabicIndic: false,
        isRTL: false
    }
});
jQuery.extend(jQuery.mobile.datebox.prototype.options, {
    useLang: 'es-ES'
});

