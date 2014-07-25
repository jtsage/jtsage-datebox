<?php
require_once('inc/func.php');
echo do_header("Localizing Datebox", array("3-1-themes.php","Themeing Datebox"), array("3-3-output.php","Output Formats"), 'datebox');
echo do_all_lang();
?>

<h1>Picking a Language on the Fly</h1>
<p>Choosing a language on the fly is possible, although it is far more recommended that you serve only the required language to the end-user. This method may be useful for a phonegap application however, where there is no central server</p>
<p>Please note that if you load multiple files, the "default" language is whatever file loads last - please be sure to specify, as if a load is to hang slightly, the behavior may be unpredictable.</p>

<pre class="prettyprint">&lt;input type="text" data-role="datebox" data-options='{"mode":"datebox", "useLang":"en"}'></pre>

<select class="demopick" data-link="l1" data-opt="useLang"><?php echo do_lang_pick(); ?></select>
<div><input type="text" id="l1" data-role="datebox" data-options='{"mode":"datebox", "useLang":"en"}'></div>

<h1>Picking a Language File</h1>
<p>Language files are available at: <a href="http://cdn.jtsage.com/datebox/i18n/">cdn.jtsage.com/datebox/i18n/</a></p>
<p>Additionally, the file "jqm-datebox.lang.utf8.js" includes <strong>all</strong> of the current languages - be careful with using this, as it adds a bit of overhead (more than 50K - and it's all quoted strings, so minimizing will not help much)</p>

<h1>Overriding just a few values</h1>
<p>Sometimes, it is more appropriate to just override a few values - for this purpose, you can use the "override" option sequence:</p>
<p>For a full list of localisation string names, please look below - note the use of camel case - i.e. "dateFormat" becomes "overrideDateFormat"</p>

<pre class="prettyprint">&lt;input type="text" data-role="datebox" 
   data-options='{"mode":"datebox", "overrideSetDateButtonLabel":"Update Date"}'></pre>
<div><input type="text" data-role="datebox" data-options='{"mode":"datebox", "useLang":"en", "overrideSetDateButtonLabel":"Update Date"}'></div>


<h1>Customising a Language</h1>
<p>The simplest way to customise a language is to edit or create a file with all of the needed strings for datebox.  The file looks something like this:</p>

<pre class="prettyprint">jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
    'en': {
        setDateButtonLabel: "Set Date",
        setTimeButtonLabel: "Set Time",
        setDurationButtonLabel: "Set Duration",
        calTodayButtonLabel: "Jump to Today",
        titleDateDialogLabel: "Set Date",
        titleTimeDialogLabel: "Set Time",
        daysOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        daysOfWeekShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        monthsOfYear: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthsOfYearShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        durationLabel: ['Days', 'Hours', 'Minutes', 'Seconds'],
        durationDays: ['Day', 'Days'],
        tooltip: "Open Date Picker",
        nextMonth: "Next Month",
        prevMonth: "Previous Month",
        timeFormat: 12,
        headerFormat: '%A, %B %-d, %Y',
        dateFieldOrder: ['m', 'd', 'y'],
        timeFieldOrder: ['h', 'i', 'a'],
        slideFieldOrder: ['y', 'm', 'd'],
        dateFormat: '%m/%d/%Y',
        useArabicIndic: false,
        isRTL: false,
        calStartDay: 0,
        clearButton: 'clear'
        durationOrder: ['d', 'h', 'i', 's'],
        meridiem: ['AM', 'PM'],
        timeOutput: '%k:%M', // 12hr: '%l:%M %p', 24hr: '%k:%M',
        durationFormat: '%Dd %DA, %Dl:%DM:%DS',
        calDateListLabel: 'Other Dates',
        calHeaderFormat: '%B %Y',
        calTomorrowButtonLabel: "Jump to Tomorrow"
    }
});
jQuery.extend(jQuery.mobile.datebox.prototype.options, {
    useLang: 'en'
});</pre>

<p>Of particular note, the line before last, and the second line contain the language name - it can be whatever you like, but if
you choose to load multiple files on a page, the name must be unique.  Most values are optional, if you choose not to supply them
datebox will fall back to the default values defined in the CORE file.  This is particularly useful as you shouldn't need to track
the main distribution to ensure your existing language files will work with new versions.</p>

<h1>Correcting Mistakes / Submitting New Translations</h1>
<p>If you wish to correct a mistake in the DateBox repository, or submit a language that does not already exist, you can send a merge 
request via GitHub, send me an e-mail direct (link at the bottom of every page), or contribute via CrowdIn (like at the bottom of every page).
Individual translators are noted in the language file they contributed to.</p>

<?php
echo do_footer();
?>
