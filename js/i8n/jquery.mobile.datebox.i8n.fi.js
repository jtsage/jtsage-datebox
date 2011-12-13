/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notifcation.
 * https://github.com/jtsage/jquery-mobile-datebox
 *
 * Finnish localisation for JQM DateBox plugin *
 * Written by: Ville Salonen (ville.salonen@iki.fi)
 */

jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
        'fi': {
                setDateButtonLabel: 'Valitse p&#228;iv&#228;',
                setTimeButtonLabel: 'Valitse aika',
                setDurationButtonLabel: 'Valitse kesto',
                calTodayButtonLabel: 'T&#228;n&#228;&#228;n',
                titleDateDialogLabel: 'Valitse p&#228;i&#228;',
                titleTimeDialogLabel: 'Valitse aika',
                daysOfWeek: ['Sunnuntai','Maanantai','Tiistai','Keskiviikko','Torstai','Perjantai','Lauantai'],
                daysOfWeekShort: ['Su','Ma','Ti','Ke','To','Pe','La'],
                monthsOfYear: ['Tammikuu','Helmikuu','Marraskuu','Huhtikuu','Toukokuu','Kes&#228;kuu','Hein&#228;kuu','Elokuu','Syyskuu','Lokakuu','Marraskuu','Joulukuu'],
                monthsOfYearShort: ['Tammi','Helmi','Marras','Huhti','Touko','Kes&#228;','Hein&#228;','Elo','Syys','Loka','Marras','Joulu'],
                durationLabel: ['P&#228;iv&#228;&#228;','Tuntia','Minuuttia','Sekuntia'],
                durationDays: ['P&#228;iv&#228;','P&#228;iv&#228;&#228;'],
                timeFormat: 24,
                dateFieldOrder: ['d', 'm', 'y'],
                timeFieldOrder: ['h', 'i', 'a'],
                slideFieldOrder: ['d', 'm', 'y'],
                headerFormat: 'ddd DD.MM.YYYY',
                dateFormat: 'DD.MM.YYYY',
                isRTL: false
        }
});
jQuery.extend(jQuery.mobile.datebox.prototype.options, {
        useLang: 'fi'
});

