---
title: Localizing Datebox
pagenum: 5
layout: doc
---

# Picking a Language on the Fly

Choosing a language on the fly is possible, although it is far more recommended that
you serve only the required language to the end-user. This method may be useful for
a phonegap application however, where there is no central server. To play with the 
language setting of this page, or any page in the doc site, click on the "i18n"
button in the header.  Of Note, this actually is using the CustomFlip datebox method
to display the list of languages - kinda cool, huh?

Please note that if you load multiple files, the "default" language is whatever file
loads last - please be sure to specify, as if a load is to hang slightly, the behavior
may be unpredictable.

{% highlight html %}
<input type="text" data-role="datebox" data-options='{"mode":"datebox", "useLang":"en"}'>
{% endhighlight %}

<div class="ui-field-contain">
	<label for="l1">A Localizaed DateBox</label>
	<input type="text" id="l1" data-role="datebox" data-options='{"mode":"datebox", "useLang":"en", "hideInput": true, "useInline": true}'>
</div>


# Picking a Language File

Language files are available at: <a href="http://cdn.jtsage.com/datebox/i18n/">cdn.jtsage.com/datebox/i18n/</a>

Additionally, the file "jqm-datebox.lang.utf8.js" includes **all** of the current
languages - be careful with using this, as it adds a bit of overhead (more than 50K - 
and it's all quoted strings, so minimizing will not help much)

# Overriding just a few values

Sometimes, it is more appropriate to just override a few values - for this purpose
you can use the "override" option sequence:

For a full list of localisation string names, please look below - note the use of
camel case - i.e. {% api_doc dateFormat %} becomes "overrideDateFormat"

{% highlight html %}
<input type="text" data-role="datebox" 
   data-options='{"mode":"datebox", "overrideSetDateButtonLabel":"Update Date"}'>
{% endhighlight %}

<div><input type="text" data-role="datebox" data-options='{"mode":"datebox", "useLang":"en", "overrideSetDateButtonLabel":"Update Date"}'></div>


# Customising a Language
The simplest way to customise a language is to edit or create a file with all of
the needed strings for datebox.  The file looks something like this:

{% highlight js %}
jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
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
});
{% endhighlight %}

Of particular note, the line before last, and the second line contain the language
name - it can be whatever you like, but if you choose to load multiple files on a page
the name must be unique.  Most values are optional, if you choose not to supply
them datebox will fall back to the default values defined in the CORE file.  This
is particularly useful as you shouldn't need to track the main distribution to ensure
your existing language files will work with new versions. For a complete listing
of what each of these options means, please see the [API](http://dev.jtsage.com/jQM-DateBox/api/cat-i18n/).

# Correcting Mistakes / Submitting New Translations
If you wish to correct a mistake in the DateBox repository, or submit a language
that does not already exist, you can send a merge request via GitHub, send me an
e-mail direct (link at the bottom of every page), or contribute via CrowdIn (like
at the bottom of every page). Individual translators are noted in the language file
they contributed to.
