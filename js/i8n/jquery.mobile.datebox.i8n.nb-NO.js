jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
    'nb-NO': {
        setDateButtonLabel: 'Velg dato',
        setTimeButtonLabel: 'Velg tidspunkt',
        setDurationButtonLabel: 'Velg varighet',
        calTodayButtonLabel: 'Gå til dagens dato',
        titleDateDialogLabel: 'Velg dato',
        titleTimeDialogLabel: 'Velg tidspunkt',
        daysOfWeek: ['Søndag','Mandag','Tirsdag','Onsdag','Torsdag','Fredag','Lørdag'],
        daysOfWeekShort: ['Søn','Man','Tirs','Ons','Tors','Fre','Lør'],
        monthsOfYear: ['januar','februar','mars','april','mai','juni','juli','august','september','oktober','november','desember'],
        monthsOfYearShort: ['jan','feb','mar','apr','mai','jun','jul','aug','sep','okt','nov','des'],
        durationLabel: ['Dager','Timer','Minutter','Sekunder'],
        durationDays: ['Dag','Dager'],
        timeFormat: 24,
        dateFieldOrder: ['d', 'm', 'y'],
        timeFieldOrder: ['h', 'i', 'a'],
        slideFieldOrder: ['d', 'm', 'y'],
        headerFormat: 'ddd, mmm dd, YYYY',
	    dateFormat: 'mm/dd/YYYY',
        isRTL: false
    }
});
jQuery.extend(jQuery.mobile.datebox.prototype.options, {
    useLang: 'nb-NO'
});
