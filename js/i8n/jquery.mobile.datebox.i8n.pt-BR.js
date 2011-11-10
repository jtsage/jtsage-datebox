/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notifcation.
 * https://github.com/jtsage/jquery-mobile-datebox
 *
 * Translation by: Rodrigo Vieira <rodrigovieira1994@gmail.com>
 */

jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
    'pt-BR': {
        setDateButtonLabel: 'Informar data',
        setTimeButtonLabel: 'Informar hora',
		setDurationButtonLabel: 'Informar dura&#231;&#227;o',
        calTodayButtonLabel: 'Ir para hoje',
        titleDateDialogLabel: 'Escolha a data',
        titleTimeDialogLabel: 'Escolha a hora',
		daysOfWeek: ['Domingo','Segunda','Ter&#231;a','Quarta','Quinta','Sexta','S&#225;bado'],
        daysOfWeekShort: ['D','S','T','Q','Q','S','S'],
        monthsOfYear: ['Janeiro','Fevereiro','Mar&#231;o','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
        monthsOfYearShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
        durationLabel: ['Dias','Horas','Minutos','Segundos'],
        durationDays: ['Dia','Dias'],
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
    useLang: 'pt-BR'
});
