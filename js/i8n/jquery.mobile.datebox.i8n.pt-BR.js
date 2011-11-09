jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
    'pt-BR': {
        setDateButtonLabel: 'Informar data',
        setTimeButtonLabel: 'Informar hora',
        setDurationButtonLabel: 'Informar duração',
        calTodayButtonLabel: 'Ir para hoje',
        titleDateDialogLabel: 'Escolha a data',
        titleTimeDialogLabel: 'Escolha a hora',
        daysOfWeek: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
        daysOfWeekShort: ['D','S','T','Q','Q','S','S'],
        monthsOfYear: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
        monthsOfYearShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
        durationLabel: ['Dias','Horas','Minutos','Segundos'],
        durationDays: ['Dia','Dias'],
        timeFormat: 12,
        dateFieldOrder: ['d', 'm', 'y'],
        timeFieldOrder: ['h', 'i', 'a'],
        slideFieldOrder: ['y', 'm', 'd'],
        headerFormat: 'ddd, mmm dd, YYYY',
        isRTL: false
    }
});
jQuery.extend(jQuery.mobile.datebox.prototype.options, {
    useLang: 'pt-BR'
});