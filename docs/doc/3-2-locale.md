---
title: Localizing DateBox
pagenum: 5
layout: doc
---

# Localizing DateBox

DateBox is full localized, nearly every aspect of the user interface can be altered based
on the user's locale.

## Picking a Language File

Language files are available at: <a href="{{ site.i18n }}">{{ site.i18n }}</a>

<div class="alert alert-info">
Additionally, the file <strong>"jqm-datebox.lang.utf8.js"</strong> includes <big>ALL</big> of the current
languages.
</div>

## Picking a Language on the Fly

Choosing a language on the fly is possible, although it is far more recommended that
you serve only the required language to the end-user. The option you will want to alter
is {% api_doc useLang %}

Please note that if you load multiple files, the "default" language is whatever file
loads last - please be sure to specify, as if a load is to hang slightly, the behavior
may be unpredictable.

{% highlight html %}
<input type="text" data-role="datebox" data-options='{"mode":"datebox", "useLang":"de"}'>
{% endhighlight %}

<div class="ui-field-contain">
	<label for="l1">A Localized DateBox (German/Deutsch)</label>
	<input type="text" id="l1" data-role="datebox" data-options='{"mode":"datebox", "useLang":"de", "useInlineAlign":"center", "hideInput": true, "useInline": true}'>
</div>



## Overriding just a few values

Sometimes, it is more appropriate to just override a few values - for this purpose
you can use the "override" option sequence:

For a full list of localization string names, please look below - note the use of
camel case - i.e. {% api_doc dateFormat %} becomes "overrideDateFormat"

{% highlight html %}
<input type="text" data-role="datebox" 
   data-options='{"mode":"datebox", "overrideSetDateButtonLabel":"Update Date"}'>
{% endhighlight %}

<div class="ui-field-contain">
	<label for="sing">Single Override</label>
	<input id="sing" type="text" data-role="datebox" data-options='{"useInline":true, "hideInput":true, "useInlineAlign":"center", "mode":"datebox", "useLang":"en", "overrideSetDateButtonLabel":"Update Date"}'>
</div>


## Customizing a Language
The simplest way to customize a language is to edit or create a file with all of
the needed strings for datebox.  The file looks something like this:

{% highlight js %}
jQuery.extend(jQuery.jtsage.datebox.prototype.options.lang, {
  'en': {
    setDateButtonLabel: "Set Date",
    setTimeButtonLabel: "Set Time",
    setDurationButtonLabel: "Set Duration",
    todayButtonLabel: "Jump to Today",
    titleDateDialogLabel: "Set Date",
    titleTimeDialogLabel: "Set Time",
    daysOfWeek: [
      "Sunday", "Monday", "Tuesday", "Wednesday",
      "Thursday", "Friday", "Saturday"
    ],
    daysOfWeekShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    monthsOfYear: [
      "January", "February", "March",
      "April", "May", "June",
      "July", "August", "September",
      "October", "November", "December"
    ],
    monthsOfYearShort: [
      "Jan", "Feb", "Mar",
      "Apr", "May", "Jun",
      "Jul", "Aug", "Sep",
      "Oct", "Nov", "Dec"
    ],
    durationLabel: ["Days", "Hours", "Minutes", "Seconds"],
    durationDays: ["Day", "Days"],
    tooltip: "Open Date Picker",
    nextMonth: "Next Month",
    prevMonth: "Previous Month",
    timeFormat: 12,
    headerFormat: "%A, %B %-d, %Y",
    dateFieldOrder: ["m", "d", "y"],
    timeFieldOrder: ["h", "i", "a"],
    slideFieldOrder: ["y", "m", "d"],
    datetimeFieldOrder: ["y", "m", "d", "h", "i", "s", "a"],
    dateFormat: "%m/%d/%Y",
    datetimeFormat: "%Y-%m-%dT%k:%M:%S",
    useArabicIndic: false,
    isRTL: false,
    calStartDay: 0,
    clearButton: "clear"
    durationOrder: ["d", "h", "i", "s"],
    meridiem: ["AM", "PM"],
    timeOutput: "%k:%M", // 12hr: "%l:%M %p", 24hr: "%k:%M",
    durationFormat: "%Dd %DA, %Dl:%DM:%DS",
    calDateListLabel: "Other Dates",
    calHeaderFormat: "%B %Y",
    tomorrowButtonLabel: "Jump to Tomorrow"
  }
});
jQuery.extend(jQuery.jtsage.datebox.prototype.options, {
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

## Correcting Mistakes / Submitting New Translations
If you wish to correct a mistake in the DateBox repository, or submit a language
that does not already exist, you can send a merge request via GitHub, send me an
[e-mail direct](mailto:jtsage+datebox@gmail.com), or contribute via [CrowdIn](http://crowdin.net/project/jquery-mobile-datebox).
