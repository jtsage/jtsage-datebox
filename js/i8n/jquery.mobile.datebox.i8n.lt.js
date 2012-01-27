﻿/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notifcation.
 * https://github.com/jtsage/jquery-mobile-datebox
 *
 * Translation by: Tadas Subonis <tadas.subonis@affecto.com>
 */

jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
    'lt': {
        setDateButtonLabel: 'Data',
        setTimeButtonLabel: 'Laikas',
        setDurationButtonLabel: 'Trukmė',
        calTodayButtonLabel: 'Šiandiena',
        titleDateDialogLabel: 'Data',
        titleTimeDialogLabel: 'Laikas',
        daysOfWeek: ['Sekmadienis','Pirmadienis','Antradienis','Trečiadienis','Ketvirtadienis','Penktadienis','Šeštadienis'],
        daysOfWeekShort: ['Sk','Pr','An','Tr','Kt','Pn','Ss'],
        monthsOfYear: ['Sausis','Vasaris','Kovas','Balandis','Gegužė','Birželis','Liepa','Rugpjūtis','Rugsėjis','Spalis','Lapkritis','Gruodis'],
        monthsOfYearShort: ['Sau','Vas','Kov','Bal','Geg','Bir','Lie','Rug','Rgs','Spa','Lap','Gru'],
        durationLabel: ['Dienos','Valandos','Minutės','Sekundeės'],
        durationDays: ['Diena','Dienos'],
        timeFormat: 24,
        dateFieldOrder: ['y','m','d'],
        timeFieldOrder: ['h', 'i', 'a'],
        slideFieldOrder: ['y', 'm', 'd'],
        headerFormat: 'YYYY-MM-DD',
        useArabicIndic: false,
        isRTL: false
    }
});
jQuery.extend(jQuery.mobile.datebox.prototype.options, {
    useLang: 'lt'
});
